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
import type { BreakpointCustomizable } from '../../../types';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  const dataInline: BreakpointCustomizable<FlexInline>[] = [
    false,
    true,
    { base: true, xs: false, s: false, m: true, l: false, xl: true },
  ];
  it.each<BreakpointCustomizable<FlexInline>>(dataInline)('should return correct css for inline: %j', (inline) => {
    validateCssAndMatchSnapshot(getComponentCss(inline, 'nowrap', 'row', 'flex-start', 'stretch', 'stretch'));
  });

  const dataWrap: BreakpointCustomizable<FlexWrap>[] = [
    ...FLEX_WRAPS,
    { base: 'nowrap', xs: 'wrap', s: 'nowrap', m: 'wrap', l: 'nowrap', xl: 'wrap' },
  ];
  it.each<BreakpointCustomizable<FlexWrap>>(dataWrap)('should return correct css for wrap: %j', (wrap) => {
    validateCssAndMatchSnapshot(getComponentCss(false, wrap, 'row', 'flex-start', 'stretch', 'stretch'));
  });

  const dataDirection: BreakpointCustomizable<FlexDirection>[] = [
    ...FLEX_DIRECTIONS,
    { base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' },
  ];
  it.each<BreakpointCustomizable<FlexDirection>>(dataDirection)(
    'should return correct css for direction: %j',
    (direction) => {
      validateCssAndMatchSnapshot(getComponentCss(false, 'nowrap', direction, 'flex-start', 'stretch', 'stretch'));
    }
  );

  const dataJustifyContent: BreakpointCustomizable<FlexJustifyContent>[] = [
    ...FLEX_JUSTIFY_CONTENTS,
    { base: 'flex-start', xs: 'center', s: 'flex-start', m: 'center', l: 'flex-start', xl: 'center' },
  ];
  it.each<BreakpointCustomizable<FlexJustifyContent>>(dataJustifyContent)(
    'should return correct css for justifyContent: %j',
    (justifyContent) => {
      validateCssAndMatchSnapshot(getComponentCss(false, 'nowrap', 'row', justifyContent, 'stretch', 'stretch'));
    }
  );

  const dataAlignItems: BreakpointCustomizable<FlexAlignItems>[] = [
    ...FLEX_ALIGN_ITEMS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each<BreakpointCustomizable<FlexAlignItems>>(dataAlignItems)(
    'should return correct css for alignItems: %j',
    (alignItems) => {
      validateCssAndMatchSnapshot(getComponentCss(false, 'nowrap', 'row', 'flex-start', alignItems, 'stretch'));
    }
  );

  const dataAlignContent: BreakpointCustomizable<FlexAlignContent>[] = [
    ...FLEX_ALIGN_CONTENTS,
    { base: 'stretch', xs: 'center', s: 'stretch', m: 'center', l: 'stretch', xl: 'center' },
  ];
  it.each<BreakpointCustomizable<FlexAlignContent>>(dataAlignContent)(
    'should return correct css for alignContent: %j',
    (alignContent) => {
      validateCssAndMatchSnapshot(getComponentCss(false, 'nowrap', 'row', 'flex-start', 'stretch', alignContent));
    }
  );

  it('should return correct css for all props being breakpoint customizable', () => {
    validateCssAndMatchSnapshot(
      getComponentCss(
        [...dataInline].pop(),
        [...dataWrap].pop(),
        [...dataDirection].pop(),
        [...dataJustifyContent].pop(),
        [...dataAlignItems].pop(),
        [...dataAlignContent].pop()
      )
    );
  });
});
