import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/common/Navbar';
import MainPage from './pages/MainPage';
import Footer from './components/sections/Footer';

// Styles
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger after initial load
    ScrollTrigger.refresh();

    // Global page animations
    const ctx = gsap.context(() => {
      // Animate page entrance
      gsap.fromTo('body',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <MainPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
