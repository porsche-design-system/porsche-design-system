import type { TagName } from '@porsche-design-system/shared';
import { isElementOfKind } from '../dom';

const TYPES_THAT_BLOCK = new Set([
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
  'date',
  'month',
  'week',
  'time',
  'datetime-local',
  'number',
]);
const PDS_INPUT_TAGS_THAT_BLOCK: TagName[] = [
  'p-input-text',
  'p-input-search',
  'p-input-url',
  'p-input-tel',
  'p-input-email',
  'p-input-date',
  'p-input-time',
  'p-input-number',
];
/**
 * Handles implicit form submission when the Enter key is pressed.
 *
 * The function follows the W3C HTML5 specification for implicit submission:
 * - If a form has a default submit control (`:default`), it is clicked.
 * - If no default submit button exists, submission may be blocked if certain input fields are present.
 *
 * Blocking rules:
 * - Native input types like text, email, number, date, etc., block implicit submission.
 * - Custom Porsche Design System input components listed in `PDS_INPUT_TAGS_THAT_BLOCK` also block submission.
 *
 * @param {KeyboardEvent} e - The keyboard event triggered on the input element.
 * @param {ElementInternals} internals - The element internals of the custom element, used to access the associated form.
 * @param {HTMLElement} host - The host element which calls this function.
 *
 * @see {@link https://www.w3.org/TR/2014/CR-html5-20140204/forms.html#implicit-submission Implicit Submission Spec}
 */
export const implicitSubmit = (e: KeyboardEvent, internals: ElementInternals, host: HTMLElement) => {
  if (e.key === 'Enter') {
    const { form } = internals;
    if (!form) return;
    const formElements = Array.from(form.elements).filter((el) => el !== host) as HTMLElement[];

    // Find the submit button
    // form.querySelector(':default') doesn't work due to 'form' content attribute.
    for (const control of formElements) {
      if (
        control.matches(':default') ||
        (isElementOfKind(control, 'p-button') && (control as HTMLPButtonElement).type === 'submit') ||
        (isElementOfKind(control, 'p-button-pure') && (control as HTMLPButtonPureElement).type === 'submit')
      ) {
        if (!(control as HTMLElement & { disabled: boolean }).disabled) {
          control.click();
        }
        return;
      }
    }

    // If there is no submit button, check for blocking fields
    const hasBlockingField = formElements.some(
      (el) =>
        (el instanceof HTMLInputElement && TYPES_THAT_BLOCK.has(el.type)) ||
        (el instanceof HTMLElement && PDS_INPUT_TAGS_THAT_BLOCK.some((tag) => isElementOfKind(el, tag)))
    );

    if (!hasBlockingField) {
      form.requestSubmit();
    }
  }
};
