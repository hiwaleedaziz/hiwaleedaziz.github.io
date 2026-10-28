/* Morphing header menu (desktop) + header that shrinks into a pill on scroll.
   Work, Experience and Contact open one glass panel that slides and reshapes between them.
   Content comes from SITE and your work list, so it updates itself when projects change. */
(() => {
  const nav = document.querySelector(".nav"), bar = nav && nav.querySelector(".wrap");
  if (!bar) return;
  const desk = matchMedia("(hover:hover) and (pointer:fine) and (min-width:861px)");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const css = `
  .nav .wrap{transition:max-width .6s cubic-bezier(.2,.8,.2,1),padding .6s cubic-bezier(.2,.8,.2,1),box-shadow .4s}
  @media (min-width:601px){
    .nav.compact .wrap{max-width:760px;padding:5px 5px 5px 18px;box-shadow:inset 0 1px 0 var(--glass-hi),0 18px 40px var(--glass-shade)}
    .nav.compact .brand{font-size:15px}
    .nav .brand{transition:font-size .5s}
  }
  .nav ul a.mm-on{color:var(--ink)}
  .nav ul a .mm-car{display:inline-block;width:9px;height:9px;margin-left:5px;vertical-align:1px;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
  .nav ul a.mm-on .mm-car{transform:rotate(180deg)}
  .mm{position:absolute;top:calc(100% + 12px);left:0;width:0;height:0;border-radius:26px;overflow:hidden;opacity:0;pointer-events:none;transform:translateY(-8px) scale(.98);transform-origin:top center;z-index:31;
    transition:opacity .25s ease,transform .35s cubic-bezier(.2,.8,.2,1),left .45s cubic-bezier(.2,.8,.2,1),width .45s cubic-bezier(.2,.8,.2,1),height .45s cubic-bezier(.2,.8,.2,1)}
  .mm.open{opacity:1;pointer-events:auto;transform:none}
  .mm-bg{position:absolute;inset:0;border-radius:inherit;border:1px solid var(--glass-rim);box-shadow:inset 0 1px 0 var(--glass-hi),0 20px 50px var(--glass-shade);
    background:linear-gradient(135deg,var(--glass-hi) -60%,transparent 38%),var(--paper)}
  .mm-p{position:absolute;top:0;left:0;padding:12px;opacity:0;pointer-events:none;transform:translateX(var(--from,0));transition:opacity .3s ease,transform .45s cubic-bezier(.2,.8,.2,1)}
  .mm-p.show{opacity:1;pointer-events:auto;transform:none}
  .mm-work{display:grid;grid-template-columns:260px 300px;gap:10px}
  .mm-cats{display:flex;flex-direction:column;gap:2px}
  .mm-cat{display:block;padding:11px 14px;border-radius:14px;text-decoration:none;color:var(--ink);transition:background .2s;cursor:pointer;border:0;background:none;text-align:left;font:inherit;width:100%}
  .mm-cat b{display:flex;align-items:center;justify-content:space-between;font:700 14px/1.2 var(--f)}
  .mm-cat b small{font:600 11px/1 var(--f);color:var(--muted)}
  .mm-cat span{display:block;margin-top:3px;font-size:12px;line-height:1.35;color:var(--muted)}
  .mm-cat.on,.mm-cat:hover,.mm-cat:focus-visible{background:color-mix(in oklab,var(--lime) 16%,transparent);outline:none}
  .mm-cat.be b{color:#1769FF}
  :root[data-theme="dark"] .mm-cat.be b{color:#5B8CFF}
  @media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .mm-cat.be b{color:#5B8CFF}}
  .mm-prev{position:relative;border-radius:18px;overflow:hidden;min-height:100%;background:var(--forest)}
  .mm-pv{position:absolute;inset:0;opacity:0;transform:scale(1.06);transition:opacity .45s ease,transform .8s cubic-bezier(.2,.8,.2,1);display:flex;flex-direction:column;justify-content:flex-end;padding:16px;color:#F2F7EC}
  .mm-pv.on{opacity:1;transform:none}
  .mm-pv img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .mm-pv::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7),transparent 55%)}
  .mm-pv b,.mm-pv span{position:relative;z-index:1}
  .mm-pv b{font:800 17px/1.15 var(--f);text-transform:uppercase}
  .mm-pv span{font-size:12px;opacity:.85;margin-top:4px}
  .mm-exp{display:grid;grid-template-columns:repeat(3,190px);gap:10px}
  .mm-card{position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:190px;padding:16px;border-radius:18px;overflow:hidden;text-decoration:none;color:#F2F7EC;background:linear-gradient(160deg,var(--forest-2),var(--forest))}
  .mm-card::before{content:"";position:absolute;inset:0;background:radial-gradient(70% 60% at 85% 0%,rgba(201,224,143,.35),transparent 70%)}
  .mm-card > *{position:relative;z-index:1}
  .mm-card .big{font:800 40px/1 var(--f);color:var(--lime)}
  .mm-card b{font:700 14px/1.25 var(--f)}
  .mm-card span{font-size:12px;color:#C9D8CC;margin-top:4px}
  .mm-card.mm-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 20%;z-index:0}
  .mm-card.mm-photo::before{background:linear-gradient(to top,rgba(4,14,8,.92),transparent 60%)}
  .mm-card .now{align-self:flex-start;margin:0 0 8px;color:var(--lime-ink)}
  .mm-card:hover{filter:brightness(1.06)}
  .mm-con{display:grid;grid-template-columns:repeat(3,180px);gap:10px}
  .mm-cc{display:flex;flex-direction:column;gap:10px;padding:16px;border-radius:18px;text-decoration:none;color:var(--ink);background:color-mix(in oklab,var(--ink) 5%,transparent);border:1px solid color-mix(in oklab,var(--ink) 10%,transparent);transition:background .2s,transform .2s;cursor:pointer;font:inherit;text-align:left}
  .mm-cc:hover,.mm-cc:focus-visible{background:color-mix(in oklab,var(--lime) 14%,transparent);transform:translateY(-2px);outline:none}
  .mm-cc .ic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font:900 15px/1 Arial,sans-serif}
  .mm-cc b{font:700 14px/1.2 var(--f)}
  .mm-cc span{font-size:12px;color:var(--muted);overflow-wrap:anywhere}
  @media (prefers-reduced-motion:reduce){.mm,.mm-p,.mm-pv,.nav .wrap{transition:none!important}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* shrink the header into a pill after scrolling a little (desktop and tablet; phones are already compact) */
  const onScroll = () => nav.classList.toggle("compact", scrollY > 60);
  addEventListener("scroll", onScroll, { passive:true }); onScroll();

  /* ---- morphing menu ---- */
  const links = [...bar.querySelectorAll("ul a")];
  const trig = {
    work: links.find(a => a.getAttribute("href") === "#work"),
    exp: links.find(a => a.getAttribute("href") === "#experience"),
    contact: links.find(a => a.getAttribute("href") === "#contact")
  };
  if (!trig.work || !trig.exp || !trig.contact) return;
  const caret = '<svg class="mm-car" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  trig.work.insertAdjacentHTML("beforeend", caret);
  trig.exp.insertAdjacentHTML("beforeend", caret);

  const mm = document.createElement("div");
  mm.className = "mm"; mm.setAttribute("aria-label", "Menu");
  mm.innerHTML = `<div class="mm-bg"></div><div class="mm-p" data-p="work"></div><div class="mm-p" data-p="exp"></div><div class="mm-p" data-p="contact"></div>`;
  bar.appendChild(mm);
  const P = { work: mm.querySelector('[data-p="work"]'), exp: mm.querySelector('[data-p="exp"]'), contact: mm.querySelector('[data-p="contact"]') };
  const order = ["work", "exp", "contact"];

  const BLURB = {
    "Behance": "Full case studies on Behance",
    "Social Media": "Posts, carousels and festive campaigns",
    "Motion Graphics": "Animated ads, titles and explainers",
    "Video Editing": "Promos, reels and event films",
    "Graphic Design": "Branding, statics and key visuals",
    "Photo Manipulation": "Composites and surreal edits",
    "Thumbnails": "YouTube thumbnails that get clicks",
    "Brand Identity": "Logos and brand systems",
    "Video Ads": "Ads built to convert"
  };

  function buildWork(){
    const items = typeof ITEMS !== "undefined" ? ITEMS : [];
    const cats = [...(items.some(isBe) ? ["Behance"] : []), ...new Set(items.map(i => i.category).filter(c => c && c !== "Behance"))];
    const pick = c => items.filter(i => match(i, c)).find(i => cover(i, media(i))) || items.find(i => match(i, c));
    P.work.innerHTML = `<div class="mm-work"><div class="mm-cats">${cats.map((c, i) => {
      const n = items.filter(x => match(x, c)).length;
      return `<button type="button" class="mm-cat${c === "Behance" ? " be" : ""}${i === 0 ? " on" : ""}" data-cat="${esc(c)}" data-i="${i}"><b>${c === "Behance" ? "Bē Behance" : esc(c)} <small>${n}</small></b><span>${esc(BLURB[c] || "See the projects")}</span></button>`;
    }).join("")}</div><div class="mm-prev">${cats.map((c, i) => {
      const it = pick(c); const src = it ? cover(it, media(it)) : "";
      return `<div class="mm-pv${i === 0 ? " on" : ""}">${src ? `<img alt="" loading="lazy" src="${esc(src)}">` : ""}<b>${esc(c)}</b><span>${esc(it ? it.title : "")}</span></div>`;
    }).join("")}</div></div>`;
    const btns = [...P.work.querySelectorAll(".mm-cat")], pvs = [...P.work.querySelectorAll(".mm-pv")];
    const show = b => { btns.forEach(x => x.classList.toggle("on", x === b)); pvs.forEach((p, i) => p.classList.toggle("on", i === +b.dataset.i)); };
    btns.forEach(b => {
      b.addEventListener("mouseenter", () => show(b));
      b.addEventListener("focus", () => show(b));
      b.addEventListener("click", () => {
        try { active = b.dataset.cat; renderFilters(); renderWall(); } catch(_){}
        close(true);
        document.getElementById("work")?.scrollIntoView({ behavior:"smooth" });
      });
    });
  }

  function buildExp(){
    const S = typeof SITE !== "undefined" ? SITE : {};
    const isNow = y => !y || /present|now|current/i.test(y);
    const cur = (S.experience || []).find(j => isNow(j.years)) || (S.experience || [])[0] || {};
    const f = S.facts || [];
    P.exp.innerHTML = `<div class="mm-exp">
      <a class="mm-card mm-photo" href="#top">${S.photo ? `<img alt="" src="${S.photo}">` : ""}<b>About ${esc((S.name || "").split(" ")[0])}</b><span>${esc((S.role || []).join(" & "))}, ${esc((S.location || "").split(",")[0])}</span></a>
      <a class="mm-card" href="#experience"><span class="now">Current</span><b>${esc(cur.company)}</b><span>${esc(cur.title)} · ${esc(cur.years)}</span></a>
      <a class="mm-card" href="#experience"><div class="big">${esc((f[0] || [])[0] || "")}</div><b>Years of experience</b><span>${esc(f.slice(1).map(x => x[0] + " " + x[1].toLowerCase()).join(" · "))}</span></a>
    </div>`;
    P.exp.querySelectorAll("a").forEach(a => a.addEventListener("click", () => close(true)));
  }

  function buildContact(){
    const S = typeof SITE !== "undefined" ? SITE : {};
    const be = (S.socials || []).find(s => /behance/i.test(s.label)) || { url: S.behance };
    P.contact.innerHTML = `<div class="mm-con">
      ${S.whatsapp ? `<a class="mm-cc" href="https://wa.me/${esc(S.whatsapp)}" target="_blank" rel="noopener"><span class="ic" style="background:#25D366;color:#06301A">WA</span><b>WhatsApp</b><span>${esc(S.phone)}</span></a>` : ""}
      ${S.email ? `<button type="button" class="mm-cc" data-mail><span class="ic" style="background:var(--lime);color:var(--lime-ink)">@</span><b>Email</b><span>${esc(S.email)}</span></button>` : ""}
      ${be && be.url ? `<a class="mm-cc" href="${esc(be.url)}" target="_blank" rel="noopener"><span class="ic" style="background:#1769FF;color:#fff">Bē</span><b>Behance</b><span>${esc(be.url.replace(/^https?:\/\/(www\.)?/, ""))}</span></a>` : ""}
    </div>`;
    const m = P.contact.querySelector("[data-mail]");
    if (m) m.addEventListener("click", () => {
      const lab = m.querySelector("b");
      try { navigator.clipboard.writeText(S.email).then(() => { lab.textContent = "Email copied"; setTimeout(() => lab.textContent = "Email", 1600); }, () => {}); } catch(_){}
    });
  }

  let current = null, closeT = null, built = false;
  function build(){ if (built) return; built = true; buildWork(); buildExp(); buildContact(); }

  function open(name){
    if (!desk.matches) return;
    build(); clearTimeout(closeT);
    const t = trig[name], p = P[name], prev = current; current = name;
    Object.entries(trig).forEach(([k, a]) => a.classList.toggle("mm-on", k === name));
    Object.entries(P).forEach(([k, el]) => {
      if (k === name){ el.style.setProperty("--from", prev && prev !== name ? (order.indexOf(name) > order.indexOf(prev) ? "40px" : "-40px") : "0px"); void el.offsetWidth; el.classList.add("show"); }
      else { el.style.setProperty("--from", order.indexOf(k) < order.indexOf(name) ? "-40px" : "40px"); el.classList.remove("show"); }
    });
    const w = p.offsetWidth, h = p.offsetHeight, br = bar.getBoundingClientRect(), tr = t.getBoundingClientRect();
    let left = tr.left + tr.width / 2 - br.left - w / 2;
    left = Math.max(16 - br.left, Math.min(left, innerWidth - 16 - br.left - w));
    const wasOpen = mm.classList.contains("open");
    if (!wasOpen) mm.style.transition = "opacity .25s ease, transform .35s cubic-bezier(.2,.8,.2,1)";
    mm.style.left = left + "px"; mm.style.width = w + "px"; mm.style.height = h + "px";
    void mm.offsetWidth; mm.style.transition = ""; mm.classList.add("open");
  }
  function close(now){
    clearTimeout(closeT);
    const go = () => { mm.classList.remove("open"); Object.values(trig).forEach(a => a.classList.remove("mm-on")); Object.values(P).forEach(el => el.classList.remove("show")); current = null; };
    now ? go() : (closeT = setTimeout(go, 160));
  }

  Object.entries(trig).forEach(([k, a]) => {
    a.addEventListener("mouseenter", () => open(k));
    a.addEventListener("focus", () => open(k));
  });
  links.filter(a => !Object.values(trig).includes(a)).forEach(a => a.addEventListener("mouseenter", () => close()));
  bar.addEventListener("mouseleave", () => close());
  mm.addEventListener("mouseenter", () => clearTimeout(closeT));
  addEventListener("keydown", e => { if (e.key === "Escape") close(true); });
  addEventListener("scroll", () => { if (current) open(current); }, { passive:true });
  addEventListener("resize", () => { if (!desk.matches) close(true); else if (current) open(current); });
})();
