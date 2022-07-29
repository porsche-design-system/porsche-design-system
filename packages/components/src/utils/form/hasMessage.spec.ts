import { hasMessage } from './hasMessage';
import type { FormState } from '../../components/form/form-state';

const message = 'Some message';
it.each<[{ message: string; slotted: boolean; formState: FormState }, boolean]>([
  [{ message, slotted: false, formState: 'error' }, true],
  [{ message: '', slotted: true, formState: 'error' }, true],
  [{ message: '', slotted: false, formState: 'error' }, false],
  [{ message, slotted: false, formState: 'none' }, false],
  [{ message: '', slotted: true, formState: 'none' }, false],
  [{ message: '', slotted: false, formState: 'none' }, false],
  [{ message, slotted: false, formState: 'success' }, true],
  [{ message: '', slotted: true, formState: 'success' }, true],
  [{ message: '', slotted: false, formState: 'success' }, false],
])('should be called with parameter %o and return %s', (parameter, result) => {
  const { message, slotted, formState } = parameter;
  const el = document.createElement('div');
  if (slotted) {
    const slot = document.createElement('span');
    slot.slot = 'message';
    el.appendChild(slot);
  }

  expect(hasMessage(el, message, formState)).toBe(result);
});
