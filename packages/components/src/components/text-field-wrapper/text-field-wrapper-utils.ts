import type { IconName } from '../../types';
import { hasCounter, hasDocument, throwException } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { cssVariableInputUnitCounterTextLength } from './text-field-wrapper-styles';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = (typeof UNIT_POSITIONS)[number];

export type TextFieldWrapperActionIcon = Extract<IconName, 'locate'>;
export type TextFieldWrapperState = FormState;

export const hasCounterAndIsTypeText = (el: HTMLInputElement): boolean => isType(el.type, 'text') && hasCounter(el);
export const hasUnitAndIsTypeTextOrNumber = ({ type }: HTMLInputElement, unit: string): boolean => {
  return !!unit && (isType(type, 'text') || isType(type, 'number'));
};

export const isType = (inputType: string, typeToValidate: string): boolean => inputType === typeToValidate;
export const hasLocateAction = (icon: IconName): boolean => icon === 'locate';

export const setInputUnitCounterTextLength = (
  input: HTMLInputElement,
  unit: string,
  isCounterVisible: boolean
): void => {
  let text = unit;

  if (isCounterVisible && input.attributes.getNamedItem('maxlength')) {
    text = `${input.value.length}/${input.attributes.getNamedItem('maxlength').value}`;
  }

  input.style.setProperty(cssVariableInputUnitCounterTextLength, text.length.toString());
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
