import type { FormState } from '../../../types';
import { pxToRemWithUnit } from '../../../styles';
import { getClosestHTMLElement } from '../../../utils';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = typeof UNIT_POSITIONS[number];

export const hasCounter = (el: HTMLTextAreaElement | HTMLInputElement): boolean => el.maxLength >= 0;
export const hasCounterAndIsTypeText = (el: HTMLInputElement): boolean => isType(el.type, 'text') && hasCounter(el);
export const hasUnitAndIsTypeTextOrNumber = ({ type }: HTMLInputElement, unit: string): boolean => {
  return !!unit && (isType(type, 'text') || isType(type, 'number'));
};

export const isType = (inputType: string, typeToValidate: string): boolean => inputType === typeToValidate;
export const isWithinForm = (host: HTMLElement): boolean => !!getClosestHTMLElement(host, 'form');

export const setCounterInnerHtml = (el: HTMLTextAreaElement | HTMLInputElement, counterElement: HTMLElement): void => {
  counterElement.innerText = `${el.value.length}/${el.maxLength}`;
};

export const setAriaElementInnerHtml = (
  el: HTMLTextAreaElement | HTMLInputElement,
  ariaElement: HTMLSpanElement
): void => {
  ariaElement.innerText = `You have ${el.maxLength - el.value.length} out of ${el.maxLength} characters left`;
};

export const getInputPadding = (
  unitElementWidth: number,
  unitPosition: TextFieldWrapperUnitPosition,
  state: FormState
): string => {
  const padding = pxToRemWithUnit(state !== 'none' ? 10 : 11);
  return unitPosition === 'prefix'
    ? `${padding} ${padding} ${padding} ${pxToRemWithUnit(unitElementWidth)}`
    : `${padding} ${pxToRemWithUnit(unitElementWidth)} ${padding} ${padding}`;
};

export const setInputStyles = (
  input: HTMLInputElement,
  unitOrCounterElement: HTMLElement,
  unitPosition: TextFieldWrapperUnitPosition,
  state: FormState
): void => {
  if (unitOrCounterElement) {
    input.style.setProperty(
      'padding',
      getInputPadding(unitOrCounterElement.offsetWidth, unitPosition, state),
      'important'
    );
  }
};

export const throwIfUnitLengthExceeded = (unit: string): void => {
  if (unit.length > 5) {
    throw new RangeError(`Unit: ${unit} passed to 'PTextFieldWrapper' exceeds the maximum length of 5`);
  }
};

export const addInputEventListenerForCounter = (
  input: HTMLTextAreaElement | HTMLInputElement,
  characterCountElement: HTMLSpanElement,
  counterElement?: HTMLSpanElement,
  inputChangeCallback?: () => void
): void => {
  if (counterElement) {
    setCounterInnerHtml(input, counterElement); // initial value
  }
  setAriaElementInnerHtml(input, characterCountElement); // initial value

  input.addEventListener('input', (e: Event & { target: HTMLTextAreaElement | HTMLInputElement }) => {
    if (counterElement) {
      setCounterInnerHtml(e.target, counterElement);
    }
    setAriaElementInnerHtml(e.target, characterCountElement);
    if (inputChangeCallback) {
      inputChangeCallback();
    }
  });
};

export const addInputEventListenerForSearch = (
  input: HTMLInputElement,
  inputChangeCallback: (hasValue: boolean) => void
): void => {
  input.addEventListener('input', (e: Event & { target: HTMLInputElement }) => {
    inputChangeCallback(!!e.target.value);
  });
  input.addEventListener('keydown', (e: KeyboardEvent & { target: HTMLInputElement }) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.target.value = '';
      // need to emit event so consumer's change listeners fire for resetting a search, etc.
      e.target.dispatchEvent(new Event('input'));
    }
  });
};
