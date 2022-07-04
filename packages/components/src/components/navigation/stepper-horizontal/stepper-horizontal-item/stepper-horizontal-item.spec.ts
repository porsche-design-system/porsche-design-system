import * as throwIfParentIsNotOfKindUtils from '../../../../utils/validation/throwIfParentIsNotOfKind';
import * as jssUtils from '../../../../utils/jss';
import * as stepperHorizontalItemUtils from './stepper-horizontal-item-utils';
import { StepperHorizontalItem } from './stepper-horizontal-item';

describe('connectedCallback', () => {
  it('should call throwIfParentIsNotOfKind() with correct parameter', () => {
    const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind').mockImplementationOnce(() => {});
    const component = new StepperHorizontalItem();

    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, 'pStepperHorizontal');
  });
});

describe('componentWillRender', () => {
  it('should call throwIfCurrentAndDisabled() with correct parameter', () => {
    jest.spyOn(jssUtils, 'attachComponentCss').mockImplementationOnce(() => {});
    const spy = jest.spyOn(stepperHorizontalItemUtils, 'throwIfCurrentAndDisabled').mockImplementationOnce(() => {});
    const component = new StepperHorizontalItem();
    component.host = document.createElement('p-stepper-horizontal-item') as any;

    component.componentWillRender();

    expect(spy).toBeCalledWith(component.host);
  });
});
