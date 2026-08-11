// ============================================================================
//  WHATSAPP — NUMERO ET MESSAGES PRE-REMPLIS
// ----------------------------------------------------------------------------
//  SEUL numero a publier sur le site : le WhatsApp Business du centre (+258).
//  Ne JAMAIS remettre de numero personnel ici ni ailleurs.
//
//  Le message pre-rempli change selon la page ET la langue : quand quelqu'un
//  ecrit, on sait immediatement d'ou il vient, sans aucun outil de mesure.
//
//  POUR AJOUTER UNE PAGE : ajouter une entree dans MESSAGES avec la meme cle
//  que dans pages.js, puis passer page="cle" au composant <WhatsApp>.
//  Si la cle n'existe pas ici, le message DEFAULT est utilise (pas de casse).
// ============================================================================

// Format wa.me : indicatif pays + numero, sans "+", sans espaces.
export const WHATSAPP_NUMBER = '258870062521';

// Format E.164 pour les donnees structurees (JSON-LD).
export const WHATSAPP_E164 = '+258870062521';

const DEFAULT = {
  fr: 'Bonjour ! Je vous écris depuis bilenekite.com, j’aimerais des informations.',
  en: 'Hello! I’m writing from bilenekite.com, I’d like some information.',
  es: '¡Hola! Os escribo desde bilenekite.com, me gustaría más información.',
};

const MESSAGES = {
  prices: {
    fr: 'Bonjour ! Je regarde vos tarifs sur bilenekite.com et j’aimerais un devis.',
    en: 'Hello! I’m looking at your prices on bilenekite.com and I’d like a quote.',
    es: '¡Hola! Estoy viendo vuestros precios en bilenekite.com y me gustaría un presupuesto.',
  },
  school: {
    fr: 'Bonjour ! Je souhaite apprendre le kitesurf à Bilene, pouvez-vous m’en dire plus ?',
    en: 'Hello! I’d like to learn kitesurfing in Bilene, could you tell me more?',
    es: '¡Hola! Quiero aprender kitesurf en Bilene, ¿me podéis contar más?',
  },
  info: {
    fr: 'Bonjour ! J’ai une question sur l’organisation du voyage (visa, vols, transferts).',
    en: 'Hello! I have a question about organising the trip (visa, flights, transfers).',
    es: '¡Hola! Tengo una pregunta sobre la organización del viaje (visado, vuelos, traslados).',
  },
  trips: {
    fr: 'Bonjour ! Je suis intéressé par un kite trip au Mozambique.',
    en: 'Hello! I’m interested in a kite trip in Mozambique.',
    es: '¡Hola! Me interesa un kite trip en Mozambique.',
  },
  home: DEFAULT,
  // Landing page Google Ads : le message identifie la provenance publicitaire
  // sans aucun outil de mesure — on sait d'ou vient le contact des le 1er mot.
  lp: {
    fr: 'Bonjour ! Je viens de votre page kitesurf au Mozambique, j’aimerais des informations sur un séjour.',
    en: 'Hello! I’m coming from your Mozambique kitesurf page, I’d like information about a stay.',
    es: '¡Hola! Vengo de vuestra página de kitesurf en Mozambique, me gustaría información sobre una estancia.',
  },
};

// Libelle du bouton. Le numero n'est JAMAIS affiche — uniquement dans le lien.
const LABELS = {
  fr: 'Écrire au centre sur WhatsApp',
  en: 'Message the centre on WhatsApp',
  es: 'Escribir al centro por WhatsApp',
};

export function whatsappMessage(page = 'home', lang = 'fr') {
  const byLang = MESSAGES[page] ?? DEFAULT;
  return byLang[lang] ?? byLang.fr ?? DEFAULT.fr;
}

export function whatsappLink(page = 'home', lang = 'fr') {
  const text = encodeURIComponent(whatsappMessage(page, lang));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function whatsappLabel(lang = 'fr') {
  return LABELS[lang] ?? LABELS.fr;
}
