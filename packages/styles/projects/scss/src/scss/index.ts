import { namespace } from '../namespaces';
import { blur } from '../theme/blur';
import { border } from '../theme/border';
import { breakpoint } from '../theme/breakpoint';
import { color, colorSchemeMixin } from '../theme/color';
import { cjkFontFamily, font } from '../theme/font';
import { gradient } from '../theme/gradient';
import { grid as gridGroups } from '../theme/grid';
import { motion } from '../theme/motion';
import { shadow } from '../theme/shadow';
import { spacing } from '../theme/spacing';
import type { ScssFileMeta, ScssRaw } from '../types';
import { focus, focusMaps } from '../utilities/focus';
import { grid as gridMixin } from '../utilities/grid';
import { breakpointsMap, mediaQuery } from '../utilities/media-query';
import { skeleton } from '../utilities/skeleton';
import { proseHeadingHelper, proseTextHelper, typography } from '../utilities/typography';
import { flatten, renderNode } from './render';

/** A blank-line separator between sections within a partial (an empty raw node). */
const blank: ScssRaw = { raw: '' };

const borderFile: ScssFileMeta = {
  file: `_${namespace.border}.scss`,
  description: 'The border radius scale plus the deprecated `$pds-border-*` aliases.',
  nodes: [...flatten(border)],
};

const blurFile: ScssFileMeta = {
  file: '_blur.scss',
  description: 'The frosted blur variable plus the deprecated `pds-frosted-glass` mixin.',
  nodes: [...flatten(blur)],
};

const breakpointFile: ScssFileMeta = {
  file: `_${namespace.breakpoint}.scss`,
  description: 'The responsive breakpoint scale plus the deprecated `$pds-breakpoint-*` aliases.',
  nodes: [...flatten(breakpoint)],
};

const shadowFile: ScssFileMeta = {
  file: '_shadow.scss',
  description: 'The shadow scale plus the deprecated `pds-drop-shadow-*` mixins.',
  nodes: [...flatten(shadow)],
};

const spacingFile: ScssFileMeta = {
  file: '_spacing.scss',
  description: 'The fluid and static spacing scales plus the deprecated `$pds-spacing-*` aliases.',
  nodes: [...flatten(spacing)],
};

const motionFile: ScssFileMeta = {
  file: `_${namespace.motion}.scss`,
  description: 'The duration and easing scales plus the deprecated `$pds-motion-*` aliases.',
  nodes: [...flatten(motion)],
};

const gradientFile: ScssFileMeta = {
  file: '_gradient.scss',
  description: 'The `$gradient-stops-fade-dark` color stops plus the deprecated `pds-gradient-to-*` mixins.',
  nodes: [...flatten(gradient)],
};

const colorFile: ScssFileMeta = {
  file: `_${namespace.color}.scss`,
  description: 'The `$color-*` scale plus the `color-scheme()` mixin and deprecated `$pds-theme-*` aliases.',
  nodes: [...flatten(color), blank, colorSchemeMixin],
};

const { family, weight, lineHeight, size, ...fontAliases } = font;
const fontFile: ScssFileMeta = {
  file: `_${namespace.font}.scss`,
  description:
    'The typography scale, weights and families plus the `cjk-font-family` helper mixin and `$pds-font-*` aliases.',
  nodes: [
    ...flatten(family),
    blank,
    cjkFontFamily,
    blank,
    ...flatten(lineHeight),
    blank,
    ...flatten(size),
    blank,
    ...flatten(weight),
    blank,
    ...flatten(Object.values(fontAliases)),
  ],
};

const skeletonFile: ScssFileMeta = {
  file: '_skeleton.scss',
  description: 'The `skeleton()` loading-placeholder mixin plus the deprecated `pds-skeleton` variant.',
  uses: [namespace.border, namespace.color, namespace.motion],
  nodes: [...flatten(skeleton)],
};

const focusFile: ScssFileMeta = {
  file: '_focus.scss',
  description: 'The `focus-visible()` mixin plus the deprecated `pds-focus` variant and its lookup maps.',
  uses: [namespace.border, namespace.color, 'sass:map'],
  nodes: [focusMaps, blank, ...flatten(focus)],
};

const headingFile: ScssFileMeta = {
  file: `_${namespace.heading}.scss`,
  description: 'The `prose-heading-*` mixins plus the `-prose-heading` helper and `pds-heading-*` aliases.',
  uses: [namespace.font, namespace.color],
  nodes: [proseHeadingHelper, blank, ...flatten(typography.heading)],
};

const textFile: ScssFileMeta = {
  file: '_text.scss',
  description: 'The `prose-text-*` mixins plus the `-prose-text` helper and `pds-text-*` aliases.',
  uses: [namespace.font, namespace.color],
  nodes: [proseTextHelper, blank, ...flatten(typography.text)],
};

const displayFile: ScssFileMeta = {
  file: '_display.scss',
  description: 'The deprecated `pds-display-*` aliases routed through the `prose-heading-*` mixins.',
  uses: [namespace.heading],
  nodes: [...flatten(typography.display)],
};

const mediaQueryFile: ScssFileMeta = {
  file: '_media-query.scss',
  description: 'The `media-query-*` mixins plus the `$pds-breakpoints` map and deprecated `pds-media-query-*` aliases.',
  uses: [namespace.breakpoint, 'sass:map'],
  nodes: [breakpointsMap, blank, ...flatten(mediaQuery)],
};

// The grid mixin plus one descriptor per `_grid-*.scss` partial: the area-grouped `gridGroups` tree is
// sliced back into the original per-partial split (line tokens/spans separate from offsets).
const gridFile: ScssFileMeta = {
  file: '_grid.scss',
  description: 'The `pds-grid` responsive layout mixin (the Porsche Grid).',
  nodes: [...flatten(gridMixin)],
};

const gridGapFile: ScssFileMeta = {
  file: '_grid-gap.scss',
  description: 'The `$pds-grid-gap` variable.',
  nodes: [...flatten(gridGroups.gap)],
};

const gridFullFile: ScssFileMeta = {
  file: '_grid-full.scss',
  description: 'The `full` area column-start/end variables.',
  nodes: [...flatten([gridGroups.full.start, gridGroups.full.end])],
};

const gridFullOffsetFile: ScssFileMeta = {
  file: '_grid-full-offset.scss',
  description: 'The `full` area offset variable.',
  nodes: [...flatten(gridGroups.full.offset)],
};

const gridWideFile: ScssFileMeta = {
  file: '_grid-wide.scss',
  description: 'The `wide` area column-start/end variables.',
  nodes: [...flatten([gridGroups.wide.start, gridGroups.wide.end])],
};

const gridWideOffsetFile: ScssFileMeta = {
  file: '_grid-wide-offset.scss',
  description: 'The `wide` area offset variables.',
  nodes: [...flatten([gridGroups.wide.offsetBase, gridGroups.wide.offsetS, gridGroups.wide.offsetXXL])],
};

const gridExtendedFile: ScssFileMeta = {
  file: '_grid-extended.scss',
  description: 'The `extended` area column-start/end and span variables.',
  nodes: [...flatten([gridGroups.extended.start, gridGroups.extended.end, gridGroups.extended.span])],
};

const gridExtendedOffsetFile: ScssFileMeta = {
  file: '_grid-extended-offset.scss',
  description: 'The `extended` area offset variables.',
  nodes: [...flatten([gridGroups.extended.offsetBase, gridGroups.extended.offsetS, gridGroups.extended.offsetXXL])],
};

const gridBasicFile: ScssFileMeta = {
  file: '_grid-basic.scss',
  description: 'The `basic` area column-start/end and span variables.',
  nodes: [...flatten([gridGroups.basic.start, gridGroups.basic.end, gridGroups.basic.span])],
};

const gridBasicOffsetFile: ScssFileMeta = {
  file: '_grid-basic-offset.scss',
  description: 'The `basic` area offset variables.',
  nodes: [...flatten([gridGroups.basic.offsetBase, gridGroups.basic.offsetS, gridGroups.basic.offsetXXL])],
};

const gridNarrowFile: ScssFileMeta = {
  file: '_grid-narrow.scss',
  description: 'The `narrow` area column-start/end and span variables.',
  nodes: [...flatten([gridGroups.narrow.start, gridGroups.narrow.end, gridGroups.narrow.span])],
};

const gridNarrowOffsetFile: ScssFileMeta = {
  file: '_grid-narrow-offset.scss',
  description: 'The `narrow` area offset variables.',
  nodes: [...flatten([gridGroups.narrow.offsetBase, gridGroups.narrow.offsetS, gridGroups.narrow.offsetXXL])],
};

/** Every partial the index forwards, in build order. The grid* descriptors keep their per-partial split. */
const partialFiles: ScssFileMeta[] = [
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
];

// Derived from `partialFiles` so the forwards can never drift from the partials that exist.
// `_grid-full-offset.scss` → `grid-full-offset`: strip the leading `_` and the `.scss` extension.
const indexFile: ScssFileMeta = {
  file: '_index.scss',
  description: 'The `@forward` index re-exporting every partial under the `pds.*` namespace.',
  nodes: [{ raw: partialFiles.map(({ file }) => `@forward '${file.slice(1, -'.scss'.length)}';`).join('\n') }],
};

/** The composition layer: ordered per-file descriptors interleaving `scssMeta` and `scssDeprecationsMeta` entries with plumbing. The build renders each to `dist/<file>`. */
export const scssFileMeta: ScssFileMeta[] = [...partialFiles, indexFile];

/** Render a file descriptor to its SCSS string: optional `@use` headers, then the ordered nodes. */
export const renderScssFile = ({ uses, nodes }: ScssFileMeta): string => {
  const header = uses?.length ? `${uses.map((name) => `@use '${name}';`).join('\n')}\n\n` : '';
  return header + nodes.map(renderNode).join('\n');
};
