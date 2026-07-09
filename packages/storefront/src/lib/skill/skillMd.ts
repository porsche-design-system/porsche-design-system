import { escapeCell, markdownTable } from './markdown';
import type { Framework, ReferenceMapEntry } from './skillTree';

/** Fixed skill identifier — never varies by framework or version. */
export const SKILL_NAME = 'porsche-design-system-docs';

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
  'Build, style, review, or upgrade web user interfaces with the Porsche Design System (PDS), or author ' +
  'and review documents that specify PDS behavior. ' +
  'Use whenever a task touches frontend UI — adding or changing components (buttons, forms, inputs, ' +
  'cards, tables, modals, navigation, layouts), styling with Tailwind, SCSS, vanilla-extract or Emotion, ' +
  'applying design tokens, wiring partials (fonts, icons, meta tags, loader), scaffolding a new page or ' +
  'form, or migrating and upgrading PDS. Also use whenever a requirement, spec, design doc, or acceptance ' +
  'criteria names a PDS component, prop, token, theming, or partial. Prefer PDS for new UI even when it is ' +
  'not named by the user. Do not activate for backend or non-UI logic, unrelated tests or tooling, ' +
  'documentation or prose that does not assert PDS component, prop, token, theming, or partial behavior, ' +
  'work that clearly targets a different UI library, or when the user opts out of PDS.';

/**
 * Migration guides, in documentation order: source-dir/output-filename `slug` plus the reference-map
 * "use this when". Single source of truth for both the SKILL.md migration rows below and the generator's
 * MDX-load list (`build-skill.ts` imports this), so adding a guide is a one-line edit in one place.
 */
export const MIGRATION_GUIDES: readonly { slug: string; useWhen: string }[] = [
  { slug: 'porsche-design-system', useWhen: 'Upgrading the Porsche Design System to a new major version.' },
  { slug: 'scss', useWhen: 'Migrating the SCSS styling solution.' },
  { slug: 'tailwindcss', useWhen: 'Migrating the Tailwind CSS styling solution.' },
  { slug: 'vanilla-extract', useWhen: 'Migrating the vanilla-extract styling solution.' },
  { slug: 'emotion', useWhen: 'Migrating the Emotion styling solution.' },
];

/**
 * The reference map describing the skill tree layout. Each row points at a reference file the content
 * generators fill in, and is rendered verbatim into SKILL.md's reference-map table by {@link buildSkillMd}.
 * The set of references is fixed (styles/tokens/partials are one file each; the migration guides come from
 * {@link MIGRATION_GUIDES}), so this is the single source rather than a scaffold generators append to. The
 * component roster and the styling solutions are rendered as their own sections in SKILL.md's body, not as
 * map rows.
 */
export const SKELETON_REFERENCE_MAP: readonly ReferenceMapEntry[] = [
  {
    path: 'references/stylesheets.md',
    useWhen:
      'The required global stylesheets every component depends on (CSS variables, font-face, normalize/reset) and light/dark theming via the `.scheme-*` classes and `color-scheme`. Open this whenever installing or setting up PDS, before rendering any component, when components look unstyled or use the wrong font/colors, or for anything about themes, dark mode, or color scheme — it applies to most PDS work.',
  },
  { path: 'references/tokens.md', useWhen: 'Using design tokens — color, spacing, typography, etc.' },
  { path: 'references/partials.md', useWhen: 'Adding PDS partials — fonts, icons, meta tags, loader script.' },
  ...MIGRATION_GUIDES.map(({ slug, useWhen }) => ({ path: `references/migration/${slug}.md`, useWhen })),
];

/**
 * Raw `component-meta` link target. The authoritative data lives only in the js
 * package; the framework wrappers' local `../meta` is a re-export shim, so they
 * link the js peer's `/meta` subpath instead (see design "Data & state").
 */
export const rawMetaReference = (framework: Framework): string =>
  framework === 'js' ? '../meta' : '@porsche-design-system/components-js/meta';

/**
 * Raw Tailwind stylesheet link target. The generated `index.css` is a byte-identical real copy in
 * every wrapper's dist (CSS cannot re-export), so the skill-root-relative dist sibling resolves in
 * all four frameworks — no js-peer fallback needed.
 */
export const rawTailwindcssReference = (): string => '../tailwindcss/index.css';

/**
 * Raw SCSS link target. Only the js package ships the real partials; every framework wrapper's
 * `scss/` is a `@forward '@porsche-design-system/components-js/scss'` shim (same re-export pattern
 * as `component-meta`). So the js skill links its local `../scss`, while the framework skills link
 * the js peer's `/scss` subpath — version-exact via the same-version js peer.
 */
export const rawScssReference = (framework: Framework): string =>
  framework === 'js' ? '../scss' : '@porsche-design-system/components-js/scss';

/** The installed wrapper package for a framework — used in setup snippets and import statements. */
export const packageName = (framework: Framework): string => `@porsche-design-system/components-${framework}`;

/**
 * Framework-specific "Getting started" content, inlined into SKILL.md so the agent knows — the moment
 * the skill activates — how to initialize PDS and how the framework's component syntax maps to the
 * custom-element tags the roster and references use. React and Vue expose PascalCase component wrappers
 * with framework-native prop/event syntax, so the tag→component and event-name mapping is essential;
 * Angular and vanilla JS use the custom-element tags directly. Setup mirrors the storefront's
 * per-framework getting-started guides (provider/module/loader + global stylesheet + FOUC guard).
 */
const GETTING_STARTED: Record<Framework, string> = {
  react: [
    `Install \`${packageName('react')}\`, wrap your app once with the provider, and import the global stylesheet:`,
    '',
    '```tsx',
    '// main.tsx',
    "import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';",
    '',
    'createRoot(document.getElementById(\'root\')!).render(',
    '  <PorscheDesignSystemProvider>',
    '    <App />',
    '  </PorscheDesignSystemProvider>',
    ');',
    '```',
    '',
    '```css',
    '/* index.css — one import for all global styles, plus a FOUC guard */',
    "@import '@porsche-design-system/components-react';",
    '',
    ':not(:defined) { visibility: hidden; }',
    '```',
    '',
    'Writing components (this differs from the custom-element tags the references show):',
    '- Import each component by name and use its **PascalCase** React component: `p-button` → `<PButton>`, `p-text-field-wrapper` → `<PTextFieldWrapper>`.',
    '- Props are **camelCase** (`disableBackdropClick`, not `disable-backdrop-click`); use `className` for CSS classes and pass ARIA via the `aria={{ ... }}` prop.',
    '- Events are `on<Event>` handler props — the `dismiss` event is `onDismiss`, `update` is `onUpdate`.',
    '- Place a child into a named slot with the `slot="..."` attribute.',
  ].join('\n'),
  vue: [
    `Install \`${packageName('vue')}\`, wrap your app once with the provider, and import the global stylesheet:`,
    '',
    '```vue',
    '<!-- App.vue -->',
    '<script setup lang="ts">',
    "  import { PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';",
    '</script>',
    '',
    '<template>',
    '  <PorscheDesignSystemProvider>',
    '    <!-- your app -->',
    '  </PorscheDesignSystemProvider>',
    '</template>',
    '```',
    '',
    '```css',
    '/* main.css — one import for all global styles, plus a FOUC guard */',
    "@import '@porsche-design-system/components-vue';",
    '',
    ':not(:defined) { visibility: hidden; }',
    '```',
    '',
    'Writing components (this differs from the custom-element tags the references show):',
    '- Import each component by name and use its **PascalCase** component: `p-button` → `<PButton>`, `p-text-field-wrapper` → `<PTextFieldWrapper>`.',
    '- Bind props with `:` and **camelCase** names (`:open="open"`, `:disableBackdropClick="true"`); use `class` for CSS classes.',
    '- Listen to events with `@` — the `dismiss` event is `@dismiss`.',
    '- Place a child into a named slot with the `slot="..."` attribute.',
  ].join('\n'),
  angular: [
    `Install \`${packageName('angular')}\`, add \`PorscheDesignSystemModule\` to your component/module \`imports\`, and import the global stylesheet:`,
    '',
    '```ts',
    '// app.ts',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
    '',
    '@Component({',
    "  selector: 'app-root',",
    '  imports: [PorscheDesignSystemModule],',
    "  templateUrl: './app.html',",
    '})',
    'export class App {}',
    '```',
    '',
    '```css',
    '/* styles.css — one import for all global styles, plus a FOUC guard */',
    "@import '@porsche-design-system/components-angular/index.css';",
    '',
    ':not(:defined) { visibility: hidden; }',
    '```',
    '',
    'Writing components:',
    '- Use the **custom-element tags** directly in templates: `<p-button>`, `<p-text-field-wrapper>`.',
    '- Bind props with `[prop]` and camelCase names (`[open]="open"`, `[disableBackdropClick]="true"`).',
    '- Listen to events with `(event)` — the `dismiss` event is `(dismiss)="onDismiss()"`.',
    '- Place a child into a named slot with the `slot="..."` attribute.',
  ].join('\n'),
  js: [
    `Install \`${packageName('js')}\`, initialize the loader once, and import the global stylesheet:`,
    '',
    '```ts',
    "import { load } from '@porsche-design-system/components-js';",
    '',
    'load();',
    '```',
    '',
    'For best loading performance, inject the loader-script partial into your HTML `<body>` at build time instead — see `references/partials.md` (`getLoaderScript`).',
    '',
    '```css',
    '/* style.css — one import for all global styles, plus a FOUC guard */',
    "@import '@porsche-design-system/components-js';",
    '',
    ':not(:defined) { visibility: hidden; }',
    '```',
    '',
    'Writing components:',
    '- Use the **custom-element tags** directly in HTML: `<p-button>`, `<p-text-field-wrapper>`.',
    '- Set props as attributes (`variant="secondary"`) or as DOM properties for non-string values.',
    "- Listen to events with `element.addEventListener('dismiss', ...)`.",
    '- Place a child into a named slot with the `slot="..."` attribute.',
  ].join('\n'),
};

/**
 * A single row of the inlined component roster: the component tag and a one-line
 * summary. The reference path is derived from the tag, so it stays correct by
 * construction with the `components/<tag>/<tag>.md` layout.
 */
export type ComponentRosterEntry = { tag: string; summary: string };

const renderReferenceMap = (entries: readonly ReferenceMapEntry[]): string => {
  if (entries.length === 0) {
    return '_The reference map is populated by the content generators._';
  }
  const rows = entries.map((entry) => [`\`${entry.path}\``, escapeCell(entry.useWhen)]);
  return markdownTable(['Reference', 'Use this when'], rows);
};

/**
 * The component roster, rendered inline so the authoritative set of components is
 * always in context the moment the skill activates — the agent never has to read a
 * separate overview first to learn what exists, and the closed list anchors it
 * against reaching for non-PDS elements. Each row links the component's own reference
 * (relative to the skill root) for props, slots, events, CSS variables and examples.
 */
const renderComponentRoster = (roster: readonly ComponentRosterEntry[]): string => {
  const rows = roster.map(({ tag, summary }) => [
    `\`${tag}\``,
    escapeCell(summary),
    `[${tag}.md](references/components/${tag}/${tag}.md)`,
  ]);
  return [
    `The Porsche Design System ships ${roster.length} components. Open a component's reference for its props, slots, events, CSS variables and examples before using it.`,
    '',
    'Sub-components (e.g. `p-table-row`, `p-select-option`, `p-tabs-item`) have no separate row — they are ' +
      'only valid inside a parent, so their API is documented under a "Sub-components" section in that ' +
      "parent's reference.",
    '',
    markdownTable(['Component', 'Summary', 'Reference'], rows),
  ].join('\n');
};

/** The four styling solutions PDS ships a ready-made integration for, in reference order. */
const STYLING_SOLUTIONS: readonly { name: string; useWhen: string; path: string }[] = [
  { name: 'Tailwind CSS', useWhen: 'utility-first styling on a PDS Tailwind v4 theme', path: 'references/styles/tailwindcss.md' },
  { name: 'SCSS', useWhen: 'Sass variables and mixins under the `pds` namespace', path: 'references/styles/scss.md' },
  { name: 'vanilla-extract', useWhen: 'typed tokens and utilities in `*.css.ts` files', path: 'references/styles/vanilla-extract.md' },
  { name: 'Emotion', useWhen: 'tokens and utilities in `css`/`styled` styles', path: 'references/styles/emotion.md' },
];

/**
 * The styling-solutions overview, rendered as its own section (like the component roster) so the agent
 * always knows, the moment the skill activates, that PDS offers these integrations and what they are for.
 * They are independent of the components but build on the same tokens and `color-scheme` theming, so
 * custom UI shares the exact palette, spacing and typography as PDS components. Each row links the
 * solution's reference (relative to the skill root) for setup and the full catalog.
 */
const renderStylingSection = (): string => {
  const rows = STYLING_SOLUTIONS.map(({ name, useWhen, path }) => [
    name,
    escapeCell(useWhen),
    `[${path.split('/').pop()}](${path})`,
  ]);
  return [
    'The Porsche Design System offers a ready-made integration for four styling solutions. They are ' +
      'independent of the components — you do not need them to use components, and they do not depend on ' +
      'components — but they build on the same design system: the same design tokens and the same ' +
      '`color-scheme` (light/dark) theming. Custom UI you build with them therefore shares the exact ' +
      'palette, spacing and typography as PDS components. Theming is a single switch: one `.scheme-*` class ' +
      'on `<html>` drives both layers — PDS components and your custom markup — off one `light-dark()` ' +
      'palette. There is no separate component theming API and no `theme` prop; see the Core rules and ' +
      '`references/stylesheets.md`.',
    '',
    'Use them to build layout and custom components or patterns not yet available in the component ' +
      'library — typography, surfaces, boxes, the layout grid, spacing and responsive breakpoints. Pick ' +
      'one solution per project and open its reference for setup and the full catalog.',
    '',
    markdownTable(['Styling solution', 'Use this when', 'Reference'], rows),
  ].join('\n');
};

/**
 * Build the always-loaded `SKILL.md` entry point: fixed-`name` frontmatter with the
 * tuned activation description, the inlined component roster (when supplied), the
 * reference map rendered from the registered rows, and the core always-apply rules.
 */
export const buildSkillMd = (
  framework: Framework,
  entries: readonly ReferenceMapEntry[],
  roster: readonly ComponentRosterEntry[] = []
): string => {
  const frontmatter = ['---', `name: ${SKILL_NAME}`, `description: ${ACTIVATION_DESCRIPTION}`, '---'].join('\n');

  const rawDataNote =
    framework === 'js'
      ? ''
      : ` This subpath is the authoritative source: the wrapper's own \`meta/\` and \`scss/\` re-export the same-version \`@porsche-design-system/components-js\` peer, so the skill links the peer directly.`;

  const coreRules = [
    '## Core rules',
    '',
    '- **Theming is one mechanism — CSS `color-scheme`, nothing else.** Light/dark is controlled solely by ' +
      'the `.scheme-light` / `.scheme-dark` / `.scheme-light-dark` classes on `<html>` (or any ancestor); ' +
      'the scheme cascades to **both** PDS components and custom markup, which all resolve colors via ' +
      '`light-dark()`. `.scheme-light-dark` follows the OS. There is **no** `theme` prop — not on ' +
      '`PorscheDesignSystemProvider` (it takes only `prefix` and `cdn`) and not on components. A ' +
      '`theme="light|dark|auto"` prop existed in earlier majors and was removed; if you recall one, it is a ' +
      'stale prior — do not add it, verify against the installed types. See `references/stylesheets.md`.',
    `- \`component-meta\` is authoritative: when it disagrees with the examples or prose here, follow \`component-meta\` (raw data at \`${rawMetaReference(framework)}\`).${rawDataNote}`,
    '- Prefer Porsche Design System components and tokens for new UI. Do not rewrite non-PDS UI unasked, and do not hijack work that targets another library.',
    '- All content here is version-exact for the installed package — never mix guidance across versions.',
    '- Every reference path is relative to this skill root unless explicitly noted otherwise.',
  ].join('\n');

  const componentsSection = roster.length > 0 ? ['## Components', '', renderComponentRoster(roster), ''] : [];

  return [
    frontmatter,
    '',
    `# Porsche Design System (\`${framework}\`)`,
    '',
    'Version-exact knowledge of the installed Porsche Design System. Open the reference below that matches the task, then apply the core rules.',
    '',
    '## Getting started',
    '',
    GETTING_STARTED[framework],
    '',
    ...componentsSection,
    '## Styling',
    '',
    renderStylingSection(),
    '',
    '## Reference map',
    '',
    renderReferenceMap(entries),
    '',
    coreRules,
    '',
  ].join('\n');
};
