# SEO & multilingue — guide du site Bilene Kite Center

> Comment fonctionne l'optimisation SEO / réseaux sociaux / IA du site, et **comment ajouter une page ou une langue** sans rien casser.

## 1. Vue d'ensemble

Tout le SEO « technique » est **centralisé** dans 3 fichiers. Les pages ne contiennent plus de balises `<meta>` copiées-collées : elles déclarent juste un composant `<Seo>` qui génère le reste automatiquement.

| Fichier | Rôle |
|---|---|
| `src/i18n/pages.js` | **Source de vérité unique** : la liste des pages et leurs URL dans chaque langue. |
| `src/components/Seo.astro` | Composant `<head>` : title, description, canonical, hreflang, Open Graph, Twitter, og:locale. |
| `src/i18n/jsonld.js` | Données structurées Schema.org (JSON-LD) pour Google et les IA. |

Ce que `<Seo>` génère pour chaque page, automatiquement :
- `<title>` + `<meta name="description">`
- `<link rel="canonical">` (l'URL officielle de la page)
- `<link rel="alternate" hreflang>` vers **toutes** les langues + `x-default` (dit à Google que FR/EN/ES sont des traductions)
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`, `og:site_name`)
- Twitter Card (`twitter:card`, `twitter:site`, `twitter:title`, `twitter:description`, `twitter:image`)
- Un emplacement (`<slot/>`) pour injecter le JSON-LD propre à la page.

> ⚠️ La balise `<meta name="keywords">` a été **supprimée volontairement** : ignorée par tous les moteurs depuis ~2009, sans aucun effet sur le référencement. Ne pas la remettre.

## 2. Utiliser `<Seo>` dans une page

### Frontmatter (entre les `---` en haut du fichier)
```astro
---
import Seo from '../../components/Seo.astro';        // ../ selon la profondeur
import { businessJsonLd } from '../../i18n/jsonld.js';
// ...autres imports
---
```

### Dans le `<head>`
```astro
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Shrikhand&display=swap" rel="stylesheet">

    <Seo
        page="school"
        lang="fr"
        title="L'école de kite à Bilene au Mozambique"
        description="Votre école de kitesurf..."
        image="/images/accueil/3.webp">
        <script type="application/ld+json" set:html={JSON.stringify(businessJsonLd('fr'))} />
    </Seo>
    <Analytics />
</head>
```

### Props du composant `<Seo>`
| Prop | Obligatoire | Description |
|---|---|---|
| `page` | ✅ | Clé de la page dans `PAGES` (`src/i18n/pages.js`). Relie la page à ses traductions. |
| `lang` | ✅ | Langue de la page : `"fr"`, `"en"`, `"es"`… |
| `title` | ✅ | Titre de l'onglet / résultat Google. |
| `description` | ✅ | Meta description (≈ 150-160 caractères idéalement). |
| `image` | ❌ | Image de partage social. Défaut : `/images/accueil/1.webp`. Chemin absolu `/images/...` ou URL complète. |
| `type` | ❌ | `og:type`. Défaut `"website"` (mettre `"article"` pour le blog). |
| `noindex` | ❌ | `true` → la page n'est pas indexée (ex. pages de redirection, page secrète). |

## 3. Ajouter une PAGE

1. Créer le fichier `.astro` dans `src/pages/<lang>/`.
2. Ajouter une entrée dans `PAGES` (`src/i18n/pages.js`) avec une clé stable et le slug de chaque langue :
   ```js
   nouvelle_page: { fr: '/fr/...', en: '/en/...', es: '/es/...' },
   ```
3. Utiliser `<Seo page="nouvelle_page" lang="fr" ... />` dans la page (et idem dans les versions EN/ES).
4. `npm run build` puis vérifier le `<head>` généré.

> Règle d'or du projet : **toute page existe en FR + EN + ES** (voir mémoire `regle-multilingue`).

## 4. Ajouter une LANGUE (ex. allemand `de`)

1. Dans `src/i18n/pages.js` :
   - ajouter `'de'` dans `LANGS` ;
   - ajouter `de: 'de_DE'` dans `LOCALES` ;
   - ajouter la clé `de` + le slug dans **chaque** entrée de `PAGES`.
2. Si une traduction n'existe pas encore : **omettre** la langue dans l'entrée concernée (pas de fausse URL).
3. Créer les fichiers de pages `src/pages/de/...` avec `<Seo lang="de" ... />`.
4. Ajouter un menu `MenuDE.astro` (les menus ne sont pas encore centralisés — voir §7).

➡️ Le `hreflang` de **tout le site** se met à jour automatiquement : aucune autre page à toucher.

## 5. Données structurées (JSON-LD) — pour Google ET les IA

`src/i18n/jsonld.js` expose :
- `businessJsonLd(lang)` → `SportsActivityLocation` (le centre : nom, adresse, sport, saison, contact). À inclure sur (presque) toutes les pages.
- `organizationJsonLd()` → bloc `Organization` réutilisable.
- `faqJsonLd(items)` → génère un `FAQPage` à partir de `[{ q, a }, ...]`. À utiliser sur la page « Préparation du voyage » (questions fréquentes → citables directement par Google et les IA).

> ⚠️ **À compléter par Guillaume** dans `jsonld.js` (valeurs marquées `TODO`, actuellement commentées) :
> `telephone`, `geo` (coordonnées GPS exactes du centre), `sameAs` (URLs Facebook / Instagram / YouTube).
> Ne jamais inventer une valeur : si inconnue, laisser commentée.

## 6. Optimisation pour les IA / scrapers (GEO)

- **JSON-LD** (ci-dessus) = le levier n°1 : les LLM lisent Schema.org en priorité.
- **`public/llms.txt`** : résumé Markdown du site destiné aux IA (à créer — voir §8).
- **`public/robots.txt`** : autoriser explicitement les bots IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`) (à faire — voir §8).
- Contenu déjà favorable : texte descriptif riche, titres hiérarchisés, images en `.webp` avec `alt`.

## 7. Limites connues / dette technique

- **Menus** : `Menu.astro` / `MenuEN.astro` / `MenuES.astro` sont encore 3 fichiers séparés. À 6 langues, envisager un menu unique piloté par `pages.js`.
- **Pas de Layout commun** : chaque page a son propre `<!doctype html>`. Le `<head>` (charset, viewport, fonts) reste dupliqué — seul le SEO est centralisé. Une mutualisation en `Layout.astro` serait le prochain gain.
- **Slugs accentués** (`mentions-légales`, `La-préparation-...`) : fonctionnent (URL-encodés) mais à éviter pour les futures pages.

## 8. Reste à faire (au moment de la rédaction, 26/06/2026)

- [x] Fondation (`pages.js`, `Seo.astro`, `jsonld.js`) + pilote accueil FR
- [x] Déploiement `<Seo>` sur les 14 pages FR
- [x] Déploiement `<Seo>` sur les 15 pages EN
- [x] Déploiement `<Seo>` sur les 14 pages ES (pas de page « mentions légales » en ES)
- [x] `FAQPage` JSON-LD sur les 3 pages « Préparation du voyage » (14 questions/langue, via `const faqItems` dans le frontmatter)
- [x] `public/llms.txt` + bots IA explicitement autorisés dans `robots.txt`
- [ ] Compléter les `TODO` factuels de `jsonld.js` (téléphone, GPS, réseaux sociaux)
- [ ] Pages blog (hors plan de routes pour l'instant)

### Note FAQPage
Les questions/réponses vivent dans `const faqItems = [...]` du frontmatter de chaque page « Préparation du voyage » (FR/EN/ES), passées à `faqJsonLd()`. Elles **reprennent le contenu visible** de la section 5 — à garder synchronisées si le texte de la page change.

### Note llms.txt
`public/llms.txt` résume le centre + liste les pages principales (en anglais, convention du format). À mettre à jour si on ajoute/renomme des pages.
