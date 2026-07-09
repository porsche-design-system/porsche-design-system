# p-input-number

The `p-input-number` component provides a versatile, user‑friendly interface for entering numeric values. It supports direct keyboard input and increment/decrement controls for precise adjustments. It has a `start` and `end` slot in order to support flexible slotted content.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-input-number` component can be used with or without a label, but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's mandatory to provide a descriptive label text for screen readers.

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

> **Input Event Handling**
>
> React's `onChange` behaves like the native `onInput` (fires on every keystroke). However, our web components follow standard browser behavior, where `onChange` only fires when the input loses focus. To get real-time updates on each keystroke, use `onInput` instead.

## Usage

`p-input-number` is intended for true numeric input scenarios, especially when increment and decrement controls enhance the user experience. It should not be used for values that merely happen to consist of digits — such as postal codes or credit card numbers. For those cases, consider using another input with an appropriate input mode. For further guidance, see the [MDN documentation on number inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#using_number_inputs).

### Do:

- Use when a numeric value is required or optional.
- Use without a label only when the context is clear.
- Use for validation and error of input.
- Use asterisk for required fields.

### Don't:

- Don't use labels with more than two words whenever possible (keep it short and descriptive).
- Don't use instructional or description text for the label.

---

## Related Components

- [Input Date](../p-input-date/p-input-date.md)
- [Input Email](../p-input-email/p-input-email.md)
- [Input Month](../p-input-month/p-input-month.md)
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
| `Arrow Up/Down` | Sets increments/decrements in regards of the steps |

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

### Exposing the `unit` prop

The `unit` prop is not exposed to assistive technologies by default. If you provide a `unit` abbreviation, you need to dissolve it in real text through the `description` prop. For example, if you use `kmh`, you can set the `description` prop to `kilometers per hour`. This way, the screen reader will read out the full text.

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
| `autoComplete` | `string` | `undefined` | Provides the browser with a data type hint to enable relevant autofill suggestions (e.g. `autocomplete='postal-code'`). |
| `compact` | `boolean` | `false` | Reduces the input height and padding for a more compact layout. |
| `controls` | `boolean` | `false` | Shows increment/decrement spin buttons inside the field to adjust the numeric value by clicking. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to provide additional context. |
| `disabled` | `boolean` | `false` | Disables the field, preventing all input. The value is not submitted with the form. |
| `form` | `string` | `undefined` | Associates the field with a form element by its ID when the field is not nested directly inside it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `label` | `string` | `''` | Sets the visible label text displayed above the input field. |
| `loading` _(experimental)_ | `boolean` | `false` | @experimental Disables the field and displays a loading spinner to indicate an ongoing operation. |
| `max` | `number` | `undefined` | Sets the maximum allowed numeric value. Values above this are invalid. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the field when `state` is `success` or `error`. |
| `min` | `number` | `undefined` | Sets the minimum allowed numeric value. Values below this are invalid. |
| `name` _(required)_ | `string` | `undefined` | Sets the name submitted with the form data to identify this field's value on the server. |
| `placeholder` | `string` | `''` | Sets placeholder text shown inside the field when it is empty, to hint at the expected format. |
| `readOnly` | `boolean` | `false` | Makes the field read-only — the value is displayed but cannot be edited. The value is still submitted with the form. |
| `required` | `boolean` | `false` | Marks the field as required — form submission is blocked while this field is empty. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). |
| `step` | `number` | `1` | Sets the stepping granularity — the value must be a multiple of this number. Also controls step button increment size. |
| `value` | `string | number | null` | `''` | Sets the current numeric value of the field. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<InputNumberBlurEventDetail>`<br>`Event` | Emitted when the number input has lost focus. |
| `change` | `CustomEvent<InputNumberChangeEventDetail>`<br>`Event` | Emitted when the number input loses focus after its value was changed. |
| `input` | `CustomEvent<InputNumberInputEventDetail>`<br>`InputEvent` | Emitted when the value has been changed as a direct result of a user action. |

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
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Form | The `p-input-number` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.tsx](./examples/Form.tsx) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./examples/Slots.tsx](./examples/Slots.tsx) |
