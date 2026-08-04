import type { ComponentDocsMetaMap } from './knowledge/components/reference';
import { generateKnowledgeSkill } from './knowledge/generate';
import type { SkillId } from './registry';
import type { Framework } from './shared/skillTree';

/**
 * Wires every skill registered in `registry.ts` to the generator that produces its tree. This is the
 * only module that knows both sides, so each skill directory stays independent of the others and of
 * the build CLI.
 */
export type SkillGenerator = (root: string, framework: Framework, docsMeta: ComponentDocsMetaMap) => void;

/**
 * The generator behind every registered skill. Registering a new skill in `registry.ts` requires
 * adding its generator here; the type makes a missing one a compile error.
 */
export const SKILL_GENERATORS = {
  knowledge: generateKnowledgeSkill,
} as const satisfies Record<SkillId, SkillGenerator>;
