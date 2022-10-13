import { FontWeight } from '@porsche-design-system/utilities';

export type TileLinkWeight = Extract<'regular' | 'bold', FontWeight>;
export type TileLinkAlign = 'top' | 'bottom';

export const ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type AspectRatio = typeof ASPECT_RATIOS[number];
