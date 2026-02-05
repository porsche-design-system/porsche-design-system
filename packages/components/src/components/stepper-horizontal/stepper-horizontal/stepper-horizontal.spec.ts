import { vi } from 'vitest';
import * as breakpointObserverUtils from '../../../utils/breakpoint-observer';
import * as scrollingUtils from '../../../utils/scrolling';
import * as throwIfChildCountIsExceededUtils from '../../../utils/validation/throwIfChildCountIsExceeded';
import * as throwIfChildrenAreNotOfKindUtils from '../../../utils/validation/throwIfChildrenAreNotOfKind';
import { StepperHorizontal } from './stepper-horizontal';
import * as stepperHorizontalUtils from './stepper-horizontal-utils';

describe('connectedCallback', () => {
  it('should call this.validateComponent()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = vi.spyOn(component, 'validateComponent' as any);

    component.connectedCallback();
    expect(spy).toHaveBeenCalledWith();
  });
  it('should call this.observeBreakpointChange()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = vi.spyOn(component, 'observeBreakpointChange' as any);

    component.connectedCallback();
    expect(spy).toHaveBeenCalledWith();
  });
});

describe('componentWillLoad', () => {
  it('should call this.validateComponent()', () => {
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');
    const spy = vi.spyOn(component, 'validateComponent' as any);

    component.componentWillLoad();
    expect(spy).toHaveBeenCalledWith();
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
    const spy = vi.spyOn(stepperHorizontalUtils, 'getIndexOfStepWithStateCurrent');

    component.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(component['stepperHorizontalItems']);
  });

  it('should call this.observeBreakpointChange()', () => {
    const spy = vi.spyOn(component, 'observeBreakpointChange' as any);

    component.componentDidLoad();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should set correct value of this.scrollerElement.scrollToPosition', () => {
    component['scrollerElement'] = document.createElement('p-scroller');
    vi.spyOn(scrollingUtils, 'getScrollActivePosition').mockReturnValue(5);

    component.componentDidLoad();
    expect(component['scrollerElement'].scrollToPosition).toEqual({
      scrollPosition: 5,
      isSmooth: false,
    });
  });
});

describe('componentDidUpdate', () => {
  it('should call throwIfMultipleCurrentStates() with correct parameters', () => {
    const spy = vi.spyOn(stepperHorizontalUtils, 'throwIfMultipleCurrentStates');

    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component.componentDidUpdate();
    expect(spy).toHaveBeenCalledWith(component.host, expect.any(Array));
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveBreakpointChange() with correct parameters', () => {
    const component = new StepperHorizontal();
    const spy = vi.spyOn(breakpointObserverUtils, 'unobserveBreakpointChange');
    component.host = document.createElement('p-stepper-horizontal');

    component.disconnectedCallback();
    expect(spy).toHaveBeenCalledWith(component.host);
  });
});

describe('this.validateComponent()', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = vi.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component['validateComponent']();
    expect(spy).toHaveBeenCalledWith(component.host, 'p-stepper-horizontal-item');
  });

  it('should call throwIfChildCountIsExceeded() with correct parameters', () => {
    const spy = vi.spyOn(throwIfChildCountIsExceededUtils, 'throwIfChildCountIsExceeded');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component['validateComponent']();
    expect(spy).toHaveBeenCalledWith(component.host, 9);
  });

  it('should call throwIfMultipleCurrentStates() with correct parameters', () => {
    const spy = vi.spyOn(stepperHorizontalUtils, 'throwIfMultipleCurrentStates');
    const component = new StepperHorizontal();
    component.host = document.createElement('p-stepper-horizontal');

    component['validateComponent']();
    expect(spy).toHaveBeenCalledWith(component.host, component['stepperHorizontalItems']);
  });
});

// TODO: finish
// describe('this.scrollIntoView()', () => {});

describe('this.observeBreakpointChange()', () => {
  it('should not call observeBreakpointChange() with correct parameters if this.size is not breakpoint customizable', () => {
    const component = new StepperHorizontal();
    component.size = 'small';
    const spy = vi.spyOn(breakpointObserverUtils, 'observeBreakpointChange');

    component['observeBreakpointChange']();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call observeBreakpointChange() with correct parameters if this.size is breakpoint customizable', () => {
    const component = new StepperHorizontal();
    component.size = { base: 'small', s: 'medium' };
    const spy = vi.spyOn(breakpointObserverUtils, 'observeBreakpointChange');

    component['observeBreakpointChange']();
    expect(spy).toHaveBeenCalledWith(component.host, component['scrollIntoView']);
  });
});
