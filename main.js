// CURSOR
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 5 + 'px';
  cursor.style.top = my - 5 + 'px';
});
function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a, button, .card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursorRing.style.width = '54px';
    cursorRing.style.height = '54px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
  });
});

// FADE IN ON SCROLL
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// COUNT UP ANIMATION
function countUp(el, target, suffix = '', prefix = '') {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.floor(eased * target).toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = true;
      const target = parseFloat(entry.target.dataset.target);
      const suffix = entry.target.dataset.suffix || '';
      const prefix = entry.target.dataset.prefix || '';
      countUp(entry.target, target, suffix, prefix);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));

// ACTIVE NAV
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// TICKER DATA
const tickerData = [
  { label: 'NIFTY 50', value: '24,611', change: '+0.42%', up: true },
  { label: 'SENSEX', value: '81,248', change: '+0.38%', up: true },
  { label: 'USD/INR', value: '83.92', change: '-0.12%', up: false },
  { label: 'GOLD', value: '₹71,450/10g', change: '+0.85%', up: true },
  { label: 'CRUDE OIL', value: '$82.14', change: '-0.54%', up: false },
  { label: 'REPO RATE', value: '6.50%', change: 'RBI', up: true },
  { label: 'CPI INDIA', value: '4.83%', change: 'Apr 2025', up: false },
  { label: 'GDP GROWTH', value: '7.8%', change: 'FY25E', up: true },
  { label: 'NIFTY BANK', value: '52,344', change: '+0.61%', up: true },
  { label: '10Y G-SEC', value: '7.02%', change: '-2bps', up: false },
];
function buildTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  const html = [...tickerData, ...tickerData].map(t => `
    <span class="ticker-item">
      <strong>${t.label}</strong>
      ${t.value}
      <span class="${t.up ? 'up' : 'down'}">${t.change}</span>
    </span>
  `).join('');
  track.innerHTML = html;
}
buildTicker();
