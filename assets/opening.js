'use strict';
(function () {
  var root = document.documentElement;
  var el = document.getElementById('opening');
  if (!el || !root.classList.contains('op-on')) return;
  // Hand-picked, full-frame screens only. [file, w, h, x%, y%, width(vw), rotate(deg)]
  var PC = [
    ['work-shii.webp',1200,824, 17,22, 23,-5], ['work-mogu.webp',1200,824, 83,22, 23,5], ['work-hiro.webp',1200,824, 50,12, 18,0],
    ['phone-shii.webp',400,711, 8,64, 12,-4], ['phone-mogu.webp',400,711, 24,74, 12,5], ['feature-stamp.webp',445,479, 26,43, 12,3],
    ['phone-ante.webp',400,711, 92,64, 12,4], ['phone-reeka.webp',400,640, 76,74, 12,-5], ['feature-profilecard.webp',640,1157, 74,43, 10,-3],
    ['phone-hiro.webp',400,640, 41,85, 10,-2], ['feature-songsearch.webp',640,927, 59,85, 9,3]
  ];
  var SP = [
    ['phone-shii.webp',400,711, 20,17, 27,-5], ['phone-ante.webp',400,711, 50,13, 27,0], ['phone-reeka.webp',400,640, 80,17, 27,5],
    ['phone-mogu.webp',400,711, 20,83, 27,4], ['phone-hiro.webp',400,640, 50,86, 27,0], ['feature-songsearch.webp',640,927, 80,83, 27,-4]
  ];
  var list = window.innerWidth < 700 ? SP : PC;
  var card = el.querySelector('.op-card');
  list.forEach(function (t, i) {
    var d = document.createElement('div'); d.className = 'op-tile';
    d.style.cssText = 'left:' + t[3] + '%;top:' + t[4] + '%;width:' + t[5] + 'vw;--r:' + t[6] + 'deg;--d:' + (0.1 + i * 0.08).toFixed(2) + 's;--dx:' + ((t[3] - 50) * 6) + 'px;--dy:' + ((t[4] - 50) * 6) + 'px';
    var im = new Image(); im.src = 'assets/' + t[0]; im.width = t[1]; im.height = t[2]; im.alt = ''; im.decoding = 'async';
    d.appendChild(im); el.insertBefore(d, card);
  });
  var done = false;
  function finish() {
    if (done) return; done = true;
    el.classList.add('op-out');
    setTimeout(function () { root.classList.remove('op-on'); el.remove(); }, 900);
  }
  el.addEventListener('click', finish);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter') finish(); });
  setTimeout(finish, 3500);
})();
