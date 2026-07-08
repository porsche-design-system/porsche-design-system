import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classify } from './classify-install-failure.mjs';

const eresolveThirdParty = `
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error While resolving: some-tool@1.0.0
npm error Found: eslint@9.0.0
npm error Could not resolve dependency:
npm error peer eslint@"^8.0.0" from some-eslint-plugin@2.0.0
`;

const eresolveTsAngular = `
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error Found: typescript@6.0.3
npm error Could not resolve dependency:
npm error peer typescript@">=5.8.0 <5.10.0" from @angular/compiler-cli@22.0.5
`;

const registryErr = `
npm error code ETARGET
npm error notarget No matching version found for vite@^99.0.0
`;

const postinstallErr = `
npm error code 1
npm error command failed
npm error gyp ERR! build error
npm error postinstall script failed
`;

test('classifies TypeScript/Angular peer conflict', () => {
  const r = classify(eresolveTsAngular);
  assert.equal(r.kind, 'peer_conflict_ts_angular');
  assert.ok(r.packages.some((p) => /typescript|@angular/.test(p)));
});

test('classifies third-party peer conflict', () => {
  const r = classify(eresolveThirdParty);
  assert.equal(r.kind, 'peer_conflict_thirdparty');
  assert.ok(r.packages.length > 0);
});

test('classifies registry/network errors', () => {
  assert.equal(classify(registryErr).kind, 'registry');
});

test('classifies postinstall/lifecycle errors', () => {
  assert.equal(classify(postinstallErr).kind, 'postinstall');
});

test('falls back to unknown', () => {
  assert.equal(classify('something totally unexpected').kind, 'unknown');
});
