import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Simple rate limiting (in-memory)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

const checkRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const limit = rateLimit.get(ip);
  
  if (now > limit.resetTime) {
    limit.count = 1;
    limit.resetTime = now + RATE_LIMIT_WINDOW;
    return next();
  }
  
  if (limit.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((limit.resetTime - now) / 1000)
    });
  }
  
  limit.count++;
  next();
};

// POST /api/contact - Submit new contact message
router.post('/', checkRateLimit, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      formType,
      // Business details fields
      companyName,
      industry,
      services,
      specialties,
      projects,
      achievements,
      businessEmail,
      businessPhone,
      instagram,
      linkedin,
      submittedAt
    } = req.body;

    // Basic validation
    if (formType === 'contact') {
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, subject, and message are required for contact form.'
        });
      }
    } else if (formType === 'business-details') {
      if (!companyName) {
        return res.status(400).json({
          success: false,
          message: 'Company name is required for business details form.'
        });
      }
    }

    // Get client info
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || '';

    // Create contact document
    const contactData = {
      formType: formType || 'contact',
      // Contact form fields
      name,
      email,
      phone,
      subject,
      message,
      // Business details fields
      companyName,
      industry,
      services,
      specialties,
      projects,
      achievements,
      businessEmail,
      businessPhone,
      instagram,
      linkedin,
      // Meta fields
      ipAddress: clientIP,
      userAgent,
      source: 'website',
      submittedAt: submittedAt || new Date()
    };

    const contact = new Contact(contactData);
    await contact.save();

    console.log(`New ${formType || 'contact'} submission from ${email || businessEmail}`);

    res.status(201).json({
      success: true,
      message: formType === 'business-details' 
        ? 'Business details saved successfully!' 
        : 'Message sent successfully!',
      contactId: contact._id
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit form. Please try again.'
    });
  }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.formType) filter.formType = req.query.formType;
    
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-ipAddress -userAgent'); // Hide sensitive info
    
    const total = await Contact.countDocuments(filter);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// GET /api/contact/stats - Get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.getStatistics();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics'
    });
  }
});

// GET /api/contact/:id - Get single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
});

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['unread', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

// POST /api/contact/:id/reply - Add reply to contact
router.post('/:id/reply', async (req, res) => {
  try {
    const { message, from } = req.body;
    
    if (!message || !from) {
      return res.status(400).json({
        success: false,
        message: 'Message and from fields are required'
      });
    }
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    await contact.addReply(message, from);
    
    res.json({
      success: true,
      message: 'Reply added successfully'
    });
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add reply'
    });
  }
});

export default router; 