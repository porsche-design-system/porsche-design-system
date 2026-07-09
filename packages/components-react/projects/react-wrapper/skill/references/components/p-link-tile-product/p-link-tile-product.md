# p-link-tile-product

> **Experimental:** This component is experimental — its API may change in any release. Avoid relying on it in production.

The `p-link-tile-product` is a navigational component designed to showcase a featured product within a store. it offers the option to "like" the product, allowing you to easily add it to the users wishlist. Additionally, you can place a chip at the top to signal special features about the product, such as its novelty or exclusivity.

An `img` or `picture` element has to be available as a child of the `p-link-tile-product` component.

The `heading` and `price` properties are required and a link must be provided, using either the `href` property or a [slotted link](./p-link-tile-product.md).

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use Link-Tile-Product to display a single product or within other products.
- Use the heading prop only for the product name.
- Use the price prop only for price and price reduction.
- Use description prop only for VAT or other disclaimers according to the product.
- Use only transparent images for the Link Tile Product.
- Use product images with an aspect ratio of 8:9.
- Use only product images with the same aspect ratio.
- Use Link-Tile-Products with identical sizes in one view.
- Use the header slot only for appropriate information such as "new" or "limited", and keep it short.
- Use Link-Tile-Product in a grid with other products.
- Use the likeButton prop to hide the likeButton when no wishlist is available.

### Don't:

- Do not manipulate product images. Keep them natural, with transparent backgrounds and sufficient contrast.
- Don't integrate environment into the product image, no reflection, drop shadow, or other styling effects.
- Don't alter the display of VAT when the display is requested, either show it for all products or don't.
- Don't manipulate the likeButton, this position is only reserved for this function.
- Don't have long product names.

---

## Related components

- [Link Tile](../p-link-tile/p-link-tile.md)

## Accessibility support

Not yet considered due to experimental state  🧪.

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aspectRatio` | `'3/4'` `'9/16'`<br>`BreakpointCustomizable<LinkTileProductAspectRatio>` | `'3/4'` | Sets the width-to-height ratio of the tile media area. Supports responsive breakpoint values. |
| `description` | `string` | `undefined` | Sets an optional short description providing additional product details below the price. |
| `heading` _(required)_ | `string` | `undefined` | Sets the product name displayed prominently at the top of the tile. |
| `href` | `string` | `undefined` | Sets the URL the tile navigates to when clicked. Alternatively, provide a slotted anchor element. |
| `likeButton` | `boolean` | `true` | Shows a like/bookmark button so users can save the product. |
| `liked` | `boolean` | `false` | Reflects whether the product is currently liked — controls the filled state of the like button. |
| `price` _(required)_ | `string` | `undefined` | Sets the current retail price of the product, displayed with or without a discount. |
| `priceOriginal` | `string` | `undefined` | Sets the original recommended retail price shown with a strikethrough to indicate a discount. Requires `price` to be set. |
| `rel` | `string` | `undefined` | Sets the `rel` attribute on the link (e.g. `noopener`). |
| `target` | `'_self'` `'_blank'` `'_parent'` `'_top'` `'string'` | `'_self'` | Specifies where to open the linked URL (e.g. `_self`, `_blank`). |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `like` | `CustomEvent<LinkTileProductLikeEventDetail>`<br>`{ liked: boolean }` | Emitted when the user clicks the like button, with the new liked state in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `anchor` | no | — | Slotted anchor link which can be used instead of the `href` prop. Ensure the named slot is directly on the anchor element, without nesting. |
| `header` | no | — | Shows special features about the product like novelty or exclusivity. Although you can pass in anything, it is recommended to use the `p-tag` component. |
| _(default)_ | no | — | Default slot for the img or picture tag. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Framework routing (anchor nesting) | To support framework routing you can provide the link as a slotted element by using the `anchor` slot instead of using the `href` property. | [./examples/FrameworkRouting.tsx](./examples/FrameworkRouting.tsx) |
