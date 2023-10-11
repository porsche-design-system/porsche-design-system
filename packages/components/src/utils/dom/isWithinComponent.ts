import { getPrefixedTagNames, PrefixedTagNames } from '../tag-name';

export const isWithinComponent = (host: HTMLElement, component: keyof PrefixedTagNames): HTMLElement | null =>
  host.closest(getPrefixedTagNames(host)[component]);
