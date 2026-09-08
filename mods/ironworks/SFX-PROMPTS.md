# Ironworks — how its sounds were recorded

Two one-shots in the game's own sound contract — dry, close-miked, no
reverb tail, under a second — generated with the game's sound-effects
generator (ElevenLabs) and cut the way the game cuts its own:

```sh
pnpm -C game sfx:gen --doc ../steel-tide-mods/mods/ironworks/SFX-PROMPTS.md --out /tmp/ironworks-sfx ironworks-autocannon ironworks-pods
node game/scripts/build-sfx.mjs --src /tmp/ironworks-sfx --out ../steel-tide-mods/mods/ironworks/sfx
```

A slot's name is its `sounds` key in `mod.json`, and every key starts with
the mod's id so it can clash with nothing.

### `ironworks-autocannon` — 0.7 s · influence 0.6 · keep 1

```text
Single burst of two shots from a twin heavy autocannon fired from a concrete emplacement: two hard punchy cannon cracks in quick succession with a hollow metallic ring off the pit walls, dry and close-miked, quick decay, no echo tail. One-shot military game weapon sound.
```

### `ironworks-pods` — 0.7 s · influence 0.6 · keep 1

```text
Salvo of four small rockets leaving twin pod launchers on a fast hover vehicle: four quick fizzing ignitions and crackling whooshes in rapid sequence over a faint turbine fan whine, dry, tight, departing fast, no explosion, no echo. One-shot military game weapon sound.
```
