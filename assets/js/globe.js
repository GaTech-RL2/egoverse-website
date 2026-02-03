// Globe visualization using globe.gl
(function() {
  function initGlobe() {
    const globeContainer = document.getElementById('globe');
    if (!globeContainer) return;
    
    if (typeof Globe === 'undefined') {
      console.warn('Globe.gl not loaded yet, retrying...');
      setTimeout(initGlobe, 100);
      return;
    }
    
    if (typeof GLOBE_LOCATIONS === 'undefined') {
      console.warn('Globe locations not loaded');
      return;
    }

    const tooltip = document.getElementById('globe-tooltip');
    const containerWidth = globeContainer.offsetWidth || 800;
    
    // Calculate max contribution for scaling
    const maxContribution = Math.max(...GLOBE_LOCATIONS.map(d => d.contribution || 100));
    
    const globe = Globe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('rgba(120, 100, 180, 0.25)')
      .atmosphereAltitude(0.15)
      // Use labels for locations with contribution-based sizing
      .labelsData(GLOBE_LOCATIONS)
      .labelLat('lat')
      .labelLng('lng')
      .labelText('name')
      .labelSize(d => Math.sqrt(d.contribution / maxContribution) * 1.2 + 0.3)
      .labelDotRadius(d => Math.sqrt(d.contribution / maxContribution) * 0.5 + 0.15)
      .labelColor(() => 'rgba(180, 160, 220, 0.9)')
      .labelResolution(2)
      .labelAltitude(0.01)
      .onLabelHover((label) => {
        globeContainer.style.cursor = label ? 'pointer' : 'grab';
        
        if (label && tooltip) {
          tooltip.innerHTML = `<strong>${label.name}</strong><br><span style="color: var(--muted)">${label.contribution} hours</span>`;
          tooltip.style.display = 'block';
        } else if (tooltip) {
          tooltip.style.display = 'none';
        }
      })
      .width(containerWidth)
      .height(400)
      (globeContainer);

    // Set initial point of view (show Americas/Europe)
    globe.pointOfView({ lat: 30, lng: -20, altitude: 2.2 });

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
    globe.controls().enableZoom = false;

    // Update tooltip position on mouse move
    globeContainer.addEventListener('mousemove', (e) => {
      if (!tooltip) return;
      const rect = globeContainer.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left + 15) + 'px';
      tooltip.style.top = (e.clientY - rect.top + 15) + 'px';
    });

    // Handle resize
    window.addEventListener('resize', () => {
      globe.width(globeContainer.offsetWidth);
    });

    // Pause rotation on hover, resume on leave
    globeContainer.addEventListener('mouseenter', () => {
      globe.controls().autoRotateSpeed = 0.2;
    });
    globeContainer.addEventListener('mouseleave', () => {
      globe.controls().autoRotateSpeed = 0.5;
      if (tooltip) tooltip.style.display = 'none';
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
  } else {
    // Small delay to ensure globe.gl is loaded
    setTimeout(initGlobe, 50);
  }
})();
