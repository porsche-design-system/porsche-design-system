import { TextWeight } from '../types';

export type SubsetTextWeight = Extract<TextWeight, 'regular' | 'semibold'>;
export const pxToRem = (px: number): number => px / 16;
