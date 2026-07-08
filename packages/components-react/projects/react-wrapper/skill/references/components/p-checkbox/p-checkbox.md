# p-checkbox

The `p-checkbox` component wraps the native HTML input type `checkbox` form element. Checking one box doesn't uncheck other Checkboxes. By default, Checkboxes are not selected.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-checkbox` component can be used with or without a label, but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use for a list of options when you want the user to select one, none, or multiple options.
- Use when an explicit action is required to apply to settings.
- Use the default view for checkboxes when no option is selected.
- Use the indeterminate state only as a visual state and not as a direct user interaction.
- Nest when a parent and child relationship is needed.
- Use short and descriptive label text for each checkbox option.
- Provide validation messages for each checkbox option if needed.
- Set vertically left-aligned for better scannability.

### Don't:

- Avoid using when you have more than 8 options to choose from or consider using a [Select](../p-select/p-select.md).
- Don't mix [Radio Group](../p-radio-group/p-radio-group.md) options with checkboxes.
- Don't change the selection of another checkbox when a nested one is clicked. The only exception is when a checkbox is used to make a bulk selection of multiple items.

---

## Related Components

- [Radio Group](../p-radio-group/p-radio-group.md)
- [Select](../p-select/p-select.md)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Space` | Activates/Deactivates checkbox. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-describedby="IDREF"` | References the accessible description of status messages. |
| `role="status"`, `role="alert"` | When `message` and `state` or `loading` prop change, the status message is announced. |
| `aria-hidden="true"` | If `required` attribute is set, the visible asterisk indicator is hidden from assistive technologies. |
| `aria-invalid="true"` | If `error` state is set. |

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
| `checked` | `boolean` | `false` | Reflects the checkbox's current checked state and allows setting the initial checked value on load. |
| `compact` | `boolean` | `false` | Reduces the checkbox size and spacing for a more compact layout. |
| `disabled` | `boolean` | `false` | Disables the checkbox, preventing all interaction. The value is not submitted with the form. |
| `form` | `string` | `undefined` | Associates the checkbox with a form element by its ID when not directly nested inside it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `indeterminate` | `boolean` | `false` | Puts the checkbox into an indeterminate state, indicating that a group of child items is only partially selected. |
| `label` | `string` | `''` | Sets the visible label text displayed next to the checkbox. |
| `loading` _(experimental)_ | `boolean` | `false` | @experimental Disables the checkbox and displays a loading spinner to indicate an ongoing operation. |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the checkbox when `state` is `success` or `error`. |
| `name` | `string` | `''` | Sets the name submitted with the form data to identify this checkbox's value on the server. |
| `required` | `boolean` | `false` | Marks the checkbox as required — form submission is blocked unless the checkbox is checked. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). |
| `value` | `string` | `'on'` | Sets the value submitted with the form data when the checkbox is checked. Unchecked checkboxes are excluded from form submissions. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `blur` | `CustomEvent<CheckboxBlurEventDetail>`<br>`Event` | Emitted when the checkbox loses focus. |
| `change` | `CustomEvent<CheckboxChangeEventDetail>`<br>`Event` | Emitted when the user changes the checked state of the checkbox. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| `label-after` | no | — | Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`). |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-checkbox-border-color` | — | 🧪Experimental: Border colors of Checkbox. Should be used to override the default border color in different states (e.g., hover, focus, error), e.g. when the Checkbox is wrapped inside a custom label. |
| `--p-checkbox-background-color` | — | 🧪Experimental: Background color of Checkbox. |
| `--p-checkbox-icon-color` | — | 🧪Experimental: Checkmark icon color of Checkbox. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Form | The `p-checkbox` can be integrated into a form in two ways: **controlled** or **uncontrolled**, depending on your needs. | [./examples/Form.tsx](./examples/Form.tsx) |
| Indeterminate | Mask the visual appearance of a checkbox which has a state in-between checked and unchecked. | [./examples/Indeterminate.tsx](./examples/Indeterminate.tsx) |
| Slots | Use named slots when `label` or `message` need markup such as a link. | [./examples/Slots.tsx](./examples/Slots.tsx) |
| Custom wrapped label (🧪Experimental) | The `p-checkbox` component also supports a custom wrapped `label` by wrapping the component in a `label` tag. | [./examples/WrappedLabel.tsx](./examples/WrappedLabel.tsx) |
