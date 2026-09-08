# Ironworks — how its sheets were painted

Two sheets in the game's own sprite contract: a hull as one up-facing image
(the pod is part of the hull, so there is no turret), and a building as one
top-down frame filling its 2×2-tile footprint. Painted with the game's
generator through the Vercel AI Gateway, `openai/gpt-image-2` at high quality:

```sh
pnpm -C game sprites:gen --doc ../steel-tide-mods/mods/ironworks/PROMPTS.md --out ../steel-tide-mods/mods/ironworks/sprites u.ironworks-hover u.ironworks-bunker
```

The Fusion Plant extends `power3` and keeps its art.

#### Skimmer hover tank — `u.ironworks-hover.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 220×260 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a fast military hover tank seen from directly above, facing straight up toward the top edge and centered in the image. A low, wide, wedge-shaped hull on an inflated hover skirt that bulges out along both flanks, a small tinted cockpit canopy set into the hull, two fixed rocket-pod launchers mounted flat on the front deck pointing straight up, and two round thruster nozzles at the rear. It has no turret and no mounting ring — every weapon is fixed to the hull. Keep the silhouette solid and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines, canopy glass #5fcde4.

Faction markers: one broad band across the hull behind the canopy and the rims of the two rear nozzles in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no dust, no terrain. The engine draws the shadow itself.
```

```json
{ "key": "u.ironworks-hover", "file": "sprites/u.ironworks-hover.png", "frames": 1, "rotated": true, "fw": 24, "fh": 26 }
```

#### Bunker — `u.ironworks-bunker.png`

```text
Pixel-art sprite for a 2D real-time strategy game, a PNG with an alpha channel: every pixel that is not part of the bunker is fully transparent (alpha 0). ONE static image exactly 256×256 pixels. No animation frames, no strip, no borders, no labels. Do not paint a floor, a backdrop, a gradient, a vignette or a sky behind it — the sprite is composited onto the game's own terrain.

Subject: a squat reinforced concrete bunker — a sunken circular gun pit ringed by a thick raised concrete wall, one wide horizontal firing slit facing south (toward the bottom edge) with the tip of a fixed autocannon barrel showing in it, sandbag stacks at the four corners of a square concrete pad, and a short antenna mast on the north side. Favor large clean shapes over tiny greebles — bold and readable, not busy.

Camera: top-down RTS view with a slight southern tilt — the pit and pad top dominant, a narrow south-facing wall edge visible along the bottom. Sunlight from the top-left, shadows only inside the sprite.

Ground rule: the square concrete pad fills the whole 256×256 image edge to edge; nothing extends outside it. No ground plane, no floor tiles, no cast shadow, no terrain.

Style: crisp pixel art, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39, outline #222034), sandbags in muted khaki.

Faction markers: a banner panel on the north wall and a stripe along the south wall in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.
```

```json
{ "key": "u.ironworks-bunker", "file": "sprites/u.ironworks-bunker.png", "frames": 1 }
```
