import assert from 'node:assert/strict';
import { test } from 'node:test';
import { capabilityVerdict } from './classify-finalize-capability.mjs';

test('ok when authenticated and push permission is present', () => {
  const v = capabilityVerdict({ ghAvailable: true, authOk: true, pushPerm: true, errorKind: null });
  assert.equal(v.verdict, 'ok');
  assert.equal(v.escalate, false);
});

test('insufficient (escalates) when the credential lacks push permission', () => {
  const v = capabilityVerdict({ ghAvailable: true, authOk: true, pushPerm: false, errorKind: null });
  assert.equal(v.verdict, 'insufficient');
  assert.equal(v.escalate, true);
});

test('insufficient (escalates) when gh is not authenticated', () => {
  const v = capabilityVerdict({ ghAvailable: true, authOk: false, pushPerm: null, errorKind: 'auth' });
  assert.equal(v.verdict, 'insufficient');
  assert.equal(v.escalate, true);
});

test('a network error is transient infra and never escalates', () => {
  const v = capabilityVerdict({ ghAvailable: true, authOk: true, pushPerm: null, errorKind: 'network' });
  assert.equal(v.verdict, 'transient');
  assert.equal(v.escalate, false);
});

test('network is classified before auth so a flaky probe is not read as a permission failure', () => {
  const v = capabilityVerdict({ ghAvailable: true, authOk: false, pushPerm: null, errorKind: 'network' });
  assert.equal(v.verdict, 'transient');
  assert.equal(v.escalate, false);
});

test('a missing gh CLI is skipped, not a failure', () => {
  const v = capabilityVerdict({ ghAvailable: false, authOk: false, pushPerm: null, errorKind: null });
  assert.equal(v.verdict, 'skipped');
  assert.equal(v.escalate, false);
});

test('an inconclusive push-permission probe reports transient without escalating', () => {
  const v = capabilityVerdict({ ghAvailable: true, authOk: true, pushPerm: null, errorKind: null });
  assert.equal(v.verdict, 'transient');
  assert.equal(v.escalate, false);
});
