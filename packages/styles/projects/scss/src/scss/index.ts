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

const gradientFile: ScssFileMeta = {
  file: '_gradient.scss',
  description: 'The `$gradient-stops-fade-dark` color stops plus the deprecated `pds-gradient-to-*` mixins.',
  nodes: [...flatten(scssMeta.theme.gradient), blank, gradientDeprecatedMixins],
};

const colorFile: ScssFileMeta = {
  file: '_color.scss',
  description: 'The `$color-*` scale plus the `color-scheme()` mixin and deprecated `$pds-theme-*` aliases.',
  nodes: [...flatten(scssMeta.theme.color), blank, colorSchemeMixin, blank, colorDeprecatedAliases],
};

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

const skeletonFile: ScssFileMeta = {
  file: '_skeleton.scss',
  description: 'The `skeleton()` loading-placeholder mixin plus the deprecated `pds-skeleton` variant.',
  uses: ['border', 'color', 'motion'],
  nodes: [...flatten(scssMeta.utilities.skeleton), blank, skeletonDeprecatedMixin],
};

const focusFile: ScssFileMeta = {
  file: '_focus.scss',
  description: 'The `focus-visible()` mixin plus the deprecated `pds-focus` variant and its lookup maps.',
  uses: ['border', 'color', 'sass:map'],
  nodes: [...flatten(scssMeta.utilities.focus), blank, focusDeprecatedAliases],
};

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

const textFile: ScssFileMeta = {
  file: '_text.scss',
  description: 'The `prose-text-*` mixins plus the `-prose-text` helper and `pds-text-*` aliases.',
  uses: ['font', 'color'],
  nodes: [proseTextHelper, blank, ...flatten(scssMeta.utilities.typography.text), blank, textDeprecatedAliases],
};

const displayFile: ScssFileMeta = {
  file: '_display.scss',
  description: 'The deprecated `pds-display-*` aliases routed through the `prose-heading-*` mixins.',
  uses: ['heading'],
  nodes: [displayDeprecatedAliases],
};

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

// The grid mixin plus one descriptor per `gridGroups` slice below, keeping the original per-partial split.
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

/** The composition layer: ordered per-file descriptors interleaving `scssMeta` entries with plumbing. The build renders each to `dist/<file>`. */
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
