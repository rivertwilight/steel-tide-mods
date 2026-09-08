# Bison II — how its sheets were painted

Two rotating parts, one up-facing image each, in the game's own sprite
contract: the hull without its turret, and the turret with its ring at a
stated height. Painted with the game's generator through the Vercel AI
Gateway, `openai/gpt-image-2` at high quality:

```sh
pnpm -C game sprites:gen --doc ../steel-tide-mods/mods/bison-ii/PROMPTS.md --out ../steel-tide-mods/mods/bison-ii/sprites u.bison2 tur.bison2
```

The loader rescales each image to the `fw`/`fh` in `mod.json`, bakes the 24
headings and recolours the magenta markers per faction.

#### Bison II — hull — `u.bison2.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 220×260 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a heavy main battle tank HULL WITHOUT ITS TURRET, seen from directly above, facing straight up toward the top edge and centered in the image. An up-armored evolution of a modern MBT: two wide full-length tracks with heavy side skirts, a thick wedge-shaped front glacis with a row of applique armor blocks, a long engine deck with two exhaust stacks at the rear, a stowage rack across the tail, and one empty dark circular turret mounting ring exactly at the image center. Do not draw a turret, gun, or barrel — the turret is a separate rotating sprite. Keep the silhouette solid, wide and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: one long stripe on each side skirt and a small chevron on the glacis in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no terrain, no track marks. The engine draws the shadow itself and composites the turret onto the center ring.
```

```json
{ "key": "u.bison2", "file": "sprites/u.bison2.png", "frames": 1, "rotated": true, "fw": 24, "fh": 28 }
```

#### Bison II — turret — `tur.bison2.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 180×340 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a heavy tank turret seen from directly above, facing straight up toward the top edge and centered horizontally. A wide angular armored turret body with a closed commander hatch, a boxy bustle with stowage at the rear, a small sensor mast on one side, and one long heavy cannon with a large muzzle brake extending straight upward. The turret's mounting-ring center sits on the vertical centerline at exactly 68% of the image height from the top; the cannon extends upward from it with no perspective bend. Keep it bold and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: the hatch cover and a band across the bustle in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no hull, no muzzle flash, no base plate. This part rotates in-engine on top of the separate tank hull. Keep the mounting-ring center fixed at 68% image height.
```

```json
{ "key": "tur.bison2", "file": "sprites/tur.bison2.png", "frames": 1, "rotated": true, "fw": 20, "fh": 38, "pivotY": 0.73 }
```
