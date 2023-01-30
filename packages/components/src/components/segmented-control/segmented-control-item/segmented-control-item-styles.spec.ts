import { getComponentCss, getIconFilter } from './segmented-control-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'background-default', 'light'],
    [true, false, 'background-default', 'light'],
    [true, true, 'background-default', 'light'],
    [false, true, 'background-default', 'light'],
    [false, false, 'background-surface', 'light'],
    [false, false, 'background-default', 'dark'],
    [false, false, 'background-surface', 'dark'],
  ])('should return correct css for isDisabled: %s, isSelected: %s, bgColor: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});

describe('getIconFilter()', () => {
  it.each<Parameters<typeof getIconFilter>>([
    ['light', false],
    ['light', true],
    ['dark', false],
    ['dark', true],
  ])('should return correct icon filter for theme: %s and isDisabled: %s', (...args) => {
    expect(getIconFilter(...args)).toMatchSnapshot();
  });
});
