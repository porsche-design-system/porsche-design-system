import type { FormState } from '../../utils/form/form-state';
import { setAttribute, setAttributes, updateCounter } from '../../utils';
import type { EventEmitter } from '@stencil/core';

export type TextareaState = FormState;
export const INTERNAL_TEXTAREA_SLOT = 'internal-textarea';

export const AUTO_FILL = ['off', 'on', ''] as const;
export type AutoFillType = (typeof AUTO_FILL)[number];

export const TEXTAREA_WRAPS = ['hard', 'soft', 'off'] as const;
export type TextareaWrapType = (typeof TEXTAREA_WRAPS)[number];

export type TextareaUpdateEventDetail = { name: string; value: string };

export const initNativeTextarea = (
  host: HTMLElement,
  name: string,
  disabled: boolean,
  required: boolean,
  placeholder: string,
  maxLength: number,
  minLength: number,
  readOnly: boolean,
  autoFocus: boolean,
  spellCheck: boolean,
  autoComplete: AutoFillType,
  wrap: TextareaWrapType,
  value: string,
  dirName: string
): HTMLTextAreaElement => {
  const nativeSelect = document.createElement('textarea');
  setAttributes(nativeSelect, {
    'aria-hidden': 'true',
    tabindex: '-1',
    slot: INTERNAL_TEXTAREA_SLOT,
  });
  syncNativeSelect(
    nativeSelect,
    name,
    disabled,
    required,
    placeholder,
    maxLength,
    minLength,
    readOnly,
    autoFocus,
    spellCheck,
    autoComplete,
    wrap,
    value,
    dirName
  );
  host.prepend(nativeSelect);
  return nativeSelect;
};

export const syncNativeSelect = (
  nativeSelect: HTMLTextAreaElement,
  name: string,
  disabled: boolean,
  required: boolean,
  placeholder: string,
  maxLength: number,
  minLength: number,
  readOnly: boolean,
  autoFocus: boolean,
  spellCheck: boolean,
  autoComplete: AutoFillType,
  wrap: TextareaWrapType,
  value: string,
  dirName: string
): void => {
  nativeSelect.value = value;
  setAttribute(nativeSelect, 'name', name);
  setAttribute(nativeSelect, 'placeholder', placeholder);
  setAttribute(nativeSelect, 'maxlength', maxLength ? maxLength.toString() : null);
  setAttribute(nativeSelect, 'minlength', minLength ? minLength.toString() : null);
  setAttribute(nativeSelect, 'autocomplete', autoComplete ?? null);
  setAttribute(nativeSelect, 'dirname', dirName);
  setAttribute(nativeSelect, 'wrap', wrap);
  nativeSelect.toggleAttribute('disabled', disabled);
  nativeSelect.toggleAttribute('required', required);
  nativeSelect.toggleAttribute('readonly', readOnly);
  nativeSelect.toggleAttribute('autofocus', autoFocus);
  nativeSelect.toggleAttribute('spellcheck', spellCheck);
};

// https://javascript.info/currying-partials
export const textareaInputEventListenerCurry = (
  textareaElement: HTMLTextAreaElement,
  update: EventEmitter<TextareaUpdateEventDetail>,
  characterCountElement: HTMLSpanElement,
  counterElement?: HTMLSpanElement,
  inputChangeCallback?: () => void
): EventListener => {
  // returns actual listener function
  return (e: InputEvent): void => {
    update.emit({ name: textareaElement.name, value: textareaElement.value });
    updateCounter(
      e.target as HTMLInputElement | HTMLTextAreaElement,
      characterCountElement,
      counterElement,
      inputChangeCallback
    );
  };
};
