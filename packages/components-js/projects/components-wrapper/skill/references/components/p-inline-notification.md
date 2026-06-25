# p-inline-notification

The `p-inline-notification` is a controlled component that provides action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics.

Review the [notification decision tree](/patterns/notifications/decision-tree/) to determine which notification component is best for a particular scenario.

# Inline Notification

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next focusable element. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="status"` | When content is populated or changed in `state="info"`, the component announces it unobtrusively. |
| `role="alert"` | When content is populated or changed in `state="warning/error"`, the component announces it immediately. |
| `aria-label="STRING"` | References the accessible name. |

## Development considerations

### ARIA live announcements

The `Inline Notification` component uses `role="status"` and `role="alert"` to announce **content changes** for assistive technologies, but only if the component is **pre-rendered** and the content is added dynamically.

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
| `actionIcon` | `''` `'360'` `'4-wheel-drive'` `'accessibility'` `'active-cabin-ventilation'` `'add'` `'adjust'` `'aggregation'` `'ai-3d-object'` `'ai-code'` `'ai-edit'` `'ai-image'` `'ai-scale'` `'ai-sound'` `'ai-spark'` `'ai-spark-filled'` `'ai-text'` `'ai-video'` `'arrow-compact-down'` `'arrow-compact-left'` `'arrow-compact-right'` `'arrow-compact-up'` `'arrow-double-down'` `'arrow-double-left'` `'arrow-double-right'` `'arrow-double-up'` `'arrow-down'` `'arrow-down-left'` `'arrow-down-right'` `'arrow-first'` `'arrow-head-down'` `'arrow-head-left'` `'arrow-head-right'` `'arrow-head-up'` `'arrow-last'` `'arrow-left'` `'arrow-right'` `'arrow-up'` `'arrow-up-left'` `'arrow-up-right'` `'arrows'` `'attachment'` `'augmented-reality'` `'battery-empty'` `'battery-empty-co2'` `'battery-empty-fuel'` `'battery-full'` `'battery-half'` `'battery-one-quarter'` `'battery-three-quarters'` `'bell'` `'bookmark'` `'bookmark-filled'` `'brain'` `'broadcast'` `'cabriolet'` `'calculator'` `'calendar'` `'camera'` `'car'` `'car-battery'` `'card'` `'charging-active'` `'charging-network'` `'charging-state'` `'charging-station'` `'chart'` `'chat'` `'check'` `'city'` `'climate'` `'climate-control'` `'clock'` `'close'` `'closed-caption'` `'cloud'` `'co2-class'` `'co2-emission'` `'color-picker'` `'compare'` `'compass'` `'configurate'` `'copy'` `'country-road'` `'coupe'` `'cubic-capacity'` `'cut'` `'delete'` `'disable'` `'dislike'` `'dislike-filled'` `'document'` `'door'` `'download'` `'drag'` `'duration'` `'ear'` `'edit'` `'email'` `'error'` `'error-filled'` `'exclamation'` `'exclamation-filled'` `'external'` `'fast-backward'` `'fast-forward'` `'file-csv'` `'file-excel'` `'filter'` `'fingerprint'` `'flag'` `'flash'` `'fuel-station'` `'garage'` `'genuine-parts'` `'geo-localization'` `'gift'` `'globe'` `'grid'` `'grip'` `'group'` `'hand'` `'heart'` `'heart-filled'` `'highway'` `'highway-filled'` `'history'` `'home'` `'horn'` `'image'` `'increase'` `'information'` `'information-filled'` `'key'` `'laptop'` `'leaf'` `'leather'` `'light'` `'like'` `'like-filled'` `'limousine'` `'linked'` `'list'` `'locate'` `'lock'` `'lock-open'` `'logo-apple-carplay'` `'logo-apple-music'` `'logo-apple-podcast'` `'logo-baidu'` `'logo-delicious'` `'logo-digg'` `'logo-facebook'` `'logo-foursquare'` `'logo-gmail'` `'logo-google'` `'logo-hatena'` `'logo-instagram'` `'logo-kaixin'` `'logo-kakaotalk'` `'logo-kununu'` `'logo-linkedin'` `'logo-naver'` `'logo-pinterest'` `'logo-qq'` `'logo-qq-share'` `'logo-reddit'` `'logo-skyrock'` `'logo-snapchat'` `'logo-sohu'` `'logo-spotify'` `'logo-tecent'` `'logo-telegram'` `'logo-tiktok'` `'logo-tumblr'` `'logo-twitter'` `'logo-viber'` `'logo-vk'` `'logo-wechat'` `'logo-weibo'` `'logo-whatsapp'` `'logo-x'` `'logo-xing'` `'logo-yahoo'` `'logo-youku'` `'logo-youtube'` `'logout'` `'map'` `'menu-dots-horizontal'` `'menu-dots-vertical'` `'menu-lines'` `'microphone'` `'minus'` `'mobile'` `'moon'` `'new-chat'` `'news'` `'north-arrow'` `'oil-can'` `'online-search'` `'parking-brake'` `'parking-light'` `'paste'` `'pause'` `'phone'` `'pin'` `'pin-filled'` `'pivot'` `'play'` `'play-filled'` `'plug'` `'plus'` `'preheating'` `'price-tag'` `'printer'` `'purchase'` `'push-pin'` `'push-pin-off'` `'qr'` `'qr-off'` `'question'` `'question-filled'` `'racing-flag'` `'radar'` `'radio'` `'refresh'` `'replay'` `'reset'` `'return'` `'road'` `'roof-closed'` `'roof-open'` `'route'` `'rss'` `'save'` `'screen'` `'search'` `'seat'` `'send'` `'service-technician'` `'share'` `'shopping-bag'` `'shopping-bag-filled'` `'shopping-cart'` `'shopping-cart-filled'` `'sidebar'` `'sidelights'` `'skip-backward'` `'skip-forward'` `'snowflake'` `'sort'` `'stack'` `'star'` `'star-filled'` `'steering-wheel'` `'stop'` `'stopwatch'` `'subtract'` `'success'` `'success-filled'` `'sun'` `'suv'` `'switch'` `'tablet'` `'tachometer'` `'theme'` `'tire'` `'trigger-finger'` `'truck'` `'turismo'` `'unlinked'` `'upload'` `'user'` `'user-filled'` `'user-group'` `'user-manual'` `'video'` `'view'` `'view-off'` `'volume-off'` `'volume-up'` `'warning'` `'warning-filled'` `'weather'` `'weight'` `'wifi'` `'work'` `'wrench'` `'wrenches'` `'zoom-in'` `'zoom-out'` | `'arrow-right'` | Sets the icon displayed inside the action button using a PDS icon name. |
| `actionLabel` | `string` | `undefined` | Sets the label text of the optional action button inside the notification. |
| `actionLoading` | `boolean` | `false` | Disables the action button and shows a spinner to indicate an ongoing operation. |
| `description` | `string` | `''` | Sets the supporting description text shown below the heading. |
| `dismissButton` | `boolean` | `true` | Shows a dismiss button so the user can manually close the notification. |
| `heading` | `string` | `''` | Sets the heading text displayed at the top of the inline notification. |
| `headingTag` | `'h1'` `'h2'` `'h3'` `'h4'` `'h5'` `'h6'` | `'h5'` | Sets the HTML heading tag (e.g. h2, h3) to maintain correct document structure. |
| `state` | `'info'` `'success'` `'warning'` `'error'` | `'info'` | Sets the visual state — controls the icon and color scheme (`info`, `warning`, `error`, `success`). |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `action` | `CustomEvent<void>` | Emitted when the user clicks the action button. |
| `dismiss` | `CustomEvent<void>` | Emitted when the user clicks the dismiss button. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `heading` | no | — | Defines the heading of the inline notification. Can be used as an alternative to the `heading` prop for rich content. |
| _(default)_ | no | — | Default slot for the inline notification description content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./p-inline-notification/examples/Default.html](./p-inline-notification/examples/Default.html) |
| Event Handling | The custom event that is emitted on close button click is called `dismiss`. | [./p-inline-notification/examples/EventHandling.html](./p-inline-notification/examples/EventHandling.html) |
| Action Button | A custom interaction, e.g., to retry the previous action like submitting a form, can be provided by setting the optional `actionLabel`, `actionIcon` and `actionLoading` properties. | [./p-inline-notification/examples/ActionButton.html](./p-inline-notification/examples/ActionButton.html) |
