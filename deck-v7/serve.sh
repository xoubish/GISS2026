#!/usr/bin/env bash
# The presenter view reads index.html over fetch(), which the browser blocks on file://.
# Serve the folder and open both windows from http://localhost:8000.
cd "$(dirname "$0")" || exit 1
echo "deck:      http://localhost:8000/index.html"
echo "presenter: http://localhost:8000/presenter.html   (or press P in the deck)"
exec python3 -m http.server 8000
