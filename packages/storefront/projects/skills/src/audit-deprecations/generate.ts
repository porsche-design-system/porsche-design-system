import type { SkillGenerator } from '../shared/generation';
import { SkillTree } from '../shared/skillTree';
import { buildReportSchema, REPORT_SCHEMA_FILE } from './reportSchema';
import { buildReportTemplate, REPORT_TEMPLATE_FILE } from './reportTemplate';
import { buildAuditDeprecationsSkillMd } from './skillMd';

/**
 * Writes the deprecation audit's tree: the `SKILL.md` method, the report schema that method has to
 * satisfy, and the Markdown template it renders the human-readable report to.
 *
 * The method reads as one procedure rather than a general method pointing at a reference. The two
 * references are the exception, because a running agent produces its reports *against* them — it
 * validates the JSON against the schema and renders the Markdown against the template — and neither
 * is prose it could answer from memory instead of opening.
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
  tree.write(REPORT_TEMPLATE_FILE, buildReportTemplate(framework));
  tree.write('SKILL.md', buildAuditDeprecationsSkillMd(framework));
};
