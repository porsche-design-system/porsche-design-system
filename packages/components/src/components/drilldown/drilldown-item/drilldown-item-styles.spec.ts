import { getComponentCss } from './drilldown-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, true],
    [true, true, false],
    [true, false, true],
    [false, true, true],
    [true, false, false],
    [false, true, false],
    [false, false, true],
    [false, false, false],
  ])('should return correct css for isPrimary: %s, isSecondary: %s, isCascade: %s and theme: %s', (...args) => {
    // TODO: Adjust and use validateCssAndMatchSnapshot
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
