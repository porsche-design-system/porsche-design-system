import { getComponentCss } from './segmented-control-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, true, 'light'],
    [true, false, true, 'light'],
    [true, true, true, 'light'],
    [false, true, true, 'light'],
    [false, false, false, 'light'],
    [false, false, false, 'dark'],
  ])('should return correct css for isDisabled: %s, isSelected: %s, bgColor: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
