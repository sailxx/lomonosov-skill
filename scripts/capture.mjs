// Records a real scripted tutoring session for the README and the landing page.
// Usage: node scripts/capture.mjs out.json "student msg 1" "student msg 2" ...
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [out, ...msgs] = process.argv.slice(2);
const cwd = fs.mkdtempSync(path.join(ROOT, '.eval-'));
let session;
const log = [];
for (const m of msgs) {
  const args = ['-p', m, '--plugin-dir', path.join(ROOT, 'plugins/lomonosov-skill'), '--output-format', 'json'];
  if (session) args.push('--resume', session);
  const r = spawnSync('claude', args, { cwd, encoding: 'utf8', timeout: 240000 });
  const j = JSON.parse(r.stdout);
  session = j.session_id;
  log.push({ student: m, tutor: String(j.result).trim() });
}
fs.writeFileSync(out, JSON.stringify(log, null, 2));
fs.rmSync(cwd, { recursive: true, force: true });
