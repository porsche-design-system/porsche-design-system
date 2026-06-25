# p-link

The `p-link` component is essential to perform changes in **page routes**. For an optimal user guidance and dedicated pursuit of business or sales goals, different types of Links (**Primary** and **Secondary**) are available for usage. A Link can be used with or without a label, but it's recommended to keep the **label visible** for better **usability** whenever possible. When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers. In case you want the user to execute an action, you should select the [Button](/components/button/) component instead.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-link`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use a Link to navigate to another page.
- Use a [Button](/components/button/) instead of a Link if you want to change a state (e.g. send form)
- Use a Primary Link filled for one or two high-priority actions within a page.
- Use a Secondary Link for all other stand-alone Links that aren't high priority.
- Use a [Link Pure](/components/link-pure/) as a subordinated link version in combination with a filled link (primary or secondary) or stand-alone when the priority of the action is lower compared to all other link actions within the page.
- Use an Icon and text variant only when appropriate (e.g. external link).
- Use an Icon-only variant only in cases where the user is fully aware of the link function.
- Ensure that the link remains legible even in a multiline state by using max. 100 characters per line.

### Don't:

- Don't use a Primary Link for all links on a page.
- Don't use a multiline Link, as it is recommended to keep the text label short and avoid multiline links.
- Don't use a width that's too wide and makes the link difficult to read.

---

## Related components

- [Button](/components/button/)
- [Link Pure](/components/link-pure/)

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

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-hidden="true"` | When the `icon` prop is set, the icon is hidden from the screen reader. |

## Development considerations

### Labelling

If the text of a link does not clearly indicate what the link's target is, add a brief, descriptive label using the `aria` property with the `aria-label` value to provide more context for screen reader users. Phrases like "Detail" or "Click" can be unclear when read out of context by a screen reader. In such instances, provide an alternative text that offers more detailed information, such as "Details of product XYZ."

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

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `LinkAriaAttribute` | `undefined` | Sets ARIA attributes on the link element to improve accessibility for screen readers. |
| `compact` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Reduces the link's padding and height for denser layouts. Supports responsive breakpoint values. |
| `download` | `string` | `undefined` | Sets the native `download` attribute to trigger a file download. Only applies when `href` is set. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `href` | `string` | `undefined` | When set, the component renders as an anchor navigating to this URL. Otherwise, provide a slotted anchor element. |
| `icon` | `'360'` `'4-wheel-drive'` `'accessibility'` `'active-cabin-ventilation'` `'add'` `'adjust'` `'aggregation'` `'ai-3d-object'` `'ai-code'` `'ai-edit'` `'ai-image'` `'ai-scale'` `'ai-sound'` `'ai-spark'` `'ai-spark-filled'` `'ai-text'` `'ai-video'` `'arrow-compact-down'` `'arrow-compact-left'` `'arrow-compact-right'` `'arrow-compact-up'` `'arrow-double-down'` `'arrow-double-left'` `'arrow-double-right'` `'arrow-double-up'` `'arrow-down'` `'arrow-down-left'` `'arrow-down-right'` `'arrow-first'` `'arrow-head-down'` `'arrow-head-left'` `'arrow-head-right'` `'arrow-head-up'` `'arrow-last'` `'arrow-left'` `'arrow-right'` `'arrow-up'` `'arrow-up-left'` `'arrow-up-right'` `'arrows'` `'attachment'` `'augmented-reality'` `'battery-empty'` `'battery-empty-co2'` `'battery-empty-fuel'` `'battery-full'` `'battery-half'` `'battery-one-quarter'` `'battery-three-quarters'` `'bell'` `'bookmark'` `'bookmark-filled'` `'brain'` `'broadcast'` `'cabriolet'` `'calculator'` `'calendar'` `'camera'` `'car'` `'car-battery'` `'card'` `'charging-active'` `'charging-network'` `'charging-state'` `'charging-station'` `'chart'` `'chat'` `'check'` `'city'` `'climate'` `'climate-control'` `'clock'` `'close'` `'closed-caption'` `'cloud'` `'co2-class'` `'co2-emission'` `'color-picker'` `'compare'` `'compass'` `'configurate'` `'copy'` `'country-road'` `'coupe'` `'cubic-capacity'` `'cut'` `'delete'` `'disable'` `'dislike'` `'dislike-filled'` `'document'` `'door'` `'download'` `'drag'` `'duration'` `'ear'` `'edit'` `'email'` `'error'` `'error-filled'` `'exclamation'` `'exclamation-filled'` `'external'` `'fast-backward'` `'fast-forward'` `'file-csv'` `'file-excel'` `'filter'` `'fingerprint'` `'flag'` `'flash'` `'fuel-station'` `'garage'` `'genuine-parts'` `'geo-localization'` `'gift'` `'globe'` `'grid'` `'grip'` `'group'` `'hand'` `'heart'` `'heart-filled'` `'highway'` `'highway-filled'` `'history'` `'home'` `'horn'` `'image'` `'increase'` `'information'` `'information-filled'` `'key'` `'laptop'` `'leaf'` `'leather'` `'light'` `'like'` `'like-filled'` `'limousine'` `'linked'` `'list'` `'locate'` `'lock'` `'lock-open'` `'logo-apple-carplay'` `'logo-apple-music'` `'logo-apple-podcast'` `'logo-baidu'` `'logo-delicious'` `'logo-digg'` `'logo-facebook'` `'logo-foursquare'` `'logo-gmail'` `'logo-google'` `'logo-hatena'` `'logo-instagram'` `'logo-kaixin'` `'logo-kakaotalk'` `'logo-kununu'` `'logo-linkedin'` `'logo-naver'` `'logo-pinterest'` `'logo-qq'` `'logo-qq-share'` `'logo-reddit'` `'logo-skyrock'` `'logo-snapchat'` `'logo-sohu'` `'logo-spotify'` `'logo-tecent'` `'logo-telegram'` `'logo-tiktok'` `'logo-tumblr'` `'logo-twitter'` `'logo-viber'` `'logo-vk'` `'logo-wechat'` `'logo-weibo'` `'logo-whatsapp'` `'logo-x'` `'logo-xing'` `'logo-yahoo'` `'logo-youku'` `'logo-youtube'` `'logout'` `'map'` `'menu-dots-horizontal'` `'menu-dots-vertical'` `'menu-lines'` `'microphone'` `'minus'` `'mobile'` `'moon'` `'new-chat'` `'news'` `'none'` `'north-arrow'` `'oil-can'` `'online-search'` `'parking-brake'` `'parking-light'` `'paste'` `'pause'` `'phone'` `'pin'` `'pin-filled'` `'pivot'` `'play'` `'play-filled'` `'plug'` `'plus'` `'preheating'` `'price-tag'` `'printer'` `'purchase'` `'push-pin'` `'push-pin-off'` `'qr'` `'qr-off'` `'question'` `'question-filled'` `'racing-flag'` `'radar'` `'radio'` `'refresh'` `'replay'` `'reset'` `'return'` `'road'` `'roof-closed'` `'roof-open'` `'route'` `'rss'` `'save'` `'screen'` `'search'` `'seat'` `'send'` `'service-technician'` `'share'` `'shopping-bag'` `'shopping-bag-filled'` `'shopping-cart'` `'shopping-cart-filled'` `'sidebar'` `'sidelights'` `'skip-backward'` `'skip-forward'` `'snowflake'` `'sort'` `'stack'` `'star'` `'star-filled'` `'steering-wheel'` `'stop'` `'stopwatch'` `'subtract'` `'success'` `'success-filled'` `'sun'` `'suv'` `'switch'` `'tablet'` `'tachometer'` `'theme'` `'tire'` `'trigger-finger'` `'truck'` `'turismo'` `'unlinked'` `'upload'` `'user'` `'user-filled'` `'user-group'` `'user-manual'` `'video'` `'view'` `'view-off'` `'volume-off'` `'volume-up'` `'warning'` `'warning-filled'` `'weather'` `'weight'` `'wifi'` `'work'` `'wrench'` `'wrenches'` `'zoom-in'` `'zoom-out'` | `'none'` | Sets the icon displayed next to the link label. Use `none` to show no icon. |
| `iconSource` | `string` | `undefined` | Sets a path to a custom SVG icon, used instead of the built-in icon set. |
| `rel` | `string` | `undefined` | Sets the `rel` attribute on the link (e.g. `noopener`). Only applies when `href` is set. |
| `target` | `'_self'` `'_blank'` `'_parent'` `'_top'` `'string'` | `'_self'` | Specifies where to open the linked URL (e.g. `_self`, `_blank`). Only applies when `href` is set. |
| `variant` | `'primary'` `'secondary'` | `'primary'` | Sets the visual style variant of the link (e.g. `primary`, `secondary`, `tertiary`). |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot to render the link label. This slot can be used to slot an anchor tag instead of using the href prop. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./p-link/examples/Default.ts](./p-link/examples/Default.ts) |
| Framework routing (anchor nesting) | To support custom anchor tags (e.g. | [./p-link/examples/FrameworkRouting.ts](./p-link/examples/FrameworkRouting.ts) |
| Link with specific icon | If an icon needs to be implemented, just set another predefined icon. | [./p-link/examples/Icon.ts](./p-link/examples/Icon.ts) |
