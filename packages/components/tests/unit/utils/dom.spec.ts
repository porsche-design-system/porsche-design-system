import { hasNamedSlot, isRequired } from '../../../src/utils';

describe('isRequired', () => {
  it('should return true if required property is true on element', () => {
    const el = document.createElement('input');
    el.required = true;
    expect(isRequired(el)).toBe(true);
  });

  it('should return true if required attribute is empty string on element', () => {
    const el = document.createElement('input');
    el.setAttribute('required', '');
    expect(isRequired(el)).toBe(true);
  });

  it('should return true if required attribute is any string on element', () => {
    const el = document.createElement('input');
    el.setAttribute('required', 'false');
    expect(isRequired(el)).toBe(true);
  });

  it('should return false if required attribute or property is missing on element', () => {
    const el = document.createElement('input');
    expect(isRequired(el)).toBe(false);
  });

  it('should return false if required property is false on element', () => {
    const el = document.createElement('input');
    el.required = false;
    expect(isRequired(el)).toBe(false);
  });
});

describe('hasNamedSlot', () => {
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
});
