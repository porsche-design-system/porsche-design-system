import { Script } from './Script.tsx';

/**
 * Shared client-side constraint validation for `<form novalidate>`.
 *
 * Validation architecture:
 * - **Declarative constraints:** Fields opt in via HTML/PDS attributes (`required`, `min`, `max`, `pattern`, `type`)
 *   and custom error messages (`data-error` for missing values, `data-error-format` for invalid format/range).
 *   Controls with `data-novalidate` (e.g. Back or Reset buttons) bypass blur validation when clicked.
 * - **Validate on blur & submit ("punish late"):** Captures the PDS `blur` `CustomEvent` to validate a field once the
 *   user has interacted with it (`data-dirty`), already entered a value, or after the first submit attempt. Submit
 *   validates all visible fields (`:not([hidden])`), focuses the first invalid control, or emits `formvalid`.
 * - **Clear on input ("reward early"):** While a field is in `state="error"`, `input` and `change` events re-validate
 *   on every keystroke and clear the error immediately once valid. `reset` clears all errors and dirty state.
 */
export const FormValidation = () => (
  <Script>{
    /* language=JavaScript */ `
    // Validates required and format constraints on PDS form controls.
    const validateField = (field) => {
      const innerControls = Array.from(field.shadowRoot?.querySelectorAll('input, textarea') ?? []);
      const nativeInvalid = innerControls.some((control) => !control.checkValidity());
      const value = field.value;
      const empty =
        field.tagName === 'P-CHECKBOX'
          ? !field.checked
          : field.tagName === 'P-FIELDSET'
            ? !Array.from(field.querySelectorAll('p-checkbox')).some((checkbox) => checkbox.checked)
            : Array.isArray(value)
              ? value.length === 0
              : value === undefined || value === null || String(value).trim() === '';

      const isInvalid = nativeInvalid || (field.required && empty);
      field.state = isInvalid ? 'error' : 'none';
      field.message = isInvalid
        ? (!empty && field.dataset.errorFormat) || field.dataset.error || \`Please fill in \${field.label || 'this field'}.\`
        : '';
      return !isInvalid;
    };

    for (const form of document.querySelectorAll('form[novalidate]')) {
      // Skip fields in a [hidden] ancestor so multi-step forms only validate the visible step.
      const getFields = () =>
        Array.from(form.querySelectorAll('[required], [data-error], [data-error-format]')).filter(
          (field) => !field.closest('[hidden]')
        );

      const onFieldBlur = (event) => {
        if (!(event instanceof CustomEvent)) return;
        const nextFocus = event.detail?.relatedTarget ?? event.relatedTarget;
        if (nextFocus?.closest?.('[type="reset"], [data-novalidate]')) return;

        const field = event.target;
        if (field.closest?.('[hidden]')) return;
        const canValidateOnBlur =
          field.dataset.dirty === 'true' || form.dataset.submitted === 'true' || String(field.value ?? '').trim() !== '';

        if (canValidateOnBlur && field.matches?.('[required], [data-error], [data-error-format]')) {
          validateField(field);
        }
        const fieldset = field.closest?.('p-fieldset[required]');
        if (fieldset && canValidateOnBlur && !fieldset.contains(nextFocus)) {
          validateField(fieldset);
        }
      };

      const onFieldUpdate = (event) => {
        const field = event.target;
        field.dataset.dirty = 'true';
        if (field.state === 'error') {
          validateField(field);
        }
        const fieldset = field.closest?.('p-fieldset[required]');
        if (fieldset) {
          fieldset.dataset.dirty = 'true';
          if (fieldset.state === 'error') {
            validateField(fieldset);
          }
        }
      };

      form.addEventListener('blur', onFieldBlur, true);
      form.addEventListener('change', onFieldUpdate);
      form.addEventListener('input', onFieldUpdate);

      form.addEventListener('reset', () => {
        delete form.dataset.submitted;
        for (const field of form.querySelectorAll('[required], [data-error], [data-error-format], [data-dirty]')) {
          delete field.dataset.dirty;
          field.state = 'none';
          field.message = '';
        }
      });

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.dataset.submitted = 'true';
        const invalidFields = getFields().filter((field) => !validateField(field));
        const firstInvalid = invalidFields[0];
        if (firstInvalid) {
          (
            firstInvalid.querySelector('p-segmented-control-item:not([disabled]), p-checkbox:not([disabled])') ??
            firstInvalid
          ).focus();
          return;
        }
        delete form.dataset.submitted;
        form.dispatchEvent(new CustomEvent('formvalid', { bubbles: true }));
      });
    }
  `
  }</Script>
);
