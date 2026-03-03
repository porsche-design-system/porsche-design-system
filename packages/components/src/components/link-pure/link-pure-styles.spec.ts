import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import type { AlignLabel, BreakpointCustomizable, TextSize } from '../../types';
import { getComponentCss } from './link-pure-styles';

describe('getComponentCss()', () => {
  const breakpointCustomizableBoolean = { base: true, xs: false, s: true, m: false, l: true, xl: false };
  const breakpointCustomizableSize: BreakpointCustomizable<TextSize> = {
    base: 'x-small',
    xs: 'small',
    s: 'medium',
    m: 'large',
    l: 'x-large',
    xl: 'inherit',
  };
  const breakpointCustomizableAlignLabel: BreakpointCustomizable<AlignLabel> = {
    base: 'start',
    xs: 'end',
    s: 'start',
    m: 'end',
    l: 'start',
    xl: 'end',
  };

  it.each<Parameters<typeof getComponentCss>>([
    ['arrow-head-right', '', false, false, 'small', false, 'end', false, false],
    ['arrow-head-right', '', false, false, 'small', false, 'right', false, false],
    ['arrow-head-right', '', false, false, 'small', false, 'left', false, false],
    ['arrow-head-right', '', false, false, 'small', false, 'end', true, false],
    ['arrow-head-right', '', false, false, 'small', false, 'end', false, false],
    ['arrow-head-right', '', true, true, 'x-large', false, 'start', false, false],
    ['arrow-head-right', '', true, true, 'x-large', false, 'start', false, false],
    ['arrow-head-right', '', false, false, 'small', true, 'end', false, false],
    ['arrow-head-right', '', false, false, 'small', true, 'end', false, false],
    ['arrow-head-right', '', false, false, 'small', breakpointCustomizableBoolean, 'end', false, false],
    ['none', '', false, false, 'small', false, 'end', false, false],
    ['none', '', false, false, 'inherit', false, 'end', false, false],
    ['arrow-head-right', '', false, false, 'small', false, 'end', false, true],
    ['arrow-head-right', '', false, false, 'small', true, 'end', false, true],
    [
      'arrow-head-right',
      '',
      false,
      breakpointCustomizableBoolean,
      breakpointCustomizableSize,
      breakpointCustomizableBoolean,
      breakpointCustomizableAlignLabel,
      false,
      false,
    ],
  ])(
    'should return correct css for icon: %s, iconSource: %s, active: %s, stretch: %s, size: %s, hideLabel: %s, alignLabel: %s, underline: %s and hasSlottedAnchor: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
