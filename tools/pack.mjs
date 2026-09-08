#!/usr/bin/env node
/**
 * Pack a mod folder into the single-file form the game's "Upload file…"
 * takes — mod.json with every sheet and sound embedded as a data URL:
 *
 *   node tools/pack.mjs mods/my-mod [out.steel-tide-mod]
 *
 * Handy for sharing a mod that is not (yet) in the registry.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MOD_FILE_EXT, parseMod } from './steel-tide-mod.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const [folderArg, outArg] = process.argv.slice(2);
if (!folderArg) {
  console.error('usage: node tools/pack.mjs mods/<id> [out]');
  process.exit(2);
}
const folder = resolve(folderArg);
const parsed = parseMod(readFileSync(join(folder, 'mod.json'), 'utf8'));
if (!parsed.ok) {
  for (const e of parsed.errors) console.error(`✗ ${e.path}: ${e.message}`);
  process.exit(1);
}
const MIME = { '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg' };
const files = {};
for (const { file } of [...(parsed.mod.sprites ?? []), ...(parsed.mod.sounds ?? [])]) {
  const bytes = readFileSync(join(folder, file));
  const mime = MIME[extname(file).toLowerCase()] ?? 'application/octet-stream';
  files[file] = `data:${mime};base64,${bytes.toString('base64')}`;
}
const out = outArg ? resolve(outArg) : resolve(here, '..', 'dist', `${basename(folder)}${MOD_FILE_EXT}`);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ ...parsed.mod, files }, null, 2));
console.log(`wrote ${out}`);
