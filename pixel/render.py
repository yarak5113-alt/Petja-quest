"""Wandelt alle Figuren-Arrays (pixel/*.json) in PNG-Bilder um.

Aufruf:  pip install pillow
         python pixel/render.py            -> PNGs in Originalgröße (500 px hoch)
         python pixel/render.py 4          -> 4-fach vergrößert (scharfe Pixel)
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).parent
SCALE = int(sys.argv[1]) if len(sys.argv) > 1 else 1


def hex_to_rgba(h):
    if h is None:                       # "." bzw. ".." = transparent
        return (0, 0, 0, 0)
    h = h.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), 255)


for path in sorted(HERE.glob("*.json")):
    data = json.loads(path.read_text(encoding="utf-8"))
    pal = {sym: hex_to_rgba(col) for sym, col in data["palette"].items()}
    if data.get("format") == "rle":     # kompakt: pro Zeile "Zeichen + Anzahl", Rest transparent
        w, h = data["width"], data["height"]
        pixels = []
        for row in data["rows"]:
            line = []
            for sym, n in re.findall(r"(\D)(\d*)", row):
                line += [pal[sym]] * int(n or 1)
            pixels += line + [(0, 0, 0, 0)] * (w - len(line))
    else:
        grid = data["grid"]
        cl = data.get("code_len", 1)    # Zeichen pro Pixel (2 bei vielen Farbtönen)
        w, h = len(grid[0]) // cl, len(grid)
        pixels = [pal[row[i:i + cl]] for row in grid for i in range(0, len(row), cl)]

    img = Image.new("RGBA", (w, h))
    img.putdata(pixels)
    if SCALE > 1:
        img = img.resize((w * SCALE, h * SCALE), Image.NEAREST)

    out = path.with_suffix(".png")
    img.save(out)
    print(f"{out.name}: {w}x{h} px" + (f" (x{SCALE})" if SCALE > 1 else ""))
