import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import WhatsAppWidget from './components/WhatsAppWidget';
import Footer from './components/Footer';

// Premium Visual Enhancements
import RouteProgressBar from './components/RouteProgressBar';
import GlowBlobs from './components/GlowBlobs';
import SEOHead from './components/SEOHead';

// Dedicated Pages
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import Courses from './components/Courses';
import ContactPage from './pages/ContactPage';

import CategoryGateway from './pages/CategoryGateway';
import EdTechLanding from './pages/EdTechLanding';
import BusinessPage from './pages/BusinessPage';
import ProductPage from './pages/ProductPage';
import { AnimatePresence, motion } from 'framer-motion';

// Scroll to top on route change helper component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return <AnimatePresence mode="wait"><motion.div key={location.pathname} className="route-transition" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}><Routes location={location}><Route path="/" element={<CategoryGateway />} /><Route path="/edtech" element={<EdTechLanding />} /><Route path="/it-services" element={<BusinessPage />} /><Route path="/it-consultancy" element={<BusinessPage />} /><Route path="/products" element={<ProductPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/courses" element={<Courses />} /><Route path="/events" element={<EventsPage />} /><Route path="/contact" element={<ContactPage />} /></Routes></motion.div></AnimatePresence>;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nextzen-theme') || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('nextzen-theme', theme);
  }, [theme]);
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Glowing backdrop meshes */}
        <GlowBlobs />

        {/* SPA Page loading indicator */}
        <RouteProgressBar />

        {/* Scroll Restorer */}
        <ScrollToTop />

        <SEOHead />

        {/* Global Navigation Header & Mobile bottom bar */}
        <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />

        <AnimatedRoutes />

        {/* Global Sticky Callbox */}
        <WhatsAppWidget />

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
