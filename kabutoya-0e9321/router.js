(function() {
  const BASE = "https://www.kabutoya.net";
  const byPath = Object.fromEntries(ROUTES.map((r) => [r.path, r]));
  const meta = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute("content", val);
  };
  function crumbTrail(route) {
    const trail = [];
    const seen = new Set();
    let r = route;
    while (r && !seen.has(r.path)) {
      seen.add(r.path);
      trail.unshift(r);
      r = r.parent ? byPath[r.parent] : null;
    }
    return trail;
  }
  function paintCrumb(route) {
    const trail = crumbTrail(route);
    const el = document.getElementById("crumb");
    if (trail.length <= 1) {
      el.innerHTML = "";
      el.hidden = true;
      document.getElementById("crumb-ld").textContent = "{}";
      return;
    }
    el.hidden = false;
    el.innerHTML = "<ol>" + trail.map(
      (r, i) => i === trail.length - 1 ? `<li><span aria-current="page">${r.label}</span></li>` : `<li><a href="#${r.path}">${r.label}</a></li>`
    ).join("") + "</ol>";
    document.getElementById("crumb-ld").textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.label,
        item: BASE + r.path
      }))
    });
  }
  function render() {
    const path = (location.hash || "#/").slice(1);
    const route = byPath[path] || byPath["/"];
    const tpl = document.getElementById(route.tpl);
    const view = document.getElementById("view");
    view.innerHTML = "";
    if (tpl) view.appendChild(tpl.content.cloneNode(true));
    document.title = route.title;
    document.documentElement.lang = route.lang;
    meta('meta[name="description"]', route.desc);
    meta('meta[property="og:title"]', route.title);
    meta('meta[property="og:description"]', route.desc);
    document.querySelector('link[rel="canonical"]').href = BASE + route.path;
    paintCrumb(route);
    window.scrollTo(0, 0);
    const h1 = view.querySelector("h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.focus({ preventScroll: true });
    } else view.focus({ preventScroll: true });
    document.querySelectorAll("[data-navlink]").forEach((a) => {
      const p = a.getAttribute("href").slice(1);
      const on = p === route.path || route.parent && p === route.parent;
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.KB.closeDrawer();
    window.KB.paintSeoBar(route);
    window.KB.syncLangLinks();
  }
  window.KB = Object.assign(window.KB || {}, {
    go(path) {
      location.hash = path;
    },
    current() {
      return byPath[(location.hash || "#/").slice(1)] || byPath["/"];
    },
    render,
    crumbTrail,
    langHref() {
      const cur = window.KB.current().path;
      return "#" + (LANG_PAIRS[cur] || "/en/");
    }
  });
  addEventListener("hashchange", render);
  addEventListener("DOMContentLoaded", () => {
    window.KB.buildChrome();
    render();
  });
})();
