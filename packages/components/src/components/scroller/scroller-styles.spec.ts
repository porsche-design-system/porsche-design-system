import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'center', false],
    [false, false, 'center', false],
    [false, false, 'center', false],
    [false, false, 'center', false],
    [false, false, 'top', true],
    [true, false, undefined, true],
    [false, true, undefined, true],
    [true, true, undefined, true],
  ])(
    'should return correct css for isNextHidden: %s, isPrevHidden: %s, scrollIndicatorPosition: %s and hasScrollbar: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
