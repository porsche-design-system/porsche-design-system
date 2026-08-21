import type { Framework } from '../../shared/skillTree';

/**
 * One audit domain — a self-contained area the audit checks, shipped as its own reference file.
 *
 * The split exists so domains can be added without touching each other or the method they share.
 * `SKILL.md` owns what is true of every audit — the framework guard, scope, anchoring, the finding
 * contract, the report — and a domain file owns what only that domain knows: the source it reads,
 * what counts as a finding, and how its findings are graded.
 *
 * {@link AuditDomain.id} is deliberately load-bearing in three places at once: the reference file
 * name, the `scope.auditDomains` enum in the report schema, and the value an audit writes into a
 * report. Deriving all three from one registry is what stops a shipped domain file and the schema
 * that is supposed to describe it drifting apart.
 */
export type AuditDomain = {
  /** Stable, kebab-case. Names `references/<id>.md` and the schema's `auditDomains` enum value. */
  id: string;
  /** Section heading in the domain's own reference file. */
  title: string;
  /** One line for the domain table in `SKILL.md`. Says what the domain checks, not how. */
  summary: string;
  /** The reference body, minus its `# <title>` heading. */
  render: (framework: Framework) => string;
};

/** Skill-root-relative path of a domain's reference file. */
export const domainReference = (domain: AuditDomain): string => `references/${domain.id}.md`;
