import { EFFORTS } from '../knowledge/deprecations/types';
import { skillName as knowledgeSkillName } from '../knowledge/skillMd';
import type { Framework } from '../shared/skillTree';

/**
 * Fixed Markdown report structure. Placeholders use JSON paths so every rendered value remains
 * traceable to the validated report.
 */

export const REPORT_TEMPLATE_FILE = 'references/report-template.md';

/** Prevents template headings from being parsed as this file's structure. */
const TEMPLATE_FENCE = '````';

const SNIPPET_FENCE = '```';

const renderTemplate = (framework: Framework): string =>
  [
    `# Porsche Design System deprecation audit (${framework}) — <audit.runId>`,
    '',
    '- **PDS version audited:** `<audit.pdsVersion>`',
    `- **Framework:** \`${framework}\``,
    '- **Project root:** `<project.root>`',
    '- **Packages:** `<project.pdsPackages[].name>@<project.pdsPackages[].version>` — one per entry, comma-separated',
    '- **Generated at:** <audit.generatedAt>',
    '- **Result:** `<summary.result>`',
    '',
    '## Scope',
    '',
    '### Included',
    '',
    '- `<scope.includedPaths[]>`',
    '',
    '### Excluded',
    '',
    '- `<scope.excludedPaths[].path>` — <scope.excludedPaths[].reason>',
    '',
    'Nothing was excluded. — only when `scope.excludedPaths` is empty, replacing the list',
    '',
    '## Coverage',
    '',
    '### Skipped files',
    '',
    '- `<coverage.skippedFiles[].path>` — <coverage.skippedFiles[].reason>',
    '',
    'No eligible files were skipped. — only when `coverage.skippedFiles` is empty, replacing the list',
    '',
    '### Limitations',
    '',
    '- <coverage.limitations[]>',
    '',
    'No limitations to report. — only when `coverage.limitations` is empty, replacing the list',
    '',
    '## Summary',
    '',
    '- **<number of findings>** findings across **<number of evidence locations across all findings>** locations',
    '- **<number of manual follow-ups>** manual follow-ups',
    '',
    '| Effort | Findings |',
    '| --- | --- |',
    '| `<effort>` | <number of findings with that effective effort> |',
    '',
    '| Confidence | Findings |',
    '| --- | --- |',
    '| `<confidence>` | <number of findings with that confidence> |',
    '',
    '## Findings',
    '',
    'Ordered cheapest first — effective effort ascending, then confidence, then occurrence count descending, then ' +
      'rule id. This order is the recommended action plan.',
    '',
    '### <position in `findings`>. <findings[].title>',
    '',
    '- **Rule id:** `<findings[].ruleId>`',
    '- **Kind:** `<findings[].usageKind>`',
    '- **Confidence:** `<findings[].confidence>`',
    '- **Effort:** `<findings[].baselineEffort>` (baseline)',
    '- **Effort:** `<findings[].observedEffort>` (observed — baseline `<findings[].baselineEffort>`) — only when ' +
      '`observedEffort` is present, replacing the line above',
    '- **Effort rationale:** <findings[].effortRationale> — only when `observedEffort` is present',
    '- **Deprecation message:** <findings[].deprecationMessage> — only when present',
    '- **Replacement:** `<findings[].remediation.replacement.from>` → `<findings[].remediation.replacement.to>` — ' +
      'only when present',
    '- **Instruction:** <findings[].remediation.instruction>',
    '- **Sources:**',
    `  - \`${knowledgeSkillName(framework)}/<findings[].sources[].reference>\` (PDS <findings[].sources[].pdsVersion>)`,
    '- **Locations (<number of entries in `findings[].evidence`>):**',
    '  - `<findings[].evidence[].path>:<findings[].evidence[].line>` — `<findings[].evidence[].detection>`, value ' +
      '`<findings[].evidence[].valueResolution>` — the value half only when `valueResolution` is present',
    `    ${SNIPPET_FENCE}`,
    '    <findings[].evidence[].snippet>',
    `    ${SNIPPET_FENCE}`,
    '    anchored by `<findings[].evidence[].anchor.path>:<findings[].evidence[].anchor.line>` — only when `anchor` ' +
      'is present, together with the block below',
    `    ${SNIPPET_FENCE}`,
    '    <findings[].evidence[].anchor.snippet>',
    `    ${SNIPPET_FENCE}`,
    '',
    'No deprecated usage was found. — only when `findings` is empty, replacing the ordering sentence, the entries ' +
      'and both Summary tables',
    '',
    '## Manual follow-ups',
    '',
    'Detected but not statically resolvable. These are for a human to review — do not fix them automatically.',
    '',
    '### <position in `manualFollowUps`>. <manualFollowUps[].subject>',
    '',
    '- **Rule id:** `<manualFollowUps[].ruleId>` — only when present',
    '- **Reason:** <manualFollowUps[].reason>',
    '- **Evidence (<number of entries in `manualFollowUps[].evidence`>):**',
    '  - `<manualFollowUps[].evidence[].path>:<manualFollowUps[].evidence[].line>`',
    `    ${SNIPPET_FENCE}`,
    '    <manualFollowUps[].evidence[].snippet>',
    `    ${SNIPPET_FENCE}`,
    '',
    'No manual follow-ups. — only when `manualFollowUps` is empty, replacing the entries',
    '',
    '## How to act on this report',
    '',
    'This report describes Porsche Design System `<audit.pdsVersion>` and is only valid for that version. After ' +
      'upgrading the package, run the audit again rather than working from this file.',
    '',
    'Findings are ordered cheapest first, so the list is the action plan: work down it. Applying one takes two ' +
      `lookups against \`${knowledgeSkillName(framework)}\`, and neither is optional. Re-check the rule id against ` +
      'the deprecation index: it is the only thing that establishes an API is still deprecated and what replaces ' +
      'it, and it describes the installed version rather than the one this report was written against. Then open ' +
      'the reference the finding lists under **Sources**, which documents how the replacement is actually written ' +
      '— **Instruction** and **Replacement** name the edit, not the current API.',
    '',
    'Manual follow-ups are for a human to resolve and must not be fixed automatically. Their values could not be ' +
      'determined statically, so it is not established that they are deprecated at all.',
    '',
    'Re-run this audit over the same scope afterwards. A clean re-run is the only reliable confirmation that a ' +
      'finding has been resolved.',
  ].join('\n');

export const buildReportTemplate = (framework: Framework): string =>
  [
    '# Markdown report template',
    '',
    'The Markdown report is a rendering of the validated JSON, written to the structure below. It is the file a ' +
      'human opens and the file an agent is later asked to act on, so its shape is fixed rather than composed per ' +
      'run: the same sections, in the same order, every time.',
    '',
    '## How to read this template',
    '',
    '- Reproduce every section, in this order, with these headings verbatim. Add none, drop none.',
    '- `<…>` is a placeholder naming the JSON path it renders, so every line of the report is traceable to the ' +
      'field it came from. One ending in `[]` is a repeated item: render one entry per array element.',
    '- A line marked `— only when …` is rendered only in that case and omitted entirely otherwise. The marker ' +
      'itself is never written into the report.',
    '- Empty-state sentences are given verbatim. Write the sentence rather than dropping the section, so an empty ' +
      'section never reads as a missing one.',
    '- Compute every count from the arrays you validated. Never write one from memory: a number that disagrees ' +
      'with the list under it discredits the whole report.',
    '- Nothing enters the report that is not in the JSON. Anything else worth saying — that `.pds/` is not ' +
      'git-ignored, for instance — belongs in your reply to the user, not in this file.',
    '',
    '## Template',
    '',
    `${TEMPLATE_FENCE}markdown`,
    renderTemplate(framework),
    TEMPLATE_FENCE,
    '',
    '## The values the template derives',
    '',
    'Four things above are computed rather than copied, and each has exactly one right answer:',
    '',
    '- **Effective effort** is `observedEffort` when present, else `baselineEffort`. It is what the findings order ' +
      'and the Summary effort table both use.',
    `- **Breakdown rows** list only buckets that have findings, ordered ${EFFORTS.map((effort) => `\`${effort}\``).join(', ')} ` +
      'and `high`, `medium` — the same direction as the findings themselves, so the cheapest and most certain work ' +
      'reads first.',
    '- **Finding numbers** are the position in `findings`, so `### 1.` is the first thing to fix. Manual follow-ups ' +
      'are numbered the same way.',
    `- **Source paths** are skill-qualified: \`${knowledgeSkillName(framework)}\` followed by the stored ` +
      "`reference`, which is relative to that skill's root. They point at the reference documenting the " +
      'replacement, never at the deprecation index.',
  ].join('\n');
