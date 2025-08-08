import express from 'express';
import Portfolio from '../models/Portfolio.js';

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get all published portfolio items with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      tag,
      year,
      featured,
      search,
      sort = '-createdAt'
    } = req.query;

    // Build filter object
    const filter = { status: 'published' };

    if (category) {
      filter.category = category;
    }

    if (tag) {
      filter.tags = { $in: Array.isArray(tag) ? tag : [tag] };
    }

    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with population
    const portfolioItems = await Portfolio.find(filter)
      .populate('client.info', 'name website')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Portfolio.countDocuments(filter);
    const pages = Math.ceil(total / parseInt(limit));

    // Get statistics
    const stats = await Portfolio.getStatistics();

    res.json({
      success: true,
      data: {
        portfolioItems,
        pagination: {
          current: parseInt(page),
          pages,
          total,
          hasNext: parseInt(page) < pages,
          hasPrev: parseInt(page) > 1
        },
        stats,
        filters: {
          categories: await Portfolio.distinct('category', { status: 'published' }),
          tags: await Portfolio.distinct('tags', { status: 'published' }),
          years: await Portfolio.distinct('year', { status: 'published' }).sort({ _id: -1 })
        }
      }
    });

  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching portfolio items',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/portfolio/featured
// @desc    Get featured portfolio items
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const featuredItems = await Portfolio.getFeatured(parseInt(limit));

    res.json({
      success: true,
      data: featuredItems
    });

  } catch (error) {
    console.error('Error fetching featured portfolio:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured portfolio',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/portfolio/categories/:category
// @desc    Get portfolio items by category
// @access  Public
router.get('/categories/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 12, page = 1 } = req.query;

    const items = await Portfolio.getByCategory(category, {
      limit: parseInt(limit),
      page: parseInt(page)
    });

    res.json({
      success: true,
      data: items
    });

  } catch (error) {
    console.error('Error fetching portfolio by category:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching portfolio by category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/portfolio/:slug
// @desc    Get single portfolio item by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const portfolioItem = await Portfolio.findOne({ 
      slug, 
      status: 'published' 
    })
      .populate('client.info', 'name website industry')
      .select('-__v');

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    // Update view count and last viewed date
    portfolioItem.metrics.views += 1;
    portfolioItem.lastViewedAt = new Date();
    await portfolioItem.save();

    // Get related portfolio items (same category, exclude current)
    const relatedItems = await Portfolio.find({
      category: portfolioItem.category,
      _id: { $ne: portfolioItem._id },
      status: 'published'
    })
      .limit(4)
      .sort('-createdAt')
      .select('title slug category images date');

    res.json({
      success: true,
      data: {
        portfolioItem,
        related: relatedItems
      }
    });

  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching portfolio item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/portfolio
// @desc    Create new portfolio item
// @access  Private (Admin only)
router.post('/', async (req, res) => {
  try {
    const portfolioData = req.body;

    // Validate required fields
    const requiredFields = ['title', 'description', 'category'];
    const missingFields = requiredFields.filter(field => !portfolioData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Create new portfolio item
    const portfolioItem = new Portfolio(portfolioData);
    await portfolioItem.save();

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: portfolioItem
    });

  } catch (error) {
    console.error('Error creating portfolio item:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Portfolio item with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating portfolio item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/portfolio/:id
// @desc    Update portfolio item
// @access  Private (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.metrics;

    const portfolioItem = await Portfolio.findByIdAndUpdate(
      id,
      { 
        ...updateData,
        updatedAt: new Date()
      },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolioItem
    });

  } catch (error) {
    console.error('Error updating portfolio item:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid portfolio item ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating portfolio item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const portfolioItem = await Portfolio.findByIdAndDelete(id);

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully',
      data: { id }
    });

  } catch (error) {
    console.error('Error deleting portfolio item:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid portfolio item ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting portfolio item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PATCH /api/portfolio/:id/status
// @desc    Update portfolio item status
// @access  Private (Admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['draft', 'published', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const portfolioItem = await Portfolio.findByIdAndUpdate(
      id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      message: `Portfolio item status updated to ${status}`,
      data: { id, status }
    });

  } catch (error) {
    console.error('Error updating portfolio status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating portfolio status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/portfolio/stats
// @desc    Get portfolio statistics
// @access  Public
router.get('/admin/stats', async (req, res) => {
  try {
    const stats = await Portfolio.getStatistics();

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching portfolio stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
