export function trackEvent(name, details = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...details });
  if (import.meta.env.DEV) console.info(`[analytics] ${name}`, details);
}
