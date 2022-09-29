import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName, paramCaseToCamelCase } from '..';

export const throwIfRootNodeIsNotOneOfKind = (element: HTMLElement, tagNames: TagName[]): void => {
  const shadowHost = (element.getRootNode() as ShadowRoot)?.host as HTMLElement;
  const actualTagName = shadowHost && getTagName(shadowHost);
  const prefixedTagNames = getPrefixedTagNames(element);
  const allowedTagNames = tagNames.map((tagName) => prefixedTagNames[paramCaseToCamelCase(tagName)]);

  if (!allowedTagNames.includes(actualTagName)) {
    throw new Error(`${getTagName(element)} can't be used like this`);
  }
};
