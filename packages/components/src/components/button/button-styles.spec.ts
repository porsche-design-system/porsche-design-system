import { getComponentCss } from './button-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['arrow-right', '', 'primary', false, false, false, 'light'],
    ['arrow-right', '', 'primary', false, false, false, 'dark'],
    ['arrow-right', '', 'secondary', false, false, false, 'light'],
    ['arrow-right', '', 'secondary', false, false, false, 'dark'],
    ['arrow-right', '', 'tertiary', false, false, false, 'light'],
    ['arrow-right', '', 'tertiary', false, false, false, 'dark'],
    ['arrow-right', '', 'primary', false, true, false, 'light'],
    ['arrow-right', '', 'primary', false, false, false, 'light'],
    ['arrow-right', '', 'primary', false, false, true, 'light'],
    [
      'arrow-right',
      '',
      'primary',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      true,
      false,
      'dark',
    ],
    ['none', '', 'primary', false, true, true, 'light'],
  ])(
    'should return correct css for icon: %s, iconSource: %s, variant: %s, hideLabel: %s, disabled: %s, loading: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
