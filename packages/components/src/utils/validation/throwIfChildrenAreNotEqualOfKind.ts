import { getTagNameWithoutPrefix, throwException } from '..';

export const throwIfChildrenAreNotEqualOfKind = (host: HTMLElement, allowedTagNames: string[]): void => {
  const children = host.children;
  const numChildren = children.length;

  if (numChildren < 2) {
    return;
  }

  const firstChildTagName = children[0].tagName;

  for (const child of children) {
    if (child.tagName !== firstChildTagName) {
      throwException(
        `child HTMLElements of ${getTagNameWithoutPrefix(
          host
        )} should not be mixed. Use only one of the following allowed tag type(s): [${allowedTagNames}].`
      );
    }
  }
};
