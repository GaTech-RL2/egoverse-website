// Navigation component - edit this file to update the navbar across all pages
// The script auto-detects if it's in a subdirectory and adjusts paths accordingly

(function() {
  // Detect if we're in a subdirectory (e.g., /hardware/)
  const isSubdir = window.location.pathname.includes('/hardware/');
  const prefix = isSubdir ? '../' : './';
  const hwPrefix = isSubdir ? './' : './hardware/';

  const NAV_CONFIG = {
    brand: {
      name: 'EgoVerse',
      tagline: 'Egocentric human data for robot learning',
      logo: 'assets/img/egoverse-mark.svg'
    },
    links: [
      { label: 'EgoVerse', href: 'index.html' },
      { label: 'Dataset', href: 'dataset.html' },
      { label: 'Code', href: 'code.html' }
    ],
    hardware: {
      label: 'Hardware',
      items: [
        { label: 'Overview', href: 'hardware/overview.html' },
        { label: 'Project Aria Gen1', href: 'hardware/project-aria-gen1.html' },
        { label: 'Mecka App', href: 'hardware/mecka-app.html' },
        { label: 'Project Aria Gen2 (Coming Soon)', href: null, disabled: true }
      ]
    },
    team: { label: 'Team', href: 'team.html' }
  };

  function buildNav() {
    const nav = NAV_CONFIG;
    
    return `
    <div class="container header-inner">
      <a class="brand" href="${prefix}index.html">
        <img src="${prefix}${nav.brand.logo}" alt="${nav.brand.name}" width="28" height="28" />
        <div><div>${nav.brand.name}</div><small>${nav.brand.tagline}</small></div>
      </a>

      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-nav-toggle>
        <span class="sr-only">Toggle navigation</span>
        <span class="hamburger" aria-hidden="true"></span>
      </button>

      <nav class="nav" id="primary-nav" data-nav>
        ${nav.links.map(link => `<a href="${prefix}${link.href}">${link.label}</a>`).join('\n        ')}

        <div class="dropdown" data-dropdown>
          <button class="btn btn-muted" data-dropdown-btn aria-expanded="false">${nav.hardware.label} ▾</button>
          <div class="dropdown-menu" role="menu">
            ${nav.hardware.items.map(item => 
              item.disabled 
                ? `<a class="disabled" href="javascript:void(0)" tabindex="-1" aria-disabled="true">${item.label}</a>`
                : `<a href="${prefix}${item.href}">${item.label}</a>`
            ).join('\n            ')}
          </div>
        </div>

        <a href="${prefix}${nav.team.href}">${nav.team.label}</a>
      </nav>
    </div>`;
  }

  // Inject the nav into the header
  const header = document.querySelector('.site-header');
  if (header) {
    header.innerHTML = buildNav();
  }
})();
