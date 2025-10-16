import { expect } from '@jest/globals';
import { RadioGroup } from './radio-group';
import * as radioGroupUtils from './radio-group-utils';

class MockElementInternals {
  setValidity = jest.fn();
  setFormValue = jest.fn();
}

const initComponent = (): RadioGroup => {
  const component = new RadioGroup();
  component.host = document.createElement('p-radio-group');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;
  return component;
};

describe('connectedCallback', () => {
  it('should assign this.initialLoading to value of this.loading', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.connectedCallback();
    expect(component['initialLoading']).toBe(true);

    component.loading = false;
    component.connectedCallback();
    expect(component['initialLoading']).toBe(false);
  });
});

describe('componentWillLoad', () => {
  it('should assign this.initialLoading to value of this.loading', () => {
    const component = initComponent();
    component.loading = true;

    expect(component['initialLoading']).toBe(false);
    component.componentWillLoad();
    expect(component['initialLoading']).toBe(true);

    component.loading = false;
    component.componentWillLoad();
    expect(component['initialLoading']).toBe(false);
  });

  it('should call updateOptions() and updateRadioGroupOptions() with correct parameters', () => {
    const component = initComponent();
    const updateRadioGroupOptionsSpy = jest.spyOn(radioGroupUtils, 'updateRadioGroupOptions');

    component.componentWillLoad();
    expect(updateRadioGroupOptionsSpy).toHaveBeenCalledWith(component['radioGroupOptions'], component['value']);
  });
});

describe('componentDidLoad', () => {
  const component = initComponent();
  component.value = 'test';
  const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
  component.componentDidLoad();
  expect(setFormValueSpy).toHaveBeenCalledWith(component.value);
});

describe('render', () => {
  it('should call syncRadioGroupChildrenProps() with correct parameters', () => {
    const spy = jest.spyOn(radioGroupUtils, 'syncRadioGroupChildrenProps');
    const component = initComponent();
    component.render();
    expect(spy).toHaveBeenCalledWith(
      component['radioGroupOptions'],
      component.theme,
      component.disabled,
      component.loading,
      component.state,
      component.name
    );
  });
});

describe('formResetCallback', () => {
  const component = initComponent();
  const defaultValue = 'default-value';
  component['defaultValue'] = defaultValue;
  component.value = 'test';
  component.formResetCallback();
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
