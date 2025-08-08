import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay, FaPaintBrush, FaRocket, FaInstagram, FaShareAlt, FaVideo } from 'react-icons/fa';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(gridRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 1,
      title: "Video Direction & Production",
      description: "From concept to creation, we direct and produce compelling video content that tells your story with cinematic excellence rooted in Panjabi culture.",
      icon: FaVideo,
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop&crop=center",
      features: ["Concept Development", "Creative Direction", "Production Management", "Cultural Storytelling"]
    },
    {
      id: 2,
      title: "Video Editing & Post-Production",
      description: "Our expert editors shape raw footage into powerful narratives that resonate with audiences and amplify your brand's voice.",
      icon: FaPlay,
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop&crop=center",
      features: ["Professional Editing", "Color Grading", "Sound Design", "Motion Graphics"]
    },
    {
      id: 3,
      title: "Creative Design",
      description: "Visual identity that speaks volumes. We create designs that capture the essence of your brand while honoring our rich cultural heritage.",
      icon: FaPaintBrush,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center",
      features: ["Brand Identity", "Logo Design", "Print Design", "Digital Assets"]
    },
    {
      id: 4,
      title: "Brand Upgrowth Strategy",
      description: "We don't just build brands; we elevate them. Strategic planning that transforms your vision into a powerful market presence.",
      icon: FaRocket,
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop&crop=center",
      features: ["Brand Strategy", "Market Research", "Positioning", "Growth Planning"]
    },
    {
      id: 5,
      title: "Social Media Management",
      description: "From launching fresh talent to amplifying presence across platforms. We handle strategy, content creation, and community building.",
      icon: FaInstagram,
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&h=400&fit=crop&crop=center",
      features: ["Content Strategy", "Community Management", "Influencer Relations", "Analytics & Insights"]
    },
    {
      id: 6,
      title: "Content Distribution",
      description: "Ensuring your content reaches the right audience at the right time. We handle everything from strategy to distribution across all channels.",
      icon: FaShareAlt,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
      features: ["Multi-Platform Distribution", "Audience Targeting", "Performance Optimization", "Campaign Management"]
    }
  ];

  return (
    <section id="services" className="services section" ref={servicesRef}>
      <div className="container">
        <div className="services-header" ref={headerRef}>
          <h2>Our Services</h2>
          <p className="services-subtitle">
            We specialize in video direction, editing, creative design, and brand upgrowth — creating culture through every project.
          </p>
        </div>

        <div className="services-grid" ref={gridRef}>
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-image">
                <img src={service.image} alt={service.title} />
                <div className="service-overlay">
                  <service.icon className="service-icon" />
                </div>
              </div>
              
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <h3>Ready to Create Culture Together?</h3>
          <p>Let's bring your vision to life with our expertise and cultural authenticity.</p>
          <button 
            className="btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ↗ Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services; 