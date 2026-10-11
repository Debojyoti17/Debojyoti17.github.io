/* Minimal vanilla JS: theme toggle, profile photo fallback, reveal-on-scroll. */
(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'theme';
  root.classList.add('js');

  function getStored() {
    try { var v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : null; }
    catch (e) { return null; }
  }
  function store(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* storage unavailable: ignore */ }
  }
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function systemTheme() { return mq && mq.matches ? 'dark' : 'light'; }

  // Runs immediately (script is in <head>) so there is no flash of the wrong theme.
  root.setAttribute('data-theme', getStored() || systemTheme());

  document.addEventListener('DOMContentLoaded', function () {
    // --- Theme toggle ---
    var btn = document.getElementById('theme-toggle');
    function label() {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('title', 'Switch to ' + next + ' theme');
    }
    if (btn) {
      btn.hidden = false;
      label();
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        store(next);
        label();
      });
    }
    // Follow system changes until the visitor makes an explicit choice
    if (mq && mq.addEventListener) {
      mq.addEventListener('change', function () {
        if (!getStored()) { root.setAttribute('data-theme', systemTheme()); if (btn) label(); }
      });
    }

    // --- Profile photo: show it only if assets/profile.jpg actually loads ---
    var photo = document.getElementById('profile-photo');
    if (photo) {
      var ok = function () { photo.classList.add('loaded'); };
      if (photo.complete && photo.naturalWidth > 0) ok();
      else photo.addEventListener('load', ok);
    }

    // --- Footer year ---
    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    // --- Reveal on scroll ---
    var items = document.querySelectorAll('.reveal');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduce) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  });
})();
