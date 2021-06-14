// import { getPrefixedTagNames, getTagName } from '../../../utils';

import { HeadlineTag } from '../../basic/typography/headline/headline-utils';

const PANEL_SIZE = ['small', 'medium'] as const;
export type PanelSize = typeof PANEL_SIZE[number];
export type PanelStateChangeEvent = { open: boolean };

// export const getHasPAccordionParent = (hostEl: HTMLElement): boolean => {
//   const { host } = hostEl.getRootNode() as ShadowRoot;
//   const parentTagName = host && getTagName(host as HTMLElement);
//   return parentTagName === getPrefixedTagNames(hostEl).pAccordion;
// };

export const getTitleTag = (tag?: HeadlineTag): string => {
  return tag ? tag : 'h2';
};

export const generateGUID = (): string => {
  const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
