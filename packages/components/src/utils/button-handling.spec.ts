import * as handleButtonUtils from './button-handling';
import { handleButtonEvent, improveButtonHandlingForCustomElement } from './button-handling';

describe('improveButtonHandlingForCustomElement()', () => {
  it('should add a click event listener to the element', () => {
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

describe('handleButtonEvent()', () => {
  const element = document.createElement('button');
  const getType = jest.fn().mockReturnValue('submit');
  const getName = jest.fn().mockReturnValue('name');
  const getValue = jest.fn().mockReturnValue('value');

  it('should create a submit button and click it', (done) => {
    const getDisabled = jest.fn().mockReturnValue(false);
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);
    const formAppendChildSpy = jest.spyOn(form, 'appendChild');

    const fakeButton = document.createElement('button');
    const fakeButtonClickSpy = jest.spyOn(fakeButton, 'click');
    const fakeButtonRemoveSpy = jest.spyOn(fakeButton, 'remove');

    jest.spyOn(document, 'createElement').mockReturnValueOnce(fakeButton);

    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);

    // Timeout necessary since function uses 1 tick timeout
    setTimeout(() => {
      expect(fakeButton.getAttribute('type')).toBe(getType());
      expect(fakeButton.getAttribute('name')).toBe(getName());
      expect(fakeButton.getAttribute('value')).toBe(getValue());
      expect(fakeButton.style.display).toBe('none');
      expect(formAppendChildSpy).toHaveBeenCalledWith(fakeButton);
      expect(fakeButtonClickSpy).toHaveBeenCalled();
      expect(fakeButtonRemoveSpy).toHaveBeenCalled();
      done();
    }, 10);
  });

  it('should not create a submit button if disabled', () => {
    const getDisabled = jest.fn().mockReturnValue(true);
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);

    const createElementSpy = jest.spyOn(document, 'createElement');
    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);

    expect(getDisabled).toHaveBeenCalled();
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it('should not create a submit button if not within form', () => {
    const getDisabled = jest.fn().mockReturnValue(true);
    const createElementSpy = jest.spyOn(document, 'createElement');
    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);
    expect(createElementSpy).not.toHaveBeenCalled();
  });
});
