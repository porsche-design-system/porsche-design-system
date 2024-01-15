import { getComponentCss } from './link-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['arrow-right', '', 'primary', false, true, 'light'],
    ['arrow-right', '', 'primary', false, true, 'dark'],
    ['arrow-right', '', 'secondary', false, true, 'light'],
    ['arrow-right', '', 'secondary', false, true, 'dark'],
    ['arrow-right', '', 'tertiary', false, true, 'light'],
    ['arrow-right', '', 'tertiary', false, true, 'dark'],
    ['arrow-right', '', 'primary', false, false, 'light'],
    ['arrow-right', '', 'primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, false, 'dark'],
    ['none', '', 'primary', false, true, 'light'],
  ])(
    'should return correct css for icon: %s, iconSource: %s, variant: %s, hideLabel: %s, hasSlottedAnchor: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
