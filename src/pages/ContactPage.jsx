import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ContactPage.css';
import { trackEvent } from '../utils/analytics';

const faqs = [
  ['Who can join the NextZen Technos community?', 'Anyone interested in learning technology—including engineering students, self-taught developers, beginners, and junior engineers.'],
  ['Are the courses certified?', 'Yes. Course completion includes a joint certification from NextZen Technos and QuadSync Tech Solutions.'],
  ['How do I receive daily placement and job updates?', 'Placement opportunities, internships, and bootcamp notifications are shared through our WhatsApp community channels.'],
  ['Is there a fee to join the community?', 'Community access is free. Structured certification courses have nominal pricing starting from ₹99.']
];
const initialForm = { name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' };

export default function ContactPage() {
  const [params] = useSearchParams();
  const [formData, setFormData] = useState({ ...initialForm, service: params.get('service') || '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const update = (event) => { const { name, value } = event.target; setFormData((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: '' })); };
  const validate = () => { const next = {}; if (!formData.name.trim()) next.name = 'Name is required.'; if (!/^\S+@\S+\.\S+$/.test(formData.email)) next.email = 'Enter a valid email address.'; if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10-digit phone number.'; if (!formData.service) next.service = 'Choose the service you need.'; if (!formData.message.trim()) next.message = 'Tell us briefly how we can help.'; setErrors(next); return !Object.keys(next).length; };
  const submit = (event) => { event.preventDefault(); if (!validate()) return; trackEvent('lead_form_submit', { service: formData.service, budget: formData.budget || 'not-shared', hasCompany: Boolean(formData.company) }); setSubmitted(true); };
  return <main id="main-content" className="contact-page-view fade-in-up">
    <div className="bg-grid-effect" /><div className="bg-radial-gradient contact-glow" />
    <section className="contact-section-wrapper page-top-section" style={{ paddingBottom: '80px' }}><div className="container">
      <div className="section-header"><span className="section-tag">CONNECT</span><h1>Get In Touch</h1><p>Choose the NextZen team you need. We’ll route your enquiry to the right people and respond with a useful next step.</p></div>
      <div className="contact-grid"><div className="contact-info-panel">
        <div className="interactive-card info-card"><div className="info-icon" aria-hidden="true">⌁</div><h2>WhatsApp Support</h2><p>Chat with us for registration, program, and partnership questions.</p><a onClick={() => trackEvent('whatsapp_click', { source: 'contact' })} href="https://wa.me/916301698365" target="_blank" rel="noopener noreferrer" className="info-link">+91 63016 98365</a></div>
        <div className="interactive-card info-card"><div className="info-icon" aria-hidden="true">@</div><h2>Email Inquiry</h2><p>For partnership proposals and corporate collaborations.</p><a href="mailto:support@nextzentechnos.in" className="info-link">support@nextzentechnos.in</a></div>
      </div><div className="contact-form-container glass-panel">{submitted ? <div className="form-success-overlay" role="status"><div className="success-icon" aria-hidden="true">✓</div><h2>Message received.</h2><p>Thanks for sharing the context. A NextZen representative will contact you on WhatsApp or email shortly.</p><button type="button" onClick={() => { setSubmitted(false); setFormData(initialForm); }} className="btn-primary">Send another message</button></div> : <form onSubmit={submit} className="contact-form" noValidate>
        <Field label="Full Name" name="name" value={formData.name} onChange={update} error={errors.name} placeholder="e.g. John Doe" />
        <Field label="Email Address" name="email" type="email" value={formData.email} onChange={update} error={errors.email} placeholder="e.g. john@example.com" />
        <Field label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={update} error={errors.phone} placeholder="e.g. 9876543210" />
        <Field label="Company / Organisation" name="company" value={formData.company} onChange={update} placeholder="Optional" />
        <div className="form-group"><label htmlFor="service">Required service <span aria-hidden="true">*</span></label><select id="service" name="service" value={formData.service} onChange={update} aria-invalid={Boolean(errors.service)}><option value="">Choose a company area</option><option value="edtech">EdTech and training</option><option value="it-services">IT services and software</option><option value="it-consultancy">IT consultancy and strategy</option><option value="products">Product or SaaS partnership</option><option value="general">General enquiry</option></select>{errors.service && <span className="error-text" role="alert">{errors.service}</span>}</div>
        <div className="form-group"><label htmlFor="budget">Project budget</label><select id="budget" name="budget" value={formData.budget} onChange={update}><option value="">Prefer not to say</option><option value="under-1l">Under ₹1 lakh</option><option value="1-5l">₹1–5 lakh</option><option value="5-15l">₹5–15 lakh</option><option value="15l-plus">₹15 lakh+</option><option value="not-sure">Not sure yet</option></select></div>
        <div className="form-group"><label htmlFor="message">Project message <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="5" value={formData.message} onChange={update} placeholder="Tell us about your goal, timeline, or question..." aria-invalid={Boolean(errors.message)} />{errors.message && <span className="error-text" role="alert">{errors.message}</span>}</div>
        <button type="submit" className="btn-primary submit-btn">Send qualified enquiry <span aria-hidden="true">↗</span></button>
      </form>}</div></div>
    </div></section>
    <section className="faq-section" style={{ paddingBottom: '120px' }}><div className="container"><div className="section-header"><span className="section-tag">SUPPORT</span><h2>Frequently Asked Questions</h2><p>Quick answers to common questions about our community, training, and services.</p></div><div className="faq-accordion-list" style={{ maxWidth: '800px', margin: '0 auto' }}>{faqs.map(([question, answer], index) => <div key={question} className={`faq-item glass-panel ${activeFaq === index ? 'faq-active' : ''}`}><button type="button" className="faq-question-row" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}><h3>{question}</h3><span aria-hidden="true">＋</span></button>{activeFaq === index && <div className="faq-answer-row"><p>{answer}</p></div>}</div>)}</div></div></section>
  </main>;
}
function Field({ label, name, type = 'text', value, onChange, error, placeholder }) { return <div className="form-group"><label htmlFor={name}>{label} {error && <span className="sr-only">Error</span>}</label><input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} aria-invalid={Boolean(error)} />{error && <span className="error-text" role="alert">{error}</span>}</div>; }