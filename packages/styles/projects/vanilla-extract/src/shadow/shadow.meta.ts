import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';

export const shadowMeta = {
  shadowSm: { name: 'shadowSm', value: shadowSm, description: 'Holds a **small** `box-shadow`.' },
  shadowMd: { name: 'shadowMd', value: shadowMd, description: 'Holds a **medium** `box-shadow`.' },
  shadowLg: { name: 'shadowLg', value: shadowLg, description: 'Holds a **large** `box-shadow`.' },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowMd instead. */
const deprecatedDropShadowMediumStyleMeta = {
  name: 'dropShadowMediumStyle',
  value: { boxShadow: shadowMd } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowMd instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowLg instead. */
const deprecatedDropShadowHighStyleMeta = {
  name: 'dropShadowHighStyle',
  value: { boxShadow: shadowLg } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowLg instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowSm instead. */
const deprecatedDropShadowLowStyleMeta = {
  name: 'dropShadowLowStyle',
  value: { boxShadow: shadowSm } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowSm instead.',
};

export const deprecatedShadowMeta = {
  dropShadowMediumStyle: deprecatedDropShadowMediumStyleMeta,
  dropShadowHighStyle: deprecatedDropShadowHighStyleMeta,
  dropShadowLowStyle: deprecatedDropShadowLowStyleMeta,
} as const;
