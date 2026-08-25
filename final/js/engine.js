/* ============================================================================
   engine.js — THE CAMERA
   ----------------------------------------------------------------------------
   A 16:9 stage, 1600x900 design units. z = 1 means the stage width shows 1600
   world units. The camera holds (x, y, z) and nothing else.

   Two things here are worth knowing:

   1. Zoom is interpolated geometrically, not linearly. Panning is tied to the
      geometric zoom, so a 40x pull-back reads as one continuous move at
      roughly constant apparent speed instead of lurching. (van Wijk & Nuij.)

   2. Detail is level-of-detail crossfaded by zoom. There are five bands of
      hatching over progressively narrower strips of the mountain; the ground
      is drawn more finely the closer you get, which is what makes the descent
      feel like a descent rather than a scale() on a picture.
   ========================================================================= */
(function () {
  const S = window.SIS;
  const DESIGN_W = 1600, DESIGN_H = 900;

  const $ = (id) => document.getElementById(id);
  const stage = $('stage'), world = $('world'), art = $('art'), plateHost = $('plates');

  let SW = DESIGN_W, SH = DESIGN_H, fit = 1;
  const cam = { x: 0, y: 0, z: 1 };

  let instant = /[?&]instant=1/.test(location.search) ||
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- state -- */
  const state = Object.assign({ line: 1 }, S.DEFAULT_SET);
  const tweens = [];                       // {obj,key,from,to,t0,dur,ease}
  let camTween = null;
  let raf = 0;

  const EASE = {
    io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    slow: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2.4) / 2),
    out: (t) => 1 - Math.pow(1 - t, 3),
    lin: (t) => t,
  };

  /* --------------------------------------------------------------- layout -- */
  function layout() {
    const vw = innerWidth, vh = innerHeight;
    const r = DESIGN_W / DESIGN_H;
    if (vw / vh > r) { SH = vh; SW = vh * r; } else { SW = vw; SH = vw / r; }
    stage.style.width = SW + 'px';
    stage.style.height = SH + 'px';
    fit = SW / DESIGN_W;
    placeText();
    placePlates();
    apply();
  }

  function apply() {
    const k = cam.z * fit;
    world.style.transform =
      'translate(' + SW / 2 + 'px,' + SH / 2 + 'px) scale(' + k + ') translate(' +
      -cam.x + 'px,' + -cam.y + 'px)';
    art.style.setProperty('--u', 1 / k + 'px');
    lod(cam.z);
  }

  /* ------------------------------------------------------------------ LOD -- */
  /* [fade-in start, full from, full to, fade-out end] in camera z. */
  const BANDS = {
    far: [0, 0, 1.0, 2.0],
    hatch0: [0, 0, 0.95, 2.20],
    hatch1: [0.55, 0.95, 4.2, 6.2],
    hatch2: [1.30, 2.00, 16, 24],
    hatch3: [7.0, 9.5, 40, 60],
    hatch4: [26, 34, 220, 400],
  };
  const lodv = {};
  function ramp(z, b) {
    if (z <= b[0] || z >= b[3]) return 0;
    if (z < b[1]) return (z - b[0]) / (b[1] - b[0]);
    if (z > b[2]) return 1 - (z - b[2]) / (b[3] - b[2]);
    return 1;
  }
  function lod(z) {
    for (const k in BANDS) lodv[k] = ramp(z, BANDS[k]);
    paint();
  }

  /* ------------------------------------------------------------- painting -- */
  /* Layers whose opacity is simply the state value of the same name. */
  const PLAIN = ['gfill:rock', 'ridge:line', 'axes', 'curmark', 'curve', 'ruler', 'humanrule',
    'cands', 'newland', 'marks', 'body:ball', 'sound',
    'cyc1', 'cyc2', 'cyc3', 'cyc4', 'approx1', 'approx2',
    'approx3', 'entropy', 'mi', 'comm', 'surprise', 'kl', 'fisher', 'fork1', 'fork2', 'fork3',
    'combR', 'combE', 'combJ', 'latent', 'astro1', 'astro2', 'shift', 'here', 'ends',
    'tablebg', 'loop1', 'loop2', 'loop3', 'leaner',
    'mythfig', 'sitfig', 'hatfig', 'meetfig', 'pusher', 'climber', 'climber2']
    .map((s) => { const p = s.split(':'); return { layer: p[0], key: p[1] || p[0] }; });

  let lastM = -1, lastRoll = -1, lastMyth = -1, lastMeet = -1;
  function paint() {
    const L = S.L;
    L.far.style.opacity = state.far * (lodv.far || 0);
    for (let i = 0; i <= 4; i++) {
      L['hatch' + i].style.opacity = state.rock * (lodv['hatch' + i] || 0);
    }
    for (const p of PLAIN) L[p.layer].style.opacity = state[p.key];
    if (state.m !== lastM) { lastM = state.m; S.setRuler(state.m); }
    if (state.roll !== lastRoll) { lastRoll = state.roll; S.setRoll(state.roll); }
    if (state.myth !== lastMyth) { lastMyth = state.myth; S.setMyth(state.myth); }
    if (state.meet !== lastMeet) { lastMeet = state.meet; S.setMeet(state.meet); }
  }

  /* --------------------------------------------------------------- tweens -- */
  function tweenTo(key, to, dur, ease) {
    for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].key === key) tweens.splice(i, 1);
    if (state[key] === to) return;
    if (instant || !dur) { state[key] = to; paint(); return; }
    tweens.push({ key: key, from: state[key], to: to, t0: performance.now(), dur: dur, ease: ease || 'io' });
    start();
  }

  /* Geometric zoom with pan tied to it — see the note at the top. */
  function moveTo(target, dur, ease) {
    const from = { x: cam.x, y: cam.y, z: cam.z };
    if (instant || !dur) {
      cam.x = target.x; cam.y = target.y; cam.z = target.z; apply(); return;
    }
    world.classList.add('moving');
    camTween = { from: from, to: target, t0: performance.now(), dur: dur, ease: ease || 'io' };
    start();
  }

  function stepCam(u) {
    const c = camTween, a = c.from, b = c.to;
    const w0 = DESIGN_W / a.z, w1 = DESIGN_W / b.z;
    const w = w0 * Math.pow(w1 / w0, u);
    let s;
    if (Math.abs(w1 - w0) < 1e-6) s = u;
    else s = (w0 - w) / (w0 - w1);
    cam.x = a.x + (b.x - a.x) * s;
    cam.y = a.y + (b.y - a.y) * s;
    cam.z = DESIGN_W / w;
  }

  function start() { if (!raf) raf = requestAnimationFrame(frame); }

  function frame(now) {
    raf = 0;
    let busy = false;
    if (camTween) {
      const u = Math.min(1, (now - camTween.t0) / camTween.dur);
      stepCam(EASE[camTween.ease](u));
      apply();
      if (u < 1) busy = true;
      else { camTween = null; world.classList.remove('moving'); }
    }
    for (let i = tweens.length - 1; i >= 0; i--) {
      const t = tweens[i];
      const u = Math.min(1, (now - t.t0) / t.dur);
      state[t.key] = t.from + (t.to - t.from) * EASE[t.ease](u);
      if (u >= 1) tweens.splice(i, 1); else busy = true;
    }
    if (tweens.length || camTween) paint();
    if (!instant && S.setHang && state.tablebg > 0.01) {
      S.setHang(now);
      busy = true;
    }
    if (busy) raf = requestAnimationFrame(frame);
  }

  /* ================================================================ build == */
  const SCENES = S.SCENES;

  function resolveCam(sc) {
    const c = typeof sc.camera === 'function' ? sc.camera() : sc.camera;
    const out = {};
    for (const k of ['x', 'y', 'z']) out[k] = typeof c[k] === 'function' ? c[k]() : c[k];
    return out;
  }

  /* frame fraction -> world */
  function fx(c, f) { return c.x - DESIGN_W / 2 / c.z + (f * DESIGN_W) / c.z; }
  function fy(c, f) { return c.y - DESIGN_H / 2 / c.z + (f * DESIGN_H) / c.z; }

  /* The camera in force at beat k: the scene's, unless an earlier beat nudged
     it. Words and plates are placed against the camera of the beat they first
     appear on, so a nudge does not shove them off the frame. */
  function camFor(sc, k) {
    let c = sc._cam;
    const steps = sc.steps || [];
    for (let i = 0; i <= k && i < steps.length; i++) if (steps[i]._cam) c = steps[i]._cam;
    return c;
  }

  function buildText() {
    const host = $('texts');
    SCENES.forEach((sc) => {
      sc._cam = resolveCam(sc);
      /* a beat may nudge the camera — resolved here, used in show() */
      (sc.steps || []).forEach((st) => { if (st.camera) st._cam = resolveCam(st); });
      (sc.text || []).forEach((t) => {
        const d = document.createElement('div');
        d.className = 'tb ' + (t.cls || '');
        d.innerHTML = t.html;
        d.dataset.scene = sc.id;
        t._el = d;
        host.appendChild(d);
      });
    });
  }

  function placeText() {
    SCENES.forEach((sc) => {
      (sc.text || []).forEach((t) => {
        const c = camFor(sc, t.from || 0);
        t._el.style.width = t.w + 'px';
        t._el.style.transform =
          'translate(' + fx(c, t.at[0]) + 'px,' + fy(c, t.at[1]) + 'px) scale(' + 1 / c.z + ')';
      });
    });
  }

  /* -------------------------------------------------------------- plates --
     Rasters placed in the world, not pasted on the screen: a drawing feathered
     into the paper (`mask`), or a figure laid on the page with a hairline frame
     and a caption in the deck's own type. Positioned and sized exactly like
     text — frame fractions and stage pixels — so they can be nudged by eye.
     The mask geometry here must match the radial-gradient in deck.css.       */
  const MASK = { cx: 0.55, cy: 0.44, rx: 0.34 };

  function buildPlates() {
    SCENES.forEach((sc) => (sc.plates || []).forEach((p) => {
      const d = document.createElement('div');
      d.className = 'plate' + (p.mask ? ' feather' : '') +
        (p.blend ? ' blend' : '') + (p.frame ? ' framed' : '');
      d.innerHTML = '<img src="' + p.src + '" alt="' + (p.alt || '') + '" decoding="async">' +
        (p.cap ? '<p class="cap">' + p.cap + '</p>' : '');
      p._el = d;
      plateHost.appendChild(d);
    }));
  }

  function placePlates() {
    SCENES.forEach((sc) => {
      (sc.plates || []).forEach((p) => {
        const c = camFor(sc, p.from || 0);
        // sized in stage pixels and scaled by 1/z, exactly like a text block,
        // so frames and captions keep their weight at any zoom.
        // for a feathered plate, p.w is the width of the *visible* ellipse
        const W = p.mask ? p.w / (2 * MASK.rx) : p.w;
        const ax = p.mask ? MASK.cx : 0.5, ay = p.mask ? MASK.cy : 0.5;
        p._el.style.width = W + 'px';
        p._el.style.transform = 'translate(' +
          (fx(c, p.at[0]) - (ax * W) / c.z) + 'px,' +
          (fy(c, p.at[1]) - (ay * W * p.ar) / c.z) + 'px) scale(' + 1 / c.z + ')';
      });
    });
  }

  /* ============================================================== playback = */
  let si = 0, bi = 0;
  let routeName = 'full', route = null;

  function stepsOf(sc) { return sc.steps && sc.steps.length ? sc.steps : [{}]; }

  function flatBeat(i, k) {
    let n = 0;
    for (let j = 0; j < i; j++) n += stepsOf(SCENES[j]).length;
    return n + k;
  }

  function buildRoute(name) {
    if (!name || name === 'full') return null;
    const raw = S.ROUTES && S.ROUTES[name];
    if (!raw) return null;
    const entries = [];
    raw.forEach((r) => {
      const id = Array.isArray(r) ? r[0] : r.id;
      const k = Array.isArray(r) ? r[1] : r.step;
      const i = typeof id === 'number' ? id : SCENES.findIndex((s) => s.id === id);
      if (i < 0 || i >= SCENES.length) return;
      entries.push({ si: i, bi: Math.max(0, Math.min(stepsOf(SCENES[i]).length - 1, k || 0)) });
    });
    return entries.length ? entries : null;
  }

  function routeIndex(i, k) {
    if (!route) return -1;
    return route.findIndex((r) => r.si === i && r.bi === k);
  }

  function routeNextIndex() {
    if (!route) return -1;
    const here = routeIndex(si, bi);
    if (here >= 0) return here < route.length - 1 ? here + 1 : -1;
    const f = flatBeat(si, bi);
    return route.findIndex((r) => flatBeat(r.si, r.bi) > f);
  }

  function routePrevIndex() {
    if (!route) return -1;
    const here = routeIndex(si, bi);
    if (here >= 0) return here > 0 ? here - 1 : -1;
    const f = flatBeat(si, bi);
    for (let i = route.length - 1; i >= 0; i--) if (flatBeat(route[i].si, route[i].bi) < f) return i;
    return -1;
  }

  function routeFirstInScene(i) {
    if (!route) return -1;
    return route.findIndex((r) => r.si === i);
  }

  function setFor(sc, k) {
    const merged = Object.assign({ line: 1 }, S.DEFAULT_SET, sc.set || {});
    const steps = stepsOf(sc);
    for (let i = 0; i <= k && i < steps.length; i++) Object.assign(merged, steps[i].set || {});
    return merged;
  }

  function show(i, k, opts) {
    opts = opts || {};
    const sc = SCENES[i];
    const steps = stepsOf(sc);
    k = Math.max(0, Math.min(steps.length - 1, k));
    const sceneChanged = i !== si || opts.force;
    si = i; bi = k;

    const target = camFor(sc, k);
    const dur = sceneChanged ? (sc.enter && sc.enter.dur) || 1500 : 900;
    const ease = (sc.enter && sc.enter.ease) || 'io';
    if (sceneChanged || target !== show._target) moveTo(target, dur, ease);
    show._target = target;

    // layers
    const want = setFor(sc, k);
    const anim = (steps[k] && steps[k].anim) || {};
    for (const key in want) {
      const d = anim[key] != null ? anim[key] : (sceneChanged ? Math.min(dur, 1100) : 620);
      tweenTo(key, want[key], d);
    }

    // words and plates
    document.querySelectorAll('.tb, .plate').forEach((e) => e.classList.remove('on'));
    const revealAt = sceneChanged && !instant ? dur * 0.45 : 0;
    clearTimeout(show._t);
    show._t = setTimeout(() => {
      [].concat(sc.text || [], sc.plates || []).forEach((t) => {
        const from = t.from || 0, to = t.to != null ? t.to : 99;
        if (bi >= from && bi <= to) t._el.classList.add('on');
      });
    }, revealAt);

    chrome(sc, k, steps.length);
    location.replace('#' + sc.id + (k ? '/' + k : ''));
  }

  function chrome(sc, k, n) {
    $('hud-name').textContent = sc.name;
    if (route) {
      const ri = routeIndex(si, k);
      $('hud-num').textContent =
        routeName + ' ' + (ri >= 0 ? (ri + 1) : '?') + '/' + route.length +
        '  ·  scene ' + (si + 1) + '/' + SCENES.length;
    } else {
      $('hud-num').textContent = (si + 1) + '/' + SCENES.length + (n > 1 ? '  ·  ' + (k + 1) + '/' + n : '');
    }
    const dots = $('dots').children;
    for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('on', i <= si);
    const st = stepsOf(sc)[k];
    $('notes-body').textContent = (st && st.notes) || sc.notes || '';
  }

  function next() {
    if (route) {
      const ri = routeNextIndex();
      if (ri >= 0) show(route[ri].si, route[ri].bi);
      return;
    }
    const steps = stepsOf(SCENES[si]);
    if (bi < steps.length - 1) show(si, bi + 1);
    else if (si < SCENES.length - 1) show(si + 1, 0);
  }
  function prev() {
    if (route) {
      const ri = routePrevIndex();
      if (ri >= 0) show(route[ri].si, route[ri].bi);
      return;
    }
    if (bi > 0) show(si, bi - 1);
    else if (si > 0) show(si - 1, stepsOf(SCENES[si - 1]).length - 1);
  }

  /* ================================================================= input = */
  function toggleOverlay(id) {
    const on = $(id).classList.contains('on');
    document.querySelectorAll('.overlay').forEach((o) => o.classList.remove('on'));
    if (!on) $(id).classList.add('on');
  }

  const jump = { d: '', t: 0 };

  addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'ArrowDown') { next(); e.preventDefault(); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp') { prev(); e.preventDefault(); }
    else if (k === 'Home') route ? show(route[0].si, route[0].bi) : show(0, 0);
    else if (k === 'End') route ? show(route[route.length - 1].si, route[route.length - 1].bi) : show(SCENES.length - 1, 0);
    else if (k >= '0' && k <= '9') {
      /* Jump on the first digit, then reinterpret if a second arrives quickly,
         so "7" is instant and "1 4" still reaches scene 14. */
      const now = performance.now();
      const two = now - jump.t < 550 ? +(jump.d + k) : 0;
      jump.d = two ? '' : k;
      jump.t = two ? 0 : now;
      const i = (two || +k) - 1;
      if (i >= 0 && i < SCENES.length) {
        document.querySelectorAll('.overlay').forEach((o) => o.classList.remove('on'));
        const ri = routeFirstInScene(i);
        if (ri >= 0) show(route[ri].si, route[ri].bi);
        else show(i, 0);
      }
    }
    else if (k === 'g' || k === 'G' || k === 'Escape') toggleOverlay('index');
    else if (k === '?' || k === '/') toggleOverlay('help');
    else if (k === 'n' || k === 'N') $('notes').classList.toggle('on');
    else if (k === 'h' || k === 'H') document.body.classList.toggle('bare');
    else if (k === 'a' || k === 'A') {
      instant = !instant;
      $('hud-name').textContent = instant ? 'animation off' : 'animation on';
      setTimeout(() => chrome(SCENES[si], bi, stepsOf(SCENES[si]).length), 900);
    }
    else if (k === 'f' || k === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
  });

  addEventListener('resize', layout);

  /* ================================================================== boot = */
  function grain() {
    const n = 180, c = document.createElement('canvas');
    c.width = c.height = n;
    const g = c.getContext('2d'), im = g.createImageData(n, n);
    const r = S.mulberry32(99991);
    for (let i = 0; i < n * n; i++) {
      const v = 236 + r() * 19;
      im.data[i * 4] = v - 4; im.data[i * 4 + 1] = v; im.data[i * 4 + 2] = v - 2;
      im.data[i * 4 + 3] = 255;
    }
    g.putImageData(im, 0, 0);
    $('grain').style.backgroundImage = 'url(' + c.toDataURL() + ')';
    $('grain').style.backgroundSize = '190px 190px';
  }

  function boot() {
    grain();
    S.buildWorld();
    buildText();
    buildPlates();

    const q = new URLSearchParams(location.search);
    routeName = q.get('route') || (q.get('short') === '1' ? 'short' : 'full');
    route = buildRoute(routeName);
    if (!route) routeName = 'full';
    else document.body.dataset.route = routeName;

    const dots = $('dots');
    SCENES.forEach(() => dots.appendChild(document.createElement('i')));
    const list = $('index-list');
    SCENES.forEach((sc, i) => {
      const li = document.createElement('li');
      li.innerHTML = '<span>' + (i + 1) + '</span>' + sc.name;
      li.onclick = () => {
        toggleOverlay('index');
        const ri = routeFirstInScene(i);
        if (ri >= 0) show(route[ri].si, route[ri].bi);
        else show(i, 0);
      };
      list.appendChild(li);
    });

    layout();

    // deep link: #sceneId or #sceneId/step, or ?scene=id&step=n
    // &bare=1 hides the on-screen furniture; &notext=1 hides the HTML text
    // layer (both used by the pptx exporter, which rebuilds text natively)
    if (q.get('bare') === '1') document.body.classList.add('bare');
    if (q.get('notext') === '1') $('texts').style.display = 'none';
    let id = q.get('scene'), st = +(q.get('step') || 0);
    if (!id && location.hash) {
      const p = location.hash.slice(1).split('/');
      id = p[0]; st = +(p[1] || 0);
    }
    let at = SCENES.findIndex((s) => s.id === id);
    if (at < 0 && route) { at = route[0].si; st = route[0].bi; }
    else at = Math.max(0, at);
    const keep = instant;
    instant = true;
    show(at, st, { force: true });
    instant = keep;
  }

  if (document.readyState === 'complete') boot();
  else addEventListener('load', boot);
})();
