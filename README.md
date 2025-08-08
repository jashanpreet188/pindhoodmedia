# Pindhood Media - Modern Agency Landing Page

A beautiful, responsive, and interactive website for Pindhood Media, a creative agency specializing in storytelling and visual content production.

## 🌟 Features

### Design & Branding
- **Modern Agency Design**: Clean, professional layout with earthy color palette
- **Earthy Color Scheme**: Black, mud-brown, burnt-orange, and off-white colors
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Typography**: Inter font family for modern, readable text

### Interactive Elements
- **Sticky Navigation**: Fixed navbar with smooth scrolling and active section highlighting
- **Hero Section**: Full-screen video background with animated content and scroll arrow
- **Animated Service Cards**: Hover effects and staggered animations
- **Portfolio Grid**: Interactive thumbnails with overlay effects
- **Contact Form**: Functional form with validation and notifications
- **Scroll Animations**: Intersection Observer API for scroll-triggered animations

### Technical Features
- **Performance Optimized**: Throttled scroll events and optimized animations
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Cross-browser Compatible**: Works on all modern browsers
- **Mobile-First**: Responsive design with mobile navigation menu

## 🎨 Color Palette

```css
--black: #1a1a1a
--mud-brown: #8B4513
--burnt-orange: #D2691E
--off-white: #f8f6f3
--light-brown: #d4a574
--dark-brown: #5d4037
```

## 📱 Sections

### 1. Hero Section
- Full-screen video background (using `collab.mp4`)
- Animated logo and tagline
- Call-to-action buttons
- Bouncing scroll arrow

### 2. About Section
- Company story and mission
- Animated statistics counters
- Placeholder for company image

### 3. Services Section
- Three service cards: Film Production, Music Videos, Storytelling
- Hover animations and icon effects
- Feature lists for each service

### 4. Portfolio Section
- Grid layout with 6 portfolio items
- Hover overlays with project details
- Play button placeholders for video content

### 5. Contact Section
- Contact information with icons
- Functional contact form with validation
- Success/error notifications

### 6. Footer
- Company branding
- Social media links
- Quick navigation links
- Copyright information

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Ensure `collab.mp4` is in the root directory
3. Open `index.html` in a web browser

### File Structure
```
pindhood-website/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # JavaScript functionality
├── collab.mp4          # Hero video background
└── README.md           # This file
```

## 🛠️ Customization

### Changing Colors
Edit the CSS custom properties in `style.css`:
```css
:root {
    --black: #1a1a1a;
    --mud-brown: #8B4513;
    --burnt-orange: #D2691E;
    /* ... other colors */
}
```

### Adding Content
- **Services**: Add more service cards in the services section
- **Portfolio**: Add portfolio items to the portfolio grid
- **Contact Info**: Update contact details in the contact section

### Video Background
Replace `collab.mp4` with your own video file and update the source in `index.html`:
```html
<video autoplay loop muted class="hero-video">
    <source src="./your-video.mp4" type="video/mp4">
</video>
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

## 🔧 Technical Details

### JavaScript Features
- **Intersection Observer API**: For scroll-triggered animations
- **Smooth Scrolling**: Native smooth scroll behavior
- **Form Validation**: Client-side validation with notifications
- **Performance Optimization**: Throttled scroll events
- **Mobile Navigation**: Hamburger menu functionality

### CSS Features
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: For consistent theming
- **CSS Animations**: Keyframe animations and transitions
- **Backdrop Filter**: For navbar blur effect

### Performance Optimizations
- **Throttled Scroll Events**: Prevents excessive function calls
- **Optimized Animations**: Hardware-accelerated transforms
- **Lazy Loading**: Intersection Observer for animations
- **Minimal Dependencies**: Only Font Awesome for icons

## 📞 Contact Form

The contact form includes:
- Name, email, subject, and message fields
- Client-side validation
- Success/error notifications
- Form submission simulation

To make it functional, replace the simulation with actual form handling:
```javascript
// Replace the setTimeout simulation with actual form submission
fetch('/api/contact', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    showNotification('Message sent successfully!', 'success');
})
.catch(error => {
    showNotification('Error sending message', 'error');
});
```

## 🎨 Animation Details

### Scroll Animations
- **Fade In**: Elements fade in as they enter the viewport
- **Slide Up**: Elements slide up from below
- **Staggered**: Service cards and portfolio items animate in sequence

### Hover Effects
- **Service Cards**: Lift effect with icon rotation
- **Portfolio Items**: Scale effect with overlay reveal
- **Buttons**: Transform and shadow effects

### Loading Animations
- **Preloader**: Spinning logo animation
- **Hero Content**: Staggered fade-in animations
- **Counter Animation**: Animated statistics in about section

## 📄 License

This project is created for Pindhood Media. Feel free to customize and use for your own projects.

## 🤝 Contributing

For any improvements or bug fixes, please feel free to contribute by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

---

**Pindhood Media** - Stories Rooted in Soil, Told with Soul 