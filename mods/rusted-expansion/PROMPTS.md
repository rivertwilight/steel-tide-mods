# Rusted Expansion — how its sheets were painted

Ten sheets in the game's own sprite contract — a hull and a turret for each
vehicle that has one, a single up-facing image for the rest — painted with
the game's generator through the Vercel AI Gateway, `openai/gpt-image-2` at
high quality, in two runs:

```sh
pnpm -C game sprites:gen --doc ../steel-tide-mods/mods/rusted-expansion/PROMPTS.md --out ../steel-tide-mods/mods/rusted-expansion/sprites u.rusted-tank tur.rusted-tank u.rusted-heavy-tank tur.rusted-heavy-tank u.rusted-helicopter
pnpm -C game sprites:gen --doc ../steel-tide-mods/mods/rusted-expansion/PROMPTS.md --out ../steel-tide-mods/mods/rusted-expansion/sprites u.rusted-bomber u.rusted-gun-boat tur.rusted-gun-boat u.rusted-battle-ship tur.rusted-battle-ship
```

The shapes nod to Rusted Warfare's — boxy, simple, readable at twenty pixels
— in this game's palette. The masters are cut to a 512 px side for the
registry; the loader resamples them to the `fw`/`fh` in `mod.json`.

#### Tank — hull — `u.rusted-tank.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 220×260 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a simple boxy medium tank HULL WITHOUT ITS TURRET in the spirit of a classic minimalist mobile RTS, seen from directly above, facing straight up toward the top edge and centered in the image. A plain rectangular hull with softly chamfered corners, two full-length tracks, a flat front glacis, a small engine grille at the rear, and one empty dark circular turret mounting ring exactly at the image center. Big flat panels, very few details — clean and readable, not busy. Do not draw a turret, gun, or barrel.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: one broad band across the rear deck in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no terrain, no track marks. The engine draws the shadow itself and composites the turret onto the center ring.
```

```json
{ "key": "u.rusted-tank", "file": "sprites/u.rusted-tank.png", "frames": 1, "rotated": true, "fw": 22, "fh": 26 }
```

#### Tank — turret — `tur.rusted-tank.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 180×340 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a simple round tank turret in the spirit of a classic minimalist mobile RTS, seen from directly above, facing straight up toward the top edge and centered horizontally: a plain circular turret body with one round hatch and a single straight cannon barrel extending upward. The turret's mounting-ring center sits on the vertical centerline at exactly 68% of the image height from the top; the barrel extends upward from it with no perspective bend. Big simple shapes, bold and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: the hatch cover in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no hull, no muzzle flash, no base plate. This part rotates in-engine on top of the separate tank hull. Keep the mounting-ring center fixed at 68% image height.
```

```json
{ "key": "tur.rusted-tank", "file": "sprites/tur.rusted-tank.png", "frames": 1, "rotated": true, "fw": 18, "fh": 34, "pivotY": 0.72 }
```

#### Heavy Tank — hull — `u.rusted-heavy-tank.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 220×260 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a big boxy heavy tank HULL WITHOUT ITS TURRET in the spirit of a classic minimalist mobile RTS, seen from directly above, facing straight up toward the top edge and centered in the image. A wide slab-sided hull, two very wide full-length tracks, a thick flat glacis with a row of bolted armor plates, twin exhaust stacks at the rear corners, and one empty dark circular turret mounting ring exactly at the image center. Big flat panels, few details — bold and readable. Do not draw a turret, gun, missile or barrel.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: a broad stripe down each track guard in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no terrain, no track marks. The engine draws the shadow itself and composites the turret onto the center ring.
```

```json
{ "key": "u.rusted-heavy-tank", "file": "sprites/u.rusted-heavy-tank.png", "frames": 1, "rotated": true, "fw": 26, "fh": 32 }
```

#### Heavy Tank — turret — `tur.rusted-heavy-tank.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 180×340 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a heavy tank turret in the spirit of a classic minimalist mobile RTS, seen from directly above, facing straight up toward the top edge and centered horizontally: a wide squared-off turret body with one big straight cannon barrel extending upward from its center and a small boxy anti-air missile pod bolted to its right side, missile tip pointing up. The turret's mounting-ring center sits on the vertical centerline at exactly 68% of the image height from the top; the barrel extends upward from it with no perspective bend. Big simple shapes, bold and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: the top of the missile pod in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no hull, no muzzle flash, no base plate. This part rotates in-engine on top of the separate tank hull. Keep the mounting-ring center fixed at 68% image height.
```

```json
{ "key": "tur.rusted-heavy-tank", "file": "sprites/tur.rusted-heavy-tank.png", "frames": 1, "rotated": true, "fw": 22, "fh": 40, "pivotY": 0.70 }
```

#### Helicopter — `u.rusted-helicopter.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 200×260 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a simple boxy attack helicopter in the spirit of a classic minimalist mobile RTS, seen from directly above, facing straight up toward the top edge and centered in the image: a narrow fuselage with a rounded nose and a small dark cockpit window, a tail boom running straight down to a small tail fin, two short stub wings each carrying one plain gun pod, and the main rotor drawn as a static four-blade cross seen from above. Big simple shapes, bold and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines, cockpit glass #5fcde4.

Faction markers: a band across the tail boom and the tips of the stub wings in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no motion blur, no terrain. The engine draws the shadow and spins the rotor itself.
```

```json
{ "key": "u.rusted-helicopter", "file": "sprites/u.rusted-helicopter.png", "frames": 1, "rotated": true, "fw": 20, "fh": 26 }
```

#### Bomber — `u.rusted-bomber.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 240×270 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a big slow heavy bomber in the spirit of a classic minimalist mobile RTS, seen from directly above, facing straight up toward the top edge and centered in the image: a thick fuselage with a blunt nose, broad straight wings with two plain engine nacelles on each, a wide flat tail with twin fins, and a row of three bomb-bay doors along the belly centerline. Big flat panels, very few details — bold and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines, cockpit glass #5fcde4.

Faction markers: a broad band across each wing near its tip in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no ground, no cast shadow, no contrails, no terrain. The engine draws the shadow itself.
```

```json
{ "key": "u.rusted-bomber", "file": "sprites/u.rusted-bomber.png", "frames": 1, "rotated": true, "fw": 30, "fh": 34 }
```

#### Gun Boat — hull — `u.rusted-gun-boat.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 140×260 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a small fast gun boat HULL WITHOUT ITS GUN in the spirit of a classic minimalist mobile RTS, seen from directly above, bow pointing straight up toward the top edge and centered in the image: a narrow pointed hull, a small low cabin astern of the middle, and one empty dark circular mounting ring exactly at the image center where the gun will sit. Big simple shapes, bold and readable. Do not draw a gun or barrel.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: a band across the cabin roof in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no water, no wake, no cast shadow, no terrain. The engine draws the wake and composites the gun onto the ring.
```

```json
{ "key": "u.rusted-gun-boat", "file": "sprites/u.rusted-gun-boat.png", "frames": 1, "rotated": true, "fw": 14, "fh": 26 }
```

#### Gun Boat — gun — `tur.rusted-gun-boat.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 100×160 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a small deck autocannon mount in the spirit of a classic minimalist mobile RTS, seen from directly above, facing straight up toward the top edge and centered horizontally: a plain round pedestal with a small gun shield and one short barrel extending upward. The mount's rotation-ring center sits on the vertical centerline at exactly 60% of the image height from the top. Big simple shapes, bold and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: the top of the gun shield in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no deck, no water, no cast shadow, no muzzle flash. This part rotates in-engine on top of the separate hull. Keep the ring center fixed at 60% image height.
```

```json
{ "key": "tur.rusted-gun-boat", "file": "sprites/tur.rusted-gun-boat.png", "frames": 1, "rotated": true, "fw": 10, "fh": 16, "pivotY": 0.66 }
```

#### Battle Ship — hull — `u.rusted-battle-ship.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 130×310 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a long heavy battleship HULL WITHOUT ITS TURRETS in the spirit of a classic minimalist mobile RTS, seen from directly above, bow pointing straight up toward the top edge and centered in the image: a long slab-sided hull with a pointed bow and a squared stern, a blocky bridge superstructure amidships with one funnel behind it, and one empty dark circular mounting ring exactly at the image center where the main turret will sit; the bridge and funnel stand astern of it. Big flat panels, few details — bold and readable. Do not draw a turret, gun or barrel.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: a band around the funnel and a stripe along each side of the hull in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no water, no wake, no cast shadow, no terrain. The engine draws the wake and composites the turret onto the ring.
```

```json
{ "key": "u.rusted-battle-ship", "file": "sprites/u.rusted-battle-ship.png", "frames": 1, "rotated": true, "fw": 26, "fh": 62 }
```

#### Battle Ship — turret — `tur.rusted-battle-ship.png`

```text
Pixel-art sprite for a 2D real-time strategy game, PNG with fully transparent background, ONE single static image exactly 180×320 pixels. No animation frames, no strip, no border, no label, and no background of any kind.

Subject: a big naval gun turret in the spirit of a classic minimalist mobile RTS, seen from directly above, facing straight up toward the top edge and centered horizontally: a wide squared-off turret body with two long parallel gun barrels extending upward. The turret's rotation-ring center sits on the vertical centerline at exactly 60% of the image height from the top; the barrels extend upward from it with no perspective bend. Big simple shapes, bold and readable.

Style: crisp pixel art on a strict pixel grid, hard edges, no anti-aliasing halos, no blur, no glow; muted military grays (#696a6a #847e87 #9badb7 #595652 #323c39) with dark #222034 silhouette outlines.

Faction markers: a panel on the turret roof in pure magenta only — highlight #FF66FF, base #FF00FF, shadow #990099. Magenta appears nowhere else.

Isolation rule: no deck, no water, no cast shadow, no muzzle flash. This part rotates in-engine on top of the separate hull. Keep the ring center fixed at 60% image height.
```

```json
{ "key": "tur.rusted-battle-ship", "file": "sprites/tur.rusted-battle-ship.png", "frames": 1, "rotated": true, "fw": 18, "fh": 32, "pivotY": 0.70 }
```
