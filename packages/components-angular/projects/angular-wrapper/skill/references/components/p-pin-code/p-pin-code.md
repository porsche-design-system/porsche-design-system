# p-pin-code

The `p-pin-code` component is optimized for entering sequences of digits. The most common use case is for entering one-time-passwords (OTP) or pin codes. The input fields allow only one digit at a time. When a digit is entered, the focus shifts automatically to the next input, until every input is filled.

A few things to note:

- Only digits can be entered.
- Only one digit can be entered per input.
- Pressing `Delete` or `Backspace`: If the focussed input is blank and `Delete`/`Backspace` is pressed the focus transfers to the next/previous input, and clears the value of the next/previous input (if any). This avoids the need to explicitly `Shift+Tab & Delete`/ `Tab & Backspace`.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-pin-code` component can be used with or without a label, but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.

## Usage

### Do:

- Use description text to explain the purpose or context of the `p-pin-code` component.
- Use either 4 or 6 fields in the `p-pin-code` component based on your specific use case and security requirements.
- Since only digits can be entered, use for digit codes only.
- Use type `number` for numeric input or `password` for secure input depending on your application's needs.
- Use the component's built-in support for inline validation.
- Use consideration when implementing the component's behavior in a loading state to ensure it remains usable and responsive during data retrieval or processing.
- If the `p-pin-code` component is isolated e.g. used with only one button use the loading state on the button. This ensures a consistent and intuitive user experience.

### Don't:

- Don't make the description text overly complex. Keep it concise and focused on clarifying the component's purpose.
- Don't use the wrong field type for your use case. Ensure that type `number` or `password` aligns with the kind of input expected from users.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-label="STRING"` | References the current position of the input group. |
| `aria-describedby="IDREF"` | References the accessible description and status messages. |
| `role="status"`, `role="alert"` | When `message` and `state` or `loading` prop change, the status message is announced. |

## Development considerations

### Disabled state

In general, avoid using the `disabled="true"` state. Disabled elements are no longer focusable and may be missed by screen reader users. They can also confuse sighted users if the reason they are disabled is not made clear.

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `compact` | `boolean` | `false` | Reduces the pin code field height and spacing for use in dense layouts where vertical space is limited. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to give users additional guidance about the pin code. |
| `disabled` | `boolean` | `false` | Prevents user interaction with all pin code fields and blocks events while the component is disabled. |
| `form` | `string` | `undefined` | Associates the pin code with a form element by its ID when it is not a direct descendant of that form. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label and description while keeping them accessible to screen readers. Supports responsive breakpoint values. |
| `label` | `string` | `''` | Sets the visible label text displayed above the pin code fields to identify their purpose. |
| `length` | `1` `2` `3` `4` `5` `6` | `4` | Sets the number of individual input fields rendered, determining how many characters the pin code consists of. |
| `loading` | `boolean` | `false` | Disables the pin code fields and shows a loading spinner to indicate an ongoing background operation. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the pin code when `state` is `success` or `error`. |
| `name` | `string` | `undefined` | Sets the name of the control submitted with the form data to identify the pin code value on the server. |
| `required` | `boolean` | `false` | Marks the pin code as required so the form cannot be submitted until all fields are filled. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state of the pin code, which controls its visual appearance and feedback message style (`none`, `success`, `error`). |
| `type` | `'number'` `'password'` | `'number'` | Controls whether the individual input fields mask their content as password dots (`password`) or show digits (`number`). |
| `value` | `string` | `''` | Sets the current concatenated value of all pin code fields and allows setting the initial value. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<void>` | Emitted when the pin code component loses focus after the user finishes entering characters. |
| `change` | `CustomEvent<PinCodeChangeEventDetail>`<br>`{ value: string; isComplete: boolean }` | Emitted when the pin code value changes as the user types, carrying the new concatenated value in the event detail. |

### Controlled properties

- `value` — a controlled prop, but the component also updates it internally. Listen for the `change` event to observe changes; you do not have to write the value back.

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `description` | no | — | Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.ts](./examples/Default.ts) |
| Form | The `p-pin-code` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.ts](./examples/Form.ts) |
| Copy+Paste and autocomplete | By default, only one input can be changed at a time. | [./examples/CopyPaste.ts](./examples/CopyPaste.ts) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./examples/Slots.ts](./examples/Slots.ts) |
