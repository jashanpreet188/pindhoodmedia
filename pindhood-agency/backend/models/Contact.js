import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  // Form type identifier
  formType: {
    type: String,
    enum: ['contact', 'business-details'],
    default: 'contact',
    required: true
  },
  
  // Contact form fields
  name: {
    type: String,
    required: function() { return this.formType === 'contact'; },
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: function() { return this.formType === 'contact'; },
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  subject: {
    type: String,
    required: function() { return this.formType === 'contact'; },
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: function() { return this.formType === 'contact'; },
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  // Business details fields
  companyName: {
    type: String,
    required: function() { return this.formType === 'business-details'; },
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  industry: {
    type: String,
    trim: true,
    maxlength: [100, 'Industry cannot exceed 100 characters']
  },
  services: {
    type: String,
    trim: true,
    maxlength: [2000, 'Services description cannot exceed 2000 characters']
  },
  specialties: {
    type: String,
    trim: true,
    maxlength: [1000, 'Specialties description cannot exceed 1000 characters']
  },
  projects: {
    type: String,
    trim: true,
    maxlength: [3000, 'Projects description cannot exceed 3000 characters']
  },
  achievements: {
    type: String,
    trim: true,
    maxlength: [2000, 'Achievements description cannot exceed 2000 characters']
  },
  businessEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid business email address']
  },
  businessPhone: {
    type: String,
    trim: true,
    maxlength: [20, 'Business phone number cannot exceed 20 characters']
  },
  instagram: {
    type: String,
    trim: true,
    maxlength: [100, 'Instagram handle cannot exceed 100 characters']
  },
  linkedin: {
    type: String,
    trim: true,
    maxlength: [200, 'LinkedIn URL cannot exceed 200 characters']
  },
  
  // Status and processing
  status: {
    type: String,
    enum: ['unread', 'read', 'replied', 'archived'],
    default: 'unread'
  },
  
  // Meta information
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    enum: ['website', 'api', 'import'],
    default: 'website'
  },
  
  // Spam detection
  isSpam: {
    type: Boolean,
    default: false
  },
  spamScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Communication history
  replies: [{
    message: {
      type: String,
      required: true,
      maxlength: [2000, 'Reply message cannot exceed 2000 characters']
    },
    from: {
      type: String,
      required: true,
      maxlength: [100, 'From field cannot exceed 100 characters']
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Priority and categorization
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  
  // Additional timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  lastReadAt: {
    type: Date
  },
  repliedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ formType: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ isSpam: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ companyName: 1 });

// Virtual for formatted submission date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for reply count
contactSchema.virtual('replyCount').get(function() {
  return this.replies ? this.replies.length : 0;
});

// Pre-save middleware for spam detection
contactSchema.pre('save', function(next) {
  if (this.isNew) {
    // Basic spam detection logic
    let spamScore = 0;
    
    // Check for common spam indicators
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'click here', 'buy now'];
    const content = `${this.message || ''} ${this.subject || ''} ${this.services || ''}`.toLowerCase();
    
    spamKeywords.forEach(keyword => {
      if (content.includes(keyword)) {
        spamScore += 25;
      }
    });
    
    // Check for excessive links
    const linkCount = (content.match(/http/g) || []).length;
    if (linkCount > 3) {
      spamScore += 30;
    }
    
    // Check for excessive uppercase
    const uppercaseRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (uppercaseRatio > 0.5) {
      spamScore += 20;
    }
    
    this.spamScore = Math.min(spamScore, 100);
    this.isSpam = spamScore >= 50;
    
    // Auto-set priority based on content
    if (content.includes('urgent') || content.includes('asap')) {
      this.priority = 'high';
    }
  }
  
  next();
});

// Static method to get statistics
contactSchema.statics.getStatistics = async function() {
  const totalContacts = await this.countDocuments();
  const unreadContacts = await this.countDocuments({ status: 'unread' });
  const spamContacts = await this.countDocuments({ isSpam: true });
  
  const statusStats = await this.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  
  const formTypeStats = await this.aggregate([
    { $group: { _id: '$formType', count: { $sum: 1 } } }
  ]);
  
  const monthlyStats = await this.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 }
  ]);
  
  return {
    total: totalContacts,
    unread: unreadContacts,
    spam: spamContacts,
    statusBreakdown: statusStats,
    formTypeBreakdown: formTypeStats,
    monthlyTrend: monthlyStats
  };
};

// Instance method to mark as read
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  this.lastReadAt = new Date();
  return this.save();
};

// Instance method to add reply
contactSchema.methods.addReply = function(message, from) {
  this.replies.push({
    message,
    from,
    timestamp: new Date()
  });
  this.status = 'replied';
  this.repliedAt = new Date();
  return this.save();
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact; 