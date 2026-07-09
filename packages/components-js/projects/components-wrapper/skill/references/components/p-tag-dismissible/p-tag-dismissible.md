# p-tag-dismissible

`p-tag-dismissible` is used in contexts where the user can actively remove a tag. It is often seen in filtering.

## Usage

Allows users to quickly refine the result of data they want to be presented on the page.

### Do:

- Use to show that a certain filter is active.
- Use this component with a label if additional information is needed (e.g. category an attribute/filter refers to).

### Don't:

- Don't use it for other interactions than dismissing a selection.
- Don't have long content that causes multiline.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Enter`, `Space` | Removes the element. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the interactive element. |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-hidden="true"` | The "close" icon is hidden from assistive technologies. |

## Development considerations

### Focus handling

Ensure that when a `p-tag-dismissible` is removed, the focus is set to the previous or next `p-tag-dismissible` or to another focusable element. This prevents losing the focus order.

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `TagDismissibleAriaAttribute` | `undefined` | Sets ARIA attributes on the dismiss button element, for example use `aria-label` to provide a descriptive close action for screen readers. |
| `compact` | `boolean` | `false` | Reduces the tag's padding and height for use in dense layouts where vertical space is limited. |
| `label` | `string` | `undefined` | Sets the visible label text displayed inside the tag alongside the dismiss button. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the tag content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
