import * as stepperHorizontalItemUtils from './stepper-horizontal-item-utils';
import { StepperHorizontalItem } from './stepper-horizontal-item';

jest.mock('../../../../utils/jss');
jest.mock('../../../../utils/validation/validateProps');

describe('componentWillRender', () => {
  it('should call throwIfCurrentAndDisabled() with correct parameter', () => {
    const spy = jest.spyOn(stepperHorizontalItemUtils, 'throwIfCurrentAndDisabled').mockImplementationOnce(() => {});
    const component = new StepperHorizontalItem();
    component.host = document.createElement('p-stepper-horizontal-item') as any;

    component.componentWillRender();

    expect(spy).toBeCalledWith(component.host);
  });
});
