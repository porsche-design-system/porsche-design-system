import { getTagNameWithoutPrefix, throwException } from '..';

export const throwIfChildCountIsExceeded = (element: HTMLElement, allowedAmount: number): void => {
  const childCount = element.children.length;
  if (childCount > allowedAmount) {
    throwException(
      `only ${allowedAmount} children are allowed in ${getTagNameWithoutPrefix(element)} but got ${childCount}.`
    );
  }
};
