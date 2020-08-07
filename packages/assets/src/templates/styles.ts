import { FONT_FACE_STYLE_CDN_URL } from '@porsche-design-system/utilities';
import { TAG_NAMES } from '@porsche-design-system/components/src/tags';

// We need to determine if we are local or production to change the url
export const getFontFaceCSS = () => `<link rel="stylesheet" href="${FONT_FACE_STYLE_CDN_URL}">`;

export const getPorscheDesignSystemCoreStyles = () =>
  `<style>${Object.keys(TAG_NAMES).join(',')} { visibility: hidden }</style>`;
