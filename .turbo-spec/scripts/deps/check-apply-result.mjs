// Gate for apply-bumps: decides whether the pipeline may proceed after install.
//   install_ok            -> pass (0): continue
//   peer_conflict_thirdparty -> pass (0): resolve-conflicts stage will fix it
//   any other failure     -> escalate (2): human intervention
//
// Exit 0 = proceed, 2 = escalate. (No exit 1 — retrying the deterministic
// install unchanged would not help.)

import { readFileSync } from 'node:fs';

/** @returns {'pass'|'escalate'} */
export function gateVerdict(result) {
  if (result?.install_ok) return 'pass';
  if (result?.failure?.kind === 'peer_conflict_thirdparty') return 'pass';
  return 'escalate';
}

function main(argv) {
  const path = argv[2] || '.turbo-spec/out/apply-result.json';
  let result;
  try {
    result = JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    console.error(`cannot read apply-result: ${err.message}`);
    return 2;
  }
  if (gateVerdict(result) === 'pass') {
    console.log(
      result.install_ok
        ? 'apply-result: install clean — proceed'
        : 'apply-result: third-party peer conflict — proceed to resolve-conflicts'
    );
    return 0;
  }
  console.error(
    `apply-result: unrecoverable install failure (${result?.failure?.kind ?? 'unknown'}) — escalate`
  );
  return 2;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
