/* ============================================================================
   art.js — THE PEN
   ----------------------------------------------------------------------------
   Everything visible is generated here, once, at load, from terrain.js. The
   aesthetic target: the title drawing's scribbled pen, laid over an Atlantic
   hillside — moss-green washes under the hatching, hazy far ridges, storm
   masses in the sky. Ink dense at the ridge, dissolving downward into mist.

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

  /* -------------------------------------------------------- the pusher ---
     Sisyphus himself, at pen scale: a scribbled figure leaning into the
     rock, built at the origin with feet at y = 0 and height ~1, facing +x.
     The caller scales him; stroke widths are compensated by 1/s so the pen
     stays a pen at any size. He exists so the middle of the talk shows the
     work, not just the geometry.                                           */
  function pusherFigure(seed, s) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    stroke(-0.34, 0, -0.16, -0.22, 2);      // back leg, braced
    stroke(-0.16, -0.22, 0.0, -0.42, 2);
    stroke(0.10, 0, 0.05, -0.24, 2);        // front leg
    stroke(0.05, -0.24, 0.0, -0.42, 2);
    stroke(0.0, -0.42, 0.30, -0.72, 3);     // torso, leaning hard
    stroke(0.30, -0.71, 0.58, -0.50, 2);    // lower arm
    stroke(0.28, -0.74, 0.60, -0.62, 2);    // upper arm
    const hd = el('path', { d: ring(0.40, -0.85, 0.10, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    return g;
  }

  /* ---------------------------------------------------------- a cloud ---
     A low, flat-bottomed mass of Atlantic weather: a wavy closed blob,
     filled, no stroke. Lives in the far layer, so it fades with distance
     and never follows the camera into the basin.                          */
  function cloud(host, cx, cy, w, h, seed, op, col) {
    let d = '';
    const n = 72;
    for (let k = 0; k <= n; k++) {
      const t = (k / n) * Math.PI * 2;
      const rr = 1 + 0.32 * S.vnoise(t * 2.3 + seed) + 0.11 * S.vnoise(t * 5.1 + seed * 2.7);
      const px = cx + Math.cos(t) * w * rr;
      const py = cy + Math.sin(t) * h * rr * (Math.sin(t) > 0 ? 0.5 : 1);
      d += (k ? 'L' : 'M') + f2(px) + ' ' + f2(py);
    }
    const p = el('path', { d: d + 'Z', fill: col, stroke: 'none' });
    p.style.opacity = op;
    host.appendChild(p);
  }

  /* The myth's own pose (scene 2): a climber on a steep face, arms thrown
     up-forward onto the rock, head tucked behind them. Same pen as
     pusherFigure; only the posture differs — hands are the highest point,
     so on the steep flank they are what meets the boulder.               */
  function mythFigure(seed, s) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    stroke(-0.34, 0, -0.14, -0.20, 2);      // back leg, braced
    stroke(-0.14, -0.20, 0.02, -0.40, 2);
    stroke(0.12, 0, 0.06, -0.22, 2);        // front leg, bent
    stroke(0.06, -0.22, 0.02, -0.40, 2);
    stroke(0.02, -0.40, 0.34, -0.70, 3);    // torso, driving upward
    stroke(0.34, -0.70, 0.64, -0.94, 2);    // lower arm, thrown up the face
    stroke(0.32, -0.72, 0.68, -0.86, 2);    // upper arm
    const hd = el('path', { d: ring(0.42, -0.76, 0.10, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    return g;
  }

  /* The myth's second pose: upright on his feet, facing downhill (−x),
     watching the boulder go. Swapped in by setMyth the moment it breaks
     free.                                                                */
  function standFigure(seed, s) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    stroke(-0.13, 0, -0.03, -0.22, 2);      // downhill leg
    stroke(-0.03, -0.22, 0.0, -0.42, 2);
    stroke(0.11, 0, 0.04, -0.22, 2);        // uphill leg
    stroke(0.04, -0.22, 0.0, -0.42, 2);
    stroke(0.0, -0.42, -0.04, -0.78, 3);    // torso, upright
    stroke(-0.04, -0.72, -0.17, -0.50, 2);  // near arm, hanging toward the fall
    stroke(-0.02, -0.70, 0.09, -0.48, 2);   // far arm
    const hd = el('path', { d: ring(-0.08, -0.88, 0.10, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    return g;
  }

  /* Scene 6's Shannon mark: the same pen, holding a speaking-horn to his
     mouth and facing the channel (−x). Two things the earlier version got
     wrong are fixed here — a hand actually holds the horn, and the feet sit
     on the terrain instead of on a flat baseline, which matters because he
     stands on the basin's rim, not on level ground.
     `foot(fx)` returns the ground offset, in local units, at local x = fx. */
  function callFigure(seed, s, foot, horn) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    const ST = 0.13;
    stroke(-ST, foot(-ST), -0.04, -0.22, 2);        // downhill leg
    stroke(-0.04, -0.22, 0.0, -0.42, 2);
    stroke(ST * 0.9, foot(ST * 0.9), 0.05, -0.22, 2); // uphill leg
    stroke(0.05, -0.22, 0.0, -0.42, 2);
    stroke(0.0, -0.42, -0.05, -0.78, 3);            // torso, upright
    stroke(-0.05, -0.735, -0.19, -0.57, 2);         // near arm: elbow dropped…
    stroke(-0.19, -0.57, horn.gx, horn.gy, 2);      // …forearm up under the horn
    stroke(0.0, -0.715, 0.10, -0.50, 2);            // far arm, hanging
    const hd = el('path', { d: ring(-0.09, -0.885, 0.105, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    return g;
  }

  /* A listening-horn: the wide bell cupped at the ear, tapering to a narrow
     tip that faces the channel, and the sound arriving as arcs beyond the
     tip. Returns the group plus the two points the caller needs — where a
     hand can grip it, and where the channel meets the tip. */
  function hornShape(tx, ty, bx, by, rt, rb, s, seed, arcs) {
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const ax = bx - tx, ay = by - ty, L = Math.hypot(ax, ay) || 1;
    const ux = ax / L, uy = ay / L, nx = -uy, ny = ux;
    const P = (x, y, k, r) => [x + nx * k * r, y + ny * k * r];
    const a = P(tx, ty, 1, rt), b = P(bx, by, 1, rb);
    const c = P(tx, ty, -1, rt), d = P(bx, by, -1, rb);
    const pen = (path) => { path.style.strokeWidth = W; g.appendChild(path); };
    pen(el('path', { d: handLine(a[0], a[1], b[0], b[1], 0.006, seed), class: 'ink' }));
    pen(el('path', { d: handLine(c[0], c[1], d[0], d[1], 0.006, seed + 1), class: 'ink' }));
    /* No rim arc at the wide end — the head closes the cone, and an arc
       across it reads as a lens over his face. Only the tip is capped. */
    pen(el('path', { d: handLine(a[0], a[1], c[0], c[1], 0.004, seed + 2), class: 'ink' }));
    /* Sound as arcs outside one end: `arcs` −1 past the bell (a voice going
       in), +1 past the tip, 0 none. The end with the arcs is the end where
       the air is; the other end is where the channel attaches. */
    if (arcs) {
      const ex = arcs < 0 ? bx : tx, ey = arcs < 0 ? by : ty;
      const dx = arcs < 0 ? ux : -ux, dy = arcs < 0 ? uy : -uy;
      for (let i = 1; i <= 3; i++) {
        const cx = ex + dx * 0.05, cy = ey + dy * 0.05;
        const rr = rb * 0.9 * (0.5 + i * 0.44), sp = 0.66;
        const w = el('path', {
          d: 'M' + f2(cx + nx * rr * sp) + ' ' + f2(cy + ny * rr * sp) +
            'Q' + f2(cx + dx * rr) + ' ' + f2(cy + dy * rr) + ' ' +
            f2(cx - nx * rr * sp) + ' ' + f2(cy - ny * rr * sp),
          class: 'ink',
        });
        w.style.strokeWidth = W;
        w.style.opacity = (0.7 - i * 0.15).toFixed(2);
        g.appendChild(w);
      }
    }
    const t = 0.72, off = (rt + (rb - rt) * t) * 0.55 + 0.03;   // grip, underside
    return {
      g: g,
      gx: tx + ax * t + nx * off,
      gy: ty + ay * t + ny * off,
      tip: [tx, ty],
    };
  }

  /* Scene 4's spectator: leaning back against the right edge of the frame,
     one foot flat on it, arms crossed, watching the loop. The wall is the
     edge of the slide — that is the joke. Faces −x.                       */
  function leanFigure(seed, s) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    stroke(-0.24, 0, -0.14, -0.23, 2);      // standing leg, planted well ahead
    stroke(-0.14, -0.23, -0.06, -0.44, 2);
    stroke(-0.06, -0.44, -0.11, -0.25, 2);  // wall leg, knee bent
    stroke(-0.11, -0.25, 0.10, -0.30, 2);   // sole flat on the frame edge
    stroke(-0.06, -0.44, 0.08, -0.80, 3);   // torso tilted back, shoulders on the wall
    stroke(0.07, -0.69, -0.07, -0.61, 2);   // arms, crossed on the chest
    stroke(-0.06, -0.69, 0.08, -0.61, 2);
    const hd = el('path', { d: ring(0.005, -0.905, 0.10, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    return g;
  }

  /* Scene 5's gag: hanging from a peak by both hands, body dangling —
     because that scene is difficult. Origin is the grip point.           */
  function hangFigure(seed, s) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    stroke(0.0, 0.01, -0.02, 0.24, 3);      // one straight arm from the tip
    const hd = el('path', { d: ring(-0.085, 0.26, 0.085, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    stroke(-0.02, 0.26, -0.045, 0.52, 3);   // torso, down the face
    stroke(-0.03, 0.31, -0.13, 0.48, 2);    // free arm, hanging
    stroke(-0.045, 0.52, 0.035, 0.60, 2);   // bent leg, knee braced on the rock
    stroke(0.035, 0.60, -0.005, 0.78, 2);
    stroke(-0.045, 0.52, -0.10, 0.84, 2);   // the other leg, hanging long
    return g;
  }

  /* Scene 7's greeting: the standing pose with one arm raised toward the
     person being met. Faces −x; mirror it for the observer.             */
  function greetFigure(seed, s) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    stroke(-0.13, 0, -0.03, -0.22, 2);      // legs
    stroke(-0.03, -0.22, 0.0, -0.42, 2);
    stroke(0.11, 0, 0.04, -0.22, 2);
    stroke(0.04, -0.22, 0.0, -0.42, 2);
    stroke(0.0, -0.42, -0.04, -0.78, 3);    // torso
    stroke(-0.03, -0.70, -0.19, -0.84, 2);  // the raised, greeting arm
    stroke(-0.01, -0.70, 0.09, -0.48, 2);   // the other, hanging
    const hd = el('path', { d: ring(-0.08, -0.88, 0.10, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    return g;
  }

  /* The break (scene 3): Sisyphus seated, facing back down the valley,
     cup raised in one hand, the other arm propping him, a bottle standing
     beside him. Origin is the seat point; the caller puts it on a summit. */
  function sitFigure(seed, s) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    stroke(0, -0.08, -0.25, -0.22, 2);       // near thigh, knee raised
    stroke(-0.25, -0.22, -0.33, 0.15, 2);    // near shin, foot down-slope
    stroke(0, -0.03, -0.18, -0.12, 2);       // far leg, lower and shorter
    stroke(-0.18, -0.12, -0.24, 0.17, 2);
    stroke(0, -0.08, 0.06, -0.52, 3);        // torso, easy lean back
    stroke(0.05, -0.46, -0.10, -0.40, 2);    // cup arm
    stroke(-0.10, -0.40, -0.13, -0.52, 2);
    stroke(0.05, -0.42, 0.22, -0.06, 2);     // propping arm
    const hd = el('path', { d: ring(0.02, -0.64, 0.10, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    /* Props are small — the figure's hand-jitter would mangle them, so
       they get a steadier pen of their own. */
    function prop(x1, y1, x2, y2) {
      const path = el('path', {
        d: handLine(x1, y1, x2, y2, 0.004, seed + Math.round((x1 * 7 + y2 * 13) * 991)),
        class: 'ink',
      });
      path.style.strokeWidth = W;
      path.style.opacity = 0.9;
      g.appendChild(path);
    }
    /* the cup: a small tumbler in his raised hand, open side up */
    prop(-0.166, -0.61, -0.150, -0.545);   // left wall, tapering in
    prop(-0.104, -0.61, -0.120, -0.545);   // right wall
    prop(-0.150, -0.545, -0.120, -0.545);  // base
    prop(-0.166, -0.61, -0.104, -0.61);    // rim
    /* the bottle, standing beside him: wide body, shouldered, capped */
    prop(0.29, 0, 0.29, -0.20);            // body walls
    prop(0.37, 0, 0.37, -0.20);
    prop(0.29, 0, 0.37, 0);                // base
    prop(0.29, -0.20, 0.318, -0.245);      // shoulders
    prop(0.37, -0.20, 0.342, -0.245);
    prop(0.318, -0.245, 0.318, -0.29);     // short neck
    prop(0.342, -0.245, 0.342, -0.29);
    prop(0.310, -0.29, 0.350, -0.29);      // the cap — flat, not a flame
    return g;
  }

  /* Philosophy (scene 9), both pages: hat on, head bowed, elbows toward
     the knees — the brooding pose. Origin is the seat point, facing −x. */
  function broodFigure(seed, s) {
    const rnd = S.mulberry32(seed);
    const g = el('g');
    const W = 'calc(var(--u) * ' + (1.15 / s).toFixed(5) + ')';
    const j = (v) => v + (rnd() - 0.5) * 0.03;
    function stroke(x1, y1, x2, y2, passes) {
      for (let p = 0; p < passes; p++) {
        const path = el('path', {
          d: handLine(j(x1), j(y1), j(x2), j(y2), 0.014, seed + p * 17 + Math.round((x1 + y2) * 991)),
          class: 'ink',
        });
        path.style.strokeWidth = W;
        path.style.opacity = (0.9 - p * 0.3).toFixed(2);
        g.appendChild(path);
      }
    }
    stroke(0, -0.08, -0.26, -0.22, 2);       // near thigh, knees drawn up
    stroke(-0.26, -0.22, -0.32, 0.15, 2);    // near shin, foot down-slope
    stroke(0, -0.03, -0.20, -0.13, 2);       // far leg
    stroke(-0.20, -0.13, -0.26, 0.17, 2);
    stroke(0, -0.08, -0.10, -0.50, 3);       // torso, hunched forward
    stroke(-0.09, -0.46, -0.24, -0.31, 2);   // near arm, elbow to the knee
    stroke(-0.24, -0.31, -0.225, -0.20, 2);  // forearm, hanging
    stroke(-0.075, -0.44, -0.19, -0.28, 2);  // far arm
    const hd = el('path', { d: ring(-0.165, -0.55, 0.10, seed + 5), class: 'ink' });
    hd.style.strokeWidth = W;
    hd.style.opacity = 0.9;
    g.appendChild(hd);
    /* The hat, steadier pen: a long brim tilted with the bowed head, a low
       trapezoid crown above it. */
    function prop(x1, y1, x2, y2) {
      const path = el('path', {
        d: handLine(x1, y1, x2, y2, 0.004, seed + Math.round((x1 * 7 + y2 * 13) * 991)),
        class: 'ink',
      });
      path.style.strokeWidth = W;
      path.style.opacity = 0.9;
      g.appendChild(path);
    }
    prop(-0.315, -0.585, -0.055, -0.660);    // the brim, nodded forward
    prop(-0.255, -0.610, -0.275, -0.700);    // crown, back wall
    prop(-0.125, -0.648, -0.150, -0.738);    // crown, front wall
    prop(-0.275, -0.700, -0.150, -0.738);    // crown, flat top
    return g;
  }

  /* A static Sisyphus with his own rock, feet on the given ground function. */
  function placePusher(host, fn, x, s, seed) {
    const g = pusherFigure(seed, s);
    g.setAttribute('transform', 'translate(' + f2(x) + ' ' + f2(fn(x)) + ') scale(' + s + ')');
    host.appendChild(g);
    const br = 0.40 * s;
    const bx = x + 0.62 * s + br * 0.65;
    const b = scribbleBall(seed + 9);
    b.firstChild.style.strokeWidth = 'calc(var(--u) * ' + (1.0 / br).toFixed(5) + ')';
    b.setAttribute('transform', 'translate(' + f2(bx) + ' ' + f2(fn(bx) - br * 0.85) + ') scale(' + br + ')');
    host.appendChild(b);
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
  S.LAYERS = ['far', 'gfill', 'hatch0', 'hatch1', 'hatch2', 'hatch3', 'hatch4', 'ridge',
    'newland', 'axes', 'curmark', 'curve', 'ruler', 'humanrule', 'cands',
    'sound', 'cyc1', 'cyc2', 'cyc3', 'cyc4',
    'approx1', 'approx2', 'approx3', 'entropy', 'entlbl', 'mi', 'comm', 'surprise', 'kl',
    'fisher', 'fork1', 'fork2', 'fork3', 'combR', 'combE', 'combJ', 'latent',
    'astro1', 'astro2', 'jarch', 'iters', 'shift', 'here', 'ends', 'marks',
    'tablebg', 'loop1', 'loop2', 'loop3', 'leaner',
    'mythfig', 'sitfig', 'hatfig', 'meetfig',
    'pusher', 'climber', 'climber2', 'body'];

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

    /* ---- the wash: a moss gradient under the pen, top-lit by dawn ------- */
    const defs = el('defs');
    const lg = el('linearGradient', {
      id: 'hillgrad', gradientUnits: 'userSpaceOnUse',
      x1: 0, y1: -2650, x2: 0, y2: 400,
    });
    [[0, '#ddebfa', 0.55], [0.35, '#a6c9e7', 0.64], [1, '#4b7ba8', 0.74]].forEach((st) => {
      lg.appendChild(el('stop', { offset: st[0], 'stop-color': st[1], 'stop-opacity': st[2] }));
    });
    defs.appendChild(lg);
    svg.appendChild(defs);

    /* ---- distant ranges, hazed like real distance in wet air ------------ */
    [
      { sx: 0.74, ox: 1750, ay: 0.84, dy: -170, o: 0.34, seed: 61 },
      { sx: 0.55, ox: 3400, ay: 0.70, dy: -330, o: 0.20, seed: 913 },
    ].forEach((D) => {
      const fn = (x) => S.groundBase(x * D.sx + D.ox) * D.ay + D.dy +
        46 * S.vnoise(x / 190 + D.seed);
      const g = el('g');
      g.style.opacity = D.o;
      g.appendChild(el('path', {
        d: S.toPath(S.samples(B.x0 + 40, B.x1 - 40, fn, 26), true),
        fill: '#c2d9ec', 'fill-opacity': '0.6', stroke: 'none',
      }));
      g.appendChild(el('path', { d: S.toPath(S.samples(B.x0 + 40, B.x1 - 40, fn, 26)), class: 'ink ridge-far' }));
      buildHatch(g, B.x0 + 60, B.x1 - 60, 320, D.seed + 5, fn, 4);
      L.far.appendChild(g);
    });

    /* ---- the weather ----------------------------------------------------
       Storm masses with flat undersides, strung along the whole range. They
       live with the far ridges, so close scenes get plain rain-light sky.  */
    cloud(L.far, -700, -2260, 950, 170, 71, 0.38, '#ffffff');
    cloud(L.far, 1350, -2300, 1150, 195, 72, 0.32, '#f7efd8');
    cloud(L.far, 3100, -2560, 1300, 205, 73, 0.38, '#eaf3fb');
    cloud(L.far, 5200, -2380, 1200, 175, 74, 0.30, '#f7efd8');
    cloud(L.far, 6900, -2600, 950, 155, 75, 0.36, '#ffffff');
    cloud(L.far, 350, -1990, 700, 105, 76, 0.20, '#f9f3e2');
    cloud(L.far, 4300, -2080, 820, 115, 77, 0.20, '#f9f3e2');

    /* ---- the ground itself, filled — the hills are green now ------------ */
    L.gfill.appendChild(el('path', {
      d: S.toPath(S.samples(B.x0 + 10, B.x1 - 10), true),
      fill: 'url(#hillgrad)', stroke: 'none',
    }));

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

    /* ---- the axes frame — unlit in the spoken route, appendix only ------- */
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

    /* ---- scenes 5–6: the ruler ------------------------------------------ */
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

    /* ---- retired with the zoom-out scene; kept unlit --------------------- */
    (function () {
      const g = L.marks;
      const ox = S.F.A.c, oy = S.ground(ox);
      g.appendChild(el('path', { d: ring(ox, oy, 44, 881), class: 'ink ring loud' }));
      g.appendChild(el('path', { d: handLine(ox - 46, oy - 30, 1133, -2417, 5, 882), class: 'ink leader' }));
      S.OLDMIN = { x: ox, y: oy };
    })();

    buildStations(L);

    /* ---- Sisyphus, wherever the work is --------------------------------
       One dynamic figure trails the boulder (positioned by setRoll); two
       static ones mark the climb to the crest (scene 12) and the new
       basin after the zoom-out (scene 16), where the work starts again.  */
    const pf = pusherFigure(777, 4.8);
    pf.setAttribute('id', 'pusher-fig');
    L.pusher.appendChild(pf);
    placePusher(L.climber, S.ground, 2600, 85, 4001);
    placePusher(L.climber2, S.groundNew, S.NEWMIN.x + 30, 85, 4101);

    /* ---- the myth, animated (scene 2) --------------------------------
       A slope-scale Sisyphus and his boulder, driven along the hillside by
       S.setMyth: the climb, then the boulder breaking free and rolling
       back to the bowl below. Same pen as everything else.               */
    const MR = 0.42 * 85;
    const mfig = mythFigure(4243, 85);
    mfig.setAttribute('id', 'myth-fig');
    L.mythfig.appendChild(mfig);
    const mstand = standFigure(4245, 85);
    mstand.setAttribute('id', 'myth-stand');
    L.mythfig.appendChild(mstand);

    /* ---- the break (scene 3): seated on the summit ------------------- */
    (function () {
      const s = 75, sx = 2884;
      const fig = sitFigure(4247, s);
      fig.setAttribute('transform',
        'translate(' + f2(sx) + ' ' + f2(S.ground(sx)) + ') scale(' + s + ')');
      L.sitfig.appendChild(fig);
    })();

    /* ---- philosophy (scene 9): the brooder -----------------------------
       The same summit as the break, but the camera is far above it now, so
       the pose is drawn well past the sitter's size to keep him present at
       the bottom of an almost-empty frame. Both pages light the same one. */
    (function () {
      const s = 550, sx = 2884, gy = S.ground(sx);
      const bf = broodFigure(4253, s);
      bf.setAttribute('transform',
        'translate(' + f2(sx) + ' ' + f2(gy) + ') scale(' + s + ')');
      L.hatfig.appendChild(bf);
    })();

    /* ---- the meeting (scene 7): two figures on the basin's rims ------ */
    (function () {
      const s = 30;
      const obs = greetFigure(6002, s);
      obs.setAttribute('id', 'meet-obs');
      L.meetfig.appendChild(obs);
      const per = standFigure(6001, s);
      per.setAttribute('id', 'meet-per');
      L.meetfig.appendChild(per);
    })();

    /* ---- the spectator (scene 4): leaning in the corner, watching ----- */
    (function () {
      const s = 270;
      const lf = leanFigure(4249, s);
      lf.setAttribute('transform', 'translate(1640 -2253) scale(-' + s + ' ' + s + ')');
      L.leaner.appendChild(lf);
    })();
    const mball = scribbleBall(4244);
    mball.setAttribute('id', 'myth-ball');
    mball.firstChild.style.strokeWidth = 'calc(var(--u) * ' + (1.0 / MR).toFixed(5) + ')';
    L.mythfig.appendChild(mball);

    /* ---- the boulder ---------------------------------------------------- */
    const b = scribbleBall(31337);
    b.setAttribute('id', 'boulder');
    L.body.appendChild(b);
    S.BALL_R = 2.0;

    S.setRuler(0);
    S.setRoll(1);
    S.setMyth(0);
    S.setMeet(0);
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

    /* ---- 3 · THE LOOP — question → ruler → data → compression →
       inference → answer → good enough? Pinned to the ground, not floated
       over it: the lap starts upslope with the question, the soundings are
       what the ruler let through, the boulder is the current belief, and
       the dashed return closes on a new question. Eight stations, four
       marks — each mark carries a pair.                                    */
    (function () {
      const g = (x) => S.ground(x);

      /* the question — and the choice of what matters: the ruler */
      const qx = 2078;
      L.cyc1.appendChild(el('path', { d: ring(qx, g(qx) - 4.5, 2.4, 3305), class: 'ink ring' }));
      txt(L.cyc1, qx + 3, g(qx) - 28, 'question');
      txt(L.cyc1, qx + 3, g(qx) - 21, 'what matters — the ruler', 'sm');
      L.cyc1.appendChild(el('path', { d: handLine(qx, g(qx) - 18, qx, g(qx) - 8.5, 0.3, 3330), class: 'ink leader' }));

      /* data: a few soundings, exactly what the ruler let through — a hint,
         not a survey; the full treatment belongs to scene 7 */
      const rnd = S.mulberry32(3301);
      for (let i = 0; i < 4; i++) {
        const x = 2102 + i * 13 + (rnd() - 0.5) * 3;
        const y = g(x) + gaussRnd(rnd) * 2.2, sg = 3.4;
        L.cyc2.appendChild(el('path', { d: handLine(x, y - sg, x, y + sg, 0.18, 3310 + i), class: 'ink errbar' }));
        L.cyc2.appendChild(el('circle', { cx: x, cy: y, r: 1.05, class: 'datum' }));
      }
      txt(L.cyc2, 2125, g(2125) - 24, 'data');
      L.cyc2.appendChild(el('path', { d: handLine(2125, g(2125) - 21, 2125, g(2125) - 7, 0.3, 3331), class: 'ink leader' }));

      /* compression → inference: the boulder — the current belief */
      const bx = cmin - 11, by = g(bx);
      txt(L.cyc3, bx - 6, by - 24, 'compress → infer');
      L.cyc3.appendChild(el('path', { d: handLine(bx - 4, by - 20, bx - 1, by - 7, 0.3, 3340), class: 'ink leader' }));
      trail(L.cyc3, [[bx + 4, g(bx + 4) - 3], [cmin - 2.5, g(cmin - 2.5) - 2]], 3350);

      /* the answer — good enough? then the loop closes on a new question */
      L.cyc4.appendChild(el('path', { d: ring(cmin - 1.6, g(cmin - 1.6), 2.3, 3360), class: 'ink ring' }));
      txt(L.cyc4, 2282, g(2282) - 14, 'answer — good enough?');
      trail(L.cyc4, [[2222, g(2222) - 10], [2200, g(2200) - 58], [2152, g(2152) - 64], [2112, g(2112) - 26]], 3370);
      txt(L.cyc4, 2160, g(2152) - 70, 'new question', 'sm');
    })();

    /* ---- 5 · THE RULER PEOPLE ACTUALLY CARRY ----------------------------
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

    /* ---- 7 · DATA — we never see θ, we see what it generates ------------ */
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

    /* ---- 8 · COMPRESSION — the same curve, re-drawn from k numbers ------ */
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

    /* ---- 9 · FOUR RULERS — four readings of one basin ------------------- */
    const A_WIDE = 0.0030, A_NARROW = 0.11, RISE = 26;
    const halfWide = Math.sqrt(RISE / A_WIDE), halfNarrow = Math.sqrt(RISE / A_NARROW);
    (function () {
      const edot = (host, x, y, r, seed) => {
        host.appendChild(el('circle', { cx: x, cy: y, r: r, class: 'datum' }));
        host.appendChild(el('path', { d: ring(x, y, r * 1.35, seed), class: 'ink ring' }));
      };

      /* Entropy as predictability of the next observation, back across x —
         and the reason x is the right axis is drawn, not left to be guessed.
         Both groups are soundings of the ground with the same measurement
         noise; the only difference is how far the readings range. The
         readings that sit on one spot leave the slope free: three guides
         through the cluster, all of them consistent with what was measured.
         The readings that range over the flank pin it: one solid tangent.
         So the low/high contrast is not decoration — it is the difference
         between data you can and cannot infer the shape from, which is the
         question beats 4 and 5 then spend a fixed budget on. */
      const NOISE = 1.6;
      const H_LOW = { x: 2222, half: 7 };
      const H_HIGH = { x0: 2256, x1: 2296 };

      (function () {
        const rnd = S.mulberry32(1710);
        const cy = S.ground(H_LOW.x);
        for (let i = 0; i < 5; i++) {
          const x = H_LOW.x + (rnd() - 0.5) * 9;
          edot(L.entropy, x, S.ground(x) + gaussRnd(rnd) * NOISE, 1.15, 1740 + i);
        }
        /* the slope this cluster does not determine */
        [-1.6, -0.4, 0.9].forEach((m, i) => {
          const h = H_LOW.half;
          L.entropy.appendChild(el('path', {
            d: handLine(H_LOW.x - h, cy - m * h, H_LOW.x + h, cy + m * h, 0.12, 1750 + i),
            class: 'ink guide',
          }));
        });
        txt(L.entlbl, H_LOW.x, cy - H_LOW.half * 1.6 - 8, 'low H — repeated');
      })();

      const HI = (function () {
        const rnd = S.mulberry32(1810);
        for (let i = 0; i < 7; i++) {
          const x = H_HIGH.x0 + ((H_HIGH.x1 - H_HIGH.x0) * i) / 6 + (rnd() - 0.5) * 3;
          edot(L.entropy, x, S.ground(x) + gaussRnd(rnd) * NOISE, 1.15, 1840 + i);
        }
        /* the slope these readings do determine */
        const y0 = S.ground(H_HIGH.x0), y1 = S.ground(H_HIGH.x1);
        const m = (y1 - y0) / (H_HIGH.x1 - H_HIGH.x0);
        const pad = 5;
        L.entropy.appendChild(el('path', {
          d: handLine(H_HIGH.x0 - pad, y0 - m * pad, H_HIGH.x1 + pad, y1 + m * pad, 0.12, 1860),
          class: 'ink axis',
        }));
        txt(L.entlbl, (H_HIGH.x0 + H_HIGH.x1) / 2, Math.min(y0, y1) - 14, 'high H — scattered');
        return { y0: y0, y1: y1 };
      })();

      /* Mutual information (the bridge beat): of everything these readings
         do, this much of it is the ground going up — the part that is about
         θ. The scatter around the tangent is the rest: capacity that carries
         nothing. One column, since the words carry the names. */
      (function () {
        const bx = H_HIGH.x1 + 13;
        L.mi.appendChild(el('path', {
          d: handLine(bx, HI.y1, bx, HI.y0, 0.14, 1880), class: 'ink plotted',
        }));
        [HI.y0, HI.y1].forEach((y, i) => L.mi.appendChild(el('path', {
          d: handLine(bx - 2.2, y, bx + 2.2, y, 0.1, 1882 + i), class: 'ink axis',
        })));
        txt(L.mi, bx + 4.5, (HI.y0 + HI.y1) / 2 + 1.5, 'about θ', '', 'start');
      })();

      /* Shannon's framing, drawn as the whole of it rather than one end:
         two figures on the two rims of the basin, a cone each, and the
         message crossing the valley between them. Both cones put their wide
         end at the head, so the narrow tips face each other across the
         channel and the direction of travel needs no label — the arcs leave
         the speaker's tip, the dashes carry them, Sisyphus takes them at his
         ear. The channel is drawn in world space, not inside either scaled
         group, so its dashes stay the size of every other dashed line here. */
      const s = 28;
      const CONE = [-0.575, -0.945, -0.215, -0.878, 0.026, 0.086];
      function talker(x, seed, mirror, arcs) {
        const y = S.ground(x);
        const foot = (fx) => Math.max(-0.09, Math.min(0.09,
          (S.ground(x + (mirror ? -fx : fx) * s) - y) / s));
        const hn = hornShape(CONE[0], CONE[1], CONE[2], CONE[3], CONE[4], CONE[5], s, seed + 2, arcs);
        const g = callFigure(seed, s, foot, hn);
        g.appendChild(hn.g);
        g.setAttribute('transform', 'translate(' + f2(x) + ' ' + f2(y) + ') scale(' +
          (mirror ? -s : s) + ' ' + s + ')');
        L.comm.appendChild(g);
        return [x + (mirror ? -CONE[0] : CONE[0]) * s, y + CONE[1] * s];   // the tip
      }
      const say = talker(2178, 1896, true, 1);      // the far rim, speaking
      const hear = talker(2362, 1888, false, 0);    // Sisyphus, listening
      L.comm.appendChild(el('path', {
        /* bowed up, not sagging: it has to clear the entropy labels */
        d: 'M' + f2(say[0] + 8) + ' ' + f2(say[1]) +
          'Q' + f2((say[0] + hear[0]) / 2) + ' ' + f2((say[1] + hear[1]) / 2 - 16) +
          ' ' + f2(hear[0] - 2) + ' ' + f2(hear[1]),
        class: 'ink drop',
      }));

      /* surprise: one datum a long way from anything the model predicts */
      const sx = 2268, sy = S.ground(sx) - 46;
      L.surprise.appendChild(el('circle', { cx: sx, cy: sy, r: 2.0, class: 'datum loud' }));
      L.surprise.appendChild(el('path', { d: handLine(sx, sy + 3, sx, S.ground(sx) - 3, 0.4, 1321), class: 'ink resid' }));
      txt(L.surprise, sx + 5, sy - 3, 'nothing predicted this', 'sm', 'start');

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

    /* ---- 10 · THE FORK — three ways out, and they are directions --------- */
    /* left and up — exchange the landscape; along the surface — re-read what
       is already there; up and out over the crest — go and get more. */
    trail(L.fork1, [[cmin - 6, ymin - 16], [2150, ymin - 34], [2092, -1858]], 1501);
    trail(L.fork2, [2226, 2260, 2296, 2330, 2352].map((x) => [x, S.ground(x) - 15]), 1502);
    trail(L.fork3, [[cmin + 8, ymin - 26], [2300, -1890], [2418, -1938]], 1503);

    /* ---- 11 · WHERE WE WERE, seen from the crest ------------------------ */
    L.here.appendChild(el('path', { d: ring(cmin, ymin, 26, 2501), class: 'ink ring loud' }));

    /* ---- 12 · TWO INSTRUMENTS SAMPLING ONE PATCH OF GROUND --------------
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

    /* ---- 13 · ONE REPRESENTATION, MANY READOUTS ------------------------- */
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

    /* ---- A1 · THE ASTROMETRY RESULT, AS WIDTHS ON THIS AXIS ----------------
       The collapse itself, drawn: the raw cross-survey positions as a loose
       cloud of open readings over the 50 mas bracket, the head-corrected
       ones as a tight cluster of solid dots over 14–17 mas, one small route
       between them, the labels hung off to the side so nothing collides.  */
    (function () {
      const w50 = 50 / (2 * MAS), w15 = 15.5 / (2 * MAS);
      const rnd = S.mulberry32(2121);
      for (let i = 0; i < 12; i++) {
        const x = cmin + gaussRnd(rnd) * w50 * 0.40;
        const y = AX.bot - 38.5 + rnd() * 8.0;
        L.astro1.appendChild(el('circle', {
          cx: f2(x), cy: f2(y), r: 0.62, class: 'datum loud',
        }));
      }
      bracket(L.astro1, cmin - w50, cmin + w50, AX.bot - 26, 3.2, null, 2101);
      txt(L.astro1, cmin + w50 + 2, AX.bot - 24.5, '≈ 50 mas', '', 'start');
      const rnd2 = S.mulberry32(2131);
      for (let i = 0; i < 10; i++) {
        const x = cmin + gaussRnd(rnd2) * w15 * 0.40;
        const y = AX.bot - 16.5 + rnd2() * 3.5;
        L.astro2.appendChild(el('circle', {
          cx: f2(x), cy: f2(y), r: 0.55, class: 'datum',
        }));
      }
      bracket(L.astro2, cmin - w15, cmin + w15, AX.bot - 9.5, 3.2, null, 2111);
      txt(L.astro2, cmin + w15 + 2, AX.bot - 8, '14 – 17 mas', '', 'start');
      trail(L.astro2, [[cmin - w50 * 0.8, AX.bot - 31], [cmin - w15 - 4.5, AX.bot - 20],
        [cmin - w15 + 0.5, AX.bot - 15.5]], 2141);
    })();

    /* ---- A3 · JAISP, IN THIS PEN (scene 8) --------------------------------
       The architecture drawn instead of pasted: ten band strokes in two
       instrument stacks, converging into one shared latent, five thin routes
       out to the heads — each with its own loss. Lives in the sky east of
       the basin, at the JAISP beat's camera.                                */
    (function () {
      const g = L.jarch;
      /* the ten bands, two stacks */
      const bx0 = 2168, bx1 = 2206;
      for (let i = 0; i < 6; i++) {
        const y = -2014 + i * 15;
        g.appendChild(el('path', { d: handLine(bx0, y, bx1, y, 0.5, 2401 + i), class: 'ink axis' }));
      }
      for (let i = 0; i < 4; i++) {
        const y = -1912 + i * 15;
        g.appendChild(el('path', { d: handLine(bx0, y, bx1, y, 0.5, 2411 + i), class: 'ink axis' }));
      }
      txt(g, (bx0 + bx1) / 2, -2024, 'rubin — six bands, 0.2″/px', 'sm');
      txt(g, (bx0 + bx1) / 2, -1922, 'euclid — four bands, 0.1″/px', 'sm');
      /* convergence into the latent */
      const LB = { x0: 2300, x1: 2362, y0: -1978, y1: -1908 };
      const lcy = (LB.y0 + LB.y1) / 2;
      for (let i = 0; i < 6; i++) {
        g.appendChild(el('path', {
          d: handLine(bx1 + 3, -2014 + i * 15, LB.x0 - 2, lcy - 12 + i * 4, 0.6, 2421 + i),
          class: 'ink leader',
        }));
      }
      for (let i = 0; i < 4; i++) {
        g.appendChild(el('path', {
          d: handLine(bx1 + 3, -1912 + i * 15, LB.x0 - 2, lcy + 16 - i * 4, 0.6, 2431 + i),
          class: 'ink leader',
        }));
      }
      /* the latent box, hand-drawn */
      g.appendChild(el('path', { d: handLine(LB.x0, LB.y0, LB.x1, LB.y0, 0.7, 2441), class: 'ink axis' }));
      g.appendChild(el('path', { d: handLine(LB.x1, LB.y0, LB.x1, LB.y1, 0.7, 2442), class: 'ink axis' }));
      g.appendChild(el('path', { d: handLine(LB.x1, LB.y1, LB.x0, LB.y1, 0.7, 2443), class: 'ink axis' }));
      g.appendChild(el('path', { d: handLine(LB.x0, LB.y1, LB.x0, LB.y0, 0.7, 2444), class: 'ink axis' }));
      txt(g, (LB.x0 + LB.x1) / 2, LB.y0 - 8, 'one shared latent');
      txt(g, (LB.x0 + LB.x1) / 2, LB.y0 - 21, 'each band predicted from the other nine', 'sm');
      /* frozen, dashed underneath */
      g.appendChild(el('path', { d: handLine(LB.x0, LB.y1 + 8, LB.x1, LB.y1 + 8, 0.5, 2445), class: 'ink guide' }));
      txt(g, (LB.x0 + LB.x1) / 2, LB.y1 + 18, 'frozen', 'sm');
      txt(g, (LB.x0 + LB.x1) / 2, LB.y1 + 32, 'each head its own loss', 'sm');
      /* the heads, fanned out — kept high so the rising flank stays clear */
      const HEADS = ['detection', 'astrometry', 'photometry',
        'shape', 'redshift'];
      HEADS.forEach((h, i) => {
        const hy = -2032 + i * 31;
        trail(g, [[LB.x1 + 4, lcy - 8 + i * 4], [2398, hy]], 2451 + i * 3);
        txt(g, 2404, hy + 2, h, '', 'start');
      });
    })();

    /* ---- A4 · TEN PUSHES TO THE DESIGN (scene 8) ---------------------------
       The v1–v10 ladder walked on the real flank between the basin and the
       summit: every abandoned design is a station where the boulder rolled
       back — the loop's not-good-enough branch, lived — and the turn (v6,
       predict the actual pixels) is the ring the climb pivots on.           */
    (function () {
      const g = L.iters;
      const gr = (x) => S.ground(x);
      const ST = [
        { x: 2445, name: 'v1–2 · contrastive', verdict: 'sky-dominated', fail: 1 },
        { x: 2520, name: 'v3 · object pairs', verdict: 'no precision', fail: 1 },
        { x: 2595, name: 'v4–5 · jepa', verdict: 'lost to a simple cnn', fail: 1 },
        { x: 2672, name: 'v6 · predict the pixels', verdict: 'the turn', turn: 1 },
        { x: 2745, name: 'v7–8 · mixed resolution', verdict: 'works' },
        { x: 2812, name: 'v9–10 · production', verdict: 'pixels won', top: 1 },
      ];
      ST.forEach((s, i) => {
        const y = gr(s.x);
        if (s.turn || s.top) {
          g.appendChild(el('path', {
            d: ring(s.x, y - 4, 3.4, 2601 + i), class: 'ink ring' + (s.turn ? ' loud' : ''),
          }));
        } else {
          g.appendChild(el('path', { d: handLine(s.x, y - 7, s.x, y - 1, 0.3, 2601 + i), class: 'ink axis' }));
        }
        /* labels hang in the open sky left of the slope, right-aligned */
        txt(g, s.x - 10, y - 13, s.name, 'sm', 'end');
        if (s.verdict) txt(g, s.x - 10, y - 5, s.verdict, 'sm', 'end');
        if (s.fail) {                                   /* the roll back */
          trail(g, [[s.x - 4, y - 3], [s.x - 26, gr(s.x - 26) - 16],
            [s.x - 48, gr(s.x - 48) - 2]], 2641 + i * 3);
        }
      });
    })();

    /* ---- A2 · THE CONCORDANCE FIELD (appendix) — the ground itself displaced ------- */
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

    /* ---- 5 (final deck) · BACKDROP FOR THE TABLE --------------------------
       A hazy range across the bottom of the table's sky, with one sharp
       peak right of the table — and Sisyphus hanging off it by both hands,
       because that scene is difficult. Visible in the wide beats only; the
       row-zoom frames stay clean text.                                     */
    (function () {
      const base = (x) => -2295 + 55 * S.vnoise(x / 190 + 7.7) + 30 * S.vnoise(x / 75 + 3.3);
      /* the peak is a spike with a steep left face, so a body can hang off it */
      const bump = (x) => {
        const s = x < 1398 ? 16 : 80;    // near-vertical cliff on the left
        return -330 * Math.exp(-Math.pow((x - 1398) / s, 2));
      };
      const fn = (x) => base(x) + bump(x);
      const pts = [];
      for (let x = -150; x <= 1750; x += 6) pts.push([x, fn(x)]);
      let d = '';
      pts.forEach((p, i) => { d += (i ? 'L' : 'M') + f2(p[0]) + ' ' + f2(p[1]); });
      L.tablebg.appendChild(el('path', {
        d: d + 'L1750 -2150L-150 -2150Z',
        fill: '#c6dcef', 'fill-opacity': '0.55', stroke: 'none',
      }));
      L.tablebg.appendChild(el('path', { d: d, class: 'ink ridge-far' }));
      const gripx = 1398;
      const hs = 232.5;
      const hf = hangFigure(4251, hs);
      hf.setAttribute('id', 'table-hanger');
      hf.dataset.x = gripx;
      hf.dataset.y = f2(fn(gripx) + 3);
      hf.dataset.s = hs;
      hf.setAttribute('transform', 'translate(' + gripx + ' ' + hf.dataset.y + ') scale(' + hs + ')');
      L.tablebg.appendChild(hf);
    })();

    /* ---- 4 (final deck) · THE LOOP, in the sky ---------------------------
       The full cycle from the handwritten notes, drawn as pen lettering and
       hand arrows above the range: question → what matters → the ruler →
       data → compression → inference → answer → good enough? — and a dashed
       return, the lap renewing. Three layers reveal it in three beats.     */
    (function () {
      const Y0 = -2950, Y1 = -2620, YM = -2785;   // top row, bottom row, sides
      function solidArrow(host, x1, y1, x2, y2, seed) {
        host.appendChild(el('path', { d: handLine(x1, y1, x2, y2, 1.2, seed), class: 'ink axis' }));
        const dx = x2 - x1, dy = y2 - y1, m = Math.hypot(dx, dy) || 1;
        const ux = dx / m, uy = dy / m, s = 9;
        host.appendChild(el('path', {
          class: 'ink axis',
          d: 'M' + f2(x2 - ux * s - uy * s * 0.5) + ' ' + f2(y2 - uy * s + ux * s * 0.5) +
            'L' + f2(x2) + ' ' + f2(y2) +
            'L' + f2(x2 - ux * s + uy * s * 0.5) + ' ' + f2(y2 - uy * s - ux * s * 0.5),
        }));
      }
      const T = (h, x, y, s) => {
        const t = el('text', { x: x, y: y, class: 'glab loop', 'text-anchor': 'middle' });
        t.textContent = s;
        h.appendChild(t);
      };
      /* beat 1: question → what matters → the ruler */
      T(L.loop1, 2040, Y0, 'question');
      T(L.loop1, 2400, Y0, 'what matters');
      T(L.loop1, 2760, Y0, 'the ruler');
      solidArrow(L.loop1, 2130, Y0 - 10, 2270, Y0 - 10, 5101);
      solidArrow(L.loop1, 2535, Y0 - 10, 2665, Y0 - 10, 5102);
      /* beat 2: down through data → compression → inference */
      T(L.loop2, 2835, YM, 'data');
      T(L.loop2, 2760, Y1, 'compression');
      T(L.loop2, 2400, Y1, 'inference');
      solidArrow(L.loop2, 2795, Y0 + 20, 2830, YM - 34, 5103);
      solidArrow(L.loop2, 2830, YM + 22, 2795, Y1 - 38, 5104);
      solidArrow(L.loop2, 2640, Y1 - 8, 2515, Y1 - 8, 5105);
      /* beat 3: answer → good enough? → (dashed) a new lap */
      T(L.loop3, 2040, Y1, 'answer');
      T(L.loop3, 1970, YM, 'good enough?');
      solidArrow(L.loop3, 2290, Y1 - 8, 2150, Y1 - 8, 5106);
      solidArrow(L.loop3, 2005, Y1 - 38, 1978, YM + 24, 5107);
      trail(L.loop3, [[1978, YM - 36], [2012, Y0 + 34]], 5108);
    })();

    /* ---- 15 · TWO ENDINGS (scene 9's last beat) -------------------------
       The crest, with the sitter still on it, and the slope, with Sisyphus
       still pushing. Both rings are lifted off the ground and widened so
       they enclose the figure rather than circling its feet.              */
    L.ends.appendChild(el('path', {
      d: ring(2886, S.ground(2886) - 22, 42, 2401), class: 'ink ring loud',
    }));
    L.ends.appendChild(el('path', {
      d: ring(2604, S.ground(2604) - 34, 48, 2402), class: 'ink ring loud',
    }));
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
    /* Sisyphus keeps his hands on it the whole way down. */
    const pf = document.getElementById('pusher-fig');
    if (pf) {
      const px = x - 4.35;
      pf.setAttribute('transform',
        'translate(' + f2(px) + ' ' + f2(S.ground(px)) + ') scale(4.8)');
    }
    S.rollT = T;
  };

  /* The myth, as one continuous drive (scene 2). t 0 → 0.78: Sisyphus pushes
     the boulder up the flank, slowly. t 0.78 → 1: the boulder breaks free
     near the crest and rolls back down to the bowl below while he stands
     where the push ended. The beat tween's own easing supplies the
     acceleration and the settle.                                            */
  /* Where the boulder rests so the pusher's hands are on the rim and his
     head stays clear of it — found by sliding it forward from his hands
     until both hold. Slope-aware, so the pose reads on the gentle start
     and the steep finish alike.                                            */
  function mythContact(px, SC, R) {
    const gy = S.ground(px);
    const ax = px + 0.66 * SC, ay = gy - 0.90 * SC;   // hands, thrown up the face
    const hx = px + 0.42 * SC, hy = gy - 0.76 * SC;   // head, tucked behind them
    for (let bx = px + 0.25 * SC; bx <= px + 1.6 * SC; bx += 2) {
      const cy = support(bx, R);
      if (Math.hypot(bx - ax, cy - ay) >= R * 1.02 &&
          Math.hypot(bx - hx, cy - hy) >= R * 1.34) return bx;
    }
    return px + 0.62 * SC;
  }

  S.setMyth = function (t) {
    const T = Math.max(0, Math.min(1, t));
    const SC = 85, R = 0.42 * SC;
    const PX0 = 2450, PX1 = 2700;          // the climb — toward the 2882 summit,
                                           // stalling visibly short of it
    const REST = 2300;                     // the bowl the fall ends in
    const CLIMB = 0.78;                    // fraction of t spent climbing
    let px, bx;
    if (T <= CLIMB) {
      const u = T / CLIMB;
      px = PX0 + (PX1 - PX0) * u;
      bx = mythContact(px, SC, R);
    } else {
      const v = (T - CLIMB) / (1 - CLIMB);
      px = PX1;
      const BX1 = mythContact(PX1, SC, R);
      bx = BX1 + (REST - BX1) * Math.pow(v, 1.25);
    }
    const rot = ((bx - mythContact(PX0, SC, R)) / R) * (180 / Math.PI);
    document.getElementById('myth-ball').setAttribute('transform',
      'translate(' + f2(bx) + ' ' + f2(support(bx, R)) + ') rotate(' + rot.toFixed(1) +
      ') scale(' + R + ')');
    /* the instant the boulder breaks free he straightens up, facing after
       it — standing where his body was, up-slope of the climbing pose's
       heels, so he does not appear to step back */
    const sx = px + 0.35 * SC;
    const swap = T <= CLIMB ? 0 : Math.min(1, (T - CLIMB) / 0.008);
    const fig = document.getElementById('myth-fig');
    const stand = document.getElementById('myth-stand');
    fig.setAttribute('transform',
      'translate(' + f2(px) + ' ' + f2(S.ground(px)) + ') scale(' + SC + ')');
    stand.setAttribute('transform',
      'translate(' + f2(sx) + ' ' + f2(S.ground(sx)) + ') scale(' + SC + ')');
    fig.style.opacity = (1 - swap).toFixed(2);
    stand.style.opacity = swap.toFixed(2);
    S.mythT = T;
  };

  /* The meeting (scene 7). t 0 → 1 walks the two figures from the basin's
     opposite rims toward each other; the basin between them is what is
     still unknown about the other person. They face each other; the
     observer (mirrored) greets.                                          */
  S.setMeet = function (t) {
    const T = Math.max(0, Math.min(1, t));
    const s = 30;
    /* Not a beeline: both wander — a few steps this way, a few back —
       the meander fading as they finally settle near each other. */
    const xl = 2124 + (2185 - 2124) * T + 18 * S.vnoise(T * 4.6 + 0.7) * (1 - T);
    const xr = 2292 - (2292 - 2237) * T + 22 * S.vnoise(T * 3.8 + 4.2) * (1 - T);
    const obs = document.getElementById('meet-obs');
    const per = document.getElementById('meet-per');
    if (!obs) return;
    obs.setAttribute('transform',
      'translate(' + f2(xl) + ' ' + f2(S.ground(xl)) + ') scale(-' + s + ' ' + s + ')');
    per.setAttribute('transform',
      'translate(' + f2(xr) + ' ' + f2(S.ground(xr)) + ') scale(' + s + ')');
    S.meetT = T;
  };

  S.setHang = function (now) {
    const fig = document.getElementById('table-hanger');
    if (!fig) return;
    const x = fig.dataset.x, y = fig.dataset.y, s = fig.dataset.s;
    const t = (now || performance.now()) / 1000;
    const a = 4.2 * Math.sin(t * 1.35) + 1.1 * Math.sin(t * 2.6 + 0.8);
    fig.setAttribute('transform',
      'translate(' + x + ' ' + y + ') rotate(' + f2(a) + ') scale(' + s + ')');
  };
})();
