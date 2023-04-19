import { CheckboxWrapper } from './checkbox-wrapper';
import * as checkboxButtonWrapperUtils from '../../utils/checkbox-radio-button-wrapper/checkbox-radio-button-wrapper-utils';

describe('componentWillLoad', () => {
  it('should call addChangeListener() with correct parameters', () => {
    const spy = jest.spyOn(checkboxButtonWrapperUtils, 'addChangeListener');

    const component = new CheckboxWrapper();
    component.host = document.createElement('p-checkbox-wrapper');
    component.host.attachShadow({ mode: 'open' });
    // needs to be mocked for component lifecycle flow to work
    const input = document.createElement('input');
    input.type = 'checkbox';
    component.host.appendChild(input);

    component.componentWillLoad();

    expect(spy).toBeCalledWith(input);
  });
});
