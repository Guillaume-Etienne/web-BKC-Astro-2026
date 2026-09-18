# Mail aux cliqueurs — texte brut (pas de HTML)

Troisième pièce de la séquence, mais **pas une campagne** : un mail court, sans
mise en page, adressé aux **46 contacts qui ont cliqué** sur la campagne du
28-29/08 et n'ont pas donné suite.

## Pourquoi un mail nu plutôt qu'un beau mail

Les chiffres du 28-29/08 : 385 délivrés, 193 ouvertures (50,1 %), 46 clics
(11,9 %), **1 réponse**. Le mail a fait son travail — 46 gérants de club sont
allés sur `/programme-ambassadeurs/`. Le blocage est *après* le clic.

Leur renvoyer la relance HTML (« le bouton, au cas où ») ne peut pas marcher :
le bouton, ils ont déjà cliqué dessus. Ce qu'il leur faut, c'est l'inverse d'une
campagne — un message qui ressemble à un mail d'humain, qui ne revend rien et
qui pose **une seule question facile**.

D'où : pas d'images, pas de bouton, pas de lien vers le site, pas de couleurs.
Un lien casserait l'effet, et de toute façon ils connaissent la page.

## Objet et aperçu

> **Objet** — Une question, plutôt qu'une relance
>
> **Aperçu** — Vous seriez combien, et sur quelle période ?

Expéditeur : « Guillaume – Bilene Kite Center », **répondre à**
`contact@bilenekite.com`.

## Le texte

```
Bonjour,

Je vous ai écrit fin août au sujet de Bilène, au Mozambique, et du programme
qui permet à celui qui monte un groupe de voyager gratuitement.

Je ne vais pas vous renvoyer la page, vous savez de quoi il s'agit. Juste une
question, à laquelle vous pouvez répondre en une ligne :

vous seriez combien, et sur quelle période ?

Avec ces deux informations je vous réponds dans la journée : les avantages qui
s'appliquent à votre configuration, et un budget précis. Rien à engager, c'est
seulement pour voir si le projet tient debout de votre côté.

Et si quelque chose vous a arrêté — le prix des vols, les dates, une condition
qui n'était pas claire — dites-le-moi franchement. C'est l'information qui
m'est la plus utile.

Bien à vous,

Guillaume
Bilene Kite Center — Bilène, Mozambique
contact@bilenekite.com
```

Puis, sur une dernière ligne discrète, la balise obligatoire :
`Vous désabonner : {{ unsubscribe }}`

Brevo refuse d'enregistrer une campagne sans. Elle casse un peu l'effet « mail
personnel », mais elle n'est pas négociable.

## Envoi

- Campagne Brevo classique, **en texte brut** (pas l'éditeur HTML) — ou, si
  l'option existe, la version texte seule.
- **Segment** : a cliqué sur la campagne du 28/08 **ou** celle du 29/08, moins
  le club qui a déjà répondu. 46 contacts, sous le plafond de 300/jour.
- À envoyer **après** la relance HTML, pas le même jour : ces 46 contacts ne
  doivent surtout pas recevoir les deux. Vérifier qu'ils sont bien **exclus**
  du segment de la relance.

## Alternative, si tu as 25 minutes

46 contacts, c'est peu. Envoyé un par un depuis ta boîte Gmail, ce mail arrive
dans l'onglet principal, sans balise de désabonnement, sans pixel de suivi, et
se lit comme ce qu'il prétend être. Le taux de réponse n'a rien à voir. Brevo
reste le choix raisonnable ; celui-là est le choix efficace.
