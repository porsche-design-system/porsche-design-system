# p-select

The `p-select` component is a versatile custom form element that enables the selection of a single option.

Options are slotted using the `p-select-option` component. Each option needs to have an assigned value, which can be passed via an attribute or property and needs to be of type string. Initial selection states can only be achieved using the value property on the `p-select` component ([More Info](/components/select/examples/#set-value)). Options don't have a selected attribute or property. If an option should be visible but not selectable, it can be disabled by using the `disabled` attribute. If the selection isn't required or should be clearable again, you can use an empty `p-select-option` as default selection ([More Info](/components/select/examples/#empty)).

**Hint:** The `p-select` utilizes the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to render its dropdown on the `#top-layer` which enables it to be shown correctly even when used e.g. within a scroll container.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Keep the label visible for better accessibility whenever possible.
- Provide a descriptive label text for screen readers when using the component without a label.
- Use to trigger an action based on the selected option choose and search one option from a list of items to navigate the user to a new position and recommend a default option for most users.
- Use without label only if the context clearly describes what the component is to be used for and no further explanation is required.
- Provide a description text displayed openly and directly outside the form field when helpful for the user to get further information on the input.
- Use the custom filter for a large number of select options (e.g. country/state select).
- Use without preselection (mandatory field) if you don't know or need to make sure the user makes a conscious choice.
- Use preselection (mandatory field) if you have a reason to believe one of the options is most likely or you know the default or current option.
- Use preselection (optional field) to make it possible to go back to an empty default.
- Use common sort order for menu items (frequency of use, alpha or numeric).

### Don't:

- Don't use select boxes for data that is highly familiar such as the day month or year.
- Don't set the default to 'please select' if there's an empty field.
- Don't use very long select boxes that require scrolling but if unavoidable make sure that when open there is only a maximum of 7 elements in the field of view without having to scroll.

## Accessibility support

### Keyboard

#### Combobox

| Key / state | Function |
| --- | --- |
| `Down Arrow` `Up Arrow` `Space` | - Opens the listbox if it is not already displayed without moving focus or changing selection.
 - DOM focus remains on the combobox. |
| `Space` | Closes the listbox if it is displayed. |

#### Listbox

| Key / state | Function |
| --- | --- |
| `Down Arrow` `Up Arrow` | Moves visual focus to the next/previous option. |
| `Home` `End` | Moves visual focus to the first/last option. |
| `ESC` | Closes listbox |
| `Enter`, `Space` | Selects an option |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-labelledby="IDREF"` | References the accessible name of the combobox. |
| `aria-describedby="IDREF"` | References the accessible description and status messages of the combobox. |
| `aria-label="STRING"` | References the accessible name of the listbox. |
| `role="status"`, `role="alert"` | When `message` and `state` prop change, the status message is announced. |
| `aria-expanded="BOOLEAN"` | Indicates that the listbox element is displayed/hidden. |
| `aria-controls="IDREF"` | Identifies the element that serves as the listbox. |
| `aria-hidden="true"` | If `required` attribute is set, the visible indicator is hidden from assistive technologies. |
| `aria-haspopup="listbox"` | Indicates that the combobox will open a listbox. |
| `aria-required="true"` | Indicates if the element is required. |

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
| Screen reader (VoiceOver, NVDA) | ✅ (Note: Though Safari supports `ariaActiveDescendantElement` the active `option` doesn't get announced in VoiceOver) |

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `compact` | `boolean` | `false` | Reduces the control height and padding for use in dense layouts where vertical space is limited. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to give users additional guidance about the select. |
| `disabled` | `boolean` | `false` | Prevents user interaction with the select and excludes its value from form submissions. |
| `dropdownDirection` | `'down'` `'up'` `'auto'` | `'auto'` | Controls whether the dropdown list opens upward (`up`) or downward (`down`), or determines the direction automatically (`auto`). |
| `filter` | `boolean` | `false` | Shows a text input inside the dropdown that filters the visible options as the user types. Ignored when the `filter` slot is used. |
| `form` | `string` | `undefined` | Associates the select with a form element by its ID when it is not a direct descendant of that form. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `label` | `string` | `''` | Sets the visible label text displayed above the select control to identify its purpose. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the select when `state` is `success` or `error`. |
| `name` _(required)_ | `string` | `undefined` | Sets the name of the control submitted with the form data, identifying the selected value on the server. |
| `required` | `boolean` | `false` | Marks the select as required so the form cannot be submitted unless a non-empty option is selected. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state of the select, which controls its visual appearance and feedback message style (`none`, `success`, `error`). |
| `value` | `'string'` `'number'` `'null'` | `undefined` | The selected value. Matches an option strictly by type and value, meaning null matches only an option with value null, undefined matches only an option with value undefined (no preselection by default), and string or number only match an option whose value has the same type and equal value. Please note that FormData always serializes values as strings, so when participating in a native (uncontrolled) form a number value is restored as string via formStateRestoreCallback and will no longer strictly match a number-typed option. This limitation only applies to native form state restoration; in controlled forms (where the consumer manages value directly via the change event), the number type is preserved end-to-end. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<void>` | Emitted when the select component loses focus, useful for triggering validation on blur. |
| `change` | `CustomEvent<SelectChangeEventDetail>`<br>`{ name: string; value: string | number | null | undefined }` | Emitted when the user selects a different option, carrying the new value in the event detail. |
| `toggle` | `CustomEvent<SelectToggleEventDetail>`<br>`{ open: boolean }` | Emitted when the dropdown list opens or closes, carrying the new `isOpen` state in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `description` | no | — | Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `selected` | no | — | Use this slot to provide custom markup for the selected option display in the button area. |
| _(default)_ | no | — | Default slot for the `p-select-option` tags. |
| `options-status` | no | — | When implementing a custom filter with the `filter` slot, use this slot for loading, error and no results status. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `filter` | no | — | Optional slot for providing a custom `p-input-search` input. When used, the default filter input is replaced and the built-in filter logic is disabled, giving full control over filtering behavior. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./p-select/examples/Default.tsx](./p-select/examples/Default.tsx) |
| Form | The `p-select` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./p-select/examples/Form.tsx](./p-select/examples/Form.tsx) |
| Basic example without preselection | To require the user to actively pick an option, leave the `p-select` `value` property unset (or set it to `undefined` or `null`). | [./p-select/examples/Required.tsx](./p-select/examples/Required.tsx) |
| Slotted images | In order to show an icon for each option, you can optionally slot an `img` tag within the `p-select-option`. | [./p-select/examples/SlottedImages.tsx](./p-select/examples/SlottedImages.tsx) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./p-select/examples/Slots.tsx](./p-select/examples/Slots.tsx) |
| Set Value | The `p-select` component behaves like regular form elements. | [./p-select/examples/SetValue.tsx](./p-select/examples/SetValue.tsx) |
| With optgroups | With optgroups | [./p-select/examples/Optgroups.tsx](./p-select/examples/Optgroups.tsx) |
| Custom asynchronous filtering | The `p-select` component automatically filters options based on user input. | [./p-select/examples/AsyncFilter.tsx](./p-select/examples/AsyncFilter.tsx) |
| Custom option rendering | By default, `p-select-option` only allows `#text` and `img` nodes. | [./p-select/examples/SelectedSlot.tsx](./p-select/examples/SelectedSlot.tsx) |
