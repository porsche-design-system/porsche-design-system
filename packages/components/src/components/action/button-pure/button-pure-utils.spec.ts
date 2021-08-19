import { throwIfIconNoneAndLoading } from './button-pure-utils';

describe('throwIfIconNoneAndLoading()', () => {
  it('should throw error if property icon = none and loading = true', () => {
    const host = document.createElement('p-button-pure');

    let error = undefined;
    try {
      throwIfIconNoneAndLoading(host, 'none', true);
    } catch (e) {
      error = e.message;
    }
    expect(error).not.toBe(undefined);
  });

  it('should not throw error if icon !== none and loading = true', () => {
    const host = document.createElement('p-button-pure');
    let error = undefined;
    try {
      throwIfIconNoneAndLoading(host, 'highway', true);
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(undefined);
  });

  it('should not throw error if icon = none and loading = false', () => {
    const host = document.createElement('p-button-pure');
    let error = undefined;
    try {
      throwIfIconNoneAndLoading(host, 'none', false);
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(undefined);
  });
});
