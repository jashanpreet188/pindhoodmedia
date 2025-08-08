import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaPlay } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const videoRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean entrance animation inspired by modern design
      const tl = gsap.timeline({ delay: 0.5 });
      
      // Split title into individual letters for subtle animation
      const titleText = titleRef.current;
      const words = titleText.textContent.split(' ');
      titleText.innerHTML = words.map(word => 
        `<span class="word">${word.split('').map(letter => 
          `<span class="letter">${letter}</span>`
        ).join('')}</span>`
      ).join(' ');

      const letters = titleText.querySelectorAll('.letter');
      
      // Set initial states
      gsap.set(letters, { opacity: 0, y: 50, rotationY: 90 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(ctaRef.current.children, { opacity: 0, y: 20 });
      
      // Animate letters with stagger
      tl.to(letters, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .to(ctaRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");

      // Add subtle hover effect to letters
      letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            scale: 1.1,
            color: "#ff6b35",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        letter.addEventListener('mouseleave', () => {
          gsap.to(letter, {
            scale: 1,
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Video Background */}
      <div className="hero-video-container">
        <video 
          ref={videoRef}
          className="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/video-poster.jpg"
        >
          <source src="/collab.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="container">
          <div className="hero-main">
            <h1 className="hero-title" ref={titleRef}>
              PINDHOODMEDIA
            </h1>
            
            <p className="hero-subtitle" ref={subtitleRef}>
              Creative Excellence Redefined.
            </p>

            <div className="hero-cta" ref={ctaRef}>
              <button onClick={scrollToPortfolio} className="play-reel">
                <FaPlay className="play-icon" />
                Watch Our Work
              </button>
              
              <button onClick={scrollToContact} className="btn-primary">
                ↗Let's Connect↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 