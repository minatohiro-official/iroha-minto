'use strict';
(function () {
  var root = document.documentElement;
  var el = document.getElementById('opening');
  if (!el || !root.classList.contains('op-on')) return;
  // Every screen shown as a phone screen, each exactly once per loop. [file, object-position]
  var S = [
    ['phone-shii.webp','50% 0'],['phone-reeka.webp','50% 0'],['phone-mogu.webp','50% 0'],['feature-songsearch.webp','50% 0'],
    ['phone-ante.webp','50% 0'],['feature-stamp.webp','50% 0'],['phone-hiro.webp','50% 0'],['feature-gallery.webp','50% 0'],
    ['feature-profilecard.webp','50% 0'],['work-shii.webp','46% 0'],['work-hiro.webp','80% 0'],['work-mogu.webp','74% 0']
  ];
  var vw = window.innerWidth, vh = window.innerHeight, mobile = vw < 700, gap = Math.max(12, Math.min(24, vw * 0.014));
  function pwFor(n) { return mobile ? vw * 0.36 : Math.max(150, Math.min(vw * (n === 4 ? 0.2 : 0.26), 360)); }
  var n = mobile ? 3 : 4;
  // pick the column count so one loop is taller than the screen (no repeated screen visible at once)
  function span(k) { return Math.floor(S.length / k) * (pwFor(k) * 16 / 9 + gap + 8); }
  while (n > 2 && span(n) < vh * 1.35) n--;
  var pw = pwFor(n), tileH = pw * 16 / 9 + gap;
  var wall = el.querySelector('.op-wall'); wall.style.setProperty('--gap', gap + 'px');
  var cols = [];
  for (var c = 0; c < n; c++) { var col = document.createElement('div'); col.className = 'op-col' + (c % 2 ? ' rev' : ''); col.style.width = pw + 'px'; var tr = document.createElement('div'); tr.className = 'op-track'; col.appendChild(tr); wall.appendChild(col); cols.push(tr); }
  var counts = new Array(n).fill(0);
  S.forEach(function (t, i) { counts[i % n]++; });
  for (var rep = 0; rep < 2; rep++) S.forEach(function (t, i) {
    var ph = document.createElement('div'); ph.className = 'op-ph'; ph.style.setProperty('--op', t[1]);
    var im = new Image(); im.src = 'assets/' + t[0]; im.alt = ''; im.decoding = 'async'; ph.appendChild(im);
    cols[i % n].appendChild(ph);
  });
  cols.forEach(function (tr, c) {
    var dur = Math.max(20, counts[c] * (pw * 16 / 9 + gap) / 42);
    tr.style.animationDuration = dur + 's'; tr.style.animationDelay = (-dur * ((c * 0.37) % 1)) + 's';
  });
  var done = false;
  function finish() {
    if (done) return; done = true;
    el.classList.add('op-out');
    setTimeout(function () { root.classList.remove('op-on'); el.remove(); }, 900);
  }
  el.addEventListener('click', finish);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish(); });
})();
