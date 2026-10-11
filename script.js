document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const langButtons = [...document.querySelectorAll('[data-lang]')];
  const aboutBlocks = [...document.querySelectorAll('[data-lang]')].filter((el) => el.dataset.lang === 'pt' || el.dataset.lang === 'en');

  const setActiveNav = () => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const offset = 120;
    let current = 'home';

    sections.forEach((section) => {
      const top = section.offsetTop;
      if (window.scrollY + offset >= top) current = section.id;
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', isActive);
    });
  };

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.textContent = isOpen ? '✕' : '☰';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      });
    });
  }

  langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedLang = button.dataset.lang;

      langButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      aboutBlocks.forEach((block) => {
        const isVisible = block.dataset.lang === selectedLang;
        block.hidden = !isVisible;
      });
    });
  });

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();
});
