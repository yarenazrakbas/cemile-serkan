(function () {
  'use strict';

  // ===== Merkezi etkinlik config =====
  const dugunEvent = {
    title: 'Cemile & Serkan Düğün',
    start: '2026-09-18T19:00:00+03:00'
  };

  const nikahEvent = {
    title: 'Cemile & Serkan Nikah',
    start: '2026-09-20T17:30:00+03:00'
  };

  const DUGUN_DATE = new Date(dugunEvent.start);
  const NIKAH_DATE = new Date(nikahEvent.start);

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

  function getParts(target, now) {
    const diff = target - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      done: false
    };
  }

  function updateCountdown() {
    const now = new Date();
    const dugun = getParts(DUGUN_DATE, now);
    const nikah = getParts(NIKAH_DATE, now);

    setCountdownValues('days', 'hours', 'minutes', 'seconds', dugun);
    setCountdownValues('nikah-days', 'nikah-hours', 'nikah-minutes', 'nikah-seconds', nikah);

    if (dugun.done && nikah.done) {
      clearInterval(countdownInterval);
    }
  }

  function setCountdownValues(daysId, hoursId, minutesId, secondsId, parts) {
    document.getElementById(daysId).textContent = pad(parts.days);
    document.getElementById(hoursId).textContent = pad(parts.hours);
    document.getElementById(minutesId).textContent = pad(parts.minutes);
    document.getElementById(secondsId).textContent = pad(parts.seconds);
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }
})();
