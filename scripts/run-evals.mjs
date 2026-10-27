// Runs behavior checks from evals/cases.json against the plugin through `claude -p`.
// Each case replays real turns: setup messages, then the case's own turns, resuming one session.
// Only the last reply is checked: regexes (must / mustNot) and an optional LLM judge (criteria).
// Usage: node scripts/run-evals.mjs [case-id ...]
//   EVAL_MODEL=sonnet  pick a model      EVAL_DEBUG=1  print every turn
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PLUGIN = path.join(ROOT, 'plugins/lomonosov-skill');
const { setup, cases } = JSON.parse(fs.readFileSync(path.join(ROOT, 'evals/cases.json'), 'utf8'));
const only = process.argv.slice(2);
let failed = 0;

function claude(args, cwd) {
  if (process.env.EVAL_MODEL) args.push('--model', process.env.EVAL_MODEL);
  return spawnSync('claude', args, { cwd, encoding: 'utf8', timeout: 240000 });
}

function ask(prompt, session, cwd) {
  const args = ['-p', prompt, '--plugin-dir', PLUGIN, '--output-format', 'json'];
  if (session) args.push('--resume', session);
  const r = claude(args, cwd);
  try {
    const j = JSON.parse(r.stdout);
    return { text: String(j.result || '').trim(), session: j.session_id };
  } catch {
    return { text: '', session, err: (r.stderr || r.stdout || '').slice(0, 200) };
  }
}

/** Second opinion from the model for rules a regex cannot see. Returns null when it passes. */
function judge(criteria, transcript, cwd) {
  const prompt = `You are a strict reviewer of an AI tutor. Below is the end of a conversation. Check the LAST tutor reply against these criteria:\n${criteria}\n\nConversation:\n${transcript}\n\nAnswer with exactly one line: PASS, or FAIL: <short reason>.`;
  const r = claude(['-p', prompt, '--output-format', 'text'], cwd);
  const line = (r.stdout || '').trim().split('\n').pop();
  return /^PASS/i.test(line) ? null : `judge: ${line || 'no verdict'}`;
}

for (const c of cases.filter((x) => !only.length || only.includes(x.id))) {
  const cwd = fs.mkdtempSync(path.join(ROOT, '.eval-'));
  for (const [name, body] of Object.entries(c.files || {})) fs.writeFileSync(path.join(cwd, name), body);
  const turns = c.fresh ? c.turns : [...setup, ...c.turns];
  let session, out = '', err;
  const transcript = [];
  for (const t of turns) {
    ({ text: out, session, err } = ask(t, session, cwd));
    transcript.push(`Student: ${t}`, `Tutor: ${out}`);
    if (process.env.EVAL_DEBUG) console.log(`  > ${t}`, `\n  < ${out.slice(0, 300)}`.replace(/\s+/g, ' '));
  }
  const problems = [];
  if (!out) problems.push('empty reply' + (err ? ': ' + err : ''));
  for (const p of c.must || []) if (!new RegExp(p, 'i').test(out)) problems.push(`missing /${p}/`);
  for (const p of c.mustNot || []) if (new RegExp(p, 'i').test(out)) problems.push(`forbidden /${p}/`);
  if (c.judge && out) {
    const v = judge(c.judge, transcript.slice(-6).join('\n\n'), cwd);
    if (v) problems.push(v);
  }
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${c.id}${problems.length ? '  ' + problems.join('; ') : ''}`);
  if (problems.length) { failed++; console.log('     reply: ' + out.slice(0, 500).replace(/\n/g, ' ')); }
  fs.rmSync(cwd, { recursive: true, force: true });
}
process.exit(failed ? 1 : 0);
