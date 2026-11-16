import type { TagName } from '@porsche-design-system/shared';
import { isElementOfKind } from '../dom';
import { runDefaultActionUnlessPrevented } from './runDefaultActionUnlessPrevented';

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
  'p-input-password',
  'p-input-date',
  'p-input-month',
  'p-input-week',
  'p-input-time',
  'p-input-number',
];

/**
 * Handles implicit form submission when the Enter key is pressed.
 *
 * Why `keypress` and not `keydown`: browsers submit a form implicitly as the default action of the Enter `keypress`,
 * not of the `keydown` (Blink and WebKit: `ShouldSubmitImplicitly()`, Gecko: `HTMLInputElement::PostHandleEvent()`).
 * Emulating it on the same event cancels it in exactly the cases a native input does:
 * - `keypress` is itself a default action of `keydown`, so cancelling the `keydown` suppresses it.
 * - Cancelling the `keypress` prevents the submission.
 * - Whether the Enter that confirms an IME composition submits is decided by the browser. It dispatches the `keypress`
 *   only where its own inputs submit: not on macOS and iOS, but e.g. for Korean on Android, with `isComposing: true`.
 *   So `isComposing` and `keyCode` 229 must not be checked here; that would block submissions a native input makes.
 *
 * UI Events lists `keypress` as a legacy event, but every browser still dispatches it for Enter because its own implicit
 * submission depends on it. The decision is deferred until the event was dispatched to all listeners, see
 * `runDefaultActionUnlessPrevented()`.
 *
 * The function follows the HTML specification for implicit submission:
 * - If a form has a default submit control (`:default`), it is clicked.
 * - If no default submit button exists, submission may be blocked if certain input fields are present.
 *
 * Blocking rules:
 * - Native input types like text, email, number, date, etc., block implicit submission.
 * - Custom Porsche Design System input components listed in `PDS_INPUT_TAGS_THAT_BLOCK` also block submission.
 *
 * @param {KeyboardEvent} e - The `keypress` event triggered on the input element.
 * @param {ElementInternals} internals - The element internals of the custom element, used to access the associated form.
 * @param {HTMLElement} host - The host element which calls this function.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission HTML: Implicit submission}
 * @see {@link https://w3c.github.io/uievents/#event-type-keydown UI Events: keydown, whose default actions include keypress}
 * @see {@link https://w3c.github.io/uievents/#legacy-keyboardevent-event-types UI Events: Legacy KeyboardEvent events}
 * @see {@link https://w3c.github.io/uievents/#events-composition-key-events UI Events: Key events during composition}
 * @see {@link https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/html/forms/input_type_view.cc Blink: InputTypeView::ShouldSubmitImplicitly()}
 * @see {@link https://github.com/WebKit/WebKit/blob/main/Source/WebCore/html/InputType.cpp WebKit: InputType::shouldSubmitImplicitly()}
 * @see {@link https://github.com/mozilla-firefox/firefox/blob/main/dom/html/HTMLInputElement.cpp Gecko: HTMLInputElement::PostHandleEvent()}
 */
export const implicitSubmit = (e: KeyboardEvent, internals: ElementInternals, host: HTMLElement): void => {
  if (e.key === 'Enter') {
    runDefaultActionUnlessPrevented(e, () => submitImplicitly(internals, host));
  }
};

const submitImplicitly = (internals: ElementInternals, host: HTMLElement): void => {
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
};
