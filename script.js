/* SSHINOBI · interacciones mínimas
   - Desplegable de tarjetas de producto
*/
(function () {
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
})();
