(function(){
  const canvas = document.getElementById('canvas');
  const steps  = Array.from(document.querySelectorAll('.step'));
  const hud    = document.getElementById('hud');
  const noteBox= document.getElementById('noteBox');
  const bar    = document.createElement('div');
  bar.id = 'progress';
  document.body.appendChild(bar);
  const sectionAccent = {
    'II · Four Rulers': '#2f5f8f',
    'III · The Program': '#477860',
    'Return': '#9a3d42'
  };
  const S = steps.map(el => ({
    el,
    x: parseFloat(el.dataset.x), y: parseFloat(el.dataset.y),
    s: parseFloat(el.dataset.scale || 1),
    id: el.id, title: el.dataset.title || el.id,
    section: el.dataset.section || ''
  }));
  S.forEach(o => {
    o.el.style.left = o.x + 'px';
    o.el.style.top  = o.y + 'px';
    o.el.style.transform = 'translate(-50%,-50%) scale(' + o.s + ')';
    o.el.setAttribute('role', 'group');
    o.el.setAttribute('aria-label', (o.section ? o.section + ': ' : '') + o.title);
    o.el.setAttribute('aria-hidden', 'true');
    o.el.tabIndex = -1;
  });
  const byId = id => S.find(o => o.id === id);

  /* ---- map lines ---- */
  const svg = document.getElementById('decor');
  const B = {x:-9500, y:-4300, w:13400, h:10800};
  svg.setAttribute('viewBox', B.x+' '+B.y+' '+B.w+' '+B.h);
  svg.style.left = B.x+'px'; svg.style.top = B.y+'px';
  svg.style.width = B.w+'px'; svg.style.height = B.h+'px';

  const solid = [
    ['title','rock'],['rock','promise'],['promise','question'],
    ['question','matters'],['matters','data'],['data','model'],
    ['model','compression'],['compression','inference'],
    ['inference','entropy'],['entropy','surprise'],['surprise','kl'],['kl','fisher'],
    ['fisher','fisherastro'],['fisherastro','quad'],['quad','goodenough'],['goodenough','fork'],
    ['fork','expdesign'],['expdesign','joint'],['joint','rubineuclid'],
    ['rubineuclid','foundation'],['foundation','receipts'],['receipts','jaisp'],['jaisp','fisherlatent']
  ];
  const dashed = [
    ['matters','metricdetail'],['metricdetail','prospect'],['data','nuisance'],
    ['compression','sufficiency'],['compression','humanrecompress'],
    ['inference','goodenough'],['goodenough','question'],
    ['fork','matters'],['fork','compression'],
    ['expdesign','expexamples'],['joint','jointhuman'],['rubineuclid','transferflavors'],
    ['foundation','foundationhuman'],
    ['dynamic','endings'],['endings','breakgame']
  ];
  const NS = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(NS,'defs');
  defs.innerHTML = '<marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#6f675b"/></marker>';
  svg.appendChild(defs);

  const lineMap = {};
  function addLine(a, b, isSolid){
    const A = byId(a), Z = byId(b);
    if (!A || !Z) return;
    let x1=A.x, y1=A.y, x2=Z.x, y2=Z.y;
    const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy);
    const tA=560*A.s, tB=560*Z.s;
    if (L > tA+tB+120){
      const ux=dx/L, uy=dy/L;
      x1+=ux*tA; y1+=uy*tA; x2-=ux*tB; y2-=uy*tB;
    }
    const ln = document.createElementNS(NS,'line');
    ln.setAttribute('x1',x1); ln.setAttribute('y1',y1);
    ln.setAttribute('x2',x2); ln.setAttribute('y2',y2);
    if (isSolid) ln.setAttribute('marker-end','url(#arr)');
    svg.appendChild(ln);
    lineMap[a+'|'+b] = ln; lineMap[b+'|'+a] = ln;
  }
  solid.forEach(([a,b]) => addLine(a,b,true));
  dashed.forEach(([a,b]) => addLine(a,b,false));

  const regionTitles = [
    ['the map of inquiry', -1000, -3800, 210, 'map'],
    ['I · the loop of inquiry', 0, -2450, 170, 'regionloop'],
    ['II · four rulers for information', -4000, -2350, 170, 'regioninfo'],
    ['III · the research program', -1200, 5750, 170, 'regionprog'],
    ['the beginning', -5600, -3900, 120, 'title'],
    ['the end', -8600, -2480, 95, 'dynamic']
  ];
  regionTitles.forEach(([t,x,y,fs,target]) => {
    const tx = document.createElementNS(NS,'text');
    tx.setAttribute('x',x); tx.setAttribute('y',y);
    tx.setAttribute('text-anchor','middle'); tx.setAttribute('font-size',fs);
    tx.setAttribute('class','region-title');
    tx.setAttribute('role','button');
    tx.setAttribute('tabindex','0');
    tx.setAttribute('aria-label','Jump to ' + t);
    tx.addEventListener('click', e => { e.stopPropagation(); jumpToId(target); });
    tx.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jumpToId(target); }
    });
    tx.textContent = t;
    svg.appendChild(tx);
  });

  /* ---- camera: van Wijk & Nuij smooth zoom-pan ---- */
  const cam = {cx:0, cy:0, w:2000};   /* world center + visible world width */
  let flight = null;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function applyCam(){
    const vw = innerWidth, vh = innerHeight, k = vw / cam.w;
    canvas.style.transform =
      'translate(' + (vw/2 - k*cam.cx) + 'px,' + (vh/2 - k*cam.cy) + 'px) scale(' + k + ')';
  }
  function flyTo(cx1, cy1, w1, snap){
    if (flight) { cancelAnimationFrame(flight); flight = null; }
    const cx0 = cam.cx, cy0 = cam.cy, w0 = cam.w;
    const dx = cx1 - cx0, dy = cy1 - cy0, u1 = Math.hypot(dx, dy);
    const finish = () => {
      cam.cx = cx1; cam.cy = cy1; cam.w = w1; applyCam();
      canvas.style.willChange = 'auto';
    };
    if (snap || reduceMotion || (u1 < 1 && Math.abs(Math.log(w1/w0)) < .01)) { finish(); return; }
    const rho = 1.42, rho2 = rho*rho;
    let S, u, w;
    if (u1 < 1e-3){
      const sgn = w1 < w0 ? -1 : 1;
      S = Math.abs(Math.log(w1/w0)) / rho;
      u = () => 0;
      w = s => w0 * Math.exp(sgn * rho * s);
    } else {
      const b = i => {
        const wi = i ? w1 : w0;
        return (w1*w1 - w0*w0 + (i ? -1 : 1) * rho2*rho2 * u1*u1) / (2 * wi * rho2 * u1);
      };
      const rr = bi => Math.log(Math.sqrt(bi*bi + 1) - bi);
      const r0 = rr(b(0)), r1 = rr(b(1));
      S = (r1 - r0) / rho;
      u = s => (w0/rho2) * (Math.cosh(r0) * Math.tanh(rho*s + r0) - Math.sinh(r0));
      w = s => w0 * Math.cosh(r0) / Math.cosh(rho*s + r0);
    }
    if (!isFinite(S)) { finish(); return; }
    const D = Math.min(1600, Math.max(650, Math.abs(S) * 380));
    const t0 = performance.now();
    const ease = t => t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;
    canvas.style.willChange = 'transform';
    function frame(now){
      const t = Math.min(1, (now - t0) / D);
      const s = S * ease(t);
      const us = u1 < 1e-3 ? 0 : u(s) / u1;
      cam.cx = cx0 + dx * us; cam.cy = cy0 + dy * us; cam.w = w(s);
      applyCam();
      if (t < 1) flight = requestAnimationFrame(frame);
      else { flight = null; finish(); }
    }
    flight = requestAnimationFrame(frame);
  }

  let cur = 0, prevBeforeMap = 0, suppressHash = false;
  const mapIndex = S.findIndex(o => o.id === 'map');
  function jumpToId(id){
    const i = S.findIndex(o => o.id === id);
    if (i >= 0) goto(i);
  }

  function markWalked(a, b){
    const ln = lineMap[a+'|'+b];
    if (ln) ln.classList.add('walked');
  }

  /* ---- in-place builds: alternatives revealed one at a time, no satellite stops ---- */
  let sub = 0;
  const buildsOf = o => Array.from(o.el.querySelectorAll('.build'));
  function lightLinesFor(id, only){
    Object.values(lineMap).forEach(ln => ln.classList.remove('lit'));
    if (only){
      const ln = lineMap[id+'|'+only];
      if (ln) ln.classList.add('lit');
      return;
    }
    Object.keys(lineMap).forEach(key => {
      const [a,b] = key.split('|');
      if (a === id || b === id) lineMap[key].classList.add('lit');
    });
  }
  function applyBuild(){
    const o = S[cur], bs = buildsOf(o);
    bs.forEach((el, idx) => {
      el.classList.toggle('on', sub === idx+1);
      el.classList.toggle('dim', sub > 0 && sub !== idx+1);
    });
    if (sub > 0 && bs[sub-1].dataset.exit){
      const exit = bs[sub-1].dataset.exit;
      lightLinesFor(o.id, exit);
      markWalked(o.id, exit);
    } else {
      lightLinesFor(o.id);
    }
  }
  function goto(i, pushHash, snap){
    if (i < 0 || i >= S.length) return;
    const from = S[cur];
    cur = i;
    const o = S[i], vw = innerWidth, vh = innerHeight;
    const w = Math.max(o.el.offsetWidth, 400);
    const h = Math.max(o.el.offsetHeight, 200);
    const k = Math.min(0.86*vw/(w*o.s), 0.82*vh/(h*o.s));
    flyTo(o.x, o.y, vw / k, snap);
    const friend = o.el.dataset.friend;
    steps.forEach(el => {
      const isActive = el === o.el || (friend && el.id === friend);
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      if (el === o.el) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    });
    document.body.classList.toggle('overview', !!o.el.dataset.overview);
    markWalked(from.id, o.id);
    if (o.el.dataset.mark) markWalked(o.el.dataset.mark, o.id);
    if (o !== from){
      sub = 0;
      document.querySelectorAll('.build').forEach(b => b.classList.remove('on','dim'));
    }
    if (sub === 0) lightLinesFor(o.id);
    hud.textContent = o.section + '  ·  ' + o.title + '  ·  ' + (i+1) + ' / ' + S.length;
    bar.style.width = (100 * (i+1) / S.length) + '%';
    bar.style.background = sectionAccent[o.section] || '#68717a';
    const n = o.el.querySelector('.notes');
    noteBox.innerHTML = n ? n.innerHTML : '<em>(no notes for this step)</em>';
    if (pushHash !== false) { suppressHash = true; location.hash = '/' + o.id; }
  }
  const next = () => {
    const bs = buildsOf(S[cur]);
    if (sub < bs.length){ sub++; applyBuild(); return; }
    goto(Math.min(cur+1, S.length-1));
  };
  const prev = () => {
    if (sub > 0){ sub--; applyBuild(); return; }
    const t = Math.max(cur-1, 0);
    if (t === cur) return;
    goto(t);
    const bs = buildsOf(S[cur]);
    if (bs.length){ sub = bs.length; applyBuild(); }
  };

  /* data-mark: walked-line fallback where the walk detours through subs */
  const marks = {question:'promise', data:'matters', model:'data', compression:'model',
    inference:'compression', entropy:'inference', humanrecompress:'compression',
    expdesign:'fork', joint:'expdesign', rubineuclid:'joint',
    foundation:'rubineuclid', receipts:'foundation', jaisp:'receipts', fisherlatent:'jaisp'};
  Object.keys(marks).forEach(id => { const o = byId(id); if (o) o.el.dataset.mark = marks[id]; });

  function hashTarget(){
    const parts = location.hash.slice(2).split('.');
    return { i: S.findIndex(o => o.id === parts[0]), s: parseInt(parts[1], 10) || 0 };
  }
  addEventListener('hashchange', () => {
    if (suppressHash) { suppressHash = false; return; }
    const t = hashTarget();
    if (t.i >= 0 && t.i !== cur){
      goto(t.i, false);
      if (t.s > 0){ sub = Math.min(t.s, buildsOf(S[cur]).length); applyBuild(); }
    }
  });
  addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') goto(0);
    else if (e.key === 'End') goto(S.length-1);
    else if (e.key === 'o' || e.key === 'O' || e.key === 'Escape') {
      if (S[cur].el.dataset.overview) goto(prevBeforeMap);
      else { prevBeforeMap = cur; goto(mapIndex); }
    }
    else if (e.key === 'n' || e.key === 'N') document.body.classList.toggle('shownotes');
  });
  let swipeStart = null, suppressClickAfterSwipe = false;
  const viewport = document.getElementById('viewport');
  viewport.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') swipeStart = {x:e.clientX, y:e.clientY};
  });
  viewport.addEventListener('pointerup', e => {
    if (!swipeStart || e.pointerType !== 'touch') return;
    const dx = e.clientX - swipeStart.x;
    const dy = e.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.35) {
      suppressClickAfterSwipe = true;
      if (dx < 0) next(); else prev();
      setTimeout(() => { suppressClickAfterSwipe = false; }, 350);
    }
  });
  viewport.addEventListener('click', e => {
    if (suppressClickAfterSwipe) return;
    const stepEl = e.target.closest('.step');
    if (stepEl && stepEl !== S[cur].el) {
      const i = S.findIndex(o => o.el === stepEl);
      if (i >= 0) { goto(i); return; }
    }
    next();
  });
  addEventListener('resize', () => goto(cur, false, true));
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => goto(cur, false, true));
    img.addEventListener('error', () => {
      const ph = document.createElement('p');
      ph.className = 'caution';
      ph.textContent = 'missing image: ' + img.getAttribute('src');
      img.replaceWith(ph);
    });
  });

  /* bake the sketch blend once so no per-frame mix-blend-mode cost */
  document.querySelectorAll('img.sketch').forEach(img => {
    const bake = () => {
      if (img.dataset.baked) return;
      try {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const g = c.getContext('2d');
        g.fillStyle = '#fbf8f0'; g.fillRect(0, 0, c.width, c.height);
        g.globalCompositeOperation = 'multiply';
        g.drawImage(img, 0, 0);
        c.className = img.className + ' baked';
        c.setAttribute('style', img.getAttribute('style') || '');
        img.dataset.baked = '1';
        img.replaceWith(c);
      } catch (e) { /* keep the blended img */ }
    };
    if (img.complete && img.naturalWidth) bake();
    else img.addEventListener('load', bake);
  });

  const t0 = hashTarget();
  goto(t0.i >= 0 ? t0.i : 0, false, true);
  if (t0.i >= 0 && t0.s > 0){ sub = Math.min(t0.s, buildsOf(S[cur]).length); applyBuild(); }
})();
