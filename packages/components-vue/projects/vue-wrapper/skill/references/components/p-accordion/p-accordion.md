# p-accordion

The `p-accordion` is a component that reveals or hides associated sections of content. Accordions are flexible in the context and can include other components of the Porsche Design System.

It is a controlled component. This means it does not contain any internal state, and you got full control over its behavior.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use accordions to organize and display large amounts of content in a structured and efficient way.
- Group related content together within each accordion panel.
- Use clear and concise headings for each accordion panel to help users quickly understand what content is included.
- Make sure that each accordion panel is easily identifiable and distinguishable from the others.

### Don't:

- Don't use accordions for content that is essential or required for users to see. Users may not realize that they need to expand the accordion panel to see the content, resulting in a poor user experience.
- Don't overuse accordions on a single page, as this can make the page feel cluttered and difficult to navigate.
- Don't use ambiguous or confusing labels for the accordion headings, as this can make it difficult for users to understand what content is included in each panel.
- Don't overload the accordion panels with too much content, as this can make the component feel overwhelming and difficult to use.
- Don't add a divider on top of the first item.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Enter/Space` | When focus is on the accordion trigger, the associated panel expands or collapses. |

## Development considerations

### Heading hierarchy

The accordion summary should be a heading element (e.g.,`p-heading` or `<h1>` to `<h6>`,) to ensure proper semantic structure and correct heading hierarchy.

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
| `alignMarker` | `'start'` `'end'` | `'end'` | Positions the expand/collapse marker icon at the start or end of the summary section. |
| `background` | `'canvas'` `'surface'` `'frosted'` `'none'` | `'none'` | Sets the background color of the accordion panel. Use `frosted` only when placed on images, videos, or gradients. |
| `compact` | `boolean` | `undefined` | Reduces padding and spacing for a more compact layout, useful in space-constrained interfaces. |
| `heading` _(deprecated)_ | `string` | `undefined` | @deprecated Will be removed in the next major release. Use the `summary` slot instead. Sets the heading text within the summary section. |
| `headingTag` _(deprecated)_ | `'h1'` `'h2'` `'h3'` `'h4'` `'h5'` `'h6'` | `'h2'` | @deprecated Will be removed in the next major release. Use the `summary` slot instead. Sets the heading tag for proper semantic structure within the page. |
| `indent` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Indents the slotted content to be vertically aligned with the text of the summary section. |
| `open` | `boolean` | `undefined` | Controls whether the accordion is open or closed. |
| `size` _(deprecated)_ | `'small'` `'medium'`<br>`BreakpointCustomizable<AccordionSize>` | `'small'` | @deprecated Will be removed in the next major release. Use the `summary` slot instead. Controls the heading size in the summary section (only applies when using the `heading` prop or `heading` slot). |
| `sticky` _(experimental)_ | `boolean` | `undefined` | @experimental Makes the summary section sticky at the top while scrolling. Only works with `background="canvas"` or `background="surface"`. Not compatible with `summary-before` or `summary-after` slots. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `update` | `CustomEvent<AccordionUpdateEventDetail>`<br>`{ open: boolean }` | Emitted when the user toggles the accordion open or closed, with the new open state in the event detail. |

### Controlled properties

- `open` — a controlled prop: the component does **not** update it itself. Handle the `update` event and assign the new value to `open` yourself, or the change will not take effect.

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `summary` | no | — | Content for the accordion's summary section. Clicking toggles the accordion open and closed. |
| `summary-before` | no | — | Content or interactive elements placed before the accordion's summary section. |
| `summary-after` | no | — | Content or interactive elements placed after the accordion's summary section. |
| `heading` _(deprecated)_ | no | — | Content for the accordion's heading section. Clicking toggles the accordion open and closed. |
| _(default)_ | no | — | Main content displayed when the accordion is expanded. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-accordion-summary-top` | `0px` | Controls the sticky top position when `sticky` is enabled. |
| `--p-accordion-px` | `16px` | Horizontal padding of the accordion. |
| `--p-accordion-py` | `16px` | Vertical padding of the accordion. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Sticky summary | The summary can be made sticky by adding the experimental property `sticky` to the `p-accordion` tag. | [./examples/StickySummary.vue](./examples/StickySummary.vue) |
| Interactive elements in summary | The summary section supports interactive elements via the `slot="summary-before"` and `slot="summary-after"` attributes. | [./examples/InteractiveElementsInSummary.vue](./examples/InteractiveElementsInSummary.vue) |
