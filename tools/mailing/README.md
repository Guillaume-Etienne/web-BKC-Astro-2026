# Mailing clubs & écoles de kite (FR)

Campagne de prospection B2B vers les clubs et écoles de kite français.
Angle : « emmenez votre club kiter au Mozambique », CTA vers
`/programme-ambassadeurs/`.

**FR uniquement, volontairement** : la cible est française, la règle
« toute modif → FR + EN + ES » ne s'applique pas ici.

## Le fichier à envoyer

`mailing-clubs-ecoles-fr.html` — c'est **celui-ci** qu'on colle dans Brevo.
Il est **généré** : ne pas l'éditer à la main, les modifications seraient
écrasées à la prochaine génération.

## Régénérer

```bash
node tools/mailing/gen-mailing.cjs
```

`.cjs` et non `.js` : le `package.json` du projet est en `"type": "module"`.

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

Coller dans **« Code your own » → « Paste your code »** (éditeur HTML).

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

- [ ] `/programme-ambassadeurs/` en ligne (sinon le CTA principal est un 404)
- [ ] `public/images/mailing/` déployé en FTP
- [ ] **objet et « Aperçu du texte » saisis dans Brevo** (le HTML n'en contient pas)
- [ ] copy relue
- [ ] liste de clubs/écoles + base légitime côté RGPD — le pied de page annonce
      « votre structure figure dans notre annuaire de clubs et écoles de kite »
- [ ] envoi de test depuis Brevo, rendu vérifié dans Outlook et Gmail
