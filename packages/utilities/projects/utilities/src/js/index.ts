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
export const FONT_FACE_CDN_URL = (isCdnCn ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com') + '/porsche-design-system/styles/' + (isCdnCn ? 'font-face.min.cn.ab128226e97d77abe80c8c491374b9b3.css' : 'font-face.min.6fdc3844907953937260ca9bdb49bf8d.css');

/**
 * @deprecated since v1.1.0.
 * Please use FONT_FACE_CDN_URL instead.
 */
export const FONT_FACE_STYLE_CDN_URL = FONT_FACE_CDN_URL;