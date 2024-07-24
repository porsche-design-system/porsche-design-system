import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';
import { throwException } from '../log';
import { paramCaseToCamelCase } from '../paramCaseToCamelCase';

export const throwIfElementIsNotOfKind = (
  host: HTMLElement,
  element: HTMLElement,
  tagNameOrNames: TagName | TagName[]
): void => {
  const prefixedTagNamesMap = getPrefixedTagNames(host);

  const prefixedTagNames: string[] = Array.isArray(tagNameOrNames)
    ? tagNameOrNames.map((tagName) => prefixedTagNamesMap[paramCaseToCamelCase(tagName)])
    : [prefixedTagNamesMap[paramCaseToCamelCase(tagNameOrNames)]];

  const actualTagName = getTagName(element);

  if (!prefixedTagNames.includes(actualTagName)) {
    throwException(`child ${actualTagName} of ${getTagName(host)} has to be a ${prefixedTagNames.join(' | ')}.`);
  }
};
