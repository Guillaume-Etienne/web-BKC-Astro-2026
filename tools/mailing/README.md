# Mailing clubs & écoles de kite (FR, ES)

Campagne de prospection B2B vers les clubs et écoles de kite.
Angle : « emmenez votre club kiter au Mozambique », CTA vers la page du
programme ambassadeurs.

**Une langue = un marché, pas une traduction du site.** La règle « toute modif
→ FR + EN + ES » ne s'applique pas ici : chaque mail part vers sa propre liste
de contacts, et une langue n'est écrite que quand la liste existe. FR/CH/BE
depuis le 28/08/2026, **Espagne depuis le 20/09/2026** (voir plus bas),
d'autres langues à suivre.

## Les fichiers à envoyer

Deux envois, deux fichiers :

1. `mailing-clubs-ecoles-fr.html` — le **1er mail**, parti le 28/08/2026 ;
2. `relance-clubs-ecoles-fr-b.html` — la **relance** HTML, aux non-cliqueurs
   (variante B retenue le 18/09/2026 ; la `-a.html` ne part pas) ;
3. `relance-cliqueurs-texte.md` — le mail **texte brut** aux 46 cliqueurs.
   Pas de HTML à générer : le texte est dans le fichier, à coller dans Brevo.
4. `mailing-clubs-escuelas-es.html` — le **1er mail espagnol**, vers les 158
   écoles et clubs d'Espagne (voir « La campagne espagnole »).

C'est le HTML qu'on colle dans Brevo. Ils sont **générés** : ne pas les éditer à
la main, les modifications seraient écrasées à la prochaine génération.

## Régénérer

```bash
node tools/mailing/gen-mailing.cjs
```

`.cjs` et non `.js` : le `package.json` du projet est en `"type": "module"`.

Les briques communes aux deux campagnes (helpers de mise en page, palette,
liste des images et des URL, balises Brevo, `<head>`) vivent dans `lib.cjs` —
extraites le 28/08/2026 à l'arrivée de la relance. Une modification de `lib.cjs`
change **les deux** mails : après y avoir touché, régénérer le premier mailing
et vérifier qu'il n'a pas bougé (`git diff --stat tools/mailing/`).

Le générateur reprend le `<head>` de `template-mailchimp-chris.html` tel quel
(styles responsive, empilement mobile, correctifs Outlook) et réécrit tout le
corps. Ce `<head>` vient de Mailchimp mais n'est que du CSS : aucune dépendance
à la plateforme.

## Les images

Hébergées par nous, dans `public/images/mailing/`, et **pas** chez le
prestataire d'emailing : des URL Mailchimp casseraient le jour où ce compte
fermerait, y compris dans des mails déjà partis.

```bash
node tools/mailing/prepare-images-mailing.cjs
```

Télécharge, redimensionne à 2× la largeur d'affichage, compresse en JPEG q80
(le logo reste en PNG détouré). 1454 Ko → 583 Ko.

> ⚠️ `public/images/mailing/` doit être **déployé en FTP avant** l'envoi de la
> campagne, sinon le mail part avec des images en 404.

Relecture locale avant déploiement, en servant `public/` sur le port 8898 :

```bash
MAIL_IMG_BASE=http://localhost:8898/images/mailing/ node tools/mailing/gen-mailing.cjs
```

## Objet et aperçu du texte

À saisir dans Brevo, **pas dans le HTML** :

> **Objet** — Bilène, Mozambique : 15 km de lagon, 1 m de fond, personne dessus
>
> **Aperçu du texte** — Du vent 9 jours sur 10 de septembre à mars — et le
> voyage de l'organisateur est offert.

L'aperçu apporte volontairement une information que l'objet ne donne pas : le
vent et la saison. Répéter le lagon aurait gâché le seul autre espace visible
avant ouverture.

**Nom d'expéditeur** : « Guillaume – Bilene Kite Center ». En B2B un prénom
ouvre mieux qu'une marque seule.

Le `<title>` du HTML reprend l'objet, mais **ce n'est pas lui l'objet de
l'e-mail** : il sert à la version « voir dans le navigateur ».

⚠️ Le HTML ne contient **volontairement pas** de préheader caché : Brevo injecte
le sien à l'envoi, et un second ferait doublon dans la boîte de réception. Donc
si le champ « Aperçu du texte » de Brevo est laissé vide, l'aperçu retombera sur
le premier texte visible du mail (« Affichez cet e-mail dans votre navigateur »).
**Il faut le remplir.**

Éviter « GRATUIT » dans l'objet : déclencheur classique de filtres anti-spam sur
un premier contact à froid. « Offert » dit la même chose sans le risque.

## Envoi via Brevo

Coller dans **« Code HTML personnalisé »** (le « Code your own » de la doc
anglaise), accessible depuis Design → « Créer de zéro ».

| | |
|---|---|
| `{{ mirror }}` | voir dans le navigateur |
| `{{ unsubscribe }}` | désabonnement — **obligatoire** |

L'éditeur HTML et le drag-and-drop utilisent `{{ unsubscribe }}` ; l'éditeur
*classique*, lui, attend `[UNSUBSCRIBE]`. Ne pas s'y tromper.

Brevo **refuse d'enregistrer une campagne** sans balise de désabonnement
valide : si l'enregistrement passe, la balise a été reconnue. `{{ mirror }}`
ne bénéficie d'aucune validation équivalente — c'est celui-là qu'il faut
vérifier dans l'envoi de test.

`{{ update_profile }}` n'est pas utilisé : il exige un formulaire de mise à
jour de profil créé côté Brevo et son identifiant à 24 caractères.

Sur le plan gratuit, les liens d'un e-mail de test expirent ~30 min après
réception : un lien mort dans un vieux test n'est pas forcément un bug.

## La relance HTML — envoi prévu le mardi 22/09/2026, 8h30

Deuxième mail de la séquence, court : rappel en quelques lignes, une photo, un
bouton vers `/programme-ambassadeurs/`. Pour les **non-cliqueurs uniquement**
(les 46 cliqueurs reçoivent le mail texte, voir `relance-cliqueurs-texte.md`).

**Variante B retenue** le 18/09/2026 : la relance qui s'assume (« on sait,
encore nous »), décalée mais B2B. La `-a.html` (humour discret, angle « la
saison vient d'ouvrir ») est conservée mais ne part pas.

Le mardi matin plutôt que le vendredi après-midi : les chiffres du 1er envoi
montrent que l'heure pèse bien plus que le jour (voir plus bas). Initialement
prévue le 11/09, la relance a glissé d'une dizaine de jours.

Deux formulations relatives ont été recalées le 18/09 dans le générateur, la
relance ne partant plus quinze jours après le 1er mail mais trois semaines :
« Il y a quinze jours » → « Fin août », et le « mardi matin » de la vanne →
« vendredi matin », le jour où le 1er mail est réellement arrivé.

```bash
node tools/mailing/gen-relance-clubs-ecoles-fr.cjs                      # -> ...-a.html
RELANCE_VARIANT=b node tools/mailing/gen-relance-clubs-ecoles-fr.cjs    # -> ...-b.html
```

Même remarque que pour le premier mail : les HTML sont **générés**, ne pas les
éditer à la main. `MAIL_IMG_BASE` fonctionne pareil pour la relecture locale.

La relance ne réutilise **que des images déjà déployées** (`hero-lagon.jpg`,
plus le logo et les icônes) : rien de nouveau à envoyer en FTP si le premier
mailing est parti.

### Objet et aperçu du texte — relance

Trois couples possibles, l'aperçu apporte toujours ce que l'objet ne dit pas :

**Variante A**

> **Objet** — On remet le lien (le lagon, lui, n'a pas bougé)
>
> **Aperçu** — Bilène, Mozambique : le voyage de l'organisateur est offert dès 3 personnes amenées.

> **Objet** — Votre sortie club de cet hiver, en trois lignes
>
> **Aperçu** — Un lagon fermé de 15 km au Mozambique, du vent 9 jours sur 10, et votre voyage offert.

**Variante B**

> **Objet** — Deuxième mail, et le dernier
>
> **Aperçu** — Emmener votre club kiter au Mozambique — et repartir sans payer votre propre séjour.

Toujours pas de « GRATUIT » (filtres anti-spam), toujours pas de préheader dans
le HTML : c'est Brevo qui l'injecte, le champ « Aperçu du texte » **doit** être
rempli. Nom d'expéditeur inchangé : « Guillaume – Bilene Kite Center ».

L'objet de la 1re campagne (« 15 km de lagon, 1 m de fond, personne dessus »)
n'est volontairement pas repris tel quel : il a déjà échoué à faire ouvrir ces
contacts-là, et un doublon exact dans la boîte de réception se lit comme un
renvoi automatique.

### Résultats du 1er envoi (28-29/08/2026)

Deux envois, parce que le plan gratuit Brevo plafonne à **300 e-mails par jour** :

| | ven. 28/08, 14h00 | sam. 29/08, 10h41 | Total |
|---|---|---|---|
| Délivrés | 289 | 96 | **385** |
| Ouvertures | 148 (51,2 %) | 45 (46,9 %) | **193 (50,1 %)** |
| Clics (total) | 30 (10,4 %) | 16 (16,7 %) | **46 (11,9 %)** |
| **Cliqueurs uniques** | **16** | **4** | **20** |
| Désinscrits | 3 | 0 | 3 |

⚠️ **Les compteurs de Brevo sont trompeurs, vérifiés le 18/09 en remontant aux
contacts réels :**

- **« Clics » = clics au total, pas des personnes.** Le filtre contacts « a
  cliqué dans la campagne #4 » ne renvoie que **16 contacts**, pas 30. Sur les
  deux campagnes réunies : **20 cliqueurs uniques**, pas 46.
- **Les ouvertures incluent Apple MPP** (préchargement des images par Apple, qui
  compte comme une ouverture sans que personne ne lise). En excluant Apple MPP,
  la campagne #4 tombe de **148 à 93 ouvreurs réels**, soit **32,2 %** et non
  51,2 %.

La vraie lecture : 32 % d'ouverture et 5,5 % de cliqueurs uniques. Ça reste
au-dessus des standards du B2B à froid (20-25 % et 2-3 %), mais loin des
chiffres qu'affiche le tableau de bord.

**Et 20 personnes sur la page ambassadeurs pour 1 seule réponse** : le mail
fonctionne, la conversion se perd après le clic, sur `/programme-ambassadeurs/`.
D'où l'ajout du formulaire de contact sur cette page (elle n'offrait qu'un bouton
WhatsApp, que peu de gérants de club ouvrent pour un premier contact
professionnel).

À noter : l'envoi du **samedi matin** a fait +60 % de clics sur celui du
**vendredi après-midi**, à ouvertures comparables. L'heure pèse plus que le jour.

### Ciblage de la relance

Le plan initial (« relancer les non-cliqueurs ») a été **revu à la lecture des
chiffres** : les 46 cliqueurs sont les contacts les plus chauds de la liste, et
leur renvoyer le même lien ne peut rien donner. Deux publics, deux messages :

| Public | Taille | Message |
|---|---|---|
| A cliqué, pas répondu | **20** | `relance-cliqueurs-texte.md` — mail **texte brut**, une question, aucun lien |
| N'a pas cliqué, liste `-1` | **273** | `relance-clubs-ecoles-fr-b.html` — la relance HTML, lot 1 |
| N'a pas cliqué, liste `-2` | ~92 | la même, lot 2, le lendemain |

⚠️ Les 20 cliqueurs doivent être **exclus** des deux lots de la relance HTML :
personne ne doit recevoir les deux messages. Le plafond de 300/jour impose de
toute façon de scinder en deux matins.

À 20 destinataires, le mail texte se justifie encore plus d'être envoyé **à la
main depuis Gmail** plutôt que via Brevo : 20 messages, un quart d'heure.

Dans les deux cas, retirer le club qui a déjà répondu. Les désabonnés et les
hard bounces sont exclus automatiquement par Brevo. Relancer quelqu'un qui a
déjà répondu est le plus sûr moyen de perdre le contact.

## La campagne espagnole (septembre 2026)

```bash
node tools/mailing/gen-mailing-clubs-escuelas-es.cjs   # -> mailing-clubs-escuelas-es.html
```

**Ce n'est pas la traduction du mail français.** La v1 l'était, et Teresa l'a
rejetée. Le texte a été **réécrit en espagnol** le 21/09/2026 à partir des
mêmes faits (15 km de lagune, 1 m de fond, vent 9 jours sur 10, 12 kiters au
maximum, les paliers du programme). Mêmes photos, même structure en 10 blocs,
même angle — pas une phrase traduite.

Ce qui trahissait la traduction, à ne pas réintroduire :

- **les espaces insécables avant `:` `;` `?` `!`** — règle typographique
  française qui n'existe pas en espagnol, et qui signe le calque dès la
  première ligne. Les `¿` et `¡` ouvrants, eux, sont obligatoires ;
- **« personas traídas »**, calque de « personnes amenées ». En espagnol :
  « tres personas que se apunten contigo » ;
- **« tu estructura »** pour parler d'une école (calque de « structure ») →
  « tu escuela o tu club » ;
- des phrases trop longues : le ton commercial espagnol est plus court et plus
  direct que l'ironie écrite du français.

Deux choix de fond, propres au marché espagnol :

- **l'argument n'est pas le plan d'eau mais le vide.** Un Espagnol a Tarifa, il
  connaît l'eau plate et le vent ; ce qu'il n'a pas, c'est un spot désert. D'où
  la quatrième puce du bloc spot, absente du mail français : « doce kiters en
  el agua como mucho — es nuestro récord de gente, no nuestra media » ;
- **« Teresa es española, así que escríbenos en castellano sin problema »** dans
  le bloc équipe : le seul frein que la version française n'avait pas à lever.

Les URL pointent toutes vers la partie `/es/` du site — `urlsFor('es')` dans
`lib.cjs`, dont la table de slugs recopie `src/i18n/pages.js`.

### Le 11e bloc, écrit par Teresa

Elle a relu, corrigé sept endroits, et **écrit elle-même un bloc que le mail
français n'a pas** : « Aprovéchate de nuestra experiencia ». Il porte un
argument qui n'était écrit nulle part — **ici, le matériel, on le monte et on
le range pour le client** : « sí, aquí no montas ni recoges, lo hacemos
nosotros ». Ses mots sont conservés tels quels, seule la ponctuation a été
remise d'aplomb.

Conséquence sur la structure : le bloc « El grupo » ne parle plus du centre
mais **des soirées** (un plan différent chaque soir, restaurants locaux,
braais) ; le centre, l'expérience et les instructeurs IKO ont leur bloc à eux.
C'est le seul bloc sans photo — les neuf images du mail étaient déjà prises, et
le mail est assez long comme ça.

Cet argument a été repris sur la page ES, dans les trois points rapides du
séjour. Le mail et la page doivent rester du même espagnol.

**Page de destination** : `/es/programa-embajadores/`, version espagnole de
`/programme-ambassadeurs/`, même régime (noindex, hors `pages.js`, hors
sitemap). Elle embarque déjà le formulaire de contact — la leçon des 20 clics
pour 1 réponse côté français.

**Aucune nouvelle image** : le mail espagnol ne réutilise que
`public/images/mailing/`, déployé depuis le 28/08. Rien à renvoyer en FTP,
sauf la page ES elle-même.

### La liste

Onglet « 5. Espagne » de `Annuaire_kite_FR_BE_CH_ES.xlsx` : 168 lignes et
**169 adresses uniques** — certaines cellules en contiennent deux. 46 à Tarifa,
puis Canaries, Baléares, Levante, Catalogne. 30 adresses sont en gmail/hotmail.

⚠️ **Le piège du fichier source** : les adresses multiples d'une même cellule
sont séparées tantôt par `;` ou `,`, tantôt par une **espace**. Un découpage
sur les seuls séparateurs classiques laisse « a@x.com b@y.com » dans une seule
cellule, et Brevo **rejette silencieusement toute la ligne** : c'est ce qui a
fait tomber le premier import à 144 contacts au lieu de 158. Découper sur
`[;,/s]+` et valider chaque adresse avant d'écrire le CSV.

Quand une structure a deux adresses, **une seule part** : deux fois le même
mail au même club, c'est un signalement spam. On garde l'adresse générique
(`info@`) plutôt que la comptabilité ou le secrétariat, le domaine propre
plutôt que le gmail, et le centre local plutôt que la centrale de réservation.
Seule exception : deux implantations réellement distinctes (Anywhere Water
Sports, Badalona et Barcelone).

Le CSV d'import Brevo est généré **hors du dépôt** (`Downloads/Claude outputs/
brevo-club-kite-ES-2026.csv`, la liste complète et corrigée) : il contient des adresses nominatives et le
projet a un miroir GitHub public.

158 contacts tiennent **sous le plafond de 300/jour** du plan gratuit : un seul
lot, un seul envoi — contrairement au français, scindé en deux matins.

### Objet et aperçu du texte — Espagne

> **Objet** — Bilene, Mozambique: 15 km de agua plana y doce kiters como mucho
>
> **Aperçu** — Viento nueve días de cada diez, de septiembre a marzo. Y si
> montas tú el grupo, tu plaza te sale gratis.

L'objet mise sur le chiffre qui parle à quelqu'un qui navigue à Tarifa en
août : **douze**. L'aperçu apporte le vent et la gratuité, que l'objet ne dit
pas. Pas de « GRATIS » dans l'objet (filtres anti-spam).

## Les campagnes allemande et polonaise (21/09/2026)

`gen-mailing-kiteschulen-de.cjs` → `mailing-kiteschulen-de.html`,
`gen-mailing-szkoly-kite-pl.cjs` → `mailing-szkoly-kite-pl.html`.

**Écrits dans la langue, pas traduits** — même leçon que l'espagnol. Base :
les faits et la structure du mail espagnol (11 blocs, dont celui de Teresa
sur le matériel qu'on monte et range pour le client). Vocabulaire vérifié par
des agents sur de vrais sites d'écoles kite allemandes et polonaises ; les
règles de plume sont en tête de chaque générateur.

- **Tutoiement** dans les deux langues (« du » / « Ty ») : c'est l'usage des
  écoles kite des deux pays.
- Le programme s'appelle **« Gruppenprogramm »** en allemand (« Botschafter »
  n'existe pas dans le milieu), **« Program Ambasadorski »** en polonais.
- Liens secondaires vers le **site anglais** (`urlsFor('de'|'pl')`), CTA vers
  le bloc contact de la page dans la langue (`#amb-contact`).
- Personne ne parle allemand ni polonais au centre : **Guillaume répond**. Le
  mail dit dans quelle langue on peut écrire, pas dans laquelle on répondra.

### Objet et aperçu du texte — Allemagne / Pologne

> **Objet DE** — Bilene, Mosambik: 15 km Flachwasser und höchstens zwölf Kiter
>
> **Aperçu DE** — Wind an neun von zehn Tagen, von September bis März. Und
> wenn du die Gruppe zusammenstellst, zahlst du für deinen Aufenthalt nichts.

> **Objet PL** — Bilene, Mozambik: 15 km płaskiej wody i najwyżej 12 osób na spocie
>
> **Aperçu PL** — Wieje dziewięć dni na dziesięć, od września do marca. A
> jeśli zbierzesz grupę, za swój pobyt nie zapłacisz.

Expéditeur : « Guillaume von Bilene Kite » / « Guillaume z Bilene Kite » — le
« de » de l'expéditeur français est du français.

## Pièges appris (à ne pas refaire)

- **Le logo est blanc + vert.** Sur fond clair il n'en reste que le swoosh vert.
  Il lui faut un fond sombre — d'où les bandeaux navy en entête et en pied.
  Idem pour les icônes sociales : les variantes claires, pas les foncées.
- **Pas de texte dense en 3 colonnes** dans un mail de 660 px : il reste ~164 px
  utiles par colonne, chaque ligne part sur trois. Réservé aux vignettes photo
  avec légende courte.
- **Largeurs de colonnes égales** : donner la gouttière en `padding-left` sauf à
  la première rend celle du milieu plus étroite. `columns()` donne la même
  demi-gouttière des deux côtés à chaque colonne.
- Le `<head>` force `.mceText h1{font-size:31px!important}` sous 480 px : d'où
  les titres de section en `<h2>`, un seul `<h1>` pour le hero.
- **L'accueil FR est à la racine du site**, pas dans `/fr/` — ce dossier n'a pas
  d'`index.html` et renvoie un **403**.
- Éviter le `.webp` : Outlook desktop ne le lit pas.

## Avant d'envoyer

- [ ] la page du programme en ligne — `/programme-ambassadeurs/` pour le mail
      français, **`/es/programa-embajadores/` pour l'espagnol** (sinon le CTA
      principal, et le seul, est un 404)
- [ ] `public/images/mailing/` déployé en FTP
- [ ] **objet et « Aperçu du texte » saisis dans Brevo** (le HTML n'en contient pas)
- [ ] copy relue
- [ ] liste de clubs/écoles + base légitime côté RGPD — le pied de page annonce
      « votre structure figure dans notre annuaire de clubs et écoles de kite »
- [ ] envoi de test depuis Brevo, rendu vérifié dans Outlook et Gmail

Et, pour la relance uniquement :

- [ ] variante A ou B choisie (une seule part)
- [ ] segment Brevo « n'a pas cliqué la campagne du 28/08 »
- [ ] clubs ayant répondu par e-mail ou WhatsApp retirés à la main du segment
