// Asserts the human-readable skill tables never drift from the code the gates
// trust (families.mjs / held-back.mjs). Uses substring inclusion (robust to
// markdown formatting) in the code->prose direction, plus an explicit
// prose->code family-name check.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { FAMILIES } from './families.mjs';
import { HELD_BACK_PATTERNS } from './held-back.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const skills = join(here, '../../../.github/skills');
const read = (p) => readFileSync(join(skills, p), 'utf8');

// Path indirection so Task 2 can repoint these to the split skills in one commit.
const FACTS_SKILL = 'pds-dependency-context/SKILL.md';
const POLICY_SKILL = 'pds-dependency-context/SKILL.md';

test('every held-back pattern appears verbatim in the facts skill', () => {
  const md = read(FACTS_SKILL);
  for (const pattern of HELD_BACK_PATTERNS) {
    assert.ok(md.includes(pattern), `facts skill missing held-back pattern: ${pattern}`);
  }
});

test('every family name and glob appears verbatim in the policy skill', () => {
  const md = read(POLICY_SKILL);
  for (const [family, patterns] of Object.entries(FAMILIES)) {
    assert.ok(md.includes(family), `policy skill missing family name: ${family}`);
    for (const pattern of patterns) {
      assert.ok(md.includes(pattern), `policy skill missing glob for ${family}: ${pattern}`);
    }
  }
});

test('every family bullet in the policy skill is a known FAMILIES key', () => {
  const md = read(POLICY_SKILL);
  // Family bullets are written as "- **<name>** — ..." in the skill table.
  const bulletNames = [...md.matchAll(/^- \*\*([a-z-]+)\*\*\s+—/gm)].map((m) => m[1]);
  assert.ok(bulletNames.length > 0, 'no family bullets found in policy skill');
  for (const name of bulletNames) {
    assert.ok(name in FAMILIES, `policy skill lists unknown family: ${name}`);
  }
});
