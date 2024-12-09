import { getComponentCss } from './flyout-multilevel-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, true, 'light'],
    [true, true, false, 'light'],
    [true, false, true, 'light'],
    [false, true, true, 'light'],
    [true, false, false, 'light'],
    [false, true, false, 'light'],
    [false, false, true, 'auto'],
    [false, false, false, 'dark'],
  ])('should return correct css for isPrimary: %s, isSecondary: %s, isCascade: %s and theme: %s', (...args) => {
    // TODO: Adjust and use validateCssAndMatchSnapshot
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
