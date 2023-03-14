import type { IconName } from '../../types';
import { getClosestHTMLElement, hasCounter, hasDocument } from '../../utils';
import { borderWidthBase } from '@porsche-design-system/utilities-v2';
import { cssVariableInputPaddingLeft, cssVariableInputPaddingRight } from './text-field-wrapper-styles';
import type { FormState } from '../../utils/form/form-state';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = typeof UNIT_POSITIONS[number];

export type TextFieldWrapperActionIcon = Extract<IconName, 'locate'>;
export type TextFieldWrapperState = FormState;

export const hasCounterAndIsTypeText = (el: HTMLInputElement): boolean => isType(el.type, 'text') && hasCounter(el);
export const hasUnitAndIsTypeTextOrNumber = ({ type }: HTMLInputElement, unit: string): boolean => {
  return !!unit && (isType(type, 'text') || isType(type, 'number'));
};

export const isType = (inputType: string, typeToValidate: string): boolean => inputType === typeToValidate;
export const isWithinForm = (host: HTMLElement): boolean => !!getClosestHTMLElement(host, 'form');
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
    input.style.removeProperty(cssVariableInputPaddingLeft);
    input.style.removeProperty(cssVariableInputPaddingRight);

    input.style.setProperty(
      unitPosition === 'prefix' ? cssVariableInputPaddingLeft : cssVariableInputPaddingRight,
      getInputPaddingLeftOrRight(unitOrCounterElement.offsetWidth),
      'important'
    );
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
