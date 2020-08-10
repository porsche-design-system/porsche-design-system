import { FONT_FACE_STYLE_CDN_URL } from '@porsche-design-system/utilities';

// We need to determine if we are local or production to change the url
export const getFontFaceCSS = () => `<link rel="stylesheet" href="${FONT_FACE_STYLE_CDN_URL}">`;
