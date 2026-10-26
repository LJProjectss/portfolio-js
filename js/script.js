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

// language toggle (English is written in the HTML, Dutch lives here)
const nl = {
  'nav.about': "Over mij",
  'nav.exp': "Ervaring",
  'nav.projects': "Projecten",
  'hero.status': "Op zoek naar een frontendfunctie · Zeeland / remote",
  'hero.lede': "Frontend developer met een <strong>hbo ICT-diploma</strong> van HZ University en een jaar ervaring met features bouwen bij <strong>Bax Music</strong>. Ik bouw heldere, snelle interfaces in HTML, CSS en JavaScript.",
  'hero.cv': "Download cv",
  'about.h2': "Nieuwsgierig, praktisch en een teamspeler.",
  'about.p1': "Ik ben een enthousiaste developer die graag nieuwe kennis opdoet. Ik volg technische en economische ontwikkelingen en je vindt me regelmatig in de sportschool.",
  'about.p2': "Ik ben ondernemend en houd het hoofd koel onder deadlinedruk. Ik werk graag in teamverband, maar kan net zo goed zelfstandig werken.",
  'fact.based': "Woonplaats",
  'fact.edu': "Opleiding",
  'fact.lang': "Talen",
  'fact.langs': "Nederlands (moedertaal), Engels",
  'fact.cert': "Certificaat",
  'hbo': "Hbo ICT, Software Engineering",
  'tl.label': "Ervaring &amp; opleiding",
  'tl.h2': "Waar ik heb gewerkt en gestudeerd",
  'tl.bax': "apr 2022 – apr 2023",
  'tl.bax1': "Frontendtickets oppakken en elke oplossing tot in productie begeleiden",
  'tl.bax2': "Marketingmails ontwerpen en bouwen",
  'tl.now': "2015 – heden",
  'tl.goedhart': "Productie &amp; facilitair",
  'tl.goedhart1': "Personeel aansturen en werkzaamheden controleren",
  'tl.shop': "Winkelmedewerker",
  'tl.stock': "Vakkenvuller",
  'tl.hz': "sep 2015 – feb 2022",
  'tl.havo': "Economie &amp; Maatschappij",
  'skills.h2': "Waar ik mee werk",
  'skills.p': "Gegroepeerd naar waar ik ze gebruik.",
  'skills.fe': "Dagelijks werk bij Bax Music en de meeste schoolprojecten: pagina-makeovers, componenten en e-mailtemplates.",
  'skills.be': "Uit de hbo ICT-opleiding en de minor Data Science.",
  'skills.design': "Zorgen dat wat ik bouw er goed uitziet en makkelijk te gebruiken is.",
  'skills.graphic': "Grafisch ontwerp",
  'skills.email': "E-mailontwerp",
  'proj.h2': "Geselecteerd werk",
  'proj.all': "Alles",
  'proj.wl': "Film-watchlist",
  'proj.wl.p': "Installeerbare webapp om films, series en anime bij te houden: geef een cijfer van 1 tot 10, vink afleveringen af en zie wat binnenkort uitkomt en waar je het in Nederland kunt streamen. Met pushmeldingen bij nieuwe afleveringen.",
  'proj.live': "Bekijk live",
  'proj.src': "Broncode op GitHub",
  'proj.hub.p': "Eén thuis-hub die drie van mijn eigen apps samenbrengt op één site: een huishoudboekje, een vermogensoverzicht en een onderhoudslogboek, met Google Drive-synchronisatie en automatische tests.",
  'proj.pf': "Dit portfolio",
  'proj.pf.p': "Een portfolio van één pagina met lichte en donkere modus en een Engelse en Nederlandse versie, gebouwd zonder framework.",
  'proj.mail': "Marketingmails",
  'proj.mail.p': "Responsive e-mailtemplates voor een grote muziekwinkel, getest in verschillende mailprogramma’s.",
  'proj.ds': "Minor Data Science",
  'proj.ds.p': "Image augmentation in Python om een trainingsset voor een machine-learningmodel te vergroten.",
  'contact.h2': "Laten we samen iets bouwen.",
  'contact.p': "Op zoek naar een frontend developer in Zeeland of op afstand? Stuur me een bericht op LinkedIn.",
  'foot.top': "Terug naar boven ↑",
  'aria.menu': "Menu openen",
  'aria.theme': "Wissel tussen licht en donker",
  'aria.code': "Kort profiel als JavaScript-object",
  'aria.filter': "Projecten filteren",
  'alt.hub': "Overzichtsscherm van The Hub",
  'alt.portfolio': "Startsectie van dit portfolio",
  'meta.desc': "Portfolio van Lyam Jones, frontend developer uit Zeeland met een hbo ICT-diploma.",
  'hero.cta1': "Bekijk projecten",
  'tl.work': "Werk",
  'tl.edu': "Opleiding"
};

const langBtn = document.getElementById('langBtn');
const metaDesc = document.querySelector('meta[name="description"]');
const texts = [...document.querySelectorAll('[data-i18n]')].map(el => [el, 'innerHTML', el.dataset.i18n]);
const labels = [...document.querySelectorAll('[data-i18n-label]')].map(el => [el, 'aria-label', el.dataset.i18nLabel]);
const alts = [...document.querySelectorAll('[data-i18n-alt]')].map(el => [el, 'alt', el.dataset.i18nAlt]);
const en = new Map();
texts.forEach(([el]) => en.set(el, el.innerHTML));
[...labels, ...alts].forEach(([el, attr]) => en.set(el, el.getAttribute(attr)));
const enDesc = metaDesc.content;

function setLang(lang) {
  const dutch = lang === 'nl';
  texts.forEach(([el, , key]) => { el.innerHTML = dutch ? nl[key] : en.get(el); });
  [...labels, ...alts].forEach(([el, attr, key]) => el.setAttribute(attr, dutch ? nl[key] : en.get(el)));
  metaDesc.content = dutch ? nl['meta.desc'] : enDesc;
  root.lang = lang;
  langBtn.textContent = dutch ? 'EN' : 'NL';
  langBtn.setAttribute('aria-label', dutch ? 'View in English' : 'Bekijk in het Nederlands');
}

let lang = navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en';
try { lang = localStorage.getItem('lang') || lang; } catch (e) {}
setLang(lang);
langBtn.addEventListener('click', () => {
  lang = lang === 'nl' ? 'en' : 'nl';
  setLang(lang);
  try { localStorage.setItem('lang', lang); } catch (e) {}
});
