import { getTagNameWithoutPrefix } from '../tag-name';

export const getDeprecatedPropWarningMessage = (host: HTMLElement, prop: string): string =>
  `[Porsche Design System] ${prop} is deprecated for component "${getTagNameWithoutPrefix(
    host
  )}" and will be removed with next major release.`;
