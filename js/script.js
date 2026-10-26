// Restore saved theme before anything else
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
themeBtn.addEventListener('click', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });

const links = [...nav.querySelectorAll('a')];
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => io.observe(s));

const buttons = document.querySelectorAll('.filters button');
buttons.forEach(b => b.addEventListener('click', () => {
  buttons.forEach(x => x.setAttribute('aria-pressed', x === b));
  document.querySelectorAll('.proj').forEach(p => { p.hidden = b.dataset.f !== 'all' && p.dataset.cat !== b.dataset.f; });
}));
