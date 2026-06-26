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
| `name` | `'360'` `'4-wheel-drive'` `'accessibility'` `'active-cabin-ventilation'` `'add'` `'adjust'` `'aggregation'` `'ai-3d-object'` `'ai-code'` `'ai-edit'` `'ai-image'` `'ai-scale'` `'ai-sound'` `'ai-spark'` `'ai-spark-filled'` `'ai-text'` `'ai-video'` `'arrow-compact-down'` `'arrow-compact-left'` `'arrow-compact-right'` `'arrow-compact-up'` `'arrow-double-down'` `'arrow-double-left'` `'arrow-double-right'` `'arrow-double-up'` `'arrow-down'` `'arrow-down-left'` `'arrow-down-right'` `'arrow-first'` `'arrow-head-down'` `'arrow-head-left'` `'arrow-head-right'` `'arrow-head-up'` `'arrow-last'` `'arrow-left'` `'arrow-right'` `'arrow-up'` `'arrow-up-left'` `'arrow-up-right'` `'arrows'` `'attachment'` `'augmented-reality'` `'battery-empty'` `'battery-empty-co2'` `'battery-empty-fuel'` `'battery-full'` `'battery-half'` `'battery-one-quarter'` `'battery-three-quarters'` `'bell'` `'bookmark'` `'bookmark-filled'` `'brain'` `'broadcast'` `'cabriolet'` `'calculator'` `'calendar'` `'camera'` `'car'` `'car-battery'` `'card'` `'charging-active'` `'charging-network'` `'charging-state'` `'charging-station'` `'chart'` `'chat'` `'check'` `'city'` `'climate'` `'climate-control'` `'clock'` `'close'` `'closed-caption'` `'cloud'` `'co2-class'` `'co2-emission'` `'color-picker'` `'compare'` `'compass'` `'configurate'` `'copy'` `'country-road'` `'coupe'` `'cubic-capacity'` `'cut'` `'delete'` `'disable'` `'dislike'` `'dislike-filled'` `'document'` `'door'` `'download'` `'drag'` `'duration'` `'ear'` `'edit'` `'email'` `'error'` `'error-filled'` `'exclamation'` `'exclamation-filled'` `'external'` `'fast-backward'` `'fast-forward'` `'file-csv'` `'file-excel'` `'filter'` `'fingerprint'` `'flag'` `'flash'` `'fuel-station'` `'garage'` `'genuine-parts'` `'geo-localization'` `'gift'` `'globe'` `'grid'` `'grip'` `'group'` `'hand'` `'heart'` `'heart-filled'` `'highway'` `'highway-filled'` `'history'` `'home'` `'horn'` `'image'` `'increase'` `'information'` `'information-filled'` `'key'` `'laptop'` `'leaf'` `'leather'` `'light'` `'like'` `'like-filled'` `'limousine'` `'linked'` `'list'` `'locate'` `'lock'` `'lock-open'` `'logo-apple-carplay'` `'logo-apple-music'` `'logo-apple-podcast'` `'logo-baidu'` `'logo-delicious'` `'logo-digg'` `'logo-facebook'` `'logo-foursquare'` `'logo-gmail'` `'logo-google'` `'logo-hatena'` `'logo-instagram'` `'logo-kaixin'` `'logo-kakaotalk'` `'logo-kununu'` `'logo-linkedin'` `'logo-naver'` `'logo-pinterest'` `'logo-qq'` `'logo-qq-share'` `'logo-reddit'` `'logo-skyrock'` `'logo-snapchat'` `'logo-sohu'` `'logo-spotify'` `'logo-tecent'` `'logo-telegram'` `'logo-tiktok'` `'logo-tumblr'` `'logo-twitter'` `'logo-viber'` `'logo-vk'` `'logo-wechat'` `'logo-weibo'` `'logo-whatsapp'` `'logo-x'` `'logo-xing'` `'logo-yahoo'` `'logo-youku'` `'logo-youtube'` `'logout'` `'map'` `'menu-dots-horizontal'` `'menu-dots-vertical'` `'menu-lines'` `'microphone'` `'minus'` `'mobile'` `'moon'` `'new-chat'` `'news'` `'north-arrow'` `'oil-can'` `'online-search'` `'parking-brake'` `'parking-light'` `'paste'` `'pause'` `'phone'` `'pin'` `'pin-filled'` `'pivot'` `'play'` `'play-filled'` `'plug'` `'plus'` `'preheating'` `'price-tag'` `'printer'` `'purchase'` `'push-pin'` `'push-pin-off'` `'qr'` `'qr-off'` `'question'` `'question-filled'` `'racing-flag'` `'radar'` `'radio'` `'refresh'` `'replay'` `'reset'` `'return'` `'road'` `'roof-closed'` `'roof-open'` `'route'` `'rss'` `'save'` `'screen'` `'search'` `'seat'` `'send'` `'service-technician'` `'share'` `'shopping-bag'` `'shopping-bag-filled'` `'shopping-cart'` `'shopping-cart-filled'` `'sidebar'` `'sidelights'` `'skip-backward'` `'skip-forward'` `'snowflake'` `'sort'` `'stack'` `'star'` `'star-filled'` `'steering-wheel'` `'stop'` `'stopwatch'` `'subtract'` `'success'` `'success-filled'` `'sun'` `'suv'` `'switch'` `'tablet'` `'tachometer'` `'theme'` `'tire'` `'trigger-finger'` `'truck'` `'turismo'` `'unlinked'` `'upload'` `'user'` `'user-filled'` `'user-group'` `'user-manual'` `'video'` `'view'` `'view-off'` `'volume-off'` `'volume-up'` `'warning'` `'warning-filled'` `'weather'` `'weight'` `'wifi'` `'work'` `'wrench'` `'wrenches'` `'zoom-in'` `'zoom-out'` | `'arrow-right'` | Selects an icon from the built-in PDS icon library by name (e.g. `arrow-right`, `close`). |
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
| Color via Prop | The `color` property can be set to `inherit` to derive the icon's color from the `currentcolor` of a parent element (e.g. | [./examples/Color.html](./examples/Color.html) |
| Color via CSS Variable | Alternatively, the color can be controlled via the custom CSS variable `--p-icon-color`, which accepts any valid CSS color value. | [./examples/ColorCssVar.html](./examples/ColorCssVar.html) |
| Custom Icon | The whole Porsche icon set is hosted on the Porsche Design System CDN. | [./examples/Custom.html](./examples/Custom.html) |
