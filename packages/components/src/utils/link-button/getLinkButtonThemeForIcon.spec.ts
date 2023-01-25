import { getLinkButtonThemeForIcon } from './getLinkButtonThemeForIcon';

describe('getLinkButtonThemeForIcon()', () => {
  it.each<Parameters<typeof getLinkButtonThemeForIcon>>([
    ['primary', 'light'],
    ['primary', 'dark'],
    ['secondary', 'light'],
    ['secondary', 'dark'],
    ['tertiary', 'light'],
    ['tertiary', 'dark'],
  ])('should return correct theme for variant: %s and theme: %s', (...args) => {
    expect(getLinkButtonThemeForIcon(...args)).toMatchSnapshot();
  });
});
