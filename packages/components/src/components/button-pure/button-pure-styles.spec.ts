import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import type { AlignLabel, BreakpointCustomizable, TextSize } from '../../types';
import { getComponentCss } from './button-pure-styles';

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
    ['arrow-head-right', '', false, false, false, false, false, 'small', false, 'end', false],
    ['arrow-head-right', '', false, false, false, false, false, 'small', false, 'right', false],
    ['arrow-head-right', '', false, false, false, false, false, 'small', false, 'left', false],
    ['arrow-head-right', '', false, false, false, true, false, 'small', false, 'end', false],
    ['none', '', false, false, true, true, false, 'small', false, 'end', false],
    ['arrow-head-right', '', false, false, false, true, false, 'small', false, 'end', false],
    ['arrow-head-right', '', true, false, false, true, false, 'small', false, 'end', false],
    ['arrow-head-right', '', false, false, false, false, false, 'small', false, 'end', true],
    ['arrow-head-right', '', true, false, false, false, true, 'x-large', false, 'start', false],
    ['arrow-head-right', '', true, false, false, false, true, 'x-large', false, 'start', false],
    ['arrow-head-right', '', false, false, false, false, false, 'small', true, 'end', false],
    ['arrow-head-right', '', false, false, false, false, false, 'small', true, 'end', false],
    ['arrow-head-right', '', false, false, false, false, false, 'small', breakpointCustomizableBoolean, 'end', false],
    ['none', '', false, false, false, false, false, 'small', false, 'end', false],
    ['none', '', false, false, false, false, false, 'inherit', false, 'end', false],
    ['none', '', false, true, false, false, false, breakpointCustomizableSize, false, 'end', false],
    [
      'arrow-head-right',
      '',
      false,
      true,
      false,
      false,
      breakpointCustomizableBoolean,
      breakpointCustomizableSize,
      breakpointCustomizableBoolean,
      breakpointCustomizableAlignLabel,
      true,
    ],
  ])(
    'should return correct css for %j',
    (
      icon,
      iconSource,
      active,
      isDisabled,
      isLoading,
      isDisabledOrLoading,
      stretch,
      size,
      hideLabel,
      alignLabel,
      underline
    ) => {
      validateCssAndMatchSnapshot(
        getComponentCss(
          icon,
          iconSource,
          active,
          isDisabled,
          isLoading,
          isDisabledOrLoading,
          stretch,
          size,
          hideLabel,
          alignLabel,
          underline
        )
      );
    }
  );
});
