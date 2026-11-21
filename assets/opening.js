'use strict';
(function () {
  var root = document.documentElement;
  var el = document.getElementById('opening');
  if (!el || !root.classList.contains('op-on')) return;
  var done = false, count = el.querySelector('.op-count'), start = performance.now(), DUR = 2300;
  function tick(now) {
    if (done) return;
    var t = Math.min(1, (now - start) / DUR), v = Math.round(100 * (1 - Math.pow(1 - t, 2.2)));
    count.textContent = String(v).padStart(3, '0');
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  function finish() {
    if (done) return; done = true;
    count.textContent = '100';
    el.classList.add('op-out');
    setTimeout(function () { root.classList.remove('op-on'); el.remove(); }, 1300);
  }
  el.addEventListener('click', finish);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter') finish(); });
  setTimeout(finish, 3000);
})();
