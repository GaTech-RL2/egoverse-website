(function () {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close nav after clicking a normal link (mobile)
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Dropdown behavior (click to open, click outside to close)
  const dropdown = document.querySelector("[data-dropdown]");
  const dropdownBtn = document.querySelector("[data-dropdown-btn]");

  if (dropdown && dropdownBtn) {
    dropdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("is-open");
      const expanded = dropdown.classList.contains("is-open");
      dropdownBtn.setAttribute("aria-expanded", String(expanded));
    });

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!dropdown.contains(target)) {
        dropdown.classList.remove("is-open");
        dropdownBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
