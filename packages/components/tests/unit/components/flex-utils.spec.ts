import {
  FLEX_ALIGN_CONTENTS,
  FLEX_ALIGN_ITEMS,
  FLEX_DIRECTION,
  FLEX_JUSTIFY_CONTENTS,
  FLEX_WRAPS,
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexInline,
  FlexJustifyContent,
  FlexWrap,
  getDynamicCss,
} from '../../../src/components/layout/flex/flex/flex-utils';
import { stringify } from '../helper';

describe('getDynamicCss()', () => {
  const dataInline: FlexInline[] = [false, true, { base: true, xs: false, s: false, m: true, l: false, xl: true }];
  it.each(dataInline.map(stringify))('should return correct css for inline: %s', (inline: FlexInline) => {
    expect(getDynamicCss(inline, 'nowrap', 'row', 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataWrap: FlexWrap[] = [
    ...FLEX_WRAPS,
    { base: 'nowrap', xs: 'wrap', s: 'nowrap', m: 'wrap', l: 'nowrap', xl: 'wrap' },
  ];
  it.each(dataWrap.map(stringify))('should return correct css for wrap: %s', (wrap: FlexWrap) => {
    expect(getDynamicCss(false, wrap, 'row', 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataDirection: FlexDirection[] = [
    ...FLEX_DIRECTION,
    { base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' },
  ];
  it.each(dataDirection.map(stringify))('should return correct css for direction: %s', (direction: FlexDirection) => {
    expect(getDynamicCss(false, 'nowrap', direction, 'flex-start', 'stretch', 'stretch')).toMatchSnapshot();
  });

  const dataJustifyContent: FlexJustifyContent[] = [
    ...FLEX_JUSTIFY_CONTENTS,
    { base: 'flex-start', xs: 'center', s: 'flex-start', m: 'center', l: 'flex-start', xl: 'center' },
  ];
  it.each(dataJustifyContent.map(stringify))(
    'should return correct css for justifyContent: %s',
    (justifyContent: FlexJustifyContent) => {
      expect(getDynamicCss(false, 'nowrap', 'row', justifyContent, 'stretch', 'stretch')).toMatchSnapshot();
    }
  );

  const dataAlignItems: FlexAlignItems[] = [
    ...FLEX_ALIGN_ITEMS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each(dataAlignItems.map(stringify))(
    'should return correct css for alignItems: %s',
    (alignItems: FlexAlignItems) => {
      expect(getDynamicCss(false, 'nowrap', 'row', 'flex-start', alignItems, 'stretch')).toMatchSnapshot();
    }
  );

  const dataAlignContent: FlexAlignContent[] = [
    ...FLEX_ALIGN_CONTENTS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each(dataAlignContent.map(stringify))(
    'should return correct css for alignContent: %s',
    (alignContent: FlexAlignContent) => {
      expect(getDynamicCss(false, 'nowrap', 'row', 'flex-start', 'stretch', alignContent)).toMatchSnapshot();
    }
  );

  it('should return correct css for all props being breakpoint customizable', () => {
    expect(
      getDynamicCss(
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
