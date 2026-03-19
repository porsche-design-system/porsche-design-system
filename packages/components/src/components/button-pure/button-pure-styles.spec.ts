import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import type { AlignLabel, BreakpointCustomizable } from '../../types';
import { getComponentCss } from './button-pure-styles';
import type { ButtonPureSize } from './button-pure-utils';

describe('getComponentCss()', () => {
  const breakpointCustomizableBoolean = { base: true, xs: false, s: true, m: false, l: true, xl: false };
  const breakpointCustomizableSize: BreakpointCustomizable<ButtonPureSize> = {
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
    ['arrow-head-right', '', false, false, false, false, false, 'sm', 'primary', false, 'end', false],
    ['arrow-head-right', '', false, false, false, false, false, 'sm', 'primary', false, 'right', false],
    ['arrow-head-right', '', false, false, false, false, false, 'sm', 'primary', false, 'left', false],
    ['arrow-head-right', '', false, false, false, true, false, 'sm', 'primary', false, 'end', false],
    ['none', '', false, false, true, true, false, 'sm', 'primary', false, 'end', false],
    ['arrow-head-right', '', false, false, false, true, false, 'sm', 'primary', false, 'end', false],
    ['arrow-head-right', '', true, false, false, true, false, 'sm', 'primary', false, 'end', false],
    ['arrow-head-right', '', false, false, false, false, false, 'sm', 'primary', false, 'end', true],
    ['arrow-head-right', '', true, false, false, false, true, 'xl', 'primary', false, 'start', false],
    ['arrow-head-right', '', true, false, false, false, true, 'xl', 'primary', false, 'start', false],
    ['arrow-head-right', '', false, false, false, false, false, 'sm', 'primary', true, 'end', false],
    ['arrow-head-right', '', false, false, false, false, false, 'sm', 'primary', true, 'end', false],
    [
      'arrow-head-right',
      '',
      false,
      false,
      false,
      false,
      false,
      'sm',
      'primary',
      breakpointCustomizableBoolean,
      'end',
      false,
    ],
    ['none', '', false, false, false, false, false, 'sm', 'primary', false, 'end', false],
    ['none', '', false, false, false, false, false, 'inherit', 'primary', false, 'end', false],
    ['none', '', false, true, false, false, false, breakpointCustomizableSize, 'primary', false, 'end', false],
    [
      'arrow-head-right',
      '',
      false,
      true,
      false,
      false,
      breakpointCustomizableBoolean,
      breakpointCustomizableSize,
      'primary',
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
      color,
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
          color,
          hideLabel,
          alignLabel,
          underline
        )
      );
    }
  );
});
