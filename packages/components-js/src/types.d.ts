// common type definitions
export type TextSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'inherit';

export type TextWeight = 'thin' | 'regular' | 'semibold' | 'bold';

export type HeadlineVariant = 'large-title' | 'headline-1' | 'headline-2' | 'headline-3' | 'headline-4' | 'headline-5';

export type Theme = 'light' | 'dark';

export type ButtonType = 'button' | 'submit' | 'reset';

export type LinkTarget = '_self' | '_blank' | '_parent' | '_top' | string;

export type FormState = 'none' | 'error' | 'success';

/**
 * ROLLUP_REPLACE_IS_STAGING will be provided via webpack
 */
declare global {
  const ROLLUP_REPLACE_IS_STAGING: string;
}

/* Auto Generated Below */

export type IconName = '360'
| 'active-cabin-ventilation'
| 'add'
| 'adjust'
| 'arrow-double-down'
| 'arrow-double-left'
| 'arrow-double-right'
| 'arrow-double-up'
| 'arrow-down'
| 'arrow-first'
| 'arrow-head-down'
| 'arrow-head-left'
| 'arrow-head-right'
| 'arrow-head-up'
| 'arrow-last'
| 'arrow-left'
| 'arrow-right'
| 'arrow-up'
| 'augmented-reality'
| 'battery-empty'
| 'battery-full'
| 'battery-level-1'
| 'battery-level-2'
| 'battery-level-3'
| 'battery-level-4'
| 'battery-low'
| 'bell'
| 'bookmark'
| 'bookmark-filled'
| 'broadcast'
| 'calculator'
| 'calendar'
| 'camera'
| 'car'
| 'car-battery'
| 'car-limousine'
| 'car-limousine-front-open'
| 'car-limousine-rear-open'
| 'car-limousine-spoiler'
| 'car-limousine-sunroof-open'
| 'car-sport'
| 'car-sport-front-open'
| 'car-sport-rear-hood-open'
| 'car-sport-roof-open'
| 'car-sport-spoiler'
| 'car-suv'
| 'car-suv-front-open'
| 'car-suv-rear-hood-open'
| 'car-suv-spoiler'
| 'car-suv-sunroof-open'
| 'car-targa-front-open'
| 'car-targa-rear-hood-open'
| 'car-targa-spoiler'
| 'car-targa-sunroof-open'
| 'car-top'
| 'car-top-door-open-all'
| 'car-top-door-open-front-left'
| 'car-top-door-open-front-right'
| 'car-top-door-open-front-right-left'
| 'car-top-door-open-rear-left'
| 'car-top-door-open-rear-left-front-left'
| 'car-top-door-open-rear-left-front-left-right'
| 'car-top-door-open-rear-left-front-right'
| 'car-top-door-open-rear-left-right-front-right'
| 'car-top-door-open-rear-left-roof-front-left'
| 'car-top-door-open-rear-right'
| 'car-top-door-open-rear-right-front-left'
| 'car-top-door-open-rear-right-front-left-right'
| 'car-top-door-open-rear-right-front-right'
| 'car-top-door-open-rear-right-left'
| 'card'
| 'charging-active'
| 'charging-state'
| 'charging-state-bev'
| 'charging-state-phev'
| 'charging-station'
| 'chart'
| 'chat'
| 'check'
| 'city'
| 'climate'
| 'climate-control'
| 'clock'
| 'close'
| 'closed-caption'
| 'co2-emission'
| 'compare'
| 'configurate'
| 'country-road'
| 'cubic-capacity'
| 'delete'
| 'disable'
| 'document'
| 'download'
| 'duration'
| 'edit'
| 'email'
| 'exclamation'
| 'external'
| 'filter'
| 'flash'
| 'fuel-station'
| 'garage'
| 'gift'
| 'globe'
| 'grid'
| 'highway'
| 'home'
| 'horn'
| 'image'
| 'increase'
| 'information'
| 'key'
| 'key-heritage'
| 'key-porsche'
| 'leaf'
| 'leather'
| 'light'
| 'list'
| 'locate'
| 'lock'
| 'lock-open'
| 'logo-baidu'
| 'logo-delicious'
| 'logo-digg'
| 'logo-facebook'
| 'logo-foursquare'
| 'logo-gmail'
| 'logo-google'
| 'logo-hatena'
| 'logo-instagram'
| 'logo-kaixin'
| 'logo-linkedin'
| 'logo-pinterest'
| 'logo-qq'
| 'logo-qq-share'
| 'logo-skyrock'
| 'logo-sohu'
| 'logo-tecent'
| 'logo-telegram'
| 'logo-tumblr'
| 'logo-twitter'
| 'logo-viber'
| 'logo-vk'
| 'logo-wechat'
| 'logo-weibo'
| 'logo-whatsapp'
| 'logo-xing'
| 'logo-yahoo'
| 'logo-youku'
| 'logo-youtube'
| 'logout'
| 'map'
| 'map-filled'
| 'menu-dots-horizontal'
| 'menu-lines'
| 'minus'
| 'mirror-colapse'
| 'mobile'
| 'mode-disarmed'
| 'mode-privacy'
| 'mode-remote-access-denied'
| 'mode-service'
| 'mode-theft'
| 'mode-transport'
| 'moon'
| 'oil-can'
| 'parking-brake'
| 'parking-light'
| 'pause'
| 'phone'
| 'pin'
| 'play'
| 'plug'
| 'plus'
| 'preheating'
| 'printer'
| 'purchase'
| 'question'
| 'racing-flag'
| 'refresh'
| 'replay'
| 'reset'
| 'route'
| 'rss'
| 'save'
| 'screen'
| 'search'
| 'send'
| 'send-alt'
| 'share'
| 'shopping-bag'
| 'shopping-cart'
| 'sidelights'
| 'snowflake'
| 'sort'
| 'stack'
| 'star'
| 'steering-wheel'
| 'stopwatch'
| 'subtract'
| 'sun'
| 'switch'
| 'tablet'
| 'tachometer'
| 'truck'
| 'upload'
| 'user'
| 'user-group'
| 'user-manual'
| 'vehicle'
| 'video'
| 'view'
| 'view-off'
| 'volume-off'
| 'volume-up'
| 'warning'
| 'weight'
| 'wifi'
| 'window-left'
| 'work'
| 'wrench'
| 'wrenches'
| 'zoom-in'
| 'zoom-out';