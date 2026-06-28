// ─── ACCORDÉON ───────────────────────────────────────────────
//
// Markup attendu pour chaque section :
//   <div class="acc-item [is-open]" data-acc [id="ancre"]>
//     <button class="acc-header" aria-expanded="true|false">…</button>
//     <div class="acc-panel">
//       <div class="acc-panel-inner">…</div>
//     </div>
//   </div>
//
// Comportement :
//   • Un seul panneau ouvert à la fois.
//   • L'état ouvert est géré par la classe CSS `is-open` sur [data-acc]
//     et l'attribut aria-expanded sur le bouton (accessibilité).
//   • Ouverture automatique via l'ancre URL : si l'URL contient un hash
//     (#le-transfert, #a-emporter…) correspondant à l'id d'un acc-item,
//     ce panneau s'ouvre et la page défile jusqu'à lui.
//     Fonctionne aussi sur hashchange (lien intra-page sans rechargement).

(function () {
    var items = document.querySelectorAll('[data-acc]');
    if (!items.length) return;

    // ── Clic : ouvre/ferme un panneau ──────────────────────────
    items.forEach(function (item) {
        var header = item.querySelector('.acc-header');
        if (!header) return;

        header.addEventListener('click', function () {
            var isOpen = item.classList.contains('is-open');

            // Ferme tous les panneaux
            items.forEach(function (other) {
                other.classList.remove('is-open');
                var h = other.querySelector('.acc-header');
                if (h) h.setAttribute('aria-expanded', 'false');
            });

            // Rouvre celui cliqué s'il était fermé
            if (!isOpen) {
                item.classList.add('is-open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── Ouverture par ancre URL ─────────────────────────────────
    //
    // Permet à un lien externe (#le-transfert, #a-emporter…) d'arriver
    // directement sur le bon panneau, déjà ouvert.
    //
    // Fonctionnement :
    //   1. Lit window.location.hash.
    //   2. Cherche un [data-acc] dont l'id correspond.
    //   3. Ferme tout, ouvre la cible, fait défiler la page vers elle.
    //
    // Le setTimeout(100ms) laisse le navigateur terminer son propre
    // défilement natif vers l'ancre avant qu'on repositionne la vue —
    // évite un conflit de scroll qui laisserait la page à mi-chemin.

    function openFromHash() {
        var hash = window.location.hash;
        if (!hash) return;

        // Sélecteur sûr : échappe les caractères spéciaux éventuels
        var target;
        try {
            target = document.querySelector(hash + '[data-acc]');
        } catch (e) {
            return; // hash invalide comme sélecteur CSS, on ignore
        }
        if (!target) return;

        // Ferme tout (y compris le panneau ouvert par défaut)
        items.forEach(function (other) {
            other.classList.remove('is-open');
            var h = other.querySelector('.acc-header');
            if (h) h.setAttribute('aria-expanded', 'false');
        });

        // Ouvre la cible
        target.classList.add('is-open');
        var targetHeader = target.querySelector('.acc-header');
        if (targetHeader) targetHeader.setAttribute('aria-expanded', 'true');

        // Défile jusqu'à la section (délai court pour stabiliser le DOM)
        setTimeout(function () {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    openFromHash();

    // Gère aussi les clics sur des liens #ancre depuis la même page
    // (hashchange se déclenche sans rechargement)
    window.addEventListener('hashchange', openFromHash);

})();
