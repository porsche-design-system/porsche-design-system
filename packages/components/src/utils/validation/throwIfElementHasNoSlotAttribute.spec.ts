import { throwIfElementHasNoSlotAttribute } from './throwIfElementHasNoSlotAttribute';

it('should throw error if slot name does not exist', () => {
  const element = document.createElement('div');

  expect(() => throwIfElementHasNoSlotAttribute(element, 'some-name')).toThrow();
});

it('should not throw error if slot name exists', () => {
  const element = document.createElement('div');
  element.setAttribute('slot', 'some-name');

  expect(() => throwIfElementHasNoSlotAttribute(element, 'some-name')).not.toThrow();
});
