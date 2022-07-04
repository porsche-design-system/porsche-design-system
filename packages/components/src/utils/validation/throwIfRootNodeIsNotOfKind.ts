import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const throwIfRootNodeIsNotOfKind = (element: HTMLElement, tagName: TagNameCamelCase): void => {
  const shadowHost = (element.getRootNode() as ShadowRoot)?.host as HTMLElement;
  const actualTagName = shadowHost && getTagName(shadowHost);
  const allowedTagName = getPrefixedTagNames(element)[tagName];

  if (actualTagName !== allowedTagName) {
    throw new Error(`${getTagName(element)} can't be used like this`);
  }
};
