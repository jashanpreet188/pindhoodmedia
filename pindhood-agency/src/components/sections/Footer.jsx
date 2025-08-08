import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaInstagram, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate logo on scroll
      gsap.fromTo(logoRef.current,
        { 
          scale: 0.8,
          opacity: 0,
          rotateY: 180
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Continuous subtle animation for logo
      gsap.to(logoRef.current, {
        rotateY: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section company-info">
            <h3>Pindhood Media</h3>
            <p>
              An independent creative agency rooted deep in the culture and spirit of Panjab. 
              We don't just produce — we create culture.
            </p>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FaEnvelope className="footer-icon" />
                <a href="mailto:pindhoodmedia@gmail.com">pindhoodmedia@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <FaPhone className="footer-icon" />
                <a href="tel:+917986596029">+91 79865 96029</a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="footer-section social-section">
            <h4>Connect With Us</h4>
            <div className="footer-social">
              <a 
                href="https://www.instagram.com/pindhoodmedia.co/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link instagram"
              >
                <FaInstagram />
              </a>
              <a href="#" className="footer-social-link">
                <FaLinkedin />
              </a>
              <a href="#" className="footer-social-link">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-section navigation">
            <h4>Navigate</h4>
            <nav className="footer-nav">
              <button onClick={() => scrollToSection('hero')}>Home</button>
              <button onClick={() => scrollToSection('about')}>About</button>
              <button onClick={() => scrollToSection('services')}>Services</button>
              <button onClick={() => scrollToSection('portfolio')}>Work</button>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </nav>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 Pindhood Media. All rights reserved.</p>
            <div className="footer-legal">
              <button>Privacy Policy</button>
              <button>Terms of Service</button>
              <button>Cookie Policy</button>
            </div>
          </div>
          
          {/* Animated Logo */}
          <div className="footer-logo" ref={logoRef}>
            <img src="/favicon.ico" alt="Pindhood Media" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 