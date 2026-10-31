(function () {
  var toast = document.createElement('div');
  toast.className = 'demo-toast';
  toast.textContent = 'デモ版のため、このページのみ表示しています';
  document.body.appendChild(toast);
  var timer, DEFAULT = toast.textContent;
  window.demoToast = function (msg) {
    toast.textContent = msg || DEFAULT;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-demo]');
    if (!a) return;
    e.preventDefault();
    window.demoToast();
  });
})();
