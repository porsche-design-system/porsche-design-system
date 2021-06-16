// import { getPrefixedTagNames, getTagName } from '../../../utils';

import { HeadlineTag } from '../../basic/typography/headline/headline-utils';

const PANEL_SIZE = ['small', 'medium'] as const;
export type PanelSize = typeof PANEL_SIZE[number];
export type PanelChangeEvent = { open: boolean };

// export const getHasPAccordionParent = (hostEl: HTMLElement): boolean => {
//   const { host } = hostEl.getRootNode() as ShadowRoot;
//   const parentTagName = host && getTagName(host as HTMLElement);
//   return parentTagName === getPrefixedTagNames(hostEl).pAccordion;
// };

export const getTitleTag = (tag?: HeadlineTag): string => {
  return tag ? tag : 'h2';
};
