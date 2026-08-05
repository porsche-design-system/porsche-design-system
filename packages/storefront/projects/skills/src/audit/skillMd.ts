import { skillName as knowledgeSkillName } from '../knowledge/skillMd';
import { getSkillName } from '../registry';
import { renderFrontmatter } from '../shared/frontmatter';
import { markdownTable } from '../shared/markdown';
import type { Framework } from '../shared/skillTree';
import { localPorscheDesignSystemVersion } from '../shared/version';
import { AUDIT_DOMAINS, domainReference } from './domains';
import { REPORT_SCHEMA_FILE, REPORT_SCHEMA_VERSION } from './reportSchema';

/**
 * Builds the audit skill's `SKILL.md` — the audit method, and only the method.
 *
 * Everything here is true of every audit domain: the framework guard, loading the knowledge skill,
 * establishing scope, anchoring a match to PDS, what a finding must contain, and what gets written.
 * What a domain checks, where its facts come from and how its findings are graded belong to that
 * domain's own reference file (see `domains/`), so a new domain is an added file rather than an edit
 * threaded through this one.
 *
 * It carries no Porsche Design System facts either. Those live in the knowledge skill, which ships
 * beside this one in the same package and therefore cannot describe a different version.
 */

/** Canonical name of the wrapper's audit skill — `pds-audit-<framework>`. */
export const skillName = (framework: Framework): string => getSkillName('audit', framework);

const wrapperPackage = (framework: Framework): string => `@porsche-design-system/components-${framework}`;

/** The wrapper packages whose presence means a project is *not* a plain Vanilla JS project. */
const FRAMEWORK_WRAPPERS = ['react', 'angular', 'vue'] as const;

/**
 * What the skill does, shown to a user choosing it. Not activation guidance: the skill is
 * manual-only (see {@link DISABLE_MODEL_INVOCATION}), so "use when…" and "do not activate for…"
 * clauses would address a reader that never sees this — the model. It names the framework because
 * four audit skills can be installed side by side and the user has to pick the right one.
 *
 * It does name the current domain, unlike the body: a user picking a skill needs to know what they
 * actually get today, and "audits your project" would oversell a one-domain audit.
 *
 * Rendered verbatim into the YAML frontmatter, so it must stay a single line.
 */
const DESCRIPTION = (framework: Framework): string =>
  `Audit an existing ${framework === 'js' ? 'Vanilla JS' : framework} project for Porsche Design System (PDS) ` +
  `issues and write an evidence-based report. Covers ${AUDIT_DOMAINS.length} audit ` +
  `${AUDIT_DOMAINS.length === 1 ? 'domain' : 'domains'} — ` +
  `${AUDIT_DOMAINS.map((domain) => domain.title.toLowerCase()).join(', ')}. Produces a JSON report and a Markdown ` +
  'report rendered from it, with evidence, remediation and a prioritized action plan. Read-only apart from its two ' +
  'report files.';

/**
 * Auditing is a deliberate act with a deliberate cost — it reads the whole project and writes report
 * files — so it runs when a user asks for it, never because a prompt looked adjacent to it.
 *
 * Manual-only also removes the risk that most concerned the design: an audit triggered as a side
 * effect of some other task would produce a report nobody asked for and nobody reads, and a
 * half-attended audit that reports nothing is indistinguishable from a clean codebase.
 *
 * The knowledge skill deliberately does **not** carry this flag — it exists to fire broadly on
 * frontend work, including work the user never thought to connect to PDS.
 */
const DISABLE_MODEL_INVOCATION = true;

/**
 * The specification's `compatibility` field, for a skill with real environment requirements.
 *
 * This audit has exactly one: it carries no Porsche Design System facts and cannot produce a single
 * finding without `pds-knowledge-<framework>`. Declaring that here puts it in the metadata layer
 * agents load at startup, so the dependency is discoverable before the body is — otherwise it exists
 * only in prose that nothing reads until the skill is already running.
 */
const COMPATIBILITY = (framework: Framework): string =>
  `Requires the ${knowledgeSkillName(framework)} skill, which ships alongside this one in ` +
  `${wrapperPackage(framework)}. The audited project must depend on that package.`;

/**
 * The framework guard. A wrong-framework audit is worse than wrong-framework guidance: it finds
 * nothing and reads as a clean report, so it has to stop rather than degrade.
 *
 * The `js` variant is inverted because `@porsche-design-system/components-js` is a dependency of
 * every wrapper — its presence proves nothing on its own, so the js audit additionally requires that
 * no wrapper is present.
 */
const renderSelfCheck = (framework: Framework): string => {
  if (framework === 'js') {
    return [
      'Before anything else, confirm this is a Vanilla JS PDS project:',
      '',
      '1. `@porsche-design-system/components-js` is a project dependency.',
      `2. **None** of ${FRAMEWORK_WRAPPERS.map((wrapper) => `\`${wrapperPackage(wrapper)}\``).join(', ')} is a ` +
        'project dependency.',
      '',
      'The second check is not redundant. `components-js` is a dependency of every wrapper, so its presence ' +
        'alone does not make a project Vanilla JS. If a wrapper is present, stop and tell the user to run that ' +
        "wrapper's audit skill instead — auditing Vanilla JS spellings against a React or Angular codebase " +
        'completes with zero findings and reads as a passing audit.',
      '',
      'If neither check holds, stop. Do not write a report.',
    ].join('\n');
  }
  return [
    `Before anything else, confirm \`${wrapperPackage(framework)}\` is a project dependency.`,
    '',
    'If it is not, stop and tell the user which PDS wrapper the project actually uses so they can run that ' +
      'audit skill instead. Do not write a report. An audit run against the wrong framework finds none of that ' +
      "framework's usage and reads as a passing audit, which is worse than no audit at all.",
  ].join('\n');
};

/** Where the knowledge skill is read from when it is not already loaded. */
const knowledgeLocation = (framework: Framework): string =>
  `node_modules/${wrapperPackage(framework)}/skills/${knowledgeSkillName(framework)}/SKILL.md`;

const renderKnowledge = (framework: Framework): string =>
  [
    `Load \`${knowledgeSkillName(framework)}\` directly — never through an unsuffixed router; this audit already ` +
      `knows its framework. If it is not loaded, read it from \`${knowledgeLocation(framework)}\`.`,
    '',
    'Read that file in full: it lists every reference the knowledge skill ships, which is how you know what is ' +
      'available. Read the references themselves on demand — when a domain names one, or when you need the detail to ' +
      'judge a case correctly.',
    '',
    'It ships in this same wrapper package, so it describes exactly the installed version. Never substitute recalled ' +
      'knowledge or the public documentation site for it.',
    '',
    'If it cannot be read, write a report with `summary.result: "failed"` and no findings, then stop — without it ' +
      'there is nothing to audit against, and an empty report would look like a clean project.',
  ].join('\n');

/** Files worth reading per framework, and the traps in each. */
const FILE_SCOPE: Record<Framework, { globs: string; note: string }> = {
  js: {
    globs: '`**/*.html`, `**/*.js`, `**/*.mjs`, `**/*.cjs`, `**/*.ts`, `**/*.css`, `**/*.scss`',
    note: 'Components are custom elements, so usage appears in HTML and in any JavaScript that builds markup — template strings, `innerHTML`, `createElement` and `setAttribute` calls all count.',
  },
  react: {
    globs: '`**/*.tsx`, `**/*.jsx`, `**/*.ts`, `**/*.js`, `**/*.css`, `**/*.scss`',
    note: 'Imports may be aliased (`import { PText as Text }`), so the anchor is the local binding, not the exported name. Both the package root and the `/ssr` entry point count.',
  },
  angular: {
    globs: '`**/*.ts`, `**/*.html`, `**/*.css`, `**/*.scss`, `**/angular.json`, `**/project.json`, `**/workspace.json`',
    note:
      '**Templates live in two places** — inline backtick `template:` strings inside `.ts` files and external ' +
      '`templateUrl` `.html` files. Scanning only one silently halves coverage with no error, so scan both. ' +
      'Angular workspace configuration can inject global SCSS and other PDS setup, so audit `angular.json` and ' +
      'workspace/project JSON build configuration too.',
  },
  vue: {
    globs: '`**/*.vue`, `**/*.ts`, `**/*.js`, `**/*.css`, `**/*.scss`',
    note: 'A single import can be written two ways in a template — `<PText>` and `<p-text>` are both valid — so check both spellings for every component.',
  },
};

const renderScope = (framework: Framework): string => {
  const { globs, note } = FILE_SCOPE[framework];
  return [
    'Determine the project root from the Git or workspace root, falling back to the current directory. Resolve any ' +
      'user-supplied include and exclude paths against it, and record them in the report. Never read outside the ' +
      'root, and never follow a symlink that leaves it.',
    '',
    `Audit production source and PDS configuration: ${globs}.`,
    '',
    note,
    '',
    'Respect version-control ignore rules, and exclude dependencies, build output, tests, examples and generated ' +
      'files by default. Every eligible file must end up either audited or recorded in `coverage.skippedFiles` — ' +
      'any skipped eligible file makes the run `partial`.',
  ].join('\n');
};

/**
 * How PDS enters a project, per framework. Components are the part that differs: two frameworks
 * import them and two get them as custom elements, which have no import to follow at all.
 */
const COMPONENT_ROOT: Record<Framework, string> = {
  js: 'Components are custom elements, so a `p-` tag is itself the root — there is no import to follow.',
  angular: 'Components are custom elements in templates, so a `p-` tag is itself the root.',
  react:
    'An import from `@porsche-design-system/components-react` or its `/ssr` entry point. Resolve `as` aliases — the ' +
    'local binding is what appears in JSX.',
  vue: 'An import from `@porsche-design-system/components-vue`. Templates write it as either `<PText>` or `<p-text>`.',
};

/**
 * Anchoring, restructured from search-and-filter to work-outward-from-PDS.
 *
 * The difference is structural, not stylistic. Searching the project for index spellings and then
 * proving each hit is PDS makes anchoring a step that can be performed badly; starting at PDS and
 * following usage outward makes a non-PDS match unrepresentable. `size="small"` on a project's own
 * component is never a candidate, because the traversal never reaches it.
 *
 * It also removes the hop limit this section used to carry. Following usage outward *is* the wrapper
 * graph, so depth stops being a constant to argue about.
 */
const renderAnchoring = (framework: Framework): string =>
  [
    'Work outward from PDS rather than searching the project and filtering. Anything reached this way is anchored by ' +
      'construction; anything found another way has to earn it.',
    '',
    '**Roots — where PDS enters the project.**',
    '',
    `- ${COMPONENT_ROOT[framework]}`,
    '- `--p-`-prefixed CSS custom properties. A reserved namespace, so they anchor themselves in any stylesheet — the ' +
      'global stylesheet is loaded once and never imported per file.',
    '- A resolved SCSS `@use` of the PDS entry point, **including one injected by build config** (Angular or Vite ' +
      '`additionalData`) rather than written in the file. A project can use PDS Sass without any file naming it.',
    '- An import of the PDS Tailwind theme. Its custom properties are unprefixed and generic, so they count only in a ' +
      'project that imports the theme, and not where the project redefines one itself.',
    '- An import of the Emotion or vanilla-extract entry point, resolving aliases.',
    '',
    '**Traverse outward.** From each root, follow usage through the project\u2019s own code: a component that renders ' +
      'a PDS component is a wrapper, one that renders a wrapper is also a wrapper, and so on. No hop limit — guard ' +
      'against cycles and stop when nothing new is reached. Wrapping PDS two or three layers deep is normal, and a ' +
      'limit would drop most real usage.',
    '',
    'Follow the **prop**, not just the component. A wrapper anchors a prop only if it forwards it — `{...props}` or an ' +
      'explicit pass-through. Wrapper layers often rename or reinterpret an API, so a wrapper that accepts `size` ' +
      'without forwarding it is not PDS usage, and reporting it would be a false positive.',
    '',
    'Confidence follows verification, not distance: `high` when forwarding is explicit at every hop, `medium` when a ' +
      'value is transformed or conditional along the way.',
    '',
    '**When the graph runs out**, fall back to searching the index spellings and anchoring each match — dynamic ' +
      '`createElement`, markup built in template strings, re-exports you cannot resolve. Fallback matches are ' +
      '`medium` at best, and anything still unanchored is a manual follow-up. Record the gap in ' +
      '`coverage.limitations`; a fallback you do not disclose looks like a clean project.',
    '',
    'Never guess. A team that hits two bogus findings stops reading the report, which costs more than the findings ' +
      'were worth.',
  ].join('\n');

/**
 * The domain table. Each row links a reference file that owns that domain entirely, so this section
 * stays a pointer rather than a summary — a summary is something an agent can answer from instead of
 * opening the file.
 */
const renderDomains = (): string =>
  [
    'Each domain below is a self-contained area with its own reference file. Open a domain\u2019s file and follow it; ' +
      'it names the source it reads, what counts as a finding, and how its findings are graded.',
    '',
    markdownTable(
      ['Domain', 'Checks', 'Reference'],
      AUDIT_DOMAINS.map((domain) => [
        `\`${domain.id}\``,
        domain.summary,
        `[${domain.id}.md](${domainReference(domain)})`,
      ])
    ),
    '',
    'Run every domain listed here, and record the ones you ran in `scope.auditDomains`. A domain you skipped is a ' +
      'coverage gap, not a silent omission — disclose it and make the run `partial`.',
  ].join('\n');

/** The finding contract every domain's findings have to satisfy. */
const renderFindings = (): string =>
  [
    'Whatever the domain, a finding must carry:',
    '',
    '- at least one project-relative evidence location, with a minimal source snippet where available',
    '- observed-versus-expected reasoning, and the impact',
    '- concrete remediation',
    `- the knowledge-skill reference it came from, as a path relative to that skill\u2019s root, at version ` +
      `\`${localPorscheDesignSystemVersion}\``,
    '- a `ruleId` stable across runs and releases, so reports stay comparable',
    '',
    '**Severity is impact only.** Confidence and effort never change it. Each domain states the severity its ' +
      'findings carry; do not promote or demote one because it looks urgent or trivial.',
    '',
    '**Confidence** is `high` when the evidence leaves no plausible alternative and `medium` when it holds but ' +
      'incomplete local context leaves one. **Both become findings** — `medium` is a finding, not a downgrade to a ' +
      'follow-up. Only a candidate weaker than `medium`, one you cannot substantiate at all, is a manual follow-up.',
    '',
    'Confidence measures whether the evidence was verified, never how far away it was. Passing through a wrapper, ' +
      'or originating in another file or component, does not by itself lower confidence — if you followed the ' +
      'forwarding and it is explicit at every hop, that is `high`.',
    '',
    '**Effort** starts from the baseline its domain defines. The baseline is a default, not a verdict: a codebase ' +
      'can make a fix cheaper or dearer than its kind suggests — a prop threaded through a shared wrapper is harder, ' +
      'a value funnelled through one shared constant is a single edit fixing fifty usages. Deviate **only** on ' +
      'concrete project evidence, and when you do, record `observedEffort` and an `effortRationale` naming that ' +
      'evidence. Never deviate on a hunch: the baseline is what makes a deviation reviewable.',
  ].join('\n');

const renderOutput = (framework: Framework): string =>
  [
    'Record in `inventory` what Porsche Design System the project actually uses: the components you found — ' +
      'including the project\u2019s own wrappers around them — the PDS packages it imports, and the styling ' +
      'integrations in play (Tailwind theme, SCSS, Emotion, vanilla-extract).',
    '',
    'This is a factual claim about the project, so a reader can grep and check it: an inventory thinner than the ' +
      'project, or richer than the findings that came out of it, is visible evidence that something was not looked ' +
      'at.',
    '',
    'Write exactly two files and nothing else:',
    '',
    '```text',
    '.pds/audits/<runId>/',
    `├── ${skillName(framework)}.json`,
    `└── ${skillName(framework)}.md`,
    '```',
    '',
    'The `runId` is a filesystem-safe UTC timestamp, e.g. `2026-07-23T09-21-27Z`.',
    '',
    `The JSON must validate against [\`${REPORT_SCHEMA_FILE}\`](${REPORT_SCHEMA_FILE}) ` +
      `(schema version \`${REPORT_SCHEMA_VERSION}\`). Build and check it **before** rendering the Markdown, and ` +
      'render the Markdown from that same validated data so the two can never disagree.',
    '',
    'Order the action plan by severity (highest), then confidence (highest), then effort (lowest), then ' +
      'occurrence count (highest) — biggest cheap wins first.',
    '',
    'Run directories accumulate and this skill must not delete them. Check whether `.pds/` is already ignored ' +
      '(`git check-ignore -q .pds`, read-only) and mention it **only** when it is not — and mention it as a ' +
      'choice: reports can be tracked to diff findings across releases, or ignored as scratch. Never edit an ' +
      'ignore file yourself.',
  ].join('\n');

const renderResultStates = (): string =>
  [
    '`summary.result` describes execution only, never project quality — findings and their counts do that:',
    '',
    markdownTable(
      ['Result', 'When'],
      [
        ['`completed`', 'Every eligible file was checked, in every domain and every catalog category.'],
        [
          '`partial`',
          'Some eligible file, requested path, domain or catalog category could not be checked. Disclose every gap.',
        ],
        ['`failed`', 'No meaningful audit was possible — no knowledge skill, or no eligible files.'],
      ]
    ),
    '',
    'Before writing `completed`, check the claim rather than assuming it: every catalog category worked through, ' +
      'every eligible file read. If you cannot say that, the answer is `partial`, which is an honest and useful ' +
      'result. `completed` on an audit that skipped things is the one outcome that actively misleads — a short ' +
      'report reads as a clean codebase, and nobody looks again.',
    '',
    'Keep the report to what a reader can check: findings with paths and line numbers they can open, and gaps ' +
      'stated in words. Do not pad `coverage` or the summary with self-assessment — nobody can verify it, so it ' +
      'reads as assurance while proving nothing.',
    '',
    'A completed audit with nothing to report uses a zero count and says so explicitly. Do not pad it with ' +
      'observations to look thorough.',
    '',
    'If the report files cannot be written, surface the write error directly. Do not pretend a failed report was ' +
      'persisted.',
  ].join('\n');

const renderConstraints = (): string =>
  [
    'This audit is read-only apart from its two report files. It must not:',
    '',
    '- install dependencies, build, test, or start the application',
    '- modify source, configuration, or ignore files',
    '- write anything outside `.pds/audits/<runId>/`',
    '- read or traverse outside the project root',
    '',
    'Read-only discovery and search commands are fine, including `git check-ignore`.',
    '',
    'Audit only the domains listed above. Anything outside them — general code quality, security, performance, ' +
      'accessibility, business logic — is out of scope; say so if asked, rather than improvising a check no domain ' +
      'reference supports.',
  ].join('\n');

/** Assemble the audit skill's SKILL.md. */
export const buildAuditSkillMd = (framework: Framework): string =>
  [
    renderFrontmatter({
      name: skillName(framework),
      description: DESCRIPTION(framework),
      compatibility: COMPATIBILITY(framework),
      disableModelInvocation: DISABLE_MODEL_INVOCATION,
    }),
    '',
    `# Porsche Design System audit (\`${framework}\`)`,
    '',
    "A static, read-only audit of an existing project's Porsche Design System usage, producing a machine-readable " +
      'JSON report and a Markdown report rendered from it.',
    '',
    `This skill runs only when a user invokes it, and it depends on \`${knowledgeSkillName(framework)}\` — it holds ` +
      'no Porsche Design System facts of its own.',
    '',
    'This file is the method: the checks that come before any audit, how a match is tied to PDS, what a finding must ' +
      'contain, and what gets written. **What** is audited lives in the domain references it points to, one file per ' +
      'domain.',
    '',
    '## 1. Check the framework first',
    '',
    renderSelfCheck(framework),
    '',
    '## 2. Load the knowledge skill',
    '',
    renderKnowledge(framework),
    '',
    '## 3. Establish scope',
    '',
    renderScope(framework),
    '',
    '## 4. Work outward from PDS',
    '',
    renderAnchoring(framework),
    '',
    '## 5. Run the audit domains',
    '',
    renderDomains(),
    '',
    '## 6. Record findings',
    '',
    renderFindings(),
    '',
    '## 7. Write the reports',
    '',
    renderOutput(framework),
    '',
    '## 8. Report execution state honestly',
    '',
    renderResultStates(),
    '',
    '## Constraints',
    '',
    renderConstraints(),
    '',
  ].join('\n');
