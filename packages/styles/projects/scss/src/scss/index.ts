import { radiusLg, radiusMd, radiusSm } from '@porsche-design-system/tokens';
import { scssMeta } from '../meta';
import type { ScssFileMeta, ScssRaw } from '../types';
import { flatten, renderNode } from './render';

/** A blank-line separator between sections within a partial (an empty raw node). */
const blank: ScssRaw = { raw: '' };

// Border — deprecated `$pds-border-*` aliases. Plumbing: still emitted, but not a documented entry.
const borderDeprecatedAliases: ScssRaw = {
  raw: [
    `$pds-border-radius-small: ${radiusSm}; /* alias (deprecated) */`,
    `$pds-border-radius-medium: ${radiusMd}; /* alias (deprecated) */`,
    `$pds-border-radius-large: ${radiusLg}; /* alias (deprecated) */`,
    `$pds-border-width-base: 2px; /* alias (deprecated) */`,
    `$pds-border-width-thin: 1px; /* alias (deprecated) */`,
  ].join('\n'),
};

const borderFile: ScssFileMeta = {
  file: '_border.scss',
  description: 'The border radius scale plus the deprecated `$pds-border-*` aliases.',
  nodes: [...flatten(scssMeta.theme.border), blank, borderDeprecatedAliases],
};

// The `@forward` index re-exporting every partial under the consumer's `pds.*` namespace. Plumbing.
const indexFile: ScssFileMeta = {
  file: '_index.scss',
  description: 'The `@forward` index re-exporting every partial under the `pds.*` namespace.',
  nodes: [
    {
      raw: [
        'border',
        'breakpoint',
        'display',
        'shadow',
        'font',
        'blur',
        'gradient',
        'grid',
        'grid-gap',
        'grid-full',
        'grid-full-offset',
        'grid-wide',
        'grid-wide-offset',
        'grid-extended',
        'grid-extended-offset',
        'grid-basic',
        'grid-basic-offset',
        'grid-narrow',
        'grid-narrow-offset',
        'heading',
        'motion',
        'spacing',
        'text',
        'color',
        'focus',
        'media-query',
        'skeleton',
      ]
        .map((partial) => `@forward '${partial}';`)
        .join('\n'),
    },
  ],
};

/**
 * The composition layer: an ordered collection of per-file descriptors. Each interleaves documented
 * `scssMeta` entries (by identity) with SCSS-only plumbing. The build iterates this list, renders
 * each to a string, Prettier-formats it and writes `dist/<file>`. Only the migrated domains live
 * here; the rest are still produced by the legacy `fileMap` generators until their slices land.
 */
export const scssFileMeta: ScssFileMeta[] = [borderFile, indexFile];

/** Render a file descriptor to its SCSS string: optional `@use` headers, then the ordered nodes. */
export const renderScssFile = ({ uses, nodes }: ScssFileMeta): string => {
  const header = uses?.length ? `${uses.map((name) => `@use '${name}';`).join('\n')}\n\n` : '';
  return header + nodes.map(renderNode).join('\n');
};
