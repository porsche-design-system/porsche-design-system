import { getComponentCss } from './icon-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['360', '', 'primary', 'small', 'light'],
    ['arrow-head-left', '', 'primary', 'small', 'light'],
    ['arrow-head-left', 'some-custom.svg', 'primary', 'small', 'light'],
    ['360', '', 'primary', 'small', 'dark'],
    ['360', '', 'state-disabled', 'small', 'light'],
    ['360', '', 'state-disabled', 'small', 'dark'],
    ['360', '', 'contrast-low', 'small', 'light'],
    ['360', '', 'contrast-low', 'small', 'dark'],
    ['360', '', 'contrast-medium', 'small', 'light'],
    ['360', '', 'contrast-medium', 'small', 'dark'],
    ['360', '', 'contrast-high', 'small', 'light'],
    ['360', '', 'contrast-high', 'small', 'dark'],
    ['360', '', 'notification-success', 'small', 'light'],
    ['360', '', 'notification-success', 'small', 'dark'],
    ['360', '', 'notification-warning', 'small', 'light'],
    ['360', '', 'notification-warning', 'small', 'dark'],
    ['360', '', 'notification-error', 'small', 'light'],
    ['360', '', 'notification-error', 'small', 'dark'],
    ['360', '', 'notification-info', 'small', 'light'],
    ['360', '', 'notification-info', 'small', 'dark'],
    ['360', '', 'primary', 'xx-small', 'light'],
    ['360', '', 'primary', 'x-small', 'light'],
    ['360', '', 'primary', 'medium', 'light'],
    ['360', '', 'primary', 'large', 'light'],
    ['360', '', 'primary', 'x-large', 'light'],
    ['360', '', 'primary', 'inherit', 'light'],
    ['360', '', 'inherit', 'small', 'light'],
    ['360', '', 'inherit', 'small', 'dark'],
  ])('should return correct css for name: %s, source: %s, color: %s, size: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
