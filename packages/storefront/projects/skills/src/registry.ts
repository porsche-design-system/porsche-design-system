/**
 * The registry of every skill the Porsche Design System distributes inside its wrapper packages, and
 * the single source of truth for their identities — the ids, the wrappers they are generated for and
 * the naming convention derived from both.
 *
 * This module is deliberately dependency-free so it can be imported from anywhere — the generation
 * pipeline, the CI gates and the storefront (through the `./registry` package export). Anything that
 * needs the filesystem, the component metadata or the MDX runtime belongs in the generation modules,
 * not here, and so does a skill's content — including its SKILL.md frontmatter.
 *
 * Adding a skill means adding its id to {@link SKILL_IDS} and its generator to `SKILL_GENERATORS` in
 * `generators.ts`; the distributed directory names are derived from the id.
 */

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
 * The wrapper packages a skill is generated for. These are the package name suffixes
 * (`@porsche-design-system/components-<framework>`), so Vanilla JS is `js` rather than `vanilla-js`.
 */
export const SKILL_FRAMEWORKS = ['js', 'angular', 'react', 'vue'] as const;
export type SkillFramework = (typeof SKILL_FRAMEWORKS)[number];

/** Canonical npm package name of one framework wrapper. */
export const getWrapperPackageName = <TFramework extends SkillFramework>(
  framework: TFramework
): `@porsche-design-system/components-${TFramework}` => `@porsche-design-system/components-${framework}`;

/**
 * Canonical name of a skill for one wrapper — `pds-<skill>-<framework>`. It is both the distributed
 * directory name (`skills/pds-knowledge-react`) and the `name` in the generated SKILL.md frontmatter,
 * so a project depending on more than one wrapper gets a distinct entry per package instead of all
 * four fighting over one `.agents/skills/…` directory. Never varies by version.
 */
export const getSkillName = <TSkillId extends SkillId, TFramework extends SkillFramework>(
  skillId: TSkillId,
  framework: TFramework
): `pds-${TSkillId}-${TFramework}` => `pds-${skillId}-${framework}`;
