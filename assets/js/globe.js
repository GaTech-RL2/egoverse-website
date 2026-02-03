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
      // Use points for locations with contribution-based sizing
      .pointsData(GLOBE_LOCATIONS)
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude(0.01)
      .pointRadius(d => Math.sqrt(d.contribution / maxContribution) * 0.6 + 0.12)
      .pointColor(() => 'rgba(180, 160, 220, 0.85)')
      .pointsMerge(false)
      .onPointHover((point) => {
        globeContainer.style.cursor = point ? 'pointer' : 'grab';
        
        if (point && tooltip) {
          tooltip.innerHTML = `<strong>${point.name}</strong><br><span style="color: var(--muted)">${point.contribution} contributions</span>`;
          tooltip.style.display = 'block';
        } else if (tooltip) {
          tooltip.style.display = 'none';
        }
      })
      .width(containerWidth)
      .height(400)
      (globeContainer);

    // Set initial point of view (show Americas/Europe)
    globe.pointOfView({ lat: 30, lng: -20, altitude: 1.5 });

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
