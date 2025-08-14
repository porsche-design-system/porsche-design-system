import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'center', false, 'light'],
    [false, false, 'center', false, 'dark'],
    [false, false, 'center', false, 'light'],
    [false, false, 'center', false, 'dark'],
    [false, false, 'top', true, 'light'],
    [true, false, undefined, true, 'light'],
    [false, true, undefined, true, 'dark'],
    [true, true, undefined, true, 'light'],
  ])(
    'should return correct css for isNextHidden: %s, isPrevHidden: %s, scrollIndicatorPosition: %s, hasScrollbar: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
