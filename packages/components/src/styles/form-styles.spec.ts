import { getSlottedTextFieldTextareaSelectStyles, getUnitCounterStyles } from './form-styles';

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
    'should return correct css for child: %s, state: %s, isLoading: %s, theme: %s and additionalDefaultJssStyle: %o',
    (...args) => {
      expect(getSlottedTextFieldTextareaSelectStyles(...args)).toMatchSnapshot();
    }
  );
});

describe('getUnitCounterStyles()', () => {
  it.each<Parameters<typeof getUnitCounterStyles>>([
    [false, 'light'],
    [true, 'light'],
    [false, 'dark'],
    [true, 'dark'],
    [false, 'auto'],
    [true, 'auto'],
  ])('should return correct css for isDisabled: %s and theme: %s', (...args) => {
    expect(getUnitCounterStyles(...args)).toMatchSnapshot();
  });
});
