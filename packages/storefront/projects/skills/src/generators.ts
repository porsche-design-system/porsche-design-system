import { generateAuditDeprecationsSkill } from './audit-deprecations/generate';
import type { ComponentDocsMetaMap } from './knowledge/components/reference';
import { generateKnowledgeSkill } from './knowledge/generate';
import type { SkillId } from './registry';
import type { SkillGenerator } from './shared/generation';

/**
 * Wires every skill registered in `registry.ts` to the generator that produces its tree. This is the
 * only module that knows both the registry and the individual skill directories, so no skill has to
 * know about another and `shared/` stays free of any single skill's types.
 */

/**
 * Everything the storefront hands the generation pipeline. These sources only resolve under the
 * MDX/alias-aware runtime `scripts/build-skills.ts` starts, so they are passed into the generators
 * rather than imported by them. A skill that needs a further storefront source adds it here; each
 * generator declares only the subset it reads and ignores the rest.
 */
export type StorefrontInputs = {
  /** The storefront's `componentDocsMeta` — every documented component's MDX prose and examples. */
  docsMeta: ComponentDocsMetaMap;
};

/**
 * The generator behind every registered skill. Registering a new skill in `registry.ts` requires
 * adding its generator here; the type makes a missing one a compile error, and a generator asking
 * for inputs the build does not supply fails the same way.
 */
export const SKILL_GENERATORS = {
  knowledge: generateKnowledgeSkill,
  'audit-deprecations': generateAuditDeprecationsSkill,
} as const satisfies Record<SkillId, SkillGenerator<StorefrontInputs>>;
