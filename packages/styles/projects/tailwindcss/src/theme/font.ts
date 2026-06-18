import {
  fontPorscheNext,
  fontPorscheNextJa,
  fontPorscheNextKo,
  fontPorscheNextZhHans,
  fontPorscheNextZhHant,
} from '@porsche-design-system/tokens';
import type { CssRule } from '../types';

// The "Bridge Variable" pointing the Tailwind `--font-porsche-next` theme variable
// to the dynamic, locale-aware font stack. Shared as a single source so the base
// layer and the typography theme variable stay in sync.
export const fontPorscheNextDynamicVar = '--_font-porsche-next-dynamic';

// The `@layer base` block defining the dynamic Porsche Next font variable and its
// language-specific overrides. The `:root, :host` rule provides the default font,
// while the `:lang(…)` rules switch the variable for CJK locales.
//
// Tailwind v4 won't add a prefix to variables defined outside the `@theme` block,
// so we override the "Bridge Variable" here. Since the Tailwind theme variable
// points to `--_font-porsche-next-dynamic`, the font updates even if the utility
// class is prefixed.
export const fontBaseLayer: CssRule = {
  selector: '@layer base',
  declarations: [
    {
      raw: `/*
    Tailwind v4 won't add a prefix to variables defined outside the @theme block.
    We override the "Bridge Variable". Since the Tailwind theme variable
    points here, the font will update even if the utility class is prefixed.
  */`,
    },
    {
      selector: ':root, :host',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNext }],
    },
    {
      comment: 'Simplified Chinese',
      selector: ':lang(zh-Hans),\n:lang(zh-CN),\n:lang(zh-SG)',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNextZhHans }],
    },
    {
      comment: 'Traditional Chinese',
      selector: ':lang(zh-Hant),\n:lang(zh-TW),\n:lang(zh-HK),\n:lang(zh-MO)',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNextZhHant }],
    },
    {
      comment: 'Japanese',
      selector: ':lang(ja)',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNextJa }],
    },
    {
      comment: 'Korean',
      selector: ':lang(ko)',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNextKo }],
    },
  ],
};

