(function () {
  var root = document.querySelector('.km-hero__slider');
  if (!root) return;
  var slides = [].slice.call(root.querySelectorAll('.km-hero__slide'));
  var dots = [].slice.call(root.querySelectorAll('.km-hero__dot'));
  var pause = root.querySelector('.km-hero__pause');
  var current = 0, timer = null;
  var playing = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === current); });
    dots.forEach(function (d, n) { d.classList.toggle('is-active', n === current); });
  }
  function start() {
    clearInterval(timer);
    if (playing) timer = setInterval(function () { show(current + 1); }, 6000);
    pause.textContent = playing ? '❙❙' : '▶';
    pause.setAttribute('aria-label', playing ? 'スライドを停止' : 'スライドを再生');
  }
  dots.forEach(function (d, n) { d.addEventListener('click', function () { show(n); start(); }); });
  pause.addEventListener('click', function () { playing = !playing; start(); });
  start();

  function go(id) {
    var el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
  }
  var area = document.querySelector('.km-hub__area');
  area.addEventListener('change', function () { if (area.value) go(area.value); });
  document.querySelector('.km-hub__keyword').addEventListener('submit', function (e) {
    e.preventDefault();
    var q = e.target.querySelector('input').value.trim();
    if (/錦|きんか|鹿児島市/.test(q)) go('anc-1');
    else if (/霧|きりかぜ/.test(q)) go('anc-2');
    else if (/入居|流れ/.test(q)) go('anc-3');
    else if (window.demoToast) window.demoToast('デモ版のため「錦花苑」「霧風苑」「入居」で検索できます');
  });
})();
