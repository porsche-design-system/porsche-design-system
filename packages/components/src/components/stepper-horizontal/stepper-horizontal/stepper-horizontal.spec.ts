import { StepperHorizontal } from './stepper-horizontal';
import * as throwIfChildrenAreNotOfKindUtils from '../../../utils/validation/throwIfChildrenAreNotOfKind';
import * as throwIfChildCountIsExceededUtils from '../../../utils/validation/throwIfChildCountIsExceeded';
import * as breakpointObserverUtils from '../../../utils/breakpoint-observer';
import * as stepperHorizontalUtils from './stepper-horizontal-utils';
import * as scrollingUtils from '../../../utils/scrolling';

describe('connectedCallback', () => {
  it('should call this.validateComponent()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = jest.spyOn(component, 'validateComponent' as any);

    component.connectedCallback();
    expect(spy).toBeCalledWith();
  });
  it('should call this.observeBreakpointChange()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.connectedCallback();
    expect(spy).toBeCalledWith();
  });
});

describe('componentWillLoad', () => {
  it('should call this.validateComponent()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = jest.spyOn(component, 'validateComponent' as any);

    component.componentWillLoad();
    expect(spy).toBeCalledWith();
  });
  it('should call createStepperHorizontalItemElements()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = jest.spyOn(component, 'createStepperHorizontalItemElements' as any);

    component.componentWillLoad();
    expect(spy).toBeCalledWith();
  });
});

describe('componentDidLoad', () => {
  let component: StepperHorizontal;

  beforeEach(() => {
    component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });
    component.host.shadowRoot.innerHTML = '<slot />';
  });

  it('should call getIndexOfStepWithStateCurrent() with correct parameters', () => {
    const spy = jest.spyOn(stepperHorizontalUtils, 'getIndexOfStepWithStateCurrent');

    component.componentDidLoad();
    expect(spy).toBeCalledWith(component['stepperHorizontalItems']);
  });

  it('should call this.observeBreakpointChange()', () => {
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.componentDidLoad();
    expect(spy).toBeCalledWith();
  });

  it('should set correct value of this.scrollerElement.scrollToPosition', () => {
    component['scrollerElement'] = document.createElement('p-scroller');
    jest.spyOn(scrollingUtils, 'getScrollActivePosition').mockReturnValue(5);

    component.componentDidLoad();
    expect(component['scrollerElement'].scrollToPosition).toEqual({
      scrollPosition: 5,
      isSmooth: false,
    });
  });
});

describe('render', () => {
  it('should call syncItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(stepperHorizontalUtils, 'syncStepperHorizontalItemsProps');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    component.host.attachShadow({ mode: 'open' });

    component.render();
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

describe('disconnectedCallback', () => {
  it('should call unobserveBreakpointChange() with correct parameters', () => {
    const component = new StepperHorizontal();
    const spy = jest.spyOn(breakpointObserverUtils, 'unobserveBreakpointChange');
    component.host = document.createElement('p-stepper-horizontal');

    component.disconnectedCallback();
    expect(spy).toBeCalledWith(component.host);
  });
});

describe('this.validateComponent()', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component['validateComponent']();
    expect(spy).toBeCalledWith(component.host, 'p-stepper-horizontal-item');
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
    expect(spy).toBeCalledWith(component.host, component['stepperHorizontalItems']);
  });
});

xdescribe('this.scrollIntoView()', () => {});

describe('this.observeBreakpointChange()', () => {
  it('should not call observeBreakpointChange() with correct parameters if this.size is not breakpoint customizable', () => {
    const component = new StepperHorizontal();
    component.size = 'small';
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');

    component['observeBreakpointChange']();
    expect(spy).not.toBeCalled();
  });

  it('should call observeBreakpointChange() with correct parameters if this.size is breakpoint customizable', () => {
    const component = new StepperHorizontal();
    component.size = { base: 'small', s: 'medium' };
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');

    component['observeBreakpointChange']();
    expect(spy).toBeCalledWith(component.host, component['scrollIntoView']);
  });
});
