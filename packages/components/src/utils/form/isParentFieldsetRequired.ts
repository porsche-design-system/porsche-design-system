import { isParentOfKind } from '../dom';
import type { HTMLElementWithRequiredProp } from './isRequired';
import { isRequired } from './isRequired';

export const isParentFieldsetRequired = (element: HTMLElement): boolean => {
  return (
    (isParentOfKind(element, 'p-fieldset') || isParentOfKind(element, 'p-fieldset-wrapper')) &&
    isRequired(element.parentElement as HTMLElementWithRequiredProp)
  );
};
