import type { FormState } from '../../types';
import { isVisibleFormState } from './isVisibleFormState';

it.each<[FormState, boolean]>([
  ['success', true],
  ['error', true],
  ['none', false],
  [undefined, false],
])('should for state: %s return %s', (state, result) => {
  expect(isVisibleFormState(state)).toBe(result);
});
