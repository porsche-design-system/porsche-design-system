import { hasHeading } from './hasHeading';

const heading = 'Some heading';
it.each<[{ heading: string; slotted: boolean }, boolean]>([
  [{ heading, slotted: false }, true],
  [{ heading: '', slotted: true }, true],
  [{ heading: '', slotted: false }, false],
  [{ heading, slotted: true }, true],
])('should be called with parameter %o and return %s', (parameter, result) => {
  const { heading, slotted } = parameter;
  const el = document.createElement('div');
  if (slotted) {
    const slot = document.createElement('span');
    slot.slot = 'heading';
    el.appendChild(slot);
  }

  expect(hasHeading(el, heading)).toBe(result);
});
