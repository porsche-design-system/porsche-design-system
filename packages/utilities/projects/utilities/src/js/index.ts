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

export const FONT_FACE_CDN_URL = typeof window !== "undefined" && (window[CDN_KEY] ?? 'auto') === 'cn' ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com' + '/porsche-design-system/styles' + '/font-face.min.02a9c7ba97467baa51aa8a2ac5d1a777.css';
/**
 * @deprecated since v1.1.0.
 * Please use FONT_FACE_CDN_URL instead.
 */
export const FONT_FACE_STYLE_CDN_URL = FONT_FACE_CDN_URL;