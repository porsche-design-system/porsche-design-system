import { SelectWrapper } from './select-wrapper';
import * as selectWrapperUtils from './select-wrapper-utils';

const initComponent = (): SelectWrapper => {
  const component = new SelectWrapper();
  component.host = document.createElement('p-select-wrapper');
  component.host.attachShadow({ mode: 'open' });
  component.host.append(document.createElement('select'));
  return component;
};

describe('componentWillLoad', () => {
  it('should call isCustomDropdown() with correct parameters', () => {
    const component = initComponent();
    component.native = true;

    const spy = jest.spyOn(selectWrapperUtils, 'isCustomDropdown');
    component.componentWillLoad();

    expect(spy).toBeCalledWith(false, true);
  });
});
