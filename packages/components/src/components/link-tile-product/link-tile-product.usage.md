<ComponentHeading name="Link Tile Product"></ComponentHeading>

<TableOfContents></TableOfContents>

## Usage

The following segment provides instructions for designers and developers regarding the appropriate utilization of this
component in various situations.

### Do:

- Use Link-Tile-Product to display a single product or within other products.
- Use the heading prop only for the product name.
- Use the price prop only for price and price reduction.
- Use description prop only for VAT or other disclaimers according to the product.
- Use only transparent images for the Link-Tile-Product.
- Use product images with an aspect ratio of 8:9.
- Use only product images with the same aspect ratio.
- Use Link-Tile-Products with identical sizes in one view.
- Use header slot only for appropriate information like new or limited and keep it short.
- Use Link-Tile-Product in a grid with other products.
- Use the likeButton prop to hide the likeButton when no wishlist is available.

### Don't:

- Don't manipulate product images, keep them natural, with transparent backgrounds and contrasted.
- Don't integrate environment into the product image, no reflection, drop shadow, or other styling effects.
- Don't alter the display of VAT when the display is requested, either show it for all products or don't.
- Don't manipulate the likeButton, this position is only reserved for this function.
- Don't have long product names.

---

## Related components

- [Link Tile](components/link-tile)
- [Link Tile Model Signature](components/link-tile-model-signature)
