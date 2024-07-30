import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, paramCaseToCamelCase } from '..';
import type { PrefixedTagNames } from '../tag-name';

export const getClickedItem = <T>(host: HTMLElement, tagName: TagName, targets: EventTarget[]): HTMLElement & T => {
  const item = getPrefixedTagNames(host)[paramCaseToCamelCase(tagName) as keyof PrefixedTagNames];
  return targets.find((x: HTMLElement) => x.tagName?.toLowerCase() === item) as unknown as HTMLElement & T;
};
