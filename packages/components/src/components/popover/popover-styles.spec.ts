import { getComponentCss } from './popover-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['top', false, 'light'],
    ['right', false, 'light'],
    ['bottom', false, 'light'],
    ['left', false, 'light'],
    ['top', false, 'dark'],
    ['right', false, 'dark'],
    ['bottom', false, 'dark'],
    ['left', false, 'dark'],
    ['top', true, 'light'],
  ])('should return correct css for direction: %s, isNative: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
