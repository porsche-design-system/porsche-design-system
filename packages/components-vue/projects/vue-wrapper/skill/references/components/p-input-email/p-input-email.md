# p-input-email

The `p-input-email` component provides a user-friendly, accessible interface for entering valid email addresses. It leverages native HTML5 email validation and ensures appropriate keyboard behavior on mobile devices. It includes `start` and `end` slots to flexibly incorporate icons, buttons, or other elements within the input field.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-input-email` component can be used with or without a label, but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's mandatory to provide a descriptive label text for screen readers.

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

## Usage

`p-input-email` is specifically designed for collecting email addresses. It leverages built-in browser validation to ensure that input follows the correct email format. This makes it a better choice than a generic text input when email validation, proper keyboard behavior on mobile, and accessibility are important. For further guidance, see the [MDN documentation on email inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email#using_email_inputs).

### Do:

- Use when requesting an email address from the user.
- Use without a label only when the context is clear.
- Use for validation and error of input.
- Use asterisk for required fields.

### Don't:

- Don't use labels with more than two words whenever possible (keep it short and descriptive).
- Don't use an instructional or description text for the label.

---

## Related Components

- [Input Date](../p-input-date/p-input-date.md)
- [Input Month](../p-input-month/p-input-month.md)
- [Input Number](../p-input-number/p-input-number.md)
- [Input Password](../p-input-password/p-input-password.md)
- [Input Search](../p-input-search/p-input-search.md)
- [Input Tel](../p-input-tel/p-input-tel.md)
- [Input Text](../p-input-text/p-input-text.md)
- [Input Time](../p-input-time/p-input-time.md)
- [Input Url](../p-input-url/p-input-url.md)
- [Input Week](../p-input-week/p-input-week.md)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-describedby="IDREF"` | Defines the accessible description combined with the status message. |
| `role="status"`, `role="alert"` | When `message` and `state` or `loading` prop change, the status message is announced. |
| `aria-hidden="true"` | If `required` attribute is set, the visible asterisk indicator is hidden from assistive technologies. |
| `aria-invalid="true"` | If `error` state is set. |
| `aria-live="polite"` | If the `maxlength` attribute is present, the counter is announced via ARIA live region. |

## Development considerations

### Disabled state

In general, avoid using the `disabled` state. Disabled elements are no longer focusable and may be missed by screen reader users. They can also confuse sighted users if the reason they are disabled is not made clear.

## Limitations

Due to the nature of **Web Components** and **shadow DOM**, there are limitations when using some **ARIA** attributes to define relationships between elements across different shadow DOMs or shadow DOM/light DOM combinations.

| ARIA | Support |
| --- | --- |
| `aria-labelledby` | 🚫 |
| `aria-describedby` | 🚫 |

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `autoComplete` | `string` | `undefined` | Provides the browser with a data type hint to enable relevant autofill suggestions (e.g. `autocomplete='email'`). |
| `compact` | `boolean` | `false` | Reduces the input height and padding for a more compact layout. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to provide additional context. |
| `disabled` | `boolean` | `false` | Disables the field, preventing all input. The value is not submitted with the form. |
| `form` | `string` | `undefined` | Associates the field with a form element by its ID when the field is not nested directly inside it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `indicator` | `boolean` | `false` | Shows an email icon at the start of the field as a visual indicator. |
| `label` | `string` | `''` | Sets the visible label text displayed above the input field. |
| `loading` _(experimental)_ | `boolean` | `false` | @experimental Disables the field and displays a loading spinner to indicate an ongoing operation. |
| `maxLength` | `number` | `undefined` | Sets the maximum number of characters the user can enter. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the field when `state` is `success` or `error`. |
| `minLength` | `number` | `undefined` | Sets the minimum number of characters required for the field to be considered valid. |
| `multiple` | `boolean` | `false` | Allows entry of multiple email addresses separated by commas. The browser validates each address individually. |
| `name` _(required)_ | `string` | `undefined` | Sets the name submitted with the form data to identify this field's value on the server. |
| `pattern` | `string` | `undefined` | Sets a regular expression the entered value must match to be valid. Overrides the browser's default email validation. |
| `placeholder` | `string` | `''` | Sets placeholder text shown inside the field when it is empty, to hint at the expected format. |
| `readOnly` | `boolean` | `false` | Makes the field read-only — the value is displayed but cannot be edited. The value is still submitted with the form. |
| `required` | `boolean` | `false` | Marks the field as required — form submission is blocked while this field is empty. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). |
| `value` | `string | null` | `''` | Sets the current email value. When `multiple` is enabled, accepts a comma-separated list of email addresses. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<InputEmailBlurEventDetail>`<br>`Event` | Emitted when the input loses focus, regardless of whether the value changed. |
| `change` | `CustomEvent<InputEmailChangeEventDetail>`<br>`Event` | Emitted when the input loses focus after its value was changed. |
| `input` | `CustomEvent<InputEmailInputEventDetail>`<br>`InputEvent` | Emitted on every value change as the user types. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `description` | no | — | Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `start` | no | — | Shows content at the start of the input (e.g. unit prefix). |
| `end` | no | — | Shows content at the end of the input (e.g. toggle button, unit suffix). |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--ref-p-input-slotted-padding` | — | When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly. |
| `--ref-p-input-slotted-margin` | — | When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Form | The `p-input-email` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.vue](./examples/Form.vue) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./examples/Slots.vue](./examples/Slots.vue) |
