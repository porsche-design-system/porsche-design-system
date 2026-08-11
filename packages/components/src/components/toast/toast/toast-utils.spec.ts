import { TOAST_STATES } from './toast-utils';

describe('TOAST_STATES', () => {
  it('should list supported state values', () => {
    expect(TOAST_STATES).toStrictEqual(['info', 'success', 'warning', 'error']);
  });
});
