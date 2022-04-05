import type { FormState } from '../../types';
import { getRole, isVisibleFormState } from './form-state';

describe('isVisibleFormState()', () => {
  it.each<[FormState, boolean]>([
    ['success', true],
    ['error', true],
    ['none', false],
    [undefined, false],
  ])('should for state: %s return %s', (state, result) => {
    expect(isVisibleFormState(state)).toBe(result);
  });
});

describe('getRole()', () => {
  it('should return "alert" if state is error', () => {
    expect(getRole('error')).toBe('alert');
  });

  it('should return "status" if state is success', () => {
    expect(getRole('success')).toBe('status');
  });

  it('should return null if state is none', () => {
    expect(getRole('none')).toBeNull();
  });
});
