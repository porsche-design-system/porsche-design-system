import { hasNamedSlot } from './hasNamedSlot';
import * as getNamedSlotUtils from '../getNamedSlot';

it('should call getNamedSlot() with correct parameters', () => {
  const spy = jest.spyOn(getNamedSlotUtils, 'getNamedSlot');
  const host = document.createElement('div');
  const slotName = 'slot';

  hasNamedSlot(host, slotName);

  expect(spy).toBeCalledWith(host, slotName);
});

it('should return false if element has no slotted child', () => {
  const el = document.createElement('div');
  expect(hasNamedSlot(el, 'title')).toBe(false);
});

it('should return false if element has slotted child with wrong name', () => {
  const el = document.createElement('div');
  const slottedChild = document.createElement('span');
  slottedChild.setAttribute('slot', 'label');
  el.appendChild(slottedChild);
  expect(hasNamedSlot(el, 'title')).toBe(false);
});

it('should return true if element has slotted child with correct name', () => {
  const el = document.createElement('div');
  const slottedChild = document.createElement('span');
  slottedChild.setAttribute('slot', 'title');
  el.appendChild(slottedChild);
  expect(hasNamedSlot(el, 'title')).toBe(true);
});
