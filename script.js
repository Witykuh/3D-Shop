/* SSHINOBI · interacciones mínimas
   - Desplegable de tarjetas de producto
   - Menú hamburguesa
*/
(function () {
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-links-mobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
    });

    // Cerrar al pulsar un link
    navMobile.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
      });
    });

    // Cerrar al pulsar fuera
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMobile.contains(e.target)) {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
      }
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

      // Touch events for swipe — only prevent default when user intent is horizontal
      let startY = 0;
      let isHorizontal = false;

      slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        isHorizontal = false;
      }, { passive: true });

      slider.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;

        // If it's clearly a horizontal gesture, prevent default so slider captures it.
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6) {
          isHorizontal = true;
          // this listener is registered as non-passive below so preventDefault will work
          e.preventDefault();
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) {
          // Vertical scroll detected — allow it to propagate
          isHorizontal = false;
          isDragging = false;
        }
      }, { passive: false });

      slider.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;
        if (!isHorizontal) return; // if it wasn't horizontal, don't treat as swipe
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // Minimum swipe distance
          if (diffX > 0) {
            current = (current + 1) % images.length;
          } else {
            current = (current - 1 + images.length) % images.length;
          }
          showImage(current);
        }
      });

      showImage(current);
});
})();
