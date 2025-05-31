document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const ctoButtons = document.querySelectorAll('.cto-btn');
  const sections = document.querySelectorAll("section[id]");

  // PATCH: stop smooth-scroll.js animation
  function cancelOngoingSmoothScroll() {
    if (window.SmoothScrollOptions && typeof window.SmoothScrollOptions.destroy === 'function') {
      window.SmoothScrollOptions.destroy();
    }

    // Clear scroll queue `b[]` and cancel animation flags manually
    if (window.smoothScrollHack) {
      window.smoothScrollHack.b.length = 0;
      window.smoothScrollHack.g = false;
    }
  }

  // Scroll using native scroll and reset smooth-scroll.js
    function scrollToSection(targetId) {
    const section = document.getElementById(targetId);
    if (!section) {
        console.warn(`[Scroll] No section found with ID: ${targetId}`);
        return;
    }

    // Stop smooth-scroll.js momentum scroll if active
    if (window.smoothScrollHack?.stopScroll) {
        window.smoothScrollHack.stopScroll();
    }

    // Wait a tick to let momentum settle, then scroll smoothly
    setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    }

  // Click handlers for nav buttons
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-id');
      if (!targetId) return;

      scrollToSection(targetId);

      navButtons.forEach(btn => btn.classList.remove('active-btn'));
      button.classList.add('active-btn');
    });
  });

  // Click handlers for CTA buttons
  ctoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-id');
      if (!targetId) return;

      scrollToSection(targetId);
    });
  });

  // Intersection Observer for active nav highlight
  const observer = new IntersectionObserver((entries) => {
    let activeId = null;

    entries.forEach(entry => {
      const id = entry.target.id;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        activeId = id;
      }
    });

    if (activeId) {
      navButtons.forEach(button => {
        const btnId = button.getAttribute('data-id');
        button.classList.toggle('active-btn', btnId === activeId);
      });
    }
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
});
