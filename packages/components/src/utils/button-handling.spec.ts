import * as handleButtonUtils from './button-handling';
import { handleButtonEvent, improveButtonHandlingForCustomElement } from './button-handling';

describe('improveButtonHandlingForCustomElement()', () => {
  test('it should add a click event listener to the element', () => {
    const element = document.createElement('button');
    const getType = jest.fn().mockReturnValue('button');
    const getName = jest.fn().mockReturnValue('name');
    const getValue = jest.fn().mockReturnValue('value');
    const getDisabled = jest.fn().mockReturnValue(false);
    const handleButtonEventSpy = jest.spyOn(handleButtonUtils, 'handleButtonEvent');

    improveButtonHandlingForCustomElement(element, getType, getDisabled, getName, getValue);

    element.click();
    expect(handleButtonEventSpy).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      element,
      getType,
      getDisabled,
      getName,
      getValue
    );
  });
});

// TODO: Would be better to test if the button is appended and clicked
describe('handleButtonEvent()', () => {
  test('it should create a submit button and click it', (done) => {
    const element = document.createElement('button');
    const getType = jest.fn().mockReturnValue('submit');
    const getDisabled = jest.fn().mockReturnValue(false);
    const getName = jest.fn().mockReturnValue('name');
    const getValue = jest.fn().mockReturnValue('value');
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);

    form.addEventListener('submit', () => {
      expect(getType).toHaveBeenCalled();
      expect(getDisabled).toHaveBeenCalled();
      expect(getName).toHaveBeenCalled();
      expect(getValue).toHaveBeenCalled();
      // TODO: Also test e.submitter name and value
      done();
    });

    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);
  });

  test('it should not create a submit button if disabled', () => {
    const element = document.createElement('button');
    const getType = jest.fn().mockReturnValue('submit');
    const getDisabled = jest.fn().mockReturnValue(true);
    const getName = jest.fn().mockReturnValue('name');
    const getValue = jest.fn().mockReturnValue('value');
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);

    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);
    expect(getDisabled).toHaveBeenCalled();

    expect(getType).not.toHaveBeenCalled();
    expect(getName).not.toHaveBeenCalled();
    expect(getValue).not.toHaveBeenCalled();
  });

  test('it should not create a submit button if not within form', () => {
    const element = document.createElement('button');
    const getType = jest.fn().mockReturnValue('submit');
    const getDisabled = jest.fn().mockReturnValue(true);
    const getName = jest.fn().mockReturnValue('name');
    const getValue = jest.fn().mockReturnValue('value');

    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);

    expect(getDisabled).not.toHaveBeenCalled();
    expect(getType).not.toHaveBeenCalled();
    expect(getName).not.toHaveBeenCalled();
    expect(getValue).not.toHaveBeenCalled();
  });
});
