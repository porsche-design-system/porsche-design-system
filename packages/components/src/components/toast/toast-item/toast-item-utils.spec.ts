import { getToastIconName } from './toast-item-utils';

describe('getToastIconName()', () => {
  it.each([
    ['info', 'information-filled'],
    ['warning', 'warning-filled'],
    ['success', 'success-filled'],
    ['error', 'error-filled'],
  ] as const)('should map state "%s" to icon "%s"', (state, expected) => {
    expect(getToastIconName(state)).toBe(expected);
  });
});
