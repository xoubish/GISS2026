#!/usr/bin/env python3
"""
export_pptx.py — regenerate Presentation.pptx from the deck.

Drives headless Chrome through every scene and beat of final/index.html,
captures each frame at retina resolution, pulls each beat's presenter notes
out of scenes.js, and assembles a 16:9 PowerPoint with the notes in the
speaker-notes field.

Run it from anywhere:

    final/tools/venv/bin/python final/tools/export_pptx.py

Output: Presentation.pptx at the repo root (overwritten every run — the
pptx is a build artifact; the deck is the source of truth). Close the file
in PowerPoint before re-running.
"""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
FINAL = REPO / "final"
OUT = REPO / "Presentation.pptx"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SIZE = "3200,1800"          # capture size (2x of the 1600x900 stage)
BARE = True                 # hide hud / progress marks in the captures

# ---- 1 · enumerate scenes, beats and notes from scenes.js itself --------
ENUM_JS = """
global.window = {};
require(%r);
require(%r);
const S = window.SIS;
const out = [];
S.SCENES.forEach((sc) => {
  const steps = sc.steps && sc.steps.length ? sc.steps : [{}];
  steps.forEach((st, k) => out.push({
    id: sc.id, name: sc.name, step: k, nsteps: steps.length,
    notes: (st.notes || sc.notes || '').trim(),
  }));
});
console.log(JSON.stringify(out));
""" % (str(FINAL / "js" / "terrain.js"), str(FINAL / "js" / "scenes.js"))

beats = json.loads(subprocess.check_output(["node", "-e", ENUM_JS], text=True))
print(f"{len(beats)} beats across {len({b['id'] for b in beats})} scenes")

# ---- 2 · capture every beat ---------------------------------------------
shots = []
tmp = Path(tempfile.mkdtemp(prefix="deck-export-"))
for i, b in enumerate(beats, 1):
    png = tmp / f"{i:02d}-{b['id']}-{b['step']}.png"
    url = (f"file://{FINAL}/index.html?scene={b['id']}&step={b['step']}"
           f"&instant=1" + ("&bare=1" if BARE else ""))
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", f"--window-size={SIZE}",
         f"--screenshot={png}", url],
        check=True, capture_output=True)
    # JPEG keeps the soft gradients at a tenth of the size; q90 stays crisp
    jpg = png.with_suffix(".jpg")
    subprocess.run(
        ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "90",
         str(png), "--out", str(jpg)],
        check=True, capture_output=True)
    shots.append((jpg, b))
    print(f"  [{i:2d}/{len(beats)}] {b['id']} · {b['step'] + 1}/{b['nsteps']}")

# ---- 3 · assemble the pptx ----------------------------------------------
from pptx import Presentation
from pptx.util import Inches

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank = prs.slide_layouts[6]

for png, b in shots:
    slide = prs.slides.add_slide(blank)
    slide.shapes.add_picture(str(png), 0, 0,
                             width=prs.slide_width, height=prs.slide_height)
    head = f"{b['name']} — beat {b['step'] + 1}/{b['nsteps']}"
    slide.notes_slide.notes_text_frame.text = f"{head}\n\n{b['notes']}"

prs.save(OUT)
mb = OUT.stat().st_size / 1e6
print(f"wrote {OUT.name}: {len(shots)} slides, {mb:.0f} MB")
