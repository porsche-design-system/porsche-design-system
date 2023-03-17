import { isParentFieldsetRequired } from './isParentFieldsetRequired';
import type { HTMLElementWithRequiredProp } from './isRequired';
import { isRequired } from './isRequired';

export const isRequiredAndParentNotRequired = (element: HTMLElement, child: HTMLElementWithRequiredProp): boolean => {
  return isRequired(child) && !isParentFieldsetRequired(element);
};
