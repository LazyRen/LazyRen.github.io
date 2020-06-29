!function (window, document) {
  var LM = 'light-mode';
  var DM = 'dark-mode';
  var h = new Date().getHours();
  if ('matchMedia' in window && window.matchMedia('(prefers-color-scheme)')) return;
  var m = h <= window._sunrise || h >= window._sunset  ? DM : LM; 
  var n = m === DM ? LM : DM;
  document.body.classList.add(m);
  document.body.classList.remove(n);
}(window, document);
