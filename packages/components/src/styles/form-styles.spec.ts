import { getSlottedTextFieldTextareaSelectStyles, getUnitCounterJssStyle } from './form-styles';

describe('getSlottedTextFieldTextareaSelectStyles()', () => {
  it.each<Parameters<typeof getSlottedTextFieldTextareaSelectStyles>>([
    ['input', 'none', false, 'light', undefined],
    ['input', 'none', true, 'light', undefined],
    ['input', 'success', false, 'light', undefined],
    ['input', 'error', false, 'light', undefined],
    ['select', 'none', false, 'dark', undefined],
    ['select', 'success', false, 'dark', undefined],
    ['select', 'error', false, 'dark', undefined],
    ['textarea', 'none', false, 'dark', undefined],
    ['textarea', 'success', false, 'dark', undefined],
    ['textarea', 'error', false, 'dark', undefined],
    ['textarea', 'error', false, 'dark', { bottom: 5 }],
  ])(
    'should return correct jss style for child: %s, state: %s, isLoading: %s, theme: %s and additionalDefaultJssStyle: %o',
    (...args) => {
      expect(getSlottedTextFieldTextareaSelectStyles(...args)).toMatchSnapshot();
    }
  );
});

describe('getUnitCounterJssStyle()', () => {
  it.each<Parameters<typeof getUnitCounterJssStyle>>([
    [false, 'light'],
    [true, 'light'],
    [false, 'dark'],
    [true, 'dark'],
    [false, 'auto'],
    [true, 'auto'],
  ])('should return correct jss style for isDisabled: %s and theme: %s', (...args) => {
    expect(getUnitCounterJssStyle(...args)).toMatchSnapshot();
  });
});
