import { getButtonAriaAttributes, warnIfIsLoadingAndIconIsNone } from './button-pure-utils';

describe('warnIfIsLoadingAndIconIsNone()', () => {
  it('should print warning if property icon = none and loading = true', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const host = document.createElement('p-button-pure');

    warnIfIsLoadingAndIconIsNone(host, true, 'highway');
    warnIfIsLoadingAndIconIsNone(host, false, 'none');

    expect(spy).not.toBeCalled();

    warnIfIsLoadingAndIconIsNone(host, true, 'none');

    expect(spy).toBeCalledTimes(1);
  });
});

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getButtonAriaAttributes>>([
    [false, false, false, {}],
    [true, false, false, {}],
    [false, true, false, {}],
    [true, true, false, {}],
    [false, false, true, {}],
    [
      true,
      true,
      false,
      {
        'aria-label': 'Some more detailed label',
        'aria-expanded': true,
        'aria-haspopup': true,
        'aria-pressed': true,
      },
    ],
  ])(
    'should return correct aria attributes for isDisabled: %s, isLoading: %s, hasSubline: %s and aria: %s',
    (...args) => {
      expect(getButtonAriaAttributes(...args)).toMatchSnapshot();
    }
  );
});
