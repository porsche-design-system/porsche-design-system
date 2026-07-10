// Classifies the finalize-capability preflight canary into a verdict. The
// finalize stage runs on the HOST under a WRITE-capable credential and later
// does `git push` + `gh pr create`; this canary surfaces a doomed credential at
// minute 0 instead of after ~95 minutes of work.
//
// Pure `capabilityVerdict(...)` so it is unit-testable without gh or a network.
// The bash caller (preflight.sh --check) gathers the raw inputs and, only when
// FINALIZE_CANARY_ENFORCE=1, turns an `escalate: true` verdict into exit 2.
// Until then it is warning-only (staged rollout).
//
//   verdict: ok | insufficient | transient | skipped
//   escalate: true only for a genuine capability failure (insufficient) — never
//             for a transient network/registry error or a skipped probe, so the
//             canary can never newly block a run that works today.

/**
 * @param {object} i
 * @param {boolean} i.ghAvailable  is the `gh` CLI present on PATH
 * @param {boolean} i.authOk       did `gh auth status` succeed
 * @param {boolean|null} i.pushPerm  repo `.permissions.push` (null = unknown)
 * @param {('network'|'auth'|'perm'|null)} i.errorKind  first error encountered
 * @returns {{verdict: string, reason: string, escalate: boolean}}
 */
export function capabilityVerdict({ ghAvailable, authOk, pushPerm, errorKind }) {
  if (!ghAvailable) {
    return { verdict: 'skipped', reason: 'gh CLI not available — cannot probe finalize credentials', escalate: false };
  }
  // A network/registry failure is infrastructure, not a permission problem: do
  // not escalate (the plan classifies transient failures as infra, not AI/gate).
  if (errorKind === 'network') {
    return { verdict: 'transient', reason: 'network/registry error while probing GitHub — treat as infra', escalate: false };
  }
  if (!authOk || errorKind === 'auth') {
    return { verdict: 'insufficient', reason: 'gh is not authenticated for the host write credential', escalate: true };
  }
  if (pushPerm === true) {
    return { verdict: 'ok', reason: 'write (push) permission confirmed for the finalize credential', escalate: false };
  }
  if (pushPerm === false) {
    return { verdict: 'insufficient', reason: 'credential lacks push permission — finalize push/PR will fail', escalate: true };
  }
  // pushPerm unknown for a non-network reason: report but do not block.
  return { verdict: 'transient', reason: 'could not determine push permission — inconclusive probe', escalate: false };
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[++i];
  }
  return out;
}

function coerceBool(v) {
  if (v === 'true') return true;
  if (v === 'false') return false;
  return null;
}

function main(argv) {
  const a = parseArgs(argv.slice(2));
  const verdict = capabilityVerdict({
    ghAvailable: coerceBool(a['gh-available']) === true,
    authOk: coerceBool(a['auth-ok']) === true,
    pushPerm: coerceBool(a['push-perm']),
    errorKind: a['error-kind'] && a['error-kind'] !== '' ? a['error-kind'] : null,
  });
  // `--format sh` prints `verdict escalate reason...` on one line so a bash
  // caller can `read -r verdict escalate reason`; default prints JSON.
  if (a.format === 'sh') {
    process.stdout.write(`${verdict.verdict} ${verdict.escalate} ${verdict.reason}\n`);
  } else {
    process.stdout.write(`${JSON.stringify(verdict)}\n`);
  }
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
