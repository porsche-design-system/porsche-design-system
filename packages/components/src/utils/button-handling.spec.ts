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
    const handleButtonEventSpy = vi.spyOn(handleButtonUtils.internal, 'handleButtonEvent');

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
  let element: HTMLButtonElement;
  let getType: ReturnType<typeof vi.fn>;
  let getName: ReturnType<typeof vi.fn>;
  let getValue: ReturnType<typeof vi.fn>;
  let getDisabled: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    element = document.createElement('button');
    getType = vi.fn().mockReturnValue('submit');
    getName = vi.fn().mockReturnValue('name');
    getValue = vi.fn().mockReturnValue('value');
    getDisabled = vi.fn().mockReturnValue(false);
  });

  it('should create a submit button and click it', async () => {
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);
    const formAppendChildSpy = vi.spyOn(form, 'appendChild');

    const fakeButton = document.createElement('button');
    const fakeButtonClickSpy = vi.spyOn(fakeButton, 'click');
    const fakeButtonRemoveSpy = vi.spyOn(fakeButton, 'remove');

    vi.spyOn(document, 'createElement').mockReturnValueOnce(fakeButton);

    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);

    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(fakeButton.getAttribute('type')).toBe('submit');
    expect(fakeButton.getAttribute('name')).toBe('name');
    expect(fakeButton.getAttribute('value')).toBe('value');
    expect(fakeButton.style.display).toBe('none');
    expect(formAppendChildSpy).toHaveBeenCalledWith(fakeButton);
    expect(fakeButtonClickSpy).toHaveBeenCalled();
    expect(fakeButtonRemoveSpy).toHaveBeenCalled();
  });

  it('should not create a submit button if disabled', () => {
    getDisabled.mockReturnValue(true);
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);

    const createElementSpy = vi.spyOn(document, 'createElement');
    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);

    expect(getDisabled).toHaveBeenCalled();
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it('should not create a submit button if not within form', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);
    expect(createElementSpy).not.toHaveBeenCalled();
  });
});
