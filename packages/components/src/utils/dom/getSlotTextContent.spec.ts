import { getSlotTextContent } from './getSlotTextContent';

it('should return correct text content if element has slotted child with correct label', () => {
  const el = document.createElement('div');
  const slottedChild = document.createElement('span');
  slottedChild.setAttribute('slot', 'label');
  slottedChild.innerHTML = 'Some label with a <a href="https://designsystem.porsche.com">link</a>.';
  el.appendChild(slottedChild);
  expect(getSlotTextContent(el, 'label')).toBe('Some label with a link.');
});

it('should return false if element has no slotted child', () => {
  const el = document.createElement('div');
  expect(getSlotTextContent(el, 'label')).toBeUndefined();
});
