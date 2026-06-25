# p-input-week

The `p-input-week` component provides a versatile, user‑friendly interface for entering week values. It supports direct keyboard input, including arrow-key adjustments for precise changes. It has a start and end slot in order to support flexible slotted content.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-input-week` component can be used with or without a label, but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's mandatory to provide a descriptive label text for screen readers.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

`p-input-week` is intended for week input scenarios. It should not be used for values that merely happen to consist of digits. For those cases, consider using another input with an appropriate input mode. For further guidance, see the [MDN documentation on week inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week#using_date_inputs).

### Do:

- Use when a week value is required or optional.
- Use without a label only when the context is clear.
- Use for validation and error of input.
- Use asterisk for required fields.

### Don't:

- Don't use labels with more than two words whenever possible (keep it short and descriptive).
- Don't use instructional or description text for the label.

---

## Related Components

- [Input Date](/components/input-date/)
- [Input Email](/components/input-email/)
- [Input Month](/components/input-month/)
- [Input Number](/components/input-number/)
- [Input Password](/components/input-password/)
- [Input Search](/components/input-search/)
- [Input Tel](/components/input-tel/)
- [Input Text](/components/input-text/)
- [Input Time](/components/input-time/)
- [Input Url](/components/input-url/)

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

### Disabled state

In general, avoid using the `disabled` state. Disabled elements are no longer focusable and may be missed by screen reader users. They can also confuse sighted users if the reason they are disabled is not made clear.

## Limitations

Due to the nature of **Web Components** and **shadow DOM**, there are limitations when using some **ARIA** attributes to define relationships between elements across different shadow DOMs or shadow DOM/light DOM combinations.

| ARIA | Support |
| --- | --- |
| `aria-labelledby` | 🚫 |
| `aria-describedby` | 🚫 |

## Tests

### Automated

| Technology | Support |
| --- | --- |
| AXE-Core (WCAG 2.2 AA, Best-Practice) | ✅ |
| High-Contrast Mode (light/dark) | ✅ |
| Text-Zoom (200%) | ✅ |

### Manual

| Technology | Support |
| --- | --- |
| Keyboard | ✅ |
| Screen reader (VoiceOver, NVDA) | ✅ |

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `autoComplete` | `string` | `undefined` | Provides the browser with a week/year autofill hint. |
| `compact` | `boolean` | `false` | Reduces the input height and padding for a more compact layout. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to provide additional context. |
| `disabled` | `boolean` | `false` | Disables the field, preventing week selection. The value is not submitted with the form. |
| `form` | `string` | `undefined` | Associates the field with a form element by its ID when the field is not nested directly inside it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `label` | `string` | `''` | Sets the visible label text displayed above the input field. |
| `loading` _(experimental)_ | `boolean` | `false` | @experimental Disables the field and displays a loading spinner to indicate an ongoing operation. |
| `max` | `string` | `undefined` | Sets the latest selectable week in YYYY-Www format. Weeks after this are disabled in the picker. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the field when `state` is `success` or `error`. |
| `min` | `string` | `undefined` | Sets the earliest selectable week in YYYY-Www format. Weeks before this are disabled in the picker. |
| `name` _(required)_ | `string` | `undefined` | Sets the name submitted with the form data to identify this field's value on the server. |
| `readOnly` | `boolean` | `false` | Makes the field read-only — the value is displayed but cannot be changed. The value is still submitted with the form. |
| `required` | `boolean` | `false` | Marks the field as required — form submission is blocked while no week is selected. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). |
| `step` | `number` | `1` | Sets the stepping interval in weeks. |
| `value` | `'string'` `'null'` | `''` | Sets the current ISO week value in YYYY-Www format (e.g. `2025-W27`). |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<InputWeekBlurEventDetail>`<br>`Event` | Emitted when the input loses focus, regardless of whether the value changed. |
| `change` | `CustomEvent<InputWeekChangeEventDetail>`<br>`Event` | Emitted when the input loses focus after its value was changed. |
| `input` | `CustomEvent<InputWeekInputEventDetail>`<br>`InputEvent` | Emitted on every value change as the user interacts with the week picker. |

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
| Default | Minimal default configuration. | [./p-input-week/examples/Default.vue](./p-input-week/examples/Default.vue) |
| Form | The `p-input-week` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./p-input-week/examples/Form.vue](./p-input-week/examples/Form.vue) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./p-input-week/examples/Slots.vue](./p-input-week/examples/Slots.vue) |
