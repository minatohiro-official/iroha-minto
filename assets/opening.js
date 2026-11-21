'use strict';
(function () {
  var root = document.documentElement;
  var el = document.getElementById('opening');
  if (!el || !root.classList.contains('op-on')) return;
  // [file, width, height] — every screen appears exactly once.
  var S = [
    ['phone-shii.webp',400,711],['feature-message.webp',900,550],['phone-mogu.webp',400,711],['work-hiro.webp',1200,824],
    ['phone-ante.webp',400,711],['feature-stamp.webp',445,479],['phone-reeka.webp',400,640],['detail-songs.webp',751,610],
    ['feature-profilecard.webp',640,1157],['work-shii.webp',1200,824],['phone-hiro.webp',400,640],['feature-fortune.webp',900,524],
    ['feature-songsearch.webp',640,927],['work-mogu.webp',1200,824],['feature-gallery.webp',640,722],['detail-profile.webp',497,262],
    ['schedule-shii-chibi.webp',320,569],['feature-request.webp',900,479],['feature-commission.webp',640,599],['detail-schedule.webp',850,315],
    ['hero-shii-phone.webp',371,501],['ogp.png',1200,630]
  ];
  var wall = el.querySelector('.op-wall');
  var n = window.innerWidth < 700 ? 3 : 4, cols = [], hs = [];
  for (var c = 0; c < n; c++) { var d = document.createElement('div'); d.className = 'op-col'; if (c % 2) d.style.animationName = 'op-down'; wall.appendChild(d); cols.push(d); hs.push(0); }
  S.forEach(function (t) {
    var k = hs.indexOf(Math.min.apply(null, hs));
    var im = new Image(); im.src = 'assets/' + t[0]; im.width = t[1]; im.height = t[2]; im.alt = ''; im.decoding = 'async';
    cols[k].appendChild(im); hs[k] += t[2] / t[1] + 0.1;
  });
  var done = false;
  function finish() {
    if (done) return; done = true;
    el.classList.add('op-out');
    setTimeout(function () { root.classList.remove('op-on'); el.remove(); }, 900);
  }
  el.addEventListener('click', finish);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter') finish(); });
  setTimeout(finish, 3400);
})();
