/**
 * The registry of every skill the Porsche Design System distributes inside its wrapper packages, and
 * the single source of truth for their identities — the ids and the naming convention derived from
 * them and the frameworks of `shared`.
 *
 * This module depends on nothing but `shared`'s framework vocabulary, so it can be imported from
 * anywhere — the generation pipeline, the CI gates and the storefront (through the `./registry`
 * package export). Anything that needs the filesystem, the component metadata or the MDX runtime
 * belongs in the generation modules, not here, and so does a skill's content — including its SKILL.md
 * frontmatter.
 *
 * Adding a skill means adding its id to {@link SKILL_IDS} and its generator to `SKILL_GENERATORS` in
 * `generators.ts`; the distributed directory names are derived from the id.
 */

import { type Framework, type FrameworkSuffix, frameworkSuffixMap } from '@porsche-design-system/shared';

/**
 * Every distributed skill.
 *
 * Audit skills are named per subject rather than as one `audit`, so each stays small enough to run
 * end to end on a large project and `pds-audit-<framework>` remains free for a future skill that
 * composes them.
 */
export const SKILL_IDS = ['knowledge', 'audit-deprecations'] as const;
export type SkillId = (typeof SKILL_IDS)[number];

/**
 * Canonical name of a skill for one wrapper — `pds-<skill>-<framework suffix>`, e.g. `pds-knowledge-js`. It is both the distributed
 * directory name (`skills/pds-knowledge-react`) and the `name` in the generated SKILL.md frontmatter,
 * so a project depending on more than one wrapper gets a distinct entry per package instead of all
 * four fighting over one `.agents/skills/…` directory. Never varies by version.
 */
export const getSkillName = <TSkillId extends SkillId, TFramework extends Framework>(
  skillId: TSkillId,
  framework: TFramework
): `pds-${TSkillId}-${FrameworkSuffix<TFramework>}` => `pds-${skillId}-${frameworkSuffixMap[framework]}`;
