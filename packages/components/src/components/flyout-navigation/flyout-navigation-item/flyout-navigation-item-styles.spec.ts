import { getComponentCss } from './flyout-navigation-item-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'light'],
    [true, 'light'],
    [false, 'dark'],
    [true, 'dark'],
    [false, 'auto'],
    [true, 'auto'],
  ])('should return correct css for isSecondaryScrollerVisible: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
