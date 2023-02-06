import { getTagNameWithoutPrefix } from '../tag-name';

// TODO: add missing unit test
export const warnThatDeprecatedPropIsUsed = (host: HTMLElement, prop: string): void => {
  console.warn(
    `[Porsche Design System] ${prop} is deprecated for component "${getTagNameWithoutPrefix(
      host
    )}" and will be removed with next major release.`
  );
};
