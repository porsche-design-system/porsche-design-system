import { getSlottedTextFieldTextareaSelectStyles, getUnitCounterStyles } from './form-styles';

describe('getSlottedTextFieldTextareaSelectStyles()', () => {
  it.each<Parameters<typeof getSlottedTextFieldTextareaSelectStyles>>([
    ['input', 'none', 'light', false, undefined],
    ['input', 'none', 'light', true, undefined],
    ['input', 'success', 'light', false, undefined],
    ['input', 'error', 'light', false, undefined],
    ['select', 'none', 'dark', false, undefined],
    ['select', 'success', 'dark', false, undefined],
    ['select', 'error', 'dark', false, undefined],
    ['textarea', 'none', 'dark', false, undefined],
    ['textarea', 'success', 'dark', false, undefined],
    ['textarea', 'error', 'dark', false, undefined],
    ['textarea', 'error', 'dark', false, { bottom: 5 }],
  ])(
    'should return correct css for child: %s, state: %s, theme: %s, isLoading: %s and additionalDefaultJssStyle: %o',
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
