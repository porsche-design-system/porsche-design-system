import type { SkillGenerator } from '../shared/generation';
import { SkillTree } from '../shared/skillTree';
import { AUDIT_DOMAINS, domainReference } from './domains';
import { buildReportSchema, REPORT_SCHEMA_FILE } from './reportSchema';
import { buildAuditSkillMd } from './skillMd';

/**
 * Orchestrates one framework's audit tree: the `SKILL.md` method, the report schema that method has
 * to satisfy, and one reference per registered audit domain.
 *
 * Domains are written from the registry rather than listed here, so adding one is a single
 * registration — its file, its row in the `SKILL.md` domain table and its value in the schema's
 * `auditDomains` enum all follow from it, and none can be forgotten independently.
 *
 * No storefront input is read. Everything the audit needs about the Porsche Design System lives in
 * the knowledge skill, which ships beside it in the same wrapper package — so the two cannot describe
 * different versions, and this generator has no PDS content to keep in step.
 */
const AUDIT_DIRECTORY_LAYOUT = ['references'] as const;

export const generateAuditSkill: SkillGenerator<unknown> = (root, framework) => {
  const tree = new SkillTree(root, framework, AUDIT_DIRECTORY_LAYOUT);
  tree.reset();

  tree.write(REPORT_SCHEMA_FILE, buildReportSchema(framework));
  for (const domain of AUDIT_DOMAINS) {
    tree.write(domainReference(domain), [`# ${domain.title}`, '', domain.render(framework), ''].join('\n'));
  }
  tree.write('SKILL.md', buildAuditSkillMd(framework));
};
