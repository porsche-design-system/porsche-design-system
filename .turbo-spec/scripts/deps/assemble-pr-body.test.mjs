import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildPrBody } from './assemble-pr-body.mjs';

const plan = {
  angular_bumped: true,
  updates: [
    { name: '@angular/core', from: '^22.0.4', to: '^22.0.5', group: 'angular' },
    { name: 'vite', from: '^8.1.0', to: '^8.1.3', group: 'build' },
  ],
  excluded: [{ name: 'typescript', reason: 'deferred under Angular ceiling' }],
};

test('renders grouped bumps, angular status and excluded section', () => {
  const body = buildPrBody({ plan, date: '2025-01-02', issue: 42 });
  assert.match(body, /## Weekly dependency updates \(2025-01-02\)/);
  assert.match(body, /\*\*angular\*\*/);
  assert.match(body, /`@angular\/core`: `\^22\.0\.4` → `\^22\.0\.5`/);
  assert.match(body, /migrations applied/);
  assert.match(body, /Excluded this round/);
  assert.match(body, /`typescript` — deferred under Angular ceiling/);
});

test('always includes the CI-is-correctness-gate note', () => {
  const body = buildPrBody({ plan });
  assert.match(body, /CI on this PR is the correctness gate/);
});

test('lists overrides when present, else None', () => {
  const withOverrides = buildPrBody({
    plan,
    overrides: [{ package: 'eslint', specifier: '9.0.0', reason: 'peer conflict with plugin' }],
  });
  assert.match(withOverrides, /`eslint`: `9\.0\.0` — peer conflict with plugin/);

  const without = buildPrBody({ plan });
  assert.match(without, /### Overrides added\n\n- None\./);
});

test('adds a closing keyword only when an issue is given', () => {
  assert.match(buildPrBody({ plan, issue: 7 }), /Closes #7/);
  assert.doesNotMatch(buildPrBody({ plan }), /Closes #/);
});

test('handles an empty plan gracefully', () => {
  const body = buildPrBody({ plan: { updates: [], angular_bumped: false } });
  assert.match(body, /No dependency version changes/);
  assert.match(body, /Not part of this round/);
});

test('renders skipped override pins for manual review when present', () => {
  const body = buildPrBody({
    plan,
    overridesSkipped: [{ name: 'ejs', from: '^3.1.10', to: '^6.0.1' }],
  });
  assert.match(body, /Override pins with available updates — review manually/);
  assert.match(body, /hand-curated transitive-security pins/);
  assert.match(body, /`ejs`: `\^3\.1\.10` → `\^6\.0\.1`/);
});

test('omits the skipped-overrides section when none', () => {
  const body = buildPrBody({ plan });
  assert.doesNotMatch(body, /Override pins with available updates/);
});
