import React from 'react';
import { 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaHeart 
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' }
  ];

  const services = [
    { label: 'Film Production', href: '#services' },
    { label: 'Music Videos', href: '#services' },
    { label: 'Digital Storytelling', href: '#services' },
    { label: 'Commercial Videos', href: '#services' },
    { label: 'Event Coverage', href: '#services' }
  ];

  const socialLinks = [
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
    { icon: FaYoutube, url: '#', label: 'YouTube' }
  ];

  const handleLinkClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section company-info">
              <div className="footer-brand">
                <h3>
                  <span className="brand-text">Pindhood</span>
                  <span className="brand-accent">Media</span>
                </h3>
                <p className="brand-tagline">
                  Stories Rooted in Soil, Told with Soul
                </p>
              </div>
              
              <p className="company-description">
                We are passionate storytellers committed to creating authentic, 
                meaningful content that connects with audiences and honors cultural heritage.
              </p>

              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>123 Creative Street, Art District</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <FaEnvelope />
                  <span>hello@pindhoodmedia.com</span>
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4>Our Services</h4>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href={service.href}
                      onClick={(e) => { e.preventDefault(); handleLinkClick(service.href); }}
                    >
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4>Stay Connected</h4>
              <p className="social-description">
                Follow us for behind-the-scenes content and latest updates.
              </p>
              
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>

              <div className="newsletter">
                <h5>Newsletter</h5>
                <p>Subscribe to get updates on our latest projects.</p>
                <form className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    aria-label="Email address for newsletter"
                  />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                © {currentYear} Pindhood Media. All rights reserved. Made with{' '}
                <FaHeart className="heart-icon" /> for authentic storytelling.
              </p>
            </div>
            
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 