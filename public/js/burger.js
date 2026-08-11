// Burger menu / Année automatique / Toggle / Toggle Excursions
//
// IMPORTANT : ce fichier est chargé sur TOUTES les pages, y compris celles qui
// n'ont ni menu ni pied de page standard (landing pages). Chaque bloc doit
// donc vérifier que ses éléments existent : sans ça, une erreur en haut du
// fichier stoppe tout le reste — notamment le suivi WhatsApp plus bas.

// ------------------------------------- burger :
//  -- ----------- Base
var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

/* Set the width of the side navigation to 250px */
function openNav() {
  if (sidenav) sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  if (sidenav) sidenav.classList.remove("active");
}

if (openBtn) openBtn.onclick = openNav;
if (closeBtn) closeBtn.onclick = closeNav;


// -- -------------- Sub Menu System
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.menu-list li').forEach(function(item) {
      item.addEventListener('click', function(e) {
          const subMenu = e.target.nextElementSibling;

          // Fermer tous les autres sous-menus
      document.querySelectorAll('.sub-menu').forEach(function(menu) {
        if (menu !== subMenu) {
          menu.style.display = 'none';
        }
      });
          // Basculer l'affichage du sous-menu cliqué
          if (subMenu) {
              subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
          }
      });
  });
});

// ------------------------------------- année automatique
const date = new Date();
const year = date.getFullYear();
const activeyear = document.getElementById("activeyear");
if (activeyear) activeyear.innerHTML = year;


// -------------------------------------  WhatsApp : evenement de conversion
// Ecoute deleguee : marche pour tous les boutons <WhatsApp>, ou qu'ils soient
// et meme s'ils sont ajoutes plus tard. data-wa-page indique la page d'origine.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-wa-page]');
  if (!link) return;
  if (typeof gtag === 'function') {
    gtag('event', 'whatsapp_click', {
      page_key: link.dataset.waPage,
      page_language: document.documentElement.lang || 'fr',
    });
  }
});

// -------------------------------------  Toggle
document.querySelectorAll('.toggle').forEach((toggle) => {
  const target = document.querySelector(toggle.getAttribute('data-target'));
  if (!target) return;
  toggle.addEventListener('click', () => {
    target.classList.toggle('visible');
  });
});

// -------------------------------------  Toggle Excursion
const toggleButtons = document.querySelectorAll('.toggle-button');
const additionalTexts = document.querySelectorAll('.additional-text');

toggleButtons.forEach((button, index) => {
    const text = additionalTexts[index];
    if (!text) return;
    button.addEventListener('click', () => {
        if (text.style.display === 'none' || text.style.display === '') {
            text.style.display = 'block';
            button.textContent = ' < ';
        } else {
            text.style.display = 'none';
            button.textContent = ' > ';
        }
    });
});
