export type FlexInline = boolean;

export const FLEX_WRAPS = ['nowrap', 'wrap', 'wrap-reverse'] as const;
export type FlexWrap = typeof FLEX_WRAPS[number];

export const FLEX_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
export type FlexDirection = typeof FLEX_DIRECTIONS[number];

export const FLEX_JUSTIFY_CONTENTS = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
export type FlexJustifyContent = typeof FLEX_JUSTIFY_CONTENTS[number];

export const FLEX_ALIGN_ITEMS = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] as const;
export type FlexAlignItems = typeof FLEX_ALIGN_ITEMS[number];

export const FLEX_ALIGN_CONTENTS = [
  'stretch',
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
export type FlexAlignContent = typeof FLEX_ALIGN_CONTENTS[number];

export const deprecatedFlexComponentMessage =
  'Please use native CSS Flex (https://css-tricks.com/snippets/css/a-guide-to-flexbox) instead for better performance and more standardized layout technique.';
