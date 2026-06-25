# p-tag

`p-tag` is used to label, categorize, or organize items by using keywords that describe them.

## Usage

Use tags to label, categorize, or organize items using keywords that describe them.

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to indicate or highlight a certain attribute of an item.
- Use to show that content is mapped to one or multiple categories.
- Use to indicate that a certain filter is active.
- Use short labeling for easy scanning.
- Have a large number of tags horizontally scrollable, swipeable, or navigable with arrows.
- Have tags in a predefined space and move to the next line once they meet the boundary.
- Use color themes such as success, neutral, warning, and error for better visual perception
- Include icons to improve the faster perception.
- Add a link for further explanation about the tag for better understandability (With modal).
- Add a link for additional information that is not necessary for the task completion (With modal).

### Don't:

- Don't use more than two words (only if necessary).
- Don't implement something else than a link or button.
- Don't use Tags for navigation.

## Accessibility support

This component does not include any special accessibility features.

## API

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `compact` | `boolean` | `false` | Reduces the tag's padding and height for use in dense layouts where vertical space is limited. |
| `icon` | `'360'` `'4-wheel-drive'` `'accessibility'` `'active-cabin-ventilation'` `'add'` `'adjust'` `'aggregation'` `'ai-3d-object'` `'ai-code'` `'ai-edit'` `'ai-image'` `'ai-scale'` `'ai-sound'` `'ai-spark'` `'ai-spark-filled'` `'ai-text'` `'ai-video'` `'arrow-compact-down'` `'arrow-compact-left'` `'arrow-compact-right'` `'arrow-compact-up'` `'arrow-double-down'` `'arrow-double-left'` `'arrow-double-right'` `'arrow-double-up'` `'arrow-down'` `'arrow-down-left'` `'arrow-down-right'` `'arrow-first'` `'arrow-head-down'` `'arrow-head-left'` `'arrow-head-right'` `'arrow-head-up'` `'arrow-last'` `'arrow-left'` `'arrow-right'` `'arrow-up'` `'arrow-up-left'` `'arrow-up-right'` `'arrows'` `'attachment'` `'augmented-reality'` `'battery-empty'` `'battery-empty-co2'` `'battery-empty-fuel'` `'battery-full'` `'battery-half'` `'battery-one-quarter'` `'battery-three-quarters'` `'bell'` `'bookmark'` `'bookmark-filled'` `'brain'` `'broadcast'` `'cabriolet'` `'calculator'` `'calendar'` `'camera'` `'car'` `'car-battery'` `'card'` `'charging-active'` `'charging-network'` `'charging-state'` `'charging-station'` `'chart'` `'chat'` `'check'` `'city'` `'climate'` `'climate-control'` `'clock'` `'close'` `'closed-caption'` `'cloud'` `'co2-class'` `'co2-emission'` `'color-picker'` `'compare'` `'compass'` `'configurate'` `'copy'` `'country-road'` `'coupe'` `'cubic-capacity'` `'cut'` `'delete'` `'disable'` `'dislike'` `'dislike-filled'` `'document'` `'door'` `'download'` `'drag'` `'duration'` `'ear'` `'edit'` `'email'` `'error'` `'error-filled'` `'exclamation'` `'exclamation-filled'` `'external'` `'fast-backward'` `'fast-forward'` `'file-csv'` `'file-excel'` `'filter'` `'fingerprint'` `'flag'` `'flash'` `'fuel-station'` `'garage'` `'genuine-parts'` `'geo-localization'` `'gift'` `'globe'` `'grid'` `'grip'` `'group'` `'hand'` `'heart'` `'heart-filled'` `'highway'` `'highway-filled'` `'history'` `'home'` `'horn'` `'image'` `'increase'` `'information'` `'information-filled'` `'key'` `'laptop'` `'leaf'` `'leather'` `'light'` `'like'` `'like-filled'` `'limousine'` `'linked'` `'list'` `'locate'` `'lock'` `'lock-open'` `'logo-apple-carplay'` `'logo-apple-music'` `'logo-apple-podcast'` `'logo-baidu'` `'logo-delicious'` `'logo-digg'` `'logo-facebook'` `'logo-foursquare'` `'logo-gmail'` `'logo-google'` `'logo-hatena'` `'logo-instagram'` `'logo-kaixin'` `'logo-kakaotalk'` `'logo-kununu'` `'logo-linkedin'` `'logo-naver'` `'logo-pinterest'` `'logo-qq'` `'logo-qq-share'` `'logo-reddit'` `'logo-skyrock'` `'logo-snapchat'` `'logo-sohu'` `'logo-spotify'` `'logo-tecent'` `'logo-telegram'` `'logo-tiktok'` `'logo-tumblr'` `'logo-twitter'` `'logo-viber'` `'logo-vk'` `'logo-wechat'` `'logo-weibo'` `'logo-whatsapp'` `'logo-x'` `'logo-xing'` `'logo-yahoo'` `'logo-youku'` `'logo-youtube'` `'logout'` `'map'` `'menu-dots-horizontal'` `'menu-dots-vertical'` `'menu-lines'` `'microphone'` `'minus'` `'mobile'` `'moon'` `'new-chat'` `'news'` `'none'` `'north-arrow'` `'oil-can'` `'online-search'` `'parking-brake'` `'parking-light'` `'paste'` `'pause'` `'phone'` `'pin'` `'pin-filled'` `'pivot'` `'play'` `'play-filled'` `'plug'` `'plus'` `'preheating'` `'price-tag'` `'printer'` `'purchase'` `'push-pin'` `'push-pin-off'` `'qr'` `'qr-off'` `'question'` `'question-filled'` `'racing-flag'` `'radar'` `'radio'` `'refresh'` `'replay'` `'reset'` `'return'` `'road'` `'roof-closed'` `'roof-open'` `'route'` `'rss'` `'save'` `'screen'` `'search'` `'seat'` `'send'` `'service-technician'` `'share'` `'shopping-bag'` `'shopping-bag-filled'` `'shopping-cart'` `'shopping-cart-filled'` `'sidebar'` `'sidelights'` `'skip-backward'` `'skip-forward'` `'snowflake'` `'sort'` `'stack'` `'star'` `'star-filled'` `'steering-wheel'` `'stop'` `'stopwatch'` `'subtract'` `'success'` `'success-filled'` `'sun'` `'suv'` `'switch'` `'tablet'` `'tachometer'` `'theme'` `'tire'` `'trigger-finger'` `'truck'` `'turismo'` `'unlinked'` `'upload'` `'user'` `'user-filled'` `'user-group'` `'user-manual'` `'video'` `'view'` `'view-off'` `'volume-off'` `'volume-up'` `'warning'` `'warning-filled'` `'weather'` `'weight'` `'wifi'` `'work'` `'wrench'` `'wrenches'` `'zoom-in'` `'zoom-out'` | `'none'` | Sets the icon displayed inside the tag alongside the label. Use `none` to render the tag without an icon. |
| `iconSource` | `string` | `undefined` | Sets a URL to a custom SVG icon, overriding the built-in icon set when a brand-specific icon is needed. |
| `variant` | `'primary'` `'secondary'` `'info'` `'info-frosted'` `'warning'` `'warning-frosted'` `'success'` `'success-frosted'` `'error'` `'error-frosted'` | `'secondary'` | Sets the visual style of the tag, which controls its background and text colors (e.g. `primary`, `secondary`, `notification-info`). |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the tag content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./p-tag/examples/Default.html](./p-tag/examples/Default.html) |
| With slotted button | It is possible to add a `<button>` tag into the `p-tag` component. | [./p-tag/examples/SlottedButton.html](./p-tag/examples/SlottedButton.html) |
| With slotted link | It is possible to add an `<a>` tag to the `p-tag` component. | [./p-tag/examples/SlottedLink.html](./p-tag/examples/SlottedLink.html) |
| Multiline | The contents of the `p-tag` component are rendered with `white-space: nowrap` by default. | [./p-tag/examples/Multiline.html](./p-tag/examples/Multiline.html) |
