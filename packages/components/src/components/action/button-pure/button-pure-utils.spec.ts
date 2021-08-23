import { throwIfIconIsNoneAndIsLoading } from './button-pure-utils';

describe('throwIfIconIsNoneAndIsLoading()', () => {
  it('should throw error if property icon = none and loading = true', () => {
    const host = document.createElement('p-button-pure');

    let error = undefined;
    try {
      throwIfIconIsNoneAndIsLoading(host, 'none', true);
    } catch (e) {
      error = e.message;
    }
    expect(error).not.toBe(undefined);
  });

  it('should not throw error if icon !== none and loading = true', () => {
    const host = document.createElement('p-button-pure');
    let error = undefined;
    try {
      throwIfIconIsNoneAndIsLoading(host, 'highway', true);
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(undefined);
  });

  it('should not throw error if icon = none and loading = false', () => {
    const host = document.createElement('p-button-pure');
    let error = undefined;
    try {
      throwIfIconIsNoneAndIsLoading(host, 'none', false);
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(undefined);
  });
});
