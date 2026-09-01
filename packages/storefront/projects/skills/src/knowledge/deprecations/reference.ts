import { escapeCell, markdownTable } from '../../shared/markdown';
import type { Framework } from '../../shared/skillTree';
import { localPorscheDesignSystemVersion } from '../../shared/version';
import { type DeprecationEntry, type DeprecationSource, USAGE_KINDS, type UsageKind } from './types';

/**
 * Renders one inverse index for codebase audits instead of requiring every component reference.
 * Framework variants provide syntax-specific locating guidance.
 */

const code = (value: string): string => `\`${value}\``;

const CATEGORY_LABEL: Record<DeprecationSource['category'], string> = {
  components: 'Components',
  scss: 'SCSS',
  emotion: 'Emotion',
  vanillaExtract: 'vanilla-extract',
  tailwindcss: 'Tailwind CSS',
  tokens: 'Tokens',
  icons: 'Icons',
  stylesheets: 'Stylesheets',
};

const referenceLink = (entry: DeprecationEntry): string =>
  entry.reference ? `[${entry.reference}](${entry.reference})` : '—';

const entryTable = (entries: DeprecationEntry[]): string =>
  markdownTable(
    ['Rule ID', 'Deprecated', 'Replacement', 'Note', 'Reference'],
    entries.map((entry) => [
      code(entry.id),
      code(entry.identifier),
      entry.replacement ? code(entry.replacement) : '—',
      escapeCell(entry.message ?? '') || '—',
      referenceLink(entry),
    ])
  );

type ComponentUsageKind = Extract<UsageKind, 'component' | 'prop' | 'propValue' | 'event' | 'slot'>;

const COMPONENT_GUIDANCE: Record<Framework, Record<ComponentUsageKind, string>> = {
  react: {
    component: 'Follow PDS component imports, including `/ssr`, aliases and re-exports, to their JSX usage.',
    prop: 'Inspect the named JSX prop on anchored PDS components and wrappers that forward it.',
    propValue:
      'Resolve values assigned to the named JSX prop, including literals, constants, wrappers, spreads and responsive objects.',
    event: 'Inspect React handler props corresponding to the named PDS event.',
    slot: 'Inspect `slot` attributes and default content rendered into the owning PDS component.',
  },
  angular: {
    component: 'Inspect PDS custom-element tags in inline and external Angular templates.',
    prop: 'Inspect static attributes and Angular property bindings on anchored PDS elements and forwarding wrappers.',
    propValue:
      'Resolve values assigned through static attributes and property bindings, including constants, wrappers and responsive objects.',
    event: 'Inspect Angular event bindings corresponding to the named PDS event.',
    slot: 'Inspect `slot` attributes and default content projected into the owning PDS element.',
  },
  vue: {
    component: 'Follow PDS component imports to PascalCase and kebab-case template usage, including aliases.',
    prop: 'Inspect static attributes and Vue bindings on anchored PDS components and forwarding wrappers.',
    propValue:
      'Resolve values assigned through static attributes and Vue bindings, including constants, wrappers and responsive objects.',
    event: 'Inspect Vue listeners corresponding to the named PDS event.',
    slot: 'Inspect `slot` attributes and default content rendered into the owning PDS component.',
  },
  js: {
    component: 'Inspect PDS custom-element tags and calls that create the named element.',
    prop: 'Inspect attributes, property assignments and `setAttribute` calls on anchored PDS elements and wrappers.',
    propValue:
      'Resolve values assigned through attributes, properties and `setAttribute`, including constants, wrappers and responsive objects.',
    event: 'Inspect event listeners registered for the named PDS event.',
    slot: 'Inspect `slot` attributes and default content placed inside the owning PDS element.',
  },
};

const SHARED_GUIDANCE: Record<Exclude<UsageKind, ComponentUsageKind>, string> = {
  cssCustomProperty:
    'Inspect declarations and uses of the exact custom property, anchored to its component, stylesheet or imported theme.',
  cssClass: 'Inspect the exact class in usage anchored to the PDS stylesheet or utility source.',
  scssVariable:
    'Follow PDS Sass roots through namespaces, aliases and configured global imports to the exact variable.',
  scssMixin: 'Follow PDS Sass roots through namespaces and aliases to inclusions of the exact mixin.',
  jsExport: 'Follow imports from the stated package entry point through aliases, namespace access and re-exports.',
};

const renderLocatingGuidance = (framework: Framework): string =>
  [
    'Use the rule ID for context: its first segment is the usage kind, followed by the component or source, the ' +
      'owning prop where applicable, and finally the deprecated identifier.',
    '',
    markdownTable(
      ['Kind', 'How to locate it'],
      USAGE_KINDS.map((usageKind) => [
        code(usageKind),
        usageKind in COMPONENT_GUIDANCE[framework]
          ? COMPONENT_GUIDANCE[framework][usageKind as ComponentUsageKind]
          : SHARED_GUIDANCE[usageKind as Exclude<UsageKind, ComponentUsageKind>],
      ])
    ),
  ].join('\n');

const sourceOrigin = (source: DeprecationSource, framework: Framework): string => source.origin(framework);

const renderSource = (source: DeprecationSource, framework: Framework): string => {
  const heading = `## ${CATEGORY_LABEL[source.category]}`;
  const origin = sourceOrigin(source, framework);
  if (source.entries.length === 0) {
    return [
      heading,
      '',
      `No deprecations in \`${localPorscheDesignSystemVersion}\`. Derived from ${origin}, which was ` +
        'checked and found to carry none — this is a verified result, not an omission.',
    ].join('\n');
  }
  return [heading, '', `Derived from ${origin}.`, '', entryTable(source.entries)].join('\n');
};

const renderCoverage = (sources: DeprecationSource[], framework: Framework): string =>
  markdownTable(
    ['Source', 'Derived from', 'Deprecations'],
    sources.map((source) => [
      CATEGORY_LABEL[source.category],
      escapeCell(sourceOrigin(source, framework)),
      source.entries.length === 0 ? 'none' : String(source.entries.length),
    ])
  );

const renderIntro = (): string =>
  [
    `Every deprecated Porsche Design System API in \`${localPorscheDesignSystemVersion}\`, indexed by what is ` +
      'deprecated rather than by which component owns it. Use it to check an existing codebase; use the ' +
      'component and styling references to build with the current API.',
    '',
    'Deprecated APIs still work in this version. Each will be removed in the next major release, so usage is a ' +
      'compatibility risk rather than a present-day defect — except where a message says an API has no effect ' +
      'anymore, which means the behavior is already gone and only the declaration remains.',
    '',
    'Every entry is derived from the installed package, never hand-authored, and every source is listed below ' +
      'including those that currently carry no deprecations — so "nothing found" is distinguishable from ' +
      '"not checked".',
    '',
    "**Rule ID** is each entry's stable identifier. Copy it verbatim when reporting — never reconstruct it — and " +
      'read its first segment as the usage kind. It is what makes findings comparable across runs and releases, so an invented one silently ' +
      'breaks that comparison.',
  ].join('\n');

export const renderDeprecationsReference = (sources: DeprecationSource[], framework: Framework): string =>
  [
    '# Deprecated API',
    '',
    renderIntro(),
    '',
    '## Coverage',
    '',
    renderCoverage(sources, framework),
    '',
    '## How to locate deprecated usage',
    '',
    renderLocatingGuidance(framework),
    '',
    ...sources.flatMap((source) => [renderSource(source, framework), '']),
  ]
    .join('\n')
    .trimEnd();
