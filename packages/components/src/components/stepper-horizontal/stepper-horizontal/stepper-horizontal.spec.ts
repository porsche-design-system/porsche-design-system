import { vi } from 'vitest';
import * as throwIfChildCountIsExceededUtils from '../../../utils/validation/throwIfChildCountIsExceeded';
import * as throwIfChildrenAreNotOfKindUtils from '../../../utils/validation/throwIfChildrenAreNotOfKind';
import { StepperHorizontal } from './stepper-horizontal';
import * as stepperHorizontalUtils from './stepper-horizontal-utils';

let resizeCallback: ResizeObserverCallback;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

const initComponent = (): StepperHorizontal => {
  const component = new StepperHorizontal();
  component.host = document.createElement('p-stepper-horizontal');
  component.host.attachShadow({ mode: 'open' });

  const scroller = document.createElement('div');
  const slot = document.createElement('slot') as HTMLSlotElement;
  scroller.appendChild(slot);
  component.host.shadowRoot.appendChild(scroller);

  component['scroller'] = scroller;
  component['slot'] = slot;

  return component;
};

beforeEach(() => {
  // biome-ignore lint/complexity/useArrowFunction: vitest needs regular function
  global.ResizeObserver = vi.fn().mockImplementation(function (callback) {
    resizeCallback = callback;
    return {
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
    };
  });
});

describe('resizeObserver', () => {
  it('should create ResizeObserver and observe scroller in componentDidLoad()', () => {
    const component = initComponent();

    component.componentDidLoad();

    expect(global.ResizeObserver).toHaveBeenCalledWith(expect.any(Function));
    expect(mockObserve).toHaveBeenCalledWith(component['scroller']);
  });

  it('should call scrollStepperHorizontalItemIntoView() with isSmooth false on resize', () => {
    const scrollSpy = vi.spyOn(stepperHorizontalUtils, 'scrollStepperHorizontalItemIntoView');
    const component = initComponent();

    const item = document.createElement('p-stepper-horizontal-item') as unknown as HTMLPStepperHorizontalItemElement;
    (item as any).state = 'current';
    (item as any).scrollIntoView = vi.fn();
    component.host.appendChild(item);
    component['stepperHorizontalItems'] = [item];

    component.componentDidLoad();
    scrollSpy.mockClear();

    // simulate a resize
    resizeCallback([] as unknown as ResizeObserverEntry[], {} as ResizeObserver);

    expect(scrollSpy).toHaveBeenCalledWith(0, component['scroller'], component['stepperHorizontalItems'], false);
  });

  it('should disconnect ResizeObserver in disconnectedCallback()', () => {
    const component = initComponent();

    component.componentDidLoad();
    component.disconnectedCallback();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should not throw in disconnectedCallback() when resizeObserver is undefined', () => {
    const component = initComponent();

    expect(() => component.disconnectedCallback()).not.toThrow();
  });
});

describe('slotchange listener', () => {
  it('should add slotchange event listener in componentDidLoad()', () => {
    const component = initComponent();
    const addEventListenerSpy = vi.spyOn(component['slot'], 'addEventListener');

    component.componentDidLoad();

    expect(addEventListenerSpy).toHaveBeenCalledWith('slotchange', expect.any(Function));
  });

  it('should re-identify stepper horizontal items on slotchange', () => {
    const component = initComponent();

    const item = document.createElement('p-stepper-horizontal-item') as unknown as HTMLPStepperHorizontalItemElement;
    (item as any).scrollIntoView = vi.fn();
    component.host.appendChild(item);

    component.componentDidLoad();

    // add another child after componentDidLoad
    const newItem = document.createElement('p-stepper-horizontal-item') as unknown as HTMLPStepperHorizontalItemElement;
    (newItem as any).scrollIntoView = vi.fn();
    component.host.appendChild(newItem);

    component['slot'].dispatchEvent(new Event('slotchange'));

    expect(component['stepperHorizontalItems']).toHaveLength(2);
    expect(component['stepperHorizontalItems'][1]).toBe(newItem);
  });

  it('should call scrollStepperHorizontalItemIntoView() on slotchange', () => {
    const scrollSpy = vi.spyOn(stepperHorizontalUtils, 'scrollStepperHorizontalItemIntoView');
    const component = initComponent();

    const item = document.createElement('p-stepper-horizontal-item') as unknown as HTMLPStepperHorizontalItemElement;
    (item as any).state = 'current';
    (item as any).scrollIntoView = vi.fn();
    component.host.appendChild(item);
    component['stepperHorizontalItems'] = [item];

    component.componentDidLoad();
    scrollSpy.mockClear();

    component['slot'].dispatchEvent(new Event('slotchange'));

    expect(scrollSpy).toHaveBeenCalledWith(0, component['scroller'], component['stepperHorizontalItems']);
  });

  it('should call scrollStepperHorizontalItemIntoView() with default isSmooth (true) on slotchange, unlike resize observer', () => {
    const scrollSpy = vi.spyOn(stepperHorizontalUtils, 'scrollStepperHorizontalItemIntoView');
    const component = initComponent();

    const item = document.createElement('p-stepper-horizontal-item') as unknown as HTMLPStepperHorizontalItemElement;
    (item as any).state = 'current';
    (item as any).scrollIntoView = vi.fn();
    component.host.appendChild(item);
    component['stepperHorizontalItems'] = [item];

    component.componentDidLoad();
    scrollSpy.mockClear();

    component['slot'].dispatchEvent(new Event('slotchange'));

    // onSlotChange does not pass isSmooth (defaults to true), unlike resize observer which passes false
    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy.mock.calls[0]).toHaveLength(3);
  });

  it('should call scrollStepperHorizontalItemIntoView() with index -1 on slotchange when no item has state current', () => {
    const scrollSpy = vi.spyOn(stepperHorizontalUtils, 'scrollStepperHorizontalItemIntoView');
    const component = initComponent();

    const item = document.createElement('p-stepper-horizontal-item') as unknown as HTMLPStepperHorizontalItemElement;
    (item as any).scrollIntoView = vi.fn();
    component.host.appendChild(item);
    component['stepperHorizontalItems'] = [item];

    component.componentDidLoad();
    scrollSpy.mockClear();

    component['slot'].dispatchEvent(new Event('slotchange'));

    expect(scrollSpy).toHaveBeenCalledWith(-1, component['scroller'], component['stepperHorizontalItems']);
  });

  it('should remove slotchange event listener in disconnectedCallback()', () => {
    const component = initComponent();
    const removeEventListenerSpy = vi.spyOn(component['slot'], 'removeEventListener');

    component.componentDidLoad();
    component.disconnectedCallback();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('slotchange', expect.any(Function));
  });

  it('should not react to slotchange after disconnectedCallback()', () => {
    const scrollSpy = vi.spyOn(stepperHorizontalUtils, 'scrollStepperHorizontalItemIntoView');
    const component = initComponent();

    const item = document.createElement('p-stepper-horizontal-item') as unknown as HTMLPStepperHorizontalItemElement;
    (item as any).scrollIntoView = vi.fn();
    component.host.appendChild(item);

    component.componentWillLoad();
    component.componentDidLoad();
    component.disconnectedCallback();
    scrollSpy.mockClear();

    // add a new child and dispatch slotchange
    const newItem = document.createElement('p-stepper-horizontal-item') as unknown as HTMLPStepperHorizontalItemElement;
    (newItem as any).scrollIntoView = vi.fn();
    component.host.appendChild(newItem);

    component['slot'].dispatchEvent(new Event('slotchange'));

    // items should not have been re-identified (still 1, not 2)
    expect(component['stepperHorizontalItems']).toHaveLength(1);
    expect(scrollSpy).not.toHaveBeenCalled();
  });
});

describe('defineStepperHorizontalItems()', () => {
  it('should set stepperHorizontalItems from host children', () => {
    const component = initComponent();
    const item1 = document.createElement('p-stepper-horizontal-item');
    const item2 = document.createElement('p-stepper-horizontal-item');
    component.host.appendChild(item1);
    component.host.appendChild(item2);

    component['defineStepperHorizontalItems']();

    expect(component['stepperHorizontalItems']).toEqual([item1, item2]);
  });

  it('should return empty array when host has no children', () => {
    const component = initComponent();

    component['defineStepperHorizontalItems']();

    expect(component['stepperHorizontalItems']).toEqual([]);
  });

  it('should update stepperHorizontalItems when children change', () => {
    const component = initComponent();
    const item1 = document.createElement('p-stepper-horizontal-item');
    component.host.appendChild(item1);

    component['defineStepperHorizontalItems']();
    expect(component['stepperHorizontalItems']).toHaveLength(1);

    const item2 = document.createElement('p-stepper-horizontal-item');
    component.host.appendChild(item2);

    component['defineStepperHorizontalItems']();
    expect(component['stepperHorizontalItems']).toHaveLength(2);
    expect(component['stepperHorizontalItems']).toEqual([item1, item2]);
  });
});

describe('onClickScroller()', () => {
  const initComponentForClick = (): {
    component: StepperHorizontal;
    items: HTMLElement[];
  } => {
    const component = initComponent();
    const item1 = document.createElement('p-stepper-horizontal-item');
    const item2 = document.createElement('p-stepper-horizontal-item');
    const item3 = document.createElement('p-stepper-horizontal-item');
    component.host.appendChild(item1);
    component.host.appendChild(item2);
    component.host.appendChild(item3);
    component['defineStepperHorizontalItems']();
    component.update = { emit: vi.fn() } as any;
    return { component, items: [item1, item2, item3] };
  };

  it('should emit update event with correct activeStepIndex when an item is clicked', () => {
    const { component, items } = initComponentForClick();

    component['onClickScroller']({ composedPath: () => [items[1]] } as unknown as MouseEvent);

    expect(component.update.emit).toHaveBeenCalledWith({ activeStepIndex: 1 });
  });

  it('should emit update event with index 0 when first item is clicked', () => {
    const { component, items } = initComponentForClick();

    component['onClickScroller']({ composedPath: () => [items[0]] } as unknown as MouseEvent);

    expect(component.update.emit).toHaveBeenCalledWith({ activeStepIndex: 0 });
  });

  it('should emit update event with last index when last item is clicked', () => {
    const { component, items } = initComponentForClick();

    component['onClickScroller']({ composedPath: () => [items[2]] } as unknown as MouseEvent);

    expect(component.update.emit).toHaveBeenCalledWith({ activeStepIndex: 2 });
  });

  it('should not emit update event when clicking outside of items', () => {
    const { component } = initComponentForClick();
    const outsideElement = document.createElement('div');

    component['onClickScroller']({ composedPath: () => [outsideElement] } as unknown as MouseEvent);

    expect(component.update.emit).not.toHaveBeenCalled();
  });

  it('should emit update event when a nested element inside an item is in composedPath', () => {
    const { component, items } = initComponentForClick();
    const nestedSpan = document.createElement('span');
    items[2].appendChild(nestedSpan);

    component['onClickScroller']({ composedPath: () => [nestedSpan, items[2]] } as unknown as MouseEvent);

    expect(component.update.emit).toHaveBeenCalledWith({ activeStepIndex: 2 });
  });
});

describe('validation', () => {
  it('should validate children in componentWillLoad()', () => {
    const childrenSpy = vi.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');
    const childCountSpy = vi.spyOn(throwIfChildCountIsExceededUtils, 'throwIfChildCountIsExceeded');
    const component = initComponent();

    component.componentWillLoad();

    expect(childrenSpy).toHaveBeenCalledWith(component.host, 'p-stepper-horizontal-item');
    expect(childCountSpy).toHaveBeenCalledWith(component.host, 9);
  });

  it('should validate children on slotchange after the items have been updated', () => {
    const component = initComponent();
    component.componentDidLoad();
    const childrenSpy = vi
      .spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind')
      .mockImplementation(() => {
        expect(component['stepperHorizontalItems']).toHaveLength(1);
      });
    const childCountSpy = vi.spyOn(throwIfChildCountIsExceededUtils, 'throwIfChildCountIsExceeded');
    component.host.appendChild(document.createElement('p-stepper-horizontal-item'));

    component['slot'].dispatchEvent(new Event('slotchange'));

    expect(childrenSpy).toHaveBeenCalledWith(component.host, 'p-stepper-horizontal-item');
    expect(childCountSpy).toHaveBeenCalledWith(component.host, 9);
  });

  it('should log instead of throwing in render() when multiple items have state current', () => {
    const logSpy = vi.spyOn(stepperHorizontalUtils, 'logErrorIfMultipleCurrentStates').mockImplementation(() => {});
    const childrenSpy = vi.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');
    const childCountSpy = vi.spyOn(throwIfChildCountIsExceededUtils, 'throwIfChildCountIsExceeded');
    const component = initComponent();
    const items = [
      document.createElement('p-stepper-horizontal-item'),
      document.createElement('p-stepper-horizontal-item'),
    ];
    items.forEach((item) => {
      (item as any).state = 'current';
      component.host.appendChild(item);
    });
    component['defineStepperHorizontalItems']();

    expect(() => component.render()).not.toThrow();
    expect(logSpy).toHaveBeenCalledWith(component.host, items);
    expect(childrenSpy).not.toHaveBeenCalled();
    expect(childCountSpy).not.toHaveBeenCalled();
  });
});
