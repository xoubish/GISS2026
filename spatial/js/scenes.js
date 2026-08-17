/* ============================================================================
   scenes.js — THE SCRIPT
   ----------------------------------------------------------------------------
   This is the file to edit. Everything else is machinery.

   Each scene has separable parts:

     camera  — where the eye goes, and how long it takes to get there
     set     — which layers of the world are lit (0..1), each animated
     text    — the words, placed in FRAME FRACTIONS so they are easy to move:
               at:[0.06, 0.12] means 6% across, 12% down the 16:9 frame,
               and w / font sizes are in "stage pixels" on a 1600x900 stage
     plates  — rasters placed in the world the same way
     steps   — beats. Right arrow advances the beat; at the last one it moves on.

   The route: down into the ledge (1–5), apart what the answer is made of
   (6–9), east over the crest to the program (10–13), back west to the same
   basin with a better instrument (14–15), then all the way out (16–18).
   ========================================================================= */
(function () {
  const S = (window.SIS = window.SIS || {});

  /* Put a world y at a given height in the frame (0 = top, 1 = bottom). */
  S.anchorY = (y, frac, z) => y - ((frac - 0.5) * 900) / z;
  S.anchorX = (x, frac, z) => x - ((frac - 0.5) * 1600) / z;

  const NOTCH = 2202;   // x of the apparent solution
  const G = (x) => S.ground(x);

  S.SCENES = [
    /* ====================================================== 1 · SISYPHUS == */
    {
      id: 'sisyphus',
      name: 'Sisyphus',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 1600 },
      set: { far: 1, rock: 1 },
      plates: [{
        src: 'assets/opening.png', ar: 1666 / 1200, mask: 1,
        at: [0.655, 0.46], w: 1180,
        alt: 'Sisyphus pushing the boulder up the slope',
      }],
      text: [
        {
          id: 'title', at: [0.055, 0.115], w: 640, cls: 'titleblock',
          html:
            '<p class="kicker">GIPS 2026</p>' +
            '<h1>Sisyphus,<br>Optimizing in a<br>Dynamic Universe</h1>' +
            '<p class="byline">Shoubaneh Hemmati — Caltech/IPAC</p>',
        },
      ],
      notes:
        'Open on the drawing. Say nothing about optimization yet. Let them ' +
        'assume this is the myth: the same rock, the same hill, forever. And land ' +
        'GIPS out loud — Greater IPAC Philosophy Symposium, not Science — before ' +
        'anyone decides it is a typo.',
    },

    /* ================================================ 2 · ENTER THE SLOPE == */
    {
      id: 'slope',
      name: 'Enter the slope',
      camera: { x: 2130, y: -1830, z: 1.5 },
      enter: { dur: 2100 },
      set: { far: 1, rock: 1 },
      text: [
        {
          id: 'slope-note', at: [0.055, 0.13], w: 420, cls: 'aside',
          html: '<p>Go close enough to any slope and it stops being scenery.</p>',
        },
      ],
      notes:
        'One slow move into the hillside beside him. The drawing dissolves; the ' +
        'ground stays. Note the ledge halfway up — we are going to live there.',
    },

    /* ================================================= 3 · LOSS LANDSCAPE == */
    {
      id: 'landscape',
      name: 'Loss landscape',
      camera() { const z = 4.57; return { x: 2210, y: S.anchorY(-1777, 0.5, z), z }; },
      enter: { dur: 1700 },
      set: { far: 0.35, rock: 0.55, axes: 1, curmark: 1 },
      steps: [
        {},
        { notes: 'Name the axes and both readings of them, then move on quickly.' },
      ],
      text: [
        {
          id: 'better', at: [0.10, 0.09], w: 560, cls: 'phrase',
          html: '<p>What does <em>better</em> mean?</p>',
        },
        {
          id: 'axesnote', at: [0.10, 0.24], w: 520, cls: 'aside', from: 1,
          html: '<p><em>θ</em> is what we want to know. <em>L</em> is how wrong we are.<br>' +
            'For a source: <em>θ</em> = (x, y) — reached only through pixels, ' +
            'PSFs, noise, calibration.</p>',
        },
        {
          id: 'h3', at: [0.62, 0.10], w: 460, cls: 'aside human', from: 1,
          html: '<p>Ask it about a person you have just met and the machinery is ' +
            'the same. θ is who they are — reached only through words, tone, and ' +
            'what they do under stress.</p>',
        },
      ],
      notes:
        'The ledge, framed. Same ground as the last scene, with axes drawn on ' +
        'it. A current minimum is visible and marked. Nothing has been solved — ' +
        'we have only agreed to call the vertical axis L.',
    },

    /* ========================================================= 4 · RULER == */
    {
      id: 'ruler',
      name: 'The ruler',
      camera() { const z = 13; return { x: NOTCH, y: S.anchorY(G(NOTCH), 0.80, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.6, axes: 0.10, curve: 1, ruler: 1, cands: 1 },
      steps: [
        {},
        {
          set: { rock: 0.12, line: 0.22, m: 1 },
          anim: { m: 1400, rock: 900, line: 900 },
          notes:
            'Same data, same landscape. Reparametrise θ, weight the residuals by ' +
            'what the instrument can actually measure, and the argument moves ' +
            'from A to B. Neither ruler is wrong.',
        },
        {
          /* pull back a little to make room for the second ruler underneath */
          camera() { const z = 11; return { x: NOTCH, y: S.anchorY(G(NOTCH), 0.55, z), z }; },
          set: { rock: 0.12, line: 0.22, m: 0, humanrule: 1 },
          anim: { m: 1200 },
          notes:
            'Kahneman and Tversky measured the ruler people carry and found it ' +
            'bent three ways: reference-dependent, loss-averse by about a factor ' +
            'of two, and diminishing in sensitivity. Descriptive, not normative — ' +
            'the optimizer converged; the ruler was the problem. Cut this beat ' +
            'first if the clock is tight.',
        },
      ],
      text: [
        {
          id: 'rulerphrase', at: [0.055, 0.09], w: 620, cls: 'phrase', to: 1,
          html: '<p>The loss is a ruler we chose.</p>',
        },
        {
          id: 'rulerphrase2', at: [0.055, 0.09], w: 620, cls: 'phrase', from: 2,
          html: '<p>The loss is a ruler we chose.</p>',
        },
        { id: 'rul-a', at: [0.055, 0.21], w: 300, cls: 'aside', to: 0, html: '<p>uniform weights</p>' },
        { id: 'rul-b', at: [0.055, 0.21], w: 340, cls: 'aside', from: 1, to: 1, html: '<p>weighted by what we can measure</p>' },
        {
          id: 'rul-h', at: [0.055, 0.21], w: 380, cls: 'aside human', from: 2,
          html: '<p>and the ruler people actually carry: read from a reference ' +
            'point, losses spaced twice as far as equal gains</p>',
        },
      ],
      notes:
        'Inside the minimum. The strip along the bottom is the ruler. Two ' +
        'candidates, A and B, about a metre apart on a nine-kilometre mountain.',
    },

    /* ============================================ 5 · APPARENT SOLUTION == */
    {
      id: 'solution',
      name: 'Apparent solution',
      camera() { const z = 11; return { x: NOTCH + 2, y: S.anchorY(G(NOTCH), 0.72, z), z }; },
      enter: { dur: 1400 },
      set: { rock: 0.55, ruler: 0.85, ball: 1, roll: 0 },
      steps: [
        { set: { roll: 0 } },
        { set: { roll: 1 }, anim: { roll: 2900 }, notes: 'Let it settle. Do not talk over it.' },
        { notes: 'Forty-two. Correct, reproducible, and no use at all.' },
      ],
      text: [
        { id: 'answer', at: [0.395, 0.10], w: 460, cls: 'answer', from: 2, html: '<p>42</p>' },
      ],
      notes:
        'The optimizer arrives. Converged, well-conditioned, defensible. Give it ' +
        'a beat of silence before the number appears.',
    },

    /* =========================================================== 6 · DATA == */
    {
      id: 'data',
      name: 'Data',
      camera() { const z = 5.6; return { x: 2185, y: S.anchorY(-1780, 0.58, z), z }; },
      enter: { dur: 1600 },
      set: { rock: 0.30, line: 0.16, axes: 1, sound: 1 },
      steps: [
        {},
        {
          set: { line: 1, rock: 0.5 },
          notes:
            'Now put the curve back. It was never observed — it is what we ' +
            'inferred, and every later scene is drawn on top of that inference.',
        },
      ],
      text: [
        {
          id: 'datap', at: [0.075, 0.08], w: 620, cls: 'phrase',
          html: '<p>We never see <em>θ</em>. We see what it generates.</p>',
        },
        {
          id: 'datalist', at: [0.075, 0.235], w: 440, cls: 'aside', to: 0,
          html: '<p>pixels · ten bands · PSFs · noise maps · sampling · WCS</p>',
        },
        {
          id: 'nuis', at: [0.075, 0.235], w: 480, cls: 'aside', from: 1,
          html: '<p><em>p</em>(D | θ, instrument, epoch, calibration)<br>' +
            'photon noise · blending · chromatic morphology · resampling</p>',
        },
        {
          id: 'h6', at: [0.62, 0.085], w: 440, cls: 'aside human', to: 0,
          html: '<p>Words · tone · promises · how they treat other people · ' +
            'behaviour under stress · repeated encounters.</p>',
        },
        {
          id: 'h6b', at: [0.62, 0.085], w: 450, cls: 'aside human', from: 1,
          html: '<p>And the nuisances are worse: mood, setting, self-presentation, ' +
            'strategy, stereotype, your own memory and projection.</p>' +
            '<p>Probing changes the thing being probed — and θ may be θ(t, context, ' +
            'relationship).</p>',
        },
      ],
      notes:
        'Same ledge, one zoom closer, and the smooth curve is gone: what we ' +
        'actually hold is soundings with widths. The landscape of the last three ' +
        'scenes was a model all along.',
    },

    /* ==================================================== 7 · COMPRESSION == */
    {
      id: 'compression',
      name: 'Compression',
      camera() { const z = 4.0; return { x: 2212, y: S.anchorY(-1780, 0.5, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.22, line: 0.30, axes: 1, approx1: 1 },
      steps: [
        {},
        {
          set: { approx1: 0, approx2: 1 },
          notes:
            'Five numbers, evenly spaced — a perfectly reasonable summary, and ' +
            'the basin is simply not in it. The recovered minimum is in the wrong ' +
            'place. Nothing was wrong with the data.',
        },
        {
          set: { approx2: 0, approx3: 1 },
          notes:
            'Seven numbers, placed where the curvature is. Same count, same ' +
            'data, no new observation — and the answer comes back. This is the ' +
            'branch foundation models live on.',
        },
      ],
      text: [
        {
          id: 'compp', at: [0.13, 0.08], w: 640, cls: 'phrase',
          html: '<p>We cannot carry everything forward.</p>',
        },
        {
          id: 'c1', at: [0.13, 0.215], w: 460, cls: 'aside', to: 0,
          html: '<p>D → T(D). Fifteen numbers: the texture is gone, the answer survives.</p>',
        },
        {
          id: 'c2', at: [0.13, 0.215], w: 460, cls: 'aside', from: 1, to: 1,
          html: '<p>Five numbers, evenly spaced. The data had it. The representation hid it.</p>',
        },
        {
          id: 'c3', at: [0.13, 0.215], w: 480, cls: 'aside', from: 2,
          html: '<p>Seven, placed where the curvature is. A different compression ' +
            'of the same data — lossy for the data, lossless for the question.</p>',
        },
        {
          id: 'h7', at: [0.62, 0.09], w: 440, cls: 'aside human',
          html: '<p>Hundreds of observations collapse to <em>nice</em>. Enough for ' +
            'another coffee. Hopeless for whether to trust them with something ' +
            'that matters.</p>',
        },
        {
          id: 'h7b', at: [0.62, 0.34], w: 440, cls: 'aside human', from: 2,
          html: '<p>The clues may already be in memory. Rebuild the summary — ' +
            'no new data required.</p>',
        },
      ],
      notes:
        'The vertical hairlines are the residual: exactly what each summary threw ' +
        'away. Ring marks where that representation thinks the minimum is.',
    },

    /* ==================================================== 8 · FOUR RULERS == */
    {
      id: 'rulers',
      name: 'Four rulers',
      camera() { const z = 4.4; return { x: 2202, y: S.anchorY(-1782, 0.5, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.30, line: 1, axes: 1 },
      steps: [
        { set: { entropy: 1 } },
        { set: { entropy: 1, surprise: 1 } },
        { set: { entropy: 1, surprise: 1, kl: 1 } },
        { set: { entropy: 1, surprise: 1, kl: 1, fisher: 1 } },
      ],
      text: [
        {
          id: 'r4h', at: [0.115, 0.055], w: 620, cls: 'phrase sm',
          html: '<p>Four rulers, one basin.</p>',
        },
        { id: 'r4a', at: [0.115, 0.155], w: 740, cls: 'aside', html: '<p><b>Entropy</b> — how uncertain am I?</p>' },
        { id: 'r4b', at: [0.115, 0.225], w: 740, cls: 'aside', from: 1, html: '<p><b>Surprise</b> — how unexpected was this? &nbsp;<em>s</em>(D) = −log <em>p</em>(D)</p>' },
        { id: 'r4c', at: [0.115, 0.295], w: 740, cls: 'aside', from: 2, html: '<p><b>Information gain</b> — how much did I learn? &nbsp;D<sub>KL</sub>[ <em>p</em>(θ|D) ‖ <em>p</em>(θ) ]</p>' },
        { id: 'r4d', at: [0.115, 0.365], w: 740, cls: 'aside', from: 3, html: '<p><b>Fisher</b> — where is the hill steep? &nbsp;<em>F</em> ∝ 1/σ²</p>' },
        {
          id: 'h8', at: [0.60, 0.055], w: 420, cls: 'aside human', from: 1,
          html: '<p>A confident first impression can be flatly wrong: low entropy ' +
            'is not truth.</p>' +
            '<p>And the encounter worth having is the one that is <em>diagnostic</em> ' +
            'for the trait you actually care about. That is Fisher, about a person.</p>',
        },
      ],
      notes:
        'Four readings of the same picture. Entropy is the width of the bracket. ' +
        'Surprise is a datum nothing predicted — and it need not teach you ' +
        'anything about θ. Information gain is the bracket closing. Fisher is the ' +
        'curvature that decides how fast it closes: the two dashed parabolas are ' +
        'the same landscape, flat at one scale and steep at another. Two cautions ' +
        'to say out loud: low entropy is not truth, and surprise is not gain.',
    },

    /* ====================================================== 9 · THE FORK == */
    {
      id: 'fork',
      name: 'The fork',
      camera() { const z = 3.2; return { x: 2210, y: -1850, z }; },
      enter: { dur: 1500 },
      set: { rock: 0.6, line: 1, axes: 0.3, curmark: 0.6 },
      steps: [
        { set: { fork1: 1 } },
        { set: { fork1: 0.35, fork2: 1 } },
        { set: { fork1: 0.35, fork2: 0.35, fork3: 1 } },
      ],
      text: [
        {
          id: 'forkh', at: [0.055, 0.07], w: 700, cls: 'phrase sm',
          html: '<p>Not good enough. Three reasons — and they are three directions.</p>',
        },
        {
          id: 'f1', at: [0.055, 0.20], w: 430, cls: 'aside', to: 0,
          html: '<p><b>Wrong ruler.</b> The question, the metric or the loss is ' +
            'inadequate. You are not moving on the landscape — you are exchanging it.</p>',
        },
        {
          id: 'f2', at: [0.055, 0.20], w: 430, cls: 'aside', from: 1, to: 1,
          html: '<p><b>Bad compression.</b> The data had it; the representation hid ' +
            'it. No new observation required.</p>',
        },
        {
          id: 'f3', at: [0.055, 0.20], w: 430, cls: 'aside', from: 2,
          html: '<p><b>Missing information.</b> The data do not contain it. Depth, ' +
            'resolution, area, S/N, wavelength, epoch, vantage, instrument.</p>',
        },
        {
          id: 'h9', at: [0.58, 0.10], w: 400, cls: 'aside human',
          html: '<p>You have made all three mistakes about a person: judged them by ' +
            'the wrong thing, summarised them badly, or never seen them in the one ' +
            'situation that would have told you.</p>',
        },
      ],
      notes:
        'The three stay side by side because they are alternatives, not stages. ' +
        'Each trail points where we would actually have to go — and we are about ' +
        'to take the third one, over the crest.',
    },

    /* ========================================== 10 · EXPERIMENTAL DESIGN == */
    {
      id: 'design',
      name: 'Experimental design',
      camera: { x: 2860, y: -2200, z: 0.9 },
      enter: { dur: 2400 },
      set: { far: 1, rock: 1, here: 1 },
      text: [
        {
          id: 'dh', at: [0.055, 0.10], w: 620, cls: 'phrase',
          html: '<p>Which observation teaches me the most?</p>',
        },
        {
          id: 'd2', at: [0.055, 0.28], w: 520, cls: 'aside',
          html: '<p>EIG(<em>d</em>) = 𝔼<sub>y</sub> D<sub>KL</sub>[ <em>p</em>(θ | y, <em>d</em>) ‖ ' +
            '<em>p</em>(θ) ] — and in the Gaussian limit, a Fisher criterion.</p>',
        },
        {
          id: 'd3', at: [0.055, 0.42], w: 480, cls: 'aside',
          html: '<p>Sharper PSF, better sampling, another epoch.<br>' +
            'A little resolution can beat a great many photons.</p>',
        },
        {
          id: 'h10', at: [0.575, 0.075], w: 400, cls: 'aside human',
          html: '<p>Small talk teaches almost nothing. Responsibility, disagreement, ' +
            'stress, cooperation teach a great deal.</p>' +
            '<p>And ethics bind the probe: there are experiments you may not run on ' +
            'a person to find out who they are.</p>',
        },
      ],
      notes:
        'We have left the ledge and climbed to where you can see further — which ' +
        'is what experimental design is. The basin we spent five scenes in is the ' +
        'small step down at the lower left.',
    },

    /* ================================================ 11 · TWO INSTRUMENTS == */
    {
      id: 'joint',
      name: 'Two instruments',
      camera() { const z = 4.6; return { x: 2205, y: S.anchorY(-1780, 0.55, z), z }; },
      enter: { dur: 2300 },
      set: { rock: 0.55, line: 1 },
      steps: [
        { set: { combR: 1 } },
        { set: { combR: 0.5, combE: 1 } },
        { set: { combR: 0.35, combE: 0.35, combJ: 1 } },
      ],
      text: [
        {
          id: 'jh', at: [0.12, 0.07], w: 660, cls: 'phrase sm',
          html: '<p>Two instruments, one patch of sky.</p>',
        },
        { id: 'j1', at: [0.12, 0.185], w: 420, cls: 'aside', to: 0, html: '<p>Rubin: six bands, depth, area — and coarser sampling.</p>' },
        { id: 'j2', at: [0.12, 0.185], w: 420, cls: 'aside', from: 1, to: 1, html: '<p><em>Euclid</em> VIS: sharp, well sampled, one band.</p>' },
        {
          id: 'j3', at: [0.12, 0.185], w: 460, cls: 'aside', from: 2,
          html: '<p><em>F</em><sub>joint</sub> = <em>F</em><sub>R</sub> + <em>F</em><sub>E</sub>. ' +
            'Compress the shared reality, not each instrument separately.</p>',
        },
        {
          id: 'h11', at: [0.62, 0.09], w: 440, cls: 'aside human',
          html: '<p>Work, friendship, stress, conflict, play: one person, different ' +
            'noise and different selection.</p>' +
            '<p>Not five labels to be averaged — one shared latent, read five ways.</p>',
        },
      ],
      notes:
        'Same ground, two combs. Three flavours of joint, in one picture: joint ' +
        'inference (the Fishers add), information transfer (VIS sharpness improves ' +
        'what is tied to Rubin bands), and information completion (masked-band ' +
        'reconstruction fills in what one instrument barely saw). The catalogue ' +
        'route — compress each survey, then compare — throws the overlap away ' +
        'before anyone can use it.',
    },

    /* ================================================== 12 · FOUNDATION == */
    {
      id: 'foundation',
      name: 'One representation',
      camera: { x: 2210, y: -1983, z: 3.0 },
      enter: { dur: 1700 },
      set: { rock: 0.25, line: 0.3, latent: 1 },
      text: [
        {
          id: 'fh', at: [0.055, 0.20], w: 560, cls: 'phrase sm',
          html: '<p>Learn the compression once.<br>Ask different questions of it later.</p>',
        },
        {
          id: 'fbands', at: [0.3375, 0.028], w: 520, cls: 'callout mid',
          html: '<p>Rubin <em>u g r i z y</em> &nbsp;·&nbsp; <em>Euclid</em> VIS <em>Y J H</em></p>',
        },
        {
          id: 'fz', at: [0.055, 0.415], w: 400, cls: 'aside',
          html: '<p>one shared representation,<br>then frozen</p>',
        },
        {
          id: 'fheads', at: [0.172, 0.805], w: 1052, cls: 'callout heads',
          html: '<p><span>detection</span><span>astrometry</span><span>photometry</span>' +
            '<span>shape</span><span>redshift</span></p>',
        },
        {
          id: 'h12', at: [0.055, 0.56], w: 430, cls: 'aside human',
          html: '<p>Nobody keeps separate mental files for “person for football”, ' +
            '“person for advice”, “person to trust”. One representation, ' +
            'interrogated differently per question.</p>',
        },
      ],
      notes:
        'If every question starts again from raw pixels the cost is enormous. So ' +
        'ask for a compression that survives a change of question: not lossless, ' +
        'but broadly reusable for questions not yet asked. Then every measurement ' +
        'is a small head reading the same frozen features.',
    },

    /* ======================================================= 13 · JAISP == */
    {
      id: 'jaisp',
      name: 'JAISP',
      camera: { x: 2350, y: -2400, z: 1.0 },
      enter: { dur: 2200 },
      set: { far: 1, rock: 1 },
      plates: [{
        src: 'assets/jaisp_architecture_crop.png', ar: 550 / 1109, frame: 1,
        at: [0.335, 0.42], w: 830,
        alt: 'JAISP architecture: masked-band pretraining and downstream heads',
        cap: 'Ten bands → two-stream stems → one shared latent → detection · ' +
          'astrometry · photometry · shape · redshift.',
      }],
      text: [
        {
          id: 'jah', at: [0.055, 0.075], w: 620, cls: 'phrase sm',
          html: '<p>This is what we built.</p>',
        },
        {
          id: 'janum', at: [0.68, 0.055], w: 460, cls: 'aside',
          html: '<p>≈9 M parameters. Self-supervised: each band predicted from the ' +
            'other nine, each instrument encoded at its delivered sampling.</p>' +
            '<p style="margin-top:22px">Detection, on held-out sky: <b>93% complete, ' +
            '94% pure</b> against the published VIS-detected catalogue — and ' +
            '<b>0.45 VIS mag deeper</b> than one band supports.</p>' +
            '<p style="margin-top:22px">A second deep field, no retraining: the ' +
            'whole stack reproduces it.</p>',
        },
      ],
      notes:
        'The one slide that is a figure. Say the numbers, not the architecture — ' +
        'the picture is there so nobody has to take the numbers on faith.',
    },

    /* ================================================== 14 · ASTROMETRY == */
    {
      id: 'astrometry',
      name: 'Astrometry',
      camera() { const z = 8.5; return { x: 2202, y: S.anchorY(G(2199.3), 0.42, z), z }; },
      enter: { dur: 2500 },
      set: { rock: 0.35, line: 1, axes: 1, astro1: 1 },
      steps: [
        { set: { astro1: 1 } },
        { set: { astro1: 1, astro2: 1 }, notes: 'The head does not add information. It stops throwing it away.' },
        {
          set: { rock: 0.12, line: 0.3, axes: 0.15, astro1: 0, astro2: 0 },
          notes: 'And here is the same statement as the paper makes it.',
        },
      ],
      text: [
        {
          id: 'ah', at: [0.055, 0.06], w: 520, cls: 'phrase sm',
          html: '<p>Where is the source — and how wide is the answer?</p>',
        },
        {
          id: 'a1', at: [0.055, 0.19], w: 420, cls: 'aside', to: 0,
          html: '<p>Raw cross-survey scatter, Rubin against <em>Euclid</em> VIS: ' +
            'about 50 mas.</p>',
        },
        {
          id: 'a2', at: [0.055, 0.19], w: 360, cls: 'aside', from: 1,
          html: '<p>A position head reading the frozen features: <b>14–17 mas</b>. ' +
            'Injected sources recovered to <b>19 mas at S/N = 5</b> — near the ' +
            'floor the VIS labels themselves set.</p>',
        },
        {
          id: 'h14', at: [0.60, 0.10], w: 420, cls: 'aside human', to: 1,
          html: '<p>A number without its width is not an answer. That is as true of ' +
            'a first impression as it is of a centroid.</p>',
        },
      ],
      plates: [{
        src: 'assets/astrometry_fig8_crop.png', ar: 525 / 1135, frame: 1, from: 2,
        at: [0.63, 0.46], w: 940,
        alt: 'Cross-survey offset clouds collapsing from 50 mas to 14-17 mas',
        cap: 'All 790 ECDFS tiles. Dashed: raw classical centroids. Solid: ' +
          'head-corrected — the clouds collapse and re-centre on the origin. ' +
          'Right: median per-source offset against S/N.',
      }],
      notes:
        'This is the same axis we called θ in scene three, now calibrated in ' +
        'milliarcseconds. The bracket is the answer\'s width, and it is her own ' +
        'measurement, not an illustration.',
    },

    /* =========================================== 15 · THE CONCORDANCE FIELD */
    {
      id: 'concordance',
      name: 'The field moves',
      camera() { const z = 6.5; return { x: 2205, y: S.anchorY(-1780, 0.72, z), z }; },
      enter: { dur: 1800 },
      set: { rock: 0.45, line: 1, axes: 0.5 },
      steps: [
        { set: { shift: 1 }, anim: { shift: 1600 } },
        { notes: 'Say it plainly: this is not scatter. The ground was in a different place.' },
      ],
      text: [
        {
          id: 'ch', at: [0.055, 0.07], w: 700, cls: 'phrase sm',
          html: '<p>Beneath the per-source scatter, the field itself is displaced.</p>',
        },
        {
          id: 'c1b', at: [0.055, 0.20], w: 460, cls: 'aside', to: 0,
          html: '<p>A coherent <b>9–10 mas</b> pattern between two independently ' +
            'Gaia-anchored solutions — mostly a single shift, common to every band.</p>',
        },
        {
          id: 'c2b', at: [0.055, 0.20], w: 460, cls: 'aside', from: 1,
          html: '<p>Every arrow points the same way. That is not noise: the ' +
            'landscape had moved, and the scatter was hiding it.</p>',
        },
      ],
      notes:
        'The quiet centre of the talk. A systematic looks like noise until you ' +
        'plot it as a field; then it is a displacement. Both solutions are ' +
        'defensible. Nobody made a mistake.',
    },

    /* ====================================================== 16 · ZOOM OUT == */
    {
      id: 'wider',
      name: 'Zoom out',
      camera: { x: 3300, y: -1500, z: 0.30 },
      enter: { dur: 2800, ease: 'slow' },
      set: { far: 1, rock: 1, marks: 1 },
      steps: [
        {},
        {
          set: { newland: 1, marks: 0.55 },
          anim: { newland: 2200 },
          notes:
            'New instrument, new depth, new sky. The old optimum is still there ' +
            'and still correct. It is simply no longer the lowest thing in the ' +
            'world. This is also where 42 finally gets explained: an excellent ' +
            'answer to 6 × 7.',
        },
      ],
      text: [
        { id: 'oldlabel', at: [0.05, 0.115], w: 300, cls: 'callout', html: '<p>the optimum<br>we solved</p>' },
        { id: 'old42', at: [0.305, 0.325], w: 90, cls: 'tiny42', html: '<p>42</p>' },
        {
          id: 'improved', at: [0.60, 0.09], w: 560, cls: 'phrase', from: 1,
          html: '<p>The answer improved the question.</p>',
        },
        {
          id: 'sixseven', at: [0.60, 0.27], w: 480, cls: 'aside', from: 1,
          html: '<p>Forty-two was right. The question was 6 × 7.</p>',
        },
        {
          id: 'newlabel', at: [0.645, 0.795], w: 300, cls: 'callout', from: 1,
          html: '<p>new data,<br>a different lowest place</p>',
        },
        {
          id: 'h16', at: [0.36, 0.68], w: 430, cls: 'aside human', from: 1,
          html: '<p>A source’s position is very nearly a stable latent parameter. ' +
            'A person is not: they change, react, learn, perform, and adapt to ' +
            'being observed.</p>' +
            '<p>The hardest landscapes are the ones that moved because you looked.</p>',
        },
      ],
      notes:
        'Hold on the speck before the new terrain arrives. The rock does not come ' +
        'back because we failed. It comes back because we can now ask something ' +
        'we could not ask before.',
    },

    /* =================================================== 17 · TWO ENDINGS == */
    {
      id: 'endings',
      name: 'Two endings',
      camera: { x: 2760, y: -2150, z: 0.85 },
      enter: { dur: 2200 },
      set: { far: 1, rock: 1, ends: 1 },
      text: [
        {
          id: 'eh', at: [0.055, 0.075], w: 620, cls: 'phrase sm',
          html: '<p>Two ways for a question to end.</p>',
        },
        {
          id: 'e1', at: [0.62, 0.045], w: 420, cls: 'aside',
          html: '<p><b>On the hill.</b> The answer sufficed for the question. ' +
            'Stop, or ask the next one. The summit was always local to the question.</p>',
        },
        {
          id: 'e2', at: [0.115, 0.42], w: 430, cls: 'aside',
          html: '<p><b>On the slope.</b> The answer keeps improving, the theory ' +
            'stays incomplete, and the experiment outlives you. Weinberg’s ' +
            '<em>Dreams of a Final Theory</em>, read half in longing and half in ' +
            'mourning.</p>',
        },
        {
          id: 'e3', at: [0.115, 0.60], w: 400, cls: 'aside',
          html: '<p>Finite observers, inside open-ended inquiry.</p>',
        },
      ],
      notes:
        'The upper ring is the crest, the lower one is the slope below it. The ' +
        'longing/mourning phrase is ours, not a quotation — the reference is to ' +
        'Dreams of a Final Theory, so say it as a reference, not as his words.',
    },

    /* ======================================================== 18 · RETURN == */
    {
      id: 'return',
      name: 'Return',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 3000, ease: 'slow' },
      set: { far: 1, rock: 1 },
      plates: [{
        src: 'assets/closing.png', ar: 1470 / 1524, blend: 1,
        at: [0.66, 0.52], w: 920,
        alt: 'Sisyphus takes a break — playing pinball beside the boulder',
      }],
      steps: [
        {},
        { notes: 'Then the last line, and stop talking.' },
      ],
      text: [
        {
          id: 'fin1', at: [0.055, 0.20], w: 560, cls: 'aside lead',
          html: '<p>Maybe the rock comes back because we keep finding better questions.</p>',
        },
        {
          id: 'fin2', at: [0.055, 0.35], w: 620, cls: 'phrase', from: 1,
          html: '<p>One must imagine the optimizer happy.</p>',
        },
      ],
      notes:
        'Exactly the opening camera — same hill, same scale, and by now it means ' +
        'something else. There is no universal loss, no compression sufficient for ' +
        'every question, and no observer with all the information. The purpose was ' +
        'never to stop pushing.',
    },
  ];

  /* Fallback values for every animatable layer, so a scene only has to name
     what it changes.                                                        */
  S.DEFAULT_SET = {
    far: 1, rock: 1, line: 1, axes: 0, curmark: 0, curve: 0, ruler: 0,
    humanrule: 0, cands: 0, ball: 0, newland: 0, marks: 0, m: 0, roll: 1,
    sound: 0, approx1: 0, approx2: 0, approx3: 0,
    entropy: 0, surprise: 0, kl: 0, fisher: 0,
    fork1: 0, fork2: 0, fork3: 0,
    combR: 0, combE: 0, combJ: 0, latent: 0,
    astro1: 0, astro2: 0, shift: 0, here: 0, ends: 0,
  };
})();
