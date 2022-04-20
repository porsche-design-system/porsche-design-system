import { isParentFieldsetWrapperRequired } from './isParentFieldsetWrapperRequired';
import type { HTMLElementWithRequiredProp } from './isRequired';
import { isRequired } from './isRequired';

export const isRequiredAndParentNotRequired = (element: HTMLElement, child: HTMLElementWithRequiredProp): boolean => {
  return isRequired(child) && !isParentFieldsetWrapperRequired(element);
};
