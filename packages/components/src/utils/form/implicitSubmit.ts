import type { TagName } from '@porsche-design-system/shared';
import { isElementOfKind } from '../dom';
import { getTagNameWithoutPrefix } from '../tag-name';
import { runDefaultActionUnlessPrevented } from './runDefaultActionUnlessPrevented';

// Blink and WebKit: `HTMLInputElement::CanTriggerImplicitSubmission()`, which is `IsTextField()`.
const TEXT_FIELD_TYPES = new Set(['text', 'search', 'url', 'tel', 'email', 'password', 'number']);
const PDS_INPUT_TYPES: Partial<Record<TagName, string>> = {
  'p-input-text': 'text',
  'p-input-search': 'search',
  'p-input-url': 'url',
  'p-input-tel': 'tel',
  'p-input-email': 'email',
  'p-input-password': 'password',
  'p-input-number': 'number',
  'p-input-date': 'date',
  'p-input-month': 'month',
  'p-input-week': 'week',
  'p-input-time': 'time',
};

const renderedInputTypes = new Map<string, string>();
// The type the browser renders, e.g. `text` for `month` and `week` in Firefox and Safari, which have no picker for them.
const getRenderedInputType = (type: string): string => {
  let renderedType = renderedInputTypes.get(type);
  if (!renderedType) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    renderedType = input.type;
    renderedInputTypes.set(type, renderedType);
  }
  return renderedType;
};

const isTextField = (element: HTMLElement): boolean => {
  const type = element instanceof HTMLInputElement ? element.type : PDS_INPUT_TYPES[getTagNameWithoutPrefix(element)];
  return !!type && TEXT_FIELD_TYPES.has(getRenderedInputType(type));
};

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
 * The function follows the browsers' implementation of implicit submission (Blink and WebKit:
 * `HTMLFormElement::SubmitImplicitly()`):
 * - If a form has a default submit control (`:default`), it is clicked.
 * - Otherwise the form is submitted only if Enter was pressed in a text field (text, search, url, tel, email, password,
 *   number) and the form contains no other text field. Date, time, month and week fields neither submit nor block, unless
 *   the browser renders them as text fields because it has no picker for them.
 *
 * Browsers deviate from the HTML specification here, which lets the date and time types block submission as well.
 * Gecko additionally submits from a date or time field if the form contains exactly one text field; that isn't emulated.
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
 * @see {@link https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/html/forms/html_form_element.cc Blink: HTMLFormElement::SubmitImplicitly()}
 * @see {@link https://github.com/WebKit/WebKit/blob/main/Source/WebCore/html/HTMLFormElement.cpp WebKit: HTMLFormElement::submitImplicitly()}
 * @see {@link https://github.com/mozilla-firefox/firefox/blob/main/dom/html/HTMLFormElement.cpp Gecko: HTMLFormElement::ImplicitSubmissionIsDisabled()}
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

  // Without a submit button, only a text field submits, and only if it is the form's only text field.
  if (isTextField(host) && !formElements.some(isTextField)) {
    form.requestSubmit();
  }
};
