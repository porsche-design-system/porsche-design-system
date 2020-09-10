export const CDN_KEY = 'PORSCHE_DESIGN_SYSTEM_CDN';

export const CDN_KEY_TYPE_DEFINITION = `const CDN_KEY = '${CDN_KEY}';

declare global {
  interface Window {
    [CDN_KEY]: 'auto' | 'cn';
  }
}`;

export const CDN_BASE_URL = 'https://cdn.ui.porsche.com';
export const CDN_BASE_URL_CN = 'https://cdn.ui.porsche.cn';
export const CDN_BASE_URL_DYNAMIC = `typeof window !== 'undefined' && (window[CDN_KEY] || 'auto') === 'cn' ? '${CDN_BASE_URL_CN}' : '${CDN_BASE_URL}'`;
export const CDN_BASE_PATH_COMPONENTS = 'porsche-design-system/components';
export const CDN_BASE_PATH_FONTS = 'porsche-design-system/fonts';
export const CDN_BASE_PATH_ICONS = 'porsche-design-system/icons';
export const CDN_BASE_PATH_META_ICONS = 'porsche-design-system/meta-icons';
export const CDN_BASE_PATH_MARQUE = 'porsche-design-system/marque';
export const CDN_BASE_PATH_STYLES = 'porsche-design-system/styles';
