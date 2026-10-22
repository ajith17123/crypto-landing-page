import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Home from './components/Home';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // 1. Initialize AOS first so elements start fully visible
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });

    // 2. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // 3. Sync Lenis scroll events with ScrollTrigger (for future use)
    lenis.on('scroll', ScrollTrigger.update);

    // 4. Drive Lenis via GSAP ticker for a single synchronized RAF loop
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // 5. Intersection Observer — reveals .scroll-reveal elements as they enter viewport
    const revealEls = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
