export const CDN_KEY_TYPE_DEFINITION = `declare global {
  interface Window {
    /** @deprecated since v3 */
    PORSCHE_DESIGN_SYSTEM_CDN: 'auto' | 'cn';
    PORSCHE_DESIGN_SYSTEM_CDN_URL: string;
  }
}`;

export const CDN_BASE_URL = 'https://cdn.ui.porsche.com';
export const CDN_BASE_URL_CN = 'https://cdn.ui.porsche.cn';

// the window variable is defined during component-js load() call
export const CDN_BASE_URL_DYNAMIC = 'window.PORSCHE_DESIGN_SYSTEM_CDN_URL';

const basePath = 'porsche-design-system';
export const CDN_BASE_PATH_COMPONENTS = `${basePath}/components`;
export const CDN_BASE_PATH_CREST = `${basePath}/crest`;
export const CDN_BASE_PATH_FALLBACKS = `${basePath}/fallbacks`;
export const CDN_BASE_PATH_FONTS = `${basePath}/fonts`;
export const CDN_BASE_PATH_ICONS = `${basePath}/icons`;
export const CDN_BASE_PATH_MARQUE = `${basePath}/marque`;
export const CDN_BASE_PATH_META_ICONS = `${basePath}/meta-icons`;
export const CDN_BASE_PATH_MODEL_SIGNATURES = `${basePath}/model-signatures`;
export const CDN_BASE_PATH_STYLES = `${basePath}/styles`;
