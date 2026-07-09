# p-multi-select

The `p-multi-select` component is a versatile custom form element that facilitates the selection of multiple options.

Many of the properties closely resemble those found in the [select](../p-select/p-select.md) and other form components (e.g. `label`, `description`, `state`, `message`, `hideLabel`, `disabled`, `required` & `dropdownDirection`). The `p-multi-select` offers a search field by default. When the user types in a search string, the options are reduced by matching the options text.

Options are slotted using the `p-multi-select-option` component. Each option needs to have an assigned value, which can be passed via an attribute or property and needs to be of type string. Initial selection states can only be achieved using the value property on the `p-multi-select` component ([More Info](./p-multi-select.md)). Options don't have a selected attribute or property. If an option should be visible but not selectable, it can be disabled by using the `disabled` attribute.

**Hint:** The `p-multi-select` utilizes the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to render its dropdown on the `#top-layer` which enables it to be shown correctly even when used e.g. within a scroll container.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to search and select one or more options from a list.
- Use to trigger an action based on a selected option or options.
- Use with label for better accessibility whenever possible.
- Use descriptive label text for screen readers when label hidden.
- Use without label only if the context clearly describes what the component is to be used for and no further explanation is required.
- Use description text to provide further information that is helpful for the user.
- Use without a preselection (mandatory field) by default when no other data is available.
- Use without a preselection (optional field) to make it possible to go back to an empty default.
- Use with a preselection (mandatory field) if you know a specific selection is desired by the user or a previous step requires a selection or in case of a predictive journey.
- Use as a mandatory field when a selection of one or more options is necessary to proceed.
- Use 'dropdown direction' to adjust the flyout's direction to improve the experience.
- Use 'validation states' error or success to give feedback on the selection.
- Use common sort order for menu items (frequency of use, alpha or numeric).

### Don't:

- Don't use very long option texts.
- Don’t use it for less than 6 options (otherwise use Checkboxes).
- Don’t exceed maximum width so the option labels turn multiline.
- Don't use the same option value twice.
- Don't use the same option text twice.

## Accessibility support

### Keyboard

#### Combobox

| Key / state | Function |
| --- | --- |
| `Down Arrow` `Up Arrow` `Space` | - Opens the listbox if it is not already displayed without moving focus or changing selection.
 - DOM focus remains on the combobox. |

#### Listbox

| Key / state | Function |
| --- | --- |
| `Down Arrow` `Up Arrow` | Moves visual focus to the next/previous option. |
| `Home` `End` | Moves visual focus to the first/last option. |
| `ESC` | Closes listbox |
| `Enter` | Selects an option |

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
| `aria-multiselectable="true"` | Indicates that more than one item from the current selectable descendants can be selected. |
| `aria-autocomplete="list"` | Indicates that user input effects results of listbox. |
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
| `compact` | `boolean` | `false` | Reduces the control height and padding for a more compact layout. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to provide additional context. |
| `disabled` | `boolean` | `false` | Disables the multi-select, preventing all interaction. Selected values are not submitted with the form. |
| `dropdownDirection` | `'down'` `'up'` `'auto'` | `'auto'` | Controls whether the dropdown opens upward (`up`) or downward (`down`), or decides automatically (`auto`). |
| `form` | `string` | `undefined` | Associates the multi-select with a form element by its ID when not directly nested inside it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `label` | `string` | `''` | Sets the visible label text displayed above the multi-select control. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the control when `state` is `success` or `error`. |
| `name` _(required)_ | `string` | `undefined` | Sets the name submitted with the form data to identify the selected values on the server. |
| `required` | `boolean` | `false` | Marks the multi-select as required — form submission is blocked unless at least one option is selected. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). |
| `value` | `'array(AllowedTypes.string)'` `'array(AllowedTypes.number)'` `'null'` | `[]` | The selected values. Matches options strictly by type and value, meaning a string value only matches options whose value is the same string, a number value only matches options whose value is the same number. Pass null or [] to clear the selection. Please note that FormData always serializes values as strings, so when participating in a native (uncontrolled) form a number[] value is restored as string[] via formStateRestoreCallback and will no longer strictly match number-typed options. This limitation only applies to native form state restoration; in controlled forms (where the consumer manages value directly via the change event), number[] types are preserved end-to-end. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<void>` | Emitted when the multi-select loses focus. |
| `change` | `CustomEvent<MultiSelectChangeEventDetail>`<br>`{ name: string; value: string[] | number[] }` | Emitted when the user selects or deselects an option, with the updated array of values in the event detail. |
| `toggle` | `CustomEvent<MultiSelectToggleEventDetail>`<br>`{ open: boolean }` | Emitted when the dropdown opens or closes, with the new open state in the event detail. |

### Controlled properties

- `value` — a controlled prop, but the component also updates it internally. Listen for the `change` event to observe changes; you do not have to write the value back.

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `description` | no | — | Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `selected` | no | — | Use this slot to provide custom markup for the selected options display in the button area. |
| _(default)_ | no | — | Default slot for the p-multi-select-option tags. |
| `options-status` | no | — | When implementing a custom filter with the `filter` slot, use this slot for loading, error and no results status. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `filter` | no | — | Optional slot for providing a custom `p-input-search` input. When used, the default filter input is replaced and the built-in filter logic is disabled, giving full control over filtering behavior. |

## Sub-components

These tags are only valid inside the parent(s) listed under each one — often this component, but some are shared and list a different parent (e.g. a tag documented here via a common ancestor). Their APIs come from the same authoritative `component-meta` as the parent above.

### `p-multi-select-option`

Allowed parents: `p-multi-select`, `p-optgroup`.

#### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disables the option, preventing it from being selected. |
| `value` _(required)_ | `string | number` | `undefined` | Sets the value submitted with the form data when this option is selected in the parent multi-select. |

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the option text. |

### `p-optgroup`

Allowed parents: `p-select`, `p-multi-select`.

#### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disables all options in the group, preventing any of them from being selected. |
| `label` | `string` | `undefined` | Sets the visible group heading displayed above the grouped options. |

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the optgroup content. |

### `p-select-option`

Allowed parents: `p-select`, `p-optgroup`.

#### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Prevents the option from being selected and visually dims it to indicate it is unavailable. |
| `value` | `string | number | null` | `undefined` | Sets the value submitted with the form data when this option is selected in the parent select control. |

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the option content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Form | The `p-multi-select` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.tsx](./examples/Form.tsx) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./examples/Slots.tsx](./examples/Slots.tsx) |
| Set Value | The `p-multi-select` component behaves like regular form elements. | [./examples/SetValue.tsx](./examples/SetValue.tsx) |
| With optgroups | With optgroups | [./examples/Optgroups.tsx](./examples/Optgroups.tsx) |
| Custom asynchronous filtering | The `p-multi-select` component automatically filters options based on user input. | [./examples/AsyncFilter.tsx](./examples/AsyncFilter.tsx) |
| Custom option rendering | By default, `p-multi-select-option` only allows `#text` nodes. | [./examples/SelectedSlot.tsx](./examples/SelectedSlot.tsx) |
