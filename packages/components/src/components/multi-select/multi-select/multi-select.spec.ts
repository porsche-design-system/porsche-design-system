import { MultiSelect } from './multi-select';
import * as multiSelectUtils from './multi-select-utils';
import * as isWithinFormUtils from '../../../utils/form/isWithinForm';

const initComponent = (): MultiSelect => {
  const component = new MultiSelect();
  component.host = document.createElement('p-multi-select');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('connectedCallback', () => {
  it('should add event listener and set is within form', () => {
    const component = initComponent();
    const isWithinFormSpy = jest.spyOn(isWithinFormUtils, 'isWithinForm');
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    component.connectedCallback();
    expect(isWithinFormSpy).toBeCalledTimes(1);
    expect(component['isWithinForm']).toBe(false);
    expect(addEventListenerSpy).toBeCalledTimes(1);
  });
});

describe('componentWillLoad', () => {
  it('should call initNativeSelect() with correct parameters if is within form', () => {
    const component = initComponent();
    component['isWithinForm'] = true;
    const initNativeSelectSpy = jest.spyOn(multiSelectUtils, 'initNativeSelect');
    component.componentWillLoad();
    expect(initNativeSelectSpy).toBeCalledWith(component.host, undefined, false, false);
  });

  it('should not call initNativeSelect() if is not within form', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    const initNativeSelectSpy = jest.spyOn(multiSelectUtils, 'initNativeSelect');
    component.componentWillLoad();
    expect(initNativeSelectSpy).not.toBeCalled();
  });

  it('should call setSelectedOptions() with correct parameters', () => {
    const component = initComponent();
    jest.spyOn(isWithinFormUtils, 'isWithinForm').mockReturnValueOnce(false);
    const setSelectedOptionsSpy = jest.spyOn(multiSelectUtils, 'setSelectedOptions');
    component.componentWillLoad();
    expect(setSelectedOptionsSpy).toBeCalledWith([], []);
  });
});

describe('componentWillUpdate', () => {
  it('should call syncNativeSelect() with correct parameters if is within form', () => {
    const component = initComponent();
    component['nativeSelect'] = document.createElement('select');
    component['isWithinForm'] = true;
    const syncNativeSelectSpy = jest.spyOn(multiSelectUtils, 'syncNativeSelect');
    component.componentWillUpdate();
    expect(syncNativeSelectSpy).toBeCalledWith(component['nativeSelect'], undefined, false, false);
  });

  it('should not call syncNativeSelect() if is not within form', () => {
    const component = initComponent();
    component['isWithinForm'] = false;
    const syncNativeSelectSpy = jest.spyOn(multiSelectUtils, 'syncNativeSelect');
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
  it('should call syncMultiSelectOptionProps() with correct parameters', () => {
    const spy = jest.spyOn(multiSelectUtils, 'syncMultiSelectOptionProps');
    const component = initComponent();
    component.render();
    expect(spy).toBeCalledWith(component['multiSelectOptions'], component.theme);
  });
});
