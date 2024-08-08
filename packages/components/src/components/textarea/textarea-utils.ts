import type { FormState } from '../../utils/form/form-state';
import { setAttribute, setAttributes, updateCounter } from '../../utils';
import type { EventEmitter } from '@stencil/core';

export type TextareaState = FormState;
export const INTERNAL_TEXTAREA_SLOT = 'internal-textarea';

export const AUTO_COMPLETE = ['off', 'on', ''] as const;
export type TextareaAutoComplete = (typeof AUTO_COMPLETE)[number];

export const TEXTAREA_WRAPS = ['hard', 'soft', 'off'] as const;
export type TextareaWrap = (typeof TEXTAREA_WRAPS)[number];

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
  autoComplete: TextareaAutoComplete,
  wrap: TextareaWrap,
  value: string,
  dirName: string
): HTMLTextAreaElement => {
  const nativeTextarea = document.createElement('textarea');
  setAttributes(nativeTextarea, {
    'aria-hidden': 'true',
    tabindex: '-1',
    slot: INTERNAL_TEXTAREA_SLOT,
  });
  syncNativeTextarea(
    nativeTextarea,
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
  host.prepend(nativeTextarea);
  return nativeTextarea;
};

export const syncNativeTextarea = (
  nativeTextarea: HTMLTextAreaElement,
  name: string,
  disabled: boolean,
  required: boolean,
  placeholder: string,
  maxLength: number,
  minLength: number,
  readOnly: boolean,
  autoFocus: boolean,
  spellCheck: boolean,
  autoComplete: TextareaAutoComplete,
  wrap: TextareaWrap,
  value: string,
  dirName: string
): void => {
  nativeTextarea.value = value;
  setAttribute(nativeTextarea, 'name', name);
  setAttribute(nativeTextarea, 'placeholder', placeholder);
  setAttribute(nativeTextarea, 'maxlength', maxLength ? maxLength.toString() : null);
  setAttribute(nativeTextarea, 'minlength', minLength ? minLength.toString() : null);
  setAttribute(nativeTextarea, 'autocomplete', autoComplete ?? null);
  setAttribute(nativeTextarea, 'dirname', dirName);
  setAttribute(nativeTextarea, 'wrap', wrap);
  nativeTextarea.toggleAttribute('disabled', disabled);
  nativeTextarea.toggleAttribute('required', required);
  nativeTextarea.toggleAttribute('readonly', readOnly);
  nativeTextarea.toggleAttribute('autofocus', autoFocus);
  nativeTextarea.toggleAttribute('spellcheck', spellCheck);
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
