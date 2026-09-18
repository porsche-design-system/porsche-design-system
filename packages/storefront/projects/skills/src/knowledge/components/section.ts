import { escapeCell, markdownTable } from '../../shared/markdown';
import type { Framework } from '../../shared/skillTree';
import type { ComponentRosterEntry } from './reference';

/**
 * Framework wrappers expose component metadata through the JS peer.
 */
export const rawMetaReference = (framework: Framework): string =>
  framework === 'js' ? '../../meta' : '@porsche-design-system/components-js/meta';

/**
 * Maps framework syntax to the custom-element names used by shared component references.
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

/**
 * Inlines the authoritative component roster so unavailable components are not inferred.
 */
export const renderComponentsSection = (framework: Framework, roster: readonly ComponentRosterEntry[]): string => {
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
