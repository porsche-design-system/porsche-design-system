import type { TagName } from '@porsche-design-system/shared';
import { throwException } from '../log/logger';
import { getPrefixedTagNames, getTagName, getTagNameWithoutPrefix } from '../tag-name';
import { paramCaseToCamelCase } from '../paramCaseToCamelCase';
import type { PrefixedTagNames } from '../tag-name';

export const throwIfRootNodeIsNotOneOfKind = (element: HTMLElement, tagNames: TagName[]): void => {
  const shadowHost = (element.getRootNode() as ShadowRoot)?.host as HTMLElement;
  const actualTagName = shadowHost && getTagName(shadowHost);
  const prefixedTagNames = getPrefixedTagNames(element);
  const allowedTagNames = tagNames.map(
    (tagName) => prefixedTagNames[paramCaseToCamelCase(tagName) as keyof PrefixedTagNames]
  );

  if (!allowedTagNames.includes(actualTagName)) {
    throwException(`${getTagNameWithoutPrefix(element)} can't be used like this.`);
  }
};
