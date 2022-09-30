import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, paramCaseToCamelCase } from '..';

export const getClickedItem = <T>(host: HTMLElement, tagName: TagName, targets: EventTarget[]): HTMLElement & T => {
  const item = getPrefixedTagNames(host)[paramCaseToCamelCase(tagName)];
  return targets.find((x: HTMLElement) => x.tagName?.toLowerCase() === item) as unknown as HTMLElement & T;
};
