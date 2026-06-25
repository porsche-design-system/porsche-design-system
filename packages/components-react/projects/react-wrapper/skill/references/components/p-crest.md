# p-crest

The `p-crest` gives the Porsche brand a distinctive look, sets it apart from others within the overall external image and represents the quality of the product.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-crest`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use the [Wordmark](/components/wordmark/) as the main brand identifier.
- Use the crest only as an additional small brand identifier (e.g., within contact cards).
- Switch from the wordmark to the crest on small viewports below 480px (automatically implemented in global navigation and footer).

### Don't:

- Use the crest as the primary brand identifier by default.

---

## Related Components

- [Wordmark](/components/wordmark/)

## Accessibility support

This component does not include any special accessibility features.

## Tests

### Automated

| Technology | Support |
| --- | --- |
| AXE-Core (WCAG 2.2 AA, Best-Practice) | ✅ |

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `CrestAriaAttribute` | `undefined` | Sets ARIA attributes on the anchor element to improve accessibility when the crest is used as a link. |
| `href` | `string` | `undefined` | When set, renders the crest as an anchor element navigating to this URL when clicked. |
| `target` | `'_self'` `'_blank'` `'_parent'` `'_top'` `'string'` | `'_self'` | Specifies where to open the linked URL (e.g. `_self`, `_blank`). Only applies when `href` is set. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./p-crest/examples/Default.tsx](./p-crest/examples/Default.tsx) |
| Link | The Porsche Crest will be rendered as `<a>`-tag as soon as an `href` is provided. | [./p-crest/examples/Link.tsx](./p-crest/examples/Link.tsx) |
| Custom clickable/focusable area | Sometimes it may be useful to enlarge the clickable/focusable area of the Porsche Crest. | [./p-crest/examples/CustomClickableArea.tsx](./p-crest/examples/CustomClickableArea.tsx) |
