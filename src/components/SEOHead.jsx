import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const origin = 'https://nextzentechnos.in';
const pages = {
  '/': ['NextZen Technos | Technology Ecosystem', 'NextZen Technos connects education, IT services, technology consultancy, and product innovation in one ecosystem.'],
  '/edtech': ['NextZen EdTech | Learn, Build, Get Job-Ready', 'Practical courses, community, mentorship, career alerts, and data analytics training from NextZen Technos.'],
  '/it-services': ['NextZen IT Services | Cloud, Software, Data & AI', 'Build resilient digital foundations with NextZen software engineering, cloud, data, automation, and AI-ready services.'],
  '/it-consultancy': ['NextZen IT Consultancy | Strategy & Digital Transformation', 'Turn technology complexity into a clear roadmap with NextZen digital transformation, cloud advisory, workflow, and data consulting.'],
  '/products': ['NextZen Product Lab | SaaS & Technology Products', 'Explore NextZen product ideas, SaaS platforms, workflow tools, and future-facing technology products.'],
  '/about': ['About NextZen Technos | Learn, Build, Advise, Ship', 'Meet the technology ecosystem connecting learning, engineering, consulting, and product innovation.'],
  '/contact': ['Contact NextZen Technos | Start a Conversation', 'Talk to NextZen about education, technology services, consultancy, partnerships, or product innovation.'],
  '/courses': ['NextZen Courses | Technology Learning', 'Explore NextZen technology courses, data analytics training, and practical career learning.'],
  '/events': ['NextZen Events | Community and Career', 'Discover NextZen workshops, technology events, community sessions, and career opportunities.'],
};
const faqSchema = { '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Who can join the NextZen Technos community?', acceptedAnswer: { '@type': 'Answer', text: 'Anyone interested in learning technology can join the NextZen community.' } }, { '@type': 'Question', name: 'Are the courses certified?', acceptedAnswer: { '@type': 'Answer', text: 'Course completion includes a joint certification from NextZen Technos and QuadSync Tech Solutions.' } }] };
export default function SEOHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = pages[pathname] || pages['/'];
    const canonical = `${origin}${pathname === '/' ? '/' : pathname}`;
    document.title = title;
    const set = (selector, attribute, value) => document.querySelector(selector)?.setAttribute(attribute, value);
    set('meta[name="description"]', 'content', description); set('meta[property="og:title"]', 'content', title); set('meta[property="og:description"]', 'content', description); set('meta[property="og:url"]', 'content', canonical); set('meta[property="og:image"]', 'content', `${origin}/bg.jpg`); set('meta[name="twitter:title"]', 'content', title); set('meta[name="twitter:description"]', 'content', description); set('meta[name="twitter:image"]', 'content', `${origin}/bg.jpg`);
    let link = document.querySelector('link[rel="canonical"]'); if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); } link.href = canonical;
    document.querySelectorAll('script[data-nextzen-schema]').forEach((node) => node.remove());
    const schemas = [{ '@context': 'https://schema.org', '@type': 'Organization', name: 'NextZen Technos', url: origin, logo: `${origin}/Logo.png`, sameAs: ['https://www.linkedin.com/in/gumpina-sri-charan-70a699303'] }];
    if (pathname === '/contact' || pathname === '/edtech') schemas.push({ '@context': 'https://schema.org', ...faqSchema });
    if (pathname === '/edtech' || pathname === '/courses') schemas.push({ '@context': 'https://schema.org', '@type': 'Course', name: 'Industry-Oriented Data Analyst Program', description: 'An 8-week practical data analytics program covering Excel, SQL, Python, Power BI, and portfolio projects.', provider: { '@type': 'Organization', name: 'NextZen Technos' } });
    schemas.forEach((schema) => { const node = document.createElement('script'); node.type = 'application/ld+json'; node.dataset.nextzenSchema = 'true'; node.textContent = JSON.stringify(schema); document.head.appendChild(node); });
  }, [pathname]);
  return null;
}