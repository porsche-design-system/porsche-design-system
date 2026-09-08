import { type ChangeDetectorRef, ElementRef, type Renderer2 } from '@angular/core';
import { PCheckbox } from '@porsche-design-system/components-angular';
import { describe, expect, it, vi } from 'vitest';

const initComponent = () => {
  const element = document.createElement('p-checkbox');
  const setProperty = vi.fn<Renderer2['setProperty']>();
  const renderer = { setProperty } as unknown as Renderer2;
  const changeDetectorRef = { detach: vi.fn() } as unknown as ChangeDetectorRef;
  const component = new PCheckbox(renderer, new ElementRef(element), changeDetectorRef);

  return { component, element, setProperty };
};

describe('PCheckbox ControlValueAccessor', () => {
  it.each([
    [null, false],
    [true, true],
    [false, false],
  ])('should write model value %s as checked=%s', (value, expected) => {
    const { component, element, setProperty } = initComponent();

    component.writeValue(value);

    expect(setProperty).toHaveBeenCalledWith(element, 'checked', expected);
  });
});
