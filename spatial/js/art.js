/* ============================================================================
   art.js — THE PEN
   ----------------------------------------------------------------------------
   Everything visible is generated here, once, at load, from terrain.js. The
   aesthetic target is the title drawing: scribbled pen on warm paper, dense at
   the ridge, dissolving downward into blank page.

   Ground detail is built at five levels (LOD0..LOD4) over progressively
   narrower strips of x, each with its own band depth and stroke length.
   engine.js crossfades them by camera zoom, so the hillside is drawn with a
   finer pen the closer you get and never looks like a vector shape being
   scaled up.

   Stroke widths are set in CSS as multiples of var(--u) — world units per
   screen pixel — so a pen line stays ~1px wide at every zoom.
   ========================================================================= */
(function () {
  const S = (window.SIS = window.SIS || {});
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a) => { const e = document.createElementNS(NS, n); if (a) for (const k in a) e.setAttribute(k, a[k]); return e; };
  const f2 = (v) => v.toFixed(2);

  /* ------------------------------------------------------------ hatching ---
     A band of pen strokes hanging off the silhouette. Strokes run roughly
     parallel to the local slope and fan gently downhill with depth; density
     and length follow steepness, so cliffs take ink and flat ground stays
     mostly paper. `band` is how deep the ink reaches, in world units — the
     one number that sets the character of each LOD.                         */
  function buildHatch(host, x0, x1, band, seed, groundFn, rows) {
    const rnd = S.mulberry32(seed);
    const g = groundFn || S.ground;
    const ROWS = rows || 8;
    const spacing = band / 20;

    for (let r = 0; r < ROWS; r++) {
      const u = r / (ROWS - 1);
      const depth = band * Math.pow(u, 1.55);
      const jitter = band * (0.02 + 0.10 * u);
      /* Long sweeping strokes at the ridge, short scattered marks deep down —
         ink thins into paper rather than trailing off in straws. */
      const len0 = band * (0.085 - 0.055 * u);
      const len1 = band * (0.230 - 0.155 * u);
      const op = 0.50 * Math.pow(1 - u, 1.3) + 0.035;
      const sp = spacing * (1 + 1.5 * u);

      let d = '';
      let x = x0;
      while (x < x1) {
        const sl = S.slope(x, g);
        const steep = Math.min(1, Math.abs(sl) / 1.05);
        x += sp * (0.55 + 0.9 * rnd());
        if (rnd() > 0.22 + 0.82 * steep) continue;   // flat ground takes less ink

        /* Sweep along the slope, but always tilted into the hill, so no stroke
           can escape above the silhouette where the ridge curves away. */
        const nrm = Math.hypot(1, sl);
        const dir = rnd() < 0.5 ? 1 : -1;
        const phi = (13 + 34 * u + (rnd() - 0.5) * 16) * Math.PI / 180;
        const cp = Math.cos(phi), sn = Math.sin(phi);
        const dx = (dir * cp - sl * sn) / nrm;
        const dy = (dir * sl * cp + sn) / nrm;
        const L = (len0 + (len1 - len0) * rnd()) * (0.4 + 0.85 * steep);

        const sx = x + (rnd() - 0.5) * sp;
        const sy = g(sx) + depth + (rnd() - 0.5) * jitter;
        const bowe = (rnd() - 0.5) * 0.18 * L;
        d += 'M' + f2(sx) + ' ' + f2(sy) +
          'Q' + f2(sx + dx * L * 0.5 - dy * bowe) + ' ' + f2(sy + dy * L * 0.5 + dx * bowe) +
          ' ' + f2(sx + dx * L) + ' ' + f2(sy + dy * L);
      }
      const p = el('path', { d: d, class: 'ink hatch' });
      p.style.opacity = op;
      p.style.strokeWidth = 'calc(var(--u) * ' + (1.05 - 0.25 * u).toFixed(2) + ')';
      host.appendChild(p);
    }

    /* the dark edge right under the ridge */
    let d = '';
    let x = x0;
    const sp0 = spacing * 0.55;
    while (x < x1) {
      const sl = S.slope(x, g);
      const steep = Math.min(1, Math.abs(sl) / 1.05);
      x += sp0 * (0.5 + rnd());
      if (rnd() > 0.30 + 0.7 * steep) continue;
      const nrm = Math.hypot(1, sl);
      const dir = rnd() < 0.5 ? 1 : -1;
      const phi = (18 + 30 * rnd()) * Math.PI / 180;
      const cp = Math.cos(phi), sn = Math.sin(phi);
      const L = band * (0.02 + 0.05 * rnd());
      const sy = g(x) + band * 0.004;
      d += 'M' + f2(x) + ' ' + f2(sy) + 'l' +
        f2(((dir * cp - sl * sn) / nrm) * L) + ' ' +
        f2(((dir * sl * cp + sn) / nrm) * L);
    }
    const pe = el('path', { d: d, class: 'ink hatch' });
    pe.style.opacity = 0.55;
    pe.style.strokeWidth = 'calc(var(--u) * 1.1)';
    host.appendChild(pe);
  }

  /* ------------------------------------------------------- scribble ball ---
     The boulder: an open ball of pen loops, built at the origin with radius 1
     so the caller can scale it.                                             */
  function scribbleBall(seed) {
    const rnd = S.mulberry32(seed);
    let d = '';
    for (let i = 0; i < 15; i++) {
      const rot = rnd() * Math.PI * 2;
      const ra = 0.60 + 0.36 * rnd(), rb = ra * (0.42 + 0.5 * rnd());
      const n = 18;
      for (let k = 0; k <= n; k++) {
        const t = (k / n) * Math.PI * 2;
        const px = Math.cos(t) * ra, py = Math.sin(t) * rb;
        d += (k ? 'L' : 'M') +
          f2(px * Math.cos(rot) - py * Math.sin(rot)) + ' ' +
          f2(px * Math.sin(rot) + py * Math.cos(rot));
      }
    }
    for (let pass = 0; pass < 2; pass++) {
      const n = 54;
      for (let k = 0; k <= n; k++) {
        const t = (k / n) * Math.PI * 2;
        const r = 0.96 + 0.055 * S.vnoise(t * 3.1 + pass * 17);
        d += (k ? 'L' : 'M') + f2(Math.cos(t) * r) + ' ' + f2(Math.sin(t) * r);
      }
    }
    const g = el('g');
    g.appendChild(el('path', { d: d, class: 'ink ball' }));
    return g;
  }

  /* ------------------------------------------------------ jittered lines ---
     Straight rules drawn by hand: axes, ruler, leaders.                     */
  function handLine(x1, y1, x2, y2, wobble, seed) {
    const rnd = S.mulberry32(seed || 4242);
    const n = Math.max(3, Math.min(40, Math.round(Math.hypot(x2 - x1, y2 - y1) / 6)));
    const px = -(y2 - y1), py = x2 - x1;
    const L = Math.hypot(px, py) || 1;
    let d = '';
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const w = (i === 0 || i === n) ? 0 : (rnd() - 0.5) * 2 * wobble;
      d += (i ? 'L' : 'M') + f2(x1 + (x2 - x1) * t + (px / L) * w) + ' ' +
        f2(y1 + (y2 - y1) * t + (py / L) * w);
    }
    return d;
  }
  S.handLine = handLine;

  /* A hand-drawn circle, two passes. */
  function ring(cx, cy, r, seed) {
    let d = '';
    for (let pass = 0; pass < 2; pass++) {
      const n = 40;
      for (let k = 0; k <= n; k++) {
        const t = (k / n) * Math.PI * 2;
        const rr = r * (1 + 0.05 * S.vnoise(t * 2.7 + seed + pass * 31));
        d += (k ? 'L' : 'M') + f2(cx + Math.cos(t) * rr) + ' ' + f2(cy + Math.sin(t) * rr);
      }
    }
    return d;
  }
  S.ring = ring;

  /* ======================================================== build the world */
  S.LAYERS = ['far', 'hatch0', 'hatch1', 'hatch2', 'hatch3', 'hatch4', 'ridge',
    'newland', 'axes', 'curmark', 'curve', 'ruler', 'humanrule', 'cands',
    'sound', 'cyc1', 'cyc2', 'cyc3', 'cyc4',
    'approx1', 'approx2', 'approx3', 'entropy', 'surprise', 'kl',
    'fisher', 'fork1', 'fork2', 'fork3', 'combR', 'combE', 'combJ', 'latent',
    'astro1', 'astro2', 'shift', 'here', 'ends', 'marks', 'body'];

  /* One world unit of θ at the basin is worth this many milliarcseconds. Set
     once here so her measured numbers can be drawn as real widths on the axis
     the talk has already established. */
  const MAS = 2.0;
  S.MAS = MAS;

  S.buildWorld = function () {
    const B = S.BOUNDS;
    const svg = document.getElementById('art');
    svg.setAttribute('viewBox', B.x0 + ' ' + B.y0 + ' ' + (B.x1 - B.x0) + ' ' + (B.y1 - B.y0));
    svg.style.left = B.x0 + 'px';
    svg.style.top = B.y0 + 'px';
    svg.style.width = (B.x1 - B.x0) + 'px';
    svg.style.height = (B.y1 - B.y0) + 'px';

    const L = {};
    S.LAYERS.forEach((k) => { L[k] = el('g', { id: 'l-' + k }); svg.appendChild(L[k]); });
    S.L = L;

    /* ---- distant ranges, the layered peaks of the drawing ---------------- */
    [
      { sx: 0.74, ox: 1750, ay: 0.84, dy: -170, o: 0.34, seed: 61 },
      { sx: 0.55, ox: 3400, ay: 0.70, dy: -330, o: 0.20, seed: 913 },
    ].forEach((D) => {
      const fn = (x) => S.groundBase(x * D.sx + D.ox) * D.ay + D.dy +
        46 * S.vnoise(x / 190 + D.seed);
      const g = el('g');
      g.style.opacity = D.o;
      g.appendChild(el('path', { d: S.toPath(S.samples(B.x0 + 40, B.x1 - 40, fn, 26)), class: 'ink ridge-far' }));
      buildHatch(g, B.x0 + 60, B.x1 - 60, 320, D.seed + 5, fn, 4);
      L.far.appendChild(g);
    });

    /* ---- five levels of ground detail -----------------------------------
       band = how deep the ink reaches; the strip narrows as the band shrinks. */
    buildHatch(L.hatch0, B.x0 + 20, B.x1 - 20, 700, 1001);
    buildHatch(L.hatch1, 900, 4900, 220, 2002);
    buildHatch(L.hatch2, 1860, 2780, 62, 3003);
    buildHatch(L.hatch3, 2095, 2340, 16, 4004);
    buildHatch(L.hatch4, 2176, 2234, 4.2, 5005);

    /* ---- the silhouette ------------------------------------------------- */
    L.ridge.appendChild(el('path', {
      d: S.toPath(S.samples(B.x0 + 10, B.x1 - 10)), class: 'ink ridgeline',
    }));

    /* ---- the landscape after the new survey ----------------------------- */
    (function () {
      const g = L.newland;
      g.appendChild(el('path', {
        d: S.toPath(S.samples(B.x0 + 40, B.x1 - 40, S.groundNew, 20)),
        class: 'ink ridgeline-new',
      }));
      buildHatch(g, B.x0 + 60, B.x1 - 60, 620, 7007, S.groundNew, 6);
      let bx = 5100, by = S.groundNew(bx);
      for (let x = 4400; x < 5900; x += 4) { const y = S.groundNew(x); if (y > by) { by = y; bx = x; } }
      const m = el('g', { class: 'marker' });
      m.appendChild(el('path', { d: ring(bx, by, 46, 9911), class: 'ink ring loud' }));
      g.appendChild(m);
      S.NEWMIN = { x: bx, y: by };
    })();

    /* ---- scene 5: the ledge, framed as a figure -------------------------- */
    (function () {
      const g = L.axes;
      const { x0, x1 } = S.LEDGE;
      let yLo = Infinity, yHi = -Infinity;
      for (let x = x0; x <= x1; x += 1) { const y = S.ground(x); if (y < yLo) yLo = y; if (y > yHi) yHi = y; }
      const ax = x0 - 8, bx = x1 + 8, bot = yHi + 46, top = yLo - 56;
      S.AXBOX = { ax: ax, bx: bx, bot: bot, top: top };

      const grid = el('g');
      for (let i = 1; i <= 4; i++) {
        const y = bot + (top - bot) * (i / 5);
        grid.appendChild(el('path', { d: handLine(ax, y, bx, y, 0.5, 100 + i), class: 'ink gridline' }));
      }
      for (let i = 1; i <= 6; i++) {
        const x = ax + (bx - ax) * (i / 7);
        grid.appendChild(el('path', { d: handLine(x, bot, x, top, 0.5, 200 + i), class: 'ink gridline' }));
      }
      g.appendChild(grid);

      g.appendChild(el('path', { d: handLine(ax, bot, bx, bot, 1.1, 31), class: 'ink axis' }));
      g.appendChild(el('path', { d: handLine(ax, bot, ax, top, 1.1, 32), class: 'ink axis' }));
      for (let i = 0; i <= 7; i++) {
        const x = ax + (bx - ax) * (i / 7);
        g.appendChild(el('path', { d: handLine(x, bot, x, bot + 6, 0.4, 300 + i), class: 'ink axis' }));
      }
      for (let i = 0; i <= 5; i++) {
        const y = bot + (top - bot) * (i / 5);
        g.appendChild(el('path', { d: handLine(ax, y, ax - 6, y, 0.4, 400 + i), class: 'ink axis' }));
      }
      let t = el('text', { x: ax - 13, y: (bot + top) / 2, class: 'glab', 'text-anchor': 'end' });
      t.textContent = 'L'; g.appendChild(t);
      t = el('text', { x: (ax + bx) / 2, y: bot + 20, class: 'glab', 'text-anchor': 'middle' });
      t.textContent = 'θ'; g.appendChild(t);

      /* the minimum you can see at this scale — its own layer, so it can be
         lit in scene 3 and dropped in scene 4 without taking the axes away.
         Centred on the basin, not on A: at this magnification A and B are the
         same place. */
      const mn = { x: S.F.A.c, y: S.ground(S.F.A.c) };
      L.curmark.appendChild(el('path', { d: ring(mn.x, mn.y, 6.5, 555), class: 'ink ring loud' }));
      L.curmark.appendChild(el('path', { d: handLine(mn.x, mn.y + 6.5, mn.x, bot, 0.5, 556), class: 'ink drop' }));
    })();

    /* ---- scenes 6–7: the ruler ------------------------------------------ */
    (function () {
      const g = L.ruler;
      const { x0, x1 } = S.WIN;
      let yHi = -Infinity;
      for (let x = x0; x <= x1; x += 0.25) { const y = S.ground(x); if (y > yHi) yHi = y; }
      const ry = yHi + 6.0;
      S.RULEY = ry;
      g.appendChild(el('path', { d: handLine(x0, ry, x1, ry, 0.14, 71), class: 'ink axis' }));
      const ticks = el('g', { id: 'rule-ticks' });
      g.appendChild(ticks);
      for (let i = 0; i <= 26; i++) {
        ticks.appendChild(el('path', { class: 'ink axis', 'data-big': i % 5 === 0 ? 1 : 0, d: '' }));
      }
      ['A', 'B'].forEach((k) => {
        const m = el('g', { class: 'marker cand', id: 'cand-' + k });
        m.appendChild(el('path', { class: 'ink ring', d: '' }));
        m.appendChild(el('path', { class: 'ink drop', d: '' }));
        m.appendChild(el('circle', { class: 'dot', r: 0.5, cx: 0, cy: 0 }));
        const t = el('text', { class: 'glab sm', 'text-anchor': 'middle' });
        t.textContent = k;
        m.appendChild(t);
        L.cands.appendChild(m);
      });
    })();

    /* ---- the plotted curve (diverges from the ground as the ruler turns) - */
    L.curve.appendChild(el('path', { id: 'plotcurve', class: 'ink plotted', d: '' }));

    /* ---- scene 18: what we are looking back at --------------------------- */
    (function () {
      const g = L.marks;
      const ox = S.F.A.c, oy = S.ground(ox);
      g.appendChild(el('path', { d: ring(ox, oy, 44, 881), class: 'ink ring loud' }));
      g.appendChild(el('path', { d: handLine(ox - 46, oy - 30, 1133, -2417, 5, 882), class: 'ink leader' }));
      S.OLDMIN = { x: ox, y: oy };
    })();

    buildStations(L);

    /* ---- the boulder ---------------------------------------------------- */
    const b = scribbleBall(31337);
    b.setAttribute('id', 'boulder');
    L.body.appendChild(b);
    S.BALL_R = 2.0;

    S.setRuler(0);
    S.setRoll(1);
  };

  /* ========================================================================
     THE STATIONS — everything the middle of the talk needs, drawn into the
     same landscape. No station is a diagram placed beside the mountain: the
     soundings are soundings *of this ground*, the compressions are re-drawings
     of *this curve*, the four rulers are four readings of *this basin*, and
     the astrometry numbers are real widths on the θ axis set up in scene 5.
     ===================================================================== */
  function buildStations(L) {
    const F = S.F, AX = S.AXBOX;
    const LEDGE = S.LEDGE;
    const cmin = F.A.c, ymin = S.ground(cmin);
    const MAS = S.MAS;

    /* small helpers ----------------------------------------------------- */
    function txt(host, x, y, s, cls, anchor) {
      const t = el('text', { x: x, y: y, class: 'glab ' + (cls || ''), 'text-anchor': anchor || 'middle' });
      t.textContent = s;
      host.appendChild(t);
      return t;
    }
    /* A hand-drawn horizontal bracket: |———————| with a label. */
    function bracket(host, xa, xb, y, tick, label, seed) {
      host.appendChild(el('path', { d: handLine(xa, y, xb, y, 0.25, seed), class: 'ink axis' }));
      host.appendChild(el('path', { d: handLine(xa, y - tick, xa, y + tick, 0.2, seed + 1), class: 'ink axis' }));
      host.appendChild(el('path', { d: handLine(xb, y - tick, xb, y + tick, 0.2, seed + 2), class: 'ink axis' }));
      if (label) txt(host, (xa + xb) / 2, y - tick - 2.5, label);
    }
    /* Dashed trail with an arrowhead — a route, not a connector. */
    function trail(host, pts, seed) {
      let d = '';
      for (let i = 0; i < pts.length - 1; i++) {
        d += handLine(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], 1.4, seed + i);
      }
      host.appendChild(el('path', { d: d, class: 'ink trail' }));
      const n = pts.length;
      const dx = pts[n - 1][0] - pts[n - 2][0], dy = pts[n - 1][1] - pts[n - 2][1];
      const m = Math.hypot(dx, dy) || 1;
      const ux = dx / m, uy = dy / m, s = m * 0.09 + 2;
      const hx = pts[n - 1][0], hy = pts[n - 1][1];
      host.appendChild(el('path', {
        class: 'ink axis',
        d: 'M' + f2(hx - ux * s - uy * s * 0.5) + ' ' + f2(hy - uy * s + ux * s * 0.5) +
          'L' + f2(hx) + ' ' + f2(hy) +
          'L' + f2(hx - ux * s + uy * s * 0.5) + ' ' + f2(hy - uy * s - ux * s * 0.5),
      }));
    }
    /* A dashed parabola of curvature a, sitting on the minimum. */
    function parab(host, cx, cy, a, rise, cls) {
      const half = Math.sqrt(rise / a);
      const pts = [];
      for (let i = -40; i <= 40; i++) {
        const x = cx + (i / 40) * half;
        pts.push([x, cy - a * (x - cx) * (x - cx)]);
      }
      host.appendChild(el('path', { d: S.toPath(pts), class: 'ink ' + (cls || 'guide') }));
      return half;
    }
    /* Deterministic pseudo-normal, mean 0, sd 1. */
    function gaussRnd(rnd) { return (rnd() + rnd() + rnd() - 1.5) * 1.633; }

    /* ---- 3 · THE LOOP — data → model → objective → update ---------------
       Pinned to the ground, not floated over it: the soundings are on this
       ledge, the boulder is the current state, and "better" is literally
       downhill. The four words are the four ingredients the whole talk keeps
       returning to; the fourth (stop?) is the one with no axis of its own. */
    (function () {
      const g = (x) => S.ground(x);
      /* data: a handful of soundings where the label stands */
      const rnd = S.mulberry32(3301);
      for (let i = 0; i < 7; i++) {
        const x = 2079 + i * 9.5 + (rnd() - 0.5) * 3;
        const y = g(x) + gaussRnd(rnd) * 2.2, sg = 3.4;
        L.cyc1.appendChild(el('path', { d: handLine(x, y - sg, x, y + sg, 0.18, 3310 + i), class: 'ink errbar' }));
        L.cyc1.appendChild(el('circle', { cx: x, cy: y, r: 1.05, class: 'datum' }));
      }
      txt(L.cyc1, 2107, g(2107) - 24, 'data');
      L.cyc1.appendChild(el('path', { d: handLine(2107, g(2107) - 21, 2107, g(2107) - 7, 0.3, 3330), class: 'ink leader' }));

      /* model: the boulder — the ball layer draws it, this labels it */
      const bx = cmin - 11, by = g(bx);
      txt(L.cyc2, bx - 12, by - 24, 'model — the current state');
      L.cyc2.appendChild(el('path', { d: handLine(bx - 4, by - 20, bx - 1, by - 7, 0.3, 3340), class: 'ink leader' }));

      /* objective: better is a direction, and the direction was chosen */
      trail(L.cyc3, [[bx + 4, g(bx + 4) - 3], [cmin - 2.5, g(cmin - 2.5) - 2]], 3350);
      txt(L.cyc3, 2225, g(2225) - 32, 'objective — downhill');
      L.cyc3.appendChild(el('path', { d: handLine(2214, g(2225) - 29, cmin + 2, g(cmin) - 5, 0.4, 3351), class: 'ink leader' }));

      /* update: the step taken — then the loop closes on new data */
      L.cyc4.appendChild(el('path', { d: ring(cmin - 1.6, g(cmin - 1.6), 2.3, 3360), class: 'ink ring' }));
      txt(L.cyc4, 2280, g(2280) - 14, 'update — then stop?');
      trail(L.cyc4, [[2222, g(2222) - 10], [2200, g(2200) - 58], [2152, g(2152) - 64], [2112, g(2112) - 26]], 3370);
      txt(L.cyc4, 2160, g(2152) - 70, 'new data', 'sm');
    })();

    /* ---- 6 · THE RULER PEOPLE ACTUALLY CARRY ----------------------------
       Kahneman & Tversky measured it and found it bent: value is read from a
       reference point, and losses are spaced about twice as far apart as
       equal gains. Drawn as a third ruler with the same ticks, unevenly laid
       down — the deck's own device, applied to the human case.              */
    (function () {
      const y = S.RULEY + 18, u = 1.0;
      L.humanrule.appendChild(el('path', { d: handLine(cmin - 31, y, cmin + 13, y, 0.14, 1101), class: 'ink axis' }));
      for (let i = -13; i <= 13; i++) {
        const off = i < 0 ? i * u * 2.4 : i * u;
        const big = i % 5 === 0;
        L.humanrule.appendChild(el('path', {
          d: handLine(cmin + off, y, cmin + off, y + (big ? 3.0 : 1.7), 0.1, 1110 + i + 13),
          class: 'ink axis',
        }));
      }
      L.humanrule.appendChild(el('path', { d: handLine(cmin, y - 4.0, cmin, y - 0.5, 0.1, 1150), class: 'ink axis' }));
      txt(L.humanrule, cmin - 17, y + 8.5, 'losses', 'sm');
      txt(L.humanrule, cmin + 8, y + 8.5, 'gains', 'sm');
    })();

    /* ---- 8 · DATA — we never see θ, we see what it generates ------------ */
    (function () {
      const rnd = S.mulberry32(8801);
      const sig = 5.2;
      for (let i = 0; i <= 30; i++) {
        const x = LEDGE.x0 + 8 + ((LEDGE.x1 - LEDGE.x0 - 16) * i) / 30;
        const y = S.ground(x) + gaussRnd(rnd) * sig;
        L.sound.appendChild(el('path', { d: handLine(x, y - sig, x, y + sig, 0.18, 900 + i), class: 'ink errbar' }));
        L.sound.appendChild(el('path', { d: handLine(x - 1.6, y - sig, x + 1.6, y - sig, 0.15, 940 + i), class: 'ink errbar' }));
        L.sound.appendChild(el('path', { d: handLine(x - 1.6, y + sig, x + 1.6, y + sig, 0.15, 980 + i), class: 'ink errbar' }));
        L.sound.appendChild(el('circle', { cx: x, cy: y, r: 1.25, class: 'datum' }));
      }
    })();

    /* ---- 9 · COMPRESSION — the same curve, re-drawn from k numbers ------ */
    function compression(host, knots, seed) {
      const pts = knots.map((k) => [k, S.ground(k)]);
      host.appendChild(el('path', { d: S.toPath(pts), class: 'ink plotted' }));
      knots.forEach((k, i) => host.appendChild(el('circle', { cx: k, cy: S.ground(k), r: 1.3, class: 'knot' })));
      /* what was thrown away */
      let d = '';
      for (let x = knots[0]; x <= knots[knots.length - 1]; x += 2.4) {
        let j = 0;
        while (j < knots.length - 2 && knots[j + 1] < x) j++;
        const t = (x - knots[j]) / (knots[j + 1] - knots[j]);
        const ya = S.ground(knots[j]) + (S.ground(knots[j + 1]) - S.ground(knots[j])) * t;
        d += 'M' + f2(x) + ' ' + f2(ya) + 'L' + f2(x) + ' ' + f2(S.ground(x));
      }
      host.appendChild(el('path', { d: d, class: 'ink resid' }));
      /* where this representation thinks the minimum is */
      let bi = 0;
      pts.forEach((p, i) => { if (p[1] > pts[bi][1]) bi = i; });
      /* argmin of the piecewise line is at a knot */
      host.appendChild(el('path', { d: ring(pts[bi][0], pts[bi][1], 5.5, seed), class: 'ink ring loud' }));
      return pts[bi][0];
    }
    (function () {
      const K = (n) => Array.from({ length: n }, (_, i) => LEDGE.x0 + ((LEDGE.x1 - LEDGE.x0) * i) / (n - 1));
      S.ARG1 = compression(L.approx1, K(15), 1201);          // fine, uniform
      S.ARG2 = compression(L.approx2, K(5), 1202);           // coarse, uniform — loses it
      S.ARG3 = compression(L.approx3,                        // coarse, placed well
        [LEDGE.x0, 2150, 2186, cmin, 2216, 2252, LEDGE.x1], 1203);
    })();

    /* ---- 10 · FOUR RULERS — four readings of one basin ------------------- */
    const A_WIDE = 0.0030, A_NARROW = 0.11, RISE = 26;
    const halfWide = Math.sqrt(RISE / A_WIDE), halfNarrow = Math.sqrt(RISE / A_NARROW);
    (function () {
      bracket(L.entropy, cmin - halfWide, cmin + halfWide, AX.bot - 27, 3.2,
        'broad — much is still possible', 1301);
      bracket(L.entropy, cmin - halfNarrow, cmin + halfNarrow, AX.bot - 13, 3.2, null, 1311);

      /* surprise: one datum a long way from anything the model predicts */
      const sx = 2268, sy = S.ground(sx) - 46;
      L.surprise.appendChild(el('circle', { cx: sx, cy: sy, r: 2.0, class: 'datum loud' }));
      L.surprise.appendChild(el('path', { d: handLine(sx, sy + 3, sx, S.ground(sx) - 3, 0.4, 1321), class: 'ink resid' }));
      txt(L.surprise, sx + 5, sy - 3, '−log p(D)', '', 'start');

      /* KL: the bracket closing in from both sides */
      [[-1, 1401], [1, 1402]].forEach(([s, seed]) => {
        trail(L.kl, [[cmin + s * halfWide, AX.bot - 20], [cmin + s * (halfNarrow + 2), AX.bot - 20]], seed);
      });

      /* Fisher: the curvature that produced those two widths */
      parab(L.fisher, cmin, ymin, A_WIDE, 34, 'guide');
      parab(L.fisher, cmin, ymin, A_NARROW, 34, 'guide');
      txt(L.fisher, cmin - halfWide * 0.86, ymin - 30, 'flat — degenerate', 'sm', 'middle');
      txt(L.fisher, cmin + halfNarrow + 16, ymin - 26, 'steep — pinned', 'sm', 'start');
    })();

    /* ---- 11 · THE FORK — three ways out, and they are directions --------- */
    /* left and up — exchange the landscape; along the surface — re-read what
       is already there; up and out over the crest — go and get more. */
    trail(L.fork1, [[cmin - 6, ymin - 16], [2150, ymin - 34], [2092, -1858]], 1501);
    trail(L.fork2, [2226, 2260, 2296, 2330, 2352].map((x) => [x, S.ground(x) - 15]), 1502);
    trail(L.fork3, [[cmin + 8, ymin - 26], [2300, -1890], [2418, -1938]], 1503);

    /* ---- 12 · WHERE WE WERE, seen from the crest ------------------------ */
    L.here.appendChild(el('path', { d: ring(cmin, ymin, 26, 2501), class: 'ink ring loud' }));

    /* ---- 13 · TWO INSTRUMENTS SAMPLING ONE PATCH OF GROUND --------------
       An instrument is not drawn in the sky — it is drawn as the sampling it
       actually delivers on the same stretch of ground: how often it reports,
       and how wide each report is. That is all that matters here, and it is
       the difference between the two surveys.                                */
    function comb(host, spacing, sig, dotR, seed) {
      const x0 = LEDGE.x0 + 12, x1 = LEDGE.x1 - 12;
      let n = 0;
      for (let x = x0; x <= x1; x += spacing, n++) {
        const gy = S.ground(x);
        host.appendChild(el('path', { d: handLine(x, gy - sig, x, gy + sig, 0.2, seed + 300 + n), class: 'ink errbar' }));
        host.appendChild(el('path', { d: handLine(x - dotR, gy - sig, x + dotR, gy - sig, 0.12, seed + 500 + n), class: 'ink errbar' }));
        host.appendChild(el('path', { d: handLine(x - dotR, gy + sig, x + dotR, gy + sig, 0.12, seed + 700 + n), class: 'ink errbar' }));
        host.appendChild(el('circle', { cx: x, cy: gy, r: dotR, class: 'datum' }));
      }
    }
    comb(L.combR, 26, 8.5, 2.3, 1601);   // Rubin: reports often enough, coarsely
    comb(L.combE, 9, 3.0, 1.5, 1701);    // Euclid VIS: finer and sharper
    comb(L.combJ, 9, 1.9, 1.5, 1801);    // the two together

    /* ---- 14 · ONE REPRESENTATION, MANY READOUTS ------------------------- */
    (function () {
      const g = L.latent;
      const bx0 = 2050, bx1 = 2370, inY = -2096, zY = -1996, outY = -1900;
      for (let i = 0; i < 10; i++) {                        // ten bands in
        const x = bx0 + ((bx1 - bx0) * i) / 9;
        g.appendChild(el('path', { d: handLine(x, inY, x, inY + 9, 0.3, 1901 + i), class: 'ink axis' }));
        g.appendChild(el('path', { d: handLine(x, inY + 11, (bx0 + bx1) / 2 + (x - (bx0 + bx1) / 2) * 0.42, zY - 7, 0.9, 1921 + i), class: 'ink sight' }));
      }
      bracket(g, bx0 + 54, bx1 - 54, zY, 4.0, null, 1941);   // the frozen latent
      for (let i = 0; i < 5; i++) {                          // five heads out
        const x = bx0 + 14 + ((bx1 - bx0 - 28) * i) / 4;
        g.appendChild(el('path', { d: handLine((bx0 + bx1) / 2 + (x - (bx0 + bx1) / 2) * 0.4, zY + 6, x, outY, 0.9, 1961 + i), class: 'ink sight' }));
        g.appendChild(el('path', { d: handLine(x - 5, outY, x + 5, outY, 0.3, 1981 + i), class: 'ink axis' }));
      }
    })();

    /* ---- 16 · THE ASTROMETRY RESULT, AS WIDTHS ON THIS AXIS ------------- */
    bracket(L.astro1, cmin - 50 / (2 * MAS), cmin + 50 / (2 * MAS), AX.bot - 27, 3.2,
      '≈ 50 mas', 2101);
    bracket(L.astro2, cmin - 15.5 / (2 * MAS), cmin + 15.5 / (2 * MAS), AX.bot - 13, 3.2,
      '14 – 17 mas', 2111);

    /* ---- 17 · THE CONCORDANCE FIELD — the ground itself displaced ------- */
    (function () {
      const dx = 9.5 / (2 * MAS), dy = -1.1;                 // 9.5 mas, coherent
      const pts = S.samples(LEDGE.x0 - 20, LEDGE.x1 + 20).map((p) => [p[0] + dx, p[1] + dy]);
      L.shift.appendChild(el('path', { d: S.toPath(pts), class: 'ink ridgeline-new' }));
      const rnd = S.mulberry32(2201);
      for (let i = 0; i < 22; i++) {                          // one arrow per tile
        const x = LEDGE.x0 + 14 + rnd() * (LEDGE.x1 - LEDGE.x0 - 28);
        const y = S.ground(x) - 8 - rnd() * 20;
        trail(L.shift, [[x, y], [x + dx * 2.6, y + dy * 2.6]], 2300 + i);
      }
    })();

    /* ---- 19 · TWO ENDINGS ---------------------------------------------- */
    L.ends.appendChild(el('path', { d: ring(2900, S.ground(2900), 34, 2401), class: 'ink ring loud' }));
    L.ends.appendChild(el('path', { d: ring(2596, S.ground(2596), 34, 2402), class: 'ink ring loud' }));
  }

  /* ===================================================== live redrawing === */

  /* m: 0 = the ruler we chose, 1 = the other one. */
  S.setRuler = function (m) {
    const { x0, x1 } = S.WIN;
    const pts = [];
    for (let x = x0; x <= x1; x += 0.09) { const p = S.plot(x, m); pts.push([p.x, p.y]); }
    document.getElementById('plotcurve').setAttribute('d', S.toPath(pts));

    const ticks = document.getElementById('rule-ticks').children;
    for (let i = 0; i < ticks.length; i++) {
      const t = ticks[i];
      const big = t.getAttribute('data-big') === '1';
      const x = S.warpX(x0 + ((x1 - x0) * i) / 26, m);
      t.setAttribute('d', handLine(x, S.RULEY, x, S.RULEY + (big ? 3.0 : 1.7), 0.1, 500 + i));
    }

    const win = S.argmin(m);
    ['A', 'B'].forEach((k) => {
      const p = S.plot(S.F[k].c, m);
      const g = document.getElementById('cand-' + k);
      g.classList.toggle('win', k === win);
      const kid = g.children;
      kid[0].setAttribute('d', ring(p.x, p.y, 1.9, k === 'A' ? 601 : 602));
      kid[1].setAttribute('d', handLine(p.x, p.y + 1.9, p.x, S.RULEY, 0.12, k === 'A' ? 611 : 612));
      kid[2].setAttribute('cx', p.x); kid[2].setAttribute('cy', p.y);
      kid[3].setAttribute('x', p.x); kid[3].setAttribute('y', S.RULEY + 4.6);
    });
    S.rulerM = m;
  };

  /* Where a ball of radius r comes to rest at horizontal position cx: as low
     as the ground allows without cutting into it. In a notch narrower than the
     ball this wedges it above the true floor, which is the honest picture. */
  function support(cx, r) {
    let cy = -Infinity;
    for (let i = -14; i <= 14; i++) {
      const dx = (i / 14) * r * 0.995;
      const y = S.ground(cx + dx) - Math.sqrt(r * r - dx * dx);
      if (cy === -Infinity || y < cy) cy = y;
    }
    return cy;
  }

  /* t: 0 = boulder on the upper rim, 1 = settled. Damped, deterministic. */
  S.setRoll = function (t) {
    const target = S.F.A.c;          // the minimum under the ruler we chose
    const start = target - 11;
    const T = Math.max(0, Math.min(1, t));
    const tau = T * 2.9;                                  // seconds of physics
    const x = target + (start - target) * Math.cos(tau * 4.2) * Math.exp(-tau * 1.35);
    const r = S.BALL_R;
    const rot = ((x - start) / r) * (180 / Math.PI);
    document.getElementById('boulder').setAttribute('transform',
      'translate(' + f2(x) + ' ' + f2(support(x, r)) + ') rotate(' + rot.toFixed(1) +
      ') scale(' + r + ')');
    S.rollT = T;
  };
})();
