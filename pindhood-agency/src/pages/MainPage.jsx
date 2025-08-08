import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';
import Contact from '../components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

const MainPage = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after initial load
    ScrollTrigger.refresh();

    // Main page animations
    const ctx = gsap.context(() => {
      // Add parallax effect to sections
      gsap.utils.toArray('.section').forEach((section, i) => {
        gsap.fromTo(section, 
          {
            y: i % 2 === 0 ? 50 : -50,
            opacity: 0.9
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Add subtle floating animation to cards and images
      gsap.utils.toArray('.service-card, .portfolio-item, .info-card').forEach((card) => {
        gsap.to(card, {
          y: -10,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2
        });
      });

    });

    return () => ctx.revert();
  }, []);

  // Handle scroll-to-section functionality
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Make scroll function globally available
  window.scrollToSection = scrollToSection;

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
    </>
  );
};

export default MainPage; 