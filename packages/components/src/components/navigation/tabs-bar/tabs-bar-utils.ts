import type { TextWeight } from '../../../types';

const TAB_SIZE = ['small', 'medium'] as const;
export type TabSize = typeof TAB_SIZE[number];

export type TabChangeEvent = { activeTabIndex: number };
export type TabWeight = Extract<TextWeight, 'regular' | 'semibold'>;
export type TabGradientColorTheme = 'default' | 'surface';
