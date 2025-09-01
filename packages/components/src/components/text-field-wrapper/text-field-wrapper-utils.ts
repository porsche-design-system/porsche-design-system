import type { IconName } from '../../types';
import {
  getHasConstructableStylesheetSupport,
  hasCounter,
  hasShowPickerSupport,
  throwException,
} from '../../utils';
import { borderWidthBase } from '@porsche-design-system/styles';
import type { FormState } from '../../utils/form/form-state';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = (typeof UNIT_POSITIONS)[number];

export type TextFieldWrapperActionIcon = IconName;
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

export const showCustomCalendarOrTimeIndicator = (isCalendar: boolean, isTime: boolean): boolean => {
  return hasShowPickerSupport() && (isCalendar || isTime);
};

/**
 * Map of flyout instances and their corresponding css stylesheets including the experimental css property --p-flyout-sticky-top.
 */
export const counterCharacterLengthCssVarStyleSheetMap = new Map<HTMLElement, CSSStyleSheet>();

// Called once in didRender for setup
export const addCounterCharacterLengthCssVarStyleSheet = (host: HTMLElement): void => {
  if (getHasConstructableStylesheetSupport()) {
    counterCharacterLengthCssVarStyleSheetMap.set(host, new CSSStyleSheet());
    // It's very important to create and push the stylesheet after `attachComponentCss()` has been called, otherwise styles might replace each other.
    // TODO: for some reason unit test in Docker environment throws TS2339: Property 'push' does not exist on type 'readonly CSSStyleSheet[]'
    /* eslint-disable @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    host.shadowRoot.adoptedStyleSheets.push(counterCharacterLengthCssVarStyleSheetMap.get(host));
    updateCounterCharacterLengthCssVarStyleSheet(host, 0);
  }
};

export const updateCounterCharacterLengthCssVarStyleSheet = (host: HTMLElement, value: number): void => {
  // EXPERIMENTAL CSS variable
  counterCharacterLengthCssVarStyleSheetMap
    .get(host)
    .replaceSync(`:host{--p-internal-counter-character-length:${value}}`);
};
