/* ============================================================================
   terrain.js — THE GROUND
   ----------------------------------------------------------------------------
   One landscape, defined once, valid at every zoom level. Everything the
   camera ever looks at is a window onto these functions. That is the whole
   trick of the talk: the loss landscape of scenes 5–7 is not a diagram drawn
   next to the mountain, it *is* a 90-metre stretch of the mountain in scene 1.

   Coordinate system (world units, read them as metres):
       x  increases to the right
       y  increases DOWNWARD (screen convention)
   so a more negative y is higher ground. Read y as loss: high loss = high up,
   the minimum of the loss = the lowest point on the screen.

   The mountain is ~9 km wide with ~2.1 km of relief. The basin the optimizer
   settles into is ~26 m across. That ratio is the argument.
   ========================================================================= */
(function () {
  const S = (window.SIS = window.SIS || {});

  /* ---------------------------------------------------------------- noise --
     Seeded value noise so the drawing is identical on every machine and every
     reload. No Math.random anywhere in the deck.                            */
  function mulberry32(a) {
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  S.mulberry32 = mulberry32;

  const LATTICE = 8192;
  const P = new Float32Array(LATTICE);
  (function () {
    const r = mulberry32(20260817);
    for (let i = 0; i < LATTICE; i++) P[i] = r() * 2 - 1;
  })();

  function vnoise(x) {
    const i = Math.floor(x);
    const f = x - i;
    const a = P[(i & (LATTICE - 1)) >>> 0];
    const b = P[((i + 1) & (LATTICE - 1)) >>> 0];
    const t = f * f * (3 - 2 * f); // smoothstep
    return a + (b - a) * t;
  }
  S.vnoise = vnoise;

  /* ------------------------------------------------- monotone cubic spline --
     Fritsch–Carlson. Monotone means the curve honours the control points
     without overshoot, so the silhouette is exactly what is authored below,
     with zero slope at each turning point — which is what mountain crests and
     valley floors actually look like.                                       */
  function monotone(pts) {
    const n = pts.length;
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const dx = [], dy = [], slope = [];
    for (let i = 0; i < n - 1; i++) {
      dx[i] = xs[i + 1] - xs[i];
      dy[i] = ys[i + 1] - ys[i];
      slope[i] = dy[i] / dx[i];
    }
    const m = new Array(n);
    m[0] = slope[0];
    m[n - 1] = slope[n - 2];
    for (let i = 1; i < n - 1; i++) {
      if (slope[i - 1] * slope[i] <= 0) m[i] = 0;
      else {
        const w1 = 2 * dx[i] + dx[i - 1];
        const w2 = dx[i] + 2 * dx[i - 1];
        m[i] = (w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]);
      }
    }
    return function (x) {
      if (x <= xs[0]) return ys[0] + m[0] * (x - xs[0]);
      if (x >= xs[n - 1]) return ys[n - 1] + m[n - 1] * (x - xs[n - 1]);
      let lo = 0, hi = n - 1;
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (xs[mid] > x) hi = mid; else lo = mid; }
      const h = dx[lo], t = (x - xs[lo]) / h;
      const t2 = t * t, t3 = t2 * t;
      return (
        ys[lo] * (2 * t3 - 3 * t2 + 1) +
        h * m[lo] * (t3 - 2 * t2 + t) +
        ys[lo + 1] * (-2 * t3 + 3 * t2) +
        h * m[lo + 1] * (t3 - t2)
      );
    };
  }

  const gauss = (x, c, w) => { const t = (x - c) / w; return Math.exp(-t * t); };
  S.gauss = gauss;
  /* Super-gaussian: p = 2 is a bell, p = 4 gives a flat floor and steep walls —
     which is what lets two shallow candidate minima sit on the basin floor
     without the basin's own curvature swallowing them. */
  const bowl = (x, c, w, p) => { const t = Math.abs((x - c) / w); return Math.exp(-Math.pow(t, p)); };

  /* ========================================================================
     THE SILHOUETTE — edit these numbers to reshape the mountain.
     Left to right: the far massif, the approach, THE LEDGE (x 2050–2400,
     where scenes 3–5 live), the crest Sisyphus is pushing toward (x 2900),
     the far ridge that hides everything beyond it, and the wide deep basin
     at x≈5600 that nobody can see from the ledge.
     ===================================================================== */
  const RIDGE = [
    [-1700, -1420], [-1300, -1600], [-600, -2400], [0, -1760], [500, -1560],
    [900, -1360], [1300, -1200], [1650, -1420], [1950, -1660],
    /* the ledge */
    [2050, -1806], [2100, -1792], [2150, -1778], [2200, -1760],
    [2250, -1784], [2300, -1770], [2350, -1800], [2400, -1830],
    /* up to the crest */
    [2520, -1930], [2700, -2210], [2900, -2400],
    /* the far country */
    [3150, -2050], [3400, -2300], [3750, -2620], [4200, -1900],
    [4700, -1400], [5200, -950], [5600, -800], [6000, -880],
    [6500, -1150], [7000, -1420], [7500, -1300],
  ];

  /* The landscape after new instruments arrive (scene 6). Same left-hand
     country — old knowledge does not evaporate — but the ledge is no longer
     a hollow, and the true basin is deeper, wider and somewhere else.       */
  const RIDGE_NEW = [
    [-1700, -1560], [-1300, -1760], [-600, -2380], [0, -1900], [500, -1700],
    [900, -1500], [1300, -1370], [1650, -1610], [1950, -1830], [2200, -2010],
    [2500, -2200], [2900, -2560], [3150, -2200], [3400, -2080], [3750, -2400],
    [4300, -1180], [4650, -620], [5000, -400], [5350, -470], [5700, -640],
    [6100, -880], [6500, -1120], [7000, -1330], [7500, -1200],
  ];

  const base = monotone(RIDGE);
  const baseNew = monotone(RIDGE_NEW);

  /* ---------------------------------------------------------- roughness ----
     Six octaves. Each [wavelength, amplitude, calm] — `calm` damps the octave
     inside the study window so the authored basin is not swamped by noise
     while still leaving pen-scale texture at 20x magnification.            */
  /* [wavelength, amplitude, damping over the ledge, damping over the basin] */
  const OCT = [
    [230, 58, 0.86, 0.0], [72, 21, 0.80, 0.0], [21, 7.5, 0.50, 0.30],
    [6.5, 2.6, 0.35, 0.60], [2.0, 0.85, 0.15, 0.70], [0.6, 0.30, 0.0, 0.70],
  ];
  const SEED_OFF = [11.3, 104.7, 251.9, 517.3, 903.1, 1471.7];

  function rough(x, seedShift) {
    const calm = gauss(x, 2200, 300);      // quiet over the ledge
    const calm2 = gauss(x, 2202, 45);      // quieter still on the basin floor,
    let y = 0;                             // so the authored minima stay legible
    for (let i = 0; i < OCT.length; i++) {
      const o = OCT[i];
      y += o[1] * (1 - o[2] * calm) * (1 - o[3] * calm2) *
        vnoise(x / o[0] + SEED_OFF[i] + seedShift);
    }
    return y;
  }

  /* ============================================================== features -
     The local structure of the argument. All three are dips (positive y adds
     downward), so all three are places where the loss is lower.
       NOTCH — the apparent solution, ~26 m across, invisible above 3x zoom.
       A, B  — two candidate minima inside it. A wins under the first ruler,
               B wins under the second. Scene 4 is exactly this disagreement.
     ===================================================================== */
  const F = {
    notch: { c: 2202, w: 13.0, d: 20.0 },   // flat floor, steep walls
    A: { c: 2199.3, w: 4.4, d: 4.2 },       // wide enough for the boulder to nest
    B: { c: 2206.2, w: 3.0, d: 2.6 },
  };
  S.F = F;

  /* The window the graph / ruler / axes are drawn over. */
  S.WIN = { x0: 2189, x1: 2215 };
  /* The window scene 3 reads as "the loss landscape". */
  S.LEDGE = { x0: 2065, x1: 2360 };

  /* The basin, and the fine structure inside it, kept separate: changing the
     ruler barely moves the basin but decides which of A and B is lower. */
  S.featBowl = function (x) { return F.notch.d * bowl(x, F.notch.c, F.notch.w, 4); };
  S.featFine = function (x) {
    return F.A.d * gauss(x, F.A.c, F.A.w) + F.B.d * gauss(x, F.B.c, F.B.w);
  };
  S.feat = function (x) { return S.featBowl(x) + S.featFine(x); };

  /* Ground without the local features — the "trend", used by the ruler scene
     so that reweighting acts on the structure and not on the whole hillside. */
  S.groundBase = function (x) { return base(x) + rough(x, 0); };

  /* THE GROUND. */
  S.ground = function (x) { return S.groundBase(x) + S.feat(x); };

  /* The ground as it looks once the new survey lands. */
  S.groundNew = function (x) { return baseNew(x) + rough(x, 340.5) * 0.92; };

  /* Numerical tangent, in world units. */
  S.slope = function (x, f) {
    f = f || S.ground;
    const h = 0.04;
    return (f(x + h) - f(x - h)) / (2 * h);
  };

  /* ---------------------------------------------------------- the rulers ---
     m = 0 : the ruler we happened to choose.
     m = 1 : an equally defensible one — distances along theta reparametrised,
             and the loss reweighted by how well each region is actually
             measured. Same data. Different argmin.
     Both are monotone in x, so nothing is reordered; only what counts as
     "near" and "low" changes.                                              */
  S.warpX = function (x, m) {
    if (!m) return x;
    const { x0, x1 } = S.WIN, L = x1 - x0;
    const u = (x - x0) / L;
    const uc = Math.min(1, Math.max(0, u));
    const phi = (1 - m) * uc + m * Math.pow(uc, 1.85);
    return x0 + L * phi + (u - uc) * L;
  };

  /* Residuals on the left of the window are measured badly and count for less;
     on the right they are measured well and count for more. `k` is how hard
     that bites — gently on the basin, hard on the structure inside it. */
  S.weight = function (x, m, k) {
    if (!m) return 1;
    const { x0, x1 } = S.WIN;
    const u = Math.min(1, Math.max(0, (x - x0) / (x1 - x0)));
    return Math.exp(m * (u - 0.5) * k);
  };

  /* The curve as plotted under ruler m: position warped, structure reweighted. */
  S.plot = function (x, m) {
    return {
      x: S.warpX(x, m),
      y: S.groundBase(x) +
        S.featBowl(x) * S.weight(x, m, 0.45) +
        S.featFine(x) * S.weight(x, m, 2.4),
    };
  };

  /* Which candidate is the minimum under ruler m. */
  S.argmin = function (m) {
    const a = S.plot(F.A.c, m), b = S.plot(F.B.c, m);
    return a.y >= b.y ? 'A' : 'B'; // larger y = lower on screen = lower loss
  };

  /* --------------------------------------------------------- path builder --
     Adaptive sampling: dense where the camera will get close, coarse in the
     far country. One path string is reused at every zoom level.            */
  function stepAt(x) {
    if (x > 2185 && x < 2220) return 0.09;
    if (x > 2150 && x < 2260) return 0.3;
    if (x > 2020 && x < 2430) return 1.1;
    if (x > 1750 && x < 2700) return 4;
    if (x > 600 && x < 4400) return 12;
    return 34;
  }
  S.stepAt = stepAt;

  S.samples = function (x0, x1, f, forceStep) {
    f = f || S.ground;
    const pts = [];
    let x = x0;
    while (x < x1) {
      pts.push([x, f(x)]);
      x += forceStep || stepAt(x);
    }
    pts.push([x1, f(x1)]);
    return pts;
  };

  S.toPath = function (pts, close) {
    let d = 'M';
    for (let i = 0; i < pts.length; i++) {
      d += (i ? 'L' : '') + pts[i][0].toFixed(2) + ' ' + pts[i][1].toFixed(2);
    }
    if (close) {
      d += 'L' + pts[pts.length - 1][0].toFixed(2) + ' 2000L' +
        pts[0][0].toFixed(2) + ' 2000Z';
    }
    return d;
  };

  /* World extent, for the SVG viewBox. */
  S.BOUNDS = { x0: -2000, x1: 7800, y0: -3300, y1: 700 };
})();
