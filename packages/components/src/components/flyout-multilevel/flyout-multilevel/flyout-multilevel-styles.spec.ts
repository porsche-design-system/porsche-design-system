import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './flyout-multilevel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, true, 'light'],
    [true, true, false, 'light'],
    [true, false, true, 'light'],
    [true, false, false, 'light'],
    [true, true, true, 'dark'],
    [true, true, true, 'auto'],
    [false, true, true, 'light'],
  ])(
    'should return correct css for isOpen: %s, isPrimary: %s, isSecondaryScrollerVisible: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
