import type { IconName } from '../../types';
import { hasCounter, hasDocument, throwException } from '../../utils';
import { borderWidthBase } from '@porsche-design-system/styles';
import { cssVariableInputPaddingStart, cssVariableInputPaddingEnd } from './text-field-wrapper-styles';
import type { FormState } from '../../utils/form/form-state';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = (typeof UNIT_POSITIONS)[number];

export type TextFieldWrapperActionIcon = Extract<IconName, 'locate'>;
export type TextFieldWrapperState = FormState;

export const hasCounterAndIsTypeText = (el: HTMLInputElement | undefined): boolean =>
  el && isType(el.type, 'text') && hasCounter(el);
export const hasUnitAndIsTypeTextOrNumber = (el: HTMLInputElement | undefined, unit: string): boolean => {
  return el && !!unit && (isType(el.type, 'text') || isType(el.type, 'number'));
};

export const isType = (inputType: string, typeToValidate: string): boolean => inputType === typeToValidate;
export const hasLocateAction = (icon: IconName): boolean => icon === 'locate';

export const getInputPaddingLeftOrRight = (unitElementWidth: number): string => {
  return `calc(${unitElementWidth}px - ${borderWidthBase})`;
};

export const setInputStyles = (
  input: HTMLInputElement,
  unitOrCounterElement: HTMLElement,
  unitPosition: TextFieldWrapperUnitPosition
): void => {
  if (unitOrCounterElement) {
    input.style.removeProperty(cssVariableInputPaddingStart);
    input.style.removeProperty(cssVariableInputPaddingEnd);

    input.style.setProperty(
      unitPosition === 'prefix' ? cssVariableInputPaddingStart : cssVariableInputPaddingEnd,
      getInputPaddingLeftOrRight(unitOrCounterElement.offsetWidth), // in case fonts are not loaded, this value is wrong
      'important'
    );
  }
};

export const throwIfUnitLengthExceeded = (unit: string): void => {
  if (unit.length > 5) {
    throwException(`unit='${unit}' passed to p-text-field-wrapper exceeds the maximum length of 5.`);
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

// eslint-disable-next-line no-underscore-dangle
export const _hasShowPickerSupport = (): boolean => {
  return (
    hasDocument &&
    'showPicker' in HTMLInputElement.prototype &&
    // TODO: it would be better to determinate support by checking for existence of "calendar-picker-indicator"
    !!window.navigator.userAgent.match(/chrome|chromium|crios|edg/i)
  );
};
const hasShowPickerSupport = _hasShowPickerSupport();

export const showCustomCalendarOrTimeIndicator = (isCalendar: boolean, isTime: boolean): boolean => {
  return hasShowPickerSupport && (isCalendar || isTime);
};
