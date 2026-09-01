import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './button-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['arrow-right', '', 'primary', false, false, false, false],
    ['arrow-right', '', 'primary', false, false, false, false],
    ['arrow-right', '', 'secondary', false, false, false, false],
    ['arrow-right', '', 'secondary', false, false, false, false],
    ['arrow-right', '', 'primary', false, false, false, false],
    ['arrow-right', '', 'primary', false, false, false, false],
    ['arrow-right', '', 'secondary', false, false, false, false],
    ['arrow-right', '', 'secondary', false, false, false, false],
    ['arrow-right', '', 'primary', false, true, false, false],
    ['arrow-right', '', 'primary', false, false, false, false],
    ['arrow-right', '', 'primary', false, false, true, false],
    [
      'arrow-right',
      '',
      'primary',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      true,
      false,
      false,
    ],
    ['none', '', 'primary', false, true, true, false],
    ['arrow-right', '', 'primary', false, false, false, true],
    ['arrow-right', '', 'secondary', false, false, false, true],
    ['arrow-right', '', 'destructive', false, false, false, false],
    ['arrow-right', '', 'destructive', false, true, false, false],
    ['arrow-right', '', 'destructive', false, false, true, false],
    ['arrow-right', '', 'destructive', false, false, false, true],
    // custom padding, gap and radius css variables (--p-button-px, --p-button-py, --p-button-gap, --p-button-radius)
    ['arrow-right', '', 'primary', true, false, false, false],
    ['arrow-right', '', 'primary', true, false, false, true],
    [
      'arrow-right',
      '',
      'primary',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      false,
      false,
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
    ],
  ])(
    'should return correct css for icon: %s, iconSource: %s, variant: %s, hideLabel: %s, disabled: %s, loading: %s and compact: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
