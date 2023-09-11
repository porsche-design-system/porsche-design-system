import { setAttributes } from './setAttributes';

it('should correctly set attributes', () => {
  const element = document.createElement('select');
  const attributes = {
    multiple: 'true',
    'aria-hidden': 'true',
    tabindex: '-1',
    slot: 'select',
  };

  setAttributes(element, attributes);

  expect(element.getAttribute('multiple')).toBe(attributes.multiple);
  expect(element.getAttribute('aria-hidden')).toBe(attributes['aria-hidden']);
  expect(element.getAttribute('tabindex')).toBe(attributes.tabindex);
  expect(element.getAttribute('slot')).toBe(attributes.slot);
});
