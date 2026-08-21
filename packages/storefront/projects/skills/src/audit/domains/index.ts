import { deprecatedUsageDomain } from './deprecatedUsage';
import type { AuditDomain } from './types';

export type { AuditDomain } from './types';
export { domainReference } from './types';

/**
 * Every audit domain, in the order they run and appear in `SKILL.md`.
 *
 * Adding a domain means writing its module and adding it here. Its reference file, its entry in the
 * `SKILL.md` domain table and its value in the report schema's `auditDomains` enum all follow from
 * this one registration, so a domain cannot ship half-wired.
 *
 * The first version has one domain. The structure is here from the start anyway, because retrofitting
 * a split onto a `SKILL.md` that had grown around a single domain is how the general method and the
 * domain rules end up tangled.
 */
export const AUDIT_DOMAINS: readonly AuditDomain[] = [deprecatedUsageDomain];

/** Domain ids, for the report schema's `auditDomains` enum. */
export const AUDIT_DOMAIN_IDS: readonly string[] = AUDIT_DOMAINS.map((domain) => domain.id);
