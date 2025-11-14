// import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './drilldown-link-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, 'light'],
    [true, false, 'light'],
    [false, false, 'light'],
    [false, true, 'light'],
    [true, true, 'dark'],
    [true, true, 'auto'],
    [false, true, 'dark'],
    [false, true, 'auto'],
  ])('should return correct css for hasSlottedAnchor: %s, isActive: %s and theme: %s', (...args) => {
    // validateCssAndMatchSnapshot(getComponentCss(...args));
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
