/* Breeze cursor: soft green wind streaks trail the mouse (light strength).
   Desktop only, off for visitors who prefer reduced motion. Remove the <script src="breeze.js"> tag to turn it off. */
(() => {
  if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const LEVEL = .55;                       // light breeze
  const cv = document.createElement("canvas");
  cv.setAttribute("aria-hidden", "true");
  cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:25";
  document.body.appendChild(cv);
  const ctx = cv.getContext("2d");
  let W = 0, H = 0;
  function size(){ const d = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  size(); addEventListener("resize", size);

  /* streak colour follows the site theme: pale lime on dark, deeper green on light */
  let rgb = "214,236,170";
  function theme(){
    const t = document.documentElement.dataset.theme;
    const dark = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    rgb = dark ? "214,236,170" : "96,150,52";
  }
  theme();
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", theme);
  new MutationObserver(theme).observe(document.documentElement, { attributes:true, attributeFilter:["data-theme"] });

  const target = { x: W / 2, y: H / 2 }, e = { x: W / 2, y: H / 2, vx: 0, vy: 0 };
  const streaks = [], specks = [];
  let running = false, prev = 0, quiet = 0;

  addEventListener("pointermove", ev => {
    if (ev.pointerType !== "mouse") return;
    target.x = ev.clientX; target.y = ev.clientY;
    if (!running){ e.x = target.x; e.y = target.y; e.vx = e.vy = 0; running = true; prev = performance.now(); requestAnimationFrame(frame); }
    quiet = 0;
  }, { passive:true });
  document.addEventListener("mouseleave", () => { quiet = 999; });

  function spawnStreak(speed){
    const ang = Math.atan2(e.vy, e.vx) + Math.PI + (Math.random() - .5) * .6;
    streaks.push({ x: e.x + (Math.random() - .5) * 18, y: e.y + (Math.random() - .5) * 18, ang, len: 26 + speed * 3 + Math.random() * 30,
      curve: (Math.random() - .5) * .9, life: 0, max: 50 + Math.random() * 30, w: .8 + Math.random() * 1.4, drift: .4 + Math.random() * .8 });
  }
  function spawnSpeck(){
    specks.push({ x: e.x, y: e.y, vx: -e.vx * .15 + (Math.random() - .5) * 1.2, vy: -e.vy * .15 + (Math.random() - .5) * 1.2 - .3, life: 0, max: 60 + Math.random() * 40, r: .8 + Math.random() * 1.6 });
  }

  function frame(now){
    const dt = Math.min(2, (now - prev) / 16.67); prev = now;
    e.vx += (target.x - e.x) * .055 * dt; e.vy += (target.y - e.y) * .055 * dt;
    e.vx *= Math.pow(.86, dt); e.vy *= Math.pow(.86, dt);
    e.x += e.vx * dt; e.y += e.vy * dt;
    const speed = Math.hypot(e.vx, e.vy);
    quiet += speed < .3 ? dt : 0;

    if (!document.hidden && quiet < 240){
      if (speed > 1 && Math.random() < Math.min(.85, speed * .05 * LEVEL)) spawnStreak(speed);
      if (Math.random() < (.03 + speed * .008) * LEVEL) spawnSpeck();
    }

    ctx.clearRect(0, 0, W, H);
    for (let i = streaks.length - 1; i >= 0; i--){
      const s = streaks[i]; s.life += dt;
      const p = s.life / s.max; if (p >= 1){ streaks.splice(i, 1); continue; }
      const a = Math.sin(p * Math.PI) * .42;
      s.x += Math.cos(s.ang) * s.drift * dt; s.y += Math.sin(s.ang) * s.drift * dt;
      const ex = s.x + Math.cos(s.ang) * s.len, ey = s.y + Math.sin(s.ang) * s.len;
      const cx = (s.x + ex) / 2 + Math.cos(s.ang + Math.PI / 2) * s.len * s.curve, cy = (s.y + ey) / 2 + Math.sin(s.ang + Math.PI / 2) * s.len * s.curve;
      const g = ctx.createLinearGradient(s.x, s.y, ex, ey);
      g.addColorStop(0, `rgba(${rgb},0)`); g.addColorStop(.5, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.strokeStyle = g; ctx.lineWidth = s.w; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.quadraticCurveTo(cx, cy, ex, ey); ctx.stroke();
    }
    for (let i = specks.length - 1; i >= 0; i--){
      const s = specks[i]; s.life += dt;
      const p = s.life / s.max; if (p >= 1){ specks.splice(i, 1); continue; }
      s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= .98; s.vy = s.vy * .98 - .01;
      ctx.fillStyle = `rgba(${rgb},${(1 - p) * .7})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }

    /* sleep when the mouse has rested and the last streak has faded, to save battery */
    if (quiet >= 240 && !streaks.length && !specks.length){ running = false; ctx.clearRect(0, 0, W, H); return; }
    requestAnimationFrame(frame);
  }
})();
