import { getClosestHTMLElement, hasCounter } from '../../utils';
import type { IconName } from '../../types';
import { spacingStaticMedium } from '@porsche-design-system/utilities-v2';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = typeof UNIT_POSITIONS[number];

export const hasCounterAndIsTypeText = (el: HTMLInputElement): boolean => isType(el.type, 'text') && hasCounter(el);
export const hasUnitAndIsTypeTextOrNumber = ({ type }: HTMLInputElement, unit: string): boolean => {
  return !!unit && (isType(type, 'text') || isType(type, 'number'));
};

export const isType = (inputType: string, typeToValidate: string): boolean => inputType === typeToValidate;
export const isWithinForm = (host: HTMLElement): boolean => !!getClosestHTMLElement(host, 'form');
export const hasLocateAction = (icon: IconName): boolean => icon === 'locate';

export const getInputPadding = (unitElementWidth: number, unitPosition: TextFieldWrapperUnitPosition): string => {
  const topBottomPadding = '14px';
  return unitPosition === 'prefix'
    ? `${topBottomPadding} ${spacingStaticMedium} ${topBottomPadding} ${unitElementWidth - 2}px` // -2px to compensate border
    : `${topBottomPadding} ${unitElementWidth - 2}px ${topBottomPadding} ${spacingStaticMedium}`; // -2px to compensate border
};

export const setInputStyles = (
  input: HTMLInputElement,
  unitOrCounterElement: HTMLElement,
  unitPosition: TextFieldWrapperUnitPosition
): void => {
  if (unitOrCounterElement) {
    input.style.setProperty('padding', getInputPadding(unitOrCounterElement.offsetWidth, unitPosition), 'important');
  }
};

export const throwIfUnitLengthExceeded = (unit: string): void => {
  if (unit.length > 5) {
    throw new RangeError(`unit: ${unit} passed to 'p-text-field-wrapper' exceeds the maximum length of 5`);
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
  // { bubbles: true } is crucial for react onChange callback getting invoked
  el.dispatchEvent(new Event('input', { bubbles: true }));
};
