import type { ComponentRosterEntry } from './components/reference';
import { escapeCell, markdownTable } from './markdown';
import { rawScssReference, rawTailwindcssReference } from './rawStyleReferences';
import type { Framework } from './skillTree';

/**
 * Per-package skill identifier — mirrors the wrapper package name
 * (`@porsche-design-system/components-<framework>` → `porsche-design-system-components-<framework>`),
 * so a project depending on more than one wrapper gets a distinct skill per package instead of all
 * four fighting over one `.claude/skills/…` entry. The `pds-skill` bin derives the same name from
 * its own `package.json` at link time. Never varies by version.
 */
export const skillName = (framework: Framework): string => `porsche-design-system-components-${framework}`;

/**
 * Auto-activation description — the only matching surface Claude Code uses to decide
 * whether to load this skill. It names concrete UI triggers so it fires broadly on
 * frontend work even when PDS is not mentioned, and also on documents that assert PDS
 * behavior (requirements, specs, design docs, acceptance criteria) — a wrong API fact
 * written upstream in a doc propagates into every task that consumes it. The "do not
 * activate" clause keeps it dormant on backend/non-UI, tooling, *non-PDS* prose,
 * foreign-library, and opt-out prompts — but no longer on PDS-asserting docs. Keep it a
 * single line (rendered verbatim into YAML frontmatter) and free of `: ` sequences that
 * would break the frontmatter parse.
 */
export const ACTIVATION_DESCRIPTION =
  'Build, style, or review web user interfaces with the Porsche Design System (PDS), or author ' +
  'and review documents that specify PDS behavior. ' +
  'Use whenever a task touches frontend UI — adding or changing components (buttons, forms, inputs, ' +
  'cards, tables, modals, navigation, layouts), styling with Tailwind, SCSS, vanilla-extract or Emotion, ' +
  'applying design tokens, or scaffolding a new page or form. Also use whenever a requirement, spec, design ' +
  'doc, or acceptance criteria names a PDS component, prop, token, or theming. Prefer PDS for new UI even when it is ' +
  'not named by the user. Do not activate for backend or non-UI logic, unrelated tests or tooling, ' +
  'documentation or prose that does not assert PDS component, prop, token, or theming behavior, ' +
  'work that clearly targets a different UI library, or when the user opts out of PDS.';

/**
 * Raw `component-meta` link target. The authoritative data lives only in the js
 * package; the framework wrappers' local `../meta` is a re-export shim, so they
 * link the js peer's `/meta` subpath instead (see design "Data & state").
 */
export const rawMetaReference = (framework: Framework): string =>
  framework === 'js' ? '../meta' : '@porsche-design-system/components-js/meta';

/**
 * The initialization API each framework configures PDS through — the place a reader might wrongly
 * expect a `theme` option. React/Vue take the `PorscheDesignSystemProvider` component; js calls
 * `load()`; Angular calls `PorscheDesignSystemModule.load()`. Each accepts only `prefix` and `cdn`.
 */
const THEME_INIT_TARGET: Record<Framework, string> = {
  react: '`PorscheDesignSystemProvider` (it takes only `prefix` and `cdn`)',
  vue: '`PorscheDesignSystemProvider` (it takes only `prefix` and `cdn`)',
  js: 'the `load()` initializer (it takes only `prefix` and `cdn`)',
  angular: '`PorscheDesignSystemModule.load()` (it takes only `prefix` and `cdn`)',
};

/**
 * Framework-specific "how the framework's syntax maps to the custom-element tags the references use"
 * note, rendered inside the `## Components` section. React and Vue expose PascalCase component wrappers
 * with framework-native prop/event syntax, so the tag→component and event-name mapping is essential;
 * Angular and vanilla JS use the custom-element tags directly. This is skill-only anti-hallucination
 * content (it carries several audit correctness fixes) — the install/init/stylesheet setup that used to
 * accompany it has left SKILL.md and returns single-sourced from the storefront getting-started pages.
 */
const FRAMEWORK_SYNTAX: Record<Framework, string> = {
  react: [
    '**Framework syntax** (this differs from the custom-element tags the references show):',
    '- Import each component by name and use its **PascalCase** React component: `p-button` → `<PButton>`, `p-input-text` → `<PInputText>`.',
    '- Props are **camelCase** (`disableBackdropClick`, not `disable-backdrop-click`); use `className` for CSS classes and pass ARIA via the `aria={{ ... }}` prop.',
    '- Events are `on<Event>` handler props — the `dismiss` event is `onDismiss`, `update` is `onUpdate`.',
    '- Place a child into a named slot with the `slot="..."` attribute.',
  ].join('\n'),
  vue: [
    '**Framework syntax** (this differs from the custom-element tags the references show):',
    '- Import each component by name and use its **PascalCase** component: `p-button` → `<PButton>`, `p-input-text` → `<PInputText>`.',
    '- Bind props with `:` and **camelCase** names (`:open="open"`, `:disableBackdropClick="true"`); use `class` for CSS classes.',
    '- Listen to events with `@` — the `dismiss` event is `@dismiss`.',
    '- Two-way binding on form components is **`v-model:value`** (bound to the `value` prop / `update:value` event), e.g. `<PInputText v-model:value="text" />`. Bare `v-model` is a silent no-op — there is no `modelValue` prop.',
    '- Place a child into a named slot with the `slot="..."` attribute.',
  ].join('\n'),
  angular: [
    '**Framework syntax:**',
    '- Use the **custom-element tags** directly in templates: `<p-button>`, `<p-input-text>`.',
    '- Bind props with `[prop]` and camelCase names (`[open]="open"`, `[disableBackdropClick]="true"`).',
    '- Listen to events with `(event)` — the `dismiss` event is `(dismiss)="onDismiss()"`.',
    '- Place a child into a named slot with the `slot="..."` attribute.',
  ].join('\n'),
  js: [
    '**Framework syntax:**',
    '- Use the **custom-element tags** directly in HTML: `<p-button>`, `<p-input-text>`.',
    '- Set props as attributes (`variant="secondary"`) or as DOM properties for non-string values.',
    "- Listen to events with `element.addEventListener('dismiss', ...)`.",
    '- Place a child into a named slot with the `slot="..."` attribute.',
  ].join('\n'),
};

export type SkillReferenceRow = {
  title: string;
  description: string;
  intro?: string;
  resolvedPath: string;
};

export type PackageSkillSections = {
  stylesheets: SkillReferenceRow;
  styling: readonly SkillReferenceRow[];
};

/**
 * The extended headline intro. Version-exact knowledge is the framing; it also absorbs three former
 * core rules — content is version-exact, reference paths are skill-root-relative, prefer PDS for new
 * UI — and states that the skill ships next to the actual implementation, so the agent can always read
 * the real source (typings, meta, scss, tokens, the Tailwind theme, the shipped CSS) for anything the
 * skill does not yet cover or wants to verify.
 */
const renderIntro = (framework: Framework): string => {
  const peerNote =
    framework === 'js'
      ? ''
      : " The wrapper's own `meta` and `scss` are re-export shims of the same-version `@porsche-design-system/components-js` peer, so those two point at the peer directly.";
  return [
    'Version-exact knowledge of the installed Porsche Design System: every fact, prop, token and example ' +
      'here matches the installed package exactly — never mix guidance across versions. Every reference ' +
      'path is relative to this skill root unless noted otherwise.',
    '',
    'This skill ships inside the installed package, right next to the actual implementation. When the ' +
      'skill does not (yet) cover something, or you want to verify a detail, read the real source ' +
      `alongside the skill root: the package typings, \`component-meta\` (\`${rawMetaReference(framework)}\`), ` +
      `the SCSS partials (\`${rawScssReference(framework)}\`), the design tokens (\`../tokens\`), the Tailwind ` +
      `theme (\`${rawTailwindcssReference()}\`) and the shipped global CSS.${peerNote}`,
    '',
    'Prefer Porsche Design System components and tokens for new UI, even when the user does not name PDS. ' +
      'Do not rewrite non-PDS UI unasked, and do not hijack work that targets another library.',
  ].join('\n');
};

/**
 * The `## Components` section: the authoritative component set inlined so it is in context the moment
 * the skill activates — the agent never has to read a separate overview first to learn what exists, and
 * the closed list anchors it against reaching for non-PDS elements. Besides the roster table it carries
 * the component-scoped rules dissolved out of the former core-rules block (`component-meta` authority,
 * the accessibility test matrix) and the framework-syntax note, so the tag↔component mapping and the
 * anti-hallucination fixes survive.
 */
const renderComponentsSection = (framework: Framework, roster: readonly ComponentRosterEntry[]): string => {
  if (roster.length === 0) {
    return '_The component roster is populated by the content generators._';
  }
  const rows = roster.map(({ tag, summary, status }) => [
    `\`${tag}\`${status ? ` _(${status})_` : ''}`,
    escapeCell(summary),
    `[${tag}.md](references/components/${tag}/${tag}.md)`,
  ]);
  return [
    `The Porsche Design System ships ${roster.length} components. Open a component's reference for its ` +
      'props, slots, events, CSS variables and examples before using it. Each reference\'s "Examples" ' +
      'table links runnable, framework-specific example files under `references/components/<tag>/examples/`.',
    '',
    `\`component-meta\` is authoritative: when it disagrees with the examples or prose here, follow ` +
      `\`component-meta\` (raw data at \`${rawMetaReference(framework)}\`).`,
    '',
    'Every component is validated against the PDS accessibility test matrix (automated: AXE-Core WCAG 2.2 ' +
      'AA, high-contrast, text-zoom; manual: keyboard, screen reader). A component reference carries a ' +
      '`## Tests` section only to flag an exception (e.g. partial high-contrast support).',
    '',
    FRAMEWORK_SYNTAX[framework],
    '',
    'Sub-components (e.g. `p-table-row`, `p-select-option`, `p-tabs-item`) have no separate row — they are ' +
      'only valid inside a parent, so their API is documented under a "Sub-components" section in that ' +
      "parent's reference.",
    '',
    markdownTable(['Component', 'Summary', 'Reference'], rows),
  ].join('\n');
};

/**
 * The theming inoculation, dissolved out of the former core-rules block into the `## Stylesheets`
 * section (theming is a stylesheet concern). Light/dark is CSS `color-scheme` and nothing else; the
 * removed-in-earlier-majors `theme` prop is the common hallucination this pre-empts.
 */
const renderThemingNote = (framework: Framework): string =>
  '**Theming is one mechanism — CSS `color-scheme`, nothing else.** Light/dark is controlled solely by ' +
  'the `.scheme-light` / `.scheme-dark` / `.scheme-light-dark` classes on `<html>` (or any ancestor); ' +
  'the scheme cascades to **both** PDS components and custom markup, which all resolve colors via ' +
  `\`light-dark()\`. \`.scheme-light-dark\` follows the OS. There is **no** \`theme\` prop — not on ${THEME_INIT_TARGET[framework]} and not on components. A ` +
  '`theme="light|dark|auto"` prop existed in earlier majors and was removed; if you recall one, it is a ' +
  'stale prior — do not add it, verify against the installed types.';

/** The `## Stylesheets` section: the "use when" prose (former reference-map row, expanded), a pointer to
 * the reference, and the theming note. */
const renderStylesheetsSection = (framework: Framework, stylesheets: SkillReferenceRow): string => {
  const fileName = stylesheets.resolvedPath.split('/').pop();
  return [
    `${stylesheets.intro ?? stylesheets.description} See [${fileName}](${stylesheets.resolvedPath}) for the exact files, ` +
      'their import order and the full `.scheme-*` list.',
    '',
    renderThemingNote(framework),
  ].join('\n');
};

/** The `## Tokens` section: a one-paragraph "use when" pointing at the tokens reference. */
const renderTokensSection = (): string =>
  'Design tokens — the source values for color, spacing, typography, motion, breakpoints and more, ' +
  'available as JS constants and as CSS custom properties. Open [tokens.md](references/tokens.md) when ' +
  'using tokens directly in custom UI.';

/**
 * The `## Styling` section (last section): the styling-solutions overview so the agent always knows PDS
 * offers these integrations and what they are for. They are independent of the components but build on
 * the same tokens and the same `color-scheme` theming, so custom UI shares the exact palette, spacing
 * and typography as PDS components — the full mechanics live in the Stylesheets section / reference.
 * Each row links the solution's reference for setup and the full catalog.
 */
const renderStylingSection = (stylingSolutions: readonly SkillReferenceRow[]): string => {
  const tailwind = stylingSolutions.find(({ title }) => title === 'Tailwind CSS');
  if (!tailwind) {
    throw new Error('Package skill rows must contain the Tailwind CSS styling solution');
  }
  const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const solutionCount = numberWords[stylingSolutions.length] ?? String(stylingSolutions.length);
  const rows = stylingSolutions.map(({ title, description, resolvedPath }) => [
    title,
    escapeCell(description),
    `[${resolvedPath.split('/').pop()}](${resolvedPath})`,
  ]);
  return [
    `The Porsche Design System offers a ready-made integration for ${solutionCount} styling solutions. They are ` +
      'independent of the components — you do not need them to use components, and they do not depend on ' +
      'components — but they build on the same design system: the same design tokens and the same ' +
      '`color-scheme` (light/dark) theming, so one `.scheme-*` class drives both PDS components and your ' +
      'custom UI. Custom UI you build with them therefore shares the exact palette, spacing and ' +
      'typography as PDS components. There is no separate component theming API and no `theme` prop; the ' +
      'full theming mechanics live in the **Stylesheets** section above.',
    '',
    'Use them to build layout and custom components or patterns not yet available in the component ' +
      'library — typography, surfaces, boxes, the layout grid, spacing and responsive breakpoints. Pick ' +
      'one solution per project and open its reference for setup and the full catalog.',
    '',
    'Note: the code examples in the component references use PDS Tailwind utility classes (e.g. `flex`, ' +
      '`flex-col`, `gap-fluid-sm`) for layout. These only take effect with the Tailwind CSS solution ' +
      `installed (\`${tailwind.resolvedPath}\`) — without it they are inert, so replace them with ` +
      'your own layout CSS.',
    '',
    markdownTable(['Styling solution', 'Use this when', 'Reference'], rows),
  ].join('\n');
};

/**
 * Build the always-loaded `SKILL.md` entry point: fixed-`name` frontmatter with the tuned activation
 * description followed by one topical section per domain — Components (with the inlined roster),
 * Stylesheets, Tokens and Styling. The former global reference map and core-rules block are dissolved
 * into these sections; Getting started and partials leave SKILL.md entirely (they return single-sourced
 * in later phases).
 */
export const buildSkillMd = (
  framework: Framework,
  roster: readonly ComponentRosterEntry[],
  packageSkills: PackageSkillSections
): string => {
  const frontmatter = ['---', `name: ${skillName(framework)}`, `description: ${ACTIVATION_DESCRIPTION}`, '---'].join(
    '\n'
  );

  return [
    frontmatter,
    '',
    `# Porsche Design System (\`${framework}\`)`,
    '',
    renderIntro(framework),
    '',
    '## Components',
    '',
    renderComponentsSection(framework, roster),
    '',
    '## Stylesheets',
    '',
    renderStylesheetsSection(framework, packageSkills.stylesheets),
    '',
    '## Tokens',
    '',
    renderTokensSection(),
    '',
    '## Styling',
    '',
    renderStylingSection(packageSkills.styling),
    '',
  ].join('\n');
};
