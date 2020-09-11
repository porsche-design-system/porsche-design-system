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

const isCdnCn = typeof window !== 'undefined' && window[CDN_KEY] === 'cn';
export const FONT_FACE_CDN_URL = (isCdnCn ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com') + '/porsche-design-system/styles/' + (isCdnCn ? 'font-face.min.cn.c1b46971322e96095de49987cdc90226.css' : 'font-face.min.de7353ac41430a74da152a5bf0e7bb5b.css');

/**
 * @deprecated since v1.1.0.
 * Please use FONT_FACE_CDN_URL instead.
 */
export const FONT_FACE_STYLE_CDN_URL = FONT_FACE_CDN_URL;