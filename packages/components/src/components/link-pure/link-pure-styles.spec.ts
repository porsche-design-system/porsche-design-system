import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import type { AlignLabel, BreakpointCustomizable } from '../../types';
import { getComponentCss } from './link-pure-styles';
import type { LinkPureSize } from './link-pure-utils';

describe('getComponentCss()', () => {
  const breakpointCustomizableBoolean = { base: true, xs: false, s: true, m: false, l: true, xl: false };
  const breakpointCustomizableSize: BreakpointCustomizable<LinkPureSize> = {
    base: 'xs',
    xs: 'sm',
    s: 'md',
    m: 'lg',
    l: 'xl',
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
    ['arrow-head-right', '', false, false, 'sm', 'primary', false, 'end', false, false],
    ['arrow-head-right', '', false, false, 'sm', 'primary', false, 'right', false, false],
    ['arrow-head-right', '', false, false, 'sm', 'primary', false, 'left', false, false],
    ['arrow-head-right', '', false, false, 'sm', 'primary', false, 'end', true, false],
    ['arrow-head-right', '', false, false, 'sm', 'primary', false, 'end', false, false],
    ['arrow-head-right', '', true, true, 'xl', 'primary', false, 'start', false, false],
    ['arrow-head-right', '', true, true, 'xl', 'primary', false, 'start', false, false],
    ['arrow-head-right', '', false, false, 'sm', 'primary', true, 'end', false, false],
    ['arrow-head-right', '', false, false, 'sm', 'primary', true, 'end', false, false],
    ['arrow-head-right', '', false, false, 'sm', 'primary', breakpointCustomizableBoolean, 'end', false, false],
    ['none', '', false, false, 'sm', 'primary', false, 'end', false, false],
    ['none', '', false, false, 'inherit', 'primary', false, 'end', false, false],
    ['arrow-head-right', '', false, false, 'sm', 'primary', false, 'end', false, true],
    ['arrow-head-right', '', false, false, 'sm', 'primary', true, 'end', false, true],
    [
      'arrow-head-right',
      '',
      false,
      breakpointCustomizableBoolean,
      breakpointCustomizableSize,
      'primary',
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
