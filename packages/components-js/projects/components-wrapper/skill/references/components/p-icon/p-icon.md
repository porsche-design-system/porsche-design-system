# p-icon

Along with other Porsche basic elements - such as colors, typography and the Porsche marque - icons are core components of the Porsche design. The clear graphic symbols allow quick orientation and are internationally recognized. The Porsche Design System is using an **SVG icon system (integrated by `<img/>`)** to visually present an icon object. Each icon is hosted on the Porsche Design System CDN to be served and cached as fast as possible.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use the available icons from [Porsche Icons](https://icons.porsche.com).
- Use icons as an additional element for faster recognition.

### Don't:

- Don't use icons without label.

## Accessibility support

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the element (through the `alt` attribute). |

## Development considerations

### Hiding an icon from assistive technologies

Sometimes icons are used purely for **decorative purposes** and do not convey any additional information. In these cases, it is important to **hide** the icon from assistive technologies. This can be achieved by setting the `aria-hidden` attribute directly on the `Icon` component.

```html
<p-icon aria-hidden="true" name="phone" /><p-text>+49 123 456 7890</p-text>
```

## Tests

### Automated

| Technology | Support |
| --- | --- |
| AXE-Core (WCAG 2.2 AA, Best-Practice) (WCAG 2.2 AA, Best-Practice) | ✅ |
| High-Contrast Mode (light/dark) | 🟠(partially supported: Depending on the selected theme, there may be problems reproducing the complementary color) |
| Text-Zoom (200%) | ✅ |

### Manual

| Technology | Support |
| --- | --- |
| Screen reader (VoiceOver, NVDA) | ✅ |

## API

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `IconAriaAttribute` | `undefined` | Sets ARIA attributes on the icon — use `aria-label` to make the icon meaningful to screen readers when it conveys information. |
| `color` | `'primary'` `'contrast-higher'` `'contrast-high'` `'contrast-medium'` `'contrast-low'` `'contrast-lower'` `'success'` `'warning'` `'error'` `'info'` `'inherit'` | `'primary'` | Sets the fill color of the icon using PDS color tokens. |
| `name` | one of 290 icon names — see [icon names](references/icons.md) | `'arrow-right'` | Selects an icon from the built-in PDS icon library by name (e.g. `arrow-right`, `close`). |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'` `'5xl'` `'inherit'`<br>_deprecated:_ `'xx-small'` `'x-small'` `'small'` `'medium'` `'large'` `'x-large'` `'xx-large'`<br>`BreakpointCustomizable<IconSize>` | `'sm'` | Sets the icon size using the PDS typographic scale. Use `inherit` to derive size from the parent element. Supports responsive breakpoint values. |
| `source` | `string` | `undefined` | Sets a path to a custom SVG icon, used instead of the built-in icon library. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-icon-size` | — | Defines the width and height of the icon. Overrides the `size` property when set. |
| `--p-icon-color` | — | Defines the icon color. Overrides the `color` property when set. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| Overview | For more information and a complete overview of all available Porsche icons, head over to Porsche Icons ([Porsche Icons](https://icons.porsche.com)). | [./examples/Overview.html](./examples/Overview.html) |
| Size via Prop | There are predefined sizes for the component available which should cover most use cases. | [./examples/Size.html](./examples/Size.html) |
| Size via CSS Variable | Alternatively, the size can be controlled via the custom CSS variable `--p-icon-size`, which accepts any valid CSS length value. | [./examples/SizeCssVar.html](./examples/SizeCssVar.html) |
| Responsive Size | The `size` property supports `BreakpointCustomizable` values, allowing you to define different sizes for each major breakpoint (`xs`, `s`, `m`, `l`, `xl`). | [./examples/ResponsiveSize.html](./examples/ResponsiveSize.html) |
| Color via Prop | The `color` property can be set to `inherit` to derive the icon's color from the `currentcolor` of a parent element (e.g. a `p-text`). | [./examples/Color.html](./examples/Color.html) |
| Color via CSS Variable | Alternatively, the color can be controlled via the custom CSS variable `--p-icon-color`, which accepts any valid CSS color value. | [./examples/ColorCssVar.html](./examples/ColorCssVar.html) |
| Custom Icon | The whole Porsche icon set is hosted on the Porsche Design System CDN. | [./examples/Custom.html](./examples/Custom.html) |
