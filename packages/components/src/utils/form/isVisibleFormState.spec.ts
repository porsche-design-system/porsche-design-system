import { isVisibleFormState } from './isVisibleFormState';
import type { FormState } from '../../components/form/form-state';

it.each<[FormState, boolean]>([
  ['success', true],
  ['error', true],
  ['none', false],
  [undefined, false],
])('should for state: %s return %s', (state, result) => {
  expect(isVisibleFormState(state)).toBe(result);
});
