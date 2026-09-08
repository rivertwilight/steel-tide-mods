# Bison II

The smallest mod there is: the Bison main battle tank, copied with `extends`
and re-tuned into a Tier-3 heavy that needs a Radar Station. It is built
wherever the Bison is, and AI opponents field it too.

It has its own hull and turret — two up-facing images the game bakes into 24
headings, keyed `u.bison2` and `tur.bison2`, which is why the def needs no
`sprite` line: a sheet named after the def is used before the base's art.
`PROMPTS.md` is how they were painted.

Copy this folder to start your own.
