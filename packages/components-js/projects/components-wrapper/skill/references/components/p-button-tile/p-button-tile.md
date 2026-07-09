# p-button-tile

The `p-button-tile` is an interactive component that displays a provided image to tease content and performs form or **interaction** events within one container. Whenever you want to provide navigational elements, stick to the [Link Tile](../p-link-tile/p-link-tile.md) component instead.

**Note:** The component does not take care of processing and aligning the image.

An `<img/>`, `<picture/>` or `<video/>` tag has to be provided as default slot.

Additionally, the properties `description` and `label` are required. The `description` property is used as a teaser with a more detailed description of the button and its action.

The `label` property is used to describe the button.

## Usage

### Do:

- Use Button Tile for **on-page interactivity**.
- Use [Link Tile](../p-link-tile/p-link-tile.md) instead if you want to **navigate** to another page.
- Use Button Tile with appropriate aspect ratios and short descriptions (80 characters or fewer).
- Use basic Button Tile for better perception tests and compact Button Tile for improved spacing (especially on mobile).
- Use gradient Button Tile when image contrast is insufficient and select images with natural contrast.
- Use font size for visual hierarchy and customize image type and font size for responsiveness.
- Use engaging verbs and product names in compact Button Tile.
- Create assets upfront for image processing.

### Don't:

- Don't manipulate images, keep them natural and contrasted.
- Don't write long descriptions that overflow content (especially on mobile).

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Enter`, `Space` | Activates the button. |
| `disabled` | Button still focusable. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels an interactive element. It's required for buttons with `hideLabel="true"`. |
| `aria-description` | Defines a string value that adds a more detailed description of the interactive element. |
| `aria-expanded` | Exposes a visual state (e.g. expanded/collapsed) of another element. |
| `aria-pressed` | Exposes the `pressed` state of a toggle button. |
| `aria-haspopup` | Defines that the button opens a popup (e.g. `dialog`). It can be used in combination with `aria-expanded` to indicate the state of the popup. |

## Limitations

Due to the nature of **Web Components** and **shadow DOM**, there are limitations when using some **ARIA** attributes to define relationships between elements across different shadow DOMs or shadow DOM/light DOM combinations.

| ARIA | Support |
| --- | --- |
| `aria-labelledby` | 🚫 |
| `aria-describedby` | 🚫 |
| `aria-owns` | 🚫 |
| `aria-controls` | 🚫 |
| `aria-activedescendant` | 🚫 |

## Development considerations

### Labelling

If the text of the button does not clearly indicate what the button's function is, add a brief, descriptive label using the `aria` property with the `aria-label` value to provide more context for screen reader users. Phrases like "Detail" or "Open" can be unclear when read out of context by a screen reader. In such instances, provide an alternative text that offers more detailed information, such as "Open details of product XYZ."

### Readable text

In general, placing textual contents above an image or video can easily lead to **contrast issues**. Though we are providing a **scalable background gradient** to reduce the risk of low contrasts between foreground text and background image, there still can occur issues with color contrast ratios, especially if different aspect ratios for multiple viewport sizes are used. So, always **check readability** and play around with the `size` and `weight` properties to achieve the best results.

### Video background

In case a video background is used, the component checks whether **reduced motion** is enabled in the operating system settings and prevents the `<video autoplay loop />` attribute from working to improve accessibility & UX. In addition, the slotted video should have no audio or is muted by `<video muted />`. Also keep in mind that long videos or videos in general might increase the page load time. The video content should support the **CTA** instead of distracting from it. To support screen reader users, define an alternative video description: `<video aria-label="Some video description"" />`.

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'top'` `'bottom'` | `'bottom'` | Controls the vertical placement of the description and button — `top` or `bottom`. |
| `aria` | `ButtonTileAriaAttribute` | `undefined` | Sets ARIA attributes on the tile's action button to improve accessibility for screen readers. |
| `aspectRatio` | `'1/1'` `'4/3'` `'3/4'` `'16/9'` `'9/16'` `'auto'`<br>`BreakpointCustomizable<ButtonTileAspectRatio>` | `'4/3'` | Sets the width-to-height ratio of the tile media area. Supports responsive breakpoint values. |
| `compact` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Renders only the icon button without the full label. Supports responsive breakpoint values. |
| `description` _(required)_ | `string` | `undefined` | Sets the description text displayed in the tile's content area. |
| `disabled` | `boolean` | `false` | Disables the tile, preventing button interaction. |
| `gradient` | `boolean` | `false` | Shows a gradient overlay over the media slot to improve text legibility on bright images or videos. |
| `icon` | `'none'`<br>one of 290 icon names — see [icon names](references/icons.md) | `'none'` | Sets the icon displayed in the tile's action button. Use `none` to show no icon. |
| `iconSource` | `string` | `undefined` | Sets a path to a custom SVG icon for the action button, used instead of the built-in icon set. |
| `label` _(required)_ | `string` | `undefined` | Sets the accessible label text of the action button rendered inside the tile. |
| `loading` | `boolean` | `false` | Disables the tile and shows a loading spinner to indicate an ongoing operation. |
| `size` | `'medium'` `'large'` `'inherit'`<br>`BreakpointCustomizable<ButtonTileSize>` | `'medium'` | Sets the font size of the description text in the tile content area. Supports responsive breakpoint values. |
| `type` | `'button'` `'submit'` `'reset'` | `'submit'` | Sets the button's HTML type — `submit` sends the form, `reset` clears it, `button` performs no default action. |
| `weight` | `'regular'` `'semi-bold'`<br>`BreakpointCustomizable<ButtonTileWeight>` | `'semi-bold'` | Sets the font weight of the description text in the tile content area. Supports responsive breakpoint values. |

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
| UI behaviour | The component is able to break out of its aspect ratio in case content overflows to be accessibility compliant (see first row in example). | [./examples/UiBehaviour.html](./examples/UiBehaviour.html) |
| Hyphens | It is possible to overwrite the hyphens style on the host element and use 'soft' hyphens. | [./examples/Hyphens.html](./examples/Hyphens.html) |
| Footer slot | You can also use a `footer` slot to display additional text below the description, providing more flexibility for custom content. | [./examples/FooterSlot.html](./examples/FooterSlot.html) |
