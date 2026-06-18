import {
  blurFrosted,
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
  radiusLg,
  radiusMd,
  radiusSm,
  shadowLg,
  shadowMd,
  shadowSm,
  spacingFluid2Xl,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXl,
  spacingFluidXs,
  spacingStatic2Xl,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
} from '@porsche-design-system/tokens';
import { scssMeta } from '../meta';
import type { ScssFileMeta, ScssRaw } from '../types';
import { colorDeprecatedAliases, colorSchemeMixin } from './color-plumbing';
import { focusDeprecatedAliases } from './focus-plumbing';
import { cjkFontFamilyMixin, fontDeprecatedAliases } from './font-plumbing';
import { flatten, renderNode } from './render';
import { skeletonDeprecatedMixin } from './skeleton-plumbing';

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

// Blur — deprecated `pds-frosted-glass` mixin. Plumbing: still emitted, but not a documented entry.
const blurDeprecatedMixin: ScssRaw = {
  raw: [
    '/* alias (deprecated) */',
    '@mixin pds-frosted-glass {',
    `  backdrop-filter: ${blurFrosted};`,
    `  -webkit-backdrop-filter: ${blurFrosted};`,
    '}',
  ].join('\n'),
};

const blurFile: ScssFileMeta = {
  file: '_blur.scss',
  description: 'The frosted blur variable plus the deprecated `pds-frosted-glass` mixin.',
  nodes: [...flatten(scssMeta.theme.blur), blank, blurDeprecatedMixin],
};

// Breakpoint — deprecated `$pds-breakpoint-*` aliases. Plumbing: still emitted, not documented.
const breakpointDeprecatedAliases: ScssRaw = {
  raw: [
    '$pds-breakpoint-base: 0; /* alias (deprecated) */',
    `$pds-breakpoint-xs: ${breakpointXs}; /* alias (deprecated) */`,
    `$pds-breakpoint-s: ${breakpointSm}; /* alias (deprecated) */`,
    `$pds-breakpoint-m: ${breakpointMd}; /* alias (deprecated) */`,
    `$pds-breakpoint-l: ${breakpointLg}; /* alias (deprecated) */`,
    `$pds-breakpoint-xl: ${breakpointXl}; /* alias (deprecated) */`,
    `$pds-breakpoint-xxl: ${breakpoint2Xl}; /* alias (deprecated) */`,
  ].join('\n'),
};

const breakpointFile: ScssFileMeta = {
  file: '_breakpoint.scss',
  description: 'The responsive breakpoint scale plus the deprecated `$pds-breakpoint-*` aliases.',
  nodes: [...flatten(scssMeta.theme.breakpoint), blank, breakpointDeprecatedAliases],
};

// Shadow — deprecated `pds-drop-shadow-*` mixins. Plumbing: still emitted, not documented.
const shadowDeprecatedMixins: ScssRaw = {
  raw: [
    '/* alias (deprecated) */',
    '@mixin pds-drop-shadow-high {',
    `  box-shadow: ${shadowLg};`,
    '}',
    '',
    '/* alias (deprecated) */',
    '@mixin pds-drop-shadow-low {',
    `  box-shadow: ${shadowSm};`,
    '}',
    '',
    '/* alias (deprecated) */',
    '@mixin pds-drop-shadow-medium {',
    `  box-shadow: ${shadowMd};`,
    '}',
  ].join('\n'),
};

const shadowFile: ScssFileMeta = {
  file: '_shadow.scss',
  description: 'The shadow scale plus the deprecated `pds-drop-shadow-*` mixins.',
  nodes: [...flatten(scssMeta.theme.shadow), blank, shadowDeprecatedMixins],
};

// Spacing — deprecated `$pds-spacing-*` aliases (static, then fluid). Plumbing: still emitted, not documented.
const spacingDeprecatedAliases: ScssRaw = {
  raw: [
    `$pds-spacing-static-x-small: ${spacingStaticXs}; /* alias (deprecated) */`,
    `$pds-spacing-static-small: ${spacingStaticSm}; /* alias (deprecated) */`,
    `$pds-spacing-static-medium: ${spacingStaticMd}; /* alias (deprecated) */`,
    `$pds-spacing-static-large: ${spacingStaticLg}; /* alias (deprecated) */`,
    `$pds-spacing-static-x-large: ${spacingStaticXl}; /* alias (deprecated) */`,
    `$pds-spacing-static-xx-large: ${spacingStatic2Xl}; /* alias (deprecated) */`,
    '',
    `$pds-spacing-fluid-x-small: ${spacingFluidXs}; /* alias (deprecated) */`,
    `$pds-spacing-fluid-small: ${spacingFluidSm}; /* alias (deprecated) */`,
    `$pds-spacing-fluid-medium: ${spacingFluidMd}; /* alias (deprecated) */`,
    `$pds-spacing-fluid-large: ${spacingFluidLg}; /* alias (deprecated) */`,
    `$pds-spacing-fluid-x-large: ${spacingFluidXl}; /* alias (deprecated) */`,
    `$pds-spacing-fluid-xx-large: ${spacingFluid2Xl}; /* alias (deprecated) */`,
  ].join('\n'),
};

const spacingFile: ScssFileMeta = {
  file: '_spacing.scss',
  description: 'The fluid and static spacing scales plus the deprecated `$pds-spacing-*` aliases.',
  nodes: [...flatten(scssMeta.theme.spacing), blank, spacingDeprecatedAliases],
};

// Motion — deprecated `$pds-motion-*` aliases. Plumbing: still emitted, not documented.
const motionDeprecatedAliases: ScssRaw = {
  raw: [
    `$pds-motion-duration-long: ${durationLg}; /* alias (deprecated) */`,
    `$pds-motion-duration-moderate: ${durationMd}; /* alias (deprecated) */`,
    `$pds-motion-duration-short: ${durationSm}; /* alias (deprecated) */`,
    `$pds-motion-duration-very-long: ${durationXl}; /* alias (deprecated) */`,
    `$pds-motion-easing-base: ${easeInOut}; /* alias (deprecated) */`,
    `$pds-motion-easing-in: ${easeIn}; /* alias (deprecated) */`,
    `$pds-motion-easing-out: ${easeOut}; /* alias (deprecated) */`,
  ].join('\n'),
};

const motionFile: ScssFileMeta = {
  file: '_motion.scss',
  description: 'The duration and easing scales plus the deprecated `$pds-motion-*` aliases.',
  nodes: [...flatten(scssMeta.theme.motion), blank, motionDeprecatedAliases],
};

// Color — the documented `$color-*` variables, then the `color-scheme()` theming mixin and the
// deprecated `$pds-theme-*` aliases as plumbing (both still emitted, neither a documented entry).
const colorFile: ScssFileMeta = {
  file: '_color.scss',
  description: 'The `$color-*` scale plus the `color-scheme()` mixin and deprecated `$pds-theme-*` aliases.',
  nodes: [...flatten(scssMeta.theme.color), blank, colorSchemeMixin, blank, colorDeprecatedAliases],
};

// Font — the documented typography variables (families, line height, type scale, weights), with the
// `cjk-font-family` helper mixin and the deprecated `$pds-font-*` aliases as plumbing (both still
// emitted, neither a documented entry). The prose mixins are migrated in the typography-mixins slice.
const { family, weight, lineHeight, text } = scssMeta.theme.typography;
const fontFile: ScssFileMeta = {
  file: '_font.scss',
  description: 'The typography scale, weights and families plus the `cjk-font-family` helper mixin and `$pds-font-*` aliases.',
  nodes: [
    ...flatten(family),
    blank,
    cjkFontFamilyMixin,
    blank,
    ...flatten(lineHeight),
    blank,
    ...flatten(text),
    blank,
    ...flatten(weight),
    blank,
    fontDeprecatedAliases,
  ],
};

// Skeleton — the documented `skeleton()` mixin, then the deprecated `pds-skeleton` variant as
// plumbing (still emitted, not a documented entry). Bodies keep their namespaced cross-references.
const skeletonFile: ScssFileMeta = {
  file: '_skeleton.scss',
  description: 'The `skeleton()` loading-placeholder mixin plus the deprecated `pds-skeleton` variant.',
  uses: ['border', 'color', 'motion'],
  nodes: [...flatten(scssMeta.utilities.skeleton), blank, skeletonDeprecatedMixin],
};

// Focus — the documented `focus-visible()` mixin, then the deprecated `pds-focus` mixin and its
// lookup maps as plumbing (still emitted, not documented entries).
const focusFile: ScssFileMeta = {
  file: '_focus.scss',
  description: 'The `focus-visible()` mixin plus the deprecated `pds-focus` variant and its lookup maps.',
  uses: ['border', 'color', 'sass:map'],
  nodes: [...flatten(scssMeta.utilities.focus), blank, focusDeprecatedAliases],
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
export const scssFileMeta: ScssFileMeta[] = [
  borderFile,
  blurFile,
  breakpointFile,
  shadowFile,
  spacingFile,
  motionFile,
  colorFile,
  fontFile,
  skeletonFile,
  focusFile,
  indexFile,
];

/** Render a file descriptor to its SCSS string: optional `@use` headers, then the ordered nodes. */
export const renderScssFile = ({ uses, nodes }: ScssFileMeta): string => {
  const header = uses?.length ? `${uses.map((name) => `@use '${name}';`).join('\n')}\n\n` : '';
  return header + nodes.map(renderNode).join('\n');
};
