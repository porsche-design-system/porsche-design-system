import { getTagName } from '../tag-name';

export const throwIfChildCountIsExceeded = (element: HTMLElement, allowedAmount: number): void => {
  const childCount = element.children.length;
  if (childCount > allowedAmount) {
    throw new Error(`Only ${allowedAmount} children are allowed in ${getTagName(element)} but got ${childCount}`);
  }
};
