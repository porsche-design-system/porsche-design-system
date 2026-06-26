# p-link-pure

The `p-link-pure` component is essential for performing changes in **page routes**. A Link Pure can be used with or without a label, but it's recommended to keep the **label visible** for better **usability** whenever possible. When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers.

In case you want the user to execute an action, you should select the [Button](/components/button/) or [Button Pure](/components/button-pure/) component instead.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-link-pure`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use a Link Pure as a more subtle call to action compared to the normal Link.
- Use a [Button Pure](/components/button-pure/) instead of a Link Pure if you want to change a state (e.g. send form)
- Use a Link Pure to navigate the user to another page.
- Use the Icon and Text variant of Link Pure whenever possible as icons should preferably always be paired with text for better comprehensibility and accessibility.
- Use the Text only variant when the use of icons causes interference (e.g. in-text placement, no matching icon, complex lists or tables, alignment to elements, navigation).
- Use the Text only variant with an underline to ensure intuitive clickability.
- Use the Icon only variant only when an icon alone is sufficient to indicate the action and the user is fully aware of the function due to an expressive and internationally comprehensible icon.
- Use the stretch variant only on small viewports or areas (e.g. mobile views or sidebars).
- Use the default arrow-right-icon in most cases but replace it with another symbol if it is more appropriate.
- Use short and descriptive text labels within a link.

### Don't:

- Don't use Link Pure as the main call to action if you need to draw more attention to the link.
- Don't use Link Pure on images unless it is necessary, e.g. when using it as an additional link on image sliders or teaser images that are clickable themselves.
- Don't group more than two Links Pure in a row to ensure scannability and legibility.

---

## Related components

- [Button Pure](/components/button-pure/)

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
| `active` | `boolean` | `false` | Visually marks the link as the currently active navigation item, e.g. the current page. |
| `alignLabel` | `'start'` `'end'`<br>`BreakpointCustomizable<LinkPureAlignLabel>` | `'end'` | Sets the label position relative to the icon — `start` places it before, `end` places it after. Supports responsive breakpoint values. |
| `aria` | `LinkPureAriaAttribute` | `undefined` | Sets ARIA attributes on the link element to improve accessibility for screen readers. |
| `color` | `'primary'` `'contrast-higher'` `'contrast-high'` `'contrast-medium'` `'inherit'` | `'primary'` | Sets the foreground color of the link's icon and label text. |
| `download` | `string` | `undefined` | Sets the native `download` attribute to trigger a file download. Only applies when `href` is set. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `href` | `string` | `undefined` | When set, the component renders as an anchor navigating to this URL. Otherwise, provide a slotted anchor element. |
| `icon` | `''` `'360'` `'4-wheel-drive'` `'accessibility'` `'active-cabin-ventilation'` `'add'` `'adjust'` `'aggregation'` `'ai-3d-object'` `'ai-code'` `'ai-edit'` `'ai-image'` `'ai-scale'` `'ai-sound'` `'ai-spark'` `'ai-spark-filled'` `'ai-text'` `'ai-video'` `'arrow-compact-down'` `'arrow-compact-left'` `'arrow-compact-right'` `'arrow-compact-up'` `'arrow-double-down'` `'arrow-double-left'` `'arrow-double-right'` `'arrow-double-up'` `'arrow-down'` `'arrow-down-left'` `'arrow-down-right'` `'arrow-first'` `'arrow-head-down'` `'arrow-head-left'` `'arrow-head-right'` `'arrow-head-up'` `'arrow-last'` `'arrow-left'` `'arrow-right'` `'arrow-up'` `'arrow-up-left'` `'arrow-up-right'` `'arrows'` `'attachment'` `'augmented-reality'` `'battery-empty'` `'battery-empty-co2'` `'battery-empty-fuel'` `'battery-full'` `'battery-half'` `'battery-one-quarter'` `'battery-three-quarters'` `'bell'` `'bookmark'` `'bookmark-filled'` `'brain'` `'broadcast'` `'cabriolet'` `'calculator'` `'calendar'` `'camera'` `'car'` `'car-battery'` `'card'` `'charging-active'` `'charging-network'` `'charging-state'` `'charging-station'` `'chart'` `'chat'` `'check'` `'city'` `'climate'` `'climate-control'` `'clock'` `'close'` `'closed-caption'` `'cloud'` `'co2-class'` `'co2-emission'` `'color-picker'` `'compare'` `'compass'` `'configurate'` `'copy'` `'country-road'` `'coupe'` `'cubic-capacity'` `'cut'` `'delete'` `'disable'` `'dislike'` `'dislike-filled'` `'document'` `'door'` `'download'` `'drag'` `'duration'` `'ear'` `'edit'` `'email'` `'error'` `'error-filled'` `'exclamation'` `'exclamation-filled'` `'external'` `'fast-backward'` `'fast-forward'` `'file-csv'` `'file-excel'` `'filter'` `'fingerprint'` `'flag'` `'flash'` `'fuel-station'` `'garage'` `'genuine-parts'` `'geo-localization'` `'gift'` `'globe'` `'grid'` `'grip'` `'group'` `'hand'` `'heart'` `'heart-filled'` `'highway'` `'highway-filled'` `'history'` `'home'` `'horn'` `'image'` `'increase'` `'information'` `'information-filled'` `'key'` `'laptop'` `'leaf'` `'leather'` `'light'` `'like'` `'like-filled'` `'limousine'` `'linked'` `'list'` `'locate'` `'lock'` `'lock-open'` `'logo-apple-carplay'` `'logo-apple-music'` `'logo-apple-podcast'` `'logo-baidu'` `'logo-delicious'` `'logo-digg'` `'logo-facebook'` `'logo-foursquare'` `'logo-gmail'` `'logo-google'` `'logo-hatena'` `'logo-instagram'` `'logo-kaixin'` `'logo-kakaotalk'` `'logo-kununu'` `'logo-linkedin'` `'logo-naver'` `'logo-pinterest'` `'logo-qq'` `'logo-qq-share'` `'logo-reddit'` `'logo-skyrock'` `'logo-snapchat'` `'logo-sohu'` `'logo-spotify'` `'logo-tecent'` `'logo-telegram'` `'logo-tiktok'` `'logo-tumblr'` `'logo-twitter'` `'logo-viber'` `'logo-vk'` `'logo-wechat'` `'logo-weibo'` `'logo-whatsapp'` `'logo-x'` `'logo-xing'` `'logo-yahoo'` `'logo-youku'` `'logo-youtube'` `'logout'` `'map'` `'menu-dots-horizontal'` `'menu-dots-vertical'` `'menu-lines'` `'microphone'` `'minus'` `'mobile'` `'moon'` `'new-chat'` `'news'` `'north-arrow'` `'oil-can'` `'online-search'` `'parking-brake'` `'parking-light'` `'paste'` `'pause'` `'phone'` `'pin'` `'pin-filled'` `'pivot'` `'play'` `'play-filled'` `'plug'` `'plus'` `'preheating'` `'price-tag'` `'printer'` `'purchase'` `'push-pin'` `'push-pin-off'` `'qr'` `'qr-off'` `'question'` `'question-filled'` `'racing-flag'` `'radar'` `'radio'` `'refresh'` `'replay'` `'reset'` `'return'` `'road'` `'roof-closed'` `'roof-open'` `'route'` `'rss'` `'save'` `'screen'` `'search'` `'seat'` `'send'` `'service-technician'` `'share'` `'shopping-bag'` `'shopping-bag-filled'` `'shopping-cart'` `'shopping-cart-filled'` `'sidebar'` `'sidelights'` `'skip-backward'` `'skip-forward'` `'snowflake'` `'sort'` `'stack'` `'star'` `'star-filled'` `'steering-wheel'` `'stop'` `'stopwatch'` `'subtract'` `'success'` `'success-filled'` `'sun'` `'suv'` `'switch'` `'tablet'` `'tachometer'` `'theme'` `'tire'` `'trigger-finger'` `'truck'` `'turismo'` `'unlinked'` `'upload'` `'user'` `'user-filled'` `'user-group'` `'user-manual'` `'video'` `'view'` `'view-off'` `'volume-off'` `'volume-up'` `'warning'` `'warning-filled'` `'weather'` `'weight'` `'wifi'` `'work'` `'wrench'` `'wrenches'` `'zoom-in'` `'zoom-out'` | `'arrow-right'` | Sets the icon displayed next to the label. |
| `iconSource` | `string` | `undefined` | Sets a path to a custom SVG icon, used instead of the built-in icon set. |
| `rel` | `string` | `undefined` | Sets the `rel` attribute on the link (e.g. `noopener`). Only applies when `href` is set. |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'` `'5xl'` `'inherit'`<br>_deprecated:_ `'xx-small'` `'x-small'` `'small'` `'medium'` `'large'` `'x-large'`<br>`BreakpointCustomizable<LinkPureSize>` | `'sm'` | Sets the font size of the link label. Supports responsive breakpoint values. |
| `stretch` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Expands the space between icon and label to fill the full container width. Supports responsive breakpoint values. |
| `target` | `'_self'` `'_blank'` `'_parent'` `'_top'` `'string'` | `'_self'` | Specifies where to open the linked URL (e.g. `_self`, `_blank`). Only applies when `href` is set. |
| `underline` | `boolean` | `false` | Adds a text underline to the label to reinforce its link-like appearance. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot to render the link label. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Link with specific icon | If another icon needs to be implemented, just replace the default icon with another predefined icon. | [./examples/Icon.tsx](./examples/Icon.tsx) |
| Framework routing (anchor nesting) | To support custom anchor tags (e.g. framework specific routing) you can provide them as a **slotted element** (recommended) of the component. | [./examples/FrameworkRouting.tsx](./examples/FrameworkRouting.tsx) |
| Framework specific router with "active state" support | Examples how to use the component together with a framework specific router with "active state" support. | — |
| Link Pure with custom clickable/focusable area | Sometimes it might be useful to enlarge the clickable/focusable area of a link to fulfill accessibility guidelines. | [./examples/CustomClickableArea.tsx](./examples/CustomClickableArea.tsx) |
