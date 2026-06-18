import {
  fontPorscheNext,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  typescale2Xl,
  typescale2Xs,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '@porsche-design-system/tokens';
import type { ScssRaw } from '../types';

/**
 * The `cjk-font-family` helper mixin: swaps to the locale-specific Porsche Next font stack based on
 * the nearest `lang` attribute. Plumbing: an internal helper consumed by the prose mixins, still
 * emitted so it stays available, but NOT a documented `scssMeta` entry.
 */
export const cjkFontFamilyMixin: ScssRaw = {
  raw: `@mixin cjk-font-family {
  /* Simplified Chinese */
  &:lang(zh-Hans),
  &:lang(zh-CN),
  &:lang(zh-SG) {
    font-family: $font-porsche-next-zh-hans;
  }

  /* Traditional Chinese */
  &:lang(zh-Hant),
  &:lang(zh-TW),
  &:lang(zh-HK),
  &:lang(zh-MO) {
    font-family: $font-porsche-next-zh-hant;
  }

  /* Japanese */
  &:lang(ja) {
    font-family: $font-porsche-next-ja;
  }

  /* Korean */
  &:lang(ko) {
    font-family: $font-porsche-next-ko;
  }
}`,
};

/**
 * The deprecated `$pds-font-*` aliases. Plumbing: still emitted with identical values, but NOT
 * documented `scssMeta` entries.
 */
export const fontDeprecatedAliases: ScssRaw = {
  raw: [
    `$pds-font-family: ${fontPorscheNext}; /* alias (deprecated) */`,
    '$pds-font-hyphenation-style-overflow-wrap: break-word; /* alias (deprecated) */',
    '$pds-font-hyphenation-style-hyphens: var(--p-hyphens, auto); /* alias (deprecated) */',
    `$pds-font-line-height: ${leadingNormal}; /* alias (deprecated) */`,
    `$pds-font-size-text-xx-small: ${typescale2Xs}; /* alias (deprecated) */`,
    `$pds-font-size-text-x-small: ${typescaleXs}; /* alias (deprecated) */`,
    `$pds-font-size-text-small: ${typescaleSm}; /* alias (deprecated) */`,
    `$pds-font-size-text-medium: ${typescaleMd}; /* alias (deprecated) */`,
    `$pds-font-size-text-large: ${typescaleLg}; /* alias (deprecated) */`,
    `$pds-font-size-text-x-large: ${typescaleXl}; /* alias (deprecated) */`,
    `$pds-font-size-heading-small: ${typescaleSm}; /* alias (deprecated) */`,
    `$pds-font-size-heading-medium: ${typescaleMd}; /* alias (deprecated) */`,
    `$pds-font-size-heading-large: ${typescaleLg}; /* alias (deprecated) */`,
    `$pds-font-size-heading-x-large: ${typescaleXl}; /* alias (deprecated) */`,
    `$pds-font-size-heading-xx-large: ${typescale2Xl}; /* alias (deprecated) */`,
    '$pds-font-size-display-small: clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem); /* alias (deprecated) */',
    '$pds-font-size-display-medium: clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem); /* alias (deprecated) */',
    '$pds-font-size-display-large: clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem); /* alias (deprecated) */',
    '$pds-font-style-normal: normal; /* alias (deprecated) */',
    '$pds-font-style-italic: italic; /* alias (deprecated) */',
    '$pds-font-variant: normal; /* alias (deprecated) */',
    `$pds-font-weight-regular: ${fontWeightNormal}; /* alias (deprecated) */`,
    `$pds-font-weight-semi-bold: ${fontWeightSemibold}; /* alias (deprecated) */`,
    `$pds-font-weight-bold: ${fontWeightBold}; /* alias (deprecated) */`,
  ].join('\n'),
};
