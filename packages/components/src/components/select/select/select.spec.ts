import { Select } from './select';
import * as selectUtils from './select-utils';
import * as getClosestHTMLElementUtils from '../../../utils/dom/getClosestHTMLElement';
import * as getShadowRootHTMLElementUtils from '../../../utils/dom/getShadowRootHTMLElement';

const initComponent = (): Select => {
  const component = new Select();
  component.host = document.createElement('p-select');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('connectedCallback', () => {
  it('should add event listener and set is within form', () => {
    const component = initComponent();
    const getClosestHTMLElementSpy = jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    component.connectedCallback();
    expect(getClosestHTMLElementSpy).toBeCalledWith(component.host, 'form');
    expect(component['form']).toBe(null);
    expect(component['isWithinForm']).toBe(false);
    expect(addEventListenerSpy).toBeCalledWith('mousedown', component['onClickOutside'], true);
  });

  it('should set isWithinForm if is within form', () => {
    const component = initComponent();
    jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement').mockReturnValueOnce(document.createElement('form'));
    component.connectedCallback();
    expect(component['isWithinForm']).toBe(true);
  });
});

describe('componentWillLoad', () => {
  it('should call updateOptions() and updateSelectOptions() with correct parameters', () => {
    const component = initComponent();
    const updateSelectOptionsSpy = jest.spyOn(selectUtils, 'updateSelectOptions');
    component.componentWillLoad();
    expect(updateSelectOptionsSpy).toBeCalledWith(component['selectOptions'], component['value']);
  });

  it('should call initNativeSelect() and updateNativeSelectOption() with correct parameters if is within form', () => {
    const component = initComponent();
    component['isWithinForm'] = true;
    const initNativeSelectSpy = jest.spyOn(selectUtils, 'initNativeSelect');
    const updateNativeSelectOptionSpy = jest.spyOn(selectUtils, 'updateNativeSelectOption');
    component.componentWillLoad();
    expect(initNativeSelectSpy).toBeCalledWith(component.host, undefined, false, false);
    expect(updateNativeSelectOptionSpy).toBeCalledWith(component['nativeSelect'], component['selectOptions']);
  });

  it('should not call initNativeSelect() and updateNativeSelectOption() if is not within form', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    const initNativeSelectSpy = jest.spyOn(selectUtils, 'initNativeSelect');
    const updateNativeSelectOptionSpy = jest.spyOn(selectUtils, 'updateNativeSelectOption');
    component.componentWillLoad();
    expect(initNativeSelectSpy).not.toBeCalled();
    expect(updateNativeSelectOptionSpy).not.toBeCalled();
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
});

describe('componentWillUpdate', () => {
  it('should call syncNativeSelect() with correct parameters if is within form', () => {
    const component = initComponent();
    component['nativeSelect'] = document.createElement('select');
    component['isWithinForm'] = true;
    const syncNativeSelectSpy = jest.spyOn(selectUtils, 'syncNativeSelect');
    component.componentWillUpdate();
    expect(syncNativeSelectSpy).toBeCalledWith(component['nativeSelect'], undefined, false, false);
  });

  it('should not call syncNativeSelect() if is not within form', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    const syncNativeSelectSpy = jest.spyOn(selectUtils, 'syncNativeSelect');
    component.componentWillUpdate();
    expect(syncNativeSelectSpy).not.toBeCalled();
  });
});

describe('disconnectedCallback', () => {
  it('should remove event listener', () => {
    const component = initComponent();
    const spy = jest.spyOn(document, 'removeEventListener');
    component.disconnectedCallback();
    expect(spy).toBeCalledWith('mousedown', component['onClickOutside'], true);
  });
});

describe('render', () => {
  it('should call syncSelectOptionProps() with correct parameters', () => {
    const spy = jest.spyOn(selectUtils, 'syncSelectOptionProps');
    const component = initComponent();
    component.render();
    expect(spy).toBeCalledWith(component['selectOptions'], component.theme);
  });
});
