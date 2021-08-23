import { warnIfIconIsNoneAndIsLoading } from './button-pure-utils';

describe('warnIfIconIsNoneAndIsLoading()', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  it('should print warning if property icon = none and loading = true', () => {
    const host = document.createElement('p-button-pure');

    warnIfIconIsNoneAndIsLoading(host, 'none', true);
    warnIfIconIsNoneAndIsLoading(host, 'highway', true);
    warnIfIconIsNoneAndIsLoading(host, 'none', false);

    expect(console.warn).toBeCalledTimes(1);
  });
});
