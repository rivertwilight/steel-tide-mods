#!/usr/bin/env node
/**
 * Write index.json — what the game's Settings → Mods and steelti.de/mods
 * read: one entry per folder under mods/ that validates, with the defs and
 * sheets summarised and each sheet's pixel size for the website's
 * thumbnails. Run by CI on every push to main; run it yourself to see what
 * the entry for your mod will look like.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { indexEntryFor, modRegistryBase, parseMod } from './steel-tide-mod.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

function pngSize(bytes) {
  if (bytes.length < 24 || bytes[0] !== 0x89 || bytes[1] !== 0x50) return null;
  return { w: bytes.readUInt32BE(16), h: bytes.readUInt32BE(20) };
}

function lastChange(path) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI', '--', path], { cwd: root, encoding: 'utf8' }).trim() || undefined;
  } catch {
    return undefined;
  }
}

const mods = [];
for (const name of readdirSync(join(root, 'mods')).sort()) {
  const folder = join(root, 'mods', name);
  if (!statSync(folder).isDirectory() || !existsSync(join(folder, 'mod.json'))) continue;
  const parsed = parseMod(readFileSync(join(folder, 'mod.json'), 'utf8'));
  if (!parsed.ok || parsed.mod.id !== name) {
    console.warn(`skipping mods/${name}: ${parsed.ok ? 'id does not match the folder' : 'does not validate'}`);
    continue;
  }
  const sizes = {};
  for (const sheet of parsed.mod.sprites ?? []) {
    const file = join(folder, sheet.file);
    if (!existsSync(file)) continue;
    const size = pngSize(readFileSync(file));
    if (size) sizes[sheet.file] = size;
  }
  mods.push(indexEntryFor(parsed.mod, `mods/${name}`, modRegistryBase(name), sizes, lastChange(`mods/${name}`)));
}

const index = { format: 'steel-tide-mod-index', v: 1, generated: new Date().toISOString(), mods };
writeFileSync(join(root, 'index.json'), JSON.stringify(index, null, 2) + '\n');
console.log(`index.json: ${mods.length} mod${mods.length === 1 ? '' : 's'}`);
