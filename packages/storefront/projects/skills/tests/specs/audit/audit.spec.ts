import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AUDIT_DOMAIN_IDS, AUDIT_DOMAINS, domainReference } from '@skills/audit/domains';
import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import { BASELINE_EFFORT, ENTRY_KINDS } from '@skills/knowledge/deprecations/types';
import { DEPRECATIONS_REFERENCE } from '@skills/knowledge/skillMd';
import { getSkillName } from '@skills/registry';
import { FRAMEWORKS, stagedSkillDir } from '@skills/shared/skillTree';
import { describe, expect, it } from 'vitest';

/**
 * Producer-side gates for the audit skill.
 *
 * The audit is a prompt, so no test here can assert what an agent does with it — that is measured by
 * the fixture recall evaluation, not gated in CI. What *is* provable is that the artifact ships
 * correctly: the schema is a real schema, every registered domain has a file the method points at,
 * the framework guard exists, and the general method stays free of any one domain's content.
 *
 * That last one is the point of the split. `SKILL.md` owns what is true of every audit; a domain file
 * owns what only that domain knows. Nothing enforces the boundary at build time, so it is gated here.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../../..');

const treeFile = (framework: (typeof FRAMEWORKS)[number], relativePath: string): string =>
  path.join(REPO_ROOT, stagedSkillDir('audit', framework), relativePath);

const read = (framework: (typeof FRAMEWORKS)[number], relativePath: string): string =>
  fs.readFileSync(treeFile(framework, relativePath), 'utf-8');

const schemaOf = (framework: (typeof FRAMEWORKS)[number]) =>
  JSON.parse(read(framework, 'references/report.schema.json'));

/** The deprecated-usage domain's reference, which owns everything deprecation-specific. */
const DEPRECATION_DOMAIN = 'references/deprecated-usage.md';

describe('audit skill', () => {
  it('registers at least one domain to gate against', () => {
    expect(AUDIT_DOMAINS.length).toBeGreaterThan(0);
  });

  for (const framework of FRAMEWORKS) {
    describe(`${framework} tree`, () => {
      it('ships SKILL.md, the report schema and every domain reference', () => {
        expect(fs.existsSync(treeFile(framework, 'SKILL.md'))).toBe(true);
        expect(fs.existsSync(treeFile(framework, 'references/report.schema.json'))).toBe(true);
        for (const domain of AUDIT_DOMAINS) {
          expect(fs.existsSync(treeFile(framework, domainReference(domain))), `missing ${domain.id} reference`).toBe(
            true
          );
        }
      });

      it('names itself pds-audit-<framework> in its frontmatter', () => {
        expect(read(framework, 'SKILL.md')).toContain(`name: ${getSkillName('audit', framework)}`);
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

      it('loads the knowledge skill unconditionally, before any domain runs', () => {
        const skillMd = read(framework, 'SKILL.md');
        expect(skillMd).toContain(getSkillName('knowledge', framework));
        expect(skillMd.indexOf('## 2. Load the knowledge skill')).toBeLessThan(
          skillMd.indexOf('## 5. Run the audit domains')
        );
      });

      it('links every registered domain from the method', () => {
        const skillMd = read(framework, 'SKILL.md');
        for (const domain of AUDIT_DOMAINS) {
          expect(skillMd, `SKILL.md does not link ${domain.id}`).toContain(`(${domainReference(domain)})`);
        }
      });

      it('keeps domain-specific content out of the general method', () => {
        // The whole point of the split. Anything only one domain knows — its source, its grading,
        // its detection quirks — belongs in that domain's file, or the method silently regrows a
        // single-domain shape that the next domain has to be threaded through.
        const skillMd = read(framework, 'SKILL.md');
        const body = skillMd.slice(skillMd.indexOf('\n---\n', 4));
        for (const forbidden of [DEPRECATIONS_REFERENCE, 'breakpoint object', 'entry kind', 'always `medium`']) {
          expect(body, `SKILL.md leaks domain detail: ${forbidden}`).not.toContain(forbidden);
        }
      });

      it.each(['manualFollowUps', 'actionPlan'])('requires %s in every report', (field) => {
        expect(schemaOf(framework).required).toContain(field);
      });

      it('offers exactly the registered domains in scope.auditDomains', () => {
        // Derived from the registry, so a domain cannot appear in the schema without a reference file
        // behind it, or ship a file the schema will not let a report declare.
        expect(schemaOf(framework).properties.scope.properties.auditDomains.items.enum).toStrictEqual([
          ...AUDIT_DOMAIN_IDS,
        ]);
      });

      it('pins severity to medium, so the schema cannot express a promoted deprecation', () => {
        expect(schemaOf(framework).properties.findings.items.properties.severity.const).toBe('medium');
      });

      it('requires an effort rationale whenever the baseline is overridden', () => {
        expect(schemaOf(framework).properties.findings.items.dependentRequired).toStrictEqual({
          observedEffort: ['effortRationale'],
        });
      });

      it('requires evidence and a source on every finding', () => {
        const finding = schemaOf(framework).properties.findings.items;
        expect(finding.required).toContain('evidence');
        expect(finding.required).toContain('sources');
        expect(finding.properties.evidence.minItems).toBe(1);
        expect(finding.properties.sources.minItems).toBe(1);
      });

      it('lets a follow-up omit a rule id rather than invent one', () => {
        // Found on the second fixture run: a follow-up spanning several index entries was given
        // `value/p-text/size`, which no entry has. A required id forces exactly that — an
        // unresolvable value maps to no single entry, so `subject` carries the description instead.
        const followUp = schemaOf(framework).properties.manualFollowUps.items;
        expect(followUp.required).toContain('subject');
        expect(followUp.required).not.toContain('ruleId');
      });

      it('keeps coverage to what a reader can check', () => {
        // A weaker model set `scanned: true` on all nine catalog categories while missing every Emotion
        // and Tailwind finding. Replacing the flag with counts would not have helped — a fabricated
        // number is as cheap as a fabricated boolean. Self-graded coverage is unfalsifiable whatever
        // its type, and worse than absent, because nine green rows read as assurance.
        //
        // The same run reported auditing 20 of 20 files while citing four, so the file counts went too.
        const coverage = schemaOf(framework).properties.coverage;
        expect(Object.keys(coverage.properties)).toStrictEqual(['skippedFiles', 'limitations']);
        // What survives is checkable: skipped paths a reader can open, and gaps stated in words.
        expect(coverage.properties.skippedFiles.items.required).toContain('path');
      });

      it('keeps inventory, which carries the same ground verifiably', () => {
        // Inventory is a claim about the *project*, so a reader can grep it — and it fails visibly:
        // the run above reported `stylingIntegrations: []` for a project importing both the Tailwind
        // theme and Emotion, which is exactly where its missing findings were. It exposes
        // under-scanning where a coverage count concealed it, so the prompt has to ask for it.
        expect(schemaOf(framework).required).toContain('inventory');
        expect(read(framework, 'SKILL.md')).toContain('`inventory`');
      });

      it('pins the base path for a finding source, so it resolves like a rule id', () => {
        const reference = schemaOf(framework).properties.findings.items.properties.sources.items.properties.reference;
        expect(reference.description).toContain('relative to that skill\u2019s root');
      });

      it('states positively that a medium-confidence candidate is a finding', () => {
        // The same run demoted a medium-confidence candidate to a follow-up. The rule was stated only
        // by negation ("anything weaker is a follow-up"), which needs an inference to read correctly.
        expect(read(framework, 'SKILL.md')).toContain('**Both become findings**');
      });
    });

    describe(`${framework} deprecated-usage domain`, () => {
      it('points at the deprecation index as its only source of what is deprecated', () => {
        expect(read(framework, DEPRECATION_DOMAIN)).toContain(DEPRECATIONS_REFERENCE);
      });

      it('names an index path that actually resolves from the audit tree', () => {
        // The index lives in a sibling skill, so this path leaves the audit tree and the in-tree link
        // gate cannot check it. Resolving it against staging is what proves the domain can find its
        // only source of truth — a domain pointed at a missing index writes a `failed` report.
        const sibling = `../${getSkillName('knowledge', framework)}/${DEPRECATIONS_REFERENCE}`;
        expect(read(framework, DEPRECATION_DOMAIN)).toContain(sibling);
        expect(fs.existsSync(path.resolve(treeFile(framework, '.'), sibling))).toBe(true);
      });

      it('states the baseline effort for every entry kind', () => {
        const reference = read(framework, DEPRECATION_DOMAIN);
        for (const kind of ENTRY_KINDS) {
          expect(reference, `no baseline effort stated for ${kind}`).toContain(
            `| \`${kind}\` | \`${BASELINE_EFFORT[kind]}\` |`
          );
        }
      });

      it('tells the agent to look inside breakpoint objects', () => {
        // The single easiest silent under-report: a whole-attribute comparison matches no responsive
        // usage at all, and nothing about the failure is visible in the report.
        const reference = read(framework, DEPRECATION_DOMAIN);
        expect(reference).toContain("size=\"{'base': 'small', 'l': 'medium'}\"");
        expect(reference).toContain("size={{'base': 'small', 'l': 'medium'}}");
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
    const shipped = read('react', 'SKILL.md') + read('react', DEPRECATION_DOMAIN);
    const owned = collectDeprecations()
      .flatMap((source) => source.entries)
      .filter((entry) => entry.identifier.startsWith('$pds-') || entry.kind === 'component')
      .map((entry) => entry.identifier);
    expect(owned.length).toBeGreaterThan(0);
    expect(owned.filter((identifier) => shipped.includes(identifier))).toStrictEqual([]);
  });
});
