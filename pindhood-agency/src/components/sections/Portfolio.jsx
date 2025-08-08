import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const portfolioRef = useRef(null);
  const headerRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const videos = [
    {
      id: 1,
      title: "It Will Work Out In The End",
      description: "Self-awareness journey through Delhi's streets",
      src: "/it-will-workout.mp4",
      category: "Lifestyle"
    },
    {
      id: 2,
      title: "Pa, I've Sent You Letters",
      description: "Emotional storytelling through visual narrative",
      src: "/pa, ive sent you letters.mp4",
      category: "Narrative"
    },
    {
      id: 3,
      title: "My Debut Single",
      description: "Musical journey and artistic expression",
      src: "/debut-single.mp4",
      category: "Music"
    },
    {
      id: 4,
      title: "Hauz Khas",
      description: "Urban exploration and cultural essence",
      src: "/hauz khas.mp4",
      category: "Documentary"
    },
    {
      id: 5,
      title: "Reshmi Rumaal",
      description: "Traditional meets contemporary",
      src: "/reshmi-rumaal.mp4",
      category: "Cultural"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
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

      // Video section animations
      gsap.fromTo(videoSectionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animations for video containers
      gsap.utils.toArray('.video-container').forEach((container) => {
        gsap.to(container, {
          y: -10,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2
        });
      });

    }, portfolioRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Auto-play functionality
    if (isAutoPlay && videos.length > 0) {
      const currentVideoElement = videoRefs.current[currentVideo];
      if (currentVideoElement) {
        const handleVideoEnd = () => {
          setCurrentVideo((prev) => (prev + 1) % videos.length);
        };

        currentVideoElement.addEventListener('ended', handleVideoEnd);
        return () => currentVideoElement.removeEventListener('ended', handleVideoEnd);
      }
    }
  }, [currentVideo, isAutoPlay, videos.length]);

  const handleVideoClick = (index) => {
    setCurrentVideo(index);
    setIsAutoPlay(false);
  };

  return (
    <section id="portfolio" className="portfolio section" ref={portfolioRef}>
      <div className="container">
        {/* Header */}
        <div className="portfolio-header" ref={headerRef}>
          <h2>Our Work</h2>
          <p className="portfolio-subtitle">
            Experience our storytelling through motion, culture, and creativity. Every project tells a story of authentic expression rooted in Panjabi heritage.
          </p>
        </div>

        {/* Video Highlights Section */}
        <div className="video-highlights-section" ref={videoSectionRef}>
          <div className="video-highlights-header">
            <h3>Video Highlights</h3>
            <div className="video-controls">
              <button 
                className={`control-btn ${isAutoPlay ? 'active' : ''}`}
                onClick={() => setIsAutoPlay(!isAutoPlay)}
              >
                {isAutoPlay ? 'Auto Play ON' : 'Auto Play OFF'}
              </button>
            </div>
          </div>

          {/* Main Video Display */}
          <div className="main-video-container">
            <div className="video-wrapper">
              <video
                ref={(el) => videoRefs.current[currentVideo] = el}
                key={currentVideo}
                className="main-video"
                autoPlay
                muted
                loop={!isAutoPlay}
                playsInline
              >
                <source src={videos[currentVideo]?.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-overlay">
                <div className="video-info">
                  <span className="video-category">{videos[currentVideo]?.category}</span>
                  <h4 className="video-title">{videos[currentVideo]?.title}</h4>
                  <p className="video-description">{videos[currentVideo]?.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Thumbnails Grid */}
          <div className="video-thumbnails-grid">
            {videos.map((video, index) => (
              <div 
                key={video.id} 
                className={`video-container ${index === currentVideo ? 'active' : ''}`}
                onClick={() => handleVideoClick(index)}
              >
                <div className="video-thumbnail">
                  <video
                    ref={(el) => videoRefs.current[index] = el}
                    className="thumbnail-video"
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className="thumbnail-overlay">
                    <div className="play-button">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="video-details">
                  <span className="video-category">{video.category}</span>
                  <h5 className="video-title">{video.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="portfolio-cta">
          <h3>Ready to Create Your Story?</h3>
          <p>Let's bring your vision to life with the same passion and creativity.</p>
          <button
            className="cta-button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ↗ Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 