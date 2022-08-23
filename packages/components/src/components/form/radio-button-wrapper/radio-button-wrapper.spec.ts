import { RadioButtonWrapper } from './radio-button-wrapper';
import * as radioButtonWrapperUtils from './radio-button-wrapper-utils';

describe('componentWillLoad', () => {
  it('should call addChangeListener', () => {
    const spy = jest.spyOn(radioButtonWrapperUtils, 'addChangeListener');

    const component = new RadioButtonWrapper();
    component.host = document.createElement('p-radio-button-wrapper');
    component.host.attachShadow({ mode: 'open' });
    // needs to be mocked for component lifecycle flow to work
    const input = document.createElement('input');
    input.type = 'radio';
    component.host.appendChild(input);

    component.componentWillLoad();

    expect(spy).toBeCalledWith(input);
  });
});
