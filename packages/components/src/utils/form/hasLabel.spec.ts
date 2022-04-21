import { hasLabel } from './hasLabel';

const label = 'Some description';
it.each<[{ label: string; slotted: boolean }, boolean]>([
  [{ label, slotted: false }, true],
  [{ label: '', slotted: true }, true],
  [{ label: '', slotted: false }, false],
  [{ label, slotted: true }, true],
])('should be called with parameter %o and return %s', (parameter, result) => {
  const { label, slotted } = parameter;
  const el = document.createElement('div');
  if (slotted) {
    const slot = document.createElement('span');
    slot.slot = 'label';
    el.appendChild(slot);
  }

  expect(hasLabel(el, label)).toBe(result);
});
