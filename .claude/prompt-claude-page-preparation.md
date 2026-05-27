Prompt Claude Code — Page "Préparation de votre voyage" — bilenekite.com
Contexte
Site Astro existant : bilenekite.com
Page à refondre : /fr/La-préparation-de-votre-voyage-a-bilene-au-mozambique/
Langue : Français (page FR — le site est trilingue FR/EN/ES, on travaille uniquement le FR ici)
Objectif : transformer une page quasi vide ("en cours de réalisation") en une page riche, rassurante et agréable à lire pour un primo-visiteur qui prépare son voyage kitesurf à Bilene, Mozambique.

Stack technique

Astro (version existante du projet)
GSAP (ScrollTrigger) pour les animations au scroll et la timeline de transfert
Motion (ou GSAP seul si déjà installé) pour les animations d'accordéon
Lenis pour le smooth scroll sur toute la page
Tous les composants interactifs en client:visible ou client:load — jamais de JS chargé inutilement
Garder le fonctionnement scss.

Structure de la page
La page est composée de 4 sections principales + une checklist finale.
Chaque section a :

Un titre visible en permanence
Un contenu qui se déplie en accordéon animé (GSAP ou Motion)
Une animation d'apparition au scroll (fade + légère translation vers le haut)

Sections :

Avant de partir
Arrivée à l'aéroport
Le transfert
À emporter


Comportements animés attendus
Animations générales

Apparition au scroll : chaque section apparaît avec un fade-in + translateY(30px → 0) déclenché par ScrollTrigger quand l'élément entre dans le viewport (client:visible)
Smooth scroll : Lenis sur toute la page pour un scroll fluide et premium
Accordéon : ouverture/fermeture animée (height 0 → auto, opacity 0 → 1), une seule section ouverte à la fois, la première ouverte par défaut

Timeline transfert (Section 3)
Composant visuel spécifique : une frise horizontale animée représentant le trajet :
✈️ Maputo → 🚗 Route (~3h) → 🌊 Bilene

Les étapes apparaissent séquentiellement au scroll (ScrollTrigger)
Style : icônes + durées + courte description sous chaque étape
Responsive : version verticale sur mobile

Checklist "Je suis prêt ?"

À la fin de la section "À emporter"
Liste d'items cochables (state local, pas de persistance nécessaire)
Animation de coche au clic (scale + couleur)
Items : Visa OK, Cash préparé, Assurance souscrite, Crème solaire, Lycra/combinaison, Lunettes kite, Trousse pharmacie, SIM/connectivité


Contenu à intégrer
Colle ici le contenu des 4 sections :

SECTION 1 — Avant de partir
Vols
De nombreuses compagnies desservent Maputo : Ethiopian Airlines, Qatar Airways, South African Airways, Turkish Airlines. La TAP Portugal se démarque avec un vol direct depuis Lisbonne. Comptez environ 10-11h de vol. Budget moyen : ~700€ l'A/R. Vols souvent de nuit au départ, retour en général de jour.
Visa
Depuis mai 2023, le visa s'obtient directement à l'arrivée à l'aéroport de Maputo. Coût : 10€. Votre passeport doit être valide plus de 6 mois après votre date d'arrivée. Nous vous envoyons au préalable la lettre d'hébergement nécessaire. Gardez précieusement le reçu remis par les autorités — il vous accompagne tout le séjour.
Monnaie
Venez avec un maximum de cash en euros. Une partie peut être changée à l'aéroport — les taux y sont très avantageux. Consultez-nous pour les quantités recommandées. Il existe quelques distributeurs à Bilene mais ils sont limités en montants et les frais bancaires sont élevés — mieux vaut ne pas compter dessus.
Santé
Aucune vaccination obligatoire pour le Mozambique. Les antipaludéens sont recommandés uniquement si vous prévoyez des visites en ville ou un safari. Et bonne nouvelle : Teresa, notre co-fondatrice, est infirmière urgentiste à la Croix-Rouge internationale. Les égratignures du quotidien sont entre de bonnes mains !
Assurance voyage
On vous la recommande fortement — prenez-en une avant de partir.
Connectivité
Le wifi est disponible au bar/restaurant. Pour le reste, on vous aide à vous procurer une carte SIM 4G locale sur place. Ça tourne bien — les visios Zoom ne sont pas un problème !

SECTION 2 — Arrivée à l'aéroport
L'aéroport de Maputo est un aéroport tout à fait fonctionnel. Prévoyez un peu de patience à l'arrivée — la file pour le visa on arrival peut prendre du temps selon l'affluence.
Dans la zone des contrôles, restez focus et gardez vos affaires près de vous. Il n'est pas rare qu'un douanier propose d'accélérer les choses contre un petit billet — un sourire, un regard dans les yeux, et un "no thank you" qui ne laisse pas de place au doute.
De même, des porteurs spontanés peuvent s'approcher pour "vous aider" avec vos bagages. Même réponse : sourire et refus poli mais ferme. Notre chauffeur vous attend juste après les contrôles — et là, vous êtes entre de bonnes mains. Il s'occupe de tout, bagages inclus.

SECTION 3 — Le transfert
Comptez environ 3 heures de route sur une route goudronnée en bon état. Nous réservons le taxi pour vous — un véhicule pouvant accueillir jusqu'à 4 personnes avec les board bags. Le trajet est une belle mise en bouche : on traverse des villages, on plonge dans les paysages typiquement africains. Le dépaysement commence bien avant d'arriver à Bilene.
(Intégrer ici la timeline animée : Maputo → Route 3h → Bilene)

SECTION 4 — À emporter
Tenue kite
On navigue en lycra la grande majorité du temps. Un shorty est utile les jours de vent fort. De septembre à novembre, une combinaison 4/3 peut être la bienvenue — de décembre à mars, la chaleur fait largement le job.
Indispensables

Lunettes de soleil adaptées à la pratique — on a souvent le soleil en face
Crème solaire + après-soleil
Chapeau ou casquette
Un pantalon et un pull léger, au cas où

Téléphone & connectivité
Votre téléphone débloqué (double SIM ou e-SIM) fera parfaitement l'affaire. On vous aide à vous procurer une carte SIM 4G locale dès votre arrivée.
Trousse pharmacie

Antipaludéens (si safari ou visite en ville prévus)
Anti-diarrhéique
Désinfectant + pansements
Antihistaminique
Paracétamol
Répulsif moustiques — bien moins envahissants qu'on ne le craindrait, mais quand même !

Cash
Venez avec suffisamment d'euros en liquide — voir section "Avant de partir" pour les conseils.
(Intégrer ici la checklist interactive "Je suis prêt ?")

Composants Astro à créer
AccordionSection.astro (ou .jsx si React nécessaire pour le state)
Props : title, icon, defaultOpen (boolean)
Comportement : accordéon animé, une section ouverte à la fois
Animation : GSAP ou Motion, height auto animé
TransferTimeline.astro
Composant visuel frise horizontale (desktop) / verticale (mobile)
Étapes : Aéroport Maputo → Route (3h, paysages africains) → Bilene Kite Center
Animations séquentielles au scroll via ScrollTrigger
Directive : client:visible
ReadyChecklist.jsx
Checklist interactive avec state local React
Items cochables avec animation au clic
Directive : client:visible
ScrollAnimWrapper.astro
Wrapper générique pour les animations fade-in au scroll
Utilise ScrollTrigger, applicable à n'importe quel bloc de contenu

Ton & style

Chaleureux, direct, rassurant — comme un ami qui a déjà fait le voyage
Pas de listes à puces froides — le contenu est rédigé, les listes sont réservées aux items vraiment listables (trousse pharma, indispensables)
Le client doit finir la page en se disant "j'ai pensé à tout, j'ai hâte d'y être"
Conserver le style visuel existant du site (couleurs, typographie)


Notes importantes

Ne pas toucher à la navigation existante ni au footer
La page doit rester rapide : JS uniquement dans les composants interactifs, client:visible partout
Images existantes disponibles dans /images/7-infos/ et /images/11-Accomodation/ — les réutiliser si pertinent
Page FAQ existante (/fr/la-faq-pour-bilene-au-mozambique/) : elle sera soit supprimée soit redirigée vers cette page — ne pas créer de doublon de contenu