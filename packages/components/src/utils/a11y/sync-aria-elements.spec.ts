import { vi } from 'vitest';
import { syncAriaElements } from './sync-aria-elements';

describe('syncAriaElements()', () => {
  const reflected = (el: Element) =>
    el as Element & {
      ariaControlsElements: readonly Element[] | null;
      ariaActiveDescendantElement: Element | null;
    };

  it('should set ariaControlsElements from one element and from a list', () => {
    const el = document.createElement('button');
    const list = document.createElement('ul');
    const other = document.createElement('div');

    syncAriaElements(el, { 'aria-controls': list, 'aria-activedescendant': other });
    expect([...(reflected(el).ariaControlsElements ?? [])]).toEqual([list]);
    expect(reflected(el).ariaActiveDescendantElement).toBe(other);

    syncAriaElements(el, { 'aria-controls': [list, other] });
    expect([...(reflected(el).ariaControlsElements ?? [])]).toEqual([list, other]);
  });

  it('should not reassign ariaControlsElements or ariaActiveDescendantElement when the elements have not changed', () => {
    const el = document.createElement('input');
    const list = document.createElement('ul');
    const option = document.createElement('li');

    syncAriaElements(el, { 'aria-controls': [list], 'aria-activedescendant': option });
    const initialControlsRef = reflected(el).ariaControlsElements;

    const activeSetter = vi.fn();
    let currentActive: Element | null = option;
    Object.defineProperty(el, 'ariaActiveDescendantElement', {
      configurable: true,
      get: () => currentActive,
      set: (val: Element | null) => {
        activeSetter(val);
        currentActive = val;
      },
    });

    syncAriaElements(el, { 'aria-controls': [list], 'aria-activedescendant': option });

    expect(reflected(el).ariaControlsElements).toBe(initialControlsRef);
    expect(activeSetter).not.toHaveBeenCalled();
  });

  it('should clear element reflection when the values are null, omitted or undefined, and not overwrite string IDREFs with null', () => {
    const el = document.createElement('input');
    const list = document.createElement('ul');
    syncAriaElements(el, { 'aria-controls': list, 'aria-activedescendant': list });
    syncAriaElements(el, { 'aria-controls': null, 'aria-activedescendant': null });
    expect(reflected(el).ariaControlsElements).toBeNull();
    expect(reflected(el).ariaActiveDescendantElement).toBeNull();

    syncAriaElements(el, { 'aria-controls': list, 'aria-activedescendant': list });
    syncAriaElements(el, { role: 'combobox' });
    expect(reflected(el).ariaControlsElements).toBeNull();
    expect(reflected(el).ariaActiveDescendantElement).toBeNull();

    syncAriaElements(el, { 'aria-controls': list, 'aria-activedescendant': list });
    syncAriaElements(el, undefined);
    expect(reflected(el).ariaControlsElements).toBeNull();
    expect(reflected(el).ariaActiveDescendantElement).toBeNull();

    // Setting ariaControlsElements/ariaActiveDescendantElement to null in a real browser removes the content attribute,
    // so string IDREFs must not assign null to the element reflection properties.
    const controlsSetter = vi.fn();
    Object.defineProperty(el, 'ariaControlsElements', {
      configurable: true,
      get: () => [],
      set: controlsSetter,
    });
    syncAriaElements(el, { 'aria-controls': 'results', 'aria-activedescendant': 'opt' });
    expect(controlsSetter).not.toHaveBeenCalled();
  });

  it('should leave element reflection untouched when aria was never set', () => {
    const el = document.createElement('input');
    const list = document.createElement('ul');
    reflected(el).ariaControlsElements = [list];
    reflected(el).ariaActiveDescendantElement = list;

    syncAriaElements(el, undefined);

    expect([...(reflected(el).ariaControlsElements ?? [])]).toEqual([list]);
    expect(reflected(el).ariaActiveDescendantElement).toBe(list);
  });
});
