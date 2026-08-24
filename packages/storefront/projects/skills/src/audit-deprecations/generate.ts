import type { SkillGenerator } from '../shared/generation';
import { SkillTree } from '../shared/skillTree';
import { buildReportSchema, REPORT_SCHEMA_FILE } from './reportSchema';
import { buildAuditDeprecationsSkillMd } from './skillMd';

/**
 * Writes the deprecation audit's tree: the `SKILL.md` method and the report schema that method has to
 * satisfy.
 *
 * Two files, because the skill audits one subject. The method reads as one procedure rather than a
 * general method pointing at a reference, and the schema is the only thing a running agent needs to
 * open separately — it validates the report it is building.
 *
 * No storefront input is read. Everything the audit needs about the Porsche Design System lives in
 * the knowledge skill, which ships beside it in the same wrapper package — so the two cannot describe
 * different versions, and this generator has no PDS content to keep in step.
 */
const DIRECTORY_LAYOUT = ['references'] as const;

export const generateAuditDeprecationsSkill: SkillGenerator<unknown> = (root, framework) => {
  const tree = new SkillTree(root, framework, DIRECTORY_LAYOUT);
  tree.reset();

  tree.write(REPORT_SCHEMA_FILE, buildReportSchema(framework));
  tree.write('SKILL.md', buildAuditDeprecationsSkillMd(framework));
};
