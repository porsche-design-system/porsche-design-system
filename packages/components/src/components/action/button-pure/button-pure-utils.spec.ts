import { warnIfIsLoadingAndIconIsNone } from './button-pure-utils';

describe('warnIfIsLoadingAndIconIsNone()', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  it('should print warning if property icon = none and loading = true', () => {
    const host = document.createElement('p-button-pure');

    warnIfIsLoadingAndIconIsNone(host, true, 'none');
    warnIfIsLoadingAndIconIsNone(host, true, 'highway');
    warnIfIsLoadingAndIconIsNone(host, false, 'none');

    expect(console.warn).toBeCalledTimes(1);
  });
});
