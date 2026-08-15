// Formulaire de contact (app de gestion) : redimensionnement de l'iframe +
// evenement de conversion. Charge globalement via Footer.astro comme
// burger.js — ne fait rien sur les pages sans #bkc-enquiry (voir burger.js).
// Contrat : .claude/ENQUIRY_FORM_EMBED.md
const ENQUIRY_ORIGIN = 'https://web-bkc-mangement.vercel.app';

window.addEventListener('message', (e) => {
  if (e.origin !== ENQUIRY_ORIGIN) return;

  const iframe = document.getElementById('bkc-enquiry');
  if (!iframe) return;

  const data = e.data || {};

  if (data.type === 'bkc:height' && data.height) {
    iframe.style.height = data.height + 'px';
  }

  if (data.type === 'bkc:enquiry-sent' && !iframe.dataset.sent) {
    iframe.dataset.sent = 'true';
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        page_key: iframe.dataset.pageKey || 'info',
        page_language: document.documentElement.lang || 'fr',
      });
    }
  }
});
