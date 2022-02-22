import { getThemedFormStateColors } from './form-state-color-styles';

describe('getThemedFormStateColors()', () => {
  it.each<Parameters<typeof getThemedFormStateColors>>([
    ['light', 'none'],
    ['light', 'success'],
    ['light', 'error'],
    ['dark', 'none'],
    ['dark', 'success'],
    ['dark', 'error'],
  ])('should return correct colors for theme: %o and state: %o', (theme, state) => {
    expect(getThemedFormStateColors(theme, state)).toMatchSnapshot();
  });
});
