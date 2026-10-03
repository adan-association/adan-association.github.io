// Mode sombre : bouton soleil/lune ajouté dans l'en-tête, choix mémorisé sur l'appareil
(function () {
  const KEY = 'adan-theme';
  const root = document.documentElement;
  const COLORS = { light: '#FBF3EA', dark: '#1B1511' };

  function getSaved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) { /* stockage indisponible : on ignore */ }
  }
  function apply(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    // Couleur de la barre du navigateur sur téléphone
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = COLORS[theme === 'dark' ? 'dark' : 'light'];
    const btn = document.getElementById('themeToggle');
    if (btn) {
      const dark = theme === 'dark';
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('aria-label', dark ? 'Passer en mode clair' : 'Passer en mode sombre');
      btn.title = dark ? 'Mode clair' : 'Mode sombre';
    }
  }

  apply(getSaved() === 'dark' ? 'dark' : 'light');

  const nav = document.querySelector('header nav');
  if (!nav) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'themeToggle';
  btn.className = 'theme-toggle';
  btn.innerHTML =
    '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
    '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/>' +
    '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  nav.appendChild(btn);
  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    save(next);
    apply(next);
  });
})();

// Menu mobile
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// Animations au scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Modal "Faire un don"
function openDonateModal(){
  const overlay = document.getElementById('donateModal');
  if(overlay){
    overlay.classList.add('open');
    const result = document.getElementById('payResult');
    if(result){ result.classList.remove('show'); result.textContent=''; }
  }
}
function closeDonateModal(){
  const overlay = document.getElementById('donateModal');
  if(overlay) overlay.classList.remove('open');
}
function choosePayment(method){
  const result = document.getElementById('payResult');
  if(!result) return;
  const label = method === 'wave' ? 'Wave' : 'Orange Money';
  result.textContent = "Le numéro pour les transferts " + label + " sera bientôt disponible. Merci de votre patience et de votre confiance \u2764\ufe0f";
  result.classList.add('show');
}
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('donateModal');
  if(overlay && e.target === overlay) closeDonateModal();
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeDonateModal();
});
