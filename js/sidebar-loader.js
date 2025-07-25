// sidebar-loader.js
// Loads sidebar and sidebar-mobile HTML, sets active link based on current page

function setActiveSidebarLinks(sidebarRoot) {
  const links = sidebarRoot.querySelectorAll('a.slice');
  const current = window.location.pathname.split('/').pop() || 'index.php';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if ((href === '/' && (current === '' || current === 'index.php' || current === 'index.html')) ||
        (href !== '/' && href === current)) {
      link.classList.add('active');
    }
  });
}

function loadSidebar(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  fetch(file)
    .then(resp => resp.text())
    .then(html => {
      el.innerHTML = html;
      setActiveSidebarLinks(el);
      if (id === 'sidebar-mobile') {
        // Hamburger menu logic moved from main.js
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        if (menuToggle && mobileMenu) {
          menuToggle.addEventListener('change', function() {
            if (this.checked) {
              mobileMenu.classList.add('open');
              document.body.classList.add('no-scroll');
            } else {
              mobileMenu.classList.remove('open');
              document.body.classList.remove('no-scroll');
            }
          });
          mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
              menuToggle.checked = false;
              mobileMenu.classList.remove('open');
              document.body.classList.remove('no-scroll');
            });
          });
          document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && mobileMenu.classList.contains('open')) {
              menuToggle.checked = false;
              mobileMenu.classList.remove('open');
              document.body.classList.remove('no-scroll');
            }
          });
          mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
              menuToggle.checked = false;
              mobileMenu.classList.remove('open');
              document.body.classList.remove('no-scroll');
            }
          });
          window.addEventListener('resize', function() {
            if (window.innerWidth > 750) {
              menuToggle.checked = false;
              mobileMenu.classList.remove('open');
              document.body.classList.remove('no-scroll');
            }
          });
        }
      }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  loadSidebar('sidebar', 'partials/sidebar.html');
  loadSidebar('sidebar-mobile', 'partials/sidebar-mobile.html');
});
