import { StepperHorizontal } from './stepper-horizontal';
import * as throwIfChildrenAreNotOfKindUtils from '../../../../utils/dom/throwIfChildrenAreNotOfKind';
import * as throwIfChildCountIsExceededUtils from '../../../../utils/dom/throwIfChildCountIsExceeded';
import * as childrenObserverUtils from '../../../../utils/children-observer';
import * as stepperHorizontalUtils from './stepper-horizontal-utils';

describe('connectedCallback', () => {
  it('should call defineStepperHorizontalItemElements() with correct parameters', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    const spy = jest.spyOn(component, 'defineStepperHorizontalItemElements' as any);

    component.connectedCallback();

    expect(spy).toBeCalledTimes(1);
  });

  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, 'pStepperHorizontalItem');
  });

  it('should call throwIfChildCountIsExceeded() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildCountIsExceededUtils, 'throwIfChildCountIsExceeded');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, 9);
  });

  it('should call defineStepperHorizontalItemElements()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    const spy = jest.spyOn(component, 'defineStepperHorizontalItemElements' as any);

    component.connectedCallback();

    expect(spy).toBeCalledTimes(1);
  });

  it('should call observeChildren() with correct parameters', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, expect.anything());
  });
});

describe('componentDidLoad', () => {
});
