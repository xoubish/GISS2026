/* ============================================================================
   Narrative-first cinematic route for talk/.

   This reuses the spatial deck's terrain, art and camera engine, but trims the
   route to the handwritten talk spine: Sisyphus -> loop -> data/fit ->
   compression/ruler -> fork -> JAISP -> walk back.
   ========================================================================= */
(function () {
  const S = (window.SIS = window.SIS || {});

  S.anchorY = (y, frac, z) => y - ((frac - 0.5) * 900) / z;
  S.anchorX = (x, frac, z) => x - ((frac - 0.5) * 1600) / z;

  const NOTCH = 2202;
  const G = (x) => S.ground(x);

  const drinkSketch =
    '<svg viewBox="0 0 460 420" role="img" aria-label="Sisyphus holding a drink beside the boulder">' +
      '<path class="inkline" d="M98 352 C154 342 236 342 324 352"/>' +
      '<path class="inkline" d="M170 344 L196 286 L236 242"/>' +
      '<path class="inkline" d="M246 242 L286 292 L310 344"/>' +
      '<path class="inkline" d="M232 242 C246 210 266 188 294 176"/>' +
      '<path class="inkline" d="M294 176 L326 206"/>' +
      '<path class="inkline" d="M292 178 L334 152"/>' +
      '<path class="thin inkline" d="M336 148 L360 176 L336 184 L318 158 Z"/>' +
      '<path class="fill" d="M320 162 L358 178 L340 184 Z"/>' +
      '<path class="inkline" d="M250 202 L210 224"/>' +
      '<path class="inkline" d="M250 202 L218 178"/>' +
      '<path class="inkline" d="M216 176 C224 150 252 144 266 164 C278 182 260 204 238 198"/>' +
      '<path class="thin inkline" d="M196 286 C230 306 268 306 286 292"/>' +
      '<path class="inkline" d="M82 284 C72 220 116 174 176 184 C240 196 250 278 196 312 C146 344 94 330 82 284 Z"/>' +
      '<path class="thin inkline" d="M102 268 C130 248 166 250 196 276"/>' +
      '<path class="thin inkline" d="M112 224 C148 210 184 218 214 248"/>' +
    '</svg><p>same loop, smaller stakes</p>';

  S.SCENES = [
    {
      id: 'opening',
      name: 'Opening',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 1600 },
      set: { far: 1, rock: 1 },
      plates: [{
        src: '../spatial/assets/opening.png', ar: 1666 / 1200, mask: 1,
        at: [0.655, 0.46], w: 1180,
        alt: 'Sisyphus pushing the boulder up the slope',
      }],
      steps: [
        {},
        { notes: 'Land GIPS out loud: Greater IPAC Philosophy Symposium. This is a reflection, not a narrow science talk.' },
        { notes: 'Then the AI and philosophy line: as more technical work gets automated, the questions of what to optimize become unavoidable.' },
      ],
      text: [
        {
          id: 'title', at: [0.055, 0.115], w: 680, cls: 'titleblock',
          html:
            '<p class="kicker">GIPS 2026</p>' +
            '<h1>Sisyphus,<br>Optimizing in a<br>Dynamic Universe</h1>' +
            '<p class="byline">Shoubaneh Hemmati - Caltech/IPAC</p>',
        },
        {
          id: 'gips', at: [0.055, 0.58], w: 690, cls: 'aside lead', from: 1, to: 1,
          html: '<p>A Greater IPAC Philosophy Symposium talk: a reflection on why the work keeps taking the same shape.</p>',
        },
        {
          id: 'ai-phil', at: [0.055, 0.60], w: 690, cls: 'aside lead', from: 2,
          html: '<p>As AI pushes further into the technical work, philosophy returns to the center: what is the question, and what counts as better?</p>',
        },
      ],
      notes: 'Open on the drawing. Let the myth be visible before explaining it.',
    },

    {
      id: 'slope',
      name: 'The slope',
      camera: { x: 2130, y: -1830, z: 1.5 },
      enter: { dur: 2100 },
      set: { far: 1, rock: 1 },
      steps: [
        { notes: 'Retell the punishment in one breath.' },
        { notes: 'Make the technical turn: motion on a hill toward an optimum is optimization, whether it is ascent or descent.' },
        { notes: 'State the thesis and move. The rest of the talk is the machinery behind this sentence.' },
      ],
      text: [
        {
          id: 'myth', at: [0.055, 0.11], w: 680, cls: 'aside lead', to: 0,
          html: '<p>Push the boulder up; near the top, it rolls back. Repeat, for eternity.</p>',
        },
        {
          id: 'opt', at: [0.055, 0.11], w: 760, cls: 'phrase sm', from: 1, to: 1,
          html: '<p>Moving on a hill toward an optimum is an optimization problem.</p>',
        },
        {
          id: 'thesis', at: [0.055, 0.57], w: 720, cls: 'aside lead', from: 2,
          html: '<p>Data arrive. We build a model of reality from incomplete, noisy observations. Then we decide what <em>better</em> means.</p>',
        },
      ],
      notes: 'The camera enters the hillside. The drawing dissolves into the landscape that will carry the rest of the talk.',
    },

    {
      id: 'drink',
      name: 'The drink',
      camera() { const z = 1.25; return { x: 2020, y: S.anchorY(-1710, 0.55, z), z }; },
      enter: { dur: 1700 },
      set: { far: 0.85, rock: 0.75, ball: 0.35, pusher: 0.35, roll: 0.15 },
      steps: [
        {},
        { notes: 'This is deliberately low stakes. The point is that the topology is familiar before it becomes technical.' },
      ],
      text: [
        {
          id: 'drink-q', at: [0.055, 0.12], w: 580, cls: 'phrase big',
          html: '<p>Do I need another drink?</p>',
        },
        {
          id: 'drink-body', at: [0.055, 0.36], w: 520, cls: 'aside lead', from: 1,
          html: '<p>A brain runs a small version of the loop: prior, data, utility, compression, prediction error, decision.</p>',
        },
        {
          id: 'drink-img', at: [0.62, 0.16], w: 380, cls: 'drinkbox',
          html: drinkSketch,
        },
      ],
      notes: 'The human analogy enters as an image, not a lecture. Do not claim the brain literally minimizes the same loss as a network.',
    },

    {
      id: 'loop',
      name: 'The loop',
      camera() { const z = 3.8; return { x: 2185, y: S.anchorY(-1782, 0.55, z), z }; },
      enter: { dur: 1900 },
      set: { far: 0.5, rock: 0.85, ball: 0, roll: 0 },
      steps: [
        { set: { cyc1: 1, cyc2: 1 }, anim: { roll: 0 } },
        { set: { cyc3: 1, ball: 0.92, pusher: 0.92 } },
        { set: { cyc4: 1 } },
      ],
      text: [
        {
          id: 'loop-a', at: [0.055, 0.10], w: 520, cls: 'aside lead', to: 0,
          html: '<p>Question. What matters. The ruler. Then data: what the ruler let through.</p>',
        },
        {
          id: 'loop-b', at: [0.055, 0.10], w: 520, cls: 'aside lead', from: 1, to: 1,
          html: '<p>Too much to carry, so we compress, infer, and place the current belief on the hill.</p>',
        },
        {
          id: 'loop-c', at: [0.055, 0.10], w: 520, cls: 'aside lead', from: 2,
          html: '<p>An answer. Then the hard question with no axis of its own: <em>good enough?</em></p>',
        },
      ],
      notes: 'This is the whole talk on the ground. Avoid enumerating every station twice; let the terrain labels do the work.',
    },

    {
      id: 'systems',
      name: 'Three systems',
      camera() { const z = 2.1; return { x: 2200, y: S.anchorY(-1790, 0.62, z), z }; },
      enter: { dur: 1700 },
      set: {
        far: 0.6, rock: 0.75, ball: 0.42, pusher: 0.42, roll: 0,
        cyc1: 0.18, cyc2: 0.18, cyc3: 0.18, cyc4: 0.18,
      },
      steps: [
        {},
        { notes: 'The point is topology, not identity. Biology, AI and science implement this differently but hit the same questions.' },
      ],
      text: [
        {
          id: 'systems-title', at: [0.055, 0.075], w: 700, cls: 'phrase sm',
          html: '<p>The same loop, at very different scales.</p>',
        },
        {
          id: 'systems-list', at: [0.055, 0.28], w: 590, cls: 'aside lead mini-ledger', from: 1,
          html: '<p><b>Brain:</b> sensory stream, loss aversion, prediction error.</p>' +
            '<p><b>Model:</b> batches, latent space, gradients, proxy losses.</p>' +
            '<p><b>Science:</b> surveys, anomalies, consensus, paradigm shifts.</p>',
        },
        {
          id: 'systems-punch', at: [0.62, 0.22], w: 420, cls: 'aside human', from: 1,
          html: '<p>Not the same algorithm. The same topology.</p>',
        },
      ],
      notes: 'This compresses the table from the notes. If short on time, speak only the punchline.',
    },

    {
      id: 'datafit',
      name: 'Data and fit',
      camera() { const z = 5.6; return { x: 2185, y: S.anchorY(-1780, 0.58, z), z }; },
      enter: { dur: 1600 },
      set: { rock: 0.18, line: 0.16, sound: 1, ball: 0.38, pusher: 0.38 },
      steps: [
        {},
        { set: { line: 1, rock: 0.35 } },
      ],
      text: [
        {
          id: 'data-a', at: [0.075, 0.08], w: 620, cls: 'phrase sm', to: 0,
          html: '<p>We never see &theta;. We see what it generates.</p>',
        },
        {
          id: 'data-b', at: [0.075, 0.08], w: 620, cls: 'phrase sm', from: 1,
          html: '<p>The curve is already an inference.</p>',
        },
        {
          id: 'data-list', at: [0.075, 0.245], w: 470, cls: 'aside', to: 0,
          html: '<p>pixels, PSFs, noise, sampling, WCS, morphology</p>',
        },
        {
          id: 'person-data', at: [0.62, 0.10], w: 430, cls: 'aside human',
          html: '<p>For a person: words, tone, promises, stress, context, repeated encounters.</p>' +
            '<p class="quiet">The latent thing is not handed to us.</p>',
        },
      ],
      notes: 'The points are the observations. The smooth line is not observed; it is a model. This is the visual answer to "fits passing through them".',
    },

    {
      id: 'compression',
      name: 'Compression',
      camera() { const z = 4.0; return { x: 2212, y: S.anchorY(-1780, 0.5, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.15, line: 0.30, approx1: 1, ball: 0.35, pusher: 0.35 },
      steps: [
        {},
        { set: { approx1: 0, approx2: 1 } },
        { set: { approx2: 0, approx3: 1 } },
      ],
      text: [
        {
          id: 'comp-a', at: [0.12, 0.08], w: 680, cls: 'phrase sm', to: 0,
          html: '<p>We cannot carry everything forward.</p>',
        },
        {
          id: 'comp-b', at: [0.12, 0.08], w: 710, cls: 'phrase sm', from: 1, to: 1,
          html: '<p>A bad summary can hide an answer already in the data.</p>',
        },
        {
          id: 'comp-c', at: [0.12, 0.08], w: 720, cls: 'phrase sm', from: 2,
          html: '<p>A new question may only need a new readout.</p>',
        },
        {
          id: 'comp-human', at: [0.62, 0.13], w: 430, cls: 'aside human',
          html: '<p>Hundreds of observations collapse to <em>nice</em>. Enough for coffee. Hopeless for trust.</p>',
        },
      ],
      notes: 'Keep this visual: fine fit, coarse fit, better placed coarse fit. This is the difference between missing information and bad compression.',
    },

    {
      id: 'ruler',
      name: 'The ruler',
      camera() { const z = 13; return { x: NOTCH, y: S.anchorY(G(NOTCH), 0.80, z), z }; },
      enter: { dur: 2200 },
      set: { rock: 0.35, axes: 0.10, curve: 1, ruler: 1, cands: 1 },
      steps: [
        {},
        { set: { rock: 0.12, line: 0.22, m: 1 }, anim: { m: 1400, rock: 900, line: 900 } },
      ],
      text: [
        {
          id: 'ruler-a', at: [0.055, 0.09], w: 620, cls: 'phrase',
          html: '<p>The loss is a ruler we chose.</p>',
        },
        {
          id: 'ruler-b', at: [0.055, 0.31], w: 480, cls: 'aside', to: 0,
          html: '<p>Same data. Pixel similarity, flux, shape, position: each defines a different downhill.</p>',
        },
        {
          id: 'ruler-c', at: [0.055, 0.31], w: 480, cls: 'aside', from: 1,
          html: '<p>Change the ruler, and the optimum moves.</p>',
        },
      ],
      notes: 'This is the concrete NISP lesson. A model can converge under the wrong measurement of success.',
    },

    {
      id: 'answer',
      name: '42',
      camera() { const z = 11; return { x: NOTCH + 2, y: S.anchorY(G(NOTCH), 0.72, z), z }; },
      enter: { dur: 1400 },
      set: { rock: 0.55, ruler: 0.85, ball: 1, pusher: 1, roll: 0 },
      steps: [
        { set: { roll: 0 } },
        { set: { roll: 1 }, anim: { roll: 2900 }, notes: 'Let the boulder settle. Do not talk over the motion.' },
        { notes: 'Play 42 straight. Correct can still be incomplete until you know the question.' },
      ],
      text: [
        { id: 'answer-num', at: [0.395, 0.10], w: 460, cls: 'answer', from: 2, html: '<p>42</p>' },
      ],
      notes: 'The optimizer arrives. Give it a beat of silence.',
    },

    {
      id: 'rulers',
      name: 'Information',
      camera() { const z = 4.4; return { x: 2202, y: S.anchorY(-1782, 0.5, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.18, line: 1, ball: 0.35, pusher: 0.35 },
      steps: [
        { set: { entropy: 1 } },
        { set: { entropy: 1, surprise: 1, fisher: 1 } },
      ],
      text: [
        {
          id: 'info-a', at: [0.115, 0.055], w: 680, cls: 'phrase sm',
          html: '<p>Information is always information about a question.</p>',
        },
        {
          id: 'info-b', at: [0.115, 0.22], w: 670, cls: 'aside', from: 1,
          html: '<p>Entropy asks how much the stream carries. Surprise asks what the model failed to expect. Fisher asks how diagnostic the ruler is for &theta;.</p>',
        },
      ],
      notes: 'One scene, not four. This keeps the information theory in the route without turning it into a mini-lecture.',
    },

    {
      id: 'fork',
      name: 'The fork',
      camera() { const z = 1.7; return { x: 2210, y: S.anchorY(-1790, 0.82, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.35, line: 1, ball: 0.48, pusher: 0.48 },
      steps: [
        { set: { fork1: 1 } },
        { set: { fork1: 1, fork2: 1 } },
        { set: { fork1: 1, fork2: 1, fork3: 1 } },
      ],
      text: [
        {
          id: 'fork-title', at: [0.055, 0.07], w: 920, cls: 'phrase sm',
          html: '<p>Not good enough: debug the loop.</p>',
        },
        {
          id: 'fork-one', at: [0.055, 0.22], w: 470, cls: 'aside lead',
          html: '<p><b>Wrong ruler.</b> The loss answered the wrong question.</p>',
        },
        {
          id: 'fork-two', at: [0.055, 0.40], w: 470, cls: 'aside lead', from: 1,
          html: '<p><b>Bad compression.</b> The data had it; the representation hid it.</p>',
        },
        {
          id: 'fork-three', at: [0.055, 0.58], w: 470, cls: 'aside lead', from: 2,
          html: '<p><b>Missing information.</b> Go get a better observation.</p>',
        },
      ],
      notes: 'The three trails are alternatives, not stages. This is the decision structure in the handwritten page.',
    },

    {
      id: 'joint',
      name: 'One sky',
      camera() { const z = 4.6; return { x: 2205, y: S.anchorY(-1780, 0.55, z), z }; },
      enter: { dur: 2100 },
      set: { rock: 0.50, line: 1 },
      steps: [
        { set: { combR: 1 } },
        { set: { combR: 0.45, combE: 1 } },
        { set: { combR: 0.30, combE: 0.30, combJ: 1 } },
      ],
      text: [
        {
          id: 'joint-title', at: [0.12, 0.07], w: 710, cls: 'phrase sm',
          html: '<p>Many instruments, one sky.</p>',
        },
        {
          id: 'joint-a', at: [0.12, 0.205], w: 440, cls: 'aside', to: 0,
          html: '<p>Rubin samples one way.</p>',
        },
        {
          id: 'joint-b', at: [0.12, 0.205], w: 440, cls: 'aside', from: 1, to: 1,
          html: '<p>Euclid samples another way.</p>',
        },
        {
          id: 'joint-c', at: [0.12, 0.205], w: 480, cls: 'aside', from: 2,
          html: '<p>The bet: compress the shared reality, not each instrument separately.</p>',
        },
      ],
      notes: 'This is the bridge to JAISP. Joint processing is not averaging catalogs; it is learning one latent sky.',
    },

    {
      id: 'jaisp',
      name: 'JAISP',
      camera: { x: 2350, y: -2400, z: 1.0 },
      enter: { dur: 2200 },
      set: { far: 1, rock: 1 },
      plates: [{
        src: '../spatial/assets/jaisp_architecture_crop.png', ar: 550 / 1109, frame: 1,
        at: [0.335, 0.42], w: 830,
        alt: 'JAISP architecture: masked-band pretraining and downstream heads',
        cap: 'Ten bands -> one shared latent -> detection, astrometry, photometry, shape, redshift.',
      }],
      text: [
        {
          id: 'jaisp-title', at: [0.055, 0.075], w: 620, cls: 'phrase sm',
          html: '<p>JAISP makes the bet concrete.</p>',
        },
        {
          id: 'jaisp-num', at: [0.68, 0.055], w: 460, cls: 'aside tight',
          html: '<p>~9M parameters. Self-supervised masked-band reconstruction: each band predicted from the other nine.</p>' +
            '<p><b>Detection:</b> 93% complete, 94% pure, about 0.45 VIS mag deeper than one band supports.</p>' +
            '<p><b>Astrometry:</b> cross-survey scatter falls from about 50 mas to 14-17 mas.</p>',
        },
      ],
      notes: 'Say the numbers, not the whole architecture. The figure is there to make the bet real.',
    },

    {
      id: 'walkback',
      name: 'Walk back',
      camera: { x: 2860, y: -2200, z: 0.9 },
      enter: { dur: 2400 },
      set: { far: 1, rock: 1, here: 1, climber: 1, ends: 1 },
      steps: [
        {},
        {
          camera: { x: 5100, y: -720, z: 0.72 },
          set: { newland: 1, climber: 0.25, climber2: 1, ends: 0.35 },
          notes: 'This is the walk back. The answer changed the question; the landscape is not the same place anymore.',
        },
      ],
      text: [
        {
          id: 'end-a', at: [0.055, 0.10], w: 640, cls: 'phrase sm', to: 0,
          html: '<p>Good enough: die on that hilltop, or see the next mountain.</p>',
        },
        {
          id: 'end-b', at: [0.055, 0.10], w: 650, cls: 'phrase sm', from: 1,
          html: '<p>Not final: the answer changes the question, and Sisyphus walks back down.</p>',
        },
        {
          id: 'end-c', at: [0.055, 0.38], w: 500, cls: 'aside lead', from: 1,
          html: '<p>The loop is circular in structure and directional in fact.</p>',
        },
      ],
      notes: 'This is the visual correction to a static loop: the circle becomes a spiral.',
    },

    {
      id: 'return',
      name: 'Return',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 3000, ease: 'slow' },
      set: { far: 1, rock: 1 },
      plates: [{
        src: '../spatial/assets/closing.png', ar: 1470 / 1524, blend: 1,
        at: [0.66, 0.52], w: 920,
        alt: 'Sisyphus taking a break beside the boulder',
      }],
      steps: [
        {},
        { notes: 'Then the last line. Stop talking after it.' },
      ],
      text: [
        {
          id: 'final-a', at: [0.055, 0.20], w: 580, cls: 'aside lead',
          html: '<p>Maybe the rock comes back because we keep finding better questions.</p>',
        },
        {
          id: 'final-b', at: [0.055, 0.36], w: 540, cls: 'aside',
          html: '<p>Forty-two was right. The question was 6 x 7.</p>',
        },
        {
          id: 'final-c', at: [0.055, 0.52], w: 620, cls: 'phrase sm', from: 1,
          html: '<p>One must imagine the optimizer happy.</p>',
        },
      ],
      notes: 'Return to the opening camera. Same hill, different meaning.',
    },
  ];

  S.DEFAULT_SET = {
    far: 1, rock: 1, line: 1, axes: 0, curmark: 0, curve: 0, ruler: 0,
    humanrule: 0, cands: 0, ball: 0, newland: 0, marks: 0, m: 0, roll: 1,
    sound: 0, cyc1: 0, cyc2: 0, cyc3: 0, cyc4: 0,
    approx1: 0, approx2: 0, approx3: 0,
    entropy: 0, surprise: 0, kl: 0, fisher: 0,
    fork1: 0, fork2: 0, fork3: 0,
    combR: 0, combE: 0, combJ: 0, latent: 0,
    astro1: 0, astro2: 0, shift: 0, here: 0, ends: 0,
    pusher: 0, climber: 0, climber2: 0,
  };
})();
