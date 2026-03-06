import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, false, false],
    [true, false, false, false, false],
    [false, true, false, false, false],
    [true, true, false, false, false],
    [true, true, true, false, false],
    [true, true, true, true, false],
    [true, true, true, true, true],
  ])(
    'should return correct css for isIndicatorPrevHidden: %s, isIndicatorNextHidden: %s, isSticky: %s, hasScrollbar: %s, isCompact: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
