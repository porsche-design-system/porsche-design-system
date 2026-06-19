import { scssMeta } from '../meta';
import { blurDeprecatedMixin } from '../theme/blur';
import { borderDeprecatedAliases } from '../theme/border';
import { breakpointDeprecatedAliases } from '../theme/breakpoint';
import { colorDeprecatedAliases, colorSchemeMixin } from '../theme/color';
import { gradientDeprecatedMixins } from '../theme/gradient';
import { gridGroups } from '../theme/grid';
import { motionDeprecatedAliases } from '../theme/motion';
import { shadowDeprecatedMixins } from '../theme/shadow';
import { spacingDeprecatedAliases } from '../theme/spacing';
import { cjkFontFamilyMixin, fontDeprecatedAliases } from '../theme/typography';
import type { ScssFileMeta, ScssRaw } from '../types';
import { focusDeprecatedAliases } from '../utilities/focus';
import { breakpointsMap, mediaQueryDeprecatedAliases } from '../utilities/media-query';
import { skeletonDeprecatedMixin } from '../utilities/skeleton';
import {
  displayDeprecatedAliases,
  headingDeprecatedAliases,
  proseHeadingHelper,
  proseTextHelper,
  textDeprecatedAliases,
} from '../utilities/typography';
import { flatten, renderNode } from './render';

/** A blank-line separator between sections within a partial (an empty raw node). */
const blank: ScssRaw = { raw: '' };

const borderFile: ScssFileMeta = {
  file: '_border.scss',
  description: 'The border radius scale plus the deprecated `$pds-border-*` aliases.',
  nodes: [...flatten(scssMeta.theme.border), blank, borderDeprecatedAliases],
};

const blurFile: ScssFileMeta = {
  file: '_blur.scss',
  description: 'The frosted blur variable plus the deprecated `pds-frosted-glass` mixin.',
  nodes: [...flatten(scssMeta.theme.blur), blank, blurDeprecatedMixin],
};

const breakpointFile: ScssFileMeta = {
  file: '_breakpoint.scss',
  description: 'The responsive breakpoint scale plus the deprecated `$pds-breakpoint-*` aliases.',
  nodes: [...flatten(scssMeta.theme.breakpoint), blank, breakpointDeprecatedAliases],
};

const shadowFile: ScssFileMeta = {
  file: '_shadow.scss',
  description: 'The shadow scale plus the deprecated `pds-drop-shadow-*` mixins.',
  nodes: [...flatten(scssMeta.theme.shadow), blank, shadowDeprecatedMixins],
};

const spacingFile: ScssFileMeta = {
  file: '_spacing.scss',
  description: 'The fluid and static spacing scales plus the deprecated `$pds-spacing-*` aliases.',
  nodes: [...flatten(scssMeta.theme.spacing), blank, spacingDeprecatedAliases],
};

const motionFile: ScssFileMeta = {
  file: '_motion.scss',
  description: 'The duration and easing scales plus the deprecated `$pds-motion-*` aliases.',
  nodes: [...flatten(scssMeta.theme.motion), blank, motionDeprecatedAliases],
};

// Gradient — the documented `$gradient-stops-fade-dark` variable, then the deprecated
// `pds-gradient-to-*` directional mixins as plumbing (still emitted, not documented entries).
const gradientFile: ScssFileMeta = {
  file: '_gradient.scss',
  description: 'The `$gradient-stops-fade-dark` color stops plus the deprecated `pds-gradient-to-*` mixins.',
  nodes: [...flatten(scssMeta.theme.gradient), blank, gradientDeprecatedMixins],
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

// Heading — the documented `prose-heading-*` mixins, with the private `-prose-heading` helper
// (emitted first, Sass needs it before the documented mixins) and the deprecated `pds-heading-*`
// aliases as plumbing. Bodies keep their namespaced `font.` / `color.` cross-references.
const headingFile: ScssFileMeta = {
  file: '_heading.scss',
  description: 'The `prose-heading-*` mixins plus the `-prose-heading` helper and `pds-heading-*` aliases.',
  uses: ['font', 'color'],
  nodes: [
    proseHeadingHelper,
    blank,
    ...flatten(scssMeta.utilities.typography.heading),
    blank,
    headingDeprecatedAliases,
  ],
};

// Text — the documented `prose-text-*` mixins, with the private `-prose-text` helper and the
// deprecated `pds-text-*` aliases as plumbing.
const textFile: ScssFileMeta = {
  file: '_text.scss',
  description: 'The `prose-text-*` mixins plus the `-prose-text` helper and `pds-text-*` aliases.',
  uses: ['font', 'color'],
  nodes: [proseTextHelper, blank, ...flatten(scssMeta.utilities.typography.text), blank, textDeprecatedAliases],
};

// Display — only the deprecated `pds-display-*` aliases routed through the heading prose mixins; the
// whole partial is plumbing (no documented display entries).
const displayFile: ScssFileMeta = {
  file: '_display.scss',
  description: 'The deprecated `pds-display-*` aliases routed through the `prose-heading-*` mixins.',
  uses: ['heading'],
  nodes: [displayDeprecatedAliases],
};

// Media query — the documented `media-query-*` mixins, preceded by the `$pds-breakpoints` lookup map
// they consult and followed by the deprecated `pds-media-query-*` aliases (both plumbing). Bodies
// keep their namespaced `breakpoint.` / `map.` cross-references.
const mediaQueryFile: ScssFileMeta = {
  file: '_media-query.scss',
  description: 'The `media-query-*` mixins plus the `$pds-breakpoints` map and deprecated `pds-media-query-*` aliases.',
  uses: ['breakpoint', 'sass:map'],
  nodes: [
    breakpointsMap,
    blank,
    ...flatten(scssMeta.utilities.mediaQuery),
    blank,
    mediaQueryDeprecatedAliases,
  ],
};

// Grid — the documented `pds-grid` mixin (the responsive grid template, via the raw escape hatch)
// plus the documented `$pds-grid-*` span/offset/column/gap variables. The variables keep their
// original per-partial split (one descriptor each) so the `@forward` index is unchanged in effect;
// each consumes its `gridGroups` slice by identity. No grid plumbing — every piece is documented.
const gridFile: ScssFileMeta = {
  file: '_grid.scss',
  description: 'The `pds-grid` responsive layout mixin (the Porsche Grid).',
  nodes: [...flatten(scssMeta.utilities.grid)],
};

const gridGapFile: ScssFileMeta = {
  file: '_grid-gap.scss',
  description: 'The `$pds-grid-gap` variable.',
  nodes: [...flatten(gridGroups.gap)],
};

const gridFullFile: ScssFileMeta = {
  file: '_grid-full.scss',
  description: 'The `full` area column-start/end variables.',
  nodes: [...flatten(gridGroups.full)],
};

const gridFullOffsetFile: ScssFileMeta = {
  file: '_grid-full-offset.scss',
  description: 'The `full` area offset variable.',
  nodes: [...flatten(gridGroups.fullOffset)],
};

const gridWideFile: ScssFileMeta = {
  file: '_grid-wide.scss',
  description: 'The `wide` area column-start/end variables.',
  nodes: [...flatten(gridGroups.wide)],
};

const gridWideOffsetFile: ScssFileMeta = {
  file: '_grid-wide-offset.scss',
  description: 'The `wide` area offset variables.',
  nodes: [...flatten(gridGroups.wideOffset)],
};

const gridExtendedFile: ScssFileMeta = {
  file: '_grid-extended.scss',
  description: 'The `extended` area column-start/end and span variables.',
  nodes: [...flatten(gridGroups.extended)],
};

const gridExtendedOffsetFile: ScssFileMeta = {
  file: '_grid-extended-offset.scss',
  description: 'The `extended` area offset variables.',
  nodes: [...flatten(gridGroups.extendedOffset)],
};

const gridBasicFile: ScssFileMeta = {
  file: '_grid-basic.scss',
  description: 'The `basic` area column-start/end and span variables.',
  nodes: [...flatten(gridGroups.basic)],
};

const gridBasicOffsetFile: ScssFileMeta = {
  file: '_grid-basic-offset.scss',
  description: 'The `basic` area offset variables.',
  nodes: [...flatten(gridGroups.basicOffset)],
};

const gridNarrowFile: ScssFileMeta = {
  file: '_grid-narrow.scss',
  description: 'The `narrow` area column-start/end and span variables.',
  nodes: [...flatten(gridGroups.narrow)],
};

const gridNarrowOffsetFile: ScssFileMeta = {
  file: '_grid-narrow-offset.scss',
  description: 'The `narrow` area offset variables.',
  nodes: [...flatten(gridGroups.narrowOffset)],
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
 * each to a string, Prettier-formats it and writes `dist/<file>`. Every domain lives here — this is
 * the single source of every generated partial plus the `_index.scss` `@forward` index.
 */
export const scssFileMeta: ScssFileMeta[] = [
  borderFile,
  blurFile,
  breakpointFile,
  shadowFile,
  spacingFile,
  motionFile,
  gradientFile,
  colorFile,
  fontFile,
  headingFile,
  textFile,
  displayFile,
  skeletonFile,
  focusFile,
  mediaQueryFile,
  gridFile,
  gridGapFile,
  gridFullFile,
  gridFullOffsetFile,
  gridWideFile,
  gridWideOffsetFile,
  gridExtendedFile,
  gridExtendedOffsetFile,
  gridBasicFile,
  gridBasicOffsetFile,
  gridNarrowFile,
  gridNarrowOffsetFile,
  indexFile,
];

/** Render a file descriptor to its SCSS string: optional `@use` headers, then the ordered nodes. */
export const renderScssFile = ({ uses, nodes }: ScssFileMeta): string => {
  const header = uses?.length ? `${uses.map((name) => `@use '${name}';`).join('\n')}\n\n` : '';
  return header + nodes.map(renderNode).join('\n');
};
