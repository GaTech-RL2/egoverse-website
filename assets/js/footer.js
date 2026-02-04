// Footer component - edit this file to update the footer across all pages
(function() {
  const isSubdir = window.location.pathname.includes('/hardware/');
  const prefix = isSubdir ? '../' : './';

  const FOOTER_CONFIG = {
    brand: 'EgoVerse',
    email: 'contact@egoverse.ai',
    links: [
      { label: 'Home', href: 'index.html' },
      { label: 'Dataset', href: 'dataset.html' },
      { label: 'Code', href: 'code.html' },
      { label: 'Team', href: 'team.html' }
    ]
  };

  function buildFooter() {
    const f = FOOTER_CONFIG;
    return `
    <div class="container footer-inner">
      <div>
        <div style="font-weight:850;">${f.brand}</div>
        <div class="small">© <span id="year"></span> EgoVerse Consortium</div>
        <a class="contact-email" href="mailto:${f.email}">${f.email}</a>
      </div>
      <div class="footer-links">
        ${f.links.map(link => `<a href="${prefix}${link.href}">${link.label}</a>`).join('\n        ')}
      </div>
    </div>`;
  }

  // Inject the footer
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.innerHTML = buildFooter();
    // Set year
    const yearEl = footer.querySelector('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
})();
