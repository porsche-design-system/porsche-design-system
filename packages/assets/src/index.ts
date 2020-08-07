import { CDN_BASE_URL as FONTS_CDN_BASE_URL, FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { CDN_BASE_URL as ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/icons';
import { CDN_BASE_URL as MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/marque';
import { CDN_BASE_URL as METAICONS_CDN_BASE_URL, METAICONS_MANIFEST } from '@porsche-design-system/metaicons';
import { FONT_FACE_STYLE_CDN_URL } from '@porsche-design-system/utilities'; // Rollup plugin node-resolve resolves to much of the utilities package. We have to restrict it

// reexports are needed in order to build standalone typings
export {
  FONTS_CDN_BASE_URL,
  FONTS_MANIFEST,
  ICONS_CDN_BASE_URL,
  ICONS_MANIFEST,
  MARQUES_CDN_BASE_URL,
  MARQUES_MANIFEST,
  METAICONS_CDN_BASE_URL,
  METAICONS_MANIFEST,
  FONT_FACE_STYLE_CDN_URL
};
export * from './preloading'
