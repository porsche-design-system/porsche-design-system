# p-tag

`p-tag` is used to label, categorize, or organize items by using keywords that describe them.

## Usage

Use tags to label, categorize, or organize items using keywords that describe them.

### Do:

- Use to indicate or highlight a certain attribute of an item.
- Use to show that content is mapped to one or multiple categories.
- Use to indicate that a certain filter is active.
- Use short labeling for easy scanning.
- Have a large number of tags horizontally scrollable, swipeable, or navigable with arrows.
- Have tags in a predefined space and move to the next line once they meet the boundary.
- Use color themes such as success, neutral, warning, and error for better visual perception
- Include icons to improve the faster perception.
- Add a link for further explanation about the tag for better understandability (With modal).
- Add a link for additional information that is not necessary for the task completion (With modal).

### Don't:

- Don't use more than two words (only if necessary).
- Don't implement something else than a link or button.
- Don't use Tags for navigation.

## Accessibility support

This component does not include any special accessibility features.

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `compact` | `boolean` | `false` | Reduces the tag's padding and height for use in dense layouts where vertical space is limited. |
| `icon` | `'none'`<br>one of 290 icon names — see [icon names](references/icons.md) | `'none'` | Sets the icon displayed inside the tag alongside the label. Use `none` to render the tag without an icon. |
| `iconSource` | `string` | `undefined` | Sets a URL to a custom SVG icon, overriding the built-in icon set when a brand-specific icon is needed. |
| `variant` | `'primary'` `'secondary'` `'info'` `'info-frosted'` `'warning'` `'warning-frosted'` `'success'` `'success-frosted'` `'error'` `'error-frosted'` | `'secondary'` | Sets the visual style of the tag, which controls its background and text colors (e.g. `primary`, `secondary`, `notification-info`). |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the tag content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| With slotted button | It is possible to add a `<button>` tag into the `p-tag` component. | [./examples/SlottedButton.vue](./examples/SlottedButton.vue) |
| With slotted link | It is possible to add an `<a>` tag to the `p-tag` component. | [./examples/SlottedLink.vue](./examples/SlottedLink.vue) |
| Multiline | The contents of the `p-tag` component are rendered with `white-space: nowrap` by default. | [./examples/Multiline.vue](./examples/Multiline.vue) |
