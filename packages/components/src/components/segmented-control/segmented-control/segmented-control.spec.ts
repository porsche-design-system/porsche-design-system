import { SegmentedControl } from './segmented-control';
import * as childrenObserverUtils from '../../../utils/children-observer';
import * as segmentedControlUtils from './segmented-control-utils';
import { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';

describe('connectedCallback', () => {
  it('should call observeChildren() with correct parameters', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');

    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');

    component.connectedCallback();
    expect(spy).toBeCalledWith(component.host, expect.any(Function));
  });
});

describe('componentWillRender', () => {
  it('should call syncItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(segmentedControlUtils, 'syncItemsProps');

    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    component.host.attachShadow({ mode: 'open' });

    component.componentWillRender();

    expect(spy).toBeCalledWith(component.host, component.value, component.backgroundColor, component.theme);
  });
});

describe('componentDidLoad', () => {
  it('should add click event listener', () => {
    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    const spy = jest.spyOn(component.host, 'addEventListener');

    component.componentDidLoad();
    expect(spy).toBeCalledWith('click', expect.any(Function));
  });

  it('should add keydown event listener', () => {
    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    const spy = jest.spyOn(component.host, 'addEventListener');

    component.componentDidLoad();
    expect(spy).toBeCalledWith('keydown', expect.any(Function));
  });

  it('should call updateValue via event handlers', () => {
    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    // @ts-ignore
    const spy = jest.spyOn(component, 'updateValue');
    component.componentDidLoad();
    component.segmentedControlChange = { emit: jest.fn() };

    // click event handler
    const item1 = document.createElement('p-segmented-control-item') as unknown as HTMLElement & SegmentedControlItem;
    item1.id = 'item1';
    jest.spyOn(segmentedControlUtils, 'getClickedSegmentedControlItem').mockReturnValueOnce(item1);

    component.host.click();

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(item1);

    // keydown event handler
    const item2 = document.createElement('p-segmented-control-item') as unknown as HTMLElement & SegmentedControlItem;
    item2.id = 'item2';
    jest.spyOn(segmentedControlUtils, 'getKeydownedSegmentedControlItem').mockReturnValueOnce(item2);

    component.host.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith(item2);
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveChildren() with correct parameters', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');

    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');

    component.disconnectedCallback();
    expect(spy).toBeCalledWith(component.host);
  });
});

describe('updateValue()', () => {
  const component = new SegmentedControl();
  const emitSpy = jest.fn();
  component.segmentedControlChange = { emit: emitSpy };

  const item = document.createElement('p-segmented-control-item') as unknown as HTMLElement & SegmentedControlItem;
  item.value = 'a';

  beforeEach(() => {
    component.value = undefined;
  });

  it('should set this.value', () => {
    expect(component.value).toBeUndefined();
    // @ts-ignore
    component.updateValue(item);

    expect(component.value).toBe(item.value);
  });

  it('should call segmentedControlChange.emit()', () => {
    // @ts-ignore
    component.updateValue(item);

    expect(emitSpy).toBeCalledWith({ value: item.value });
  });

  it('should call focus() on item', () => {
    const spy = jest.spyOn(item, 'focus');
    // @ts-ignore
    component.updateValue(item);

    expect(spy).toBeCalledWith();
  });

  it('should do nothing for undefined parameter', () => {
    const spy = jest.spyOn(item, 'focus');
    // @ts-ignore
    component.updateValue(undefined);

    expect(component.value).toBeUndefined();
    expect(emitSpy).not.toBeCalled();
    expect(spy).not.toBeCalled();
  });
});
