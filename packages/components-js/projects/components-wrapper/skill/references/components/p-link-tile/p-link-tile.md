# p-link-tile

The `p-link-tile` is a navigational component that displays a provided image to tease content and navigate to further information within one container. In case you want the user to execute an action, you should select the [Button Tile](/components/button-tile/) component instead.

**Note:** The component does not take care of processing and aligning the image.

An `<img/>`, `<picture/>` or `<video/>` tag has to be provided as default slot.

Additionally, the properties `href`, `description` and `label` are required. The `description` property is used as a teaser with a more detailed description of the link and where it leads to.

The `label` property is used to describe the anchor.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use Link-Tile for prominent links with appropriate aspect ratios and short descriptions (80 characters or fewer).
- Use [Button-Tile](/components/button-tile/) instead if you want on-page interactivity.
- Use basic Link-Tile for better perception tests and compact Link-Tile for improved spacing (especially on mobile).
- Use gradient Link-Tile when image contrast is insufficient and select images with natural contrast.
- Use font size for visual hierarchy and customize image type and font size for responsiveness.
- Use engaging verbs and product names in compact Link Tile. Create assets upfront for image processing.

### Don't:

- Don't manipulate images. Keep them natural and ensure sufficient contrast.
- Don't write long descriptions that overflow content (especially on mobile).

---

## Related components

- [Button Tile](/components/button-tile/)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Enter` | Activates the link. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the interactive element. |
| `aria-description` | Defines a string value that adds a more detailed description of the interactive element. |
| `aria-current` | Exposes the current state of the link. |
| `aria-haspopup` | Defines that the link opens a popup (e.g. `dialog`). |

## Development considerations

### Labelling

If the text of a link does not clearly indicate what the link's target is, add a brief, descriptive label using the `aria` property with the `aria-label` value to provide more context for screen reader users. Phrases like "Detail" or "Click" can be unclear when read out of context by a screen reader. In such instances, provide an alternative text that offers more detailed information, such as "Details of product XYZ."

### Readable text

In general, placing textual contents above an image or video can easily lead to **contrast issues**. Though the component provides a **scalable background gradient** to reduce the risk of low contrasts between foreground text and background image, there still can occur issues with color contrast ratios, especially if different aspect ratios for multiple viewport sizes are used. So, always **check readability** and play around with the size and weight properties to achieve the best results.

### Video background

In case a video background is used, the component checks whether **reduced motion** is enabled in the operating system settings and prevents the `<video autoplay loop />` attribute from working to improve accessibility & UX. In addition, the slotted video should have no audio or is muted by `<video muted />`. Also keep in mind that long videos or videos in general might increase the page load time. The video content should support the CTA instead of distracting from it. To support screen reader users, define an alternative video description: `<video aria-label="Some video description"" />`.

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

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'top'` `'bottom'` | `'bottom'` | Controls the vertical placement of the description and link — `top` or `bottom`. |
| `aria` | `LinkTileAriaAttribute` | `undefined` | Sets ARIA attributes on the tile's anchor element to improve accessibility for screen readers. |
| `aspectRatio` | `'1/1'` `'4/3'` `'3/4'` `'16/9'` `'9/16'` `'auto'`<br>`BreakpointCustomizable<LinkTileAspectRatio>` | `'4/3'` | Sets the width-to-height ratio of the tile media area. Supports responsive breakpoint values. |
| `compact` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Renders only the icon link without the full label. Supports responsive breakpoint values. |
| `description` _(required)_ | `string` | `undefined` | Sets the description text displayed in the tile's content area. |
| `download` | `string` | `undefined` | Sets the native `download` attribute to trigger a file download. |
| `gradient` | `boolean` | `false` | Shows a gradient overlay over the media slot to improve text legibility on bright images or videos. |
| `href` _(required)_ | `string` | `undefined` | Sets the URL the tile's anchor element navigates to when clicked. |
| `label` _(required)_ | `string` | `undefined` | Sets the accessible label text of the link rendered inside the tile. |
| `rel` | `string` | `undefined` | Sets the `rel` attribute on the link (e.g. `noopener`). |
| `size` | `'medium'` `'large'` `'inherit'`<br>`BreakpointCustomizable<LinkTileSize>` | `'medium'` | Sets the font size of the description text in the tile content area. Supports responsive breakpoint values. |
| `target` | `'_self'` `'_blank'` `'_parent'` `'_top'` `'string'` | `'_self'` | Specifies where to open the linked URL (e.g. `_self`, `_blank`). |
| `weight` | `'regular'` `'semi-bold'`<br>`BreakpointCustomizable<LinkTileWeight>` | `'semi-bold'` | Sets the font weight of the description text in the tile content area. Supports responsive breakpoint values. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `header` | no | — | Renders a header section above the content area. |
| _(default)_ | no | — | Default slot for the img or picture tag. |
| `footer` | no | — | Renders a footer section below the description. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| With video | With video | [./examples/WithVideo.html](./examples/WithVideo.html) |
| UI behaviour | The component is able to break out of its aspect ratio in case content overflows to be accessibility compliant (see first row in example). | [./examples/UiBehaviour.html](./examples/UiBehaviour.html) |
| Hyphens | It is possible to overwrite the hyphens style on the host element and use 'soft' hyphens. | [./examples/Hyphens.html](./examples/Hyphens.html) |
| Footer slot | You can also use a `footer` slot to display additional text below the description, providing more flexibility for custom content. | [./examples/FooterSlot.html](./examples/FooterSlot.html) |
