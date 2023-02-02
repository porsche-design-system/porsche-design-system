import { getTagNameWithoutPrefix } from '../tag-name';

// TODO: add missing unit test
export const warnIfDeprecatedPropValueIsUsed = <T extends string>(
  host: HTMLElement,
  prop: string,
  deprecationMap: Partial<Record<T, T>>
): void => {
  const value = host[prop];
  if (deprecationMap[value]) {
    console.warn(
      `[Porsche Design System] ${prop}="${value}" is deprecated for component "${getTagNameWithoutPrefix(
        host
      )}" and will be removed with next major release. Please use "${deprecationMap[value]}" instead.`
    );
  }
};
