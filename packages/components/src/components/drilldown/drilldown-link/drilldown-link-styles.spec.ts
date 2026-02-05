// import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './drilldown-link-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true],
    [true, false],
    [false, false],
    [false, true],
    [true, true],
    [true, true],
    [false, true],
    [false, true],
  ])('should return correct css for hasSlottedAnchor: %s, isActive: %s and theme: %s', (...args) => {
    // validateCssAndMatchSnapshot(getComponentCss(...args));
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
