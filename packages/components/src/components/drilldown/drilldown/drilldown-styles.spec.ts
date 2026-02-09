// import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './drilldown-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, true],
    [true, true, false],
    [true, false, true],
    [true, false, false],
    [true, true, true],
    [true, true, true],
    [false, true, true],
  ])('should return correct css for isOpen: %s, isPrimary: %s and isSecondaryScrollerVisible: %s', (...args) => {
    // validateCssAndMatchSnapshot(getComponentCss(...args));
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
