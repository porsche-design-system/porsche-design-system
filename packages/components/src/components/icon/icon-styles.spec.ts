import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './icon-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['360', '', 'primary', 'small'],
    ['arrow-head-left', '', 'primary', 'small'],
    ['arrow-head-left', 'some-custom.svg', 'primary', 'small'],
    ['360', '', 'primary', 'small'],
    ['360', '', 'contrast-low', 'small'],
    ['360', '', 'contrast-low', 'small'],
    ['360', '', 'contrast-medium', 'small'],
    ['360', '', 'contrast-medium', 'small'],
    ['360', '', 'contrast-high', 'small'],
    ['360', '', 'contrast-high', 'small'],
    ['360', '', 'success', 'small'],
    ['360', '', 'success', 'small'],
    ['360', '', 'warning', 'small'],
    ['360', '', 'warning', 'small'],
    ['360', '', 'error', 'small'],
    ['360', '', 'error', 'small'],
    ['360', '', 'info', 'small'],
    ['360', '', 'info', 'small'],
    ['360', '', 'primary', 'xx-small'],
    ['360', '', 'primary', 'x-small'],
    ['360', '', 'primary', 'medium'],
    ['360', '', 'primary', 'large'],
    ['360', '', 'primary', 'x-large'],
    ['360', '', 'primary', 'inherit'],
    ['360', '', 'inherit', 'small'],
    ['360', '', 'inherit', 'small'],
  ])('should return correct css for name: %s, source: %s, color: %s and size: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
