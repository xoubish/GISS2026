/* Linear deck engine for "Photons or Priors".
   Fixed 1280x720 design stage scaled to fit; builds reveal within a slide;
   state is mirrored to a presenter window over BroadcastChannel. */
(function () {
  const STAGE_W = 1280, STAGE_H = 720;
  const stage   = document.getElementById('stage');
  const hud     = document.getElementById('hud');
  const noteBox = document.getElementById('noteBox');
  const bar     = document.querySelector('#progress i');

  const slides = Array.from(document.querySelectorAll('.slide')).map((el, i) => ({
    el, i,
    title:   el.dataset.title   || 'slide ' + (i + 1),
    section: el.dataset.section || '',
    mins:    parseFloat(el.dataset.mins || 0),
    exclusive: el.dataset.builds === 'one',
    builds:  Array.from(el.querySelectorAll('.build')),
    notes:   (el.querySelector('.notes') || {}).innerHTML || ''
  }));
  const TOTAL_MINS = slides.reduce((a, s) => a + s.mins, 0);

  slides.forEach(s => {
    s.el.setAttribute('role', 'group');
    s.el.setAttribute('aria-label', (s.section ? s.section + ': ' : '') + s.title);
    s.el.setAttribute('aria-hidden', 'true');
  });

  /* ---- fit the stage into the viewport (contain) ---- */
  function fit() {
    const k = Math.min(innerWidth / STAGE_W, innerHeight / STAGE_H);
    stage.style.transform = 'translate(-50%,-50%) scale(' + k + ')';
  }
  addEventListener('resize', fit);
  fit();

  /* ---- state ---- */
  let cur = 0, sub = 0, suppressHash = false;

  function applyBuilds() {
    const s = slides[cur];
    s.builds.forEach((el, idx) => {
      const shown = s.exclusive ? sub === idx + 1 : sub >= idx + 1;
      el.classList.toggle('on', shown);
      el.classList.toggle('dim', s.exclusive && sub > 0 && !shown);
    });
  }

  function render(pushHash) {
    const s = slides[cur];
    slides.forEach(o => {
      const on = o === s;
      o.el.classList.toggle('active', on);
      o.el.setAttribute('aria-hidden', on ? 'false' : 'true');
      if (on) o.el.setAttribute('aria-current', 'true');
      else o.el.removeAttribute('aria-current');
    });
    applyBuilds();
    hud.textContent = (s.section ? s.section + '  ·  ' : '') + s.title +
                      '  ·  ' + (cur + 1) + ' / ' + slides.length;
    noteBox.innerHTML = s.notes || '<em>(no notes)</em>';
    bar.style.width = ((cur + 1) / slides.length * 100) + '%';
    if (pushHash !== false) { suppressHash = true; location.hash = '/' + (cur + 1) + (sub ? '.' + sub : ''); }
    broadcast();
  }

  function goto(i, s) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i !== cur) { cur = i; sub = 0; }
    if (typeof s === 'number') sub = Math.max(0, Math.min(s, slides[cur].builds.length));
    render();
  }
  function next() {
    if (sub < slides[cur].builds.length) { sub++; render(); return; }
    if (cur < slides.length - 1) goto(cur + 1);
  }
  function prev() {
    if (sub > 0) { sub--; render(); return; }
    if (cur > 0) { cur--; sub = slides[cur].builds.length; render(); }
  }

  /* ---- presenter link ---- */
  let chan = null;
  try { chan = new BroadcastChannel('giss2026-deck'); } catch (e) { /* file:// */ }
  function broadcast() {
    const msg = { type: 'state', i: cur, sub: sub, total: slides.length, totalMins: TOTAL_MINS };
    if (chan) chan.postMessage(msg);
    else try { localStorage.setItem('giss2026-deck', JSON.stringify(Object.assign({ t: performance.now() }, msg))); } catch (e) {}
  }
  function onCmd(m) {
    if (!m || m.type !== 'cmd') return;
    if (m.cmd === 'next') next();
    else if (m.cmd === 'prev') prev();
    else if (m.cmd === 'goto') goto(m.i, m.sub);
  }
  if (chan) chan.onmessage = e => onCmd(e.data);
  else addEventListener('storage', e => {
    if (e.key === 'giss2026-deck-cmd' && e.newValue) { try { onCmd(JSON.parse(e.newValue)); } catch (err) {} }
  });

  let presenterWin = null;
  function openPresenter() {
    if (presenterWin && !presenterWin.closed) { presenterWin.focus(); return; }
    presenterWin = open('presenter.html', 'giss2026-presenter', 'width=1180,height=760');
    setTimeout(broadcast, 700);
  }

  /* ---- on-stage timer (independent of the presenter window) ---- */
  let timerEl = null, timerStart = null, timerTick = null;
  function toggleTimer() {
    if (timerEl) { clearInterval(timerTick); timerEl.remove(); timerEl = null; return; }
    timerEl = document.createElement('div');
    timerEl.style.cssText = 'position:fixed;z-index:8;left:50%;transform:translateX(-50%);top:12px;' +
      'font:600 15px Arial,sans-serif;color:#e6e1d7;background:rgba(18,20,20,.72);' +
      'padding:6px 14px;border-radius:5px;pointer-events:none;font-variant-numeric:tabular-nums';
    document.body.appendChild(timerEl);
    timerStart = performance.now();
    const paint = () => {
      const el = (performance.now() - timerStart) / 1000;
      const mm = String(Math.floor(el / 60)).padStart(2, '0');
      const ss = String(Math.floor(el % 60)).padStart(2, '0');
      timerEl.textContent = mm + ':' + ss + '  /  ' + TOTAL_MINS.toFixed(1) + ' min';
    };
    paint(); timerTick = setInterval(paint, 1000);
  }

  /* ---- input ---- */
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === ' ' || k === 'PageDown') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); goto(0); }
    else if (k === 'End')  { e.preventDefault(); goto(slides.length - 1); }
    else if (k === 'n' || k === 'N') document.body.classList.toggle('shownotes');
    else if (k === 'p' || k === 'P') openPresenter();
    else if (k === 't' || k === 'T') toggleTimer();
    else if (/^[0-9]$/.test(k)) { /* type a number then Enter */ buffer += k; return; }
    else if (k === 'Enter' && buffer) { goto(parseInt(buffer, 10) - 1); buffer = ''; }
    buffer = /^[0-9]$/.test(k) ? buffer : '';
  });
  let buffer = '';

  let swipe = null, swiped = false;
  const vp = document.getElementById('viewport');
  vp.addEventListener('pointerdown', e => { if (e.pointerType === 'touch') swipe = { x: e.clientX, y: e.clientY }; });
  vp.addEventListener('pointerup', e => {
    if (!swipe || e.pointerType !== 'touch') return;
    const dx = e.clientX - swipe.x, dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.35) {
      swiped = true; dx < 0 ? next() : prev();
      setTimeout(() => { swiped = false; }, 350);
    }
  });
  vp.addEventListener('click', () => { if (!swiped) next(); });

  /* ---- deep links: #/7 or #/7.2 ---- */
  function fromHash() {
    const m = /^#\/(\d+)(?:\.(\d+))?/.exec(location.hash);
    return m ? { i: parseInt(m[1], 10) - 1, sub: parseInt(m[2] || 0, 10) } : null;
  }
  addEventListener('hashchange', () => {
    if (suppressHash) { suppressHash = false; return; }
    const t = fromHash();
    if (t) goto(t.i, t.sub);
  });

  document.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
    const p = document.createElement('p');
    p.className = 'caution';
    p.textContent = 'missing image: ' + img.getAttribute('src');
    img.replaceWith(p);
  }));

  /* print: expose every slide stacked, then restore */
  addEventListener('beforeprint', () => document.body.classList.add('printing'));
  addEventListener('afterprint', () => { document.body.classList.remove('printing'); render(false); });

  const t0 = fromHash();
  cur = t0 && t0.i >= 0 ? Math.min(t0.i, slides.length - 1) : 0;
  sub = t0 ? Math.min(t0.sub, slides[cur].builds.length) : 0;
  render(false);

  /* the presenter window asks for state when it wakes up */
  if (chan) chan.addEventListener('message', e => { if (e.data && e.data.type === 'hello') broadcast(); });
})();
