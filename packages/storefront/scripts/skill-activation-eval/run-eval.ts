/**
 * OFFLINE activation-tuning harness for the `porsche-design-system-docs` skill.
 *
 * Replays the fixed positive/negative prompt sets (`prompts.ts`) against a throwaway
 * fixture project that has the committed `js` skill tree installed as a project skill,
 * runs headless Claude Code per prompt, inspects whether the skill activated, and prints
 * an activation report. Use it to tune `ACTIVATION_DESCRIPTION` in
 * `src/lib/skill/skillMd.ts` so the skill fires across the positive set and stays dormant
 * across the negative set.
 *
 * NOT A CI GATE. Model output is stochastic; this must never gate a release. Run it
 * manually while tuning the description. See `README.md`.
 *
 *   node --import tsx scripts/skill-activation-eval/run-eval.ts [--runs N] [--model M] [--debug] [pos|neg]
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WRAPPER_SKILL_DIRS } from '../../src/lib/skill/skillTree';
import { ALL_PROMPTS, type EvalPrompt, NEGATIVE_PROMPTS, POSITIVE_PROMPTS } from './prompts';

const SKILL_SLUG = 'porsche-design-system-docs';
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const COMMITTED_JS_SKILL = path.join(REPO_ROOT, WRAPPER_SKILL_DIRS.js);

type Cli = { runs: number; model: string | null; debug: boolean; prompts: readonly EvalPrompt[] };

const parseArgs = (argv: string[]): Cli => {
  let runs = 1;
  let model: string | null = null;
  let debug = false;
  let prompts: readonly EvalPrompt[] = ALL_PROMPTS;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--runs') runs = Math.max(1, Number(argv[++i]) || 1);
    else if (arg === '--model') model = argv[++i] ?? null;
    else if (arg === '--debug') debug = true;
    else if (arg === 'pos' || arg === 'positive') prompts = POSITIVE_PROMPTS;
    else if (arg === 'neg' || arg === 'negative') prompts = NEGATIVE_PROMPTS;
    else throw new Error(`Unknown argument "${arg}"`);
  }
  return { runs, model, debug, prompts };
};

/** Fail fast with guidance if headless Claude Code is unavailable in this environment. */
const assertClaudeAvailable = (): void => {
  const probe = spawnSync('claude', ['--version'], { encoding: 'utf-8' });
  if (probe.status !== 0) {
    console.error(
      'The `claude` CLI is required to run this offline harness but was not found.\n' +
        'Install Claude Code (https://docs.claude.com/claude-code) and ensure `claude` is on PATH.'
    );
    process.exit(1);
  }
};

/** Build a throwaway project with the committed js skill installed as a project skill. */
const createFixture = (): string => {
  if (!fs.existsSync(COMMITTED_JS_SKILL)) {
    console.error(`Committed js skill tree missing at ${COMMITTED_JS_SKILL}. Run \`npm run build:skill\` first.`);
    process.exit(1);
  }
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pds-skill-eval-'));
  const skillsDir = path.join(root, '.claude', 'skills');
  fs.mkdirSync(skillsDir, { recursive: true });
  fs.symlinkSync(COMMITTED_JS_SKILL, path.join(skillsDir, SKILL_SLUG), 'dir');
  return root;
};

/**
 * Activation signal: the model issued a Skill tool call referencing our slug while
 * answering. We scan the stream-json event log for an assistant `tool_use` block whose
 * name is `Skill` (or the slug itself) and whose payload names the slug. Falls back to
 * the slug appearing in any assistant tool_use payload, which only happens when the
 * skill is being invoked (the slug is never echoed into the model's own prose otherwise).
 */
const detectActivation = (streamJson: string): boolean => {
  for (const line of streamJson.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('{')) continue;
    let event: unknown;
    try {
      event = JSON.parse(trimmed);
    } catch {
      continue;
    }
    const message = (event as { type?: string; message?: { content?: unknown } }).message;
    if ((event as { type?: string }).type !== 'assistant' || !message || !Array.isArray(message.content)) continue;
    for (const block of message.content as Array<Record<string, unknown>>) {
      if (block?.type !== 'tool_use') continue;
      const name = String(block.name ?? '');
      const payload = JSON.stringify(block.input ?? {});
      if ((name === 'Skill' || name === SKILL_SLUG) && (payload.includes(SKILL_SLUG) || name === SKILL_SLUG)) {
        return true;
      }
    }
  }
  return false;
};

type PromptResult = { prompt: EvalPrompt; fired: number; runs: number; ok: boolean; errors: number };

const runPrompt = (fixtureDir: string, cli: Cli, prompt: EvalPrompt): PromptResult => {
  let fired = 0;
  let errors = 0;
  const args = [
    '-p',
    prompt.prompt,
    '--output-format',
    'stream-json',
    '--verbose',
    '--permission-mode',
    'plan',
    // Enough turns for the model to research and decide to invoke the skill; capped to
    // bound cost. Plan mode keeps the run read-only regardless.
    '--max-turns',
    '8',
    ...(cli.model ? ['--model', cli.model] : []),
  ];
  for (let run = 0; run < cli.runs; run++) {
    // spawnSync (not execFileSync) so a non-zero exit — which `claude` returns when it
    // hits --max-turns — still yields stdout to inspect, instead of throwing it away.
    const result = spawnSync('claude', args, {
      cwd: fixtureDir,
      encoding: 'utf-8',
      timeout: 240_000,
      maxBuffer: 128 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (result.error || !result.stdout) {
      errors++;
      const reason = result.error ? result.error.message.split('\n')[0] : 'no output from claude';
      console.error(`  [error] ${prompt.id} run ${run + 1}: ${reason}`);
      continue;
    }
    const activated = detectActivation(result.stdout);
    if (activated) fired++;
    if (cli.debug) console.error(`  [debug] ${prompt.id} run ${run + 1}: ${activated ? 'fired' : 'dormant'}`);
  }
  // A prompt "matches expectation" when its majority outcome equals the expected one.
  const majorityFired = fired * 2 >= cli.runs;
  const ok = prompt.expected === 'fire' ? majorityFired : !majorityFired;
  return { prompt, fired, runs: cli.runs, ok, errors };
};

const printReport = (results: PromptResult[]): number => {
  const pad = (s: string, n: number): string => (s.length >= n ? s : s + ' '.repeat(n - s.length));
  console.log('\nActivation report (offline — not a CI gate)\n');
  console.log(`${pad('id', 16)}${pad('expected', 10)}${pad('fired', 12)}result`);
  console.log('-'.repeat(48));
  for (const r of results) {
    const firedCol = `${r.fired}/${r.runs}${r.errors ? ` (!${r.errors})` : ''}`;
    console.log(`${pad(r.prompt.id, 16)}${pad(r.prompt.expected, 10)}${pad(firedCol, 12)}${r.ok ? 'OK' : 'MISMATCH'}`);
  }
  const mismatches = results.filter((r) => !r.ok);
  const firePass = results.filter((r) => r.prompt.expected === 'fire' && r.ok).length;
  const fireTotal = results.filter((r) => r.prompt.expected === 'fire').length;
  const dormantPass = results.filter((r) => r.prompt.expected === 'dormant' && r.ok).length;
  const dormantTotal = results.filter((r) => r.prompt.expected === 'dormant').length;
  console.log('-'.repeat(48));
  console.log(`positive (should fire):   ${firePass}/${fireTotal}`);
  console.log(`negative (should be dormant): ${dormantPass}/${dormantTotal}`);
  if (mismatches.length) {
    console.log(`\n${mismatches.length} mismatch(es): ${mismatches.map((m) => m.prompt.id).join(', ')}`);
    console.log('Tune ACTIVATION_DESCRIPTION in src/lib/skill/skillMd.ts and re-run. (This is not a release gate.)');
  } else {
    console.log('\nAll prompts matched expectation.');
  }
  return mismatches.length;
};

const main = (): void => {
  const cli = parseArgs(process.argv.slice(2));
  assertClaudeAvailable();
  const fixtureDir = createFixture();
  try {
    console.log(`Running ${cli.prompts.length} prompt(s) × ${cli.runs} run(s) against fixture ${fixtureDir}`);
    const results = cli.prompts.map((prompt) => {
      console.error(`Running ${prompt.id} …`);
      return runPrompt(fixtureDir, cli, prompt);
    });
    const mismatches = printReport(results);
    // Non-zero exit aids manual tuning; the harness is intentionally never wired into CI.
    process.exitCode = mismatches > 0 ? 1 : 0;
  } finally {
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  }
};

main();
