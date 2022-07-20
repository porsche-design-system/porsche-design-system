import { BreakpointCustomizable } from '../../../../utils';

export type FlexInlineType = boolean;
export type FlexInline = BreakpointCustomizable<FlexInlineType>;

export const FLEX_WRAPS = ['nowrap', 'wrap', 'wrap-reverse'] as const;
export type FlexWrapType = typeof FLEX_WRAPS[number];
export type FlexWrap = BreakpointCustomizable<FlexWrapType>;

export const FLEX_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
export type FlexDirectionType = typeof FLEX_DIRECTIONS[number];
export type FlexDirection = BreakpointCustomizable<FlexDirectionType>;

export const FLEX_JUSTIFY_CONTENTS = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
export type FlexJustifyContentType = typeof FLEX_JUSTIFY_CONTENTS[number];
export type FlexJustifyContent = BreakpointCustomizable<FlexJustifyContentType>;

export const FLEX_ALIGN_ITEMS = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] as const;
export type FlexAlignItemsType = typeof FLEX_ALIGN_ITEMS[number];
export type FlexAlignItems = BreakpointCustomizable<FlexAlignItemsType>;

export const FLEX_ALIGN_CONTENTS = [
  'stretch',
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
export type FlexAlignContentType = typeof FLEX_ALIGN_CONTENTS[number];
export type FlexAlignContent = BreakpointCustomizable<FlexAlignContentType>;
