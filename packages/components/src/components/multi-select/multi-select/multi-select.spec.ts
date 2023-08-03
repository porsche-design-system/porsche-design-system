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
  it('should call syncNativeSelect() if is within form', () => {
    const component = initComponent();
    jest.spyOn(isWithinFormUtils, 'isWithinForm').mockReturnValue(true);
    const spy = jest.spyOn(multiSelectUtils, 'syncNativeSelect');
    component.connectedCallback();
    expect(spy).toBeCalledTimes(1);
  });

  it('should not call syncNativeSelect() if is not within form', () => {
    const component = initComponent();
    jest.spyOn(isWithinFormUtils, 'isWithinForm').mockReturnValue(false);
    const spy = jest.spyOn(multiSelectUtils, 'syncNativeSelect');
    component.connectedCallback();
    expect(spy).toBeCalledTimes(0);
  });
});

describe('componentWillLoad', () => {
  it('should register event listener', () => {
    const component = initComponent();
    const spy = jest.spyOn(document, 'addEventListener');
    try {
      component.componentWillLoad();
    } catch (e) {}
    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentDidLoad', () => {
  it('should call updateOptions()', () => {
    const component = initComponent();
    const spy = jest.spyOn(component as any, 'updateOptions');
    component.componentDidLoad();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('disconnectedCallback', () => {
  it('should remove event listener', () => {
    const component = initComponent();
    const spy = jest.spyOn(document, 'removeEventListener');
    component.disconnectedCallback();
    expect(spy).toBeCalledTimes(1);
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
