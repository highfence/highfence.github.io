(function () {
  var root = document.documentElement;
  function apply(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem("hf-theme", theme); } catch (_) {}
    var opts = document.querySelectorAll("[data-theme-set]");
    for (var i = 0; i < opts.length; i++) {
      opts[i].classList.toggle("is-active", opts[i].getAttribute("data-theme-set") === theme);
    }
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-theme-set]");
    if (btn) apply(btn.getAttribute("data-theme-set"));
  });
  apply(root.dataset.theme || "light");
})();
