import { getComponentCss } from './flyout-multilevel-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'light'],
    [true, 'light'],
    [false, 'dark'],
    [true, 'dark'],
    [false, 'auto'],
    [true, 'auto'],
  ])('should return correct css for isSecondaryScrollerVisible: %s and theme: %s', (...args) => {
    // TODO: Use validateCssAndMatchSnapshot when visibility is changed to inherit
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
