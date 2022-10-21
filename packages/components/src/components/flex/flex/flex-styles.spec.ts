import { getComponentCss } from './flex-styles';
import type {
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexInline,
  FlexJustifyContent,
  FlexWrap,
} from './flex-utils';
import {
  FLEX_ALIGN_CONTENTS,
  FLEX_ALIGN_ITEMS,
  FLEX_DIRECTIONS,
  FLEX_JUSTIFY_CONTENTS,
  FLEX_WRAPS,
} from './flex-utils';

describe('getComponentCss()', () => {
  const dataInline: FlexInline[] = [false, true, { base: true, xs: false, s: false, m: true, l: false, xl: true }];
  it.each<FlexInline>(dataInline)('should return correct css for inline: %j', (inline) => {
    expect(getComponentCss(inline, 'nowrap', 'row', 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataWrap: FlexWrap[] = [
    ...FLEX_WRAPS,
    { base: 'nowrap', xs: 'wrap', s: 'nowrap', m: 'wrap', l: 'nowrap', xl: 'wrap' },
  ];
  it.each<FlexWrap>(dataWrap)('should return correct css for wrap: %j', (wrap) => {
    expect(getComponentCss(false, wrap, 'row', 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataDirection: FlexDirection[] = [
    ...FLEX_DIRECTIONS,
    { base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' },
  ];
  it.each<FlexDirection>(dataDirection)('should return correct css for direction: %j', (direction) => {
    expect(getComponentCss(false, 'nowrap', direction, 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataJustifyContent: FlexJustifyContent[] = [
    ...FLEX_JUSTIFY_CONTENTS,
    { base: 'flex-start', xs: 'center', s: 'flex-start', m: 'center', l: 'flex-start', xl: 'center' },
  ];
  it.each<FlexJustifyContent>(dataJustifyContent)(
    'should return correct css for justifyContent: %j',
    (justifyContent) => {
      expect(getComponentCss(false, 'nowrap', 'row', justifyContent, 'stretch', 'stretch')).toMatchSnapshot();
    }
  );

  const dataAlignItems: FlexAlignItems[] = [
    ...FLEX_ALIGN_ITEMS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each<FlexAlignItems>(dataAlignItems)('should return correct css for alignItems: %j', (alignItems) => {
    expect(getComponentCss(false, 'nowrap', 'row', 'flex-start', alignItems, 'stretch')).toMatchSnapshot();
  });

  const dataAlignContent: FlexAlignContent[] = [
    ...FLEX_ALIGN_CONTENTS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each<FlexAlignContent>(dataAlignContent)('should return correct css for alignContent: %j', (alignContent) => {
    expect(getComponentCss(false, 'nowrap', 'row', 'flex-start', 'stretch', alignContent)).toMatchSnapshot();
  });

  it('should return correct css for all props being breakpoint customizable', () => {
    expect(
      getComponentCss(
        [...dataInline].pop(),
        [...dataWrap].pop(),
        [...dataDirection].pop(),
        [...dataJustifyContent].pop(),
        [...dataAlignItems].pop(),
        [...dataAlignContent].pop()
      )
    ).toMatchSnapshot();
  });
});
