import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { baselineEffort, DETECTIONS, VALUE_RESOLUTIONS } from '@skills/audit-deprecations/grading';
import { AUDIT_KIND } from '@skills/audit-deprecations/reportSchema';
import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import { USAGE_KINDS } from '@skills/knowledge/deprecations/types';
import { DEPRECATIONS_REFERENCE } from '@skills/knowledge/skillMd';
import { getSkillName, getWrapperPackageName } from '@skills/registry';
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
        expect(compatibility).toContain(getWrapperPackageName(framework));
        expect(compatibility.length).toBeLessThanOrEqual(500);
      });

      it('carries a framework self-check', () => {
        expect(read(framework, 'SKILL.md')).toContain(getWrapperPackageName(framework));
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

      it('discovers PDS-dependent packages by their manifests, not by workspace globs', () => {
        // An unscoped run against this monorepo narrowed itself to three npm workspaces, audited them
        // perfectly and wrote `completed` — while the workspace holding 49 deprecations was never
        // enumerated, and the one it did drop was named nowhere. Workspace globs are a plausible
        // guess for "the packages", and they silently omit any directory that declares the dependency
        // without being a member.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('**Discover the packages before auditing any of them.**');
        expect(skillMd).toContain('`package.json`');
        expect(skillMd).toContain('`peerDependencies`');
        expect(skillMd).toMatch(/Do not take a monorepo\u2019s `workspaces` globs as the list/);
      });

      it('ties completed to the discovered packages rather than to file eligibility', () => {
        // A package never discovered holds no eligible files either, so a self-check phrased over
        // "every eligible file" agrees with itself and reports success. The package list is the only
        // thing that can catch it.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('Every discovered PDS-dependent package was audited');
        expect(skillMd).toContain('A discovered package went unaudited');
        expect(skillMd).toContain('check the claim against `scope.includedPaths`');
      });

      it('gives every excluded path a reason, so a dropped package cannot hide', () => {
        const excludedPaths = schemaOf(framework).properties.scope.properties.excludedPaths;
        expect(excludedPaths.items.required).toStrictEqual(['path', 'reason']);
      });

      it('gives a deliberate exclusion exactly one home', () => {
        // Three runs put default exclusions in three different places — both fields, neither, and one
        // list that omitted the exclusion that mattered. `scope.excludedPaths` records a choice;
        // `coverage.limitations` records something that stopped the audit.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('with its reason and **nowhere else**');
        expect(skillMd).toContain('`coverage.limitations` carries only what the audit **could not** do');
      });

      it('reports a wrapper-borne value as a finding rather than a follow-up', () => {
        // §4 says to follow the prop through the project's own wrappers and §6 grades two detections
        // that only a wrapper can produce, but §5 used to send anything arriving through a prop to
        // follow-ups. Both readings were faithful, and two runs picked one each — leaving half the
        // detection table unreachable in the run that chose §5.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain(
          '**A value arriving through one of the project\u2019s own wrappers is a finding, not a follow-up.**'
        );
        expect(skillMd).toContain('A value is a follow-up only when **no** call site resolves it');
      });

      it('grades a wrapper\u2019s own body as `direct`, not as a wrapper detection', () => {
        // The paragraph settling that a value resolving inside a wrapper is a finding did not say
        // what detection it carries, and "resolves **inside** a wrapper" reads as a route. One run
        // graded four such locations `wrapper-transformed`, pulling their findings to `medium` —
        // confidence is derived precisely so it cannot come out two ways.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('Such a location is `direct`, not a wrapper detection');
        for (const detection of ['wrapper-forwarded', 'wrapper-transformed'] as const) {
          expect(DETECTIONS[detection].description, `${detection} does not name the call site`).toContain('call site');
        }
      });

      it('keeps the in-wrapper resolution and its call sites on one finding', () => {
        // Saying the in-wrapper location grades `direct` and that wrapper detections describe a call
        // site read as alternatives: one run reported only the call sites, which dropped every branch
        // no caller selects — losing a whole rule, not a location, since a default nothing overrides
        // is exactly the one no call site points at.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('The two are not alternatives. **One finding carries both**');
      });

      it('counts a call site that selects a deprecated value, not only one that names it', () => {
        // "every call site that supplies one" left the selector case open: two runs agreed on every
        // call site carrying the deprecated spelling — including under a renamed prop — and split on
        // the two carrying a variant name that a lookup maps onto it. Four locations and the
        // confidence of two findings turned on the word "supplies".
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain(
          'A call site counts whether it **names** the deprecated value or only **selects** one'
        );
        expect(skillMd).toContain('the test is whether the line has to change for the deprecation to go away');
      });

      it('gives the wrapper a location only where the value resolves in its own file', () => {
        // "One finding carries both" read as "the wrapper's PDS element line, always": one run listed
        // `<PText size={scale}>` beside the call site that supplies the literal, counting one flow
        // twice and recording a `literal` resolution on a line holding no literal.
        expect(read(framework, 'SKILL.md')).toContain('That first half is *where the value is written*');
      });

      it('decides reachability rather than leaving it to the reader', () => {
        // A lookup table inside a wrapper holds values no call site selects. They still break at the
        // next major release, and silence here had one run report them and one skip them.
        expect(read(framework, 'SKILL.md')).toContain('resolved is the test, reached is not');
      });

      it('reads the replacement only from the dedicated index column', () => {
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('**Replacement** column');
        expect(skillMd).toContain('the note or the linked reference');
      });

      it('names the spread object key as a declaration rather than a usage', () => {
        // Two runs split on `const textProps = { size: 'large' }` spread onto a PDS element: one cited
        // the element, one the key. Eight of the thirteen location differences between them were this
        // one question, and both runs already graded it `same-file-constant`.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('including a key inside an object that is spread onto the element');
        expect(skillMd).toContain('the evidence line is the element the object is spread onto');
      });

      it('names the usage line as the evidence line, and gives the anchor its own field', () => {
        // Same project, same model, 49% difference in location count between two runs: one cited the
        // `@use`/import line beside every usage, the other cited neither. Occurrence count is a sort
        // key, so the two reports could not even be ordered comparably.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('An evidence `line` is the **usage**');
        expect(skillMd).toContain('- `anchor` on a location');
        const anchor = findingOf(framework).properties.evidence.items.properties.anchor;
        expect(anchor.required).toStrictEqual(expect.arrayContaining(['path', 'line', 'snippet']));
        expect(anchor.properties.detection).toBeUndefined();
      });

      it('defines every detection on the one axis of how the location was reached', () => {
        // `direct` used to be defined by where the API sits and `fallback-search` by how it was
        // reached, so a string-built tag in an imported file satisfied both.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('Record on each evidence location *how you reached it*');
        expect(DETECTIONS.direct.description).toBe('Reached from a root in this file, without leaving it.');
        for (const { description } of Object.values(DETECTIONS)) {
          expect(description, `${description} does not describe a route`).toMatch(/^Reached /);
        }
      });

      it('answers the string-built tag against this framework\u2019s roots', () => {
        // Where components enter through an import, nothing reaches a tag assembled as a string, so
        // it is a fallback-search hit in a file the import already anchors. Where the tag is itself
        // the root, the same line is direct.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain("`createElement('p-text', …)`");
        expect(skillMd).toContain(
          ['react', 'vue'].includes(framework)
            ? 'It is `fallback-search`, and the import goes in its `anchor`.'
            : 'are `direct` — the traversal starts there rather than arriving there'
        );
      });

      it('settles what a documented replacement is, so value effort stops flipping', () => {
        // A successor is documented only when the generated index states it explicitly.
        expect(read(framework, 'SKILL.md')).toContain(
          '"Documented" means the index row\u2019s **Replacement** column names one'
        );
      });

      it('names only categories present in the deprecation index', () => {
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('tokens, icons and stylesheets');
        expect(skillMd).not.toContain('stylesheets, partials');
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

      it('tells the agent to resolve values inside responsive objects', () => {
        // The single easiest silent under-report: a whole-attribute comparison matches no responsive
        // usage at all, and nothing about the failure is visible in the report.
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain('Resolve every value inside the object');
      });

      it('names the string-attribute responsive spelling, which every framework can hold', () => {
        // Naming no spelling is what lost it: a run found the bound form and dropped every value in
        // `size="{'base': 'small', 'l': 'x-large'}"` in the same file, because one quoted string
        // reads as a plain value rather than an object.
        expect(read(framework, 'SKILL.md')).toContain("size=\"{'base': 'small', 'l': 'medium'}\"");
      });

      it("names this framework's bound responsive spelling and no other's", () => {
        // Hard-coding the JSX form shipped a syntax three of the four frameworks cannot write.
        const skillMd = read(framework, 'SKILL.md');
        const bound: Record<string, string> = {
          react: "size={{ base: 'small', l: 'medium' }}",
          vue: ':size="{ base: \'small\', l: \'medium\' }"',
          angular: '[size]="{ base: \'small\', l: \'medium\' }"',
          js: "el.size = { base: 'small', l: 'medium' }",
        };
        expect(skillMd).toContain(bound[framework]);
        for (const [other, spelling] of Object.entries(bound)) {
          if (other !== framework) {
            expect(skillMd, `${framework} names the ${other} spelling`).not.toContain(spelling);
          }
        }
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

      it('states a baseline effort for every usage kind, in both replacement cases', () => {
        // A deprecated component with a documented successor is routine work; one with nothing to
        // swap in means designing the replacement. Both cases are derived, so neither is a judgement.
        const skillMd = read(framework, 'SKILL.md');
        for (const kind of USAGE_KINDS) {
          expect(skillMd, `no baseline effort stated for ${kind}`).toContain(
            `| \`${kind}\` | \`${baselineEffort(kind, true)}\` | \`${baselineEffort(kind, false)}\` |`
          );
        }
      });

      it('requires the shared usage-kind vocabulary on every finding', () => {
        const finding = findingOf(framework);
        expect(finding.required).toContain('usageKind');
        expect(finding.properties.usageKind.enum).toStrictEqual([...USAGE_KINDS]);
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
        // `propValue/p-text/size`, which no entry has. A required id forces exactly that — an
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
    for (const packageName of [
      getWrapperPackageName('react'),
      getWrapperPackageName('angular'),
      getWrapperPackageName('vue'),
    ]) {
      expect(skillMd, `js SKILL.md does not exclude ${packageName}`).toContain(packageName);
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
      .filter((entry) => entry.identifier.startsWith('$pds-') || entry.usageKind === 'component')
      .map((entry) => entry.identifier);
    expect(owned.length).toBeGreaterThan(0);
    expect(owned.filter((identifier) => shipped.includes(identifier))).toStrictEqual([]);
  });
});
