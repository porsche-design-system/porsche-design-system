import { pxToRemWithUnit } from '../../../utils';
import { FormState } from '../../../types';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = typeof UNIT_POSITIONS[number];

export const hasCounter = (el: HTMLTextAreaElement | HTMLInputElement): boolean => el.maxLength >= 0;
export const hasCounterAndIsTypeText = (el: HTMLInputElement): boolean => el.type === 'text' && hasCounter(el);
export const hasUnitAndIsTypeNumber = (el: HTMLInputElement, unit: string): boolean => !!unit && el.type === 'number';
export const setCounterInnerHtml = (el: HTMLTextAreaElement | HTMLInputElement, counterElement: HTMLElement): void => {
  counterElement.innerText = `${el.value.length}/${el.maxLength}`;
};
export const setCharacterCountInnerHtml = (
  el: HTMLTextAreaElement | HTMLInputElement,
  characterCountElement: HTMLSpanElement
): void => {
  characterCountElement.innerText = `You have ${el.maxLength - el.value.length} out of ${el.maxLength} characters left`;
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

export const addInputEventListener = (
  input: HTMLTextAreaElement | HTMLInputElement,
  counterElement: HTMLSpanElement,
  characterCountElement: HTMLSpanElement,
  inputChangeCallback?: () => void
): void => {
  input.addEventListener('input', (e) => {
    setCounterInnerHtml(e.target as HTMLTextAreaElement | HTMLInputElement, counterElement);
    setCharacterCountInnerHtml(e.target as HTMLTextAreaElement | HTMLInputElement, characterCountElement);
    if (inputChangeCallback) {
      inputChangeCallback();
    }
  });
};
