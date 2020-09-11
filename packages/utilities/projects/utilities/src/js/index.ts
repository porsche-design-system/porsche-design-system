export * from './functions';
export * from './helper';
export * from './variables';

/* Auto Generated Below */
const CDN_KEY = 'PORSCHE_DESIGN_SYSTEM_CDN';

declare global {
  interface Window {
    [CDN_KEY]: 'auto' | 'cn';
  }
}

const isCdnCn = typeof window !== 'undefined' && (window[CDN_KEY] || 'auto') === 'cn';
export const FONT_FACE_CDN_URL = (isCdnCn ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com') + '/porsche-design-system/styles/' + (isCdnCn ? 'font-face.min.cn.172e88acd22bc094e313d6d7bd56a11a.css' : 'font-face.min.b0ce2316e7754d7e76bbc1ff9fcc7932.css');

/**
 * @deprecated since v1.1.0.
 * Please use FONT_FACE_CDN_URL instead.
 */
export const FONT_FACE_STYLE_CDN_URL = FONT_FACE_CDN_URL;