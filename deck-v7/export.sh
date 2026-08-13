#!/usr/bin/env bash
# Conference-room fallback. No npm install: drives the copy of Chrome already on the machine.
#
#   ./export.sh pdf     one page per slide, all builds revealed  -> out/deck.pdf
#   ./export.sh png     one PNG per build state, in order        -> out/frames/
#   ./export.sh         both
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME"; exit 1; }
mkdir -p out
MODE="${1:-both}"

if [ "$MODE" = "pdf" ] || [ "$MODE" = "both" ]; then
  echo "→ out/deck.pdf"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$PWD/out/deck.pdf" "file://$PWD/index.html" 2>/dev/null
fi

if [ "$MODE" = "png" ] || [ "$MODE" = "both" ]; then
  echo "→ out/frames/"
  rm -rf out/frames && mkdir -p out/frames
  # Enumerate every stop: slide 1, slide 1 build 1, ... in presentation order.
  node -e '
    const fs = require("fs");
    const html = fs.readFileSync("index.html", "utf8");
    const slides = html.split(/<section class="slide/).slice(1);
    const stops = [];
    slides.forEach((s, i) => {
      const n = (s.match(/class="[^"]*\bbuild\b/g) || []).length;
      for (let b = 0; b <= n; b++) stops.push(`${i + 1}${b ? "." + b : ""}`);
    });
    fs.writeFileSync("out/.stops", stops.join("\n"));
    console.log(`  ${slides.length} slides, ${stops.length} frames`);
  '
  k=0
  while read -r stop; do
    [ -n "$stop" ] || continue
    k=$((k + 1))
    printf -v name "out/frames/%03d_%s.png" "$k" "$stop"
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
      --window-size=1920,1080 --screenshot="$PWD/$name" \
      "file://$PWD/index.html#/$stop" 2>/dev/null
  done < <(cat out/.stops; echo)
  rm -f out/.stops
  echo "  $k frames written"
fi
