import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'branding',
      'web-design',
      'video-production',
      'photography',
      'digital-marketing',
      'mobile-app',
      'graphic-design',
      'social-media',
      'content-creation',
      'other'
    ],
    lowercase: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  
  // Project details
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: new Date().getFullYear() + 1
  },
  duration: {
    type: String,
    trim: true,
    maxlength: [50, 'Duration cannot exceed 50 characters']
  },
  
  // Client information
  client: {
    name: {
      type: String,
      trim: true,
      maxlength: [200, 'Client name cannot exceed 200 characters']
    },
    industry: {
      type: String,
      trim: true,
      maxlength: [100, 'Industry cannot exceed 100 characters']
    },
    website: {
      type: String,
      trim: true,
      maxlength: [300, 'Website URL cannot exceed 300 characters']
    }
  },
  
  // Team members
  team: [{
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Team member name cannot exceed 100 characters']
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters']
    },
    avatar: {
      type: String,
      trim: true
    }
  }],
  
  // Media files
  media: {
    thumbnail: {
      type: String,
      required: true,
      trim: true
    },
    video: {
      type: String,
      trim: true
    },
    gallery: [{
      url: {
        type: String,
        required: true,
        trim: true
      },
      caption: {
        type: String,
        trim: true,
        maxlength: [300, 'Caption cannot exceed 300 characters']
      },
      type: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
      }
    }]
  },
  
  // SEO and categorization
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  technologies: [{
    type: String,
    trim: true,
    maxlength: [50, 'Technology cannot exceed 50 characters']
  }],
  
  // Awards and recognition
  awards: [{
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Award title cannot exceed 200 characters']
    },
    organization: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Organization cannot exceed 200 characters']
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: new Date().getFullYear() + 1
    },
    category: {
      type: String,
      trim: true,
      maxlength: [100, 'Category cannot exceed 100 characters']
    }
  }],
  
  // Performance metrics
  metrics: {
    views: {
      type: Number,
      default: 0,
      min: 0
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
    },
    shares: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  
  // SEO metadata
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [50, 'Keyword cannot exceed 50 characters']
    }]
  },
  
  // Display settings
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  publishedAt: {
    type: Date
  },
  lastViewedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
portfolioSchema.index({ slug: 1 }, { unique: true });
portfolioSchema.index({ status: 1 });
portfolioSchema.index({ category: 1 });
portfolioSchema.index({ featured: 1 });
portfolioSchema.index({ year: -1 });
portfolioSchema.index({ 'metrics.views': -1 });
portfolioSchema.index({ tags: 1 });
portfolioSchema.index({ createdAt: -1 });
portfolioSchema.index({ publishedAt: -1 });

// Virtual for formatted year
portfolioSchema.virtual('formattedYear').get(function() {
  return this.year.toString();
});

// Virtual for display URL
portfolioSchema.virtual('displayUrl').get(function() {
  return `/portfolio/${this.slug}`;
});

// Virtual for category display name
portfolioSchema.virtual('categoryDisplay').get(function() {
  return this.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
});

// Pre-save middleware to generate slug and handle dates
portfolioSchema.pre('save', function(next) {
  // Generate slug from title if not provided
  if (!this.slug || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Set publishedAt date when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Static method to get portfolio statistics
portfolioSchema.statics.getStatistics = async function() {
  const totalItems = await this.countDocuments();
  const publishedItems = await this.countDocuments({ status: 'published' });
  const featuredItems = await this.countDocuments({ featured: true });
  
  const categoryStats = await this.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  const yearStats = await this.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$year', count: { $sum: 1 } } },
    { $sort: { _id: -1 } }
  ]);
  
  const topViewed = await this.find({ status: 'published' })
    .sort({ 'metrics.views': -1 })
    .limit(5)
    .select('title slug metrics.views');
  
  return {
    total: totalItems,
    published: publishedItems,
    featured: featuredItems,
    categoryBreakdown: categoryStats,
    yearBreakdown: yearStats,
    topViewed
  };
};

// Static method to get featured items
portfolioSchema.statics.getFeatured = function(limit = 6) {
  return this.find({ 
    status: 'published', 
    featured: true 
  })
    .sort({ order: 1, createdAt: -1 })
    .limit(limit)
    .select('-metrics');
};

// Static method to get items by category
portfolioSchema.statics.getByCategory = function(category, limit = 6) {
  return this.find({ 
    status: 'published', 
    category: category.toLowerCase()
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-metrics');
};

// Instance method to increment view count
portfolioSchema.methods.incrementViews = function() {
  this.metrics.views += 1;
  this.lastViewedAt = new Date();
  return this.save();
};

// Instance method to toggle featured status
portfolioSchema.methods.toggleFeatured = function() {
  this.featured = !this.featured;
  return this.save();
};

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio; 