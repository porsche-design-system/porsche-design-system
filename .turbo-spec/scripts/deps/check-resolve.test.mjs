import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveVerdict } from './check-resolve.mjs';

const HASH = 'abc123';
const clean = { install_ok: true, failure: null, manifest_hash: HASH };

test('passes on a clean, fresh install with a resolution record (even an empty one)', () => {
  assert.equal(
    resolveVerdict({ applyResult: clean, currentManifestHash: HASH, resolutionRecord: [] }).code,
    0
  );
  assert.equal(
    resolveVerdict({
      applyResult: clean,
      currentManifestHash: HASH,
      resolutionRecord: [{ package: 'ag-grid-community', specifier: '35.3.0' }],
    }).code,
    0
  );
});

test('loops back (1) on an ERESOLVE third-party peer conflict', () => {
  const applyResult = { install_ok: false, failure: { kind: 'peer_conflict_thirdparty' }, manifest_hash: HASH };
  const v = resolveVerdict({ applyResult, currentManifestHash: HASH, resolutionRecord: [] });
  assert.equal(v.code, 1);
  assert.match(v.reason, /ERESOLVE/);
});

test('ESCALATES (2) on a NON-ERESOLVE install failure — the old ERESOLVE-only check false-passed these', () => {
  for (const kind of ['registry', 'postinstall', 'peer_conflict_ts_angular', 'unknown']) {
    const applyResult = { install_ok: false, failure: { kind }, manifest_hash: HASH };
    const v = resolveVerdict({ applyResult, currentManifestHash: HASH, resolutionRecord: [] });
    assert.equal(v.code, 2, `kind ${kind} must escalate, not loop_back or pass`);
  }
});

test('escalates (2) when apply-result.json is stale (manifests changed since the install)', () => {
  const v = resolveVerdict({ applyResult: clean, currentManifestHash: 'DIFFERENT', resolutionRecord: [] });
  assert.equal(v.code, 2);
  assert.match(v.reason, /stale/);
});

test('escalates (2) when apply-result.json is absent (the authoritative install did not run)', () => {
  assert.equal(resolveVerdict({ applyResult: null, currentManifestHash: HASH, resolutionRecord: [] }).code, 2);
});

test('loops back (1) on a clean install with NO resolution record (silent no-op guard)', () => {
  const v = resolveVerdict({ applyResult: clean, currentManifestHash: HASH, resolutionRecord: null });
  assert.equal(v.code, 1);
  assert.match(v.reason, /resolution record/);
});

test('skips the freshness check gracefully when the stored hash is absent (older artifact)', () => {
  const legacy = { install_ok: true, failure: null }; // no manifest_hash
  assert.equal(resolveVerdict({ applyResult: legacy, currentManifestHash: HASH, resolutionRecord: [] }).code, 0);
});
