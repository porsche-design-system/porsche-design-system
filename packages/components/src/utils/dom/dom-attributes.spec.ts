import { getAttribute, hasAttribute, removeAttribute, setAttribute } from './dom-attributes';

describe('getAttribute()', () => {
  it('should return attribute value', () => {
    const element = document.createElement('div');
    const title = 'Some title';
    element.setAttribute('title', title);

    expect(getAttribute(element, 'title')).toBe(title);
  });
});

describe('setAttribute()', () => {
  it('should set attribute value', () => {
    const element = document.createElement('div');
    const title = 'Some title';
    setAttribute(element, 'title', title);

    expect(element.getAttribute('title')).toBe(title);
  });
});

describe('removeAttribute()', () => {
  it('should remove attribute', () => {
    const element = document.createElement('div');
    element.setAttribute('title', 'Some title');

    removeAttribute(element, 'title');
    expect(element.getAttribute('title')).toBe(null);
  });
});

describe('hasAttribute()', () => {
  it('should return true if attribute exists', () => {
    const element = document.createElement('div');
    element.setAttribute('title', 'Some title');
    expect(hasAttribute(element, 'title')).toBe(true);
  });

  it('should return false if attribute does not exist', () => {
    const element = document.createElement('div');
    expect(hasAttribute(element, 'title')).toBe(false);
  });
});
