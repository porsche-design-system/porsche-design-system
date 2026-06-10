import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import type { Meta, MetaEntry } from '../meta.types';

export const shadowMeta: Meta = {
  shadowSm: { name: 'shadowSm', value: shadowSm, description: 'Holds a **small** `shadow`.' },
  shadowMd: { name: 'shadowMd', value: shadowMd, description: 'Holds a **medium** `shadow`.' },
  shadowLg: { name: 'shadowLg', value: shadowLg, description: 'Holds a **large** `shadow`.' },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowMd instead. */
const deprecatedDropShadowMediumStyleMeta: MetaEntry = {
  name: 'dropShadowMediumStyle',
  value: { boxShadow: shadowMd } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowMd instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowLg instead. */
const deprecatedDropShadowHighStyleMeta: MetaEntry = {
  name: 'dropShadowHighStyle',
  value: { boxShadow: shadowLg } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowLg instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowSm instead. */
const deprecatedDropShadowLowStyleMeta: MetaEntry = {
  name: 'dropShadowLowStyle',
  value: { boxShadow: shadowSm } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowSm instead.',
};

export const deprecatedShadowMeta: Meta = {
  dropShadowMediumStyle: deprecatedDropShadowMediumStyleMeta,
  dropShadowHighStyle: deprecatedDropShadowHighStyleMeta,
  dropShadowLowStyle: deprecatedDropShadowLowStyleMeta,
} as const;
