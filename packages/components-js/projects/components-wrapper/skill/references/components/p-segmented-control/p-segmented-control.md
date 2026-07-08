# p-segmented-control

The `p-segmented-control` component is similar to the native `select` element while showing all available options right away.

It even behaves like a `select` where it can be controlled by setting the current value. However, it is not required and you could purely rely on the change event.

By default the `p-segmented-control` displays all options in **equal** size based on its largest option. If the `no-wrap` property is set to `true`, the items will be rendered inline (shrinked to their initial size) with an optional scroller.

Each option needs to be rendered by using a `p-segmented-control-item` child component where the `value` property is **mandatory** in order to emit a useful change event.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to present a set of selectable options at once.
- Use it for selecting from 2-5 short, consistent options.
- Use them over other selection controls to reduce cognitive load.
- Pair options with icons to improve visual recognition.
- Use icons only when the context meaning is really clear.
- Use preselection when the result is visible by default.
- Use with no selection when a selection by the user is necessary to show the result.
- Use it with a short indication for the unit (such as km, €, %, or $) when possible.
- Use for horizontal and/or vertical display of options.

### Don't:

- Don't use it to filter or navigate content (use [Tabs](../p-tabs/p-tabs.md) instead).
- Don't use it for more than 5 options (use the [Select](../p-select/p-select.md) component).
- Don't use it with mixed values (use [Radio Group](../p-radio-group/p-radio-group.md) or [Select](../p-select/p-select.md) instead).
- Don't exceed maximum width so the values turn multiline.

---

## Related components

- [Select](../p-select/p-select.md)
- [Radio Button](../p-radio-group/p-radio-group.md)
- [Tabs](../p-tabs/p-tabs.md)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Space`, `Enter` | Activates the control. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label="STRING"` | Defines a string value that labels the control item itself. |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="group"` | Identifies a set of user interface objects. |
| `aria-pressed="BOOLEAN"` | Provides the current state of the control. |
| `role="status"`, `role="alert"` | When `message` and `state` or `loading` prop change, the status message is announced. |
| `aria-hidden="true"` | If `required` attribute is set, the visible asterisk indicator is hidden from assistive technologies. |
| `aria-invalid="true"` | If `error` state is set. |
| `aria-required="true"` | Indicates if the element is required. |
| `aria-description="STRING"` | Provides additional content for states. |

## Development considerations

### Labelling

It's recommended to provide a descriptive label to the wrapper component using `aria-label` to provide more context for assistive technologies, e.g.: `<p-segmented-control aria-label="Choose a t-shirt size">`.

If a more detailed label is needed for each **control item**, use the `aria` property on the control item itself, e.g.: `<p-segmented-control-item value="xs" aria="{ 'aria-label': 'Size x-small'}">XS</p-segmented-control-item>`.

If an **icon only** is used, it is mandatory to also provide an accessible name (aria-label) through the `aria` property of the control item.

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

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `'auto'` `1` `2` `3` `4` `5` `6` `7` `8` `9` `10` `11` `12` `13` `14` `15` `16` `17` `18` `19` `20` `21` `22` `23` `24` `25`<br>`BreakpointCustomizable<SegmentedControlColumns>` | `'auto'` | Sets the number of equal-width columns for the item layout. Use `auto` to distribute items based on their content width. Supports responsive breakpoint values. |
| `compact` | `boolean` | `false` | Reduces the item height and spacing for use in dense layouts where vertical space is limited. |
| `description` | `string` | `''` | Sets a supplementary description displayed below the label to give users additional context about the segmented control. |
| `disabled` | `boolean` | `false` | Prevents user interaction with all items in the segmented control and excludes the value from form submissions. |
| `form` | `string` | `undefined` | Associates the segmented control with a form element by its ID when it is not a direct descendant of that form. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `label` | `string` | `''` | Sets the visible label text displayed above the segmented control to describe the group of options. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the segmented control when `state` is `success` or `error`. |
| `name` | `string` | `undefined` | Sets the name of the control submitted with the form data to identify the selected value on the server. |
| `noWrap` | `boolean` | `false` | Prevents items from wrapping to new rows and renders them in a single horizontally scrollable row instead. |
| `required` | `boolean` | `false` | Marks the segmented control as required so the form cannot be submitted until one option is selected. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state of the segmented control, controlling its visual appearance and feedback message style (`none`, `success`, `error`). |
| `value` | `'string'` `'number'` | `undefined` | Sets the currently selected item's value and pre-selects the matching option when the component renders. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<void>` | Emitted when the segmented control loses focus, useful for triggering validation on blur. |
| `change` | `CustomEvent<SegmentedControlChangeEventDetail>`<br>`{ value: string | number }` | Emitted when the user selects a different item, carrying the new value in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `description` | no | — | Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| _(default)_ | no | — | Default slot for the `p-segmented-control-item` tags. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| Form | The `p-segmented-control` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.html](./examples/Form.html) |
| With Labels | Additional meta information can be displayed by setting a `label` on each child. | [./examples/WithLabels.html](./examples/WithLabels.html) |
| Slots | Use named slots when `label`, `description` or `message` need markup such as a link. | [./examples/Slots.html](./examples/Slots.html) |
