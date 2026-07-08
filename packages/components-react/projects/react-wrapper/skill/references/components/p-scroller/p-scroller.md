# p-scroller

The `p-scroller` component forces its child nodes to be rendered horizontally next to each other. In case not enough viewport space is given a clickable scroll indicator is shown and the elements become scrollable.

As soon as the slotted element(s) exceed the viewport / their respective container, scroll indicators are shown.

If the `p-scroller` component is accessed by keyboard navigation and is focused, scrolling via `arrow right` and `arrow left` is possible. If `p-scroller` contains focusable element(s) these can be also accessed by keyboard navigation.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use when an item or a group of items do not fit into the viewport width and horizontal scrolling is needed.
- Use it with elements of the same type, appearance, and function that are aligned horizontally.
- Use the Surface variant if the component is used on the surface background.
- Use it with one or more focusable elements.
- Use in components such as Tabs, Table, and Stepper.

### Don't:

- Don't place important actions or information for customer flow within the scroller.
- Don't use text that should not have line breaks in the scroller.
- Don't assume that elements within a scroller are affected by breakpoints and viewport size as they are not.

---

## Related Components

- [Tabs](../p-tabs/p-tabs.md)
- [Table](../p-table/p-table.md)
- [Stepper](../p-stepper-horizontal/p-stepper-horizontal.md)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the scroll container or to next (or previous) focusable element. |
| `Arrow left`, `Arrow right` | Scrolls the container. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `role="VALUE"` | Defines the semantic role of the container element. |

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
| `alignScrollIndicator` _(deprecated)_ | `'top'` `'center'` | `'center'` | @deprecated since v4.0.0, will be removed with next major release, has no effect anymore. |
| `aria` | `ScrollerAriaAttribute` | `undefined` | Sets ARIA role and attributes on the scroller's scroll container, useful for tablist navigation patterns and additional accessibility context. |
| `compact` | `boolean` | `undefined` | Reduces the scroller's padding and the gap between slotted items for use in dense layouts. |
| `scrollbar` | `boolean` | `false` | Shows the browser's native scrollbar inside the scroller, in addition to the scroll indicator arrows. |
| `scrollToPosition` _(deprecated)_ | `ScrollerScrollToPosition` | `undefined` | @deprecated since v4.0.0, use native `scrollIntoView()` on the slotted element itself. |
| `sticky` _(experimental)_ | `boolean` | `false` | @experimental Makes the indicator sticky at the top or bottom while scrolling depending on the scroll direction. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the scroller content. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-scroller-gap` | `8px` | Defines the gap between slotted nodes. |
| `--p-scroller-indicator-top` | `0px` | Defines the distance from the top of the viewport at which the indicator sticks when scrolling down and `sticky` is enabled. |
| `--p-scroller-indicator-bottom` | `0px` | Defines the distance from the bottom of the viewport at which the indicator sticks when scrolling up and `sticky` is enabled. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Height | The height of `p-scroller` depends on the height of its content. | [./examples/Height.tsx](./examples/Height.tsx) |
| Scroll to position | The `p-scroller` component provides the `scrollToPosition` property. | [./examples/ScrollToPosition.tsx](./examples/ScrollToPosition.tsx) |
