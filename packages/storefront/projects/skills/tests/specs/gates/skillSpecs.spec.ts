import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SKILL_IDS } from '@skills/registry';
import { describe, expect, it } from 'vitest';

/**
 * Every registered skill snapshots its own staged tree, so each skill's snapshots stay separate and
 * reviewable. The cost of that split is that a newly registered skill would otherwise be silently
 * uncovered — no loop reaches it. This gate closes that: registering a skill in `registry.ts`
 * without adding `tests/specs/<skill>/drift.spec.ts` fails here rather than passing green with no
 * drift protection at all.
 */
const SPECS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

describe('skill spec coverage', () => {
  it.each(SKILL_IDS)('%s has a drift spec of its own', (skillId) => {
    const spec = path.join(SPECS_DIR, skillId, 'drift.spec.ts');
    expect(
      fs.existsSync(spec),
      `missing tests/specs/${skillId}/drift.spec.ts — call describeSkillTreeDrift('${skillId}') from it`
    ).toBe(true);
  });
});
