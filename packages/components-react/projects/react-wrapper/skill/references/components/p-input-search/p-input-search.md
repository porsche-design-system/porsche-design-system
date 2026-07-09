# p-input-search

The `p-input-search` component offers a versatile, user-friendly interface for entering and submitting search queries. It supports direct keyboard input and includes a clear button for convenience. The `start` and `end` slots enable flexible insertion of custom content.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-input-search` component can be used with or without a label, but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's mandatory to provide a descriptive label text for screen readers.

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

> **Input Event Handling**
>
> React's `onChange` behaves like the native `onInput` (fires on every keystroke). However, our web components follow standard browser behavior, where `onChange` only fires when the input loses focus. To get real-time updates on each keystroke, use `onInput` instead.

## Usage

### Do:

- Use when a keyword or key value for a search request is necessary.
- Use without a label only when the context is clear.
- Use with a slotted locate button when a locate action can be performed.
- Use a loading state to indicate a search is being performed.
- Use an asterisk to indicate required fields.
- Use success or error messages if the user input was inappropriate.
- Use search suggestions or recent history when it adds contextual value.

### Don't:

- Don’t use labels with more than two words whenever possible (keep them short and descriptive).
- Don’t use instructional or descriptive text as the label.
- Don’t use p-input-search for purposes other than search.
- Don’t use compact variants in marketing applications.
- Don’t manipulate or replace the default search icon.

---

## Related Components

- [Input Date](../p-input-date/p-input-date.md)
- [Input Email](../p-input-email/p-input-email.md)
- [Input Month](../p-input-month/p-input-month.md)
- [Input Number](../p-input-number/p-input-number.md)
- [Input Password](../p-input-password/p-input-password.md)
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

#### External **ARIA** provided by the `aria` property:

Use the `aria` property to pass supported attributes to the **native `<input>` inside the shadow DOM**, for example when you implement a combobox-style pattern (search field + suggestion list).

| ARIA | Usage |
| --- | --- |
| `role` | Overrides the implicit role when needed (e.g. `combobox` for an autocomplete pattern alongside a separate listbox). |
| `aria-autocomplete` | Indicates whether and how the component predicts text (`none`, `inline`, `list`, `both`). |
| `aria-controls` | Identifies the element(s) whose contents or presence are controlled by the input (e.g. the suggestion list’s id). |
| `aria-expanded` | Indicates whether the suggestion popup or related surface is expanded or collapsed. |
| `aria-haspopup` | Indicates that activating the input triggers a popup (e.g. `listbox`, `dialog`). |
| `aria-label` | Defines an accessible name when the visible label is insufficient or hidden; prefer a visible `label` for most cases. |

You can pass a JSON object on the element (vanilla JS) or use your framework’s prop binding, for example `aria={{ role: 'combobox', 'aria-expanded': isOpen, 'aria-haspopup': 'listbox' }}`.

#### Internal **ARIA** that is managed by the component:

The following apply in addition to any `aria` values you pass. On the **native search input**, `aria-describedby`, `aria-invalid`, `aria-disabled`, and `aria-readonly` are always set by the component and **take precedence** over the same keys if they were supplied in `aria`.

| ARIA | Usage |
| --- | --- |
| `aria-describedby="IDREF"` | Combines references for description, state message, and loading feedback on the native input. |
| `aria-invalid="true"` | When `state` is `error`. |
| `aria-disabled="true"` | When `disabled` or `loading` is active. |
| `aria-readonly="true"` | When `readOnly` is active. |
| `role="status"`, `role="alert"` | When `message` and `state` or `loading` change, the status message region is exposed for announcements. |
| `aria-hidden="true"` | On decorative icons (e.g. search indicator). |

## Development considerations

### Disabled state

In general, avoid using the `disabled` state. Disabled elements are no longer focusable and may be missed by screen reader users. They can also confuse sighted users if the reason they are disabled is not made clear.

### Combobox and suggestion lists

For a search field that controls a separate list of suggestions, set the `aria` property so the input exposes the expected semantics supported by this component, for example:

- `role: 'combobox'`
- `aria-controls` referring to the id of the associated listbox (or other controlled region). Hint: currently not supported across shadow DOM boundaries
- `aria-expanded` reflecting open/closed state
- `aria-haspopup` indicating the presence of a popup (e.g. `listbox`)
- `aria-autocomplete` as required by your pattern

Associate the suggestion list and keyboard interaction in the host application according to the [ARIA combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) you implement there.

## Limitations

Due to the nature of **Web Components** and **shadow DOM**, there are limitations when using some **ARIA** attributes to define (IDREF) relationships between elements across different shadow DOMs or shadow DOM/light DOM combinations.

| ARIA | Support |
| --- | --- |
| `aria-owns` | 🚫 |
| `aria-activedescendant` | 🚫 |

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `InputSearchAriaAttribute` | `undefined` | Sets additional ARIA attributes on the search input, useful for combobox patterns (e.g. `role="combobox"`, `aria-expanded`). |
| `autoComplete` | `string` | `undefined` | Provides the browser with a data type hint to enable relevant autofill suggestions. |
| `clear` | `boolean` | `false` | Shows a clear button (×) inside the field that resets the value to empty when clicked. |
| `compact` | `boolean` | `false` | Reduces the input height and padding for a more compact layout. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to provide additional context. |
| `disabled` | `boolean` | `false` | Disables the field, preventing all input. The value is not submitted with the form. |
| `form` | `string` | `undefined` | Associates the field with a form element by its ID when the field is not nested directly inside it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `indicator` | `boolean` | `false` | Shows a magnifying glass icon inside the field as a visual affordance for search input. |
| `label` | `string` | `''` | Sets the visible label text displayed above the input field. |
| `loading` _(experimental)_ | `boolean` | `false` | @experimental Disables the field and displays a loading spinner to indicate an ongoing operation. |
| `maxLength` | `number` | `undefined` | Sets the maximum number of characters the user can enter. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the field when `state` is `success` or `error`. |
| `minLength` | `number` | `undefined` | Sets the minimum number of characters required for the field to be considered valid. |
| `name` _(required)_ | `string` | `undefined` | Sets the name submitted with the form data to identify this field's value on the server. |
| `placeholder` | `string` | `''` | Sets placeholder text shown inside the field when it is empty. |
| `readOnly` | `boolean` | `false` | Makes the field read-only — the value is displayed but cannot be edited. The value is still submitted with the form. |
| `required` | `boolean` | `false` | Marks the field as required — form submission is blocked while this field is empty. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). |
| `value` | `string | null` | `''` | Sets the current search query value of the field. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<InputSearchBlurEventDetail>`<br>`Event` | Emitted when the input loses focus, regardless of whether the value changed. |
| `change` | `CustomEvent<InputSearchChangeEventDetail>`<br>`Event` | Emitted when the input loses focus after its value was changed. |
| `input` | `CustomEvent<InputSearchInputEventDetail>`<br>`InputEvent` | Emitted when the value has been changed as a direct result of a user action. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `description` | no | — | Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `start` | no | — | Shows content at the start of the input (e.g. icon). |
| `end` | no | — | Shows content at the end of the input (e.g. search button). |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--ref-p-input-slotted-padding` | — | When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly. |
| `--ref-p-input-slotted-margin` | — | When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Form | The `p-input-search` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.tsx](./examples/Form.tsx) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./examples/Slots.tsx](./examples/Slots.tsx) |
| Used as a Combobox | You can pass an `aria` property to expose extra semantics on the **native input** (see [accessibility](./p-input-search.md)). | [./examples/AriaCombobox.tsx](./examples/AriaCombobox.tsx) |
