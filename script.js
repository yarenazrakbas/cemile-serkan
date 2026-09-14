(function () {
  'use strict';

  // ===== Merkezi etkinlik config =====
  const engagementEvent = {
    title: 'Cemile & Serkan Düğün',
    description: 'Düğünümüze Hoşgeldiniz — Cemile & Serkan',
    location: 'Reisoğlu Restaurant, Güneşler Merkez Mah. 5052. Sk. No:15, Adapazarı/Sakarya',
    start: '2026-09-18T19:00:00+03:00',
    end: '2026-09-18T23:00:00+03:00',
    timezone: 'Europe/Istanbul'
  };

  const EVENT_DATE = new Date(engagementEvent.start);

  // ===== Envelope Open =====
  const envelopeScreen = document.getElementById('envelope-screen');
  const mainContent = document.getElementById('main-content');
  const openBtn = document.getElementById('open-envelope');
  const envelope = document.querySelector('.envelope');
  let envelopeOpened = false;

  document.body.classList.add('envelope-locked');

  function openEnvelope() {
    if (envelopeOpened || openBtn.disabled) return;
    envelopeOpened = true;
    openBtn.disabled = true;

    envelope.classList.add('opened');

    setTimeout(function () {
      mainContent.classList.remove('hidden');
      document.body.classList.remove('envelope-locked');
      window.scrollTo(0, 0);
      requestAnimationFrame(function () {
        mainContent.classList.add('revealed');
        envelopeScreen.classList.add('fading');
      });
      startCountdown();
    }, 2500);

    setTimeout(function () {
      envelopeScreen.classList.add('hidden');
    }, 3500);
  }

  function handleIntroTap() {
    if (envelopeOpened) return;
    openEnvelope();
  }

  if (envelopeScreen) {
    envelopeScreen.addEventListener('touchstart', handleIntroTap, {
      passive: true,
      capture: true
    });

    envelopeScreen.addEventListener('click', function (event) {
      event.preventDefault();
      handleIntroTap();
    }, true);
  }

  // ===== Countdown =====
  let countdownInterval;

  function startCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  function updateCountdown() {
    const now = new Date();
    const diff = EVENT_DATE - now;

    if (diff <= 0) {
      setCountdownValues(0, 0, 0, 0);
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setCountdownValues(days, hours, minutes, seconds);
  }

  function setCountdownValues(days, hours, minutes, seconds) {
    document.getElementById('days').textContent = pad(days);
    document.getElementById('hours').textContent = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }
})();
