import { getComponentCss } from './link-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['arrow-right', '', 'primary', false, true, false, 'light'],
    ['arrow-right', '', 'primary', false, true, false, 'dark'],
    ['arrow-right', '', 'secondary', false, true, false, 'light'],
    ['arrow-right', '', 'secondary', false, true, false, 'dark'],
    ['arrow-right', '', 'tertiary', false, true, false, 'light'],
    ['arrow-right', '', 'tertiary', false, true, false, 'dark'],
    ['arrow-right', '', 'ghost', false, true, false, 'light'],
    ['arrow-right', '', 'ghost', false, true, false, 'dark'],
    ['arrow-right', '', 'primary', false, false, false, 'light'],
    [
      'arrow-right',
      '',
      'primary',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      false,
      false,
      'dark',
    ],
    ['none', '', 'primary', false, true, false, 'light'],
    ['arrow-right', '', 'primary', false, true, true, 'light'],
    ['arrow-right', '', 'ghost', false, true, true, 'dark'],
  ])(
    'should return correct css for icon: %s, iconSource: %s, variant: %s, hideLabel: %s, hasSlottedAnchor: %s, compact %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
