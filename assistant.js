/* Waleed's site assistant: answers visitor questions from the knowledge below.
   No API key, no cost: it matches the question to the closest answer.
   EDIT THE ANSWERS in the KNOWLEDGE list. Each entry has:
     keys:    words or phrases visitors might use (phrases count more)
     answer:  what the assistant says (simple HTML allowed)
     action:  optional button, e.g. { label: "Show motion work", filter: "Motion Graphics" }
     next:    optional follow-up suggestions
   If nothing matches, the visitor can send their question to you on WhatsApp. */
(() => {
  const S = typeof SITE !== "undefined" ? SITE : {};
  const NAME = (S.name || "Waleed").split(" ")[0];
  const wa = t => S.whatsapp ? `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(t)}` : "";
  const be = S.behance || "https://www.behance.net/Waleed_Aziz";

  const SUGGEST = ["What does Waleed do?", "Is he available for work?", "Which software does he use?", "Show me his motion work", "How do I contact him?"];

  const KNOWLEDGE = [
    { id:"about", keys:["who is","about","tell me","introduce","what does he do","what do you do","who are you","waleed","background","summary"],
      answer:`${S.name || "Waleed Aziz"} is a <b>Graphic Designer and Video Editor</b> from Lahore, Pakistan with <b>7+ years</b> of experience. He combines high-end video and motion graphics with brand and social media design, and has edited <b>800+ videos</b> for <b>40+ clients</b> in Pakistan, the UAE and Australia.`,
      next:["Where does he work now?", "Which software does he use?", "Show me his work"] },
    { id:"experience", keys:["experience","how many years","years","how long","senior","career","work history","previous","companies","past jobs","resume history"],
      answer:`He has <b>7+ years</b> in video and design:<br>• <b>SFX Funded Australia</b>, Multimedia Designer (2025 – now, remote)<br>• <b>Shutter Snap Social Dubai</b>, Video Editor (2023 – 2025, remote)<br>• <b>St Global Solutions</b>, Video Editor & Graphic Designer (2022 – 2023)<br>• <b>OZI Technology</b>, Video Editor (2021 – 2022)<br>• <b>NEXSKILL</b>, Video Editor (2020 – 2021)`,
      action:{ label:"See full experience", href:"#experience" }, next:["Where does he work now?", "Does he work with international clients?"] },
    { id:"current", keys:["current","currently","now","right now","present","sfx","sfx funded","job","company","employer","working at"],
      answer:`Right now he's a <b>Multimedia Designer (Video & Graphics)</b> at <b>SFX Funded</b>, an Australian prop trading firm, working remotely since 2025. He designs promotional videos and static ads, and turns complex trading ideas into simple social content.`,
      next:["Is he available for work?", "Show me his social media work"] },
    { id:"skills", keys:["skills","good at","expertise","speciality","specialty","strengths","services","offer","what can he do"],
      answer:`His main skills: <b>Motion Graphics, Video Editing, Graphic Design, Brand Identity, Storytelling</b> and <b>AI workflows</b>. In practice that means video ads, reels, explainers, social media posts, ad statics, thumbnails, logos and photo manipulation.`,
      next:["Which software does he use?", "Show me his motion work", "Does he use AI?"] },
    { id:"software", keys:["software","tools","programs","apps","adobe","after effects","premiere","photoshop","illustrator","indesign","use for editing","which tool"],
      answer:`He works in <b>Adobe After Effects, Premiere Pro, Photoshop, Illustrator</b> and <b>InDesign</b>, plus <b>Higgsfield</b> for AI-generated images and video.`,
      next:["Does he use AI?", "Show me his video work"] },
    { id:"ai", keys:["ai","artificial intelligence","higgsfield","midjourney","generative","ai video","ai images","chatgpt"],
      answer:`Yes. He uses an <b>AI workflow</b> (mainly <b>Higgsfield</b>) to generate keyframes, product shots and UGC-style videos, then finishes them in After Effects and Premiere so they look polished and on-brand.`,
      next:["Show me his motion work", "Is he available for work?"] },
    { id:"motion", keys:["motion","motion graphics","animation","animate","animated","explainer","kinetic","title","logo animation","after effects work"],
      answer:`Motion graphics is one of his strongest areas: animated ads, explainers, title sequences and logo animations.`,
      action:{ label:"Show motion work", filter:"Motion Graphics" }, next:["Show me his video work", "Which software does he use?"] },
    { id:"video", keys:["video","video editing","edit","editing","reels","reel","tiktok","shorts","youtube video","ugc","green screen","chroma","corporate video","promo"],
      answer:`He edits promotional videos, reels and shorts, UGC-style ads, corporate videos with voice-over, and green screen (chroma key) productions. He has edited <b>800+ videos</b> so far.`,
      action:{ label:"Show video work", filter:"Video Editing" }, next:["Show me his motion work", "How fast can he deliver?"] },
    { id:"design", keys:["graphic design","design","branding","brand","logo","identity","poster","flyer","print","static","ads","ad creative","banner"],
      answer:`On the design side he creates brand identities, logos, ad statics, posters and campaign graphics, keeping motion and static work consistent so a brand looks the same everywhere.`,
      action:{ label:"Show design work", filter:"Graphic Design" }, next:["Show me his social media work", "Show me his work"] },
    { id:"social", keys:["social media","social","instagram","facebook","post","posts","carousel","story","stories","content","meta"],
      answer:`He designs social media posts, carousels, stories and festive campaigns (Eid, Ramadan, national days), and his unified motion + static content has lifted client engagement by <b>40%</b>.`,
      action:{ label:"Show social media work", filter:"Social Media" }, next:["Show me his video work", "Is he available for work?"] },
    { id:"thumb", keys:["thumbnail","thumbnails","youtube thumbnail","cover"],
      answer:`Yes, he designs YouTube thumbnails, including kids' channel thumbnails.`,
      action:{ label:"Show thumbnails", filter:"Thumbnails" } },
    { id:"photo", keys:["photo manipulation","manipulation","photoshop art","compositing","composite","retouch","photo editing"],
      answer:`He does photo manipulation and compositing in Photoshop. "Rotting Souls" and "Photographer in Nature" are two examples.`,
      action:{ label:"Show photo manipulation", filter:"Photo Manipulation" } },
    { id:"work", keys:["portfolio","projects","samples","examples","show me his work","see his work","his work","your work","behance","previous work"],
      answer:`You can browse all his projects right here, or see full case studies on Behance.`,
      action:{ label:"Show all work", filter:"All" }, links:[["Open Behance", be]], next:["Show me his motion work", "Show me his social media work"] },
    { id:"showreel", keys:["showreel","reel","demo reel","demo"],
      answer:`His showreel is coming soon. Until then, the Motion Graphics and Video Editing filters show his best video work.`,
      action:{ label:"Show motion work", filter:"Motion Graphics" } },
    { id:"location", keys:["where","location","based","from","city","country","pakistan","lahore","live"],
      answer:`He's based in <b>Lahore, Pakistan</b> and works with clients worldwide remotely.`,
      next:["Does he work with international clients?", "What time zone is he in?"] },
    { id:"remote", keys:["remote","international","abroad","overseas","worldwide","uae","dubai","australia","usa","uk","clients outside","foreign"],
      answer:`Yes. He has worked remotely for <b>Shutter Snap Social (Dubai)</b> and currently for <b>SFX Funded (Australia)</b>, so he's used to international teams, brand guidelines and online collaboration.`,
      next:["What time zone is he in?", "Is he available for work?"] },
    { id:"timezone", keys:["timezone","time zone","hours","working hours","gmt","pkt","overlap"],
      answer:`He's in Pakistan Standard Time (<b>GMT+5</b>), which overlaps well with the UAE, Europe and the Australian afternoon.` },
    { id:"hire", keys:["hire","available","availability","freelance","full time","fulltime","part time","job offer","open to","collaborate","book","project with","take my project","contract"],
      answer:`He's open to <b>freelance projects</b> and good opportunities. The quickest way to discuss a project is WhatsApp or email.`,
      contact:true, next:["How much does he charge?", "How fast can he deliver?"] },
    { id:"price", keys:["price","pricing","rate","rates","cost","charge","fee","budget","how much","quote","payment","per video","hourly"],
      answer:`Pricing depends on the project: length, complexity, number of revisions and deadline. Send him a short brief and he'll reply with a quote.`,
      contact:true },
    { id:"turnaround", keys:["deadline","turnaround","how fast","delivery","deliver","time to complete","urgent","quick","rush","how long will it take"],
      answer:`He's known for meeting strict deadlines, and past clients rated his turnaround times highly. Exact timing depends on the project, so share your deadline when you reach out.`,
      contact:true },
    { id:"process", keys:["process","how does he work","workflow","steps","revisions","revision","feedback","brief"],
      answer:`Usually: you share a brief and references → he proposes a direction → first draft → revisions based on your feedback → final files in the formats you need (reels, feed, stories, landscape).`,
      next:["How much does he charge?", "How do I contact him?"] },
    { id:"results", keys:["results","clients","how many clients","achievement","achievements","engagement","success","reviews","satisfied"],
      answer:`<b>40+ satisfied clients</b>, <b>800+ videos</b> edited, and a <b>40% engagement lift</b> for UAE clients through unified motion and static design.` },
    { id:"contact", keys:["contact","email","mail","phone","number","whatsapp","call","reach","message","talk","get in touch","dm"],
      answer:`You can reach him directly:<br>• Email: <b>${S.email || ""}</b><br>• WhatsApp: <b>${S.phone || ""}</b>`,
      contact:true },
    { id:"cv", keys:["cv","resume","résumé","download cv"],
      answer: S.cv ? `You can download his CV from the button at the top of the page.` : `His CV isn't online yet, but he can send it on request. Ask him on WhatsApp or by email.`,
      contact:!S.cv },
    { id:"education", keys:["education","study","studied","degree","college","university","qualification"],
      answer:`He completed his Intermediate in Computer Science (ICS) at Superior College (2019 – 2021), and has been building his skills through real client work ever since.` },
    { id:"bot", keys:["are you ai","are you a bot","are you real","who made","chatgpt","robot","human"],
      answer:`I'm ${NAME}'s site assistant. I answer from his profile and portfolio. For anything I can't answer, I'll pass your question to him on WhatsApp.` },
    { id:"hello", small:true, keys:["hi","hello","hey","salam","assalam","aoa","good morning","good evening","yo"],
      answer:`Hi! 👋 Ask me anything about ${NAME}: his work, skills, availability or how to contact him.`, next:SUGGEST.slice(0,3) },
    { id:"thanks", small:true, keys:["thanks","thank you","thx","great","awesome","nice","cool","ok","okay"],
      answer:`Happy to help! Anything else you'd like to know?`, next:["Is he available for work?", "How do I contact him?"] },
    { id:"bye", small:true, keys:["bye","goodbye","see you","later"],
      answer:`Thanks for stopping by! If you have a project in mind, ${NAME} would love to hear about it.`, contact:true }
  ];

  /* ---------- matching ---------- */
  const norm = s => " " + s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9À-ɏ\s+]/g, " ").replace(/\s+/g, " ").trim() + " ";
  const stem = w => w.length > 4 ? w.replace(/(ing|ed|es|s)$/, "") : w;
  function lev(a, b){
    if (Math.abs(a.length - b.length) > 1) return 2;
    const d = Array.from({length:a.length+1}, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function score(text, entry){
    const t = norm(text), words = t.trim().split(" ").map(stem);
    let s = 0;
    for (const k of entry.keys){
      const nk = norm(k);
      if (nk.trim().includes(" ")) { if (t.includes(nk)) s += 3; continue; }
      const kw = stem(nk.trim());
      if (words.includes(kw)) s += 2;
      else if (kw.length >= 5 && words.some(w => w.length >= 4 && lev(w, kw) <= 1)) s += 1.5;
    }
    if (entry.small && words.length > 3) s *= 0.4;
    return s;
  }
  function best(text){
    let top = null, max = 0;
    for (const e of KNOWLEDGE){ const sc = score(text, e); if (sc > max){ max = sc; top = e; } }
    return max >= 2 ? top : null;
  }

  /* ---------- UI ---------- */
  const css = `
  .wa-launch{position:fixed;right:max(18px,env(safe-area-inset-right,0px));bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:60;display:flex;align-items:center;gap:10px;border:0;background:none;padding:0;cursor:pointer;font:600 14px/1 var(--f,system-ui)}
  .wa-launch .wa-tip{padding:11px 16px;border-radius:999px;color:var(--ink,#14201A);opacity:0;transform:translateX(8px);transition:opacity .4s,transform .4s;pointer-events:none;white-space:nowrap}
  .wa-launch.tip .wa-tip,.wa-launch:hover .wa-tip{opacity:1;transform:none}
  .wa-av{position:relative;width:60px;height:60px;border-radius:50%;overflow:visible;flex:none;box-shadow:0 10px 30px rgba(13,59,36,.35);transition:transform .3s}
  .wa-launch:hover .wa-av{transform:scale(1.07)}
  .wa-av img,.wa-av span.i{width:100%;height:100%;border-radius:50%;object-fit:cover;display:grid;place-items:center;background:var(--forest,#0D3B24);color:#fff;font-weight:800;border:2px solid var(--lime,#C9E08F)}
  .wa-av::after{content:"";position:absolute;right:2px;bottom:2px;width:14px;height:14px;border-radius:50%;background:#2DCB6F;border:2px solid var(--paper,#fff)}
  .wa-av::before{content:"";position:absolute;inset:-4px;border-radius:50%;border:2px solid var(--lime,#C9E08F);opacity:.7;animation:waPulse 2.4s ease-out infinite}
  @keyframes waPulse{from{transform:scale(1);opacity:.7}to{transform:scale(1.35);opacity:0}}
  .wa-panel{position:fixed;right:max(18px,env(safe-area-inset-right,0px));bottom:calc(92px + env(safe-area-inset-bottom,0px));z-index:61;width:min(390px,calc(100vw - 32px));height:min(600px,calc(100vh - 130px));display:flex;flex-direction:column;padding:0;margin:0;border-radius:28px;overflow:hidden;color:var(--ink,#14201A);transform-origin:bottom right;transform:translateY(16px) scale(.96);opacity:0;pointer-events:none;transition:opacity .3s ease,transform .35s cubic-bezier(.2,.8,.2,1)}
  .wa-panel.open{opacity:1;transform:none;pointer-events:auto}
  .wa-panel.glass{position:fixed;background:linear-gradient(135deg,var(--glass-hi,rgba(255,255,255,.9)) -40%,transparent 38%),color-mix(in oklab,var(--paper,#F5F8F2) 95%,transparent)}
  .wa-launch .wa-tip.glass{position:relative}
  .wa-head{display:flex;align-items:center;gap:12px;padding:14px 14px 14px 16px;border-bottom:1px solid var(--glass-rim,rgba(255,255,255,.5))}
  .wa-head img,.wa-head span.i{width:40px;height:40px;border-radius:50%;object-fit:cover;display:grid;place-items:center;background:var(--forest,#0D3B24);color:#fff;font-weight:800;flex:none}
  .wa-head b{display:block;font:700 15px/1.2 var(--f,system-ui)}
  .wa-head small{display:flex;align-items:center;gap:6px;font:500 12px/1.2 var(--f,system-ui);color:var(--muted,#5A6B60);margin-top:3px}
  .wa-head small::before{content:"";width:7px;height:7px;border-radius:50%;background:#2DCB6F}
  .wa-x{margin-left:auto;width:34px;height:34px;border-radius:50%;border:1px solid var(--glass-rim,rgba(255,255,255,.5));background:var(--glass,rgba(255,255,255,.4));color:inherit;font-size:20px;line-height:1;cursor:pointer}
  .wa-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;overscroll-behavior:contain}
  .wa-msg{max-width:86%;padding:11px 14px;border-radius:18px;font:400 14.5px/1.5 var(--f,system-ui);animation:waIn .35s cubic-bezier(.2,.8,.2,1) both;overflow-wrap:anywhere}
  .wa-msg.bot{align-self:flex-start;background:var(--card,#fff);border:1px solid var(--line,#DCE6D5);border-bottom-left-radius:6px}
  .wa-msg.me{align-self:flex-end;background:var(--forest,#0D3B24);color:var(--on-forest,#EEF5E8);border-bottom-right-radius:6px}
  .wa-msg a{color:inherit;font-weight:700}
  .wa-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
  .wa-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 13px;border-radius:999px;border:0;background:var(--forest,#0D3B24);color:var(--on-forest,#EEF5E8);font:700 13px/1 var(--f,system-ui);text-decoration:none;cursor:pointer}
  .wa-btn.wa-green{background:#25D366;color:#06301A}
  .wa-btn.ghost{background:transparent;color:inherit;border:1.5px solid var(--line,#DCE6D5)}
  .wa-typing{align-self:flex-start;display:flex;gap:5px;padding:14px 16px;border-radius:18px;background:var(--card,#fff);border:1px solid var(--line,#DCE6D5)}
  .wa-typing i{width:7px;height:7px;border-radius:50%;background:var(--muted,#5A6B60);animation:waDot 1s infinite ease-in-out}
  .wa-typing i:nth-child(2){animation-delay:.15s}.wa-typing i:nth-child(3){animation-delay:.3s}
  @keyframes waDot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}
  @keyframes waIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .wa-sugg{display:flex;gap:8px;overflow-x:auto;padding:4px 16px 10px;scrollbar-width:none}
  .wa-sugg::-webkit-scrollbar{display:none}
  .wa-chip{flex:none;padding:9px 13px;border-radius:999px;border:1px solid var(--glass-rim,rgba(255,255,255,.5));background:var(--glass,rgba(255,255,255,.4));color:inherit;font:600 13px/1 var(--f,system-ui);cursor:pointer;white-space:nowrap}
  .wa-chip:hover{border-color:var(--lime-strong,#8FBF45)}
  .wa-form{display:flex;gap:8px;padding:10px 12px 12px;border-top:1px solid var(--glass-rim,rgba(255,255,255,.5))}
  .wa-form input{flex:1;min-width:0;padding:12px 16px;border-radius:999px;border:1px solid var(--line,#DCE6D5);background:var(--card,#fff);color:var(--ink,#14201A);font:500 14.5px/1.2 var(--f,system-ui);outline:none}
  .wa-form input:focus{border-color:var(--lime-strong,#8FBF45)}
  .wa-form button{flex:none;width:44px;height:44px;border-radius:50%;border:0;background:var(--forest,#0D3B24);color:var(--on-forest,#fff);cursor:pointer;display:grid;place-items:center}
  :root[data-theme="dark"] .wa-form button,:root[data-theme="dark"] .wa-btn:not(.wa-green):not(.ghost){background:var(--lime,#C9E08F);color:var(--lime-ink,#0D3B24)}
  @media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .wa-form button,:root:not([data-theme="light"]) .wa-btn:not(.wa-green):not(.ghost){background:var(--lime,#C9E08F);color:var(--lime-ink,#0D3B24)}}
  .wa-note{font:500 11px/1.3 var(--f,system-ui);color:var(--muted,#5A6B60);text-align:center;padding:0 16px 10px}
  @media (max-width:520px){.wa-panel{right:8px;left:8px;width:auto;bottom:calc(84px + env(safe-area-inset-bottom,0px));height:min(72vh,600px)}.wa-launch .wa-tip{display:none}}
  @media (prefers-reduced-motion:reduce){.wa-av::before{animation:none}.wa-panel,.wa-msg{transition:none;animation:none}}`;
  const style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);

  const initials = (S.name || "W A").split(/\s+/).map(p => p[0]).join("").slice(0,2).toUpperCase();
  const avatar = S.photo ? `<img alt="" src="${S.photo}">` : `<span class="i">${initials}</span>`;

  const launch = document.createElement("button");
  launch.className = "wa-launch"; launch.type = "button"; launch.setAttribute("aria-label", `Ask ${NAME}'s assistant`);
  launch.innerHTML = `<span class="wa-tip glass">Ask me anything about ${NAME}</span><span class="wa-av">${avatar}</span>`;

  const panel = document.createElement("section");
  panel.className = "wa-panel glass"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", `${NAME}'s assistant`);
  panel.innerHTML = `
    <div class="wa-head">${avatar}<div><b>${NAME}'s Assistant</b><small>Online · answers from his profile</small></div><button class="wa-x" type="button" aria-label="Close">×</button></div>
    <div class="wa-body" id="waBody" aria-live="polite"></div>
    <div class="wa-sugg" id="waSugg"></div>
    <form class="wa-form" id="waForm"><input id="waInput" type="text" placeholder="Ask about ${NAME}…" autocomplete="off" maxlength="300" aria-label="Your question"><button type="submit" aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>
    <div class="wa-note">Can't find an answer? It goes straight to ${NAME} on WhatsApp.</div>`;
  document.body.append(panel, launch);

  const body = panel.querySelector("#waBody"), sugg = panel.querySelector("#waSugg"), input = panel.querySelector("#waInput");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let started = false, busy = false;

  function add(html, who){ const m = document.createElement("div"); m.className = `wa-msg ${who}`; m.innerHTML = html; body.appendChild(m); body.scrollTop = body.scrollHeight; return m; }
  function chips(list){ sugg.innerHTML = (list || []).map(q => `<button type="button" class="wa-chip">${esc(q)}</button>`).join(""); }
  function contactBtns(q){
    const parts = [];
    if (S.whatsapp) parts.push(`<a class="wa-btn wa-green" href="${wa(q ? `Hi ${NAME}, I visited your portfolio and have a question: ${q}` : `Hi ${NAME}, I visited your portfolio and would like to discuss a project.`)}" target="_blank" rel="noopener">WhatsApp ${NAME}</a>`);
    if (S.email) parts.push(`<button type="button" class="wa-btn ghost" data-copy-mail>Copy email</button>`);
    return parts.join("");
  }
  function reply(q){
    const e = best(q);
    let html, next;
    if (e){
      html = e.answer;
      const acts = [];
      if (e.action) acts.push(e.action.filter ? `<button type="button" class="wa-btn" data-filter="${esc(e.action.filter)}">${esc(e.action.label)}</button>` : `<a class="wa-btn" href="${e.action.href}" data-close>${esc(e.action.label)}</a>`);
      for (const [label, url] of (e.links || [])) acts.push(`<a class="wa-btn ghost" href="${url}" target="_blank" rel="noopener">${esc(label)} ↗</a>`);
      if (e.contact) acts.push(contactBtns(e.id === "hire" || e.id === "price" ? "" : ""));
      if (acts.length) html += `<div class="wa-acts">${acts.join("")}</div>`;
      next = e.next || SUGGEST.filter(s => s.toLowerCase() !== q.toLowerCase()).slice(0, 3);
    } else {
      html = `I don't have an answer to that yet, but ${NAME} can answer it himself. Send it to him in one tap:<div class="wa-acts">${contactBtns(q)}</div>`;
      next = SUGGEST.slice(0, 3);
    }
    const t = document.createElement("div"); t.className = "wa-typing"; t.innerHTML = "<i></i><i></i><i></i>"; body.appendChild(t); body.scrollTop = body.scrollHeight;
    busy = true;
    setTimeout(() => { t.remove(); add(html, "bot"); chips(next); busy = false; }, Math.min(1400, 450 + html.length * 2));
  }
  function ask(q){ q = q.trim(); if (!q || busy) return; add(esc(q), "me"); chips([]); reply(q); }

  function open(){
    panel.classList.add("open"); launch.classList.remove("tip");
    if (!started){ started = true; add(`Hi! 👋 I'm ${NAME}'s assistant. Ask me about his experience, skills, work or availability.`, "bot"); chips(SUGGEST); }
    setTimeout(() => input.focus({ preventScroll:true }), 250);
  }
  function close(){ panel.classList.remove("open"); }

  launch.addEventListener("click", () => panel.classList.contains("open") ? close() : open());
  panel.querySelector(".wa-x").addEventListener("click", close);
  panel.querySelector("#waForm").addEventListener("submit", e => { e.preventDefault(); ask(input.value); input.value = ""; });
  addEventListener("keydown", e => { if (e.key === "Escape" && panel.classList.contains("open")) close(); });
  panel.addEventListener("click", e => {
    const c = e.target.closest(".wa-chip"); if (c){ ask(c.textContent); return; }
    const f = e.target.closest("[data-filter]");
    if (f){
      try { active = f.dataset.filter; renderFilters(); renderWall(); } catch(_){}
      document.getElementById("work")?.scrollIntoView({ behavior:"smooth" });
      if (innerWidth < 700) close();
      return;
    }
    if (e.target.closest("[data-close]") && innerWidth < 700) close();
    const m = e.target.closest("[data-copy-mail]");
    if (m){
      const done = () => { m.textContent = "Email copied"; };
      try { navigator.clipboard.writeText(S.email).then(done, () => { m.textContent = S.email; }); } catch(_){ m.textContent = S.email; }
    }
  });
  setTimeout(() => { if (!started) launch.classList.add("tip"); setTimeout(() => launch.classList.remove("tip"), 6000); }, 4000);
})();
