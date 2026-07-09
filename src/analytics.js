const trackedLinks = document.querySelectorAll('[data-track]');

function trackConversion(eventName, details = {}) {
  const payload = {
    event: eventName,
    product: 'My Small Business Hub',
    ...details,
  };

  if (window.dataLayer) {
    window.dataLayer.push(payload);
  }

  if (window.plausible) {
    window.plausible(eventName, { props: details });
  }

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/analytics/conversion', JSON.stringify(payload));
  }

  console.info('[conversion]', payload);
}

trackedLinks.forEach((link) => {
  link.addEventListener('click', () => {
    trackConversion(link.dataset.track, {
      tier: link.dataset.tier || 'general',
      href: link.href,
    });
  });
});
