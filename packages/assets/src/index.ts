import { CDN_BASE_URL as P_FONTS_CDN_BASE_URL, FONTS_MANIFEST as P_FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { CDN_BASE_URL as P_ICONS_CDN_BASE_URL, ICONS_MANIFEST as P_ICONS_MANIFEST } from '@porsche-design-system/icons';
import {
  CDN_BASE_URL as P_MARQUE_CDN_BASE_URL,
  MARQUES_MANIFEST as P_MARQUES_MANIFEST
} from '@porsche-design-system/marque';

// reexports are needed in order to build standalone typings
export const FONTS_CDN_BASE_URL = P_FONTS_CDN_BASE_URL;
export const FONTS_MANIFEST = P_FONTS_MANIFEST;
export const ICONS_CDN_BASE_URL = P_ICONS_CDN_BASE_URL;
export const ICONS_MANIFEST = P_ICONS_MANIFEST;
export const MARQUES_CDN_BASE_URL = P_MARQUE_CDN_BASE_URL; // transform to plural
export const MARQUES_MANIFEST = P_MARQUES_MANIFEST;
