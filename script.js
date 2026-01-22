(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const comingSoonLinks = document.querySelectorAll('[data-coming-soon]');
  if (comingSoonLinks.length) {
    let toast = document.querySelector('.coming-soon-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'coming-soon-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.textContent = 'Coming soon on the App Store';
      document.body.appendChild(toast);
    }

    const showToast = () => {
      toast.classList.add('is-visible');
      window.clearTimeout(toast._timeoutId);
      toast._timeoutId = window.setTimeout(() => {
        toast.classList.remove('is-visible');
      }, 2200);
    };

    comingSoonLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showToast();
      });
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window) || reveals.length === 0) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => observer.observe(el));
})();
