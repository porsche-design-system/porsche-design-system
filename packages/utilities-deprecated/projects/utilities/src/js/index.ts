export * from './functions';
export * from './helper';
export * from './variables';

/* Auto Generated Below */
declare global {
  interface Window {
    PORSCHE_DESIGN_SYSTEM_CDN: 'auto' | 'cn';
  }
}

const isCdnCn = typeof window !== 'undefined' && window.PORSCHE_DESIGN_SYSTEM_CDN === 'cn';
export const FONT_FACE_CDN_URL = (isCdnCn ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com') + '/porsche-design-system/styles/' + (isCdnCn ? 'font-face.min.cn.4e932e640a74ab1e521863a4cc11ca67.css' : 'font-face.min.faa80afe2bb81b57dae77e502a1748d8.css');

/**
 * @deprecated since v1.1.0.
 * Please use FONT_FACE_CDN_URL instead.
 */
export const FONT_FACE_STYLE_CDN_URL = FONT_FACE_CDN_URL;