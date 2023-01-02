import { RadioButtonWrapper } from './radio-button-wrapper';
import * as radioButtonWrapperUtils from './radio-button-wrapper-utils';

describe('connectedCallback', () => {
  it('should call addChangeListener() with correct parameters', () => {
    const spy = jest.spyOn(radioButtonWrapperUtils, 'addChangeListener');

    const component = new RadioButtonWrapper();
    component.host = document.createElement('p-radio-button-wrapper');
    component.host.attachShadow({ mode: 'open' });
    // needs to be mocked for component lifecycle flow to work
    const input = document.createElement('input');
    input.type = 'radio';
    component.host.appendChild(input);

    component.connectedCallback();

    expect(spy).toBeCalledWith(input);
  });
});
