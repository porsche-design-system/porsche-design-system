import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const throwIfRootNodeIsNotOneOfKind = (element: HTMLElement, tagNames: TagNameCamelCase[]): void => {
  const shadowHost = (element.getRootNode() as ShadowRoot)?.host as HTMLElement;
  const actualTagName = shadowHost && getTagName(shadowHost);
  const prefixedTagNames = getPrefixedTagNames(element);
  const allowedTagNames = tagNames.map((tagName) => prefixedTagNames[tagName]);

  if (!allowedTagNames.includes(actualTagName)) {
    throw new Error(`${getTagName(element)} can't be used like this`);
  }
};
