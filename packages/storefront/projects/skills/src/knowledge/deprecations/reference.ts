import { escapeCell, markdownTable } from '../../shared/markdown';
import type { Framework } from '../../shared/skillTree';
import { localPorscheDesignSystemVersion } from '../../shared/version';
import { spellings } from './spellings';
import type { DeprecationEntry, DeprecationSource } from './types';

/**
 * Renders `references/deprecations.md` — every deprecated Porsche Design System API in the installed
 * version, in one file.
 *
 * The knowledge skill already records all of this, but indexed *by component*: right for building a
 * `p-button`, wrong for checking a codebase. Reconstructing "everything deprecated" from ~63
 * reference files costs a read each and fails silently — an agent that opens 55 of them produces a
 * shorter list that looks like a cleaner project. This is the inverse index, so one read answers the
 * question.
 *
 * Rendered per framework, so each tree carries only its own spellings rather than four columns of
 * which three are noise.
 */

const code = (value: string): string => `\`${value}\``;

/** Human label per source category, used for headings and the coverage table. */
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

/** How an entry is written, including its owner and prop where those give it meaning. */
const subject = (entry: DeprecationEntry): string => {
  switch (entry.kind) {
    case 'value':
      return `${code(entry.owner ?? '')} ${code(`${entry.prop}="${entry.identifier}"`)}`;
    case 'component':
      return code(entry.identifier);
    case 'slot':
      return `${code(entry.owner ?? '')} ${code(`slot="${entry.identifier}"`)}`;
    default:
      return entry.owner ? `${code(entry.owner)} ${code(entry.identifier)}` : code(entry.identifier);
  }
};

/**
 * The replacement column. The verbatim message is the fallback rather than an omission: when no
 * replacement could be parsed from it, the message is the only authoritative remediation there is,
 * and dropping it would leave a reader with a deprecation and no next step.
 */
const remediation = (entry: DeprecationEntry): string => {
  const parts = [entry.replacement && `Use ${code(entry.replacement)}.`, entry.message].filter(Boolean) as string[];
  return escapeCell(parts.join(' ')) || '—';
};

const referenceLink = (entry: DeprecationEntry): string =>
  entry.reference ? `[${entry.reference}](${entry.reference})` : '—';

const componentTable = (entries: DeprecationEntry[], framework: Framework): string =>
  markdownTable(
    ['Rule ID', 'Deprecated', 'Search for', 'Replacement / note', 'Reference'],
    entries.map((entry) => [
      code(entry.id),
      subject(entry),
      spellings(entry, framework).map(code).join(' ') || '—',
      remediation(entry),
      referenceLink(entry),
    ])
  );

const styleTable = (entries: DeprecationEntry[]): string =>
  markdownTable(
    ['Rule ID', 'Deprecated', 'Replacement / note', 'Reference'],
    entries.map((entry) => [code(entry.id), code(entry.identifier), remediation(entry), referenceLink(entry)])
  );

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
  return [
    heading,
    '',
    `Derived from ${origin}.`,
    '',
    source.category === 'components' ? componentTable(source.entries, framework) : styleTable(source.entries),
  ].join('\n');
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
      'read its first segment as the entry kind (`component`, `prop`, `value`, `event`, `slot`, `cssVariable` or ' +
      '`styleAlias`). It is what makes findings comparable across runs and releases, so an invented one silently ' +
      'breaks that comparison.',
  ].join('\n');

/** The full `references/deprecations.md` body for one framework. */
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
    ...sources.flatMap((source) => [renderSource(source, framework), '']),
  ]
    .join('\n')
    .trimEnd();
