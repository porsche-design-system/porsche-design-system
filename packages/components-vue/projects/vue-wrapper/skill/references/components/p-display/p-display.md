# p-display

> **Deprecated:** since v4.0.0, will be removed with next major release. Please use `p-heading` instead.

`p-display` is used to highlight and specify heading styling and hierarchy in documents.

> **Recommendation**
>
> Although the component is very sophisticated, it's recommended (if possible) to use the corresponding utility classes of the "@porsche-design-system/components-{js | angular | react | vue}/tailwindcss" sub-package or any of the other styling solutions for best performance since way less DOM nodes are required to render. Further information can be found [here](../../styles/tailwindcss.md).

## Usage

p-display is used to highlight and specify heading styling and hierarchy.

### Do's:

- Use p-display for standout moments like hero intros, emotional statements, or key statistics.
- Choose from display-small, display-medium, or display-large depending on the visual weight required.
- Center-align p-display styles for marketing, landing, or intro sections to enhance visual impact.
- Ensure generous spacing around p-display elements to give them room to breathe.

### Don't:

- Don’t use p-display styles for standard section headings or body text—use p-heading or p-text instead.
- Don’t mix multiple p-display sizes on the same screen unless clearly structured (e.g. in a visual hierarchy).

## Accessibility support

This component does not include any special accessibility features.

## Development considerations

### Heading hierarchy

While using the `Display` component, take care of the correct heading hierarchy which can be adjusted through the `tag` property. Keep in mind that the visual appearance must not always be identical with the semantic hierarchy.

#### Best practices

- Use one unique `h1` per page that describes what that page is about.
- Use headings to describe the content below. Do not use an HTML heading just to make the text appear bigger or stand out.
- Use heading levels like the index of a book: hierarchical.
- Do not choose a heading by its size, but by its level in the context of the content.
- Heading hierarch should not increase by more than one level at a time.
- Do not skip a heading level from the top down.

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'start'` `'center'` `'end'` `'inherit'` | `'start'` | Sets the horizontal text alignment (`start`, `center`, `end`, or `inherit`). |
| `color` | `'primary'` `'inherit'` | `'primary'` | Sets the text color using PDS color tokens. |
| `ellipsis` | `boolean` | `false` | Truncates the text with an ellipsis when it overflows the container on a single line. |
| `size` | `'small'` `'medium'` `'large'` `'inherit'`<br>`BreakpointCustomizable<DisplaySize>` | `'large'` | Sets the visual text size. Supports responsive breakpoint values. |
| `tag` | `undefined` `'h1'` `'h2'` `'h3'` `'h4'` `'h5'` `'h6'` | `undefined` | Sets the HTML heading tag (h1–h6) for correct document outline placement. When omitted, the tag is inferred from `size`. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the display text. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Size | There are predefined fluid text sizes for the component which should cover most use cases. | [./examples/Size.vue](./examples/Size.vue) |
| Responsive | Responsive | [./examples/SizeResponsive.vue](./examples/SizeResponsive.vue) |
| Semantics | To provide more contextual HTML semantics you can either pass them with the `tag` property or directly inside a slot. | [./examples/Semantics.vue](./examples/Semantics.vue) |
| Color | Predefined theme-based colors are available, but `inherit` can also be used to define a custom color. | [./examples/Color.vue](./examples/Color.vue) |
