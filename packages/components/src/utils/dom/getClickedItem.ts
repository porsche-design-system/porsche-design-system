import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames } from '..';

export const getClickedItem = <T>(
  host: HTMLElement,
  tagName: TagNameCamelCase,
  targets: EventTarget[]
): HTMLElement & T => {
  const item = getPrefixedTagNames(host)[tagName];
  return targets.find((x: HTMLElement) => x.tagName?.toLowerCase() === item) as unknown as HTMLElement & T;
};
