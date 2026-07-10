// Gate for resolve-conflicts. It confirms the CURRENT manifests install cleanly
// — read from the authoritative `apply-result.json` written by run-install.mjs —
// rather than merely scanning a log for the `ERESOLVE` string (which passed on
// any NON-ERESOLVE install failure, and false-passed on a STALE log the agent
// never regenerated).
//
// Verdict → exit code:
//   0  resolved: install clean, manifests fresh, resolution recorded.
//   1  loop_back: an ERESOLVE third-party peer conflict the agent can fix by
//      adjusting a scoped override, OR a missing resolution record.
//   2  escalate: a non-ERESOLVE install failure (registry / lifecycle / TS-Angular
//      / unknown) that a new override cannot fix, OR a stale/absent apply-result
//      (the authoritative install did not run for the current manifests).
//
// The exit codes map to the gate's failure_verdict (loop_back) and
// environment_verdict (escalate) — so an infra failure never burns AI retries.

import { readFileSync } from 'node:fs';
import { hashManifests } from './run-install.mjs';

/**
 * @param {object} i
 * @param {object|null} i.applyResult        parsed apply-result.json
 * @param {string|null} i.currentManifestHash hash of the manifests on disk now
 * @param {unknown} i.resolutionRecord        parsed overrides-added.json (array)
 * @returns {{code: 0|1|2, reason: string}}
 */
export function resolveVerdict({ applyResult, currentManifestHash, resolutionRecord }) {
  if (!applyResult || typeof applyResult !== 'object') {
    return {
      code: 2,
      reason: 'no apply-result.json — the authoritative clean install did not run for this stage',
    };
  }

  // Freshness: only trust a result produced from the CURRENT manifests. If the
  // agent changed an override after the recorded install (or no install ran for
  // the current tree), the verdict is untrustworthy — re-run install, do not
  // burn an AI retry on a stale signal.
  if (currentManifestHash && applyResult.manifest_hash && applyResult.manifest_hash !== currentManifestHash) {
    return {
      code: 2,
      reason: 'apply-result.json is stale — manifests changed since the recorded install; re-run the clean install before judging',
    };
  }

  if (applyResult.install_ok !== true) {
    const kind = applyResult.failure?.kind ?? 'unknown';
    if (kind === 'peer_conflict_thirdparty') {
      return {
        code: 1,
        reason: 'install still fails with an ERESOLVE third-party peer conflict — adjust the scoped override and re-run',
      };
    }
    return {
      code: 2,
      reason: `install failed with non-recoverable kind '${kind}' — not an override problem; escalate`,
    };
  }

  // Clean, fresh install. Require the agent to have RECORDED its resolution. The
  // array may be EMPTY (a clean install needing no new override is legitimate),
  // but the record must exist so a silent no-op cannot pass unnoticed.
  if (!Array.isArray(resolutionRecord)) {
    return {
      code: 1,
      reason: 'clean install but no resolution record — write overrides-added.json (use [] if no override was needed)',
    };
  }

  return {
    code: 0,
    reason: `install clean and fresh; ${resolutionRecord.length} override(s) recorded`,
  };
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function main(argv) {
  const applyResultPath = argv[2] || '.turbo-spec/out/apply-result.json';
  const overridesPath = argv[3] || '.turbo-spec/out/overrides-added.json';
  const root = argv[4] || '.';

  const applyResult = readJson(applyResultPath);
  const resolutionRecord = readJson(overridesPath);
  let currentManifestHash = null;
  try {
    currentManifestHash = hashManifests(root);
  } catch {
    // Cannot hash (e.g. no tree): skip the freshness check rather than false-fail.
  }

  const verdict = resolveVerdict({ applyResult, currentManifestHash, resolutionRecord });
  if (verdict.code === 0) {
    console.log(`resolve check passed: ${verdict.reason}`);
    return 0;
  }
  console.error(`resolve check failed: ${verdict.reason}`);
  return verdict.code;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
