import { getButtonPureAriaAttributes, warnIfIsLoadingAndIconIsNone } from './button-pure-utils';

describe('warnIfIsLoadingAndIconIsNone()', () => {
  it('should print warning if property icon = none, iconSource = "" and loading = true', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const host = document.createElement('p-button-pure');

    warnIfIsLoadingAndIconIsNone(host, true, 'highway', '');
    warnIfIsLoadingAndIconIsNone(host, true, 'none', 'custom.svg');
    warnIfIsLoadingAndIconIsNone(host, false, 'none', '');

    expect(spy).not.toBeCalled();

    warnIfIsLoadingAndIconIsNone(host, true, 'none', '');

    expect(spy).toBeCalledTimes(1);
  });
});

describe('getButtonPureAriaAttributes()', () => {
  it.each<Parameters<typeof getButtonPureAriaAttributes>>([
    [false, false, {}],
    [true, false, {}],
    [false, true, {}],
    [true, true, {}],
    [false, false, {}],
    [
      true,
      true,
      {
        'aria-label': 'Some more detailed label',
        'aria-expanded': true,
        'aria-haspopup': true,
        'aria-pressed': true,
      },
    ],
  ])('should return correct aria attributes for isDisabled: %s, isLoading: %s and aria: %s', (...args) => {
    expect(getButtonPureAriaAttributes(...args)).toMatchSnapshot();
  });
});
