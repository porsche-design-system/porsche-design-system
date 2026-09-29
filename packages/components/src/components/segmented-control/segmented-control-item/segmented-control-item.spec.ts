import * as stencilCore from '@stencil/core';
import { vi } from 'vitest';
import { SegmentedControlItem } from './segmented-control-item';

describe('render', () => {
  it('should not throw when value is undefined', () => {
    const component = new SegmentedControlItem();
    component.host = document.createElement('p-segmented-control-item') as any;
    component.host.attachShadow({ mode: 'open' });

    expect(() => component.render()).not.toThrow();
  });

  describe('onValueChange', () => {
    it('should call forceUpdate() on parent', () => {
      const spy = vi.spyOn(stencilCore, 'forceUpdate');
      const parent = document.createElement('p-segmented-control');
      const component = new SegmentedControlItem();
      component.host = document.createElement('p-segmented-control-item') as any;
      parent.appendChild(component.host);

      component.onValueChange();

      expect(spy).toHaveBeenCalledWith(parent);
    });
  });

  describe('onClick', () => {
    it('should dispatch "internalSegmentedControlItemUpdate" event when not disabled or selected', () => {
      const component = new SegmentedControlItem();
      component.host = document.createElement('p-segmented-control-item') as any;

      const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');
      component.disabled = false;
      component.host.selected = false;

      component['onClick']();

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'internalSegmentedControlItemUpdate',
          bubbles: true,
        })
      );
    });

    it('should not dispatch event if disabled is true', () => {
      const component = new SegmentedControlItem();
      component.host = document.createElement('p-segmented-control-item') as any;

      const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');
      component.disabled = true;
      component.host.selected = false;

      component['onClick']();

      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch event if selected is true', () => {
      const component = new SegmentedControlItem();
      component.host = document.createElement('p-segmented-control-item') as any;

      const dispatchEventSpy = vi.spyOn(component.host, 'dispatchEvent');
      component.disabled = false;
      component.host.selected = true;

      component['onClick']();

      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });
  });
});
