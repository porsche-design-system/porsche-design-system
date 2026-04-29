import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './icon-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['360', '', 'primary', 'sm'],
    ['arrow-head-left', '', 'primary', 'sm'],
    ['arrow-head-left', 'some-custom.svg', 'primary', 'sm'],
    ['360', '', 'primary', 'sm'],
    ['360', '', 'contrast-low', 'sm'],
    ['360', '', 'contrast-low', 'sm'],
    ['360', '', 'contrast-medium', 'sm'],
    ['360', '', 'contrast-medium', 'sm'],
    ['360', '', 'contrast-high', 'sm'],
    ['360', '', 'contrast-high', 'sm'],
    ['360', '', 'success', 'sm'],
    ['360', '', 'success', 'sm'],
    ['360', '', 'warning', 'sm'],
    ['360', '', 'warning', 'sm'],
    ['360', '', 'error', 'sm'],
    ['360', '', 'error', 'sm'],
    ['360', '', 'info', 'sm'],
    ['360', '', 'info', 'sm'],
    ['360', '', 'primary', '2xs'],
    ['360', '', 'primary', 'xs'],
    ['360', '', 'primary', 'md'],
    ['360', '', 'primary', 'lg'],
    ['360', '', 'primary', 'xl'],
    ['360', '', 'primary', 'inherit'],
    ['360', '', 'inherit', 'sm'],
    ['360', '', 'inherit', 'sm'],
  ])('should return correct css for name: %s, source: %s, color: %s and size: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
