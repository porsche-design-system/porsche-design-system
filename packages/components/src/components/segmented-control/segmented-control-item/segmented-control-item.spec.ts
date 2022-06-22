import { SegmentedControlItem } from './segmented-control-item';
import * as throwIfParentIsNotOfKindUtils from '../../../utils/dom/throwIfParentIsNotOfKind';
import * as throwIfPropIsUndefinedUtils from '../../../utils/validation/throwIfPropIsUndefined';

describe('connectedCallback', () => {
  it('should call throwIfParentIsNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');

    const component = new SegmentedControlItem();
    component.host = document.createElement('p-segmented-control-item') as any;

    component.connectedCallback();
    expect(spy).toBeCalledWith(component.host, 'pSegmentedControl');
  });
});

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
