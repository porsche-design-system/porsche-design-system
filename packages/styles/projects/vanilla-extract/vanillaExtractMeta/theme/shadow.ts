import { shadowLg, shadowMd, shadowSm } from '../../src/shadow/';
import type { VanillaExtractMeta } from '../types';

export const shadow = {
  sm: { name: 'shadowSm', description: 'Holds a **small** `shadow`.', value: shadowSm },
  md: { name: 'shadowMd', description: 'Holds a **medium** `shadow`.', value: shadowMd },
  lg: { name: 'shadowLg', description: 'Holds a **large** `shadow`.', value: shadowLg },
} satisfies VanillaExtractMeta['shadow'];
