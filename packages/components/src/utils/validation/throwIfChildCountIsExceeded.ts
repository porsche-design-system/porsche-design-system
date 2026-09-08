import { throwException } from '../log/logger';
import { getTagNameWithoutPrefix } from '../tag-name';

export const throwIfChildCountIsExceeded = (element: HTMLElement, allowedAmount: number): void => {
  const childCount = element.children.length;
  if (childCount > allowedAmount) {
    throwException(
      `only ${allowedAmount} children are allowed in ${getTagNameWithoutPrefix(element)} but got ${childCount}.`
    );
  }
};
