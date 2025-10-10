import { expect } from '@jest/globals';
import * as getShadowRootHTMLElementUtils from '../../../utils/dom/getShadowRootHTMLElement';
import { MultiSelect } from './multi-select';
import * as multiSelectUtils from './multi-select-utils';

class MockElementInternals {
  setValidity = jest.fn();
  setFormValue = jest.fn();
}

const initComponent = (): MultiSelect => {
  const component = new MultiSelect();
  component.host = document.createElement('p-multi-select');
  component.host.attachShadow({ mode: 'open' });
  component['internals'] = new MockElementInternals() as unknown as ElementInternals;

  component['inputSearchElement'] = document.createElement('p-input-search');
  component['inputSearchElement'].attachShadow({ mode: 'open' });
  component['inputSearchElement'].shadowRoot.appendChild(document.createElement('input'));
  return component;
};

describe('connectedCallback', () => {
  it('should add event listener', () => {
    const component = initComponent();
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    component.connectedCallback();
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', component['onClickOutside'], true);
  });
});

describe('componentWillLoad', () => {
  it('should call setSelectedOptions() and setFormValue() with correct parameters', () => {
    const component = initComponent();
    const setSelectedOptionsSpy = jest.spyOn(multiSelectUtils, 'setSelectedOptions');
    const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
    const value = 'a';
    component.name = 'some-name';
    component.value = [value];
    const formData = new FormData();
    formData.append(component.name, value);

    component.componentWillLoad();
    expect(setSelectedOptionsSpy).toHaveBeenCalledWith([], component.value);
    expect(setFormValueSpy).toHaveBeenCalledWith(formData);
  });
});

describe('componentDidLoad', () => {
  it('should call getShadowRootHTMLElement() with correct parameters and add event listener', () => {
    const component = initComponent();
    const slot = document.createElement('slot');
    const slotSpy = jest.spyOn(slot, 'addEventListener');
    const getShadowRootHTMLElementSpy = jest
      .spyOn(getShadowRootHTMLElementUtils, 'getShadowRootHTMLElement')
      .mockReturnValueOnce(slot);
    component.componentDidLoad();
    expect(getShadowRootHTMLElementSpy).toHaveBeenCalledWith(component.host, 'slot');
    expect(slotSpy).toHaveBeenCalledTimes(1);
  });
  it('should set inputSearchInputElement and set ariaControlsElements on it', () => {
    const component = initComponent();
    const slot = document.createElement('slot');
    jest.spyOn(getShadowRootHTMLElementUtils, 'getShadowRootHTMLElement').mockReturnValueOnce(slot);
    const listbox = document.createElement('div');
    component['listboxElement'] = listbox;
    component.componentDidLoad();

    expect(component['inputSearchInputElement']).toBe(
      component['inputSearchElement'].shadowRoot.querySelector('input')
    );
    expect(component['inputSearchInputElement'].ariaControlsElements).toEqual([listbox]);
  });
});

describe('disconnectedCallback', () => {
  it('should remove event listener', () => {
    const component = initComponent();
    const spy = jest.spyOn(document, 'removeEventListener');
    component.disconnectedCallback();
    expect(spy).toHaveBeenCalledWith('mousedown', component['onClickOutside'], true);
  });
});

describe('render', () => {
  it('should call syncMultiSelectChildrenProps() with correct parameters', () => {
    const spy = jest.spyOn(multiSelectUtils, 'syncMultiSelectChildrenProps');
    const component = initComponent();
    component.render();
    expect(spy).toHaveBeenCalledWith(component['multiSelectOptions'], component.theme);
  });
});

describe('formResetCallback', () => {
  const component = initComponent();
  const defaultValue = ['default-value'];
  component['defaultValue'] = defaultValue;
  component.value = ['test'];
  component.name = 'name';
  const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
  component.formResetCallback();
  const formData = new FormData();
  defaultValue.forEach((val) => formData.append(component.name, val));
  expect(setFormValueSpy).toHaveBeenCalledWith(formData);
  expect(component.value).toBe(defaultValue);
});

describe('setFormValue', () => {
  const component = initComponent();
  const setFormValueSpy = jest.spyOn(component['internals'], 'setFormValue' as any);
  const value = ['a', 'b', 'c'];
  component.name = 'some-name';
  component.setFormValue(value);
  const formData = new FormData();
  value.forEach((val) => formData.append(component.name, val));
  expect(setFormValueSpy).toHaveBeenCalledWith(formData);
});

describe('formDisabledCallback', () => {
  const component = initComponent();
  component.disabled = false;
  component.formDisabledCallback(true);
  expect(component.disabled).toBe(true);
});

describe('formStateRestoreCallback', () => {
  const component = initComponent();
  component.value = ['test'];
  const restoredValue = 'restored-value';
  const formData = new FormData();
  formData.append(component.name, restoredValue);
  component.formStateRestoreCallback(formData);
  expect(component.value).toStrictEqual([restoredValue]);
});
