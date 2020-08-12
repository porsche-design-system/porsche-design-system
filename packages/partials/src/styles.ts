import { FONT_FACE_CDN_URL } from '@porsche-design-system/utilities';
import { TAG_NAMES } from '@porsche-design-system/components/src/tags';

type Options = { withoutTags: boolean };

// We need to determine if we are local or production to change the url
export const getFontFaceCSS = (options?: Options) =>
  options.withoutTags ? FONT_FACE_CDN_URL : `<link rel="stylesheet" href="${FONT_FACE_CDN_URL}">`;

export const getPorscheDesignSystemCoreStyles = (options?: Options) => {
  const styleInnerHtml = `${TAG_NAMES.join(',')} { visibility: hidden }`;
  return options.withoutTags ? styleInnerHtml : `<style>${styleInnerHtml}</style>`;
};
