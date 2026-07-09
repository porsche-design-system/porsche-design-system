# p-crest

The `p-crest` gives the Porsche brand a distinctive look, sets it apart from others within the overall external image and represents the quality of the product.

> **Usage hint**
>
> This component shall only be used on viewports below 480px (breakpoint "S"). Otherwise, [p-wordmark](../p-wordmark/p-wordmark.md) has to be used.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-crest`.

## Usage

### Do:

- Use the [Wordmark](../p-wordmark/p-wordmark.md) as the main brand identifier.
- Use the crest only as an additional small brand identifier (e.g., within contact cards).
- Switch from the wordmark to the crest on small viewports below 480px (automatically implemented in global navigation and footer).

### Don't:

- Use the crest as the primary brand identifier by default.

---

## Related Components

- [Wordmark](../p-wordmark/p-wordmark.md)

## Accessibility support

This component does not include any special accessibility features.

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `CrestAriaAttribute` | `undefined` | Sets ARIA attributes on the anchor element to improve accessibility when the crest is used as a link. |
| `href` | `string` | `undefined` | When set, renders the crest as an anchor element navigating to this URL when clicked. |
| `target` | `'_self'` `'_blank'` `'_parent'` `'_top'` `'string'` | `'_self'` | Specifies where to open the linked URL (e.g. `_self`, `_blank`). Only applies when `href` is set. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.ts](./examples/Default.ts) |
| Link | The Porsche Crest will be rendered as `<a>`-tag as soon as an `href` is provided. | [./examples/Link.ts](./examples/Link.ts) |
| Custom clickable/focusable area | Sometimes it may be useful to enlarge the clickable/focusable area of the Porsche Crest. | [./examples/CustomClickableArea.ts](./examples/CustomClickableArea.ts) |
