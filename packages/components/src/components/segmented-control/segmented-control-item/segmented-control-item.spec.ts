import { SegmentedControlItem } from './segmented-control-item';
import * as throwIfPropIsUndefinedUtils from '../../../utils/validation/throwIfPropIsUndefined';

describe('componentWillRender', () => {
  it('should call throwIfPropIsUndefined() with correct parameters', () => {
    const spy = jest.spyOn(throwIfPropIsUndefinedUtils, 'throwIfPropIsUndefined');

    const component = new SegmentedControlItem();
    component.host = document.createElement('p-segmented-control-item') as any;

    try {
      component.componentWillRender();
    } catch {}

    expect(spy).toBeCalledWith(component.host, 'value', component.value);
  });
});
