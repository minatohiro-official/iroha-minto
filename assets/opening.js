'use strict';
(function () {
  var root = document.documentElement;
  var el = document.getElementById('opening');
  if (!el || !root.classList.contains('op-on')) return;
  // Every screen shown as a phone screen, each exactly once per loop. [file, object-position]
  var S = [
    'phone-shii','op-mogu-icons','phone-ante','op-reeka-home','op-hiro-fan','phone-michamaru','op-shii-menu','op-ante-songs','phone-mogu','op-hiro-news',
    'op-shii-omikuji','phone-reeka','feature-stamp','op-mogu-angel','op-ante-menu','phone-hiro','op-reeka-shop','op-shii-message','feature-songsearch','op-mogu-profile'
  ].map(function (f) { return [f + '.webp', '50% 0']; });
  var vw = window.innerWidth, vh = window.innerHeight, mobile = vw < 700, R = 16 / 9;
  var gap = mobile ? Math.max(8, vw * 0.026) : Math.min(vw * 0.016, 24);
  var pw = mobile ? vw * 0.3 : Math.min(vw * (vw >= 1500 ? 0.15 : 0.16), 300), tileH = pw * R, slot = tileH + gap;
  // columns fill the whole width; the outer ones are cut off by the screen edges
  var n = Math.max(3, Math.ceil(vw * 1.12 / (pw + gap))); if (n % 2 === 0) n++;
  var wall = el.querySelector('.op-wall');
  wall.style.setProperty('--gap', gap + 'px'); wall.style.setProperty('--vgap', gap + 'px'); wall.style.setProperty('--ar', R);
  // Columns alternate direction (up / down). Screens are split into two disjoint groups so that
  // an upward column and a downward column never show the same screen at the same time.
  var nUp = Math.ceil(n / 2), nDown = n - nUp, sizeA = Math.round(S.length * nUp / n), A = [], B = [];
  S.forEach(function (t, i) { (Math.floor((i + 1) * sizeA / S.length) > Math.floor(i * sizeA / S.length) ? A : B).push(t); });
  var wallH = vh * 1.7 + 200;
  for (var c = 0; c < n; c++) {
    var up = c % 2 === 0, k = Math.floor(c / 2), G = up ? A : B, cnt = up ? nUp : nDown;
    var shift = Math.round(k * G.length / cnt) % G.length, list = G.slice(shift).concat(G.slice(0, shift));
    var loop = G.length * slot, copies = Math.ceil(wallH / loop) + 2;
    var col = document.createElement('div'); col.className = 'op-col' + (up ? '' : ' rev'); col.style.width = pw + 'px';
    var tr = document.createElement('div'); tr.className = 'op-track'; tr.style.setProperty('--loop', loop + 'px'); col.appendChild(tr); wall.appendChild(col);
    for (var rep = 0; rep < copies; rep++) list.forEach(function (t) {
      var ph = document.createElement('div'); ph.className = 'op-ph'; ph.style.setProperty('--op', t[1]);
      var im = new Image(); im.src = 'assets/' + t[0]; im.alt = ''; im.decoding = 'async'; ph.appendChild(im); tr.appendChild(ph);
    });
    tr.style.animationDuration = (loop / 42) + 's';
  }
  var done = false;
  function finish() {
    if (done) return; done = true;
    el.classList.add('op-out');
    setTimeout(function () { root.classList.remove('op-on'); el.remove(); }, 900);
  }
  el.addEventListener('click', finish);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish(); });
})();
