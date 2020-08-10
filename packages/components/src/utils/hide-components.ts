import { TAG_NAMES } from '../tags';

export const getPorscheDesignSystemCoreStyles = () =>
  `<style>${Object.keys(TAG_NAMES).join(',')} { visibility: hidden }</style>`;
