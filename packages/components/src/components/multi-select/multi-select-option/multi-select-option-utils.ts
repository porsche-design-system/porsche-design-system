import type { Theme } from '../../../types';

export type MultiSelectOptionInternalHTMLProps = {
  theme?: Theme;
};

export const getOptionIndex = (host: HTMLElement): number => Array.from(host.parentElement.children).indexOf(host);
