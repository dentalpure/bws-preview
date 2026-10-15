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
  const snsHTML = () => SNS.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}（新しいタブで開きます）">${n}</a>`).join("");
  const LOGO = `
    <svg viewBox="0 0 56 150" aria-hidden="true">
      <text x="28" y="44" text-anchor="middle" font-family="Noto Serif JP, Hiragino Mincho ProN, serif" font-size="42" fill="currentColor">兜</text>
      <circle cx="46" cy="50" r="3.2" fill="#e72420"/>
      <text x="28" y="72" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="8.5" letter-spacing="1.6" fill="currentColor">KABUTOYA</text>
      <text x="28" y="84" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="8.5" letter-spacing="1.6" fill="currentColor">RYOKAN</text>
      <line x1="16" y1="94" x2="40" y2="94" stroke="currentColor" stroke-width=".6"/>
      <text x="28" y="108" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="6.5" letter-spacing="1.2" fill="currentColor">THE THATCHED</text>
      <text x="28" y="118" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="6.5" letter-spacing="1.2" fill="currentColor">INN · TOKYO</text>
    </svg>`;
  const burgerHTML = (id) => `<button class="burger" type="button" id="${id}" aria-label="メニューを開く" aria-expanded="false" aria-controls="drawer">
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
      <a class="side-logo" href="#/" aria-label="兜家旅館 トップへ">${LOGO}</a>
      ${burgerHTML("burgerSide")}
      <p class="side-txt">KAZUMA · HINOHARA · TOKYO</p>`;
    document.getElementById("header").innerHTML = `
      <a class="brand" href="#/" aria-label="兜家旅館 トップへ">
        <svg viewBox="0 0 40 40" aria-hidden="true"><text x="20" y="32" text-anchor="middle" font-family="Noto Serif JP, Hiragino Mincho ProN, serif" font-size="32" fill="currentColor">兜</text><circle cx="35" cy="35" r="2.6" fill="#e72420"/></svg>
        <span>兜家旅館</span>
      </a>
      <div class="header-right">
      <nav class="nav" aria-label="メインナビゲーション">${nav}</nav>
      <p class="lang"><a href="#/" data-lang="ja">JP</a><span>/</span><a href="#/en/" hreflang="en" data-lang="en">EN</a></p>
      <a class="btn" href="#/reserve/">ご予約</a>
      <button class="seo-toggle" type="button" id="seoToggle" aria-pressed="false"
              title="このページのSEO設定を表示">SEO</button>
      ${burgerHTML("burgerTop")}
      </div>`;
    document.getElementById("drawer").innerHTML = `
      <button class="drawer-close" type="button" id="drawerClose" aria-label="メニューを閉じる">CLOSE</button>
      <div class="drawer-in">
        <ol>${MENU.map((m, i) => `<li><a href="#${m.to}"><i>${String(i + 1).padStart(2, "0")}</i>${nameOf(m.to, m.name)}</a>${m.sub.length ? `<p class="drawer-sub">${m.sub.map((p) => `<a href="#${p}">${nameOf(p)}</a>`).join("")}</p>` : ""}</li>`).join("")}
        </ol>
        <p class="drawer-extra"><a href="#/news/">お知らせ</a><a href="#/shop/">お買いもの</a></p>
        <div class="drawer-actions">
          <a class="btn" href="#/reserve/">ご予約フォームへ</a>
          <a class="btn drawer-tel" href="tel:0425986136">042-598-6136 に電話する<small>受付時間内にお願いいたします</small></a>
        </div>
        <p class="sns sns--drawer">${snsHTML()}</p>
        <p class="lang"><a href="#/" data-lang="ja">JAPANESE</a><span>/</span><a href="#/en/" hreflang="en" data-lang="en">ENGLISH</a></p>
      </div>`;
    document.getElementById("footer").innerHTML = `
      <div class="footer-in">
        <div class="footer-brand">
          <p class="footer-name">KABUTOYA RYOKAN<span>兜家旅館</span></p>
          <p class="footer-addr">〒190-0221<br>東京都西多摩郡檜原村数馬 2612</p>
          <p class="footer-tel"><a class="tel" href="tel:0425986136">${TEL}</a></p>
          <p class="footer-contact">FAX 042-598-6741<br><a href="mailto:info@kabutoya.net">info@kabutoya.net</a></p>
          <p class="footer-hours">チェックイン 15:00 ／ ご出発 10:00<br>定休日 木曜（シーズン期間と祝日を除く）</p>
          <p class="footer-cta"><a class="btn" href="#/reserve/">ご予約フォームへ</a></p>
        </div>
        <nav class="footer-cols" aria-label="フッターナビゲーション">
          ${FOOTER.map((g) => `
          <div>
            <h2 class="footer-head"><span>${g.en}</span>${g.head}</h2>
            <ul>${g.links.map((p) => `<li><a href="#${p}">${nameOf(p)}</a></li>`).join("")}</ul>
          </div>`).join("")}
        </nav>
      </div>
      <div class="footer-sub"><div class="footer-sub-in">
        <p class="sns">${snsHTML()}</p>
        <p class="lang"><a href="#/" data-lang="ja">日本語</a><span>/</span><a href="#/en/" hreflang="en" data-lang="en">English</a></p>
      </div></div>
      <div class="footer-bottom"><div class="footer-bottom-in">
        <p>© Kabutoya Ryokan. All rights reserved.</p>
        <a class="top" href="#top" id="pageTop">PAGE TOP</a>
      </div></div>`;
    document.getElementById("bookFix").innerHTML = `
      <strong>予約する</strong><small>公式サイトがいちばんお得</small>`;
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
        f.title = b.dataset.title || "動画";
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
        f.title = v.dataset.title || "映像";
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
      date: "ご宿泊の日",
      adult: "大人",
      child: "お子様",
      plan: "お部屋とお食事",
      name: "お名前",
      tel: "お電話番号",
      mail: "メールアドレス",
      note: "ご要望",
      pamphlet: "パンフレット"
    };
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const bad = [...form.querySelectorAll("[required]")].filter((el) => !el.value.trim() || !el.checkValidity());
      form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
      if (bad.length) {
        bad.forEach((el) => el.setAttribute("aria-invalid", "true"));
        err.hidden = false;
        err.textContent = "入力をお確かめください：" + bad.map((el) => LABEL[el.name]).join("、");
        bad[0].focus();
        return;
      }
      err.hidden = true;
      const d = new Date(date.value + "T00:00:00");
      const week = "日月火水木金土"[d.getDay()];
      const rows = [
        ["date", `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${week}）から一泊`],
        ["adult", form.adult.value + "名"],
        ["child", form.child.value === "なし" ? "なし" : form.child.value + "名"],
        ["plan", form.plan.value],
        ["name", form.name.value + " 様"],
        ["tel", form.tel.value],
        ["mail", form.mail.value],
        ["note", form.note.value || "（なし）"],
        ["pamphlet", form.pamphlet.checked ? "郵送を希望する" : "希望しない"]
      ];
      root.querySelector("#rsvSummary").innerHTML = rows.map(([k, v]) => `<div><dt>${LABEL[k]}</dt><dd>${esc(v)}</dd></div>`).join("") + (d.getDay() === 4 ? `<div><dt>ご確認</dt><dd>木曜日は定休日です（シーズン期間と祝日を除く）。宿からのお返事でご案内します</dd></div>` : "");
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
      b.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
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
      <p class="seo-note">デモ用の表示です（本番サイトには出ません）</p>
      <dl>
        <div><dt>URL</dt><dd>${route.path}</dd></div>
        <div><dt>title</dt><dd>${route.title}</dd></div>
        <div><dt>description</dt><dd>${route.desc}</dd></div>
        <div><dt>狙うキーワード</dt><dd class="seo-kw">${route.kw}</dd></div>
        <div><dt>階層</dt><dd>${trail.join(" ＞ ")}</dd></div>
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
