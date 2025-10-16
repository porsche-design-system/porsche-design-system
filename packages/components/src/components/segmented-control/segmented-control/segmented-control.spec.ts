import { expect } from '@jest/globals';
import * as warnIfDeprecatedPropIsUsed from '../../../utils/log/warnIfDeprecatedPropIsUsed';
import * as throwIfChildrenAreNotOfKindUtils from '../../../utils/validation/throwIfChildrenAreNotOfKind';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import { SegmentedControl } from './segmented-control';
import * as segmentedControlUtils from './segmented-control-utils';

class MockElementInternals {
  setValidity = jest.fn();
  setFormValue = jest.fn();
}

const initComponent = (): SegmentedControl => {
  const component = new SegmentedControl();
  component.host = document.createElement('p-segmented-control');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;
  return component;
};

describe('formResetCallback', () => {
  const component = initComponent();
  const defaultValue = 'default-value';
  component['defaultValue'] = defaultValue;
  component.value = 'test';
  const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
  component.formResetCallback();
  expect(setFormValueSpy).toHaveBeenCalledWith(defaultValue);
  expect(component.value).toBe(defaultValue);
});

describe('formDisabledCallback', () => {
  const component = initComponent();
  component.disabled = false;
  component.formDisabledCallback(true);
  expect(component.disabled).toBe(true);
});

describe('formStateRestoreCallback', () => {
  const component = initComponent();
  component.value = 'test';
  const restoredValue = 'restored-value';
  component.formStateRestoreCallback(restoredValue);
  expect(component.value).toBe(restoredValue);
});

describe('connectedCallback', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');

    const component = initComponent();
    component.host = document.createElement('p-segmented-control');

    component.connectedCallback();
    expect(spy).toHaveBeenCalledWith(component.host, 'p-segmented-control-item');
  });
});

describe('render', () => {
  it('should call syncItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(segmentedControlUtils, 'syncSegmentedControlItemsProps');

    const component = initComponent();
    component.host = document.createElement('p-segmented-control');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(
      component.host,
      component.value,
      component.disabled,
      component.compact,
      component.theme
    );
  });

  it('should call warnIfDeprecatedPropIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(warnIfDeprecatedPropIsUsed, 'warnIfDeprecatedPropIsUsed');
    const component = initComponent();
    component.host = document.createElement('p-segmented-control');
    component.backgroundColor = 'background-surface';
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component, 'backgroundColor');
  });
});

describe('updateSegmentedControlItemHandler', () => {
  const mockEvent = {
    stopPropagation: jest.fn(),
    target: {
      value: '1',
      focus: jest.fn(),
    } as unknown as HTMLElement & SegmentedControlItem,
  } as unknown as Event & { target: HTMLElement & SegmentedControlItem };

  it('should stop event propagation', () => {
    const component = initComponent();

    component.change = { emit: jest.fn() };
    component.update = { emit: jest.fn() };
    component.segmentedControlChange = { emit: jest.fn() };

    component.updateSegmentedControlItemHandler(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should call updateValue when not disabled', () => {
    const component = initComponent();

    component.change = { emit: jest.fn() };
    component.update = { emit: jest.fn() };
    component.segmentedControlChange = { emit: jest.fn() };
    component.disabled = false;
    // @ts-expect-error
    const updateValueSpy = jest.spyOn(component, 'updateValue');

    component.updateSegmentedControlItemHandler(mockEvent);

    expect(updateValueSpy).toHaveBeenCalledWith(mockEvent.target);
  });

  it('should not call updateValue when disabled', () => {
    const component = initComponent();
    component.disabled = true;
    // @ts-expect-error
    const updateValueSpy = jest.spyOn(component, 'updateValue');

    component.updateSegmentedControlItemHandler(mockEvent);

    expect(updateValueSpy).not.toHaveBeenCalled();
  });
});

describe('onValueChange', () => {
  it('should call setFormValue', () => {
    const component = initComponent();
    const value = 1;
    component.value = value;
    const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
    component.onValueChange();
    expect(setFormValueSpy).toHaveBeenCalledWith(value.toString());
  });
});

describe('componentDidLoad', () => {
  it('should call setFormValue', () => {
    const component = initComponent();
    const value = '1';
    component.value = value;
    const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
    component.componentDidLoad();
    expect(setFormValueSpy).toHaveBeenCalledWith(value);
  });
});

describe('updateValue()', () => {
  const component = initComponent();
  const emitSpy = jest.fn();
  component.change = { emit: jest.fn() };
  component.update = { emit: emitSpy };
  component.segmentedControlChange = { emit: emitSpy };

  const item = document.createElement('p-segmented-control-item') as unknown as HTMLElement & SegmentedControlItem;
  item.value = 'a';

  beforeEach(() => {
    component.value = undefined;
  });

  it('should set this.value', () => {
    expect(component.value).toBeUndefined();
    // @ts-expect-error
    component.updateValue(item);

    expect(component.value).toBe(item.value);
  });

  it('should call segmentedControlChange.emit()', () => {
    // @ts-expect-error
    component.updateValue(item);

    expect(emitSpy).toHaveBeenCalledWith({ value: item.value });
  });

  it('should call focus() on item', () => {
    const spy = jest.spyOn(item, 'focus');
    // @ts-expect-error
    component.updateValue(item);

    expect(spy).toHaveBeenCalled();
  });
});
