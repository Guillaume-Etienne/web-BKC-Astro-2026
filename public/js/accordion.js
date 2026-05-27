// Accordéon — une seule section ouverte à la fois
// Markup attendu : [data-acc] > .acc-header (button) + .acc-panel
(function () {
    var items = document.querySelectorAll('[data-acc]');
    if (!items.length) return;

    items.forEach(function (item) {
        var header = item.querySelector('.acc-header');
        if (!header) return;

        header.addEventListener('click', function () {
            var isOpen = item.classList.contains('is-open');

            // Tout refermer
            items.forEach(function (other) {
                other.classList.remove('is-open');
                var h = other.querySelector('.acc-header');
                if (h) h.setAttribute('aria-expanded', 'false');
            });

            // Rouvrir celle cliquée si elle était fermée
            if (!isOpen) {
                item.classList.add('is-open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();
