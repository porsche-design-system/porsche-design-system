import { getThemedColors, getThemedColorsDarken, getThemedFormStateColors } from './colors';

describe('getThemedColors()', () => {
  it.each<Parameters<typeof getThemedColors>>([['light'], ['dark'], ['light-electric'], ['dark-electric']])(
    'should return correct colors for theme: %s',
    (theme) => {
      expect(getThemedColors(theme)).toMatchSnapshot();
    }
  );
});

describe('getThemedColorsDarken()', () => {
  it.each<Parameters<typeof getThemedColorsDarken>>([['light'], ['dark'], ['light-electric'], ['dark-electric']])(
    'should return correct colors for theme: %s',
    (theme) => {
      expect(getThemedColorsDarken(theme)).toMatchSnapshot();
    }
  );
});

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
