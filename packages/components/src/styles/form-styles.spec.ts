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
    ['input', false, false, 'none', 'light'],
    ['input', false, false, 'success', 'light'],
    ['input', false, false, 'error', 'light'],
    ['input', false, true, 'none', 'light'],
    ['input', false, true, 'success', 'light'],
    ['input', false, true, 'error', 'light'],
    ['input', true, true, 'error', 'light'],
    ['textarea', false, false, 'none', 'dark'],
    ['textarea', false, false, 'success', 'dark'],
    ['textarea', false, false, 'error', 'dark'],
    ['textarea', false, true, 'none', 'dark'],
    ['textarea', false, true, 'success', 'dark'],
    ['textarea', false, true, 'error', 'dark'],
    ['textarea', true, true, 'error', 'dark'],
    [
      'input',
      false,
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
