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

  // Collapsible cards - initialize for static cards
  function initCollapsibles() {
    const collapsibles = document.querySelectorAll("[data-collapsible]");
    collapsibles.forEach((collapsibleCard) => {
      const header = collapsibleCard.querySelector("[data-collapsible-toggle]");
      const expandBtn = collapsibleCard.querySelector(".expand-btn");
      if (header && !header.hasAttribute("data-initialized")) {
        header.setAttribute("data-initialized", "true");
        header.addEventListener("click", (e) => {
          e.stopPropagation();
          const isExpanded = collapsibleCard.classList.toggle("is-expanded");
          if (expandBtn) {
            expandBtn.setAttribute("aria-expanded", String(isExpanded));
          }
        });
      }
    });
  }

  initCollapsibles();

  // Dynamic team rendering from data
  const teamGrid = document.getElementById("team-grid");
  if (teamGrid && typeof TEAM_DATA !== "undefined") {
    renderTeam(TEAM_DATA.organizations);
    initCollapsibles();
  }

  function renderTeam(organizations) {
    if (!teamGrid) return;

    teamGrid.innerHTML = organizations.map((org) => `
      <div class="card card-collapsible" data-collapsible>
        <div class="card-header" data-collapsible-toggle>
          <h3>${escapeHtml(org.name)}</h3>
          <button class="expand-btn" aria-expanded="false" aria-label="Expand ${escapeHtml(org.name)}">
            <span class="expand-icon">+</span>
          </button>
        </div>
        <div class="card-body">
          ${org.website ? `
            <a class="card-link" href="${escapeHtml(org.website)}" target="_blank" rel="noopener">
              <span class="link-icon">↗</span> ${escapeHtml(org.websiteLabel || org.website)}
            </a>
          ` : ""}
          ${org.roles.map((role) => `
            <div class="role-block">
              <div class="role-title">${role.isProjectLead ? '<span class="star-icon" aria-hidden="true">★</span> ' : ""}${escapeHtml(role.title)}</div>
              <ul class="people-list">
                ${role.members.map((member) => `
                  <li>
                    ${member.url 
                      ? `<a class="person-link" href="${escapeHtml(member.url)}" target="_blank" rel="noopener">${escapeHtml(member.name)}</a>`
                      : `<span>${escapeHtml(member.name)}</span>`
                    }
                    ${member.email ? `
                      <a class="mailto" href="mailto:${escapeHtml(member.email)}" aria-label="Email ${escapeHtml(member.name)}">
                        <span class="mail-icon" aria-hidden="true">✉</span>
                      </a>
                    ` : ""}
                  </li>
                `).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
