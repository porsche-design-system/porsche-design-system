import { warnIfIsLoadingAndIconIsNone } from './button-pure-utils';

describe('warnIfIsLoadingAndIconIsNone()', () => {
  it('should print warning if property icon = none and loading = true', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const host = document.createElement('p-button-pure');

    warnIfIsLoadingAndIconIsNone(host, true, 'highway');
    warnIfIsLoadingAndIconIsNone(host, false, 'none');

    expect(spy).toBeCalledTimes(0);

    warnIfIsLoadingAndIconIsNone(host, true, 'none');

    expect(spy).toBeCalledTimes(1);
  });
});
