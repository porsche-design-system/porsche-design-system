import { EFFORTS, ENTRY_KINDS } from '../knowledge/deprecations/types';
import { getSkillName } from '../registry';
import type { Framework } from '../shared/skillTree';
import { AUDIT_DOMAIN_IDS } from './domains';

/**
 * The versioned JSON Schema the audit's machine-readable report validates against.
 *
 * Built rather than hand-written so the enums that also exist in code — audit domains, entry kinds,
 * efforts, source categories — cannot drift from what the skill actually ships. A schema claiming
 * `entryKind` values the index never emits, or an `auditDomains` value with no domain reference
 * behind it, would be a contract nobody could satisfy.
 *
 * `schemaVersion` is the compatibility contract: future audit domains add fields and enum values, and
 * rule ids stay stable, so reports remain comparable across releases.
 */

/** Bumped when the report shape changes in a way a consumer must react to. */
export const REPORT_SCHEMA_VERSION = '1.0.0';

/** File name of the schema inside the audit tree. */
export const REPORT_SCHEMA_FILE = 'references/report.schema.json';

const stringArray = (description: string) => ({ type: 'array', description, items: { type: 'string' } });

export const buildReportSchema = (framework: Framework): string => {
  const schema = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: `https://designsystem.porsche.com/schemas/${getSkillName('audit', framework)}/${REPORT_SCHEMA_VERSION}.json`,
    title: `Porsche Design System deprecated-usage audit report (${framework})`,
    type: 'object',
    additionalProperties: false,
    required: [
      'schemaVersion',
      'audit',
      'project',
      'scope',
      'summary',
      'inventory',
      'coverage',
      'findings',
      'manualFollowUps',
      'actionPlan',
    ],
    properties: {
      schemaVersion: { const: REPORT_SCHEMA_VERSION },
      audit: {
        type: 'object',
        additionalProperties: false,
        required: ['runId', 'generatedAt', 'skillName', 'framework', 'pdsVersion'],
        properties: {
          runId: {
            type: 'string',
            description: 'Filesystem-safe UTC timestamp identifying the run, e.g. 2026-07-23T09-21-27Z.',
          },
          generatedAt: { type: 'string', format: 'date-time' },
          skillName: { const: getSkillName('audit', framework) },
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
        required: ['includedPaths', 'excludedPaths', 'auditDomains'],
        properties: {
          includedPaths: stringArray('Project-relative paths the run was limited to; empty means the whole project.'),
          excludedPaths: stringArray('Project-relative paths excluded from the run.'),
          auditDomains: {
            type: 'array',
            description: 'Audit domains executed, one entry per domain reference the skill ships.',
            items: { enum: [...AUDIT_DOMAIN_IDS] },
          },
        },
      },
      summary: {
        type: 'object',
        additionalProperties: false,
        required: ['result', 'findingCount', 'findingCountsByEntryKind'],
        properties: {
          result: {
            enum: ['completed', 'partial', 'failed'],
            description:
              'Execution state only, never project quality: completed = every eligible file checked; ' +
              'partial = something eligible could not be; failed = no meaningful audit was possible.',
          },
          findingCount: { type: 'integer', minimum: 0 },
          findingCountsByEntryKind: {
            type: 'object',
            additionalProperties: false,
            properties: Object.fromEntries(ENTRY_KINDS.map((kind) => [kind, { type: 'integer', minimum: 0 }])),
          },
        },
      },
      inventory: {
        type: 'object',
        additionalProperties: false,
        required: ['components', 'imports', 'stylingIntegrations'],
        properties: {
          components: stringArray('PDS component tags or wrapper components found in the project.'),
          imports: stringArray('PDS package specifiers the project imports.'),
          stylingIntegrations: stringArray('PDS styling integrations in use, e.g. scss, tailwindcss, emotion.'),
        },
      },
      coverage: {
        type: 'object',
        additionalProperties: false,
        required: ['skippedFiles', 'limitations'],
        description:
          'Deliberately thin. Anything here is the audit grading its own work, which no consumer can check, so it ' +
          'carries only what a reader can act on: paths they can open, and gaps stated in words. `inventory` covers ' +
          'the same ground verifiably, because a reader can grep the project against it.',
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
          limitations: stringArray('Anything that prevented a complete check, disclosed in full.'),
        },
      },
      findings: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: [
            'id',
            'ruleId',
            'entryKind',
            'title',
            'severity',
            'confidence',
            'baselineEffort',
            'impact',
            'observed',
            'expected',
            'evidence',
            'remediation',
            'sources',
          ],
          properties: {
            id: { type: 'string', description: 'Run-unique finding id.' },
            ruleId: {
              type: 'string',
              description: 'The deprecation index entry id, e.g. prop/p-accordion/heading. Stable across releases.',
            },
            entryKind: { enum: [...ENTRY_KINDS] },
            title: { type: 'string' },
            severity: {
              const: 'medium',
              description:
                'Every deprecation is medium — a credible break at the next major release. Severity is impact ' +
                'only; confidence and effort never change it. Higher levels are reserved for future domains.',
            },
            confidence: { enum: ['high', 'medium'] },
            baselineEffort: { enum: [...EFFORTS], description: 'Derived from entryKind.' },
            observedEffort: {
              enum: [...EFFORTS],
              description: 'Only when project evidence justifies deviating from the baseline.',
            },
            effortRationale: { type: 'string', description: 'Required whenever observedEffort is present.' },
            impact: { type: 'string' },
            observed: { type: 'string' },
            expected: { type: 'string' },
            evidence: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['path'],
                properties: {
                  path: { type: 'string', description: 'Project-relative path.' },
                  line: { type: 'integer', minimum: 1 },
                  snippet: { type: 'string' },
                },
              },
            },
            remediation: { type: 'string' },
            sources: {
              type: 'array',
              minItems: 1,
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
            evidence: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['path'],
                properties: {
                  path: { type: 'string' },
                  line: { type: 'integer', minimum: 1 },
                  snippet: { type: 'string' },
                },
              },
            },
          },
        },
      },
      actionPlan: {
        type: 'array',
        description:
          'Finding ids ordered by severity (highest), confidence (highest), effort (lowest), then occurrence ' +
          'count (highest) — biggest cheap wins first.',
        items: { type: 'string' },
      },
    },
  };

  return JSON.stringify(schema, null, 2);
};
