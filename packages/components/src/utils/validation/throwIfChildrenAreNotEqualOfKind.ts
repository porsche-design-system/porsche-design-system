import { getTagNameWithoutPrefix, throwException } from '..';

export const throwIfChildrenAreNotEqualOfKind = (element: HTMLElement, children: HTMLElement[]): void => {
  const isEqual = children.every((child) => child.matches(children[0].tagName));
  if (!isEqual) {
    throwException(
      `child HTMLElements of ${getTagNameWithoutPrefix(
        element
      )} should not be mixed. Use only the same kind of HTMLElement.`
    );
  }
};
