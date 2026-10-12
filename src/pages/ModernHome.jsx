import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const initiatives = [
  { no: '01', title: 'Industry-ready learning', text: 'Structured paths, practical projects, and real mentorship for the next role.', path: '/courses', tone: 'orange' },
  { no: '02', title: 'Community momentum', text: 'A focused network where engineers exchange ideas, opportunities, and support.', path: '/about', tone: 'violet' },
  { no: '03', title: 'Career opportunities', text: 'Daily alerts, workshops, and preparation that turn learning into movement.', path: '/events', tone: 'cyan' },
];
const stats = [['5K+', 'active community members'], ['15+', 'learning paths'], ['20', 'seats per live cohort'], ['60', 'days to job-ready skills']];

function Reveal({ children, delay = 0, className = '' }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .75, delay, ease }}>{children}</motion.div>;
}

export default function ModernHome() {
  return <main className="modern-home">
    <section className="modern-hero">
      <div className="hero-image-layer" />
      <div className="hero-grain" />
      <div className="container modern-hero-grid">
        <div className="hero-copy-modern">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="eyebrow-modern"><span /> TECHNOLOGY & CAREER ECOSYSTEM</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1, ease }}>Connect.<br /><em>Learn.</em><br />Build. Lead.</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .3 }}>A modern learning and career ecosystem helping aspiring engineers turn curiosity into capability — and capability into opportunity.</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .42 }} className="modern-actions"><Link to="/courses" className="modern-button modern-button-solid">Explore the ecosystem <span>↗</span></Link><a href="https://chat.whatsapp.com/Cykv2WSysF09uCM1V5VenN" target="_blank" rel="noreferrer" className="modern-button modern-button-ghost">Join community <span>↗</span></a></motion.div>
          <div className="hero-proof"><span>Trusted by a growing community</span><div className="proof-avatars"><i>G</i><i>S</i><i>A</i><i>+</i></div></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .92, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: .15, ease }} className="hero-command-card"><div className="command-top"><span className="command-dot" /> LIVE COMMUNITY SIGNAL <span className="command-ping">●</span></div><div className="command-image"><img src="/bg.jpg" alt="Modern NextZen workspace" /></div><div className="command-overlay"><span>01 / NEXTZEN FIELD NOTE</span><strong>Skills compound<br /><em>when shared.</em></strong><Link to="/about">Read our approach ↗</Link></div><div className="command-footer"><span>COMMUNITY STATUS</span><strong>OPERATIONAL</strong></div></motion.div>
      </div>
      <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>

    <section className="stats-band"><div className="container stats-grid">{stats.map(([value, label], index) => <Reveal key={label} delay={index * .06}><div className="stat-item"><strong>{value}</strong><span>{label}</span></div></Reveal>)}</div></section>

    <section className="story-section container"><Reveal className="story-intro"><div><span className="section-kicker">THE NEXTZEN APPROACH</span><h2>More than a course.<br /><em>A launchpad.</em></h2></div><p>NextZen Technos connects learning, community, and opportunity in one focused ecosystem. No noise. Just the right next step, supported by people who have taken it before.</p></Reveal><div className="story-layout"><Reveal className="story-photo"><img src="/CEO.jpeg" alt="NextZen founder Gumpina Sri Charan" /><div className="story-photo-label"><span>FOUNDED BY</span><strong>G. Sri Charan</strong></div></Reveal><Reveal delay={.12} className="story-panel"><span className="story-number">01</span><h3>Learn with context.<br />Build with confidence.</h3><p>From technical foundations to data analytics, our programs are built around projects, practice, and the questions that show up in real work.</p><Link to="/courses" className="arrow-link">View the course catalog <span>↗</span></Link><div className="story-line"><i /><i /><i /><i /></div></Reveal></div></section>

    <section className="initiatives-section"><div className="container"><Reveal className="section-topline"><span className="section-kicker">THE ECOSYSTEM</span><span>03 / HOW WE HELP YOU MOVE</span></Reveal><Reveal className="initiative-heading"><h2>One ecosystem.<br /><em>Many ways forward.</em></h2><p>Choose the kind of momentum you need right now.</p></Reveal><div className="initiative-list">{initiatives.map((item, index) => <Reveal key={item.no} delay={index * .1}><Link to={item.path} className={`initiative-row ${item.tone}`}><span className="initiative-no">{item.no}</span><h3>{item.title}</h3><p>{item.text}</p><span className="initiative-arrow">↗</span></Link></Reveal>)}</div></div></section>

    <section className="offer-section container"><Reveal className="offer-card"><div><span className="section-kicker">CURRENTLY OPEN</span><h2>Become job-ready<br /><em>in 60 days.</em></h2><p>Industry-oriented Data Analyst Training with live sessions, two real projects, placement support, and a focused 20-seat cohort.</p><Link to="/courses" className="modern-button modern-button-solid">View the program <span>↗</span></Link></div><div className="offer-price"><span>LIMITED COHORT</span><strong>₹999</strong><del>₹2,499</del><small>SAVE 60%</small></div></Reveal></section>

    <section className="modern-cta"><div className="container"><Reveal><span className="section-kicker">READY WHEN YOU ARE</span><h2>Bring your next<br /><em>good question.</em></h2><Link to="/contact" className="modern-button modern-button-light">Talk to NextZen <span>↗</span></Link></Reveal></div></section>
  </main>;
}
