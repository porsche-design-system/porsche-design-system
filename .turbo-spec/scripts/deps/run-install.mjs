// Runs `npm install`, capturing its exit status and log, and writes a routable
// result artifact. ALWAYS exits 0 so it is safe as a stage pre_command (install
// failure is handled by the downstream gate, not by aborting the pipeline).
//
// Writes:
//   .turbo-spec/out/install.log          full install output
//   .turbo-spec/out/apply-result.json    { install_ok, failure }

import { writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { classify } from './classify-install-failure.mjs';

/** Build the result object from an install exit status and its log. */
export function decideResult(status, log) {
  if (status === 0) return { install_ok: true, failure: null };
  return { install_ok: false, failure: classify(log) };
}

function main(argv) {
  const root = argv[2] || '.';
  const outDir = '.turbo-spec/out';
  const proc = spawnSync('npm', ['install'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  const log = `${proc.stdout || ''}\n${proc.stderr || ''}`;
  writeFileSync(`${root}/${outDir}/install.log`, log);
  const result = decideResult(proc.status ?? 1, log);
  writeFileSync(`${root}/${outDir}/apply-result.json`, `${JSON.stringify(result, null, 2)}\n`);
  console.log(
    result.install_ok
      ? 'run-install: npm install clean'
      : `run-install: npm install failed (${result.failure.kind})`
  );
  return 0; // never abort the pipeline here
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
