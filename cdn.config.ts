export const CDN_KEY_TYPE_DEFINITION = `declare global {
  interface Window {
    PORSCHE_DESIGN_SYSTEM_CDN: 'auto' | 'cn';
  }
}`;

export const CDN_BASE_URL = 'https://cdn.ui.porsche.com';
export const CDN_BASE_URL_CN = 'https://cdn.ui.porsche.cn';
export const CDN_BASE_URL_CN_CONDITION = `typeof window !== 'undefined' && window.PORSCHE_DESIGN_SYSTEM_CDN === 'cn'`;
export const CDN_BASE_URL_DYNAMIC = `(${CDN_BASE_URL_CN_CONDITION} ? '${CDN_BASE_URL_CN}' : '${CDN_BASE_URL}')`;

const basePath = 'porsche-design-system';
export const CDN_BASE_PATH_COMPONENTS = `${basePath}/components`;
export const CDN_BASE_PATH_EMAIL = `${basePath}/email`;
export const CDN_BASE_PATH_FONTS = `${basePath}/fonts`;
export const CDN_BASE_PATH_ICONS = `${basePath}/icons`;
export const CDN_BASE_PATH_META_ICONS = `${basePath}/meta-icons`;
export const CDN_BASE_PATH_MARQUE = `${basePath}/marque`;
export const CDN_BASE_PATH_STYLES = `${basePath}/styles`;
