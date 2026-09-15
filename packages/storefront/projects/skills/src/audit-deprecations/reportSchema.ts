import { EFFORTS, USAGE_KINDS } from '../knowledge/deprecations/types';
import { getSkillName } from '../registry';
import type { Framework } from '../shared/skillTree';
import { DETECTION_IDS, VALUE_RESOLUTION_IDS } from './grading';

/**
 * The report schema derives shared enums from code to prevent drift. Its generic top-level shape
 * allows future audit types to share the same report reader.
 */

/** Bumped when the report shape changes in a way a consumer must react to. */
export const REPORT_SCHEMA_VERSION = '1.0.0';

/** Discriminates this report from a future audit's, for a consumer reading a run directory. */
export const AUDIT_KIND = 'deprecations';

export const REPORT_SCHEMA_FILE = 'references/report.schema.json';

const stringArray = (description: string) => ({ type: 'array', description, items: { type: 'string' } });

/**
 * One place in the project, quoted.
 *
 * The snippet is required rather than best-effort. An agent that cannot quote the line it claims to
 * have found almost certainly did not read it, so the quote is itself the check — and it is what
 * lets the verification pass, or a later fix skill, confirm a finding against the file before
 * touching it.
 */
const evidenceLocation = (extraProperties: Record<string, unknown> = {}, extraRequired: string[] = []) => ({
  type: 'object',
  additionalProperties: false,
  required: ['path', 'line', 'snippet', ...extraRequired],
  properties: {
    path: { type: 'string', description: 'Project-relative path.' },
    line: { type: 'integer', minimum: 1 },
    snippet: { type: 'string', description: 'The source line, quoted verbatim.' },
    ...extraProperties,
  },
});

export const buildReportSchema = (framework: Framework): string => {
  const skillName = getSkillName('audit-deprecations', framework);
  const schema = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: `https://designsystem.porsche.com/schemas/${skillName}/${REPORT_SCHEMA_VERSION}.json`,
    title: `Porsche Design System deprecation audit report (${framework})`,
    type: 'object',
    additionalProperties: false,
    required: ['schemaVersion', 'audit', 'project', 'scope', 'summary', 'coverage', 'findings', 'manualFollowUps'],
    properties: {
      schemaVersion: { const: REPORT_SCHEMA_VERSION },
      audit: {
        type: 'object',
        additionalProperties: false,
        required: ['runId', 'generatedAt', 'skillName', 'auditKind', 'framework', 'pdsVersion'],
        properties: {
          runId: {
            type: 'string',
            description: 'Filesystem-safe UTC timestamp identifying the run, e.g. 2026-07-23T09-21-27Z.',
          },
          generatedAt: { type: 'string', format: 'date-time' },
          skillName: { const: skillName },
          auditKind: {
            const: AUDIT_KIND,
            description: 'What this report audits, for a consumer reading a run directory of several.',
          },
          framework: { const: framework },
          pdsVersion: { type: 'string', description: 'The installed PDS version the audit was run against.' },
        },
      },
      project: {
        type: 'object',
        additionalProperties: false,
        required: ['root', 'pdsPackages'],
        properties: {
          root: { type: 'string' },
          pdsPackages: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['name', 'version'],
              properties: { name: { type: 'string' }, version: { type: 'string' } },
            },
          },
        },
      },
      scope: {
        type: 'object',
        additionalProperties: false,
        required: ['includedPaths', 'excludedPaths'],
        description:
          'What the run covered, as a list rather than as a claim about the file walk. A package that was never ' +
          'discovered is a package nobody can see was missed, so `completed` is checked against these two arrays.',
        properties: {
          includedPaths: stringArray(
            'Every path the run audited, project-relative: one entry per discovered PDS-dependent package root, ' +
              'narrowed by any user-supplied include paths. `.` when the project is a single package.'
          ),
          excludedPaths: {
            type: 'array',
            description:
              'Every path deliberately left out, each with why — user-supplied excludes, default exclusions such ' +
              'as tests or build output, and any discovered package the run chose not to audit. A choice belongs ' +
              'here and not in `coverage.limitations`, which is for what the audit could not do.',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['path', 'reason'],
              properties: { path: { type: 'string' }, reason: { type: 'string' } },
            },
          },
        },
      },
      summary: {
        type: 'object',
        additionalProperties: false,
        required: ['result'],
        description:
          'Execution state and nothing else. Counts are deliberately absent: each one would be the length of an ' +
          'array in this same file, and a written number is a number that can disagree with the list beside it.',
        properties: {
          result: {
            enum: ['completed', 'partial', 'failed'],
            description:
              'Execution state only, never project quality: completed = every discovered PDS-dependent package ' +
              'audited and every eligible file in it checked; partial = a discovered package went unaudited or ' +
              'something eligible could not be checked; failed = no meaningful audit was possible.',
          },
        },
      },
      coverage: {
        type: 'object',
        additionalProperties: false,
        required: ['skippedFiles', 'limitations'],
        description:
          'Deliberately thin. Anything here is the audit grading its own work, which no consumer can check, so it ' +
          'carries only what a reader can act on: paths they can open, and gaps stated in words. Without it a ' +
          '`partial` result names no gap at all.',
        properties: {
          skippedFiles: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['path', 'reason'],
              properties: { path: { type: 'string' }, reason: { type: 'string' } },
            },
          },
          limitations: stringArray(
            'Anything that prevented a complete check, disclosed in full. Only what the audit could not do — ' +
              'anything it chose to leave out is a decision and belongs in `scope.excludedPaths` with its reason.'
          ),
        },
      },
      findings: {
        type: 'array',
        description:
          'Every deprecated usage found, ordered cheapest first: effective effort ascending, then confidence, then ' +
          'occurrence count descending, then ruleId. That order is the recommended action plan.',
        items: {
          type: 'object',
          additionalProperties: false,
          required: [
            'id',
            'ruleId',
            'usageKind',
            'title',
            'confidence',
            'baselineEffort',
            'remediation',
            'evidence',
            'sources',
          ],
          properties: {
            id: { type: 'string', description: 'Run-unique finding id.' },
            ruleId: {
              type: 'string',
              description:
                'The deprecation index entry id, e.g. prop/p-accordion/heading, copied verbatim. Stable across ' +
                'releases, so findings stay comparable between runs.',
            },
            usageKind: { enum: [...USAGE_KINDS], description: "The rule id's first segment." },
            title: {
              type: 'string',
              description: 'One line naming the deprecated API, e.g. "Deprecated prop heading on p-accordion".',
            },
            deprecationMessage: {
              type: 'string',
              description: 'The index entry\u2019s message, carried verbatim when it has one.',
            },
            confidence: {
              enum: ['high', 'medium'],
              description: 'Derived, not judged: the lowest confidence across this finding\u2019s evidence locations.',
            },
            baselineEffort: {
              enum: [...EFFORTS],
              description: 'Derived from usageKind, one level higher when the index documents no replacement.',
            },
            observedEffort: {
              enum: [...EFFORTS],
              description: 'Only when this project implements the API in a way that changes the real cost.',
            },
            effortRationale: {
              type: 'string',
              description:
                'Required whenever observedEffort is present, and must point at evidence already listed on this ' +
                'finding — otherwise the deviation is unreviewable.',
            },
            remediation: {
              type: 'object',
              additionalProperties: false,
              required: ['instruction'],
              properties: {
                replacement: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['from', 'to'],
                  description:
                    'The exact edit, in this framework\u2019s spelling. Present only when the index documents an ' +
                    'unambiguous replacement, so a fix never has to re-derive it from prose.',
                  properties: { from: { type: 'string' }, to: { type: 'string' } },
                },
                instruction: {
                  type: 'string',
                  description:
                    'What to do, in words. When no replacement is documented, say so plainly rather than inventing one.',
                },
              },
            },
            evidence: {
              type: 'array',
              minItems: 1,
              items: evidenceLocation(
                {
                  line: {
                    type: 'integer',
                    minimum: 1,
                    description:
                      'The usage itself — the attribute, tag, property or alias reference. Never the import, @use, ' +
                      '@theme or declaration line that anchored or resolved it: those belong in `anchor`, and ' +
                      'counting them as locations makes two runs of the same project disagree on how many there are.',
                  },
                  detection: {
                    enum: [...DETECTION_IDS],
                    description: 'How this location was reached. Determines its confidence.',
                  },
                  valueResolution: {
                    enum: [...VALUE_RESOLUTION_IDS],
                    description: 'How the deprecated value was resolved. Only for usageKind `propValue`.',
                  },
                  anchor: {
                    ...evidenceLocation({
                      line: {
                        type: 'integer',
                        minimum: 1,
                        description: 'The anchoring line, which is frequently in a different file from the usage.',
                      },
                    }),
                    description:
                      'The line that proves this usage is PDS — the import, the resolved SCSS @use including one ' +
                      'injected by build config, the Tailwind @theme import, or the PDS root at the far end of a ' +
                      'wrapper chain. The only truthful home for the vite.config.ts line that anchors a stylesheet ' +
                      'naming PDS nowhere. Omitted only when the usage anchors itself, as a --p- custom property ' +
                      'does.',
                  },
                },
                ['detection']
              ),
            },
            sources: {
              type: 'array',
              minItems: 1,
              description: 'Where the fact came from, so a reader or a fix skill can re-ground the finding.',
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['reference', 'pdsVersion'],
                properties: {
                  reference: {
                    type: 'string',
                    description:
                      'Knowledge-skill reference the fact comes from, as a path relative to that skill\u2019s root ' +
                      '— the same form the knowledge skill uses for its own links, so a consumer can resolve it ' +
                      'without guessing the base directory.',
                  },
                  pdsVersion: { type: 'string' },
                },
              },
            },
          },
          dependentRequired: { observedEffort: ['effortRationale'] },
        },
      },
      manualFollowUps: {
        type: 'array',
        description:
          'Deprecated usage that was detected but could not be resolved. Kept apart from findings because a ' +
          'follow-up has no fix to apply — anything acting on this report leaves these to a human.',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['subject', 'reason', 'evidence'],
          properties: {
            subject: {
              type: 'string',
              description:
                'What could not be resolved, e.g. "p-text size". Free text, since a follow-up often spans several index entries.',
            },
            ruleId: {
              type: 'string',
              description:
                'Only when the follow-up maps to exactly one index entry, and then copied verbatim. Omit it rather ' +
                'than inventing one: an id that is not in the index cannot be looked up or compared across runs.',
            },
            reason: {
              type: 'string',
              description: 'Why it could not become a finding — dynamic value, unanchored match, spread props.',
            },
            evidence: { type: 'array', minItems: 1, items: evidenceLocation() },
          },
        },
      },
    },
  };

  return JSON.stringify(schema, null, 2);
};
