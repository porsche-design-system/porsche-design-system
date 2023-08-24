import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';
import { throwException } from '../log';
import { paramCaseToCamelCase } from '../paramCaseToCamelCase';

export const throwIfElementIsNotOfKind = (host: HTMLElement, element: HTMLElement, tagName: TagName): void => {
  const prefixedTagName = getPrefixedTagNames(host)[paramCaseToCamelCase(tagName)];
  const actualTagName = getTagName(element);

  if (actualTagName !== prefixedTagName) {
    throwException(`child ${actualTagName} of ${getTagName(host)} has to be a ${prefixedTagName}.`);
  }
};
