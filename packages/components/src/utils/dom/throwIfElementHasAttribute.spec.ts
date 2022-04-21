import { throwIfElementHasAttribute } from './throwIfElementHasAttribute';

it('should throw error if attribute exists', () => {
  const element = document.createElement('div');
  element.setAttribute('title', 'some title');

  expect(() => throwIfElementHasAttribute(element, 'title')).toThrow();
});

it('should not throw error if attribute does not exist', () => {
  const element = document.createElement('div');

  expect(() => throwIfElementHasAttribute(element, 'title')).not.toThrow();
});
