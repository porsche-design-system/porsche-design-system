# p-text

`p-text` is used to specify paragraph styling in documents.

## Usage

p-text is used to specify paragraph styling

### Do:

- Use p-text for all running body copy, descriptions, and supporting text.
- Default to text-small for standard paragraphs; scale up for intros or short content blocks.
- Use text-xx-small for legal disclaimers or metadata.
- Maintain spacing and alignment using the fluid grid and responsive typography.
- Always use the predefined text styles to ensure readability and scalability.

### Don't:

- Don’t use p-text styles for section titles or visual emphasis—use p-heading or p-display.
- Don’t apply unapproved font sizes, weights, or custom spacing.

## Accessibility support

This component does not include any special accessibility features.

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'start'` `'center'` `'end'` `'inherit'` | `'start'` | Text alignment of the text. Use 'start' for left-aligned text (in LTR), 'center' for centered, 'end' for right-aligned (in LTR), or 'inherit' to adopt the parent's alignment. |
| `color` | `'primary'` `'contrast-higher'` `'contrast-high'` `'contrast-medium'` `'success'` `'warning'` `'error'` `'info'` `'inherit'` | `'primary'` | Text color of the text. Use 'primary' for default, 'contrast-higher' / 'contrast-high' / 'contrast-medium' for alternative emphasis levels, 'success' / 'warning' / 'error' / 'info' for status messages, or 'inherit' to adopt the parent's color. |
| `ellipsis` | `boolean` | `false` | Adds an ellipsis to a single line of text if it overflows the container width. When enabled, the text is truncated to a single line with `text-overflow: ellipsis`. Cannot be combined with multi-line content. |
| `hyphens` | `'none'` `'manual'` `'auto'` `'inherit'` | `'inherit'` | Controls the hyphenation behavior of the text. Use 'auto' to let the browser automatically hyphenate words at appropriate points, 'manual' to only hyphenate at manually inserted hyphenation points (e.g. `&shy;`), 'none' to disable hyphenation entirely, or 'inherit' to adopt the parent's hyphenation setting. |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'` `'5xl'` `'inherit'`<br>_deprecated:_ `'xx-small'` `'x-small'` `'small'` `'medium'` `'large'` `'x-large'`<br>`BreakpointCustomizable<TextSize>` | `'sm'` | Size of the text. Also defines the size for specific breakpoints, like {base: "sm", l: "md"}. You always need to provide a base value when doing this. Use 'inherit' to adopt the parent's font size. |
| `tag` | `'p'` `'span'` `'div'` `'address'` `'blockquote'` `'figcaption'` `'cite'` `'time'` `'legend'` | `'p'` | Sets the HTML tag of the rendered element to ensure correct semantic meaning (e.g. 'p' for paragraphs, 'blockquote' for quotes, 'time' for dates). |
| `weight` | `'normal'` `'semibold'` `'bold'`<br>_deprecated:_ `'regular'` `'semi-bold'` | `'normal'` | The font weight of the text. Use 'normal' for regular body text, 'semibold' for slightly emphasized text, or 'bold' for strong emphasis. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the text to render. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Static Size | There are predefined fluid text sizes for the text component which should cover most use cases. | [./examples/Size.vue](./examples/Size.vue) |
| Responsive Size | The `size` property accepts a breakpoint object to render different text sizes per viewport. | [./examples/SizeResponsive.vue](./examples/SizeResponsive.vue) |
| Semantics | To provide more contextual HTML semantics you can either pass them with the `tag` property or directly inside a slot. | [./examples/Semantics.vue](./examples/Semantics.vue) |
