import { Script } from './Script.tsx';

/**
 * Shared client-side constraint validation for form patterns.
 *
 * Hooks onto every `<form novalidate>` on the page, validates required and format constraints on submit, moves focus
 * to the first invalid control, and clears the error state of a control as soon as the user corrects its value or
 * resets the form.
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
      field.message = isInvalid ? field.dataset.error || \`Please fill in \${field.label || 'this field'}.\` : '';
      return !isInvalid;
    };

    for (const form of document.querySelectorAll('form[novalidate]')) {
      const getFields = () => Array.from(form.querySelectorAll('[required], [data-error]'));

      const onFieldUpdate = (event) => {
        const field = event.target;
        if (field.state === 'error') {
          validateField(field);
        }
        const fieldset = field.closest?.('p-fieldset[required]');
        if (fieldset?.state === 'error') {
          validateField(fieldset);
        }
      };

      form.addEventListener('change', onFieldUpdate);
      form.addEventListener('input', onFieldUpdate);

      form.addEventListener('reset', () => {
        for (const field of getFields()) {
          field.state = 'none';
          field.message = '';
        }
      });

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const invalidFields = getFields().filter((field) => !validateField(field));
        const firstInvalid = invalidFields[0];
        (
          firstInvalid?.querySelector('p-segmented-control-item:not([disabled]), p-checkbox:not([disabled])') ??
          firstInvalid
        )?.focus();
      });
    }
  `
  }</Script>
);
