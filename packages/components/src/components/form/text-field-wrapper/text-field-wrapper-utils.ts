import type { FormState } from '../form-state';
import { pxToRemWithUnit } from '../../../styles';
import { getClosestHTMLElement } from '../../../utils';
import { hasCounter } from '../form-utils';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = typeof UNIT_POSITIONS[number];

export const hasCounterAndIsTypeText = (el: HTMLInputElement): boolean => isType(el.type, 'text') && hasCounter(el);
export const hasUnitAndIsTypeTextOrNumber = ({ type }: HTMLInputElement, unit: string): boolean => {
  return !!unit && (isType(type, 'text') || isType(type, 'number'));
};

export const isType = (inputType: string, typeToValidate: string): boolean => inputType === typeToValidate;
export const isWithinForm = (host: HTMLElement): boolean => !!getClosestHTMLElement(host, 'form');

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

export const addInputEventListenerForSearch = (
  input: HTMLInputElement,
  inputChangeCallback: (hasValue: boolean) => void
): void => {
  input.addEventListener('input', (e: Event & { target: HTMLInputElement }) => {
    inputChangeCallback(!!e.target.value);
  });
  input.addEventListener('keydown', (e: KeyboardEvent & { target: HTMLInputElement }) => {
    if (e.key === 'Escape' && e.target.value) {
      e.preventDefault();
      e.target.value = '';
      // need to emit event so consumer's change listeners fire for resetting a search, etc.
      dispatchInputEvent(e.target);
    }
  });
};

export const dispatchInputEvent = (el: HTMLInputElement): void => {
  el.dispatchEvent(new Event('input'));
};
