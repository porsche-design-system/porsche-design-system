import { vi } from 'vitest';
import { StepperHorizontalItem } from './stepper-horizontal-item';
import * as stepperHorizontalItemUtils from './stepper-horizontal-item-utils';

describe('render', () => {
  it('should call throwIfCurrentAndDisabled() with correct parameter', () => {
    const spy = vi.spyOn(stepperHorizontalItemUtils, 'throwIfCurrentAndDisabled').mockImplementationOnce(() => {});
    const component = new StepperHorizontalItem();
    component.host = document.createElement('p-stepper-horizontal-item') as any;
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component.host);
  });
});
