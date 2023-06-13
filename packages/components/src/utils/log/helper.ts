import { getTagNameWithoutPrefix } from '../tag-name';

export const getDeprecatedPropOrSlotWarningMessage = (host: HTMLElement, propOrSlot: string): string =>
  `${propOrSlot} is deprecated for component "${getTagNameWithoutPrefix(
    host
  )}" and will be removed with next major release.`;
