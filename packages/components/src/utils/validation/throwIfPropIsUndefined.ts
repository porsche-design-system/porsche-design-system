import { getTagName } from '../tag-name';

export const throwIfPropIsUndefined = <T>(element: HTMLElement, propName: string, value: T): void => {
  if (value === undefined) {
    throw new Error(`The required property '${propName}' is undefined on ${getTagName(element)}`);
  }
};
