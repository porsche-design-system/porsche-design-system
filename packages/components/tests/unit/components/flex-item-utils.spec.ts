import {
  FLEX_ITEM_ALIGN_SELFS,
  FLEX_ITEM_FLEXES,
  FLEX_ITEM_GROWS,
  FLEX_ITEM_OFFSETS,
  FLEX_ITEM_SHRINKS,
  FLEX_ITEM_WIDTHS,
  FlexItemAlignSelf,
  FlexItemFlex,
  FlexItemGrow,
  FlexItemOffset,
  FlexItemShrink,
  FlexItemWidth,
  getDynamicCss,
} from '../../../src/components/layout/flex/flex-item/flex-item-utils';
import { stringify } from '../helper';

describe('getDynamicCss()', () => {
  const dataWidth: FlexItemWidth[] = [
    ...FLEX_ITEM_WIDTHS,
    { base: 'auto', xs: 'half', s: 'auto', m: 'half', l: 'auto', xl: 'half' },
  ];
  it.each(dataWidth.map(stringify))('should return correct css for width: %s', (width: FlexItemWidth) => {
    expect(getDynamicCss(width, 'none', 'auto', 0, 1, 'initial')).toMatchSnapshot();
  });

  const dataOffset: FlexItemOffset[] = [
    ...FLEX_ITEM_OFFSETS,
    { base: 'one-third', xs: 'half', s: 'one-third', m: 'half', l: 'one-third', xl: 'half' },
  ];
  it.each(dataOffset.map(stringify))('should return correct css for offset: %s', (offset: FlexItemOffset) => {
    expect(getDynamicCss('auto', offset, 'auto', 0, 1, 'initial')).toMatchSnapshot();
  });

  const dataAlignSelf: FlexItemAlignSelf[] = [
    ...FLEX_ITEM_ALIGN_SELFS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each(dataAlignSelf.map(stringify))(
    'should return correct css for alignSelf: %s',
    (alignSelf: FlexItemAlignSelf) => {
      expect(getDynamicCss('auto', 'none', alignSelf, 0, 1, 'initial')).toMatchSnapshot();
    }
  );

  const dataGrow: FlexItemGrow[] = [...FLEX_ITEM_GROWS, { base: 1, xs: 0, s: 1, m: 0, l: 1, xl: 0 }];
  it.each(dataGrow.map(stringify))('should return correct css for grow: %s', (grow: FlexItemGrow) => {
    expect(getDynamicCss('auto', 'none', 'auto', grow, 1, 'initial')).toMatchSnapshot();
  });

  const dataShrink: FlexItemShrink[] = [...FLEX_ITEM_SHRINKS, { base: 0, xs: 1, s: 0, m: 1, l: 0, xl: 1 }];
  it.each(dataShrink.map(stringify))('should return correct css for shrink: %s', (shrink: FlexItemShrink) => {
    expect(getDynamicCss('auto', 'none', 'auto', 0, shrink, 'initial')).toMatchSnapshot();
  });

  const dataFlex: FlexItemFlex[] = [
    ...FLEX_ITEM_FLEXES,
    { base: 'auto', xs: 'equal', s: 'auto', m: 'equal', l: 'auto', xl: 'equal' },
  ];
  it.each(dataFlex.map(stringify))('should return correct css for flex: %s', (flex: FlexItemFlex) => {
    expect(getDynamicCss('auto', 'none', 'auto', 0, 1, flex)).toMatchSnapshot();
  });

  it('should return correct css for all props being breakpoint customizable', () => {
    expect(
      getDynamicCss(
        [...dataWidth].pop(),
        [...dataOffset].pop(),
        [...dataAlignSelf].pop(),
        [...dataGrow].pop(),
        [...dataShrink].pop(),
        [...dataFlex].pop()
      )
    ).toMatchSnapshot();
  });
});
