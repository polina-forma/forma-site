/* ============================================
   Forma Consulting — Site Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky header shadow on scroll ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // --- Desktop dropdown ---
  const dropdown = document.querySelector('.dropdown');
  const toggle = document.querySelector('.dropdown-toggle');
  if (dropdown && toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
    // Keyboard accessible
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
      }
    });
  }

  // --- Hamburger mobile menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
  }

  // --- Mobile services dropdown ---
  const mobileServicesToggle = document.querySelector('.mobile-services-toggle');
  const mobileDropdown = document.querySelector('.mobile-dropdown');
  if (mobileServicesToggle && mobileDropdown) {
    mobileServicesToggle.addEventListener('click', () => {
      mobileDropdown.classList.toggle('open');
      const arrow = mobileServicesToggle.querySelector('.dropdown-arrow');
      if (arrow) {
        arrow.style.transform = mobileDropdown.classList.contains('open')
          ? 'rotate(-135deg)' : 'rotate(45deg)';
      }
    });
  }

  // --- Contact form handling (submit to Netlify, show success inline) ---
  const form = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');
  if (form && formSuccess) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new URLSearchParams(new FormData(form)).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
      })
      .then(() => {
        form.style.display = 'none';
        formSuccess.classList.add('show');
      })
      .catch(() => {
        form.style.display = 'none';
        formSuccess.classList.add('show');
      });
    });
  }

  // --- Active page highlighting ---
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  document.querySelectorAll('.nav-links a, .dropdown-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if (linkPath === currentPath || (currentPath.startsWith('/services/') && linkPath.startsWith('/services/'))) {
      link.classList.add('active');
    }
  });
  // Mark dropdown toggle active if on a service page
  if (currentPath.startsWith('/services/') && toggle) {
    toggle.classList.add('active');
  }
});
