// import { getPrefixedTagNames, getTagName } from '../../../utils';

const PANEL_SIZE = ['small', 'medium'] as const;
export type PanelSize = typeof PANEL_SIZE[number];
export type PanelStateChangeEvent = { open: boolean };

// export const getHasPAccordionParent = (hostEl: HTMLElement): boolean => {
//   const { host } = hostEl.getRootNode() as ShadowRoot;
//   const parentTagName = host && getTagName(host as HTMLElement);
//   return parentTagName === getPrefixedTagNames(hostEl).pAccordion;
// };
