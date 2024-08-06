import type { FormState } from '../../utils/form/form-state';
import { setAttribute, setAttributes } from '../../utils';

export type TextareaState = FormState;
export const INTERNAL_TEXTAREA_SLOT = 'internal-textarea';

export const AUTO_FILL = ['off', 'on', ''] as const;
export type AutoFillType = (typeof AUTO_FILL)[number];

export const TEXTAREA_WRAPS = ['hard', 'soft', 'off'] as const;
export type TextareaWrapType = (typeof TEXTAREA_WRAPS)[number];

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
  value: string
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
    value
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
  value: string
): void => {
  nativeSelect.value = value;
  setAttribute(nativeSelect, 'name', name);
  setAttribute(nativeSelect, 'placeholder', placeholder);
  setAttribute(nativeSelect, 'maxlength', maxLength ? maxLength.toString() : null);
  setAttribute(nativeSelect, 'minlength', minLength ? minLength.toString() : null);
  setAttribute(nativeSelect, 'autocomplete', autoComplete ?? null);
  setAttribute(nativeSelect, 'wrap', wrap);
  nativeSelect.toggleAttribute('disabled', disabled);
  nativeSelect.toggleAttribute('required', required);
  nativeSelect.toggleAttribute('readonly', readOnly);
  nativeSelect.toggleAttribute('autofocus', autoFocus);
  nativeSelect.toggleAttribute('spellcheck', spellCheck);
};
