(function() {
  const TEL = "042-598-6136";
  const byPath = Object.fromEntries(ROUTES.map((r) => [r.path, r]));
  const nameOf = (p, short) => short || (byPath[p] ? byPath[p].label : p);
  let footerVisible = false;
  const SNS = [
    ["Instagram", "https://www.instagram.com/kabutoya_ryokan/"],
    ["Facebook", "https://www.facebook.com/kabutoyaryokan/"],
    ["X", "https://twitter.com/KABUTOYA_RYOKAN"],
    ["LINE", "https://lin.ee/A6h9IuL"],
    ["YouTube", "https://www.youtube.com/@kabutoya_ryokan"],
    ["Vimeo", "https://vimeo.com/kabutoya"]
  ];
  const snsHTML = () => SNS.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}\uFF08\u65B0\u3057\u3044\u30BF\u30D6\u3067\u958B\u304D\u307E\u3059\uFF09">${n}</a>`).join("");
  const LOGO = `
    <svg viewBox="0 0 56 150" aria-hidden="true">
      <text x="28" y="44" text-anchor="middle" font-family="Noto Serif JP, Hiragino Mincho ProN, serif" font-size="42" fill="currentColor">\u515C</text>
      <circle cx="46" cy="50" r="3.2" fill="#e72420"/>
      <text x="28" y="72" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="8.5" letter-spacing="1.6" fill="currentColor">KABUTOYA</text>
      <text x="28" y="84" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="8.5" letter-spacing="1.6" fill="currentColor">RYOKAN</text>
      <line x1="16" y1="94" x2="40" y2="94" stroke="currentColor" stroke-width=".6"/>
      <text x="28" y="108" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="6.5" letter-spacing="1.2" fill="currentColor">THE THATCHED</text>
      <text x="28" y="118" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="6.5" letter-spacing="1.2" fill="currentColor">INN \xB7 TOKYO</text>
    </svg>`;
  const burgerHTML = (id) => `<button class="burger" type="button" id="${id}" aria-label="\u30E1\u30CB\u30E5\u30FC\u3092\u958B\u304F" aria-expanded="false" aria-controls="drawer">
       <span></span><span></span>
     </button>`;
  function buildChrome() {
    const nav = MENU.map((m) => `
      <div class="nav-item">
        <a href="#${m.to}" data-menu="${m.to}"${m.sub.length ? ' aria-haspopup="true"' : ""}>${nameOf(m.to, m.name)}</a>
        ${m.sub.length ? `<div class="nav-sub">
          <a href="#${m.to}">${nameOf(m.to)}</a>
          ${m.sub.map((p) => `<a href="#${p}">${nameOf(p)}</a>`).join("")}
        </div>` : ""}
      </div>`).join("");
    document.getElementById("side").innerHTML = `
      <a class="side-logo" href="#/" aria-label="\u515C\u5BB6\u65C5\u9928 \u30C8\u30C3\u30D7\u3078">${LOGO}</a>
      ${burgerHTML("burgerSide")}
      <p class="side-txt">KAZUMA \xB7 HINOHARA \xB7 TOKYO</p>`;
    document.getElementById("header").innerHTML = `
      <a class="brand" href="#/" aria-label="\u515C\u5BB6\u65C5\u9928 \u30C8\u30C3\u30D7\u3078">
        <svg viewBox="0 0 40 40" aria-hidden="true"><text x="20" y="32" text-anchor="middle" font-family="Noto Serif JP, Hiragino Mincho ProN, serif" font-size="32" fill="currentColor">\u515C</text><circle cx="35" cy="35" r="2.6" fill="#e72420"/></svg>
        <span>\u515C\u5BB6\u65C5\u9928</span>
      </a>
      <div class="header-right">
      <nav class="nav" aria-label="\u30E1\u30A4\u30F3\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3">${nav}</nav>
      <p class="lang"><a href="#/" data-lang="ja">JP</a><span>/</span><a href="#/en/" hreflang="en" data-lang="en">EN</a></p>
      <a class="btn" href="#/reserve/">\u3054\u4E88\u7D04</a>
      <button class="seo-toggle" type="button" id="seoToggle" aria-pressed="false"
              title="\u3053\u306E\u30DA\u30FC\u30B8\u306ESEO\u8A2D\u5B9A\u3092\u8868\u793A">SEO</button>
      ${burgerHTML("burgerTop")}
      </div>`;
    document.getElementById("drawer").innerHTML = `
      <button class="drawer-close" type="button" id="drawerClose" aria-label="\u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B">CLOSE</button>
      <div class="drawer-in">
        <ol>${MENU.map((m, i) => `<li><a href="#${m.to}"><i>${String(i + 1).padStart(2, "0")}</i>${nameOf(m.to, m.name)}</a>${m.sub.length ? `<p class="drawer-sub">${m.sub.map((p) => `<a href="#${p}">${nameOf(p)}</a>`).join("")}</p>` : ""}</li>`).join("")}
        </ol>
        <p class="drawer-extra"><a href="#/news/">\u304A\u77E5\u3089\u305B</a><a href="#/shop/">\u304A\u8CB7\u3044\u3082\u306E</a></p>
        <div class="drawer-actions">
          <a class="btn" href="#/reserve/">\u3054\u4E88\u7D04\u30D5\u30A9\u30FC\u30E0\u3078</a>
          <a class="btn drawer-tel" href="tel:0425986136">042-598-6136 \u306B\u96FB\u8A71\u3059\u308B<small>\u53D7\u4ED8\u6642\u9593\u5185\u306B\u304A\u9858\u3044\u3044\u305F\u3057\u307E\u3059</small></a>
        </div>
        <p class="sns sns--drawer">${snsHTML()}</p>
        <p class="lang"><a href="#/" data-lang="ja">JAPANESE</a><span>/</span><a href="#/en/" hreflang="en" data-lang="en">ENGLISH</a></p>
      </div>`;
    document.getElementById("footer").innerHTML = `
      <div class="footer-in">
        <div class="footer-brand">
          <p class="footer-name">KABUTOYA RYOKAN<span>\u515C\u5BB6\u65C5\u9928</span></p>
          <p class="footer-addr">\u3012190-0221<br>\u6771\u4EAC\u90FD\u897F\u591A\u6469\u90E1\u6A9C\u539F\u6751\u6570\u99AC 2612</p>
          <p class="footer-tel"><a class="tel" href="tel:0425986136">${TEL}</a></p>
          <p class="footer-contact">FAX 042-598-6741<br><a href="mailto:info@kabutoya.net">info@kabutoya.net</a></p>
          <p class="footer-hours">\u30C1\u30A7\u30C3\u30AF\u30A4\u30F3 15:00 \uFF0F \u3054\u51FA\u767A 10:00<br>\u5B9A\u4F11\u65E5 \u6728\u66DC\uFF08\u30B7\u30FC\u30BA\u30F3\u671F\u9593\u3068\u795D\u65E5\u3092\u9664\u304F\uFF09</p>
          <p class="footer-cta"><a class="btn" href="#/reserve/">\u3054\u4E88\u7D04\u30D5\u30A9\u30FC\u30E0\u3078</a></p>
        </div>
        <nav class="footer-cols" aria-label="\u30D5\u30C3\u30BF\u30FC\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3">
          ${FOOTER.map((g) => `
          <div>
            <h2 class="footer-head"><span>${g.en}</span>${g.head}</h2>
            <ul>${g.links.map((p) => `<li><a href="#${p}">${nameOf(p)}</a></li>`).join("")}</ul>
          </div>`).join("")}
        </nav>
      </div>
      <div class="footer-sub"><div class="footer-sub-in">
        <p class="sns">${snsHTML()}</p>
        <p class="lang"><a href="#/" data-lang="ja">\u65E5\u672C\u8A9E</a><span>/</span><a href="#/en/" hreflang="en" data-lang="en">English</a></p>
      </div></div>
      <div class="footer-bottom"><div class="footer-bottom-in">
        <p>\xA9 Kabutoya Ryokan. All rights reserved.</p>
        <a class="top" href="#top" id="pageTop">PAGE TOP</a>
      </div></div>`;
    document.getElementById("bookFix").innerHTML = `
      <strong>\u4E88\u7D04\u3059\u308B</strong><small>\u516C\u5F0F\u30B5\u30A4\u30C8\u304C\u3044\u3061\u3070\u3093\u304A\u5F97</small>`;
    document.querySelectorAll(".burger").forEach((b) => b.addEventListener("click", toggleDrawer));
    document.getElementById("drawerClose").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
    document.getElementById("pageTop").addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    const t = document.getElementById("seoToggle");
    t.addEventListener("click", () => {
      const on = sessionStorage.getItem("kb-seo") !== "1";
      sessionStorage.setItem("kb-seo", on ? "1" : "0");
      t.setAttribute("aria-pressed", String(on));
      window.KB.paintSeoBar(window.KB.current());
    });
    t.setAttribute("aria-pressed", String(sessionStorage.getItem("kb-seo") === "1"));
    const footer = document.getElementById("footer");
    if ("IntersectionObserver" in window && footer) {
      new IntersectionObserver((es) => {
        footerVisible = es[0].isIntersecting;
        if (document.getElementById("drawer").dataset.open !== "true") {
          document.getElementById("bookFix").dataset.hidden = String(footerVisible);
        }
      }, { threshold: 0.05 }).observe(footer);
    }
    const paintHome = () => {
      document.body.dataset.home = String(window.KB.current().path === "/" || window.KB.current().path === "/en/");
    };
    paintHome();
    addEventListener("hashchange", paintHome);
    const header = document.getElementById("header");
    const spMq = window.matchMedia("(max-width:1080px)");
    let lastY = window.scrollY;
    const setHide = (on) => {
      header.dataset.hide = String(on);
      document.documentElement.style.setProperty("--hdr", on ? "8px" : "72px");
    };
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      document.body.dataset.scrolled = String(y > 40);
      if (!spMq.matches) {
        setHide(false);
        lastY = y;
        return;
      }
      const open = document.getElementById("drawer").dataset.open === "true";
      const d = y - lastY;
      if (open || y < 80) setHide(false);
      else if (d > 6) setHide(true);
      else if (d < -6) setHide(false);
      lastY = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    spMq.addEventListener("change", onScroll);
    onScroll();
    syncLangLinks();
    const view = document.getElementById("view");
    if (view && "MutationObserver" in window) {
      new MutationObserver(() => {
        initAccess(view);
        initMovie(view);
        initMedia(view);
        initReserve(view);
        paintMenu();
      }).observe(view, { childList: true });
    }
  }
  function initMedia(root) {
    root.querySelectorAll(".media-thumb[data-yt]").forEach((b) => {
      if (b.dataset.bound) return;
      b.dataset.bound = "1";
      const img = b.querySelector("img");
      if (img) img.addEventListener("error", () => {
        b.dataset.noimg = "true";
      });
      b.addEventListener("click", () => {
        const f = document.createElement("iframe");
        f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
        f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        f.title = b.dataset.title || "\u52D5\u753B";
        f.setAttribute("allowfullscreen", "");
        const box = document.createElement("div");
        box.className = "media-thumb is-playing";
        box.appendChild(f);
        b.replaceWith(box);
      });
    });
    root.querySelectorAll(".vframe[data-vimeo]").forEach((v) => {
      if (v.dataset.bound) return;
      v.dataset.bound = "1";
      const btn = v.querySelector(".movie-play");
      if (!btn) return;
      const play = (quiet) => {
        if (v.dataset.playing) return;
        const h = v.dataset.h ? `h=${v.dataset.h}&` : "";
        const f = document.createElement("iframe");
        f.src = `https://player.vimeo.com/video/${v.dataset.vimeo}?${h}autoplay=1&title=0&byline=0&portrait=0&dnt=1` + (quiet ? "&muted=1&loop=1" : "");
        f.allow = "autoplay; fullscreen; picture-in-picture";
        f.title = v.dataset.title || "\u6620\u50CF";
        f.setAttribute("allowfullscreen", "");
        v.appendChild(f);
        v.dataset.playing = "true";
      };
      btn.addEventListener("click", () => play(false));
      if (v.dataset.auto && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const check = () => {
          if (!v.isConnected || v.dataset.playing) {
            window.removeEventListener("scroll", check);
            return;
          }
          const r = v.getBoundingClientRect();
          const visible = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
          if (visible >= r.height * 0.4) {
            play(true);
            window.removeEventListener("scroll", check);
          }
        };
        window.addEventListener("scroll", check, { passive: true });
        check();
      }
    });
  }
  function initReserve(root) {
    const form = root.querySelector("#rsvForm");
    if (!form || form.dataset.bound) return;
    form.dataset.bound = "1";
    const done = root.querySelector("#rsvDone");
    const err = root.querySelector("#rsvError");
    const date = form.querySelector("#rsvDate");
    const pad = (n) => String(n).padStart(2, "0");
    const t = new Date();
    date.min = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
    const LABEL = {
      date: "\u3054\u5BBF\u6CCA\u306E\u65E5",
      adult: "\u5927\u4EBA",
      child: "\u304A\u5B50\u69D8",
      plan: "\u304A\u90E8\u5C4B\u3068\u304A\u98DF\u4E8B",
      name: "\u304A\u540D\u524D",
      tel: "\u304A\u96FB\u8A71\u756A\u53F7",
      mail: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
      note: "\u3054\u8981\u671B",
      pamphlet: "\u30D1\u30F3\u30D5\u30EC\u30C3\u30C8"
    };
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const bad = [...form.querySelectorAll("[required]")].filter((el) => !el.value.trim() || !el.checkValidity());
      form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
      if (bad.length) {
        bad.forEach((el) => el.setAttribute("aria-invalid", "true"));
        err.hidden = false;
        err.textContent = "\u5165\u529B\u3092\u304A\u78BA\u304B\u3081\u304F\u3060\u3055\u3044\uFF1A" + bad.map((el) => LABEL[el.name]).join("\u3001");
        bad[0].focus();
        return;
      }
      err.hidden = true;
      const d = new Date(date.value + "T00:00:00");
      const week = "\u65E5\u6708\u706B\u6C34\u6728\u91D1\u571F"[d.getDay()];
      const rows = [
        ["date", `${d.getFullYear()}\u5E74${d.getMonth() + 1}\u6708${d.getDate()}\u65E5\uFF08${week}\uFF09\u304B\u3089\u4E00\u6CCA`],
        ["adult", form.adult.value + "\u540D"],
        ["child", form.child.value === "\u306A\u3057" ? "\u306A\u3057" : form.child.value + "\u540D"],
        ["plan", form.plan.value],
        ["name", form.name.value + " \u69D8"],
        ["tel", form.tel.value],
        ["mail", form.mail.value],
        ["note", form.note.value || "\uFF08\u306A\u3057\uFF09"],
        ["pamphlet", form.pamphlet.checked ? "\u90F5\u9001\u3092\u5E0C\u671B\u3059\u308B" : "\u5E0C\u671B\u3057\u306A\u3044"]
      ];
      root.querySelector("#rsvSummary").innerHTML = rows.map(([k, v]) => `<div><dt>${LABEL[k]}</dt><dd>${esc(v)}</dd></div>`).join("") + (d.getDay() === 4 ? `<div><dt>\u3054\u78BA\u8A8D</dt><dd>\u6728\u66DC\u65E5\u306F\u5B9A\u4F11\u65E5\u3067\u3059\uFF08\u30B7\u30FC\u30BA\u30F3\u671F\u9593\u3068\u795D\u65E5\u3092\u9664\u304F\uFF09\u3002\u5BBF\u304B\u3089\u306E\u304A\u8FD4\u4E8B\u3067\u3054\u6848\u5185\u3057\u307E\u3059</dd></div>` : "");
      form.hidden = true;
      done.hidden = false;
      done.focus({ preventScroll: true });
      done.scrollIntoView({ block: "start", behavior: "smooth" });
    });
    root.querySelector("#rsvBack").addEventListener("click", () => {
      done.hidden = true;
      form.hidden = false;
      form.querySelector("#rsvDate").focus();
    });
  }
  let movieCleanup = null;
  function initMovie(root) {
    const frame = root.querySelector("#movieFrame");
    if (!frame) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = frame.querySelector("img");
    img.addEventListener("error", () => {
      frame.dataset.noimg = "true";
    });
    const embed = (id, sound) => {
      frame.querySelectorAll("iframe").forEach((f2) => f2.remove());
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${sound ? 0 : 1}&controls=${sound ? 1 : 0}&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1`;
      f.allow = "autoplay; encrypted-media; picture-in-picture";
      f.title = frame.dataset.title;
      f.setAttribute("allowfullscreen", "");
      frame.appendChild(f);
      frame.dataset.playing = sound ? "true" : "auto";
    };
    if (movieCleanup) {
      movieCleanup();
      movieCleanup = null;
    }
    if (!reduce) {
      const check = () => {
        if (frame.dataset.playing) return;
        const r = frame.getBoundingClientRect();
        const visible = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
        if (visible >= r.height * 0.4) {
          embed(frame.dataset.yt, false);
          movieCleanup && movieCleanup();
          movieCleanup = null;
        }
      };
      window.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check);
      movieCleanup = () => {
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      };
      check();
    }
    frame.querySelector(".movie-play").addEventListener("click", () => embed(frame.dataset.yt, true));
    root.querySelectorAll(".movie-list button").forEach((b) => b.addEventListener("click", () => {
      frame.dataset.yt = b.dataset.yt;
      frame.dataset.title = b.dataset.title;
      document.getElementById("movieTitle").textContent = b.dataset.title;
      const cap = root.querySelector(".movie-cap time");
      const t = b.querySelector("time");
      if (cap && t) {
        cap.textContent = t.textContent;
        cap.setAttribute("datetime", t.getAttribute("datetime"));
      }
      img.src = `https://i.ytimg.com/vi/${b.dataset.yt}/hqdefault.jpg`;
      embed(b.dataset.yt, true);
      frame.scrollIntoView({ block: "center", behavior: "smooth" });
    }));
  }
  let accCleanup = null;
  function initAccess(root) {
    if (accCleanup) {
      accCleanup();
      accCleanup = null;
    }
    const box = root.querySelector(".acc-scrolly");
    if (!box) return;
    const steps = [...box.querySelectorAll(".acc-step")];
    const sp = window.matchMedia("(max-width:720px)");
    let cur = null;
    const update = () => {
      const line = window.innerHeight * (sp.matches ? 0.75 : 0.5);
      let el = steps[0];
      for (const s of steps) if (s.getBoundingClientRect().top <= line) el = s;
      if (el === cur) return;
      cur = el;
      box.dataset.step = el.dataset.step;
      steps.forEach((s) => s.classList.toggle("is-active", s === el));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    accCleanup = () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }
  function paintMenu() {
    const trail = window.KB.crumbTrail(window.KB.current()).map((r) => r.path);
    document.querySelectorAll("[data-menu]").forEach((a) => {
      const m = MENU.find((x) => x.to === a.dataset.menu);
      const on = !!m && [m.to, ...m.sub].some((p) => trail.includes(p));
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const f = document.activeElement;
    if (f && f.closest && f.closest(".nav-sub")) f.blur();
  }
  function setBurgers(open) {
    document.querySelectorAll(".burger").forEach((b) => {
      b.setAttribute("aria-expanded", String(open));
      b.setAttribute("aria-label", open ? "\u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B" : "\u30E1\u30CB\u30E5\u30FC\u3092\u958B\u304F");
    });
  }
  function toggleDrawer() {
    const d = document.getElementById("drawer");
    const open = d.dataset.open !== "true";
    d.dataset.open = String(open);
    d.setAttribute("aria-hidden", String(!open));
    setBurgers(open);
    if (open) {
      document.getElementById("header").dataset.hide = "false";
    }
    document.body.style.overflow = open ? "hidden" : "";
    document.getElementById("bookFix").dataset.hidden = open ? "true" : String(footerVisible);
  }
  function closeDrawer() {
    const d = document.getElementById("drawer");
    d.dataset.open = "false";
    d.setAttribute("aria-hidden", "true");
    setBurgers(false);
    document.body.style.overflow = "";
    const bf = document.getElementById("bookFix");
    if (bf) bf.dataset.hidden = String(footerVisible);
  }
  function paintSeoBar(route) {
    const bar = document.getElementById("seoBar");
    if (sessionStorage.getItem("kb-seo") !== "1") {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;
    const trail = window.KB.crumbTrail(route).map((r) => r.label);
    bar.innerHTML = `<div class="seo-in">
      <p class="seo-note">\u30C7\u30E2\u7528\u306E\u8868\u793A\u3067\u3059\uFF08\u672C\u756A\u30B5\u30A4\u30C8\u306B\u306F\u51FA\u307E\u305B\u3093\uFF09</p>
      <dl>
        <div><dt>URL</dt><dd>${route.path}</dd></div>
        <div><dt>title</dt><dd>${route.title}</dd></div>
        <div><dt>description</dt><dd>${route.desc}</dd></div>
        <div><dt>\u72D9\u3046\u30AD\u30FC\u30EF\u30FC\u30C9</dt><dd class="seo-kw">${route.kw}</dd></div>
        <div><dt>\u968E\u5C64</dt><dd>${trail.join(" \uFF1E ")}</dd></div>
      </dl></div>`;
  }
  function syncLangLinks() {
    const cur = window.KB.current();
    const otherPath = LANG_PAIRS[cur.path] || (cur.lang === "en" ? "/" : "/en/");
    document.querySelectorAll(".lang").forEach((box) => {
      const jp = box.querySelector('a[data-lang="ja"]');
      const en = box.querySelector('a[data-lang="en"]');
      if (!jp || !en) return;
      if (cur.lang === "en") {
        en.setAttribute("href", "#" + cur.path);
        jp.setAttribute("href", "#" + otherPath);
        en.setAttribute("aria-current", "true");
        jp.removeAttribute("aria-current");
      } else {
        jp.setAttribute("href", "#" + cur.path);
        en.setAttribute("href", "#" + otherPath);
        jp.setAttribute("aria-current", "true");
        en.removeAttribute("aria-current");
      }
    });
  }
  window.KB = Object.assign(window.KB || {}, { buildChrome, closeDrawer, paintSeoBar, syncLangLinks, initAccess, initMovie, initMedia, initReserve, paintMenu });
})();
