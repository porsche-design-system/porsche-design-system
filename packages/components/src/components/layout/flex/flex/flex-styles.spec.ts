import { getComponentCss } from './flex-styles';
import type {
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexInline,
  FlexJustifyContent,
  FlexWrap,
} from './flex-utils';
import { FLEX_ALIGN_CONTENTS, FLEX_ALIGN_ITEMS, FLEX_DIRECTION, FLEX_JUSTIFY_CONTENTS, FLEX_WRAPS } from './flex-utils';
import * as jssUtils from './../../../../utils/jss';

describe('getComponentCss()', () => {
  const dataInline: FlexInline[] = [false, true, { base: true, xs: false, s: false, m: true, l: false, xl: true }];
  it.each(dataInline)('should return correct css for inline: %j', (inline: FlexInline) => {
    expect(getComponentCss(inline, 'nowrap', 'row', 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataWrap: FlexWrap[] = [
    ...FLEX_WRAPS,
    { base: 'nowrap', xs: 'wrap', s: 'nowrap', m: 'wrap', l: 'nowrap', xl: 'wrap' },
  ];
  it.each(dataWrap)('should return correct css for wrap: %j', (wrap: FlexWrap) => {
    expect(getComponentCss(false, wrap, 'row', 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataDirection: FlexDirection[] = [
    ...FLEX_DIRECTION,
    { base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' },
  ];
  it.each(dataDirection)('should return correct css for direction: %j', (direction: FlexDirection) => {
    expect(getComponentCss(false, 'nowrap', direction, 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataJustifyContent: FlexJustifyContent[] = [
    ...FLEX_JUSTIFY_CONTENTS,
    { base: 'flex-start', xs: 'center', s: 'flex-start', m: 'center', l: 'flex-start', xl: 'center' },
  ];
  it.each(dataJustifyContent)(
    'should return correct css for justifyContent: %j',
    (justifyContent: FlexJustifyContent) => {
      expect(getComponentCss(false, 'nowrap', 'row', justifyContent, 'stretch', 'stretch')).toMatchSnapshot();
    }
  );

  const dataAlignItems: FlexAlignItems[] = [
    ...FLEX_ALIGN_ITEMS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each(dataAlignItems)('should return correct css for alignItems: %j', (alignItems: FlexAlignItems) => {
    expect(getComponentCss(false, 'nowrap', 'row', 'flex-start', alignItems, 'stretch')).toMatchSnapshot();
  });

  const dataAlignContent: FlexAlignContent[] = [
    ...FLEX_ALIGN_CONTENTS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each(dataAlignContent)('should return correct css for alignContent: %j', (alignContent: FlexAlignContent) => {
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
