// ===== Member lookup: reads ?phone= from the URL, calls the gym server, shows the result =====
(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbwoq0LlvaQUMAJ7ohFKDEhR0kbwAi1sYn9tIMKSNOXyp3NijCwPfb5jgzMxMegi8qp1qQ/exec";
  const GYM_WHATSAPP_NUMBER = "201556340468";

  const stateLoading = document.getElementById('stateLoading');
  const stateError = document.getElementById('stateError');
  const stateResult = document.getElementById('stateResult');

  function showOnly(el) {
    [stateLoading, stateError, stateResult].forEach(s => { if (s) s.style.display = 'none'; });
    if (el) el.style.display = '';
  }

  function waLink(message) {
    return `https://wa.me/${GYM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function showError(phone, title, text) {
    document.getElementById('errorTitle').textContent = title;
    document.getElementById('errorText').textContent = text;
    document.getElementById('whatsappHelp').href = waLink(`السلام عليكم، عملت استعلام بالرقم ${phone} ومفيش نتيجة، ممكن تساعدوني؟`);
    showOnly(stateError);
  }

  // Turns whatever the server sends back for "days left" into a sane whole number of days.
  // The sheet has produced oversized values before (looks like a raw date-diff bug on their end),
  // so anything absurd gets treated as "no valid data" instead of shown to the member.
  function normalizeDays(raw) {
    const n = Number(raw);
    if (!isFinite(n)) return null;
    if (n > 3650 || n < -3650) return null; // more than ~10 years is not a real "days left" value
    return Math.round(n);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(location.search);
    const phone = (params.get('phone') || '').trim();

    if (!phone) {
      showError('', 'مفيش رقم موبايل', 'ارجع لصفحة الاشتراك ودخّل رقم موبايلك الأول.');
      return;
    }

    showOnly(stateLoading);

    fetch(`${API_URL}?phone=${encodeURIComponent(phone)}`)
      .then(res => {
        if (!res.ok) throw new Error('bad-response');
        return res.json();
      })
      .then(data => {
        if (!data || data.found !== true) {
          showError(phone, 'مفيش عضوية بالرقم ده', 'اتأكد إن الرقم اللي دخلته هو نفس رقم الموبايل المسجل بيه اشتراكك.');
          return;
        }

        const name = (data.name || '').toString().trim() || 'عضو Legends Gym';
        const days = normalizeDays(data.daysLeft);

        document.getElementById('memberName').textContent = name;
        document.getElementById('memberAvatar').textContent = name.replace('كابتن', '').trim().charAt(0) || 'L';

        if (days === null) {
          document.getElementById('memberDays').textContent = '—';
          const note = document.getElementById('memberNote');
          note.textContent = 'حصل خطأ في حساب الأيام المتبقية، تواصل معانا على واتساب وهنتأكدلك من الاشتراك.';
          note.style.display = '';
        } else if (days <= 0) {
          document.getElementById('memberDays').textContent = '0';
          const note = document.getElementById('memberNote');
          note.textContent = 'اشتراكك خلص، دوس تحت للتجديد.';
          note.style.display = '';
        } else {
          document.getElementById('memberDays').textContent = days;
        }

        if (data.package) {
          document.getElementById('memberPackage').textContent = data.package;
          document.getElementById('packageStat').style.display = '';
        }

        if (data.weight) {
          document.getElementById('memberWeight').textContent = data.weight;
          document.getElementById('weightStat').style.display = '';
        }

        // If the subscription type looks session-based ("حصص"), show sessions remaining too.
        const pkgText = (data.package || '').toString();
        if (pkgText.includes('حصة') || pkgText.includes('حصص') || data.sessionsLeft !== undefined) {
          if (data.sessionsLeft !== undefined && data.sessionsLeft !== '') {
            document.getElementById('memberSessions').textContent = data.sessionsLeft;
            document.getElementById('sessionsStat').style.display = '';
          }
        }

        document.getElementById('whatsappRenew').href = waLink(`السلام عليكم، معايا اشتراك باسم ${name}، عايز أجدد/أستفسر عن اشتراكي.`);
        showOnly(stateResult);
      })
      .catch(() => {
        showError(phone, 'مقدرناش نجيب البيانات دلوقتي', 'ممكن يكون فيه مشكلة اتصال، جرب تاني بعد شوية أو كلمنا على واتساب.');
      });
  });
})();
