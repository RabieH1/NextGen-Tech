
// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('show');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navList?.classList.remove('show');
      toggle?.setAttribute('aria-expanded','false');
    }
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Client-side form validation + submission
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const toast = document.getElementById('form-success');

function setError(id, msg){
  const input = document.getElementById(id);
  const p = document.querySelector(`.error-msg[data-for="${id}"]`);
  if (input) input.classList.add('error');
  if (p) p.textContent = msg || '';
}
function clearError(id){
  const input = document.getElementById(id);
  const p = document.querySelector(`.error-msg[data-for="${id}"]`);
  if (input) input.classList.remove('error');
  if (p) p.textContent = '';
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  toast.hidden = true;
  statusEl.textContent = '';

  // Required fields
  let ok = true;
  const email = document.getElementById('email').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const need = document.getElementById('need').value;
  const gdpr = document.getElementById('gdpr').checked;

  // reset
  ['email','lastname','need','gdpr'].forEach(clearError);

  if (!lastname){ setError('lastname','Le nom est requis.'); ok=false; }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)){ setError('email','Email valide requis.'); ok=false; }
  if (!need){ setError('need','Sélectionnez un besoin.'); ok=false; }
  if (!gdpr){ setError('gdpr','Vous devez accepter le RGPD.'); ok=false; }

  if (!ok) return;

  statusEl.textContent = 'Envoi en cours…';

  // Compose payload
  const payload = {
    firstname: document.getElementById('firstname').value.trim(),
    lastname,
    email,
    need,
    message: document.getElementById('message').value.trim()
  };

  try {
    // OPTION 1 (backend Node/Express ci-dessous) :
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Erreur réseau');
    const data = await res.json();
    if (data?.ok){
      form.reset();
      statusEl.textContent = '';
      toast.hidden = false;
    } else {
      throw new Error('Échec de l’envoi');
    }
  } catch (err){
    // OPTION 2 (fallback mailto si pas de backend) :
    statusEl.textContent = 'Impossible d’envoyer automatiquement. Ouverture de votre messagerie…';
    const subject = encodeURIComponent(`[Contact] ${payload.need} — ${payload.lastname}`);
    const body = encodeURIComponent(
      `Prénom: ${payload.firstname}\nNom: ${payload.lastname}\nEmail: ${payload.email}\nBesoin: ${payload.need}\n\nMessage:\n${payload.message}`
    );
    window.location.href = `mailto:contact@nextgentech.fr?subject=${subject}&body=${body}`;
  }
});
