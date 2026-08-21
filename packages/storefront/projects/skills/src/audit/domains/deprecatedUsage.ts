import { BASELINE_EFFORT, ENTRY_KINDS } from '../../knowledge/deprecations/types';
import { DEPRECATIONS_REFERENCE, skillName as knowledgeSkillName } from '../../knowledge/skillMd';
import { markdownTable } from '../../shared/markdown';
import type { Framework } from '../../shared/skillTree';
import type { AuditDomain } from './types';

/**
 * The deprecated-usage domain: every use of a Porsche Design System API that still works today and
 * will be removed in the next major release.
 *
 * Everything here is specific to this domain — where its facts come from, how a candidate becomes a
 * finding, and how findings are graded. The shared method it builds on (framework guard, scope,
 * anchoring, the finding contract, the report) lives in `SKILL.md` and is not repeated.
 */

const wrapperPackage = (framework: Framework): string => `@porsche-design-system/components-${framework}`;

/**
 * The deprecation index, addressed two ways.
 *
 * It lives in a *sibling* skill, so a tree-relative markdown link would dangle. The sibling path is
 * correct wherever both skills are installed together — in the package and once linked into
 * `.agents/skills/` — and the package path is the fallback for when only this skill was linked.
 */
const indexSiblingPath = (framework: Framework): string =>
  `../${knowledgeSkillName(framework)}/${DEPRECATIONS_REFERENCE}`;

const indexPackagePath = (framework: Framework): string =>
  `node_modules/${wrapperPackage(framework)}/skills/${knowledgeSkillName(framework)}/${DEPRECATIONS_REFERENCE}`;

const renderSource = (framework: Framework): string =>
  [
    '## The deprecation index',
    '',
    `Read \`${indexSiblingPath(framework)}\` — or, if only this skill was linked, ` +
      `\`${indexPackagePath(framework)}\`.`,
    '',
    'That index is the **only** source of what is deprecated. It is generated from the installed package, enumerates ' +
      'every source category including those that currently have none, and is gated in CI against every deprecation ' +
      'source — so it is complete by construction, and anything absent from it is not deprecated.',
    '',
    'Its **Coverage** table gives the entry count per source category. Work through every one — components, SCSS, ' +
      'Emotion, vanilla-extract, Tailwind, tokens, icons, stylesheets, partials. The styling categories are the ' +
      'easiest to skip, because they live in `.css` and style-definition files rather than component files.',
    '',
    'If you did not get through a category, say so in `coverage.limitations` and make the run `partial`. A short ' +
      'report reads as a clean codebase, so an audit that quietly stopped early is worse than one that admits it — ' +
      'nobody goes looking after a clean result.',
    '',
    'Do not use recalled knowledge, the public documentation site, or a changelog to decide that something is ' +
      'deprecated. If it is not in the index, it is not reported.',
    '',
    'Each index row also links the knowledge reference documenting its replacement. Open that reference when a row ' +
      'gives you less than a concrete remediation needs — the component whose props you are replacing, or the ' +
      'styling integration an alias belongs to.',
    '',
    'If the index cannot be read, write a report with `summary.result: "failed"` and no findings, then stop. An audit ' +
      'that cannot read its own catalog finds nothing, which is indistinguishable from a clean project.',
  ].join('\n');

const renderCandidates = (): string =>
  [
    '## What counts',
    '',
    'Each index entry names one deprecated API and its kind. Working outward from PDS as `SKILL.md` describes, check ' +
      'every anchored usage against the index — the entry\u2019s spellings for this framework say what that usage ' +
      'looks like. A usage the traversal never reaches is not a finding; it is whatever the fallback makes of it.',
    '',
    'Most kinds need nothing further: a deprecated component, prop, event, slot, CSS variable or style alias is ' +
      'statically present in the source whatever data flows through it — `<PAccordion heading={anything}>` already ' +
      'proves the deprecated prop is used.',
  ].join('\n');

/**
 * Deprecated *values* are the one kind that is not statically guaranteed, so they get their own
 * rules. The breakpoint-object warning is the sharpest thing in this file: getting it wrong drops
 * every responsive usage in a project and produces a shorter, cleaner-looking report.
 */
const renderValueResolution = (): string =>
  [
    '## Resolving deprecated values',
    '',
    'A deprecated **value** is a plain string that can come from anywhere, so it has to be resolved before it can be ' +
      'reported:',
    '',
    markdownTable(
      ['Where the value comes from', 'Outcome'],
      [
        ['A literal, including inside a breakpoint object', 'Finding, `high` confidence'],
        ['A constant declared in the same file', 'Finding, `high` confidence'],
        ['A constant imported from another file', 'Finding, `medium` confidence'],
        ['Component props, state, or a spread', 'Manual follow-up'],
      ]
    ),
    '',
    'Resolve constants **one hop** — the declaration a value refers to — and no further.',
    '',
    '**Breakpoint objects are the easiest thing to miss and the most costly.** A responsive value is nested inside a ' +
      'structure, so comparing a whole attribute value against a deprecated value matches none of them:',
    '',
    '```text',
    "size=\"{'base': 'small', 'l': 'medium'}\"   string attribute holding single-quoted pseudo-JSON",
    "size={{'base': 'small', 'l': 'medium'}}     expression form",
    '```',
    '',
    'Look **inside** the object in both spellings. Missing this does not fail loudly — it silently drops every ' +
      'responsive usage in the project.',
    '',
    'Dynamic usage recorded as a manual follow-up is the correct outcome, not a gap. It does **not** make the run ' +
      '`partial`, and it does **not** belong in `coverage.limitations` — it was detected and disclosed. Recording it ' +
      'in both places reports a working check as a coverage failure.',
    '',
    'A follow-up carries a `subject` naming what could not be resolved (`p-text size`). Give it a `ruleId` only when ' +
      'it maps to exactly one index entry; when the value could be any of several, omit the id rather than inventing ' +
      'one — an id that is not in the index cannot be looked up.',
  ].join('\n');

const renderGrading = (): string =>
  [
    '## Grading a deprecation finding',
    '',
    '**Severity is always `medium`.** Every deprecated API in this version still works and breaks at the next major ' +
      'release, which is one impact class. Do not promote a finding because it looks urgent, and do not demote one ' +
      'because it looks trivial.',
    '',
    'Some index entries carry a message saying an API has no effect anymore. Those are already-removed behavior kept ' +
      'as a declaration, and the wording matters to whoever reads the finding, so carry the message through verbatim ' +
      '— but it does not change severity.',
    '',
    '**Confidence** is `high` when a strong anchor and a literal or same-file constant leave no plausible ' +
      'alternative, and `medium` when the evidence holds but a cross-file constant or incomplete local context leaves ' +
      'one. Anything weaker is a manual follow-up, never a finding.',
    '',
    '**Baseline effort** comes from the entry kind:',
    '',
    markdownTable(
      ['Entry kind', 'Baseline effort'],
      ENTRY_KINDS.map((kind) => [`\`${kind}\``, `\`${BASELINE_EFFORT[kind]}\``])
    ),
    '',
    'Deviate from the baseline only as `SKILL.md` allows — on concrete project evidence, recording `observedEffort` ' +
      'and an `effortRationale`.',
    '',
    'Report repeated uses of the same deprecated API as **one** finding carrying every location. Split only when the ' +
      'remediation genuinely differs — the same deprecated prop fixed the same way twice is one finding, not two.',
    '',
    'Set each finding\u2019s `ruleId` to the index row\u2019s **Rule ID**, copied verbatim, and its `entryKind` to that ' +
      'id\u2019s first segment. Do not reconstruct either from the identifier or infer a kind from what the API looks ' +
      'like — a `--`-prefixed Tailwind alias is a `styleAlias`, not a `cssVariable`. Rule ids are what make findings ' +
      'comparable across runs and releases, and an invented one breaks that silently while looking correct.',
  ].join('\n');

export const deprecatedUsageDomain: AuditDomain = {
  id: 'deprecated-usage',
  title: 'Deprecated usage',
  summary:
    'Porsche Design System APIs that still work today and will be removed in the next major release — components, ' +
    'props, prop values, events, slots, CSS variables and styling-package aliases.',
  render: (framework) =>
    [
      'Find every use of a Porsche Design System API that is deprecated in the installed version. These APIs work ' +
        'today, so nothing is broken right now — each one is a break scheduled for the next major release.',
      '',
      renderSource(framework),
      '',
      renderCandidates(),
      '',
      renderValueResolution(),
      '',
      renderGrading(),
    ].join('\n'),
};
