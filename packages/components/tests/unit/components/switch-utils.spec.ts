import { isDisabled } from '../../../src/components/action/switch/switch-utils';

describe('isDisabled()', () => {
  it.each<[boolean, boolean, boolean]>([
    [true, true, true],
    [true, false, true],
    [false, true, true],
    [false, false, false],
  ])('should for disabled: "%s" and loading: "%s" return "%s"', (disabled, loading, result) => {
    expect(isDisabled(disabled, loading)).toBe(result);
  });
});
