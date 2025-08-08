import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const locationsRef = useRef(null);

  const locations = [
    { city: 'Mohali', country: 'Panjab', time: 'IST' },
    { city: 'Delhi', country: 'India', time: 'IST' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header on scroll
      gsap.fromTo(headerRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate content
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate locations
      gsap.fromTo(locationsRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: locationsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const getCurrentTime = (timezone) => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone === 'IST' ? 'Asia/Kolkata' : 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <section id="about" className="about section" ref={aboutRef}>
      <div className="container">
        {/* About Pindhood Header */}
        <div className="about-header" ref={headerRef}>
          <h2>About Pindhood</h2>
          <p className="contact-email">pindhoodmedia@gmail.com</p>
        </div>

        {/* About Content */}
        <div className="about-content" ref={contentRef}>
          <div className="about-story">
            <p>
              Pindhood Media® is an independent creative agency and production house rooted deep in the culture and spirit of Panjab — and we proudly wear it on our sleeves. We specialize in video direction, editing, creative design, and brand upgrowth. From launching fresh talent to amplifying their presence across social media, we handle everything from strategy to distribution.
            </p>
            <p>
              Our visuals speak stories, our edits shape identity, and our roots fuel everything we create. At Pindhood, we don't just produce — we create culture.
            </p>
          </div>
        </div>

        {/* Work Centers */}
        <div className="about-locations">
          <h3>{locations.length} Work Centers</h3>
          <div className="locations-grid" ref={locationsRef}>
            {locations.map((location, index) => (
              <div key={index} className="location-item">
                <div className="location-name">{location.city}, {location.country}</div>
                <div className="location-time">
                  {getCurrentTime(location.time)} {location.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 