import * as stepperHorizontalItemUtils from './stepper-horizontal-item-utils';
import { StepperHorizontalItem } from './stepper-horizontal-item';

describe('componentWillRender', () => {
  it('should call throwIfCurrentAndDisabled() with correct parameter', () => {
    const spy = jest.spyOn(stepperHorizontalItemUtils, 'throwIfCurrentAndDisabled').mockImplementationOnce(() => {});
    const component = new StepperHorizontalItem();
    component.host = document.createElement('p-stepper-horizontal-item') as any;
    component.host.attachShadow({ mode: 'open' });

    component.componentWillRender();

    expect(spy).toBeCalledWith(component.host);
  });
});
