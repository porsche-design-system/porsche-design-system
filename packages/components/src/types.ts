// common type definitions
export { TextSize } from './components/basic/typography/text/text-utils';
export { HeadlineVariant } from './components/basic/typography/headline/headline-utils';

export type BannerState = 'error' | 'warning' | 'neutral';

export type TextWeight = 'thin' | 'regular' | 'semibold' | 'bold';

export type TextColor =
  | 'brand'
  | 'default'
  | 'neutral-contrast-high'
  | 'neutral-contrast-medium'
  | 'neutral-contrast-low'
  | 'notification-success'
  | 'notification-warning'
  | 'notification-error'
  | 'notification-neutral'
  | 'inherit';

export type TextAlign = 'left' | 'center' | 'right';

export type Theme = 'light' | 'dark';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type LinkVariant = ButtonVariant; // alias

export type LinkTarget = '_self' | '_blank' | '_parent' | '_top' | string;

export type FormState = 'none' | 'error' | 'success';

// Tabs Types
export type TabChangeEvent = { activeTabIndex: number };
export type TabSize = 'small' | 'medium';
export type TabWeight = Extract<TextWeight, 'regular' | 'semibold'>;
export type TabGradientColorTheme = 'default' | 'surface';

// Pagination Types
export type NumberOfPageLinks = 5 | 7;
export type PageChangeEvent = { page: number; previousPage: number };

// BreakpointCustomizable Types
export const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl'] as const;
export type Breakpoint = typeof BREAKPOINTS[number];
export type BreakpointValues<T> = Partial<{ [key in Breakpoint]: T }> & { base: T };

// string is needed in order to pass and parse objects via prop decorator
// TODO: This should be removed in Angular/React Types to ensure typing support
export type BreakpointCustomizable<T> = T | BreakpointValues<T> | string;

// ROLLUP_REPLACE_IS_STAGING will be provided via webpack
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
| 'bell'
| 'bookmark'
| 'broadcast'
| 'calculator'
| 'calendar'
| 'camera'
| 'car'
| 'car-battery'
| 'card'
| 'charging-active'
| 'charging-state'
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
| 'menu-dots-horizontal'
| 'menu-dots-vertical'
| 'menu-lines'
| 'minus'
| 'mobile'
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
| 'video'
| 'view'
| 'view-off'
| 'volume-off'
| 'volume-up'
| 'warning'
| 'weight'
| 'wifi'
| 'work'
| 'wrench'
| 'wrenches'
| 'zoom-in'
| 'zoom-out';