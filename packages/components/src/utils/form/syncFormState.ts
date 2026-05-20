/**
 * Mirrors native form-control semantics on a form-associated custom element (FACE)
 * by forwarding the inner form control's validity and value to the host's `ElementInternals`.
 *
 * Behavior:
 * - `disabled`: barred from constraint validation AND value is NOT submitted (when `value` is provided).
 * - `readOnly`: barred from constraint validation, but value IS submitted (when `value` is provided).
 * - otherwise: forward the inner control's `validity` / `validationMessage` and submit the value.
 *
 * Calling this on every render ensures any previously set invalid state is actively cleared
 * when the consumer toggles `disabled` / `readOnly` on, preventing
 * "An invalid form control … is not focusable." on form submit.
 *
 * The `value` key in `options` is optional. When omitted, `setFormValue` is not called
 * (useful for components like `p-checkbox` that manage their form value via dedicated
 * change/reset handlers because submission depends on `checked`, not on every render).
 *
 * @param internals    The host's `ElementInternals` (may be `undefined` in environments where unavailable).
 * @param formControl  The inner native form control (`<input>`, `<textarea>`, `<select>`).
 * @param options      `disabled`, `readOnly`, optional `value` to submit.
 */
export const syncFormState = (
  internals: ElementInternals | undefined,
  formControl: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  options: {
    disabled?: boolean;
    readOnly?: boolean;
    value?: string | null;
  }
): void => {
  const { disabled, readOnly } = options;
  const hasValue = 'value' in options;

  if (disabled) {
    internals?.setValidity({});
    if (hasValue) internals?.setFormValue(null);
  } else if (readOnly) {
    internals?.setValidity({});
    if (hasValue) internals?.setFormValue(options.value ?? null);
  } else {
    internals?.setValidity(formControl.validity, formControl.validationMessage || ' ', formControl);
    if (hasValue) internals?.setFormValue(options.value ?? null);
  }
};

