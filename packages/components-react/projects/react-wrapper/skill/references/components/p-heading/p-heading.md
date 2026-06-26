# p-heading

`p-heading` is used to highlight and specify heading styling and hierarchy in documents.

## Usage

p-heading is used to highlight and specify heading styling and hierarchy

### Do:

- Use p-heading styles to clearly mark section titles and subsections.
- Align headings with the grid to maintain visual rhythm.
- Use heading-xx-large for primary sections; scale down for subsections.
- Pair each heading with a text style one or two steps smaller (e.g. heading-large with text-medium).

### Don't:

- Don’t use p-heading styles for hero or marketing intros—use p-display instead.
- Don’t mix heading sizes inconsistently within the same view.
- Don’t center-align headings in content-heavy layouts unless intended for a special moment.

## Accessibility support

This component does not include any special accessibility features.

## Development considerations

### Heading hierarchy

While using the `Heading` component, take care of the correct heading hierarchy which can be adjusted through the `tag` property. Keep in mind that the visual appearance must not always be identical with the semantic hierarchy.

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
| `color` | `'primary'` `'contrast-higher'` `'contrast-high'` `'contrast-medium'` `'inherit'` | `'primary'` | Sets the text color using PDS color tokens. |
| `ellipsis` | `boolean` | `false` | Truncates the text with an ellipsis when it overflows the container on a single line. Cannot be combined with multi-line content. |
| `hyphens` | `'none'` `'manual'` `'auto'` `'inherit'` | `'none'` | Controls hyphenation behavior — `auto` lets the browser decide, `manual` only breaks at `&shy;`, `none` disables it entirely. |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'` `'5xl'` `'inherit'`<br>_deprecated:_ `'small'` `'medium'` `'large'` `'x-large'` `'xx-large'`<br>`BreakpointCustomizable<HeadingSize>` | `'2xl'` | Sets the visual size of the heading. Use `inherit` to derive size from the parent. Supports responsive breakpoint values. |
| `tag` | `undefined` `'h1'` `'h2'` `'h3'` `'h4'` `'h5'` `'h6'` | `undefined` | Sets the HTML heading tag (h1–h6) for correct document outline placement. When omitted, the tag is inferred from `size`. |
| `weight` | `'normal'` `'semibold'` `'bold'`<br>_deprecated:_ `'regular'` `'semi-bold'` | `'normal'` | Sets the font weight — `normal`, `semibold`, or `bold`. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot to render the heading. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Semantics | To provide more contextual HTML semantics you can either pass them with the `tag` property or directly inside a slot. | [./examples/Semantics.tsx](./examples/Semantics.tsx) |
| Color | Predefined theme-based colors are available, but `inherit` can also be used to define a custom color. | [./examples/Color.tsx](./examples/Color.tsx) |
