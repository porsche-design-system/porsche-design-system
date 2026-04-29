import { isParentOfKind } from '../dom';
import { type HTMLElementWithRequiredProp, isRequired } from './isRequired';

export const isParentFieldsetRequired = (element: HTMLElement): boolean => {
  return isParentOfKind(element, 'p-fieldset') && isRequired(element.parentElement as HTMLElementWithRequiredProp);
};
