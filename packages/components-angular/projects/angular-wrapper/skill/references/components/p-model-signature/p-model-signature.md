# p-model-signature

The `p-model-signature` component is purely visual and renders the different signatures of Porsche car models. It can be used to overlay background images or enhance cards and teasers to be more dynamic and recognizable.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use signatures for emotional introduction and communication of model series.
- Consider using model signatures only occasionally, for example, within the Link Tile component for a specific model line.
- Use model signatures as a subtle, larger background watermark, paired with appropriate visualization of vehicle detail pages.
- Use as a headline-like element on model series overview pages.

### Don't:

- Avoid including signatures for specific derivatives such as a Panamera 4 Sport Turismo
- Platinum Edition or a 911 Targa 4S or in line with the text.
- The model signature should have sufficient spacing from the text.
- Avoid repeating the same model series signature within the interface.
- For example, do not display the 911 signatures twice or more in a viewport.

## Accessibility support

This component does not include any special accessibility features.

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
| `color` | `'primary'` `'contrast-low'` `'contrast-medium'` `'contrast-high'` `'inherit'` | `'primary'` | Sets the fill color of the signature using PDS color tokens. |
| `fetchPriority` | `'low'` `'high'` `'auto'` | `'auto'` | Sets the browser's fetch priority hint for the signature asset (`auto`, `high`, `low`). |
| `lazy` | `boolean` | `false` | Defers loading the signature until it enters the viewport to improve initial page performance. |
| `model` | `'718'` `'911'` `'boxster'` `'cayenne'` `'cayman'` `'gt3-rs'` `'gt3'` `'gts'` `'macan'` `'panamera'` `'taycan'` `'turbo-s'` `'turbo'` | `'911'` | Selects the Porsche model whose typographic signature SVG is displayed. |
| `safeZone` | `boolean` | `true` | When enabled, adds invisible padding so all model signatures visually align to a consistent baseline. |
| `size` | `'small'` `'inherit'` | `'small'` | Sets the display size of the signature using predefined PDS sizes. Use `inherit` with a CSS `width` or `height` on the host for custom sizing. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for an img or video tag when using the model-signature as a mask. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-model-signature-width` | — | Overrides the width of the model signature. |
| `--p-model-signature-height` | `auto` | Overrides the height of the model signature. |
| `--p-model-signature-color` | — | Overrides the fill color of the model signature. Overrides the `color` property when set. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.ts](./examples/Default.ts) |
| Safe Zone | The `safe-zone` prop's default is `true`, which ensures a visual balance across all model signatures. | [./examples/SafeZone.ts](./examples/SafeZone.ts) |
| Mask: Blend Mode | If `p-model-signature` should be blended with its background, the CSS property [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) can be used (`{{ blendMode }}` will produce the best results). | [./examples/MaskBlendMode.ts](./examples/MaskBlendMode.ts) |
| Mask: Image | Mask: Image | [./examples/MaskImage.ts](./examples/MaskImage.ts) |
| Mask: Video | Mask: Video | [./examples/MaskVideo.ts](./examples/MaskVideo.ts) |
| Custom styling | The `p-model-signature` color can be changed by setting the `color` prop to `inherit` and applying some CSS `color`. | [./examples/CustomStyling.ts](./examples/CustomStyling.ts) |
