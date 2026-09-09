import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './link-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['arrow-right', '', 'primary', false, true, false],
    ['arrow-right', '', 'primary', false, true, false],
    ['arrow-right', '', 'secondary', false, true, false],
    ['arrow-right', '', 'secondary', false, true, false],
    ['arrow-right', '', 'primary', false, false, false],
    ['arrow-right', '', 'primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, false, false],
    ['none', '', 'primary', false, true, false],
    ['arrow-right', '', 'primary', false, true, true],
    // custom padding, gap and radius css variables (--p-link-px, --p-link-py, --p-link-gap, --p-link-radius)
    ['arrow-right', '', 'primary', true, false, false],
    ['arrow-right', '', 'primary', true, true, false],
    ['arrow-right', '', 'primary', true, true, true],
    [
      'arrow-right',
      '',
      'primary',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      true,
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
    ],
  ])(
    'should return correct css for icon: %s, iconSource: %s, variant: %s, hideLabel: %s, hasSlottedAnchor: %s and compact: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
