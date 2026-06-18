import {
  dropShadowHighStyle,
  dropShadowLowStyle,
  dropShadowMediumStyle,
  shadowLg,
  shadowMd,
  shadowSm,
} from '../src/shadow/';
import type { EmotionMeta } from './meta.types';

export const shadowMeta: EmotionMeta = {
  shadowSm: { name: 'shadowSm', description: 'Holds a **small** `shadow`.', value: shadowSm },
  shadowMd: { name: 'shadowMd', description: 'Holds a **medium** `shadow`.', value: shadowMd },
  shadowLg: { name: 'shadowLg', description: 'Holds a **large** `shadow`.', value: shadowLg },
  /** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowMd instead. */
  dropShadowMediumStyle: {
    name: 'dropShadowMediumStyle',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowMd instead.',
    value: dropShadowMediumStyle,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowLg instead. */
  dropShadowHighStyle: {
    name: 'dropShadowHighStyle',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowLg instead.',
    value: dropShadowHighStyle,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowSm instead. */
  dropShadowLowStyle: {
    name: 'dropShadowLowStyle',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use boxShadow: shadowSm instead.',
    value: dropShadowLowStyle,
    deprecated: true,
  },
} as const;
