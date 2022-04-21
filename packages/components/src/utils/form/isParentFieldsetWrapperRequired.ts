import { isParentOfKind } from '../dom';
import type { HTMLElementWithRequiredProp } from './isRequired';
import { isRequired } from './isRequired';

export const isParentFieldsetWrapperRequired = (element: HTMLElement): boolean => {
  return (
    isParentOfKind(element, 'pFieldsetWrapper') && isRequired(element.parentElement as HTMLElementWithRequiredProp)
  );
};
