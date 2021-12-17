import {
  getInputPadding,
  setInputStyles,
  hasCounter,
  throwIfUnitLengthExceeded,
  TextFieldWrapperUnitPosition,
  hasUnitAndIsTypeNumber,
  hasCounterAndIsTypeText,
  setCounterInnerHtml,
} from './text-field-wrapper-utils';
import { FormState } from '../../../types';

describe('getInputPadding()', () => {
  it.each<[TextFieldWrapperUnitPosition, FormState, string]>([
    ['prefix', 'none', '0.6875rem 0.6875rem 0.6875rem 3.75rem'],
    ['prefix', 'success', '0.625rem 0.625rem 0.625rem 3.75rem'],
    ['suffix', 'none', '0.6875rem 3.75rem 0.6875rem 0.6875rem'],
    ['suffix', 'success', '0.625rem 3.75rem 0.625rem 0.625rem'],
  ])('should for unitPosition: %s and state: %s return %s', (unitPosition, state, expected) => {
    expect(getInputPadding(60, unitPosition, state)).toBe(expected);
  });
});

describe('setInputStyles()', () => {
  it('should set inline style on input type number', async () => {
    const input = document.createElement('input');
    const unitElement = document.createElement('span');
    Object.defineProperty(unitElement, 'offsetWidth', { writable: true, configurable: true, value: 60 });
    setInputStyles(input, unitElement, 'prefix', 'none');

    expect(input.style.cssText).toBe('padding: 0.6875rem 0.6875rem 0.6875rem 3.75rem !important;');
  });
});

describe('throwIfUnitLengthExceeded()', () => {
  it('should throw error if unit length > 5', () => {
    expect(() => throwIfUnitLengthExceeded('123456')).toThrow();
  });
});

describe('hasCounter()', () => {
  it('return true if maxLength is defined', async () => {
    const inputElement = document.createElement('input');
    Object.defineProperty(inputElement, 'maxLength', { writable: true, configurable: true, value: 20 });
    expect(hasCounter(inputElement)).toBe(true);
  });
  it('return false if maxLength is undefined', async () => {
    const inputElement = document.createElement('input');
    Object.defineProperty(inputElement, 'maxLength', {});
    expect(hasCounter(inputElement)).toBe(false);
  });
});

describe('hasCounterAndIsTypeText()', () => {
  it('return true if maxLength is defined and input is of type "text"', async () => {
    const inputElement = document.createElement('input');
    Object.defineProperty(inputElement, 'maxLength', { writable: true, configurable: true, value: 20 });
    Object.defineProperty(inputElement, 'type', { writable: true, configurable: true, value: 'text' });
    expect(hasCounterAndIsTypeText(inputElement)).toBe(true);
  });
  it('return false if maxLength is defined and input is of type "number"', async () => {
    const inputElement = document.createElement('input');
    Object.defineProperty(inputElement, 'maxLength', { writable: true, configurable: true, value: 20 });
    Object.defineProperty(inputElement, 'type', { writable: true, configurable: true, value: 'number' });
    expect(hasCounterAndIsTypeText(inputElement)).toBe(false);
  });
});

describe('hasUnitAndIsTypeNumber()', () => {
  it('return true if unit is "EUR" and input is of type "number"', () => {
    const inputElement = document.createElement('input');
    Object.defineProperty(inputElement, 'type', { writable: true, configurable: true, value: 'number' });
    expect(hasUnitAndIsTypeNumber(inputElement, 'EUR')).toBe(true);
  });
  it('return false if unit is "" and input is of type "number"', () => {
    const inputElement = document.createElement('input');
    Object.defineProperty(inputElement, 'type', { writable: true, configurable: true, value: 'number' });
    expect(hasUnitAndIsTypeNumber(inputElement, '')).toBe(false);
  });
});

describe('setCounterInnerHtml()', () => {
  it('return character count as innerText for element ', async () => {
    const element = document.createElement('input');
    const counterElement = document.createElement('span');
    Object.defineProperty(element, 'maxLength', { writable: true, configurable: true, value: 20 });
    Object.defineProperty(element, 'value', { writable: true, configurable: true, value: 'vier' });
    setCounterInnerHtml(element, counterElement);
    expect(counterElement.innerText).toBe('4/20');
  });
});
