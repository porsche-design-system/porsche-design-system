# p-display

`p-display` is used to highlight and specify heading styling and hierarchy in documents.

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
| Screen reader (VoiceOver, NVDA) | ✅ |

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

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
| Default | Minimal default configuration. | [./examples/Default.ts](./examples/Default.ts) |
| Size | There are predefined fluid text sizes for the component which should cover most use cases. | [./examples/Size.ts](./examples/Size.ts) |
| Responsive | Responsive | [./examples/SizeResponsive.ts](./examples/SizeResponsive.ts) |
| Semantics | To provide more contextual HTML semantics you can either pass them with the `tag` property or directly inside a slot. | [./examples/Semantics.ts](./examples/Semantics.ts) |
| Color | Predefined theme-based colors are available, but `inherit` can also be used to define a custom color. | [./examples/Color.ts](./examples/Color.ts) |
