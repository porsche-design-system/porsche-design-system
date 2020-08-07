import { FONT_FACE_STYLE_CDN_URL } from '@porsche-design-system/utilities';

// We need to determine if we are local or production to change the url
export const getFontFaceCSS = () => `<link rel="stylesheet" href="${FONT_FACE_STYLE_CDN_URL}">`;

// Needs to be extended every time a new component gets added
export const getPorscheDesignSystemCoreStyles = () => `<style>p-marque,p-button,p-button-pure,p-checkbox-wrapper,p-link,p-link-pure,p-link-social,p-select-wrapper,
p-text-field-wrapper,p-pagination,p-radio-button-wrapper,p-textarea-wrapper,p-content-wrapper,p-divider,p-fieldset-wrapper,p-flex,p-flex-item,p-grid,
p-grid-item,p-headline,p-marque,p-text-list,p-text-list-item,p-spinner,p-icon,p-text { visibility: hidden }</style>`;
