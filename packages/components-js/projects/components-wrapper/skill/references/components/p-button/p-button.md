# p-button

The `p-button` component is essential for performing form or **interaction** events. For an optimal user guidance and dedicated pursuit of business or sales goals, different types of Buttons (**Primary** and **Secondary**) are available for usage. A Button can be used with or without a label but it's recommended to keep the **label visible** for better **usability** whenever possible. When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers. Whenever you want to provide navigational elements, stick to the [Link](../p-link/p-link.md) component instead.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-button`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use buttons for actions that have clear consequences, such as submitting a form or initiating a purchase.
- Use buttons to indicate the next step in a process, such as "Continue" or "Next".
- Use buttons with clear and concise labels that accurately describe the action they perform.
- Use the primary button for the most important or desired action, and use the secondary button for less important or secondary actions.
- Use icons in buttons to enhance their meaning, but ensure the icon is relevant and easily recognizable.
- Use disabled buttons to indicate actions that are currently unavailable or incomplete, and provide context for why the button is disabled.

### Don't:

- Don't use buttons for non-actionable elements, such as decorative graphics or text.
- Don't use ambiguous or unclear labels for buttons, as it can lead to confusion for users.
- Don't use too many buttons on a page or in a single section, as it can overwhelm users and reduce usability.
- Don't use primary and secondary buttons interchangeably, as it can confuse users and reduce the clarity of your interface.
- Don't use disabled buttons without providing context for why the button is disabled. This can lead to confusion and frustration for users.

---

## Related components

- [Links](../p-link/p-link.md)

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
| `aria-label` | Defines a string value that labels the interactive element. |
| `aria-description` | Defines a string value that adds a more detailed description of the interactive element. |
| `aria-expanded` | Exposes a visual state (e.g. expanded/collapsed) of another element. |
| `aria-pressed` | Exposes the `pressed` state of a toggle button. |
| `aria-haspopup` | Defines that the button opens a popup (e.g. `dialog`). It can be used in combination with `aria-expanded` to indicate the state of the popup. |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-disabled="true"` | When `disabled` prop is set, this ARIA attribute is set on the button element. |
| `role="status"` | When `loading` prop is set, the component announces the loading state (start and finish). |
| `aria-hidden="true"` | When the `icon` prop is set, the icon is hidden from the screen reader. |

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

If the text of a button does not clearly indicate what the button's behavior is, add a brief, descriptive label using the `aria` property with the `aria-label` value to provide more context for screen reader users. Phrases like "Add", "Detail" or "Show" can be unclear when read out of context by a screen reader. In such instances, provide an alternative text that offers more detailed information, such as "Add item XYZ to shopping cart" or "Details of product XYZ."

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
| `aria` | `ButtonAriaAttribute` | `undefined` | Sets ARIA attributes on the button to improve accessibility for screen readers. |
| `compact` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Reduces the button's height and padding for denser layouts. Supports responsive breakpoint values. |
| `disabled` | `boolean` | `false` | Disables the button, preventing all interaction and blocking events. |
| `form` | `string` | `undefined` | Associates the button with a form element by its ID, so it can submit or reset that form even when placed outside of it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `icon` | `'360'` `'4-wheel-drive'` `'accessibility'` `'active-cabin-ventilation'` `'add'` `'adjust'` `'aggregation'` `'ai-3d-object'` `'ai-code'` `'ai-edit'` `'ai-image'` `'ai-scale'` `'ai-sound'` `'ai-spark'` `'ai-spark-filled'` `'ai-text'` `'ai-video'` `'arrow-compact-down'` `'arrow-compact-left'` `'arrow-compact-right'` `'arrow-compact-up'` `'arrow-double-down'` `'arrow-double-left'` `'arrow-double-right'` `'arrow-double-up'` `'arrow-down'` `'arrow-down-left'` `'arrow-down-right'` `'arrow-first'` `'arrow-head-down'` `'arrow-head-left'` `'arrow-head-right'` `'arrow-head-up'` `'arrow-last'` `'arrow-left'` `'arrow-right'` `'arrow-up'` `'arrow-up-left'` `'arrow-up-right'` `'arrows'` `'attachment'` `'augmented-reality'` `'battery-empty'` `'battery-empty-co2'` `'battery-empty-fuel'` `'battery-full'` `'battery-half'` `'battery-one-quarter'` `'battery-three-quarters'` `'bell'` `'bookmark'` `'bookmark-filled'` `'brain'` `'broadcast'` `'cabriolet'` `'calculator'` `'calendar'` `'camera'` `'car'` `'car-battery'` `'card'` `'charging-active'` `'charging-network'` `'charging-state'` `'charging-station'` `'chart'` `'chat'` `'check'` `'city'` `'climate'` `'climate-control'` `'clock'` `'close'` `'closed-caption'` `'cloud'` `'co2-class'` `'co2-emission'` `'color-picker'` `'compare'` `'compass'` `'configurate'` `'copy'` `'country-road'` `'coupe'` `'cubic-capacity'` `'cut'` `'delete'` `'disable'` `'dislike'` `'dislike-filled'` `'document'` `'door'` `'download'` `'drag'` `'duration'` `'ear'` `'edit'` `'email'` `'error'` `'error-filled'` `'exclamation'` `'exclamation-filled'` `'external'` `'fast-backward'` `'fast-forward'` `'file-csv'` `'file-excel'` `'filter'` `'fingerprint'` `'flag'` `'flash'` `'fuel-station'` `'garage'` `'genuine-parts'` `'geo-localization'` `'gift'` `'globe'` `'grid'` `'grip'` `'group'` `'hand'` `'heart'` `'heart-filled'` `'highway'` `'highway-filled'` `'history'` `'home'` `'horn'` `'image'` `'increase'` `'information'` `'information-filled'` `'key'` `'laptop'` `'leaf'` `'leather'` `'light'` `'like'` `'like-filled'` `'limousine'` `'linked'` `'list'` `'locate'` `'lock'` `'lock-open'` `'logo-apple-carplay'` `'logo-apple-music'` `'logo-apple-podcast'` `'logo-baidu'` `'logo-delicious'` `'logo-digg'` `'logo-facebook'` `'logo-foursquare'` `'logo-gmail'` `'logo-google'` `'logo-hatena'` `'logo-instagram'` `'logo-kaixin'` `'logo-kakaotalk'` `'logo-kununu'` `'logo-linkedin'` `'logo-naver'` `'logo-pinterest'` `'logo-qq'` `'logo-qq-share'` `'logo-reddit'` `'logo-skyrock'` `'logo-snapchat'` `'logo-sohu'` `'logo-spotify'` `'logo-tecent'` `'logo-telegram'` `'logo-tiktok'` `'logo-tumblr'` `'logo-twitter'` `'logo-viber'` `'logo-vk'` `'logo-wechat'` `'logo-weibo'` `'logo-whatsapp'` `'logo-x'` `'logo-xing'` `'logo-yahoo'` `'logo-youku'` `'logo-youtube'` `'logout'` `'map'` `'menu-dots-horizontal'` `'menu-dots-vertical'` `'menu-lines'` `'microphone'` `'minus'` `'mobile'` `'moon'` `'new-chat'` `'news'` `'none'` `'north-arrow'` `'oil-can'` `'online-search'` `'parking-brake'` `'parking-light'` `'paste'` `'pause'` `'phone'` `'pin'` `'pin-filled'` `'pivot'` `'play'` `'play-filled'` `'plug'` `'plus'` `'preheating'` `'price-tag'` `'printer'` `'purchase'` `'push-pin'` `'push-pin-off'` `'qr'` `'qr-off'` `'question'` `'question-filled'` `'racing-flag'` `'radar'` `'radio'` `'refresh'` `'replay'` `'reset'` `'return'` `'road'` `'roof-closed'` `'roof-open'` `'route'` `'rss'` `'save'` `'screen'` `'search'` `'seat'` `'send'` `'service-technician'` `'share'` `'shopping-bag'` `'shopping-bag-filled'` `'shopping-cart'` `'shopping-cart-filled'` `'sidebar'` `'sidelights'` `'skip-backward'` `'skip-forward'` `'snowflake'` `'sort'` `'stack'` `'star'` `'star-filled'` `'steering-wheel'` `'stop'` `'stopwatch'` `'subtract'` `'success'` `'success-filled'` `'sun'` `'suv'` `'switch'` `'tablet'` `'tachometer'` `'theme'` `'tire'` `'trigger-finger'` `'truck'` `'turismo'` `'unlinked'` `'upload'` `'user'` `'user-filled'` `'user-group'` `'user-manual'` `'video'` `'view'` `'view-off'` `'volume-off'` `'volume-up'` `'warning'` `'warning-filled'` `'weather'` `'weight'` `'wifi'` `'work'` `'wrench'` `'wrenches'` `'zoom-in'` `'zoom-out'` | `'none'` | Sets the icon displayed inside the button. Use `none` to show no icon. |
| `iconSource` | `string` | `undefined` | Sets a path to a custom SVG icon, used instead of the built-in icon set. |
| `loading` | `boolean` | `false` | Disables the button and replaces its content with a loading spinner to indicate an ongoing operation. |
| `name` | `string` | `undefined` | Sets the name submitted with the form data when this button triggers form submission. |
| `type` | `'button'` `'submit'` `'reset'` | `'submit'` | Sets the button's HTML type — `submit` sends the form, `reset` clears it, `button` performs no default action. |
| `value` | `string` | `undefined` | Sets the value submitted with the form data when this button triggers form submission, paired with `name`. |
| `variant` | `'primary'` `'secondary'` | `'primary'` | Sets the visual style variant of the button (e.g. `primary`, `secondary`, `tertiary`). |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the button label. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| Form | When used as a submit button, the `name` and `value` props are submitted as a pair as part of the form data. | [./examples/Form.html](./examples/Form.html) |
| Form Attribute | When a button is used as a submit or reset button outside a form, the `form` attribute can be utilized to explicitly associate the button with a specific form element. | [./examples/FormAttribute.html](./examples/FormAttribute.html) |
