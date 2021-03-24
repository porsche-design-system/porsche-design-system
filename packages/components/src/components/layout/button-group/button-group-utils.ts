import type { BreakpointCustomizable } from '../../../types';
import type { FlexDirectionType } from '../flex/flex/flex-utils';

export type ButtonGroupDirection = BreakpointCustomizable<Extract<FlexDirectionType, 'row' | 'column'>>;
