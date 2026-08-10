// ===== Floating WhatsApp button (all pages) =====
(function(){
  const WA_NUMBER = "201556340468";
  const btn = document.createElement('a');
  btn.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('السلام عليكم، عايز أستفسر عن Legends Fitness & Gym')}`;
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.className = "floating-btn floating-whatsapp";
  btn.setAttribute('aria-label', 'تواصل معانا على واتساب');
  btn.title = "واتساب";
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.86-1.24-4.72-4.13-4.86-4.32-.14-.19-1.17-1.55-1.17-2.96 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.51-.09.19-.14.3-.28.47-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.44.2.51.32.07.12.07.68-.17 1.36z"/></svg>`;
  document.body.appendChild(btn);
})();

// ===== Floating "Rate us on Google" button (all pages) =====
(function(){
  const GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/e8D61CYg8jMHXvRM9";
  const btn = document.createElement('a');
  btn.href = GOOGLE_REVIEW_URL;
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.className = "floating-btn floating-review";
  btn.setAttribute('aria-label', 'قيّمنا على جوجل ماب');
  btn.title = "قيّمنا على جوجل";
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  document.body.appendChild(btn);
})();

// ===== Reveal-on-scroll effect =====
(function(){
  const revealTargets = document.querySelectorAll('.quick-card, .trainer-card, .member-card, .hours-card, .id-card, .helper-list, .section-head');
  if (!revealTargets.length || !('IntersectionObserver' in window)) return;
  revealTargets.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => observer.observe(el));
})();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
}

// ===== Highlight current page in nav =====
(function highlightActive(){
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navMenu a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
})();

// ===== Trainers data (whatsapp & instagram left as placeholders — fill in later) =====
const trainers = [
  { name: "كابتن سعيد",  whatsapp: "#", instagram: "#" },
  { name: "كابتن يحيى",  whatsapp: "#", instagram: "#" },
  { name: "كابتن عادل",  whatsapp: "#", instagram: "#" },
  { name: "كابتن منة",   whatsapp: "#", instagram: "#" },
  { name: "كابتن نادين", whatsapp: "#", instagram: "#" },
];

const trainersGrid = document.getElementById('trainersGrid');
if (trainersGrid) {
  trainers.forEach(t => {
    const initial = t.name.replace('كابتن', '').trim().charAt(0);
    const card = document.createElement('div');
    card.className = 'trainer-card';
    card.innerHTML = `
      <div class="avatar">${initial}</div>
      <h4>${t.name}</h4>
      <div class="role">مدرب معتمد</div>
      <div class="social-row">
        <a href="${t.whatsapp}" target="_blank" rel="noopener" aria-label="واتساب ${t.name}" title="واتساب">
          <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.86-1.24-4.72-4.13-4.86-4.32-.14-.19-1.17-1.55-1.17-2.96 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.51-.09.19-.14.3-.28.47-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.44.2.51.32.07.12.07.68-.17 1.36z"/></svg>
        </a>
        <a href="${t.instagram}" target="_blank" rel="noopener" aria-label="انستجرام ${t.name}" title="انستجرام">
          <svg viewBox="0 0 24 24"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 5.35A6.65 6.65 0 1 0 12 18.65 6.65 6.65 0 0 0 12 5.35zm0 2.16A4.49 4.49 0 1 1 12 16.5 4.49 4.49 0 0 1 12 7.51zm6.9-2.36a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0z"/></svg>
        </a>
      </div>
    `;
    trainersGrid.appendChild(card);
  });
}

// ===== Subscription phone check form =====
// Sends the member to member.html?phone=..., which calls the gym server
// and shows their name / remaining days there.
const idForm = document.getElementById('idForm');
if (idForm) {
  idForm.addEventListener('submit', function(e){
    e.preventDefault();
    const input = document.getElementById('memberId');
    const idError = document.getElementById('idError');
    const phone = input.value.trim();
    const isValid = /^01[0125][0-9]{8}$/.test(phone); // Egyptian mobile format

    if (!isValid) {
      if (idError) idError.classList.add('show');
      input.focus();
      return;
    }
    if (idError) idError.classList.remove('show');
    window.location.href = `member.html?phone=${encodeURIComponent(phone)}`;
  });
}
