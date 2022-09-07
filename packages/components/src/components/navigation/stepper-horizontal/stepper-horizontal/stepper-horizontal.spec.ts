import { StepperHorizontal } from './stepper-horizontal';
import * as throwIfChildrenAreNotOfKindUtils from '../../../../utils/validation/throwIfChildrenAreNotOfKind';
import * as throwIfChildCountIsExceededUtils from '../../../../utils/validation/throwIfChildCountIsExceeded';
import * as stepperHorizontalUtils from './stepper-horizontal-utils';
import * as scrollingUtils from '../../../../utils/scrolling';

describe('connectedCallback', () => {
  it('should call defineStepperHorizontalItemElements()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = jest.spyOn(component, 'defineStepperHorizontalItemElements' as any);

    component.connectedCallback();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call this.observeBreakpointChange()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.connectedCallback();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentWillLoad', () => {
  it('should call this.validateComponent()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = jest.spyOn(component, 'validateComponent' as any);

    component.componentWillLoad();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentDidLoad', () => {
  it('should call getIndexOfStepWithStateCurrent() with correct paramters', () => {
    const component = new StepperHorizontal();
    const spy = jest.spyOn(stepperHorizontalUtils, 'getIndexOfStepWithStateCurrent');

    component.componentDidLoad();
    expect(spy).toBeCalledWith(component['stepperHorizontalItems']);
  });

  it('should call this.observeBreakpointChange()', () => {
    const component = new StepperHorizontal();
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.componentDidLoad();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call this.addEventListeners()', () => {
    const component = new StepperHorizontal();
    // needs to be mocked for component lifecycle flow to work
    component.host = document.createElement('p-stepper-horizontal');
    component['scrollerElement'] = document.createElement('p-scroller');

    const spy = jest.spyOn(component, 'addEventListeners' as any);
    jest.spyOn(scrollingUtils, 'getScrollActivePosition').mockReturnValue(5);

    component.componentDidLoad();
    expect(spy).toBeCalledWith();
  });
});

describe('componentWillRender', () => {
  it('should call syncItemsProps() with correct parameter', () => {
    const spy = jest.spyOn(stepperHorizontalUtils, 'syncItemsProps');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });

    component.componentWillRender();
    expect(spy).toBeCalledWith(component.host, component.theme);
  });
});

describe('componentDidUpdate', () => {
  it('should call throwIfMultipleCurrentStates() with correct parameters', () => {
    const spy = jest.spyOn(stepperHorizontalUtils, 'throwIfMultipleCurrentStates');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component.componentDidUpdate();
    expect(spy).toBeCalledWith(component.host, expect.any(Array));
  });
});

describe('validateComponent', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component['validateComponent']();
    expect(spy).toBeCalledWith(component.host, 'pStepperHorizontalItem');
  });

  it('should call throwIfChildCountIsExceeded() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildCountIsExceededUtils, 'throwIfChildCountIsExceeded');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component['validateComponent']();
    expect(spy).toBeCalledWith(component.host, 9);
  });

  it('should call throwIfMultipleCurrentStates() with correct parameters', () => {
    const spy = jest.spyOn(stepperHorizontalUtils, 'throwIfMultipleCurrentStates');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component['validateComponent']();
    expect(spy).toBeCalledWith(component.host, expect.anything());
  });
});
