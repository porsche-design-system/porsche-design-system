import { SegmentedControl } from './segmented-control';
import * as segmentedControlUtils from './segmented-control-utils';
import * as getClickedItemUtils from '../../../utils/dom/getClickedItem';
import * as throwIfChildrenAreNotOfKindUtils from '../../../utils/validation/throwIfChildrenAreNotOfKind';
import { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import * as warnIfDeprecatedPropIsUsed from '../../../utils/log/warnIfDeprecatedPropIsUsed';

describe('connectedCallback', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');

    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');

    component.connectedCallback();
    expect(spy).toBeCalledWith(component.host, 'p-segmented-control-item');
  });
});

describe('render', () => {
  it('should call syncItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(segmentedControlUtils, 'syncSegmentedControlItemsProps');

    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, component.value, component.theme);
  });

  it('should call warnIfDeprecatedPropIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(warnIfDeprecatedPropIsUsed, 'warnIfDeprecatedPropIsUsed');
    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    component.backgroundColor = 'background-surface';
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component, 'backgroundColor');
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

  it('should call updateValue via event handlers', () => {
    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    // @ts-ignore
    const spy = jest.spyOn(component, 'updateValue');
    component.componentDidLoad();
    component.change = { emit: jest.fn() };
    component.segmentedControlChange = { emit: jest.fn() };

    // click event handler
    const item1 = document.createElement('p-segmented-control-item') as unknown as HTMLElement & SegmentedControlItem;
    item1.id = 'item1';
    jest.spyOn(getClickedItemUtils, 'getClickedItem').mockReturnValueOnce(item1);

    component.host.click();

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(item1);
  });
});

describe('updateValue()', () => {
  const component = new SegmentedControl();
  const emitSpy = jest.fn();
  component.change = { emit: emitSpy };
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
