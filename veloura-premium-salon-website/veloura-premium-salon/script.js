const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open');
}));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target, target = Number(el.dataset.count || 0), duration = 1000, start = performance.now();
    const tick = now => { const progress = Math.min((now - start) / duration, 1); el.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); observer.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
const dateInput = document.getElementById('appointmentDate');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

const bookingForm = document.getElementById('bookingForm');
const toast = document.querySelector('.toast');
bookingForm?.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = String(formData.get('name') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const service = String(formData.get('service') || 'a consultation');
  const date = String(formData.get('date') || '');
  if (!name || !phone || !service || !date) return;
  const feedback = bookingForm.querySelector('.form-feedback');
  feedback.textContent = `Thanks, ${name}! This is a demo request. Connect the form to the salon's WhatsApp or booking system before launch.`;
  if (toast) { toast.textContent = 'Demo interaction only — no appointment has been sent.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4500); }
});

const glow = document.querySelector('.cursor-glow');
if (glow && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', event => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; glow.style.opacity = '.8'; }, { passive: true });
  document.addEventListener('pointerleave', () => { glow.style.opacity = '0'; });
}
