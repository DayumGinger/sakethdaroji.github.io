const currentFile = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(a => {
  if (a.getAttribute('href') === currentFile) a.classList.add('active');
});

const burger = document.querySelector('.nav-burger');
const menu   = document.querySelector('.nav-menu');
if (burger && menu) {
  burger.addEventListener('click', () => menu.classList.toggle('open'));
}

const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
