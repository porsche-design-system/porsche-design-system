import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [undefined, undefined, false, false, false],
    [false, false, false, false, false],
    [true, false, false, false, false],
    [false, true, false, false, false],
    [true, true, false, false, false],
    [true, true, true, false, false],
    [true, true, true, true, false],
    [true, true, true, true, true],
  ])(
    'should return correct css for isIndicatorPrevVisible: %s, isIndicatorNextVisible: %s, isSticky: %s, hasScrollbar: %s, isCompact: %s',
    async (...args) => {
      await validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
