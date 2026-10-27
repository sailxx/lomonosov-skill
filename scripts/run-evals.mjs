// Runs behavior checks from evals/cases.json against the plugin through `claude -p`.
// Each case replays real turns: setup messages, then the case's own turns, resuming one session.
// Only the last reply is checked with the case's regexes.
// Usage: node scripts/run-evals.mjs [case-id ...]   (EVAL_MODEL=sonnet to pick a model)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { setup, cases } = JSON.parse(fs.readFileSync(path.join(ROOT, 'evals/cases.json'), 'utf8'));
const only = process.argv.slice(2);
const tmp = fs.mkdtempSync(path.join(ROOT, '.eval-'));
let failed = 0;

function ask(prompt, session) {
  const args = ['-p', prompt, '--plugin-dir', path.join(ROOT, 'plugins/lomonosov-skill'), '--output-format', 'json'];
  if (session) args.push('--resume', session);
  if (process.env.EVAL_MODEL) args.push('--model', process.env.EVAL_MODEL);
  const r = spawnSync('claude', args, { cwd: tmp, encoding: 'utf8', timeout: 240000 });
  try {
    const j = JSON.parse(r.stdout);
    return { text: String(j.result || '').trim(), session: j.session_id };
  } catch {
    return { text: '', session, err: (r.stderr || r.stdout || '').slice(0, 200) };
  }
}

for (const c of cases.filter((x) => !only.length || only.includes(x.id))) {
  const turns = c.fresh ? c.turns : c.turns.length === 1 && c.turns[0].startsWith('/lomonosov-skill:teach') ? c.turns : [...setup, ...c.turns];
  let session, out = '', err;
  for (const t of turns) {
    ({ text: out, session, err } = ask(t, session));
    if (process.env.EVAL_DEBUG) console.log(`  > ${t}`, `\n  < ${out.slice(0, 300)}`.replace(/\s+/g, ' '));
  }
  const problems = [];
  if (!out) problems.push('empty reply' + (err ? ': ' + err : ''));
  for (const p of c.must || []) if (!new RegExp(p, 'i').test(out)) problems.push(`missing /${p}/`);
  for (const p of c.mustNot || []) if (new RegExp(p, 'i').test(out)) problems.push(`forbidden /${p}/`);
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${c.id}${problems.length ? '  ' + problems.join('; ') : ''}`);
  if (problems.length) { failed++; console.log('     reply: ' + out.slice(0, 500).replace(/\n/g, ' ')); }
}
fs.rmSync(tmp, { recursive: true, force: true });
process.exit(failed ? 1 : 0);
