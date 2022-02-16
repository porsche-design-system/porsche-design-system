import { getBaseChildStyles, getLabelStyles, getThemedFormStateColors } from './form-styles';

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

describe('getBaseChildStyles()', () => {
  it.each<Parameters<typeof getBaseChildStyles>>([
    ['input', 'none', 'light', undefined],
    ['input', 'success', 'light', undefined],
    ['input', 'error', 'light', undefined],
    ['select', 'none', 'dark', undefined],
    ['select', 'success', 'dark', undefined],
    ['select', 'error', 'dark', undefined],
    ['textarea', 'none', 'dark', undefined],
    ['textarea', 'success', 'dark', undefined],
    ['textarea', 'error', 'dark', undefined],
    ['textarea', 'error', 'dark', { bottom: 5 }],
  ])('should return correct css for child: %s, state: %s, theme: %s and additionalDefaultJssStyle: %o', (...args) => {
    expect(getBaseChildStyles(...args)).toMatchSnapshot();
  });
});

describe('getLabelStyles()', () => {
  it.each<Parameters<typeof getLabelStyles>>([
    ['input', false, 'none', 'light', undefined],
    ['input', false, 'success', 'light', undefined],
    ['input', false, 'error', 'light', undefined],
    ['input', true, 'none', 'light', undefined],
    ['input', true, 'success', 'light', undefined],
    ['input', true, 'error', 'light', undefined],
    ['textarea', false, 'none', 'dark', undefined],
    ['textarea', false, 'success', 'dark', undefined],
    ['textarea', false, 'error', 'dark', undefined],
    ['textarea', true, 'none', 'dark', undefined],
    ['textarea', true, 'success', 'dark', undefined],
    ['textarea', true, 'error', 'dark', undefined],
    ['input', { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'error', 'dark', '$unit'],
  ])(
    'should return correct css for child: %s, hideLabel: %o, state: %s, theme: %s and additionalRefForInputHover: %s',
    (...args) => {
      expect(getLabelStyles(...args)).toMatchSnapshot();
    }
  );
});
