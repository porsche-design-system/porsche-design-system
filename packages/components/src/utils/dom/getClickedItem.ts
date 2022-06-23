import { getPrefixedTagNames } from '../tag-name';
import { TagNameCamelCase } from 'shared/src';

export const getClickedItem = <T>(
  host: HTMLElement,
  tagName: TagNameCamelCase,
  targets: EventTarget[]
): HTMLElement & T => {
  const item = getPrefixedTagNames(host)[tagName];
  return targets.find((x: HTMLElement) => x.tagName?.toLowerCase() === item) as unknown as HTMLElement & T;
};
