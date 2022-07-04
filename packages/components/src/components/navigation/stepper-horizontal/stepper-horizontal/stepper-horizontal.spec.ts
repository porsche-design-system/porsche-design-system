import { StepperHorizontal } from './stepper-horizontal';
import * as throwIfChildrenAreNotOfKindUtils from '../../../../utils/validation/throwIfChildrenAreNotOfKind';
import * as throwIfChildCountIsExceededUtils from '../../../../utils/validation/throwIfChildCountIsExceeded';
import * as childrenObserverUtils from '../../../../utils/children-observer';
import * as stepperHorizontalUtils from './stepper-horizontal-utils';

describe('connectedCallback', () => {
  it('should call defineStepperHorizontalItemElements()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });

    const spy = jest.spyOn(component, 'defineStepperHorizontalItemElements' as any);

    component.connectedCallback();

    expect(spy).toBeCalledTimes(1);
  });

  it('should call observeChildren() with correct parameters', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });

    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, expect.any(Function));
  });
});

describe('componentWillLoad', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });

    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, 'pStepperHorizontalItem');
  });

  it('should call throwIfChildCountIsExceeded() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildCountIsExceededUtils, 'throwIfChildCountIsExceeded');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });

    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, 9);
  });

  it('should call throwIfMultipleCurrentStates() with correct parameters', () => {
    const spy = jest.spyOn(stepperHorizontalUtils, 'throwIfMultipleCurrentStates');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });

    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, expect.anything());
  });
});

describe('componentDidLoad', () => {
  it('should call defineScrollerElements()', () => {
    const component = new StepperHorizontal();
    const spy = jest.spyOn(component, 'defineScrollerElements' as any).mockImplementationOnce(() => {});

    try {
      component.componentDidLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });

  it('should call getIndexOfStepWithStateCurrent()', () => {
    const component = new StepperHorizontal();
    jest.spyOn(component, 'defineScrollerElements' as any).mockImplementationOnce(() => {});
    const spy = jest.spyOn(stepperHorizontalUtils, 'getIndexOfStepWithStateCurrent');
    try {
      component.componentDidLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });

  it('should call addEventListeners()', () => {
    const component = new StepperHorizontal();
    // needs to be mocked for component lifecycle flow to work
    jest.spyOn(component, 'defineScrollerElements' as any).mockImplementationOnce(() => {});
    component['host'] = document.createElement('p-stepper-horizontal');
    component['scrollAreaElement'] = document.createElement('div');
    component['prevGradientElement'] = document.createElement('div');

    const spy = jest.spyOn(component, 'addEventListeners' as any).mockImplementationOnce(() => {});

    try {
      component.componentDidLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentWillRender', () => {
  it('should call syncItemsProps() with correct parameter', () => {
    const spy = jest.spyOn(stepperHorizontalUtils, 'syncItemsProps');
    const component = new StepperHorizontal();

    try {
      component.componentWillRender();
    } catch (e) {}

    expect(spy).toBeCalledWith(component.host, component.theme);
  });
});

describe('componentDidUpdate', () => {
  it('should call throwIfMultipleCurrentStates() with correct parameters', () => {
    const spy = jest.spyOn(stepperHorizontalUtils, 'throwIfMultipleCurrentStates');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });

    component.componentDidUpdate();

    expect(spy).toBeCalledWith(component.host, expect.any(Array));
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveChildren() with correct parameter', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');
    const component = new StepperHorizontal();

    component.disconnectedCallback();

    expect(spy).toBeCalledWith(component.host);
  });
});
