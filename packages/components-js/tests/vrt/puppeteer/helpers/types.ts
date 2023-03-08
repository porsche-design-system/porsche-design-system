import type { TagName } from '@porsche-design-system/shared';

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export type Component = Split<TagName, 'p-'>[1] | 'toast-basic' | 'overview';
