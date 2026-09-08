#!/usr/bin/env node
/**
 * Check one mod, or every mod in the registry:
 *
 *   node tools/check.mjs                 every folder under mods/
 *   node tools/check.mjs mods/my-mod     one folder (anywhere on disk)
 *
 * The same validation the game runs on load — every error with its path
 * into mod.json — plus what only the registry can know: the folder is named
 * after the mod's id, every sheet it names exists and is an image, and no
 * def id, alias or sheet key is taken by another published mod. Exit code 1
 * on any error; warnings are printed and do not fail.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyMods, parseMod } from './steel-tide-mod.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const MAX_SHEET_BYTES = 4 * 1024 * 1024;

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const folders = args.length > 0
  ? args.map((a) => resolve(a))
  : readdirSync(join(root, 'mods')).map((d) => join(root, 'mods', d)).filter((d) => statSync(d).isDirectory()).sort();

let failed = false;
const loaded = [];

function isImage(bytes) {
  const png = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const jpg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const webp = bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  return png || jpg || webp;
}

for (const folder of folders) {
  const label = `mods/${basename(folder)}`;
  const errors = [];
  const warnings = [];
  const manifestPath = join(folder, 'mod.json');
  if (!existsSync(manifestPath)) {
    console.error(`✗ ${label}: no mod.json`);
    failed = true;
    continue;
  }
  const parsed = parseMod(readFileSync(manifestPath, 'utf8'));
  warnings.push(...parsed.warnings);
  if (!parsed.ok) errors.push(...parsed.errors);
  else {
    const mod = parsed.mod;
    if (mod.id !== basename(folder)) errors.push({ path: 'mod.id', message: `is "${mod.id}" but the folder is "${basename(folder)}"` });
    if (mod.files) errors.push({ path: 'mod.files', message: 'the registry takes files beside mod.json, not embedded' });
    for (const [i, sheet] of (mod.sprites ?? []).entries()) {
      const file = join(folder, sheet.file);
      if (!existsSync(file)) { errors.push({ path: `sprites[${i}].file`, message: `${sheet.file} is missing` }); continue; }
      const bytes = readFileSync(file);
      if (!isImage(bytes)) errors.push({ path: `sprites[${i}].file`, message: `${sheet.file} is not a PNG, WebP or JPEG` });
      if (bytes.length > MAX_SHEET_BYTES) errors.push({ path: `sprites[${i}].file`, message: `${sheet.file} is ${(bytes.length / 1048576).toFixed(1)} MB; keep a sheet under 4` });
    }
    if (!existsSync(join(folder, 'README.md'))) warnings.push({ path: 'README.md', message: 'a README tells players what the mod is about' });
    loaded.push({ mod, label });
  }
  for (const e of errors) console.error(`  ✗ ${label} ${e.path}: ${e.message}`);
  for (const w of warnings) console.warn(`  ! ${label} ${w.path}: ${w.message}`);
  if (errors.length > 0) failed = true;
  else console.log(`✓ ${label} (${parsed.mod.defs.length} defs, ${(parsed.mod.sprites ?? []).length} sheets)`);
}

// what only the whole registry can tell: two mods claiming the same id, alias or sheet key
if (args.length > 0) {
  // a single folder is checked against everything already published
  const others = readdirSync(join(root, 'mods'))
    .map((d) => join(root, 'mods', d))
    .filter((d) => statSync(d).isDirectory() && !folders.includes(d) && existsSync(join(d, 'mod.json')))
    .map((d) => parseMod(readFileSync(join(d, 'mod.json'), 'utf8')))
    .filter((p) => p.ok)
    .map((p) => ({ mod: p.mod, label: `mods/${p.mod.id}` }));
  loaded.unshift(...others);
}
const report = applyMods(loaded.map((l) => l.mod));
for (const r of report.rejected) {
  // the checked folders come last, so a clash is reported against the newcomer
  for (const e of r.errors) console.error(`  ✗ mods/${r.id} ${e.path}: ${e.message}`);
  failed = true;
}
const keys = new Map();
for (const { mod } of loaded) {
  for (const s of mod.sprites ?? []) {
    if (keys.has(s.key)) { console.error(`  ✗ mods/${mod.id}: sheet key "${s.key}" is also in mods/${keys.get(s.key)}`); failed = true; }
    keys.set(s.key, mod.id);
  }
}

if (failed) {
  console.error('\nsome mods have errors');
  process.exit(1);
}
console.log(`\n${loaded.length} mod${loaded.length === 1 ? '' : 's'} ok`);
