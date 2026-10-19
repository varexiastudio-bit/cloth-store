/* Varesha Cloths — promotional concept. Update the contact details in this file before publishing. */
const VARESHA_CONFIG = {
  // International format without +, spaces, or punctuation. Example: 919876543210
  whatsappNumber: '919999999999',
  instagramUrl: 'https://www.instagram.com/',
  storeName: 'Varesha Cloths'
};

const loader = document.querySelector('#loader');
document.body.classList.add('loading');
const startTime = performance.now();
window.addEventListener('load', () => {
  const elapsed = performance.now() - startTime;
  window.setTimeout(() => {
    loader?.classList.add('done');
    document.body.classList.remove('loading');
  }, Math.max(400, 2400 - elapsed));
});
window.setTimeout(() => {
  loader?.classList.add('done');
  document.body.classList.remove('loading');
}, 4200);

// Reveal elements on entry and reset on exit so animations can replay while scrolling up or down.
const revealNodes = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        entry.target.classList.remove('out-view');
      } else {
        entry.target.classList.remove('in-view');
        entry.target.classList.add('out-view');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  revealNodes.forEach((node, index) => {
    node.style.setProperty('--delay', `${Math.min(index % 5, 3) * 55}ms`);
    revealObserver.observe(node);
  });
} else {
  revealNodes.forEach(node => node.classList.add('in-view'));
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('open', !expanded);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

// Catalogue filtering is a visual browsing aid only; no cart, checkout, or customer data storage.
const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product-card');
function applyFilter(category) {
  filters.forEach(button => button.classList.toggle('active', button.dataset.filter === category));
  products.forEach(product => {
    const visible = category === 'All' || product.dataset.category === category;
    product.classList.toggle('is-hidden', !visible);
  });
}
filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter || 'All')));
document.querySelectorAll('.category-card[data-filter]').forEach(card => card.addEventListener('click', () => {
  applyFilter(card.dataset.filter);
}));

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3600);
}
function openWhatsApp(message) {
  const number = String(VARESHA_CONFIG.whatsappNumber || '').replace(/\D/g, '');
  if (!number || number === '919999999999') {
    showToast('Demo contact: add the store’s real WhatsApp number in script.js before publishing.');
    return;
  }
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
}
document.querySelectorAll('[data-order]').forEach(button => button.addEventListener('click', () => {
  const item = button.dataset.order || 'a piece from the collection';
  openWhatsApp(`Hi ${VARESHA_CONFIG.storeName}! I’m interested in “${item}”. Could you share the available sizes, colours, price and ordering details?`);
}));
document.querySelectorAll('[data-whatsapp="general"]').forEach(link => link.addEventListener('click', (event) => {
  event.preventDefault();
  openWhatsApp(`Hi ${VARESHA_CONFIG.storeName}! I’d love to know more about your current collection and ordering options.`);
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// Avoid unexpected layout shifts from images; browsers handle lazy-loading natively.
document.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
  img.style.opacity = '.25';
  img.alt = `${img.alt} (image unavailable — replace with a store photo)`;
}));
