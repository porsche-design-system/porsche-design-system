import { hasDescription } from './hasDescription';

const description = 'Some description';
it.each<[{ description: string; slotted: boolean }, boolean]>([
  [{ description, slotted: false }, true],
  [{ description: '', slotted: true }, true],
  [{ description: '', slotted: false }, false],
  [{ description, slotted: true }, true],
])('should be called with parameter %o and return %s', (parameter, result) => {
  const { description, slotted } = parameter;
  const el = document.createElement('div');
  if (slotted) {
    const slot = document.createElement('span');
    slot.slot = 'description';
    el.appendChild(slot);
  }

  expect(hasDescription(el, description)).toBe(result);
});
