import { vi } from 'vitest';
import * as formUtils from './form-utils';
import { hasCounter, setAriaElementInnerHtml, setCounterInnerHtml, updateCounter } from './form-utils';

vi.useFakeTimers();

const getInputElement = (): HTMLInputElement => {
  const el = document.createElement('input');
  el.id = 'input';
  return el;
};
const getCounterElement = (): HTMLSpanElement => {
  const el = document.createElement('span');
  el.id = 'counter';
  return el;
};
const getAriaElement = (): HTMLSpanElement => {
  const el = document.createElement('span');
  el.id = 'ariaElement';
  return el;
};

describe('hasCounter()', () => {
  it('should for defined maxLength return true', () => {
    const inputElement = getInputElement();
    inputElement.maxLength = 20;
    expect(hasCounter(inputElement)).toBe(true);
  });

  it('should for undefined maxLength return false', () => {
    const inputElement = getInputElement();
    Object.defineProperty(inputElement, 'maxLength', { value: -1 }); // jsdom defaults to 524288 which is 512 KB
    expect(hasCounter(inputElement)).toBe(false);
  });
});

describe('setCounterInnerHtml()', () => {
  it('should set correct character count as innerText on element ', () => {
    const counterElement = getCounterElement();
    const inputElement = getInputElement();

    inputElement.maxLength = 20;
    inputElement.value = 'some';
    setCounterInnerHtml(inputElement, counterElement);
    expect(counterElement.innerText).toBe('4/20');

    inputElement.maxLength = 25;
    inputElement.value = 'Hi';
    setCounterInnerHtml(inputElement, counterElement);
    expect(counterElement.innerText).toBe('2/25');
  });
});

describe('setAriaElementInnerHtml()', () => {
  const getAccessibilityMessage = (remainingCharacter: number, maxCharacter: number) =>
    `You have ${remainingCharacter} out of ${maxCharacter} characters left`;

  it('should set correct character count text for screen reader as innerText on element', () => {
    const ariaElement = getAriaElement();
    const inputElement = getInputElement();

    inputElement.maxLength = 20;
    setAriaElementInnerHtml(inputElement, ariaElement);
    vi.advanceTimersByTime(800);
    expect(ariaElement.innerText).toBe(getAccessibilityMessage(20, 20));

    inputElement.value = 'some';
    setAriaElementInnerHtml(inputElement, ariaElement);
    vi.advanceTimersByTime(800);
    expect(ariaElement.innerText).toBe(getAccessibilityMessage(16, 20));

    inputElement.maxLength = 25;
    inputElement.value = 'Hi';
    setAriaElementInnerHtml(inputElement, ariaElement);
    vi.advanceTimersByTime(800);
    expect(ariaElement.innerText).toBe(getAccessibilityMessage(23, 25));
  });
});

describe('updateCounter()', () => {
  it('should initially call setCounterInnerHtml() and setAriaElementInnerHtml()', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();

    const setCounterInnerHtmlSpy = vi.spyOn(formUtils, 'setCounterInnerHtml');
    const setAriaElementInnerHtmlSpy = vi.spyOn(formUtils, 'setAriaElementInnerHtml');
    updateCounter(inputElement, ariaElement, counterElement);

    expect(setCounterInnerHtmlSpy).toHaveBeenCalledWith(inputElement, counterElement);
    expect(setCounterInnerHtmlSpy).toHaveBeenCalledTimes(1);

    expect(setAriaElementInnerHtmlSpy).toHaveBeenCalledWith(inputElement, ariaElement);
    expect(setAriaElementInnerHtmlSpy).toHaveBeenCalledTimes(1);
  });

  it('should on input event call inputChangeCallback() if supplied', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();
    const callback = vi.fn();
    updateCounter(inputElement, ariaElement, counterElement, callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('debounce', () => {
  let mockFn: vi.Mock;

  beforeEach(() => {
    mockFn = vi.fn();
  });

  it('should call the function after the specified delay', () => {
    const debouncedFn = formUtils.debounce(mockFn, 800);

    debouncedFn('test');
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time by 800ms
    vi.advanceTimersByTime(800);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('should only call the function once if invoked multiple times rapidly', () => {
    const debouncedFn = formUtils.debounce(mockFn, 800);

    debouncedFn('first call');
    debouncedFn('second call');
    debouncedFn('third call');

    // Fast-forward time by 800ms
    vi.advanceTimersByTime(800);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('third call');
  });

  it('should reset the timer if called again within the delay', () => {
    const debouncedFn = formUtils.debounce(mockFn, 800);

    debouncedFn('first call');
    vi.advanceTimersByTime(500);
    debouncedFn('second call');
    vi.advanceTimersByTime(500);

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('second call');
  });
});
