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
