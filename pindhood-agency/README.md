# 🎬 Pindhood Media - Agency Website

> **Stories Rooted in Soil, Told with Soul**

A modern, responsive agency landing page built with the MERN stack (MongoDB, Express.js, React, Node.js) using Vite for fast development and GSAP for stunning animations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

## 🌟 Features

### 🎨 Design & User Experience
- **Modern Agency Design**: Clean, professional layout with earthy color palette
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: GSAP-powered scroll animations and hover effects
- **Interactive Elements**: Animated service cards, portfolio filters, and scroll-triggered effects
- **Accessibility**: WCAG compliant with proper focus management and screen reader support

### 🚀 Technical Features
- **MERN Stack**: MongoDB, Express.js, React, Node.js
- **Vite**: Lightning-fast development and build tool
- **GSAP Animations**: Professional-grade scroll animations and interactions
- **Intersection Observer**: Efficient scroll-triggered animations
- **Form Validation**: Client and server-side validation with react-hook-form
- **RESTful API**: Well-structured backend with comprehensive error handling
- **Database Models**: Sophisticated MongoDB schemas with validation and indexing
- **Rate Limiting**: Protection against spam and abuse
- **Responsive Images**: Optimized media delivery

### 📱 Sections
1. **Hero Section**: Full-screen video background with animated content
2. **About Section**: Company story with animated statistics
3. **Services Section**: Three animated service cards (Film Production, Music Videos, Storytelling)
4. **Portfolio Section**: Responsive grid with filters and scroll animations
5. **Contact Section**: Functional form with validation and success/error notifications
6. **Footer**: Comprehensive footer with social links and newsletter signup

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Build tool and dev server
- **GSAP** - Animation library
- **React Hook Form** - Form validation
- **React Icons** - Icon library
- **CSS3** - Custom properties and modern layout techniques

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development Tools
- **ESLint** - Code linting
- **Concurrently** - Run multiple commands
- **Nodemon** - Auto-restart server

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pindhoodmedia/agency-website.git
   cd agency-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and configure your settings:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pindhood-media
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud database
   ```

5. **Run the application**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   ```

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📂 Project Structure

```
pindhood-agency/
├── public/                    # Static assets
│   ├── collab.mp4            # Hero video
│   ├── SuisseIntl-*.ttf      # Custom fonts
│   └── favicon files
├── src/                      # Frontend source
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── sections/         # Page sections
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Services.jsx
│   │       ├── Portfolio.jsx
│   │       └── Contact.jsx
│   ├── styles/               # CSS files
│   ├── App.jsx               # Main app component
│   └── main.jsx             # Entry point
├── backend/                  # Backend source
│   ├── models/              # MongoDB models
│   │   ├── Contact.js
│   │   └── Portfolio.js
│   ├── routes/              # API routes
│   │   ├── contact.js
│   │   └── portfolio.js
│   ├── middleware/          # Custom middleware
│   └── server.js            # Express server
├── package.json
└── README.md
```

## 🎨 Color Palette

```css
--black: #1a1a1a          /* Primary text */
--mud-brown: #8B4513      /* Secondary accent */
--burnt-orange: #D2691E   /* Primary accent */
--off-white: #f8f6f3      /* Background */
--light-brown: #d4a574    /* Light accent */
--dark-brown: #5d4037     /* Dark accent */
--cream: #faf8f5          /* Card backgrounds */
--warm-gray: #8a7f7a      /* Secondary text */
```

## 📋 API Endpoints

### Contact Routes
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get single contact
- `PUT /api/contact/:id/status` - Update contact status
- `POST /api/contact/:id/reply` - Add reply to contact

### Portfolio Routes
- `GET /api/portfolio` - Get published portfolio items
- `GET /api/portfolio/featured` - Get featured items
- `GET /api/portfolio/:slug` - Get single portfolio item
- `POST /api/portfolio` - Create portfolio item (admin)
- `PUT /api/portfolio/:id` - Update portfolio item (admin)
- `DELETE /api/portfolio/:id` - Delete portfolio item (admin)

### Health Check
- `GET /api/health` - Server health status

## 🔧 Development

### Scripts
```bash
npm run dev        # Start both frontend and backend
npm run client     # Start frontend only
npm run server     # Start backend only
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Environment Variables
Create a `.env` file with these variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/pindhood-media

# Email (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=hello@pindhoodmedia.com

# Security
JWT_SECRET=your-secret-key
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy with: `npm start`

### Full Stack (Railway/Render)
1. Set `NODE_ENV=production`
2. Configure MongoDB Atlas
3. Deploy entire repository

## 🔒 Security Features

- **Rate Limiting**: Prevents spam and DoS attacks
- **Input Validation**: Client and server-side validation
- **CORS Configuration**: Properly configured cross-origin requests
- **Environment Variables**: Sensitive data protection
- **Data Sanitization**: MongoDB injection prevention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GSAP** for amazing animations
- **Vite** for lightning-fast development
- **React** community for excellent tools
- **MongoDB** for flexible data storage
- **Express.js** for robust backend framework

## 📞 Support

For support, email hello@pindhoodmedia.com or create an issue on GitHub.

---

**Built with ❤️ by Pindhood Media**

*Stories Rooted in Soil, Told with Soul*
