document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const ctoButtons = document.querySelectorAll('.cto-btn');
  const sections = document.querySelectorAll("section[id]");

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

  // Click handler for all "Place Order" buttons
  document.querySelectorAll('.place-order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.productId;

        fetch("assets/data/product-data.json")
          .then(res => res.json())
          .then(products => {
          const product = products.find(p => p.id === productId);

          if (product && product.enabled) {
              window.location.href = `product-details.html?id=${productId}`;
          } else {
              scrollToSection("contact");
              // const section = document.getElementById("contact");
              // if (!section) {
              //   console.warn(`[Scroll] No section found with ID: ${targetId}`);
              //   return;
              // }

              // // Stop smooth-scroll.js momentum scroll if active
              // if (window.smoothScrollHack?.stopScroll) {
              //   window.smoothScrollHack.stopScroll();
              // }

              // // Wait a tick to let momentum settle, then scroll smoothly
              // setTimeout(() => {
              //   section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // }, 50);
          }
        });
    });
  });
  function handleHashScroll() {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#")) {
      const id = hash.substring(1); // remove '#'
      scrollToSection(id); // ✅ use your own scrollToSection

      // Remove the hash from the URL after scroll
      setTimeout(() => {
        history.replaceState(null, '', window.location.pathname);
      }, 1000); // wait 1 second for scroll to complete (adjust if needed)
    }
  }


  // Initial scroll on page load
  handleHashScroll();

  // Scroll on hashchange (e.g. back/forward button)
  window.addEventListener("hashchange", handleHashScroll);
});
