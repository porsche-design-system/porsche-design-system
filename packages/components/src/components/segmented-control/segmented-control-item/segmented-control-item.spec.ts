import { vi } from 'vitest';
import * as throwIfPropIsUndefinedUtils from '../../../utils/validation/throwIfPropIsUndefined';
import { SegmentedControlItem } from './segmented-control-item';

describe('render', () => {
  it('should call throwIfPropIsUndefined() with correct parameters', () => {
    const spy = vi.spyOn(throwIfPropIsUndefinedUtils, 'throwIfPropIsUndefined');

    const component = new SegmentedControlItem();
    component.host = document.createElement('p-segmented-control-item') as any;

    try {
      component.render();
    } catch {}

    expect(spy).toHaveBeenCalledWith(component.host, 'value', component.value);
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
