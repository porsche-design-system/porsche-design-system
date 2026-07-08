# p-radio-group

The `p-radio-group` component is a versatile custom form element that enables the selection of a single option.

Options are slotted using the `p-radio-group-option` component. Each option needs to have an assigned value, which can be passed via an attribute or property and needs to be of type string. Initial selection states can only be achieved using the value property on the `p-radio-group` component. If an option should be visible but not selectable, it can be disabled by using the `disabled` attribute.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-radio-group` component can be used with or without a label, but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to enable a user to select one value from a predefined list. Use as soon as two options are mutually exclusive.
- Use [Checkbox](../p-checkbox/p-checkbox.md) instead if there is only one option.
- Use when the user should see all available options.
- Consider using the [Segmented Control](../p-segmented-control/p-segmented-control.md) for 5 options or fewer.
- Keep the label text short and descriptive (one or two words).
- Select one option by default in a group of radio buttons, except for cases where a pre-selection can lead to wrong assumptions.
- Align radio buttons with more than 2 items vertically left-aligned.

### Don't:

- Don't use a radio Button for a large number of items (≥ 7), use the [Select](../p-select/p-select.md) or [Segmented Control](../p-segmented-control/p-segmented-control.md) component instead.

---

## Related Components

- [Checkbox](../p-checkbox/p-checkbox.md)
- [Segmented Control](../p-segmented-control/p-segmented-control.md)
- [Select](../p-select/p-select.md)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Arrow left`, `Arrow right`, `Down Arrow` `Up Arrow` | Activates and moves focus to the next/prev radio button in a group. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-labelledby="IDREF"` | Defines the accessible name. |
| `aria-describedby="IDREF"` | Defines the accessible description combined with the status message. |
| `role="status"`, `role="alert"` | When `message` and `state` or `loading` prop change, the status message is announced. |
| `aria-hidden="true"` | If `required` attribute is set, the visible asterisk indicator is hidden from assistive technologies. |
| `aria-invalid="true"` | If `error` state is set. |
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
| Screen reader (VoiceOver, NVDA) | ⚠️(Note: VoiceOver does not announce the number of options correctly) |

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `compact` | `boolean` | `false` | Reduces the spacing between radio options for use in dense layouts where vertical space is limited. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to give users additional guidance about the radio group. |
| `direction` | `'row'` `'column'`<br>`BreakpointCustomizable<RadioGroupDirection>` | `'column'` | Sets the layout direction of the radio options. Use `column` to stack them vertically or `row` to arrange them horizontally. Supports responsive breakpoint values. |
| `disabled` | `boolean` | `false` | Disables all radio options in the group, preventing selection and excluding the value from form submissions. |
| `form` | `string` | `undefined` | Associates the radio group with a form element by its ID when the group is not a direct descendant of that form. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `label` | `string` | `''` | Sets the visible label text displayed above the radio group to identify the group's purpose. |
| `loading` _(experimental)_ | `boolean` | `false` | @experimental Disables all radio options and shows a spinner to indicate a background loading operation. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the radio group when `state` is `success` or `error`. |
| `name` _(required)_ | `string` | `undefined` | Sets the shared name attribute for all radio buttons in the group, grouping them for mutually exclusive selection. |
| `required` | `boolean` | `false` | Marks the radio group as required so the form cannot be submitted until one option is selected. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state of the radio group, controlling its visual appearance and feedback message style (`none`, `success`, `error`). |
| `value` | `string` | `''` | Sets the currently selected value that pre-selects the matching radio option and reflects user changes. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<void>` | Emitted when the radio group loses focus after the user interacts with it, useful for triggering validation on blur. |
| `change` | `CustomEvent<RadioGroupChangeEventDetail>`<br>`Event` | Emitted when the user selects a different option, carrying the new value and the native event in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `description` | no | — | Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| _(default)_ | no | — | Default slot for the p-radio-group-option tags. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Form | The `p-radio-group` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.tsx](./examples/Form.tsx) |
| Slots | Use named slots when `label` or `message` need markup such as a link. | [./examples/Slots.tsx](./examples/Slots.tsx) |
