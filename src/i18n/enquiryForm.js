// URL du formulaire de contact, hebergé par l'app de gestion et affiché en
// iframe (#bkc-enquiry). Contrat d'intégration : .claude/ENQUIRY_FORM_EMBED.md
// Un seul token pour tout le site — remplace l'ancien Google Form + Zapier.
const ENQUIRY_FORM_BASE = 'https://web-bkc-mangement.vercel.app/?share=enquiry_form_agog169784';

export function enquiryFormUrl(lang = 'fr') {
  return `${ENQUIRY_FORM_BASE}&lang=${lang}`;
}
