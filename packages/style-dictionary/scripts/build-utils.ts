import { TransformedToken } from 'style-dictionary/types/TransformedToken';
import type { Platform } from 'style-dictionary';

export const MODES = [`light`, `dark`] as const;
export type Mode = typeof MODES[number];

export type CustomPlatform = Platform & { androidPath: string; iosPath: string; mode: Mode };

export const getNonCoreFiles = (token: TransformedToken) => !token.filePath.includes('core');
export const getDarkFiles = (token: TransformedToken) => token.filePath.includes(`.dark`);
export const getColor = (token: TransformedToken) => token.attributes.category === `color`;
