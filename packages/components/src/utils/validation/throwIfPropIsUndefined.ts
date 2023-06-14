import { getTagNameWithoutPrefix, throwException } from '..';

export const throwIfPropIsUndefined = <T>(element: HTMLElement, propName: string, value: T): void => {
  if (value === undefined) {
    throwException(`the required property '${propName}' is undefined on ${getTagNameWithoutPrefix(element)}.`);
  }
};
