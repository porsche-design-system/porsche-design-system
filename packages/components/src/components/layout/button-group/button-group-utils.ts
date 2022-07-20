import type { BreakpointCustomizable } from '../../../types';

export const BUTTON_GROUP_DIRECTIONS = ['row', 'column'] as const;
export type ButtonGroupDirectionType = typeof BUTTON_GROUP_DIRECTIONS[number];
export type ButtonGroupDirection = BreakpointCustomizable<ButtonGroupDirectionType>;
