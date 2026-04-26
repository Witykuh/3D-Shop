/* SSHINOBI · interacciones mínimas
   - Desplegable de tarjetas de producto
   - Menú hamburguesa
*/
(function () {
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinksMobile = document.getElementById('nav-links-mobile');

  if (hamburger && navLinksMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksMobile.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinksMobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksMobile.classList.remove('open');
      });
    });
  }

  const toggles = document.querySelectorAll(".card-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const extra = card.querySelector(".card-extra");
      const hint = btn.querySelector(".more-hint");
      const open = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", String(!open));
      if (open) {
        extra.setAttribute("hidden", "");
        if (hint) hint.textContent = "Toca para más detalles ▾";
      } else {
        extra.removeAttribute("hidden");
        if (hint) hint.textContent = "Ocultar detalles ▴";
      }
    });
  });
  const filamentToggle = document.querySelector(".filament-toggle");
  const filamentGrid = document.querySelector(".filament-grid");

  if (filamentToggle && filamentGrid) {
    filamentToggle.addEventListener("click", () => {
      const open = filamentToggle.getAttribute("aria-expanded") === "true";

      filamentToggle.setAttribute("aria-expanded", String(!open));
      filamentGrid.hidden = open;
      filamentToggle.textContent = open ? "Ver guía ▼" : "Ocultar guía ▲";
    });
  }
  const sliders = document.querySelectorAll("[data-slider]");

    sliders.forEach((slider) => {
      const images = slider.querySelectorAll(".slider-image");
      const prev = slider.querySelector("[data-prev]");
      const next = slider.querySelector("[data-next]");

      if (images.length <= 1) {
        if (prev) prev.style.display = "none";
        if (next) next.style.display = "none";
        return;
      }

      let current = 0;
      let startX = 0;
      let isDragging = false;

      function showImage(index) {
        images.forEach((img, i) => {
          img.classList.toggle("active", i === index);
        });
      }

      prev?.addEventListener("click", (e) => {
        e.stopPropagation();
        current = (current - 1 + images.length) % images.length;
        showImage(current);
      });

      next?.addEventListener("click", (e) => {
        e.stopPropagation();
        current = (current + 1) % images.length;
        showImage(current);
      });

      // Touch events for swipe
      slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });

      slider.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
      });

      slider.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // Minimum swipe distance
          if (diffX > 0) {
            // Swipe left - next image
            current = (current + 1) % images.length;
          } else {
            // Swipe right - previous image
            current = (current - 1 + images.length) % images.length;
          }
          showImage(current);
        }
      });

      showImage(current);
});
})();
