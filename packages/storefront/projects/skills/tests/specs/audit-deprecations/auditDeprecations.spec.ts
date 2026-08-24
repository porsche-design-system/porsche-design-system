import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { baselineEffort, DETECTIONS, VALUE_RESOLUTIONS } from '@skills/audit-deprecations/grading';
import { AUDIT_KIND } from '@skills/audit-deprecations/reportSchema';
import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import { ENTRY_KINDS } from '@skills/knowledge/deprecations/types';
import { DEPRECATIONS_REFERENCE } from '@skills/knowledge/skillMd';
import { getSkillName } from '@skills/registry';
import { FRAMEWORKS, stagedSkillDir } from '@skills/shared/skillTree';
import { describe, expect, it } from 'vitest';

/**
 * Producer-side gates for the deprecation audit skill.
 *
 * The audit is a prompt, so no test here can assert what an agent does with it — that is measured by
 * the fixture recall evaluation, not gated in CI. What *is* provable is that the artifact ships
 * correctly: the schema is a real schema, the framework guard exists, the method names its only
 * source of truth, and the grading the prompt states is the grading the schema accepts.
 *
 * That last one is what keeps the two halves honest. `SKILL.md` renders its tables from `grading.ts`
 * and the schema takes its enums from the same module, so a detection an agent is told to record can
 * never be one the report may not carry.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../../..');

const treeFile = (framework: (typeof FRAMEWORKS)[number], relativePath: string): string =>
  path.join(REPO_ROOT, stagedSkillDir('audit-deprecations', framework), relativePath);

const read = (framework: (typeof FRAMEWORKS)[number], relativePath: string): string =>
  fs.readFileSync(treeFile(framework, relativePath), 'utf-8');

const schemaOf = (framework: (typeof FRAMEWORKS)[number]) =>
  JSON.parse(read(framework, 'references/report.schema.json'));

const findingOf = (framework: (typeof FRAMEWORKS)[number]) => schemaOf(framework).properties.findings.items;

describe('audit-deprecations skill', () => {
  for (const framework of FRAMEWORKS) {
    describe(`${framework} tree`, () => {
      it('ships exactly SKILL.md and the report schema', () => {
        // The method is one self-contained file: a reference an agent may or may not open is a
        // reference it can answer from memory instead. The schema is the exception, because the
        // agent validates against it rather than reads it.
        expect(fs.existsSync(treeFile(framework, 'SKILL.md'))).toBe(true);
        expect(fs.readdirSync(treeFile(framework, 'references'))).toStrictEqual(['report.schema.json']);
      });

      it('names itself pds-audit-deprecations-<framework> in its frontmatter', () => {
        expect(read(framework, 'SKILL.md')).toContain(`name: ${getSkillName('audit-deprecations', framework)}`);
      });

      it('is manual-invocation only', () => {
        // Auditing reads the whole project and writes report files, so it runs when a user asks for
        // it — never as a side effect of an adjacent prompt. An unasked-for audit produces a report
        // nobody reads, and a half-attended one that reports nothing looks like a clean codebase.
        //
        // Asserts the flag, not its position: which optional fields sit around it is the frontmatter
        // gate's business, and coupling to that made this fail on an unrelated field being added.
        const frontmatter = (read(framework, 'SKILL.md').match(/^---\n([\s\S]*?)\n---\n/u) as RegExpMatchArray)[1];
        expect(frontmatter.split('\n')).toContain('disable-model-invocation: true');
      });

      it('describes what it does rather than when to activate', () => {
        // With model invocation disabled, the description is read by a user picking a skill, not by a
        // model deciding whether to fire. Activation clauses would address a reader that never sees it.
        const description = (read(framework, 'SKILL.md').match(/^description: (.+)$/mu) as RegExpMatchArray)[1];
        expect(description).not.toMatch(/\bUse when\b|\bDo not activate\b/);
      });

      it('declares its knowledge-skill dependency in frontmatter', () => {
        // Skills load progressively: metadata at startup, the body only on activation. A dependency
        // stated only in prose is undiscoverable until the skill is already running, so it goes in
        // the spec's `compatibility` field where something can see it first.
        const compatibility = (read(framework, 'SKILL.md').match(/^compatibility: (.+)$/mu) as RegExpMatchArray)[1];
        expect(compatibility).toContain(getSkillName('knowledge', framework));
        expect(compatibility).toContain(`@porsche-design-system/components-${framework}`);
        expect(compatibility.length).toBeLessThanOrEqual(500);
      });

      it('carries a framework self-check', () => {
        expect(read(framework, 'SKILL.md')).toContain(`@porsche-design-system/components-${framework}`);
      });

      it('points at the deprecation index as its only source of what is deprecated', () => {
        expect(read(framework, 'SKILL.md')).toContain(DEPRECATIONS_REFERENCE);
      });

      it('names an index path that actually resolves from the skill tree', () => {
        // The index lives in a sibling skill, so this path leaves the tree and the in-tree link gate
        // cannot check it. Resolving it against staging is what proves the audit can find its only
        // source of truth — an audit pointed at a missing index writes a `failed` report.
        const sibling = `../${getSkillName('knowledge', framework)}/${DEPRECATIONS_REFERENCE}`;
        expect(read(framework, 'SKILL.md')).toContain(sibling);
        expect(fs.existsSync(path.resolve(treeFile(framework, '.'), sibling))).toBe(true);
      });

      it('anchors by working outward from PDS, with no hop limit', () => {
        // Searching the project and filtering makes anchoring a step that can be performed badly;
        // starting at PDS and following usage outward makes a non-PDS match unrepresentable. The hop
        // limit went with it — wrapping PDS two or three layers deep is normal, and a constant would
        // drop most real usage.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('Work outward from PDS');
        expect(skillMd).toContain('No hop limit');
        expect(skillMd).not.toMatch(/one hop only/i);
      });

      it('names the roots that exist without an import', () => {
        // The easiest anchoring holes: PDS custom properties come from a global stylesheet no file
        // imports, and SCSS is commonly injected by build config rather than written in a file. Both
        // silently unanchor a whole category of usage if the roots do not name them.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('`--p-`-prefixed CSS custom properties');
        expect(skillMd).toContain('injected by build config');
      });

      it('requires the wrapper to forward a prop before it anchors it', () => {
        // Wrapper layers routinely rename or reinterpret an API, so following the component without
        // checking the prop reports a project's own `size` as PDS usage.
        expect(read(framework, 'SKILL.md')).toContain('only if it forwards it');
      });

      it('keeps a disclosed fallback for what the graph cannot reach', () => {
        // Dynamic construction and unresolvable re-exports are invisible to traversal. Without a
        // fallback the audit silently under-reports; without disclosure the gap looks like a clean project.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('When the graph runs out');
        expect(skillMd).toContain('coverage.limitations');
      });

      it('tells the agent to look inside breakpoint objects', () => {
        // The single easiest silent under-report: a whole-attribute comparison matches no responsive
        // usage at all, and nothing about the failure is visible in the report.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain("size=\"{'base': 'small', 'l': 'medium'}\"");
        expect(skillMd).toContain("size={{'base': 'small', 'l': 'medium'}}");
      });

      it('states positively that a medium-confidence candidate is a finding', () => {
        // An early fixture run demoted a medium-confidence candidate to a follow-up. The rule was
        // stated only by negation ("anything weaker is a follow-up"), which needs an inference to
        // read correctly.
        expect(read(framework, 'SKILL.md')).toContain('**A `medium` finding is a finding**');
      });

      it('offers the same detections in the prompt and the schema', () => {
        // A detection an agent is told to record but the schema rejects fails at validation, after
        // the whole audit has run; the reverse ships an enum value nothing ever writes.
        const skillMd = read(framework, 'SKILL.md');
        const detections = Object.keys(DETECTIONS);
        expect(findingOf(framework).properties.evidence.items.properties.detection.enum).toStrictEqual(detections);
        for (const detection of detections) {
          expect(skillMd, `SKILL.md does not state the ${detection} detection`).toContain(`| \`${detection}\` |`);
        }
      });

      it('offers the same value resolutions in the prompt and the schema', () => {
        const skillMd = read(framework, 'SKILL.md');
        const resolutions = Object.keys(VALUE_RESOLUTIONS);
        expect(findingOf(framework).properties.evidence.items.properties.valueResolution.enum).toStrictEqual(
          resolutions
        );
        for (const resolution of resolutions) {
          expect(skillMd, `SKILL.md does not state the ${resolution} resolution`).toContain(`| \`${resolution}\` |`);
        }
      });

      it('requires a detection on every evidence location, so confidence is derived rather than asserted', () => {
        expect(findingOf(framework).properties.evidence.items.required).toContain('detection');
        expect(findingOf(framework).properties.confidence.enum).toStrictEqual(['high', 'medium']);
      });

      it('requires a quoted snippet on every evidence location', () => {
        // An agent that cannot quote the line it claims to have found almost certainly did not read
        // it, so the quote is the check — and it is what a later fix re-verifies against the file.
        for (const items of [
          findingOf(framework).properties.evidence.items,
          schemaOf(framework).properties.manualFollowUps.items.properties.evidence.items,
        ]) {
          expect(items.required).toStrictEqual(expect.arrayContaining(['path', 'line', 'snippet']));
        }
      });

      it('states a baseline effort for every entry kind, in both replacement cases', () => {
        // A deprecated component with a documented successor is routine work; one with nothing to
        // swap in means designing the replacement. Both cases are derived, so neither is a judgement.
        const skillMd = read(framework, 'SKILL.md');
        for (const kind of ENTRY_KINDS) {
          expect(skillMd, `no baseline effort stated for ${kind}`).toContain(
            `| \`${kind}\` | \`${baselineEffort(kind, true)}\` | \`${baselineEffort(kind, false)}\` |`
          );
        }
      });

      it('requires an effort rationale whenever the baseline is overridden', () => {
        expect(findingOf(framework).dependentRequired).toStrictEqual({ observedEffort: ['effortRationale'] });
      });

      it('requires evidence, a source and a remediation on every finding', () => {
        const finding = findingOf(framework);
        expect(finding.required).toStrictEqual(expect.arrayContaining(['evidence', 'sources', 'remediation']));
        expect(finding.properties.evidence.minItems).toBe(1);
        expect(finding.properties.sources.minItems).toBe(1);
      });

      it('carries the exact edit whenever one is documented, so a fix never re-derives it', () => {
        const remediation = findingOf(framework).properties.remediation;
        expect(remediation.required).toStrictEqual(['instruction']);
        expect(remediation.properties.replacement.required).toStrictEqual(['from', 'to']);
      });

      it('pins the base path for a finding source, so it resolves like a rule id', () => {
        const reference = findingOf(framework).properties.sources.items.properties.reference;
        expect(reference.description).toContain('relative to that skill\u2019s root');
      });

      it('carries no severity, since every deprecation has the same impact', () => {
        // One constant repeated on every row is noise, and a field with a single legal value invites
        // an agent to promote a finding it finds urgent. The impact is stated once in the intro.
        expect(Object.keys(findingOf(framework).properties)).not.toContain('severity');
        expect(read(framework, 'SKILL.md')).toContain('breaks at the next major release');
      });

      it('keeps summary to the execution state, with no count to disagree with the arrays', () => {
        // Every count in this report is the length of an array in the same file. A written number is
        // one an agent can get wrong while the list beside it says otherwise.
        expect(Object.keys(schemaOf(framework).properties.summary.properties)).toStrictEqual(['result']);
      });

      it('keeps coverage to what a reader can check', () => {
        // A weaker model set `scanned: true` on all nine catalog categories while missing every Emotion
        // and Tailwind finding. Replacing the flag with counts would not have helped — a fabricated
        // number is as cheap as a fabricated boolean. Self-graded coverage is unfalsifiable whatever
        // its type, and worse than absent, because nine green rows read as assurance.
        const coverage = schemaOf(framework).properties.coverage;
        expect(Object.keys(coverage.properties)).toStrictEqual(['skippedFiles', 'limitations']);
        // What survives is checkable: skipped paths a reader can open, and gaps stated in words.
        expect(coverage.properties.skippedFiles.items.required).toContain('path');
      });

      it('lets a follow-up omit a rule id rather than invent one', () => {
        // Found on the second fixture run: a follow-up spanning several index entries was given
        // `value/p-text/size`, which no entry has. A required id forces exactly that — an
        // unresolvable value maps to no single entry, so `subject` carries the description instead.
        const followUp = schemaOf(framework).properties.manualFollowUps.items;
        expect(followUp.required).toContain('subject');
        expect(followUp.required).not.toContain('ruleId');
      });

      it('keeps follow-ups out of the findings a fix would apply', () => {
        // A follow-up has no remediation by definition, so anything told to "fix the findings" would
        // have to invent one — the exact failure the quoted evidence elsewhere exists to prevent.
        expect(schemaOf(framework).required).toContain('manualFollowUps');
        expect(read(framework, 'SKILL.md')).toContain('must not be fixed automatically');
      });

      it('verifies findings against the index and the files before writing', () => {
        // Schema validation proves shape only: an invented rule id and a snippet that is not really
        // at that line both validate perfectly.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('## 7. Verify before writing');
        expect(skillMd.indexOf('## 7. Verify before writing')).toBeLessThan(skillMd.indexOf('## 8. Write the reports'));
      });

      it('stays read-only, leaving fixing to a separate deliberate act', () => {
        expect(read(framework, 'SKILL.md')).toContain('**Fixing is not part of this skill.**');
      });

      it('declares what it audits, so a shared run directory can hold several reports', () => {
        // The extension point for a future composite: it indexes a run directory without knowing what
        // each report audits, instead of guessing from the file name.
        expect(schemaOf(framework).properties.audit.properties.auditKind.const).toBe(AUDIT_KIND);
        expect(schemaOf(framework).properties.audit.required).toContain('auditKind');
      });

      it('leaves other audits\u2019 reports in the shared run directory alone', () => {
        expect(read(framework, 'SKILL.md')).toContain('never clear it');
      });
    });
  }

  it('inverts the js self-check, since components-js is a dependency of every wrapper', () => {
    const skillMd = read('js', 'SKILL.md');
    for (const wrapper of ['react', 'angular', 'vue']) {
      expect(skillMd, `js SKILL.md does not exclude the ${wrapper} wrapper`).toContain(
        `@porsche-design-system/components-${wrapper}`
      );
    }
  });

  it('includes Angular JSON build configuration in the audit scope', () => {
    const skillMd = read('angular', 'SKILL.md');
    for (const config of ['**/angular.json', '**/project.json', '**/workspace.json']) {
      expect(skillMd).toContain(`\`${config}\``);
    }
    expect(skillMd).toContain('inject global SCSS');
  });

  it('does not restate the deprecated identifiers the knowledge index owns', () => {
    // The audit is policy; the index is fact. A deprecated identifier hard-coded here would become a
    // second source that goes stale the moment the index changes.
    //
    // Scoped to SCSS `$pds-*` names and deprecated component tags, which are unambiguous. Ordinary
    // export names like `border` or `spacing` are common English words, and `--border-width-regular`
    // appears deliberately as the worked example of an identifier too generic to match without an
    // anchor — a substring sweep over every identifier would flag all of those as leaks.
    const shipped = read('react', 'SKILL.md');
    const owned = collectDeprecations()
      .flatMap((source) => source.entries)
      .filter((entry) => entry.identifier.startsWith('$pds-') || entry.kind === 'component')
      .map((entry) => entry.identifier);
    expect(owned.length).toBeGreaterThan(0);
    expect(owned.filter((identifier) => shipped.includes(identifier))).toStrictEqual([]);
  });
});
