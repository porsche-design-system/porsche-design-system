import { getBaseChildStyles, getLabelStyles } from './form-styles';

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
    ['input', false, 'none', 'light', false],
    ['input', false, 'success', 'light', false],
    ['input', false, 'error', 'light', false],
    ['input', true, 'none', 'light', false],
    ['input', true, 'success', 'light', false],
    ['input', true, 'error', 'light', false],
    ['textarea', false, 'none', 'dark', false],
    ['textarea', false, 'success', 'dark', false],
    ['textarea', false, 'error', 'dark', false],
    ['textarea', true, 'none', 'dark', false],
    ['textarea', true, 'success', 'dark', false],
    ['textarea', true, 'error', 'dark', false],
    [
      'input',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'error',
      'dark',
      { unit: { display: 'block ' } },
    ],
  ])(
    'should return correct css for child: %s, hideLabel: %o, state: %s, theme: %s and additionalRefForInputHover: %s',
    (...args) => {
      expect(getLabelStyles(...args)).toMatchSnapshot();
    }
  );
});
