import { type Mock, vi } from 'vitest';
import type { ButtonType } from '../types';
import { handleButtonEvent, improveButtonHandlingForCustomElement } from './button-handling';

// runs even when a test fails, so fake timers can never leak into the next one
afterEach(() => {
  vi.useRealTimers();
});

describe('improveButtonHandlingForCustomElement()', () => {
  it('should on click of the element create and click a submit button within the surrounding form', async () => {
    vi.useFakeTimers();

    const element = document.createElement('button');
    element.type = 'button';
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);

    const getType = vi.fn().mockReturnValue('submit');
    const getName = vi.fn().mockReturnValue('name');
    const getValue = vi.fn().mockReturnValue('value');
    const getDisabled = vi.fn().mockReturnValue(false);

    const fakeButton = document.createElement('button');
    const fakeButtonClickSpy = vi.spyOn(fakeButton, 'click');
    vi.spyOn(document, 'createElement').mockReturnValueOnce(fakeButton);

    improveButtonHandlingForCustomElement(element, getType, getDisabled, getName, getValue);

    element.click();

    await vi.runAllTimersAsync();

    expect(fakeButton.getAttribute('type')).toBe('submit');
    expect(fakeButtonClickSpy).toHaveBeenCalled();
  });
});

describe('handleButtonEvent()', () => {
  let element: HTMLButtonElement;
  let getType: Mock<() => ButtonType>;
  let getName: Mock<() => string>;
  let getValue: Mock<() => string>;
  let getDisabled: Mock<() => boolean>;

  beforeEach(() => {
    element = document.createElement('button');
    getType = vi.fn<() => ButtonType>().mockReturnValue('submit');
    getName = vi.fn<() => string>().mockReturnValue('name');
    getValue = vi.fn<() => string>().mockReturnValue('value');
    getDisabled = vi.fn<() => boolean>().mockReturnValue(false);
  });

  it('should create a submit button and click it', async () => {
    vi.useFakeTimers();

    const form = document.createElement('form');
    document.body.appendChild(form);
    form.append(element);
    const formAppendChildSpy = vi.spyOn(form, 'appendChild');

    const fakeButton = document.createElement('button');
    const fakeButtonClickSpy = vi.spyOn(fakeButton, 'click');
    const fakeButtonRemoveSpy = vi.spyOn(fakeButton, 'remove');

    vi.spyOn(document, 'createElement').mockReturnValueOnce(fakeButton);

    handleButtonEvent(new MouseEvent('click'), element, getType, getDisabled, getName, getValue);

    await vi.runAllTimersAsync();

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
