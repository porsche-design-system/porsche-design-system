import { vi } from 'vitest';
import * as handleButtonUtils from './button-handling';
import { handleButtonEvent, improveButtonHandlingForCustomElement } from './button-handling';

describe('improveButtonHandlingForCustomElement()', () => {
  it('should add a click event listener to the element', () => {
    const element = document.createElement('button');
    const getType = vi.fn().mockReturnValue('button');
    const getName = vi.fn().mockReturnValue('name');
    const getValue = vi.fn().mockReturnValue('value');
    const getDisabled = vi.fn().mockReturnValue(false);
    const handleButtonEventSpy = vi.spyOn(handleButtonUtils, 'handleButtonEvent');

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
  const getType = vi.fn().mockReturnValue('submit');
  const getName = vi.fn().mockReturnValue('name');
  const getValue = vi.fn().mockReturnValue('value');

  it('should create a submit button and click it', async () => {
    const getDisabled = vi.fn().mockReturnValue(false);
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);
    const formAppendChildSpy = vi.spyOn(form, 'appendChild');

    const fakeButton = document.createElement('button');
    const fakeButtonClickSpy = vi.spyOn(fakeButton, 'click');
    const fakeButtonRemoveSpy = vi.spyOn(fakeButton, 'remove');

    vi.spyOn(document, 'createElement').mockReturnValueOnce(fakeButton);

    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);

    const asyncTimeout = (ms: number): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    // Timeout necessary since function uses 1 tick timeout
    await asyncTimeout(10);

    expect(fakeButton.getAttribute('type')).toBe(getType());
    expect(fakeButton.getAttribute('name')).toBe(getName());
    expect(fakeButton.getAttribute('value')).toBe(getValue());
    expect(fakeButton.style.display).toBe('none');
    expect(formAppendChildSpy).toHaveBeenCalledWith(fakeButton);
    expect(fakeButtonClickSpy).toHaveBeenCalled();
    expect(fakeButtonRemoveSpy).toHaveBeenCalled();
  });

  it('should not create a submit button if disabled', () => {
    const getDisabled = vi.fn().mockReturnValue(true);
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);

    const createElementSpy = vi.spyOn(document, 'createElement');
    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);

    expect(getDisabled).toHaveBeenCalled();
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it('should not create a submit button if not within form', () => {
    const getDisabled = vi.fn().mockReturnValue(true);
    const createElementSpy = vi.spyOn(document, 'createElement');
    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);
    expect(createElementSpy).not.toHaveBeenCalled();
  });
});
