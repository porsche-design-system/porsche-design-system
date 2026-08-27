import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SKILL_IDS } from '@skills/registry';
import { describe, expect, it } from 'vitest';

/**
 * Every registered skill snapshots its own staged tree, so each skill's snapshots stay separate and
 * reviewable. The cost of that split is that a newly registered skill would otherwise be silently
 * uncovered — no loop reaches it. This gate closes that: registering a skill in `registry.ts`
 * without adding `tests/specs/<skill>/skill.pds-<skill>.spec.ts` fails here rather than passing
 * green with no drift protection at all.
 */
const SPECS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** The spec — and therefore the `__snapshots__` file derived from it — names the skill it stages. */
const skillTreeSpecName = (skillId: string): string => `skill.pds-${skillId}.spec.ts`;

describe('skill spec coverage', () => {
  it.each(SKILL_IDS)('%s has a skill tree spec of its own', (skillId) => {
    const specName = skillTreeSpecName(skillId);
    const spec = path.join(SPECS_DIR, skillId, specName);
    expect(
      fs.existsSync(spec),
      `missing tests/specs/${skillId}/${specName} — call describeSkillTreeDrift('${skillId}') from it`
    ).toBe(true);
  });
});
