# steel-tide-mods

The public registry of mods for [Steel Tide](https://steelti.de), the browser RTS.
A mod adds **units, buildings and upgrade levels** — described in one `mod.json`,
with sprite sheets beside it if the author drew some — and every folder under
`mods/` here is listed in the game under *Settings → Mods* and on
[steelti.de/mods](https://steelti.de/mods).

- **Play one:** in the game, *Settings → Mods → Official registry → Install*, or
  open `https://play.steelti.de/?mod=<id>`.
- **Make one:** read the [modding guide](https://steelti.de/wiki/modding) — the
  whole format, generated from the game's own validator — or give it to a
  coding agent as a skill: `npx skills add rivertwilight/steel-tide-mods --skill steel-tide-mods-guideline`
  ([skills.sh](https://skills.sh); the same text is [`AGENTS.md`](AGENTS.md)).
  A Rusted Warfare mod can be [converted in the browser](https://steelti.de/mods/convert).
- **Publish one:** fork, add `mods/<id>/`, run the check, open a pull request.

## Adding a mod

```
mods/<id>/
  mod.json        the manifest — `id` must equal the folder name
  sprites/*.png   the sheets it names, if any
  README.md       a few lines on what it is (shown nowhere yet, read by people)
```

```sh
node tools/check.mjs mods/<id>      # every error with its path into mod.json
node tools/pack.mjs mods/<id>       # optional: one .steel-tide-mod file to share
```

The check is the one the game runs on load, plus what only the registry can
know: the folder is named after the id, every sheet exists, and no def id,
alias or sheet key is taken by another published mod. **Ids are global** —
prefix a generic word with your mod's id (`ironworks-bunker`, not `bunker`).
CI runs the same check on every pull request; once merged, `index.json` is
rebuilt on `main` and the mod is live.

Bump `version` for every change: the game offers the update to whoever has
the mod installed.

## What is here

| Path | What |
| --- | --- |
| `mods/<id>/` | one mod each; `mods/bison-ii` is the smallest possible one, `mods/ironworks` has its own art, a building and an upgrade level |
| `index.json` | what the game and the website read — generated, never edited by hand |
| `tools/check.mjs` | validate one mod or all of them |
| `tools/build-index.mjs` | rebuild `index.json` (CI does this on `main`) |
| `tools/pack.mjs` | a mod folder into the single-file form the game's *Upload file…* takes |
| `tools/steel-tide-mod.mjs` | the game's own mod code — validator, resolver, the vanilla roster — bundled from the game repository; do not edit here |
| `AGENTS.md` | the brief for a coding agent: the whole format, how to test, how to publish |
| `skills/steel-tide-mods-guideline/` | the same brief as a skill for `npx skills add` |
| `mods/<id>/PROMPTS.md` | how a mod's sheets were painted, where they were generated |

## Licence

The tooling is MIT. Each mod is published under the licence its `mod.json`
names — CC-BY-4.0 unless it says otherwise — and belongs to its author. By
opening a pull request you confirm you have the right to publish the mod's
art under that licence.
