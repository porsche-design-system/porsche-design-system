import { getThemedFormStateColors } from './form-state-color-styles';

describe('getThemedFormStateColors()', () => {
  it.each<Parameters<typeof getThemedFormStateColors>>([
    ['none'],
    ['success'],
    ['error'],
    ['none'],
    ['success'],
    ['error'],
  ])('should return correct colors for theme: %s and state: %s', (...args) => {
    expect(getThemedFormStateColors(...args)).toMatchSnapshot();
  });
});
