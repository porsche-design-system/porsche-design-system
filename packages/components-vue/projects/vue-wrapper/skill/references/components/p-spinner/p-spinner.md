# p-spinner

There are unavoidable moments when the user has to wait for more than 1 second (for example due to technical processing of information or requests). These moments should be bridged with a good user feedback in order to not leave the user uncertain about what's currently happening - also to avoid a high bounce rate and to obtain a positive impression of your website or application.

For ongoing operations between 2-10 seconds, where the loading progress cannot be determined, use a **Spinner** (looped indicator) to inform the user about an ongoing operation. Use it either stand-alone (for example as page loader) or within components, such as in Buttons to indicate progress after clicking "save".

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use when the user has to wait for more than 1 second.
- Use either stand-alone or within components (e.g. in Buttons to indicate progress after clicking "save“).
- Use vertically and horizontally centered within the referring area.
- Use a blocking layer for the whole screen when the user is not supposed to start another activity.
- Include simple text to explain why the user is waiting.
- Disable the component while the spinner is visible if it is triggered by an interaction.

### Don't:

- Don't use too many Spinners at the same time within a page or application.
- Don't use Spinners for delays of more than 10 seconds without providing a progress bar showing the estimated waiting time.
- Don't use threatening text such as "Don't click again" to prevent the user from clicking twice.

## Accessibility support

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the live region. |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="alert"` | Provided message is announced. |

## Development considerations

### Announcing loading messages

To provide feedback to screen reader users, it is mandatory to announce the loading state of the spinner. This can be achieved in the following ways:

- Pre-rendering the component in the DOM.
- Providing a meaningful loading state message through the `aria` property, e.g. `aria="{ 'aria-label': 'Start/End loading content'}"`.

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

## Notes

### Disable animation

For automated visual regression tests, the spinner animation can be disabled by setting a global CSS variable:

```
:root {
  --p-animation-duration: 0s !important;
}
```

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `SpinnerAriaAttribute` | `undefined` | Sets ARIA attributes on the spinner's live region element; use `aria-label` to provide a descriptive loading message for screen readers. |
| `color` | `'primary'` `'inherit'` | `'primary'` | Sets the color of the spinning indicator using PDS semantic color tokens (e.g. `primary`, `contrast-high`, `inherit`). |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'` `'5xl'` `'inherit'`<br>_deprecated:_ `'small'` `'medium'` `'large'`<br>`BreakpointCustomizable<SpinnerSize>` | `'sm'` | Sets the size of the spinner using the PDS typographic scale. Use `inherit` to derive the size from the parent element's font-size. Supports responsive breakpoint values. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-spinner-size` | — | Defines the width and height of the spinner. Overrides the `size` property when set. |
| `--p-spinner-color` | — | Defines the foreground color. Overrides the `color` property when set. |
| `--p-spinner-track-color` | — | Defines the track/background color. Overrides the `color` property when set. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Size via Prop | There are predefined sizes for the component available which should cover most use cases. | [./examples/Size.vue](./examples/Size.vue) |
| Size via CSS Variable | Instead of using the `size` prop, the size can be controlled via the custom CSS variable `--p-spinner-size`, which accepts any valid CSS length value. | [./examples/SizeCssVar.vue](./examples/SizeCssVar.vue) |
| Responsive Size | The `size` property supports `BreakpointCustomizable` values, allowing you to define different sizes for each major breakpoint (`xs`, `s`, `m`, `l`, `xl`). | [./examples/ResponsiveSize.vue](./examples/ResponsiveSize.vue) |
| Color via Prop | The `color` property can be set to `inherit` to derive the spinner's color from the `currentcolor` of a parent element (e.g. | [./examples/Color.vue](./examples/Color.vue) |
| Color via CSS Variable | Instead of using the `color` prop, the colors can be controlled via the custom CSS variables `--p-spinner-color` and `--p-spinner-track-color`, which accept any valid CSS color value. | [./examples/ColorCssVar.vue](./examples/ColorCssVar.vue) |
