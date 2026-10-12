import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { trackEvent } from '../utils/analytics';
import './Navbar.css';

const menus = [
  { path: '/edtech', label: 'EdTech', items: [['/courses', 'Courses'], ['/events', 'Events'], ['/edtech#community', 'Community'], ['/edtech#career', 'Career Support']] },
  { path: '/it-services', label: 'IT Services', items: [['/it-services#web', 'Web Development'], ['/it-services#apps', 'App Development'], ['/it-services#cloud', 'Cloud Services'], ['/it-services#data', 'Data & AI']] },
  { path: '/it-consultancy', label: 'IT Consultancy', items: [['/it-consultancy#transformation', 'Digital Transformation'], ['/it-consultancy#cloud', 'Cloud Advisory'], ['/it-consultancy#strategy', 'Technology Strategy']] },
  { path: '/products', label: 'Products', items: [['/products#lab', 'Product Lab'], ['/products#saas', 'SaaS Products'], ['/products#roadmap', 'Roadmap']] },
];

function SmartLink({ path, children, className = '', onClick }) {
  return <NavLink to={path} className={className} onClick={() => { trackEvent('navigation_click', { path }); onClick?.(); }}>{children}</NavLink>;
}

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const close = () => { setOpen(false); setOpenMenu(null); };
  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  return <nav className="navbar-container" aria-label="Primary navigation">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="navbar-content glass-panel">
      <SmartLink path="/" className="nav-logo" onClick={close}>
        <img src="/Logo.png" alt="NextZen Technos" className="logo-img" />
        <div className="logo-text-group"><span className="logo-text">Next<span className="orange-highlight">Zen</span> Technos</span><span className="logo-subtitle">TECHNOLOGY ECOSYSTEM</span></div>
      </SmartLink>
      <div className="nav-links-desktop">
        <SmartLink path="/" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Home</SmartLink>
        {menus.map((menu, index) => <div className="nav-menu" key={menu.path}>
          <div className="nav-menu-trigger-row"><SmartLink path={menu.path} className={`nav-btn ${location.pathname === menu.path ? 'active' : ''}`}>{menu.label}</SmartLink><button type="button" className="nav-menu-toggle" aria-label={`Open ${menu.label} menu`} aria-expanded={openMenu === index} onClick={() => setOpenMenu(openMenu === index ? null : index)}>⌄</button></div>
          <AnimatePresence>{openMenu === index && <motion.div className="nav-dropdown" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
            <span className="nav-dropdown-kicker">NEXTZEN / {menu.label.toUpperCase()}</span>
            {menu.items.map(([path, label]) => <SmartLink key={path} path={path} className="nav-dropdown-link" onClick={() => setOpenMenu(null)}><span>{label}</span><b>↗</b></SmartLink>)}
          </motion.div>}</AnimatePresence>
        </div>)}
        <SmartLink path="/about" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>About</SmartLink>
        <button type="button" className="theme-toggle" onClick={() => { trackEvent('theme_preference', { nextTheme: theme === 'dark' ? 'light' : 'dark' }); onToggleTheme(); }} aria-label={themeLabel} title={themeLabel}><span>{theme === 'dark' ? '☼' : '☾'}</span></button>
        <SmartLink path="/contact" className="nav-btn-cta">Contact <span>↗</span></SmartLink>
      </div>
      <button className={`mobile-menu-toggle ${open ? 'is-open' : ''}`} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}><i /><i /><i /></button>
    </div>
    <AnimatePresence>{open && <motion.div className="mobile-menu-panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .22 }}>
      <span className="mobile-menu-label">NEXTZEN / EXPLORE</span><SmartLink path="/" onClick={close} className="mobile-link">Home <span>↗</span></SmartLink>
      {menus.map((menu, index) => <div className="mobile-menu-group" key={menu.path}><div className="mobile-menu-parent"><SmartLink path={menu.path} onClick={close} className="mobile-link">{menu.label} <span>↗</span></SmartLink><button type="button" aria-label={`Toggle ${menu.label} links`} onClick={() => setOpenMenu(openMenu === index ? null : index)}>⌄</button></div>{openMenu === index && <div className="mobile-sub-links">{menu.items.map(([path, label]) => <SmartLink key={path} path={path} onClick={close} className="mobile-sub-link">{label}</SmartLink>)}</div>}</div>)}
      <SmartLink path="/about" onClick={close} className="mobile-link">About <span>↗</span></SmartLink><button type="button" className="mobile-theme-toggle" onClick={onToggleTheme}><span>{theme === 'dark' ? '☼' : '☾'}</span>{themeLabel}</button><SmartLink path="/contact" onClick={close} className="mobile-link mobile-link-cta">Start a conversation <span>↗</span></SmartLink>
    </motion.div>}</AnimatePresence>
  </nav>;
}