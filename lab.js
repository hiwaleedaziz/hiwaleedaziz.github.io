/* LAB: experiments layered on top of the site. Remove the <script src="lab.js"> tag to turn all of it off.
   1 opening slate · 2 photo focus-pull + glass boxes + "I make" roller · 3 scroll timeline
   4 bigger card hover · 5 colour playground · 8 upgraded contact */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const q = (s, r = document) => r.querySelector(s);
  const S = (typeof SITE !== "undefined" && SITE) || {};
  const css = `
  /* ---------- 1 opening slate ---------- */
  .lab-slate{position:fixed;inset:0;z-index:200;background:#06130C;color:#E8F0E3;display:grid;place-items:center;font-family:var(--f,system-ui);transition:opacity .26s ease,transform .26s ease;cursor:pointer}
  .lab-slate.out{opacity:0;transform:scale(1.05);pointer-events:none}
  .lab-slate .c{position:absolute;width:28px;height:28px;border:2px solid #C9E08F}
  .lab-slate .c1{top:26px;left:26px;border-right:0;border-bottom:0}.lab-slate .c2{top:26px;right:26px;border-left:0;border-bottom:0}
  .lab-slate .c3{bottom:26px;left:26px;border-right:0;border-top:0}.lab-slate .c4{bottom:26px;right:26px;border-left:0;border-top:0}
  .lab-slate .rec{position:absolute;top:44px;left:66px;display:flex;align-items:center;gap:7px;font:700 12px/1 var(--f,system-ui);letter-spacing:.12em}
  .lab-slate .rec i{width:9px;height:9px;border-radius:50%;background:#FF5A4D;animation:labBlink .5s steps(2) infinite}
  .lab-slate .take{position:absolute;top:44px;right:66px;font:600 12px/1 var(--f,system-ui);letter-spacing:.12em;color:#9BAFA1}
  .lab-slate .mid{display:grid;justify-items:center;gap:22px;padding:0 20px}
  .lab-slate .tc{font:800 clamp(56px,13vw,120px)/1 var(--f,system-ui);color:#C9E08F;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
  .lab-slate .tc b{display:inline-block;font-weight:800}
  .lab-slate .tc b.tick{animation:labTick .28s cubic-bezier(.2,.9,.3,1.2)}
  .lab-slate .info{display:grid;grid-template-columns:repeat(3,auto);border:1px solid #1D3527;border-radius:12px;background:#0E2118;overflow:hidden}
  .lab-slate .info div{padding:11px 18px;border-right:1px solid #1D3527}.lab-slate .info div:last-child{border:0}
  .lab-slate .info small{display:block;font:600 10px/1.4 var(--f,system-ui);letter-spacing:.12em;color:#9BAFA1}
  .lab-slate .info span{font:700 14px/1.3 var(--f,system-ui)}
  .lab-slate .bar{position:absolute;left:66px;right:66px;bottom:46px;height:4px;border-radius:4px;background:#1D3527;overflow:hidden}
  .lab-slate .bar i{display:block;height:100%;background:#C9E08F;transform-origin:left;animation:labBar .95s linear both}
  @keyframes labBlink{50%{opacity:.2}}
  @keyframes labTick{from{transform:translateY(-38%);opacity:0}to{transform:none;opacity:1}}
  @keyframes labBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @media (max-width:560px){.lab-slate .info{grid-template-columns:1fr}.lab-slate .info div{border-right:0;border-bottom:1px solid #1D3527;padding:8px 16px}.lab-slate .rec{left:44px}.lab-slate .take{right:44px}.lab-slate .bar{left:44px;right:44px}}

  /* ---------- 2 hero: photo slides up out of focus, then the lens locks ---------- */
  body.lab-wait #pic img{transform:translateY(105%)}
  body.lab-go #pic img{animation:labPull 1.5s cubic-bezier(.2,.75,.2,1) both}
  @keyframes labPull{0%{transform:translateY(105%) scale(1.1);filter:blur(22px)}42%{transform:translateY(0) scale(1.1);filter:blur(22px)}68%{transform:scale(1.03);filter:blur(0)}80%{transform:scale(1.015);filter:blur(5px)}100%{transform:none;filter:blur(0)}}
  .lab-af{position:absolute;left:50%;top:38%;width:74px;height:74px;margin:-37px 0 0 -37px;pointer-events:none;opacity:0;z-index:2}
  .lab-af::before,.lab-af::after{content:"";position:absolute;inset:0;border:2px solid #fff;border-radius:4px;clip-path:polygon(0 0,28% 0,28% 8%,8% 8%,8% 28%,0 28%,0 72%,8% 72%,8% 92%,28% 92%,28% 100%,0 100%,0 0,100% 0,100% 28%,92% 28%,92% 8%,72% 8%,72% 0,100% 0,100% 100%,72% 100%,72% 92%,92% 92%,92% 72%,100% 72%,100% 100%,0 100%)}
  .lab-af::after{inset:auto;left:50%;top:50%;width:6px;height:6px;margin:-3px;border:0;border-radius:50%;background:#fff;clip-path:none}
  body.lab-go .lab-af{animation:labAf 1.5s ease both}
  @keyframes labAf{0%,38%{opacity:0;transform:scale(1.5)}50%{opacity:1;transform:scale(1.15);filter:none}68%{opacity:1;transform:scale(1)}80%{opacity:1;transform:scale(1.06)}90%{opacity:1;transform:scale(1);filter:drop-shadow(0 0 6px #7CFF8A) hue-rotate(0)}100%{opacity:0;transform:scale(1)}}
  body.lab-go .lab-af.lock::before{border-color:#7CFF8A}body.lab-go .lab-af.lock::after{background:#7CFF8A}
  /* the two green boxes: see-through glass with a soft blur */
  .photo::before,.photo::after{background:linear-gradient(140deg,color-mix(in oklab,var(--lime) 62%,transparent),color-mix(in oklab,#3E8A45 46%,transparent))!important;-webkit-backdrop-filter:blur(9px) saturate(140%);backdrop-filter:blur(9px) saturate(140%);border:1px solid rgba(255,255,255,.34);box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 10px 24px rgba(13,59,36,.22)!important}
  /* "I make ___" roller */
  .lab-make{display:flex;align-items:center;gap:12px;margin:0 0 22px;font:700 clamp(18px,2vw,24px)/1 var(--f);color:var(--ink)}
  .lab-roll{display:inline-block;height:1.9em;overflow:hidden;vertical-align:middle;border-radius:.5em;background:var(--lime);color:var(--lime-ink);box-sizing:border-box;transition:width .55s cubic-bezier(.3,1.25,.4,1)}
  .lab-col{display:flex;flex-direction:column;align-items:flex-start;transition:transform .6s cubic-bezier(.25,1.35,.45,1)}
  .lab-col.snap{transition:none}
  .lab-col span{flex:none;height:1.9em;display:inline-flex;align-items:center;padding:0 .7em;white-space:nowrap;box-sizing:border-box;opacity:0;transition:opacity .45s}
  .lab-col span.on{opacity:1}
  footer a[href="#top"]{display:none}
  .cta-wrap{display:none!important}
  .ctas:not(:has(> :not(.cta-wrap):not([hidden]))){display:none}
  body.lab-focus .photo-wrap{position:relative;z-index:46}
  body.lab-focus .dim{opacity:1;background:radial-gradient(circle at var(--cx,50%) var(--cy,50%),transparent 0,transparent 150px,rgba(2,8,5,.55) 330px,rgba(2,8,5,.88) 720px)}
  .lab-glow,.lab-glow::after{content:"";position:absolute;inset:-7px;border-radius:34px;pointer-events:none;opacity:0;background:conic-gradient(from var(--spin),#ff2e63,#ff9f1c,#ffe14d,#5dff6a,#22e4ff,#4d6bff,#b44dff,#ff2e63);animation:spin 2.4s linear infinite;transition:opacity .45s ease}
  .lab-glow{filter:blur(12px)}
  .lab-glow::after{inset:-22px;filter:blur(40px)}
  body.lab-focus .lab-glow,body.lab-focus .lab-glow::after{opacity:1}
  body.lab-focus .lab-glow::after{opacity:.75}
  @media (prefers-reduced-motion:reduce){.lab-glow,.lab-glow::after{animation:none}}
  .role{margin-bottom:14px!important}
  @media (max-width:600px){.lab-make{justify-content:center}}

  /* ---------- 3 scroll timeline ---------- */
  .lab-tl{position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:28;width:min(700px,calc(100vw - 330px));transform:translate(-50%,130%);opacity:0;transform-origin:50% 100%;transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .4s,box-shadow .4s,width .7s cubic-bezier(.3,1.35,.35,1),height .6s cubic-bezier(.3,1.35,.35,1),border-radius .5s ease;height:70px;box-sizing:border-box;padding:9px 14px 10px;border-radius:18px;font-family:var(--f);color:var(--ink);background:linear-gradient(135deg,var(--glass-hi,rgba(255,255,255,.6)) -60%,transparent 45%),color-mix(in oklab,var(--paper) 80%,transparent);-webkit-backdrop-filter:blur(18px) saturate(170%);backdrop-filter:blur(18px) saturate(170%);border:1px solid var(--glass-rim,rgba(255,255,255,.4));box-shadow:0 12px 34px rgba(0,0,0,.22)}
  .lab-tl.show{transform:translate(-50%,0);opacity:1}
  .lab-tl.show:hover{transform:translate(-50%,-4px) scale(1.07);box-shadow:0 2px 4px rgba(0,0,0,.1),0 14px 26px -6px rgba(0,0,0,.24),0 34px 50px -18px rgba(0,0,0,.3)}
  .lab-tl::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(to right,transparent,rgba(255,255,255,.16),transparent) no-repeat;background-size:55% 100%;background-position:-140% 0;transition:background-position 1s ease}
  .lab-tl:hover::after{background-position:260% 0}
  .lab-tl .in{transition:opacity .28s ease,filter .35s ease,transform .5s cubic-bezier(.3,1.3,.4,1)}
  .lab-tl .totop{all:unset;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:9px;font:700 14px/1 var(--f);color:var(--ink);cursor:pointer;border-radius:inherit;opacity:0;filter:blur(8px);transform:scale(.8);pointer-events:none;transition:opacity .3s ease,filter .4s ease,transform .6s cubic-bezier(.3,1.4,.4,1)}
  .lab-tl .totop svg{width:16px;height:16px;transition:transform .35s cubic-bezier(.3,1.4,.4,1)}
  .lab-tl .totop:hover svg{transform:translateY(-3px)}
  .lab-tl .totop:focus-visible{outline:2px solid var(--lime-strong);outline-offset:3px}
  .lab-tl.end{width:178px;height:50px;border-radius:25px}
  .lab-tl.end .in{opacity:0;filter:blur(8px);transform:scale(.86);pointer-events:none}
  .lab-tl.end .totop{opacity:1;filter:none;transform:none;pointer-events:auto;transition-delay:.12s}
  .lab-tl.scrub .head{transition:none}.lab-tl .head{transition:left .12s linear}
  .lab-tl .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
  .lab-tl .tc{font:700 13px/1 var(--f);font-variant-numeric:tabular-nums;color:var(--lime-strong)}
  .lab-tl .hint{font:500 10.5px/1 var(--f);color:var(--muted)}
  .lab-tl .track{position:relative;padding-top:9px}
  .lab-tl .ruler{position:absolute;left:0;right:0;top:0;height:6px;opacity:.45;background:repeating-linear-gradient(90deg,var(--muted) 0 1px,transparent 1px 2.5%)}
  .lab-tl .clips{display:flex;gap:4px}
  .lab-tl .clip{all:unset;box-sizing:border-box;min-width:0;height:26px;border-radius:7px;padding:0 9px;display:flex;align-items:center;font:700 10.5px/1 var(--f);cursor:pointer;color:var(--muted);background:color-mix(in oklab,var(--ink) 7%,transparent);border:1px solid color-mix(in oklab,var(--ink) 12%,transparent);overflow:hidden;white-space:nowrap;transition:background .25s,color .25s,border-color .25s}
  .lab-tl .clip:hover{color:var(--ink);border-color:var(--lime-strong)}
  .lab-tl .clip.on{background:var(--lime);color:var(--lime-ink);border-color:var(--lime)}
  .lab-tl .clip:focus-visible{outline:2px solid var(--lime-strong);outline-offset:2px}
  .lab-tl .head{position:absolute;top:-2px;bottom:-4px;width:2px;margin-left:-1px;background:#FF5A4D;border-radius:2px;pointer-events:none;will-change:left}
  .lab-tl .head::before{content:"";position:absolute;left:-5px;top:-3px;width:12px;height:9px;background:#FF5A4D;border-radius:2px 2px 6px 6px}
  @media (max-width:860px){.lab-tl{display:none}}

  /* ---------- 4 work cards: lift a little more, natural shadow ---------- */
  @media (hover:hover) and (pointer:fine){
    .wall .card{transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .35s ease;position:relative}
    .wall .card .frame{transition:box-shadow .45s ease}
    .wall .card:hover{transform:translateY(-6px) scale(1.055);z-index:3}
    .wall .card:hover .frame{box-shadow:0 1px 2px rgba(0,0,0,.10),0 6px 12px -2px rgba(0,0,0,.14),0 18px 28px -8px rgba(0,0,0,.20),0 38px 56px -18px rgba(0,0,0,.26)}
    .wall:has(.card:hover) .card:not(:hover){opacity:.6}
  }

  /* ---------- 5 colour playground ---------- */
  #play{scroll-margin-top:88px}
  .lab-play-sub{margin:0;color:var(--muted);font-size:15px;max-width:44ch}
  .lab-play{position:relative;height:clamp(300px,40vw,470px);border-radius:var(--r,22px);overflow:hidden;border:1px solid var(--line);touch-action:pan-y;background:#06130C;isolation:isolate}
  .lab-play .paint{position:absolute;inset:-12%;filter:blur(26px) saturate(125%)}
  .lab-play .scope{position:absolute;left:16px;top:16px;font:700 11px/1 var(--f);letter-spacing:.1em;color:#fff;padding:8px 12px;border-radius:999px;background:rgba(0,0,0,.34);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);font-variant-numeric:tabular-nums}
  .lab-play .big{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font:800 clamp(30px,6vw,76px)/1 var(--f);text-transform:uppercase;color:#fff;mix-blend-mode:overlay;pointer-events:none;white-space:nowrap;letter-spacing:.01em}
  .lab-play .ctl{position:absolute;left:14px;right:14px;bottom:14px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
  .lab-play .g{font:700 12px/1 var(--f);padding:10px 14px 10px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.34);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);color:#fff;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .25s,border-color .25s}
  .lab-play .g i{width:16px;height:16px;border-radius:50%}
  .lab-play .g[aria-pressed="true"]{background:rgba(255,255,255,.92);color:#111;border-color:#fff}
  .lab-play .g.reset{padding-left:14px;margin-left:auto}
  .lab-play .g:focus-visible,.lab-play .h:focus-visible{outline:2px solid #fff;outline-offset:3px}
  .lab-play .fsb{all:unset;position:absolute;right:14px;top:14px;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;background:rgba(0,0,0,.34);border:1px solid rgba(255,255,255,.3);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);cursor:pointer;z-index:3;box-sizing:border-box}
  .lab-play .fsb:hover{background:rgba(0,0,0,.55)}.lab-play .fsb:focus-visible{outline:2px solid #fff;outline-offset:3px}
  .lab-play .fsb svg{width:17px;height:17px}
  .lab-play:fullscreen{height:100%;width:100%;border-radius:0;border:0}
  .lab-play.fs{position:fixed;inset:0;z-index:300;height:auto;border-radius:0;border:0}
  .lab-play .sw{display:inline-flex;gap:6px;align-items:center;box-sizing:border-box;height:38px;overflow:hidden;border-radius:999px;background:rgba(0,0,0,.34);border:1px solid transparent;max-width:0;padding:0;margin-left:-8px;opacity:0;pointer-events:none;transform-origin:0 50%;transform:scale(.6);filter:blur(6px);transition:max-width .55s cubic-bezier(.3,1.35,.35,1),padding .55s cubic-bezier(.3,1.35,.35,1),margin .55s cubic-bezier(.3,1.35,.35,1),transform .55s cubic-bezier(.3,1.35,.35,1),opacity .3s ease,filter .35s ease,border-color .3s}
  .lab-play.custom .sw{max-width:160px;padding:0 8px;margin-left:0;opacity:1;pointer-events:auto;transform:none;filter:none;border-color:rgba(255,255,255,.3)}
  .lab-play .sw input{flex:none;opacity:0;transform:translateX(-26px) scale(.3);transition:transform .5s cubic-bezier(.3,1.5,.4,1),opacity .25s ease}
  .lab-play.custom .sw input{opacity:1;transform:none}
  .lab-play.custom .sw input:nth-child(1){transition-delay:.06s}.lab-play.custom .sw input:nth-child(2){transition-delay:.11s}.lab-play.custom .sw input:nth-child(3){transition-delay:.16s}.lab-play.custom .sw input:nth-child(4){transition-delay:.21s}
  .lab-play .sw input{appearance:none;-webkit-appearance:none;width:28px;height:28px;padding:0;border:2px solid #fff;border-radius:50%;background:none;cursor:pointer;overflow:hidden}
  .lab-play .sw input::-webkit-color-swatch-wrapper{padding:0}.lab-play .sw input::-webkit-color-swatch{border:0;border-radius:50%}.lab-play .sw input::-moz-color-swatch{border:0;border-radius:50%}
  .lab-play .g.pp{padding-left:12px;margin-left:auto}.lab-play .g.pp svg{width:12px;height:12px}
  .lab-play .g.reset{margin-left:0!important}
  .lab-play .g.pp{transition:transform .65s cubic-bezier(.3,1.35,.35,1),opacity .45s ease,padding .55s cubic-bezier(.3,1.35,.35,1),gap .55s cubic-bezier(.3,1.35,.35,1),background .25s,border-color .25s}
  .lab-play .g.pp .lb{display:inline-block;max-width:60px;overflow:hidden;white-space:nowrap;transition:max-width .55s cubic-bezier(.3,1.35,.35,1),opacity .3s ease,filter .35s ease}
  .lab-play.playing .g.pp{transform:translateX(var(--dx,70px));opacity:.2;padding:12px 13px;gap:0}
  .lab-play.playing .g.pp .lb{max-width:0;opacity:0;filter:blur(6px)}
  .lab-play.playing .g.pp:hover,.lab-play.playing .g.pp:focus-visible{opacity:1}
  .lab-play .h,.lab-play .scope,.lab-play .fsb,.lab-play .big,.lab-play .ctl > .g:not(.pp){transition:opacity .45s ease,filter .45s ease,scale .45s cubic-bezier(.3,1.2,.4,1),background .25s,border-color .25s}
  .lab-play.playing .h,.lab-play.playing .scope,.lab-play.playing .fsb,.lab-play.playing .big,.lab-play.playing .ctl > .g:not(.pp){opacity:0;filter:blur(12px);scale:.88;pointer-events:none}
  .lab-play.playing .sw{opacity:0!important;filter:blur(12px)!important;pointer-events:none!important}
  .lab-play .h{all:unset;position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;border:3px solid #fff;box-sizing:border-box;box-shadow:0 4px 14px rgba(0,0,0,.45);cursor:grab;touch-action:none;z-index:2;transition:scale .2s}
  .lab-play .h::after{content:"";position:absolute;inset:-10px;border-radius:50%}
  .lab-play .h:hover{scale:1.15}.lab-play .h.drag{cursor:grabbing;scale:1.3}

  /* ---------- 8 contact, upgraded ---------- */
  .contact{position:relative;overflow:hidden}
  .contact > .pill{display:none}.contact h2{margin-top:0!important}
  .lab-status{display:inline-flex;align-items:center;gap:10px;box-sizing:border-box;height:52px;font:600 15px/1 var(--f);color:var(--on-forest);padding:0 20px;border-radius:999px;border:2px solid rgba(255,255,255,.22);background:rgba(255,255,255,.07);font-variant-numeric:tabular-nums}
  .lab-status i{width:9px;height:9px;border-radius:50%;background:#2DCB6F;box-shadow:0 0 0 0 rgba(45,203,111,.6);animation:labPing 2s ease-out infinite}
  @keyframes labPing{to{box-shadow:0 0 0 10px rgba(45,203,111,0)}}
  .contact h2.lab-in{animation:labHead .9s cubic-bezier(.2,.8,.2,1) both}
  .contact h2.lab-in span{display:inline-block;animation:labHead .9s .18s cubic-bezier(.2,.8,.2,1) both}
  @keyframes labHead{from{transform:translateY(34px);opacity:0;filter:blur(8px)}to{transform:none;opacity:1;filter:none}}
  .lab-acts{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:-6px 0 30px}
  .lab-acts a,.lab-acts button{display:inline-flex;align-items:center;gap:9px;box-sizing:border-box;height:52px;padding:0 24px;border-radius:999px;font:700 15px/1 var(--f);text-decoration:none;cursor:pointer;transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s}
  .lab-acts .wa{background:var(--lime);color:var(--lime-ink);border:2px solid var(--lime)}
  .lab-acts .wa:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 10px 30px color-mix(in oklab,var(--lime) 45%,transparent)}
  .lab-acts .em{background:transparent;color:var(--on-forest);border:2px solid rgba(255,255,255,.35)}
  .lab-acts .em:hover{transform:translateY(-2px);border-color:var(--lime)}
  .contact .line{transition:background .3s;border-radius:14px;padding-inline:16px;margin-inline:-16px;min-height:66px;box-sizing:border-box}
  .contact .line .copy{justify-self:end;min-width:64px;text-align:center}
  @media (hover:hover){.contact .line:hover{background:color-mix(in oklab,var(--lime) 9%,transparent)}}
  .lab-mq{margin:clamp(44px,6vw,72px) calc(-1 * clamp(28px,5vw,64px)) calc(-1 * clamp(28px,5vw,64px));padding:clamp(22px,3vw,34px) 0 clamp(26px,3.4vw,40px);border-top:1px solid color-mix(in oklab,var(--on-forest) 14%,transparent);overflow:hidden;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
  .lab-mq div{display:inline-block;animation:labMq 60s linear infinite;font:300 clamp(26px,4.6vw,56px)/1.15 "Monument Extended","PP Monument Extended","Archivo",var(--f);font-stretch:125%;letter-spacing:.02em;text-transform:uppercase;color:#fff}
  .lab-mq b{color:#2DCB6F;font-weight:300;padding:0 .12em}
  @keyframes labMq{to{transform:translateX(-50%)}}
  @media (max-width:600px){.lab-acts a,.lab-acts .lab-status{flex:1 1 100%;justify-content:center}.contact .line{min-height:0}}
  @media (prefers-reduced-motion:reduce){.lab-mq div,.lab-status i{animation:none}.lab-col{transition:none}}`;
  const fl = document.createElement("link"); fl.rel = "stylesheet"; fl.href = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,300&display=swap"; document.head.appendChild(fl);
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ================= 1 + 2: slate, then the focus pull ================= */
  const pic = q("#pic");
  if (pic && q("img", pic)){ const af = document.createElement("span"); af.className = "lab-af"; af.setAttribute("aria-hidden", "true"); pic.appendChild(af); }
  function go(){
    document.body.classList.remove("lab-wait");
    if (RM) return;
    document.body.classList.add("lab-go");
    setTimeout(() => q(".lab-af")?.classList.add("lock"), 1300);
  }
  let seen = false; try { seen = sessionStorage.getItem("labSlate") === "1"; } catch(_){}
  if (RM || seen) { requestAnimationFrame(go); }
  else {
    document.body.classList.add("lab-wait");
    const sl = document.createElement("div"); sl.className = "lab-slate"; sl.setAttribute("role", "button"); sl.setAttribute("aria-label", "Skip intro");
    sl.innerHTML = `<i class="c c1"></i><i class="c c2"></i><i class="c c3"></i><i class="c c4"></i>
      <span class="rec"><i></i>REC</span><span class="take">PORTFOLIO · TAKE 01</span>
      <div class="mid"><div class="tc">00:00:0<b>3</b></div>
      <div class="info"><div><small>SCENE</small><span>Portfolio</span></div><div><small>DIRECTOR</small><span>${S.name || "Waleed Aziz"}</span></div><div><small>ROLE</small><span>Editor · Designer</span></div></div></div>
      <div class="bar"><i></i></div>`;
    document.body.appendChild(sl);
    const d = q(".tc b", sl); let done = false;
    const tick = n => { d.textContent = n; d.classList.remove("tick"); void d.offsetWidth; d.classList.add("tick"); };
    const end = () => { if (done) return; done = true; sl.classList.add("out"); go(); setTimeout(() => sl.remove(), 300); try { sessionStorage.setItem("labSlate", "1"); } catch(_){} };
    setTimeout(() => tick(2), 320); setTimeout(() => tick(1), 640); setTimeout(end, 980);   /* about 1.25s in total */
    sl.addEventListener("click", end); addEventListener("keydown", end, { once:true });
  }

  /* the rainbow glow and page dim that lived on "See my work" now belong to the photo */
  const ph = q("#tilt"), dimEl = q(".dim");
  if (ph && dimEl && FINE){
    const gl = document.createElement("span"); gl.className = "lab-glow"; gl.setAttribute("aria-hidden", "true"); ph.prepend(gl);
    const on = () => { const r = q("#pic").getBoundingClientRect(); dimEl.style.setProperty("--cx", `${r.left + r.width / 2}px`); dimEl.style.setProperty("--cy", `${r.top + r.height / 2}px`); document.body.classList.add("lab-focus"); };
    const off = () => document.body.classList.remove("lab-focus");
    ph.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") on(); });
    ph.addEventListener("pointerleave", off); addEventListener("scroll", off, { passive:true });
  }

  /* "I make ___" */
  const role = q("#role");
  if (role){
    const WORDS = ["video ads", "motion graphics", "brand identities", "social media posts", "thumbnails", "AI visuals"];
    const p = document.createElement("p"); p.className = "lab-make";
    p.innerHTML = `<span>I make</span><span class="lab-roll" aria-live="off"><span class="lab-col">${WORDS.concat(WORDS[0]).map((w, i) => `<span${i ? "" : ' class="on"'}>${w}</span>`).join("")}</span></span>`;
    role.after(p);
    const col = q(".lab-col", p), roll = q(".lab-roll", p), items = [...col.children]; let i = 0;
    const fit = () => { roll.style.width = items[i].offsetWidth + "px"; };
    fit(); document.fonts?.ready.then(fit); addEventListener("resize", fit);
    if (!RM) setInterval(() => {
      if (document.hidden) return;
      items[i].classList.remove("on"); i++;
      col.style.transform = `translateY(${-i * 1.9}em)`; items[i].classList.add("on"); fit();
      if (i === WORDS.length) setTimeout(() => { col.classList.add("snap"); items[i].classList.remove("on"); i = 0; items[0].classList.add("on"); col.style.transform = "none"; void col.offsetWidth; col.classList.remove("snap"); }, 700);
    }, 1900);
  }

  /* ================= 5 colour playground (built before the timeline so it gets a clip) ================= */
  const contact = q("#contact");
  if (contact){
    const GR = {
      "Lime":          { base:"#06130C", c:["#C9E08F","#2DCB6F","#0F6B3C","#E9FFB0"] },
      "Teal & Orange": { base:"#06181D", c:["#F2A65A","#19A7A0","#E4572E","#7FE3DC"] },
      "Noir":          { base:"#0A0A0A", c:["#F4F4F4","#8C8C8C","#3C3C3C","#CFCFCF"] },
      "Sunset":        { base:"#170A1C", c:["#FF9B7A","#FF4D8D","#7A3CFF","#FFD36E"] }
    };
    const sec = document.createElement("section"); sec.id = "play"; sec.className = "wrap";
    sec.innerHTML = `<div class="sec-head"><h2>Play with the grade</h2><p class="lab-play-sub">Drag the four colour dots, pick a grade or mix your own, then press Play.</p></div>
      <div class="lab-play" id="labPlay"><div class="paint"></div><span class="scope">DRAG THE DOTS</span><span class="big" aria-hidden="true">Colour is a feeling</span>
      <div class="ctl" role="group" aria-label="Colour grade">${Object.keys(GR).map((k, n) => `<button type="button" class="g" data-g="${k}" aria-pressed="${n === 0}"><i style="background:linear-gradient(135deg,${GR[k].c[0]},${GR[k].c[1]})"></i>${k.replace("&", "&amp;")}</button>`).join("")}<button type="button" class="g" data-g="Custom" aria-pressed="false"><i style="background:conic-gradient(#ff2e63,#ffe14d,#5dff6a,#22e4ff,#b44dff,#ff2e63)"></i>Custom</button><span class="sw">${[1,2,3,4].map(n => `<input type="color" id="labC${n}" aria-label="Colour ${n}" value="#C9E08F">`).join("")}</span><button type="button" class="g pp" aria-pressed="false"></button><button type="button" class="g reset">Reset</button></div>
      <button type="button" class="fsb" aria-label="Full screen"></button></div>`;
    contact.before(sec);
    const box = q("#labPlay"), paint = q(".paint", box), scope = q(".scope", box);
    GR.Custom = { base:"#0A0B10", c:[...GR.Lime.c] };
    let grade = "Lime", run = false, vis = false, drag = -1, playing = false, tAcc = 0, last = performance.now();
    const off = (k, t) => [Math.sin(t * .5 + k * 1.7) * 9 - Math.sin(k * 1.7) * 9, Math.cos(t * .42 + k * 2.3) * 10 - Math.cos(k * 2.3) * 10];
    const playB = q(".pp", box), fsb = q(".fsb", box), ins = [...box.querySelectorAll(".sw input")];
    const IC = { play:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 1.5v13l11-6.5z" fill="currentColor"/></svg><span class="lb">Play</span>', pause:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h4v12H3zM9 2h4v12H9z" fill="currentColor"/></svg><span class="lb">Pause</span>',
      fs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>', unfs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>' };
    playB.innerHTML = IC.play; fsb.innerHTML = IC.fs;
    const isFs = () => document.fullscreenElement === box || box.classList.contains("fs");
    const fsUi = () => { fsb.innerHTML = isFs() ? IC.unfs : IC.fs; fsb.setAttribute("aria-label", isFs() ? "Exit full screen" : "Full screen"); };
    fsb.addEventListener("click", e => { e.stopPropagation();
      if (document.fullscreenElement === box){ document.exitFullscreen(); return; }
      if (box.classList.contains("fs")){ box.classList.remove("fs"); fsUi(); return; }
      const fb = () => { box.classList.add("fs"); fsUi(); };
      try { const r = box.requestFullscreen?.(); r ? r.catch(fb) : fb(); } catch(_){ fb(); } });
    document.addEventListener("fullscreenchange", fsUi);
    addEventListener("keydown", e => { if (e.key === "Escape" && box.classList.contains("fs")){ box.classList.remove("fs"); fsUi(); } });
    ins.forEach((inp, k) => inp.addEventListener("input", () => { GR.Custom.c[k] = inp.value; kick(); }));
    const HOME = [[24,32],[76,64],[64,20],[32,76]]; let pts = HOME.map(([x, y]) => ({ x, y }));
    const hs = pts.map((_, k) => { const h = document.createElement("button"); h.type = "button"; h.className = "h"; h.setAttribute("aria-label", `Colour ${k + 1}: drag, or use the arrow keys`); box.insertBefore(h, q(".ctl", box)); return h; });
    function draw(now){
      if (playing) tAcc += Math.min(.05, (now - last) / 1000); last = now;
      const g = GR[grade], t = tAcc, L = [];
      pts.forEach((p, k) => {
        const o = off(k, t), x = p.x + o[0], y = p.y + o[1];
        L.push(`radial-gradient(circle at ${x}% ${y}%, ${g.c[k]} 0, transparent ${k < 2 ? 46 : 38}%)`);
        hs[k].style.left = x + "%"; hs[k].style.top = y + "%"; hs[k].style.background = g.c[k];
      });
      paint.style.background = L.join(",") + "," + g.base; box.style.background = g.base;
      if (vis && playing) requestAnimationFrame(draw); else run = false;
    }
    const kick = () => { if (!run){ run = true; requestAnimationFrame(draw); } };
    const pos = e => { const r = box.getBoundingClientRect(); return { x: Math.max(3, Math.min(97, (e.clientX - r.left) / r.width * 100)), y: Math.max(5, Math.min(95, (e.clientY - r.top) / r.height * 100)) }; };
    const say = p => { scope.textContent = `X ${String(Math.round(p.x)).padStart(2, "0")} · Y ${String(Math.round(p.y)).padStart(2, "0")}`; };
    hs.forEach((h, k) => {
      h.addEventListener("pointerdown", e => { drag = k; h.classList.add("drag"); try { h.setPointerCapture(e.pointerId); } catch(_){} e.preventDefault(); kick(); });
      h.addEventListener("pointermove", e => { if (drag !== k) return; const c = pos(e), o = off(k, tAcc); pts[k] = { x: c.x - o[0], y: c.y - o[1] }; say(c); kick(); });
      const up = () => { if (drag === k) drag = -1; h.classList.remove("drag"); };
      h.addEventListener("pointerup", up); h.addEventListener("pointercancel", up);
      h.addEventListener("keydown", e => { const d = { ArrowLeft:[-3,0], ArrowRight:[3,0], ArrowUp:[0,-3], ArrowDown:[0,3] }[e.key]; if (!d) return; e.preventDefault(); pts[k] = { x: Math.max(3, Math.min(97, pts[k].x + d[0])), y: Math.max(5, Math.min(95, pts[k].y + d[1])) }; say(pts[k]); kick(); });
    });
    box.addEventListener("click", e => {
      const b = e.target.closest(".g"); if (!b) return;
      if (b.classList.contains("pp")){ playing = !playing; b.style.setProperty("--dx", (q(".reset", box).offsetWidth + 8) + "px"); last = performance.now(); b.innerHTML = playing ? IC.pause : IC.play; b.setAttribute("aria-pressed", playing); box.classList.toggle("playing", playing); }
      else if (b.classList.contains("reset")){ pts = HOME.map(([x, y]) => ({ x, y })); tAcc = 0; scope.textContent = "DRAG THE DOTS"; }
      else {
        if (b.dataset.g === "Custom" && grade !== "Custom"){ GR.Custom.c = [...GR[grade].c]; ins.forEach((inp, k) => inp.value = GR.Custom.c[k].slice(0, 7)); }
        if (b.dataset.g === "Custom" && grade === "Custom") box.classList.toggle("custom"); else box.classList.toggle("custom", b.dataset.g === "Custom"); grade = b.dataset.g; box.querySelectorAll(".g[data-g]").forEach(x => x.setAttribute("aria-pressed", x === b)); }
      kick();
    });
    new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) kick(); }).observe(box);
    kick();
    draw(performance.now());
  }

  /* ================= 8 contact ================= */
  const panel = q(".panel.contact");
  if (panel){
    const h2 = q("h2", panel);
    const stat = document.createElement("span"); stat.className = "lab-status";
    const fmt = new Intl.DateTimeFormat("en-GB", { hour:"2-digit", minute:"2-digit", timeZone:"Asia/Karachi" });
    const clock = () => { stat.innerHTML = `<i></i>Lahore ${fmt.format(new Date())} · Open to new projects`; };
    clock(); setInterval(clock, 30000);
    const acts = document.createElement("div"); acts.className = "lab-acts";
    acts.innerHTML = (S.whatsapp ? `<a class="wa" target="_blank" rel="noopener" href="https://wa.me/${S.whatsapp}?text=${encodeURIComponent("Hi Waleed, I saw your portfolio and have a project in mind.")}">Message on WhatsApp <span aria-hidden="true">↗</span></a>` : "");
    h2.after(acts); acts.appendChild(stat);
    const mq = document.createElement("div"); mq.className = "lab-mq"; mq.setAttribute("aria-hidden", "true");
    const run = `Video ads <b>·</b> Motion graphics <b>·</b> Brand identity <b>·</b> Social media <b>·</b> Let's make it move <b>·</b> `;
    mq.innerHTML = `<div>${run}${run}</div>`; panel.appendChild(mq);
    if (!RM) new IntersectionObserver((es, o) => { if (es[0].isIntersecting){ h2.classList.add("lab-in"); o.disconnect(); } }, { threshold:.5 }).observe(h2);
  }

  /* ================= 4 cards: let hover transforms win once the entry animation ends ================= */
  q("#wall")?.addEventListener("animationend", e => { if (e.target.classList?.contains("card")) e.target.classList.remove("in"); });

  /* ================= 3 scroll timeline ================= */
  const SECS = [["Intro", "#top"], ["Work", "#work"], ["Experience", "#experience"], ["Skills", "#skills"], ["Play", "#play"], ["Contact", "#contact"]].map(([n, s]) => [n, q(s)]).filter(x => x[1]);
  if (SECS.length > 2){
    const tl = document.createElement("div"); tl.className = "lab-tl"; tl.setAttribute("aria-label", "Page timeline");
    tl.innerHTML = `<div class="in"><div class="top"><span class="tc">00:00:00:00</span><span class="hint">Scroll or hover to move the playhead · click to jump</span></div>
      <div class="track"><div class="ruler"></div><div class="clips">${SECS.map(([n], i) => `<button type="button" class="clip" data-i="${i}">${n}</button>`).join("")}</div><div class="head"></div></div></div>
      <button type="button" class="totop" tabindex="-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>Back to top</button>`;
    document.body.appendChild(tl);
    const totop = q(".totop", tl); let ended = false;
    totop.addEventListener("click", e => { e.stopPropagation(); hov = null; scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }); });
    const clips = [...tl.querySelectorAll(".clip")], head = q(".head", tl), tc = q(".tc", tl); let tops = [], total = 1;
    const top = el => el.getBoundingClientRect().top + scrollY;
    function measure(){
      const H = document.documentElement.scrollHeight; tops = SECS.map(([, el], i) => i ? top(el) : 0); total = Math.max(1, H - innerHeight);
      SECS.forEach((_, i) => { clips[i].style.flex = `${Math.max(40, (tops[i + 1] ?? H) - tops[i])} 1 0`; });
      update();
    }
    const p2 = n => String(n).padStart(2, "0");
    function update(){
      const end = scrollY >= total - 30 && total > 400;
      if (end !== ended){ ended = end; tl.classList.toggle("end", end); totop.tabIndex = end ? 0 : -1; clips.forEach(c => c.tabIndex = end ? -1 : 0); if (end){ hov = null; tl.classList.remove("scrub"); } }
      if (hov){ tl.classList.toggle("show", scrollY > 120); return; }
      const y = scrollY, p = Math.min(1, Math.max(0, y / total)), mid = y + innerHeight * .4;
      let a = 0; tops.forEach((t, i) => { if (mid >= t) a = i; });
      clips.forEach((c, i) => c.classList.toggle("on", i === a));
      /* playhead sits inside the active clip, by how far through that section the reader is */
      const trk = clips[0].parentNode, tr0 = trk.getBoundingClientRect(), k = tr0.width / trk.offsetWidth || 1, r0 = clips[a].getBoundingClientRect(), r = { left: r0.left / k, width: r0.width / k }, tr = { left: tr0.left / k };
      const s0 = tops[a], s1 = tops[a + 1] ?? document.documentElement.scrollHeight, f = Math.min(1, Math.max(0, (mid - s0) / Math.max(1, s1 - s0)));
      head.style.left = (r.left - tr.left + r.width * f) + "px";
      const fr = Math.round(p * 90 * 24); tc.textContent = `00:${p2(Math.floor(fr / 1440))}:${p2(Math.floor(fr / 24) % 60)}:${p2(fr % 24)}`;
      tl.classList.toggle("show", y > 120);
    }
    /* hovering scrubs: the playhead follows the cursor and the timecode previews that spot; a click goes there */
    let hov = null;
    const at = e => { const tr = clips[0].parentNode.getBoundingClientRect(), k = tr.width / clips[0].parentNode.offsetWidth, x = Math.max(0, Math.min(tr.width, e.clientX - tr.left)); let a = 0, f = 0;
      clips.forEach((c, i) => { const r = c.getBoundingClientRect(); if (e.clientX >= r.left) { a = i; f = Math.min(1, (e.clientX - r.left) / r.width); } });
      const s0 = tops[a], s1 = tops[a + 1] ?? document.documentElement.scrollHeight; return { left: x / k, y: Math.max(0, Math.min(total, s0 + f * (s1 - s0) - innerHeight * .4)), a }; };
    tl.addEventListener("pointermove", e => { if (e.pointerType !== "mouse" || ended) return; hov = at(e); tl.classList.add("scrub"); head.style.left = hov.left + "px"; clips.forEach((c, i) => c.classList.toggle("on", i === hov.a));
      const fr = Math.round(hov.y / total * 90 * 24); tc.textContent = `00:${p2(Math.floor(fr / 1440))}:${p2(Math.floor(fr / 24) % 60)}:${p2(fr % 24)}`; });
    tl.addEventListener("pointerleave", () => { hov = null; tl.classList.remove("scrub"); update(); });
    let raf = 0; addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive:true });
    addEventListener("resize", measure); new ResizeObserver(measure).observe(document.body);
    tl.addEventListener("click", e => { if (ended) return; const c = e.target.closest(".clip"), mouse = e.detail > 0 && hov; if (!c && !mouse) return; const y = mouse ? at(e).y : Math.max(0, tops[+c.dataset.i] - 80); hov = null; scrollTo({ top: y, behavior: RM ? "auto" : "smooth" }); });
    measure();
  }
})();
