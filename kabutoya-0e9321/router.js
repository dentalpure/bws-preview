/* 兜家旅館 プランB — 擬似ルーター
   ハッシュに本番と同じ実パスを入れる（#/about/irori/）。
   受注後は静的HTMLに分割するので、この仕掛けはデモ限りのもの。 */
(function () {
  const BASE = "https://www.kabutoya.net";
  const byPath = Object.fromEntries(ROUTES.map(r => [r.path, r]));

  const meta = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute("content", val);
  };

  function crumbTrail(route) {
    // T3: router.js と chrome.js に同じ親チェーン走査が2つコピーされていたのを
    // ここへ一本化。routes.js の parent は手打ちのため、打ち間違いで循環
    // （A→B→A…）が起きるとタブが固まる。訪問済みセットで止める。
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
      el.innerHTML = ""; el.hidden = true;
      // I1: トップ・/en/ に戻っても #crumb-ld が前ページのBreadcrumbListのまま
      // 残っていた（hidden化するだけでJSON-LDは消していなかったため）。
      document.getElementById("crumb-ld").textContent = "{}";
      return;
    }
    el.hidden = false;
    el.innerHTML = "<ol>" + trail.map((r, i) =>
      i === trail.length - 1
        ? `<li><span aria-current="page">${r.label}</span></li>`
        : `<li><a href="#${r.path}">${r.label}</a></li>`
    ).join("") + "</ol>";

    document.getElementById("crumb-ld").textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((r, i) => ({
        "@type": "ListItem", position: i + 1, name: r.label, item: BASE + r.path
      }))
    });
  }

  function render() {
    const path = (location.hash || "#/").slice(1);
    const route = byPath[path] || byPath["/"];      // 未定義はトップへ
    const tpl = document.getElementById(route.tpl);

    // 1. 本文を差し込む
    const view = document.getElementById("view");
    view.innerHTML = "";
    if (tpl) view.appendChild(tpl.content.cloneNode(true));

    // 2. head を書き換える（プランBの価値そのもの）
    document.title = route.title;
    document.documentElement.lang = route.lang;
    meta('meta[name="description"]', route.desc);
    meta('meta[property="og:title"]', route.title);
    meta('meta[property="og:description"]', route.desc);
    document.querySelector('link[rel="canonical"]').href = BASE + route.path;

    // 3. パンくず＋BreadcrumbList
    paintCrumb(route);

    // 4. スクロール位置を戻す
    window.scrollTo(0, 0);

    // 5. h1 にフォーカスを移す（スクリーンリーダーに遷移を伝える）
    const h1 = view.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
    else view.focus({ preventScroll: true });

    // 6. ナビの現在地表示
    document.querySelectorAll("[data-navlink]").forEach(a => {
      const p = a.getAttribute("href").slice(1);
      const on = p === route.path || (route.parent && p === route.parent);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });

    // 付随：ドロワーを閉じる／SEOバーを描き直す
    window.KB.closeDrawer();
    window.KB.paintSeoBar(route);
    // M3: syncCtaBar は syncLangLinks を呼ぶだけの名ばかりの関数だったため削除し、
    // 呼び出し側を実体である syncLangLinks に直接揃えた。
    window.KB.syncLangLinks();
  }

  window.KB = Object.assign(window.KB || {}, {
    go(path) { location.hash = path; },
    current() { return byPath[(location.hash || "#/").slice(1)] || byPath["/"]; },
    render,
    crumbTrail,
    langHref() {
      const cur = window.KB.current().path;
      return "#" + (LANG_PAIRS[cur] || "/en/");
    }
  });

  addEventListener("hashchange", render);
  addEventListener("DOMContentLoaded", () => { window.KB.buildChrome(); render(); });
})();
