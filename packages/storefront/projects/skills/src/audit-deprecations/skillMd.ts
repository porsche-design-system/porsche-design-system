import { USAGE_KINDS } from '../knowledge/deprecations/types';
import { DEPRECATIONS_REFERENCE, skillName as knowledgeSkillName } from '../knowledge/skillMd';
import { getSkillName, getWrapperPackageName } from '../registry';
import { renderFrontmatter } from '../shared/frontmatter';
import { markdownTable } from '../shared/markdown';
import type { Framework } from '../shared/skillTree';
import { localPorscheDesignSystemVersion } from '../shared/version';
import { baselineEffort, DETECTIONS, VALUE_RESOLUTIONS } from './grading';
import { REPORT_SCHEMA_FILE, REPORT_SCHEMA_VERSION } from './reportSchema';
import { REPORT_TEMPLATE_FILE } from './reportTemplate';

/** Builds the complete audit procedure. Version-specific facts stay in the sibling knowledge skill. */

export const skillName = (framework: Framework): string => getSkillName('audit-deprecations', framework);

const FRAMEWORK_WRAPPERS = ['react', 'angular', 'vue'] as const;

const RUN_DIRECTORY = '.pds/audits/<runId>/';

/**
 * User-facing skill description. It names the framework because variants can be installed together
 * and must remain a single YAML-safe line.
 */
const DESCRIPTION = (framework: Framework): string =>
  `Audit an existing ${framework === 'js' ? 'Vanilla JS' : framework} project for deprecated Porsche Design System ` +
  '(PDS) API usage — components, props, prop values, events, slots, CSS variables, tokens and styling-package ' +
  'aliases. Produces a JSON report and a Markdown report rendered from it, every finding carrying quoted evidence, a ' +
  'concrete fix and a derived confidence. Read-only apart from its two report files.';

/** Audits read the project and write reports, so they require explicit invocation. */
const DISABLE_MODEL_INVOCATION = true;

/**
 * Declares the knowledge-skill dependency before execution. The exact package version matters
 * because the deprecation index is version-specific.
 */
const COMPATIBILITY = (framework: Framework): string =>
  `Requires the ${knowledgeSkillName(framework)} skill, which ships alongside this one in ` +
  `${getWrapperPackageName(framework)}@${localPorscheDesignSystemVersion}. The audited project must depend ` +
  'on that exact version.';

/**
 * Stops wrong-framework audits from producing false clean reports. The JS check excludes wrapper
 * packages because they also depend on `components-js`.
 */
const renderSelfCheck = (framework: Framework): string => {
  if (framework === 'js') {
    return [
      'Before anything else, confirm this is a Vanilla JS PDS project:',
      '',
      '1. `@porsche-design-system/components-js` is a project dependency.',
      `2. **None** of ${FRAMEWORK_WRAPPERS.map((wrapper) => `\`${getWrapperPackageName(wrapper)}\``).join(', ')} is a ` +
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
    `Before anything else, confirm \`${getWrapperPackageName(framework)}\` is a project dependency.`,
    '',
    'If it is not, stop and tell the user which PDS wrapper the project actually uses so they can run that ' +
      'audit skill instead. Do not write a report. An audit run against the wrong framework finds none of that ' +
      "framework's usage and reads as a passing audit, which is worse than no audit at all.",
  ].join('\n');
};

/**
 * Supports both colocated skills and installations where only the audit skill was linked.
 */
const indexSiblingPath = (framework: Framework): string =>
  `../${knowledgeSkillName(framework)}/${DEPRECATIONS_REFERENCE}`;

const indexPackagePath = (framework: Framework): string =>
  `node_modules/${getWrapperPackageName(framework)}/skills/${knowledgeSkillName(framework)}/${DEPRECATIONS_REFERENCE}`;

const renderIndex = (framework: Framework): string =>
  [
    `Read the deprecation index at \`${indexSiblingPath(framework)}\` — or, if only this skill was linked, ` +
      `\`${indexPackagePath(framework)}\`.`,
    '',
    'It is the **only** source of what is deprecated. It is generated from the installed package, enumerates every ' +
      'source category including those that currently have none, and is gated in CI against every deprecation ' +
      'source — so it is complete by construction, and anything absent from it is not deprecated.',
    '',
    'Its **Coverage** table gives the entry count per source category. Work through every one — components, SCSS, ' +
      'Emotion, vanilla-extract, Tailwind, tokens, icons and stylesheets. The styling categories are the ' +
      'easiest to skip, because they live in `.css` and style-definition files rather than component files.',
    '',
    'Do not use recalled knowledge, the public documentation site, or a changelog to decide that something is ' +
      'deprecated. If it is not in the index, it is not reported.',
    '',
    `Each index row also links a reference in \`${knowledgeSkillName(framework)}\` documenting its replacement. Open ` +
      'that reference whenever a row gives you less than a concrete fix needs — the component whose prop you are ' +
      'replacing, or the styling integration an alias belongs to. Read that skill from ' +
      `\`node_modules/${getWrapperPackageName(framework)}/skills/${knowledgeSkillName(framework)}/SKILL.md\` if it is not ` +
      'already loaded.',
    '',
    'If the index cannot be read, write a report with `summary.result: "failed"` and no findings, then stop. An audit ' +
      'that cannot read its own catalog finds nothing, which is indistinguishable from a clean project.',
  ].join('\n');

const FILE_SCOPE: Record<Framework, { globs: string; note: string }> = {
  js: {
    globs:
      '`**/*.html`, `**/*.js`, `**/*.mjs`, `**/*.cjs`, `**/*.ts`, `**/*.astro`, `**/*.svelte`, `**/*.vue`, ' +
      '`**/*.css`, `**/*.scss`, `**/*.sass`',
    note: 'Components are custom elements, so usage appears in HTML and in any JavaScript that builds markup — template strings, `innerHTML`, `createElement` and `setAttribute` calls all count.',
  },
  react: {
    globs:
      '`**/*.tsx`, `**/*.jsx`, `**/*.ts`, `**/*.js`, `**/*.mjs`, `**/*.cjs`, `**/*.mdx`, `**/*.astro`, ' +
      '`**/*.html`, `**/*.css`, `**/*.scss`, `**/*.sass`',
    note: 'Imports may be aliased (`import { PText as Text }`), so the anchor is the local binding, not the exported name. Both the package root and the `/ssr` entry point count.',
  },
  angular: {
    globs:
      '`**/*.ts`, `**/*.html`, `**/*.css`, `**/*.scss`, `**/*.sass`, `**/*.less`, `**/angular.json`, ' +
      '`**/project.json`, `**/workspace.json`',
    note:
      '**Templates live in two places** — inline backtick `template:` strings inside `.ts` files and external ' +
      '`templateUrl` `.html` files. Scanning only one silently halves coverage with no error, so scan both. ' +
      'Angular workspace configuration can inject global SCSS and other PDS setup, so audit `angular.json` and ' +
      'workspace/project JSON build configuration too.',
  },
  vue: {
    globs:
      '`**/*.vue`, `**/*.ts`, `**/*.js`, `**/*.mjs`, `**/*.cjs`, `**/*.tsx`, `**/*.jsx`, `**/*.astro`, ' +
      '`**/*.html`, `**/*.css`, `**/*.scss`, `**/*.sass`',
    note: 'A single import can be written two ways in a template — `<PText>` and `<p-text>` are both valid — so check both spellings for every component.',
  },
};

const renderScope = (framework: Framework): string => {
  const { globs, note } = FILE_SCOPE[framework];
  return [
    'Determine the project root from the Git or workspace root, falling back to the current directory. Never read ' +
      'outside the root, and never follow a symlink that leaves it.',
    '',
    '**Discover the packages before auditing any of them.** Enumerate every `package.json` under the root, skipping ' +
      `ignored paths, and audit each one that declares \`${getWrapperPackageName(framework)}\` in \`dependencies\`, ` +
      '`devDependencies` or `peerDependencies`. Do not take a monorepo\u2019s `workspaces` globs as the list: a ' +
      'directory that declares the dependency without being a workspace member is in scope all the same, and a ' +
      'workspace member that does not declare it is not.',
    '',
    'Record every discovered package in `scope.includedPaths` — `.` when the project is a single package — and every ' +
      'path you deliberately leave out in `scope.excludedPaths`, each with its reason. That includes a discovered ' +
      'package you decided not to audit. This list is what \u00a79 checks `completed` against, because a package ' +
      'never discovered was never an eligible file either, so no file-level check can catch it.',
    '',
    'Resolve any user-supplied include and exclude paths against the root and apply them on top of that list, ' +
      'recording them the same way.',
    '',
    `Audit production source and PDS configuration. These always count: ${globs}.`,
    '',
    note,
    '',
    '**The list is a floor, not a definition.** No extension list survives contact with a real project — a component ' +
      'can live in a template language nobody thought of, and a file type absent from the list above is invisible ' +
      'rather than clean. So after the list, find the rest by content: search every non-ignored text file in each ' +
      'discovered package for a PDS root — an import of the wrapper package or one of its styling entry points, a ' +
      '`p-`-prefixed custom element, a `--p-` custom property, or a PDS SCSS `@use`. A file that holds one is in ' +
      'scope whatever it is called.',
    '',
    'Then audit each of those files, **or** record it in `scope.excludedPaths` with a reason — a changelog, a ' +
      'documentation snippet and a test fixture can all quote PDS markup without being production source, and ' +
      'excluding them is a decision a reader can review. What must not happen is the third option: a file that ' +
      'references PDS appearing in neither place, which is the same silent gap as a package that was never ' +
      'discovered.',
    '',
    'The list covers where components, styles and PDS configuration are normally written, and deliberately stops ' +
      'there: prose and data formats — `.md`, `.json`, `.yaml` — quote markup often enough that auditing them by ' +
      'default would trade real findings for plausible ones. The search below still reaches them, and excluding one ' +
      'with a reason is a decision a reader can see.',
    '',
    'Content decides scope; the extension list only makes the common case fast. Search by root marker rather than ' +
      'reading every file: a match is what makes a file eligible, so a repository of any size yields a handful of ' +
      'extra candidates rather than a full-text scan.',
    '',
    'Respect version-control ignore rules, and exclude dependencies, build output, tests, examples and generated ' +
      'files by default. A default exclusion goes in `scope.excludedPaths` with its reason and **nowhere else** — it ' +
      'is a choice the audit made, not something that stopped it, so repeating it in `coverage.limitations` reports ' +
      'a working decision as a coverage failure.',
    '',
    'Every eligible file in a discovered package must end up either audited or recorded in `coverage.skippedFiles` — ' +
      'any skipped eligible file makes the run `partial`.',
  ].join('\n');
};

/** Framework-specific roots from which component usage can be traced. */
const COMPONENT_ROOT: Record<Framework, string> = {
  js: 'Components are custom elements, so a `p-` tag is itself the root — there is no import to follow.',
  angular: 'Components are custom elements in templates, so a `p-` tag is itself the root.',
  react:
    'An import from `@porsche-design-system/components-react` or its `/ssr` entry point. Resolve `as` aliases — the ' +
    'local binding is what appears in JSX.',
  vue: 'An import from `@porsche-design-system/components-vue`. Templates write it as either `<PText>` or `<p-text>`.',
};

const PROP_FORWARDING: Record<Framework, string> = {
  react: '`{...props}` or an explicit JSX pass-through',
  vue: '`v-bind="$attrs"` or explicit prop bindings',
  angular: 'a declared input rebound in the template',
  js: 'an explicit property or attribute pass-through to the custom element',
};

const FALLBACK_CASES: Record<Framework, string> = {
  react: 'dynamic `createElement`, markup built in template strings, re-exports you cannot resolve',
  vue: 'dynamic `createElement`, markup built in template strings, re-exports you cannot resolve',
  angular:
    "a tag name assembled at runtime (`'p-' + kind`), an attribute name held in a variable, re-exports you cannot resolve",
  js: "a tag name assembled at runtime (`'p-' + kind`), an attribute name held in a variable, re-exports you cannot resolve",
};

/**
 * Starting from PDS roots avoids matching similarly named non-PDS APIs and naturally follows wrapper
 * chains without an arbitrary hop limit.
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
      'project that imports the theme. A project redefinition disqualifies an alias only where that `@theme` block ' +
      'is in effect; the imported alias still counts elsewhere.',
    '- An import of the Emotion or vanilla-extract entry point, resolving aliases.',
    '',
    '**Traverse outward.** From each root, follow usage through the project\u2019s own code: a component that renders ' +
      'a PDS component is a wrapper, one that renders a wrapper is also a wrapper, and so on. No hop limit — guard ' +
      'against cycles and stop when nothing new is reached. Wrapping PDS two or three layers deep is normal, and a ' +
      'limit would drop most real usage.',
    '',
    `Follow the **prop**, not just the component. A wrapper anchors a prop only if it forwards it — ${PROP_FORWARDING[framework]}. ` +
      'Wrapper layers often rename or reinterpret an API, so a wrapper that accepts `size` ' +
      'without forwarding it is not PDS usage, and reporting it would be a false positive.',
    '',
    `**When the graph runs out**, fall back to searching index identifiers and anchoring each match — ${FALLBACK_CASES[framework]}. ` +
      'Anything still unanchored is ' +
      'a manual follow-up. Record the gap in `coverage.limitations`; a fallback you do not disclose looks like a ' +
      'clean project.',
    '',
    'Never guess. A team that hits two bogus findings stops reading the report, which costs more than the findings ' +
      'were worth.',
  ].join('\n');

/**
 * Responsive values need framework-specific examples because bound syntax differs, while quoted
 * pseudo-JSON is easy to misclassify as a plain string.
 */
const RESPONSIVE_SPELLINGS: Record<Framework, [spelling: string, gloss: string][]> = {
  react: [
    ["size=\"{'base': 'small', 'l': 'medium'}\"", 'string attribute holding single-quoted pseudo-JSON'],
    ["size={{ base: 'small', l: 'medium' }}", 'JSX expression'],
  ],
  vue: [
    ["size=\"{'base': 'small', 'l': 'medium'}\"", 'string attribute holding single-quoted pseudo-JSON'],
    [":size=\"{ base: 'small', l: 'medium' }\"", 'bound attribute, also spelled `v-bind:size`'],
  ],
  angular: [
    ["size=\"{'base': 'small', 'l': 'medium'}\"", 'string attribute holding single-quoted pseudo-JSON'],
    ["[size]=\"{ base: 'small', l: 'medium' }\"", 'property binding'],
  ],
  js: [
    ["size=\"{'base': 'small', 'l': 'medium'}\"", 'string attribute holding single-quoted pseudo-JSON'],
    ["el.size = { base: 'small', l: 'medium' }", 'property assigned on the element'],
  ],
};

const renderResponsiveSpellings = (framework: Framework): string[] => {
  const rows = RESPONSIVE_SPELLINGS[framework];
  const width = Math.max(...rows.map(([spelling]) => spelling.length)) + 3;
  return ['```text', ...rows.map(([spelling, gloss]) => `${spelling.padEnd(width)}${gloss}`), '```'];
};

const renderCandidates = (framework: Framework): string =>
  [
    'Each index entry names one deprecated API. Its rule ID carries the usage kind and full context; use the index\u2019s ' +
      'framework-specific locating guide to check every anchored usage. A usage the traversal never reaches is not a ' +
      'finding; it is whatever the fallback makes of it.',
    '',
    'Most kinds need nothing further: a deprecated component, prop, event, slot, CSS variable or style alias is ' +
      'statically present in the source whatever data flows through it — `<PAccordion heading={anything}>` already ' +
      'proves the deprecated prop is used.',
    '',
    'For these non-value kinds, the deprecated API is written at exactly one line. A wrapper call site does not add ' +
      'another location, and `wrapper-forwarded` or `wrapper-transformed` applies only to deprecated value locations; ' +
      'the wrapper chain belongs in the location\u2019s `anchor`.',
    '',
    'A deprecated **value** is the exception. It is a plain string that can come from anywhere, so it has to be ' +
      'resolved before it can be reported, and how it resolved is recorded as the location\u2019s `valueResolution`:',
    '',
    markdownTable(
      ['`valueResolution`', 'Where the value comes from'],
      [
        ...Object.entries(VALUE_RESOLUTIONS).map(([id, { description }]) => [`\`${id}\``, description]),
        ['—', 'A prop, state or spread that **no** call site resolves — a manual follow-up, never a finding.'],
      ]
    ),
    '',
    'Resolve constants **one hop** — the declaration a value refers to — and no further.',
    '',
    '**A value arriving through one of the project\u2019s own wrappers is a finding, not a follow-up.** \u00a74 ' +
      'already anchored the prop by checking that every hop forwards it; keep following it in the same direction, to ' +
      'the call sites that supply it. Each call site that resolves — a literal, or a constant one hop away — is an ' +
      'evidence location on the finding, and the route it travelled is what its `detection` records. Reaching a ' +
      'value through a wrapper is what `wrapper-forwarded` and `wrapper-transformed` are *for*; sending those cases ' +
      'to follow-ups instead leaves half of \u00a76\u2019s table unreachable and reports resolved usage as ' +
      'unresolvable. A value is a follow-up only when **no** call site resolves it: genuinely dynamic input, state, ' +
      'or a spread whose contents you cannot see.',
    '',
    'A value that resolves **inside** a wrapper — a lookup table, a default, a mapped constant — is a finding on the ' +
      'same terms, whether or not any call site selects it. It is written in the source and breaks at the next major ' +
      'release regardless of which branch runs today, so do not weigh up reachability: resolved is the test, reached ' +
      'is not.',
    '',
    'Such a location is `direct`, not a wrapper detection. The line is the PDS usage itself and the route from this ' +
      'file\u2019s own PDS root to it never leaves the file — a component being a wrapper says nothing about how its ' +
      'own body was reached, and neither does the value having been picked by one of that wrapper\u2019s own props. ' +
      '`wrapper-forwarded` and `wrapper-transformed` describe the other end: a location that **is** a call site of the ' +
      'wrapper. Grading a wrapper\u2019s own body as wrapper-reached lowers confidence on findings nothing was ' +
      'inferred about, and \u00a76 derives confidence precisely so that it cannot be a judgement call.',
    '',
    'The two are not alternatives. **One finding carries both** \u2014 the resolution inside the wrapper and every ' +
      'call site that supplies one \u2014 for the reason just given: the wrapper\u2019s own default or lookup entry ' +
      'breaks at the next major release whether or not a caller selects it. Report only the call sites and every ' +
      'branch no caller selects disappears with them, which costs whole rules rather than locations \u2014 a default ' +
      'nothing overrides is exactly the one no call site points at. Report only the wrapper and the report cannot ' +
      'show a reader which callers the fix has to reach.',
    '',
    'That first half is *where the value is written*, not where the PDS element happens to sit. A wrapper earns a ' +
      'location when the value resolves in its own file \u2014 a literal on the element or a default. ' +
      'Where the wrapper only forwards a prop, nothing resolves on that line: the call site is the location and the ' +
      'wrapper is the route, which `detection` already records. Listing both counts one flow twice, and inflates the ' +
      'occurrence count \u00a78 sorts by. A `valueResolution` of `literal` on a line holding no literal is the ' +
      'symptom.',
    '',
    'A call site counts whether it **names** the deprecated value or only **selects** one. Passing the deprecated ' +
      'spelling through a renamed prop names it; passing a variant name that the wrapper maps onto the deprecated ' +
      'value \u2014 through a lookup, a condition or a default \u2014 selects it. Both are locations, because the ' +
      'test is whether the line has to change for the deprecation to go away, and a selector does have to: the ' +
      'entry it reaches is the one being removed. Its `valueResolution` describes the literal **at that line** ' +
      '\u2014 the variant name is written in place, so `literal` \u2014 not the deprecated spelling it resolves ' +
      'to, which the in-wrapper location carries. Leave selector call sites out and the report names the wrapper ' +
      'but none of the callers a migration has to visit.',
    '',
    '**Responsive objects are the easiest thing to miss and the most costly.** Resolve every value inside the object ' +
      'rather than comparing the whole prop value with the deprecated identifier — in both spellings:',
    '',
    ...renderResponsiveSpellings(framework),
    '',
    'Missing this does not fail loudly — it silently drops every responsive usage in the project. The first spelling ' +
      'is the one that gets missed: the whole value is one quoted string, so it reads as a plain value rather than an ' +
      'object, and the deprecated identifier is inside it.',
    '',
    'Dynamic usage recorded as a manual follow-up is the correct outcome, not a gap. It does **not** make the run ' +
      '`partial`, and it does **not** belong in `coverage.limitations` — it was detected and disclosed. Recording it ' +
      'in both places reports a working check as a coverage failure.',
    '',
    'A follow-up carries a `subject` naming what could not be resolved (`p-text size`). Give it a `ruleId` only when ' +
      'it maps to exactly one index entry; when the value could be any of several, omit the id rather than inventing ' +
      'one — an id that is not in the index cannot be looked up.',
    '',
    'A rule that appears in `findings` must not also appear in `manualFollowUps`. Unresolvable usage of an ' +
      'already-reported rule belongs with that finding\u2019s evidence when it can be quoted as a usage, or in ' +
      '`coverage.limitations` when it cannot be resolved well enough to be evidence.',
  ].join('\n');

/**
 * A string-built tag is `fallback-search` for import-based frameworks, but `direct` where the tag
 * itself is the PDS root.
 */
const STRING_TAG_FROM_IMPORTED_ROOT =
  'All four describe the route, so a file can carry a PDS root and still hold a `fallback-search` location. A tag ' +
  "built as a string — passed to `createElement('p-text', …)`, or written into markup in a template literal — is " +
  'not reached from the import that anchors the file, only by searching for it. It is `fallback-search`, and the ' +
  'import goes in its `anchor`.';

const STRING_TAG_FROM_TAG_ROOT =
  'All four describe the route. A `p-` tag is itself a root wherever it is written, including one assembled as a ' +
  "string, so `createElement('p-text', …)` and markup built in a template literal are `direct` — the traversal " +
  'starts there rather than arriving there.';

const STRING_TAG_DETECTION: Record<Framework, string> = {
  react: STRING_TAG_FROM_IMPORTED_ROOT,
  vue: STRING_TAG_FROM_IMPORTED_ROOT,
  js: STRING_TAG_FROM_TAG_ROOT,
  angular: STRING_TAG_FROM_TAG_ROOT,
};

/**
 * Confidence and effort are derived lookups so readers can verify them against reported evidence.
 */
const renderFindings = (framework: Framework): string =>
  [
    'A finding is one deprecated API, carrying **every** place the project uses it. Split into two findings only when ' +
      'the fix genuinely differs — the same deprecated prop fixed the same way twice is one finding, not two.',
    '',
    'Every finding carries:',
    '',
    '- `ruleId` — the index row\u2019s **Rule ID**, copied verbatim, and `usageKind` set to that id\u2019s first ' +
      'segment. Do not reconstruct either from the identifier or infer a kind from what the API looks like. Rule ids are what make findings ' +
      'comparable across runs and releases, and an invented one breaks that silently while looking correct.',
    '- `evidence` — every location where the project **uses** the API, each with a project-relative path, a line ' +
      'number and the source line **quoted verbatim**. The quote is not decoration: it is what lets a reader, or a ' +
      'later fix, confirm the finding against the file instead of trusting it.',
    '- `anchor` on a location — the line that proves that usage is PDS, with its own path, line and quoted source. ' +
      'The import, the resolved SCSS `@use` **including one injected by build config**, the Tailwind `@theme` ' +
      'import, or the PDS root at the far end of a wrapper chain. Record it whenever it is not the evidence line ' +
      'itself; it is frequently in another file, and it is the only truthful place to put `vite.config.ts` for a ' +
      'stylesheet that names PDS nowhere. Omit it only where the usage anchors itself, as a `--p-` custom property ' +
      'does.',
    '- `remediation` — a `replacement` with the exact `from` and `to` spelling whenever the index documents an ' +
      'unambiguous one, plus an `instruction` in words. Where the index documents no replacement, say so plainly in ' +
      'the instruction rather than inventing one.',
    `- \`sources\` — the knowledge-skill reference the fact came from, as a path relative to that skill\u2019s root, ` +
      `at version \`${localPorscheDesignSystemVersion}\`.`,
    '- the index entry\u2019s message as `deprecationMessage`, verbatim, when it has one. Some say an API has no ' +
      'effect anymore; that wording matters to whoever reads the finding, so do not paraphrase it.',
    '',
    'An evidence `line` is the **usage** — the attribute, tag, custom property or alias reference itself. Never the ' +
      '`import`, `@use` or `@theme` that anchored it, never the wrapper call it arrived through, and never the ' +
      'declaration line of a constant it resolved from \u2014 including a key inside an object that is applied to the ' +
      'element as a whole, which is such a declaration and not a usage. For such an object, the evidence line is the ' +
      'element it is applied to. Where a component is reached through a local binding, the evidence line is the ' +
      'reference to the PDS binding, not the render of the local alias. Those lines are real and they matter, which is exactly why ' +
      'the anchor has a field of its own: counted as locations instead, they inflate a finding by however many ' +
      'anchors it happens to have, and occurrence count is a sort key in \u00a78 — so two runs of an unchanged ' +
      'project stop being comparable.',
    '',
    'Findings carry no severity. Every deprecation in this version is the same impact — it works today and breaks at ' +
      'the next major release — so a per-finding severity would be one value repeated on every row.',
    '',
    '**Confidence is derived, not judged.** Record on each evidence location *how you reached it* — the route, not ' +
      'where the API sits:',
    '',
    markdownTable(
      ['`detection`', 'How the location was reached', 'Confidence'],
      Object.entries(DETECTIONS).map(([id, { confidence, description }]) => [
        `\`${id}\``,
        description,
        `\`${confidence}\``,
      ])
    ),
    '',
    STRING_TAG_DETECTION[framework],
    '',
    'For a deprecated value, its `valueResolution` grades the same way — `literal` and `same-file-constant` are ' +
      '`high`, `imported-constant` is `medium`. A location\u2019s confidence is the lower of its two grades, and the ' +
      'finding\u2019s `confidence` is the lowest across its locations.',
    '',
    'Distance never lowers confidence on its own — passing through a wrapper you followed hop by hop is `high`. ' +
      '**A `medium` finding is a finding**, not a downgrade to a follow-up. Only a candidate you cannot place in the ' +
      'table at all — an unresolvable value, an unanchored match — is a manual follow-up.',
    '',
    '**Baseline effort is derived too**, from the usage kind and whether the index documents a replacement. Swapping ' +
      'in a documented successor is routine; removing an API with nothing to swap in means designing what replaces ' +
      'it, which is a different job:',
    '',
    markdownTable(
      ['Usage kind', 'Replacement documented', 'No replacement documented'],
      USAGE_KINDS.map((kind) => [
        `\`${kind}\``,
        `\`${baselineEffort(kind, true)}\``,
        `\`${baselineEffort(kind, false)}\``,
      ])
    ),
    '',
    '"Documented" means the index row\u2019s **Replacement** column names one, and nothing else counts. Do not derive ' +
      'one from the deprecated identifier, the note or the linked reference. Where the column names a replacement, copy it into ' +
      '`remediation.replacement`; where it does not, the row is one level dearer and the instruction says so.',
    '',
    'The baseline is what the deprecation costs; this project may cost more or less. A prop threaded through a shared ' +
      'wrapper is harder, a value funnelled through one shared constant is a single edit fixing fifty usages. When ' +
      'that is the case, record `observedEffort` and an `effortRationale` **pointing at evidence already listed on ' +
      'the finding**. A rationale citing nothing in the report is unreviewable, which is the one thing the baseline ' +
      'existed to prevent.',
  ].join('\n');

/**
 * Schema validation covers shape; this pass verifies claims against the index and source files.
 */
const renderVerification = (): string =>
  [
    'Before writing anything, check every finding against the sources it claims. For each one:',
    '',
    '1. `ruleId` appears **verbatim** in the deprecation index.',
    '2. Every evidence `path` exists, and each `snippet` is really the content of the `line` it names — including on ' +
      'an `anchor`, which quotes a second file as often as not.',
    '3. Every evidence `line` is a usage rather than the import, `@use`, `@theme` or declaration that anchored or ' +
      'resolved it.',
    '4. `remediation.replacement`, where present, matches what the index and its linked reference actually document.',
    '',
    'Anything that fails is not a finding. Drop it, or record it as a manual follow-up with the reason — a finding ' +
      'that cannot survive its own check is exactly the kind a fix would apply wrongly.',
  ].join('\n');

const renderOutput = (framework: Framework): string =>
  [
    'Write exactly two files and nothing else:',
    '',
    '```text',
    RUN_DIRECTORY,
    `├── ${skillName(framework)}.json`,
    `└── ${skillName(framework)}.md`,
    '```',
    '',
    'The `runId` is a filesystem-safe UTC timestamp, e.g. `2026-07-23T09-21-27Z`. The run directory is shared: a ' +
      'future audit skill writes its own report beside this one, so never clear it — write only your two files. ' +
      `Resolve \`${RUN_DIRECTORY}\` against \`project.root\`, not the current working directory or repository root.`,
    '',
    `The JSON must validate against [\`${REPORT_SCHEMA_FILE}\`](${REPORT_SCHEMA_FILE}) ` +
      `(schema version \`${REPORT_SCHEMA_VERSION}\`). Build and check it **before** rendering the Markdown, and ` +
      'render the Markdown from that same validated data so the two can never disagree.',
    '',
    'Order `findings` cheapest first: effective effort ascending (`observedEffort` when present, else ' +
      '`baselineEffort`), then confidence (`high` first), then occurrence count descending, then `ruleId`. That order ' +
      'is the action plan — there is no separate one. The final tiebreak is what makes two runs of an unchanged ' +
      'project produce the same report, so it can be diffed across releases.',
    '',
    'The Markdown is a rendering of that same validated data, written to the structure in ' +
      `[\`${REPORT_TEMPLATE_FILE}\`](${REPORT_TEMPLATE_FILE}). Open it and follow it — the sections, their order, ` +
      'the per-finding shape and the sentence an empty section carries are all fixed there, so every run produces ' +
      'the same document and a reader, or an agent later asked to apply the report, knows where to look. Compute ' +
      'every number in it — how many findings, how many locations, how many follow-ups — from the arrays you just ' +
      'validated. Never write a count from memory: a number that disagrees with the list under it discredits the ' +
      'whole report.',
    '',
    'Nothing goes in the Markdown that is not in the JSON. Anything else worth saying belongs in your reply to the ' +
      'user.',
    '',
    "The template's closing **How to act on this report** section stays in the report, so the file still explains " +
      'itself when it is shared or read weeks later: it names the version the report is only valid for, sends an ' +
      'agent applying the findings back to the deprecation index for the rule and to the knowledge-skill reference ' +
      "the finding names for the replacement's current API, states that manual follow-ups are for a human and must " +
      'not be fixed automatically, and that re-running this audit is how the work is verified.',
    '',
    'Run directories accumulate and this skill must not delete them. Check whether `.pds/` is already ignored ' +
      '(`git check-ignore -q .pds`, read-only) and mention it **only** when it is not — in your reply, never in ' +
      'the report — and mention it as a choice: reports can be tracked to diff findings across releases, or ' +
      'ignored as scratch. Never edit an ignore file yourself.',
  ].join('\n');

const renderResultStates = (): string =>
  [
    '`summary.result` describes execution only, never project quality — the findings do that:',
    '',
    markdownTable(
      ['Result', 'When'],
      [
        [
          '`completed`',
          'Every discovered PDS-dependent package was audited, every eligible file in it checked, against every ' +
            'category of the index.',
        ],
        [
          '`partial`',
          'A discovered package went unaudited, or some eligible file, requested path or index category could not ' +
            'be checked. Disclose every gap in `coverage`.',
        ],
        ['`failed`', 'No meaningful audit was possible — no deprecation index, or no eligible files.'],
      ]
    ),
    '',
    'Before writing `completed`, check the claim against `scope.includedPaths` rather than against the walk you ' +
      'happened to run: every package \u00a73 discovered is in that list, every one of them was audited, and every index ' +
      'category was worked through. Re-enumerate eligible files in each included package and confirm every file was ' +
      'visited or appears in `coverage.skippedFiles`; any file in neither place makes the run `partial`. A package you never discovered holds no eligible files ' +
      'either, so file-level eligibility cannot catch it and the package list is the only thing that can. If you ' +
      'cannot say all of that, the answer is `partial`, which is an honest and useful result. `completed` on an ' +
      'audit that skipped things is the one outcome that actively misleads — a short report reads as a clean ' +
      'codebase, and nobody looks again.',
    '',
    '`coverage.limitations` carries only what the audit **could not** do. Anything it chose to leave out is a ' +
      'decision and belongs in `scope.excludedPaths` with its reason — recording a choice in both places reports it ' +
      'as a failure, and recording it in neither hides the one exclusion a reader most needs to see.',
    '',
    'Keep the report to what a reader can check: findings with paths and lines they can open, and gaps stated in ' +
      'words. Do not pad `coverage` with self-assessment — nobody can verify it, so it reads as assurance while ' +
      'proving nothing.',
    '',
    'An audit with nothing to report says so explicitly. Do not pad it with observations to look thorough.',
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
    `- write anything outside \`${RUN_DIRECTORY}\`, or remove anything already in it`,
    '- read or traverse outside the project root',
    '',
    'Read-only discovery and search commands are fine, including `git check-ignore`.',
    '',
    '**Fixing is not part of this skill.** Report the findings and stop; applying them is a separate, explicit act ' +
      'the user asks for afterwards. An audit that edits as it goes cannot be re-run to verify itself.',
    '',
    'Audit deprecated usage only. Anything else — general code quality, security, performance, accessibility, ' +
      'business logic — is out of scope; say so if asked, rather than improvising a check the index cannot ground.',
  ].join('\n');

export const buildAuditDeprecationsSkillMd = (framework: Framework): string =>
  [
    renderFrontmatter({
      name: skillName(framework),
      description: DESCRIPTION(framework),
      compatibility: COMPATIBILITY(framework),
      disableModelInvocation: DISABLE_MODEL_INVOCATION,
    }),
    '',
    `# Porsche Design System deprecation audit (\`${framework}\`)`,
    '',
    "A static, read-only audit of an existing project's use of deprecated Porsche Design System APIs, producing a " +
      'machine-readable JSON report and a Markdown report rendered from it.',
    '',
    'Every deprecated API in this version still works today and is scheduled to break at the next major release. ' +
      'That is the impact of every finding in this report, stated once here so no finding has to repeat it.',
    '',
    `This skill runs only when a user invokes it, and it depends on \`${knowledgeSkillName(framework)}\` — it holds ` +
      'no Porsche Design System facts of its own.',
    '',
    '## 1. Check the framework first',
    '',
    renderSelfCheck(framework),
    '',
    '## 2. Load the deprecation index',
    '',
    renderIndex(framework),
    '',
    '## 3. Establish scope',
    '',
    renderScope(framework),
    '',
    '## 4. Work outward from PDS',
    '',
    renderAnchoring(framework),
    '',
    '## 5. Decide what counts',
    '',
    renderCandidates(framework),
    '',
    '## 6. Record and grade each finding',
    '',
    renderFindings(framework),
    '',
    '## 7. Verify before writing',
    '',
    renderVerification(),
    '',
    '## 8. Write the reports',
    '',
    renderOutput(framework),
    '',
    '## 9. Report execution state honestly',
    '',
    renderResultStates(),
    '',
    '## Constraints',
    '',
    renderConstraints(),
    '',
  ].join('\n');
