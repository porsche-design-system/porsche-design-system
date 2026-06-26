# p-textarea

The `p-textarea` component is a multi-line text input control. Don't use a Textarea component if you want to allow users to enter shorter responses that are no longer than a single line, such as a phone number or name. In this case, you should use one of the input components.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-textarea` component can be used with or without a label, but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's mandatory to provide a descriptive label text for screen readers.

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

Instead of relying on slotted content, the `p-textarea` component offers a `value` attribute and property that remain synchronized with user input.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use in forms when users need to enter and edit an amount of text that’s longer than a single line.
- Keep the label text short and descriptive (one or two words).
- Place validation text right below the Textarea box.
- Respect the min-height.
- Mark required fields with a red asterisk to improve the usability of forms.
- Use the Pure variant (without label) only if the context clearly describes the purpose.

### Don't:

- Don't use when text entry is expected to be short. Use an input instead to avoid confusing users.
- Don't overwhelm users with too many Textareas on a single page. Stick to no more than two Textareas.

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
| `autoComplete` | `string` | `undefined` | Provides the browser with a hint to enable text autofill suggestions for the textarea (e.g. `autocomplete='on'`). |
| `compact` | `boolean` | `false` | Reduces the textarea's initial height and padding for use in dense layouts where vertical space is limited. |
| `counter` | `boolean` | `false` | Shows a live character counter below the textarea indicating how many characters the user has typed relative to `maxLength`. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to give users additional guidance about the textarea. |
| `disabled` | `boolean` | `false` | Prevents user interaction with the textarea and excludes its value from form submissions. |
| `form` | `string` | `undefined` | Associates the textarea with a form element by its ID when the textarea is not a direct descendant of that form. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `label` | `string` | `''` | Sets the visible label text displayed above the textarea to identify its purpose. |
| `maxLength` | `number` | `undefined` | Sets the maximum number of characters the user is allowed to enter into the textarea. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the textarea when `state` is `success` or `error`. |
| `minLength` | `number` | `undefined` | Sets the minimum number of characters required for the textarea's value to pass constraint validation. |
| `name` _(required)_ | `string` | `undefined` | Sets the name of the textarea submitted with the form data to identify this field's value on the server. |
| `placeholder` | `string` | `''` | Sets placeholder text displayed inside the textarea when it is empty to hint at the expected content format. |
| `readOnly` | `boolean` | `false` | Makes the textarea read-only so users cannot modify the value, while still including it in form submissions. |
| `required` | `boolean` | `false` | Marks the textarea as required so the form cannot be submitted while this field is empty. |
| `resize` | `'none'` `'both'` `'horizontal'` `'vertical'` `'block'` `'inline'` | `'vertical'` | Controls whether and in which direction the user can resize the textarea (`horizontal`, `vertical`, `both`, or `none`). |
| `rows` | `number` | `7` | Sets the initial visible height of the textarea in lines of text. Has no effect when the `--p-textarea-field-sizing` CSS variable is set to `content`. |
| `spellCheck` | `boolean` | `undefined` | Controls whether the browser's built-in spell-checking and grammar checking is enabled for the textarea content. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state of the textarea, which controls its visual appearance and feedback message style (`none`, `success`, `error`). |
| `value` | `'string'` `'null'` | `''` | Sets the current multi-line text value of the textarea and reflects any changes made by the user. |
| `wrap` | `'hard'` `'soft'` `'off'` | `'soft'` | Controls how the submitted text wraps in the form data: `soft` wraps only visually, `hard` inserts line breaks at the textarea width. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<TextareaBlurEventDetail>`<br>`Event` | Emitted when the textarea element loses focus, regardless of whether the value changed. |
| `change` | `CustomEvent<TextareaChangeEventDetail>`<br>`Event` | Emitted when the textarea loses focus after its value was changed, equivalent to the native `change` event. |
| `input` | `CustomEvent<TextareaInputEventDetail>`<br>`InputEvent` | Emitted on every keystroke or value change as a direct result of user interaction, equivalent to the native `input` event. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `description` | no | — | Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-textarea-field-sizing` | `unset` | Controls CSS `field-sizing` for textarea. |
| `--p-textarea-min-width` | `52px` | Minimum width of the textarea. |
| `--p-textarea-max-width` | `unset` | Maximum width of the textarea. |
| `--p-textarea-min-height` | `unset` | Minimum height of the textarea. |
| `--p-textarea-max-height` | `unset` | Maximum height of the textarea. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Form | The `p-textarea` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.tsx](./examples/Form.tsx) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./examples/Slots.tsx](./examples/Slots.tsx) |
