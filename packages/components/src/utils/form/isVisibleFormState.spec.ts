import { isVisibleFormState } from './isVisibleFormState';
import type { FormState } from './form-state';
import { it, expect } from 'vitest';

it.each<[FormState, boolean]>([
  ['success', true],
  ['error', true],
  ['none', false],
  [undefined, false],
])('should for state: %s return %s', (state, result) => {
  expect(isVisibleFormState(state)).toBe(result);
});
