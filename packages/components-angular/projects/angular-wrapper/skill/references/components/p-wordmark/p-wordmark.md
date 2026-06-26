# p-wordmark

The `p-wordmark` gives the Porsche brand a distinctive look, sets it apart from others within the overall external image and represents the quality of the product.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-wordmark`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do

- Use the `p-wordmark` as the main brand identifier.
- Use the `p-wordmark` only in dedicated situations, like global navigation.
- Position the `p-wordmark` centered whenever possible.
- Use the `p-crest` only as an additional small brand identifier (e.g., within contact cards).
- Switch from the `p-wordmark` to the `p-crest` on small viewports below 480px (automatically implemented in global navigation and footer).

### Don't

- Use the `p-crest` as the primary brand identifier by default.
- Display the `p-wordmark` too often (usually once is enough).

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | If `href` prop is set, focus moves to the next (or previous) focusable element. |
| `Enter` | Activates the link. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the interactive element. |
| `aria-current` | Exposes the current state of the link. |
| `aria-haspopup` | Defines that the button opens a popup (e.g. `dialog`). |

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
| `aria` | `WordmarkAriaAttribute` | `undefined` | Sets ARIA attributes on the anchor element to improve accessibility when the wordmark is used as a link. |
| `href` | `string` | `undefined` | When set, wraps the wordmark in an anchor element that navigates to the given URL on click. |
| `size` | `'small'` `'inherit'` | `'small'` | Sets the display size of the Porsche wordmark SVG using predefined PDS size tokens (`small`, `medium`, `large`, `inherit`). |
| `target` | `'_self'` `'_blank'` `'_parent'` `'_top'` `'string'` | `'_self'` | Specifies where to open the linked URL when `href` is set (e.g. `_self`, `_blank`). |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.ts](./examples/Default.ts) |
| Size | By default, the sizing is fluid, which can be changed to `inherit` a specified value. | [./examples/Size.ts](./examples/Size.ts) |
| Custom clickable/focusable area | Sometimes it may be useful to enlarge the clickable/focusable area of the `p-wordmark`. | [./examples/CustomClickableArea.ts](./examples/CustomClickableArea.ts) |
