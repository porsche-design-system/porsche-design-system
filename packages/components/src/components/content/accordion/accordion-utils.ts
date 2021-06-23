import { TextWeight } from '../../../types';
import { buildGlobalStyles, getCss, getTagName } from '../../../utils';
import { P_ANIMATION_HOVER_DURATION } from '../../../styles';
import type { JssStyle } from 'jss';

const ACCORDION_HEADER_SIZE = ['small', 'medium'] as const;
export type AccordionHeaderSize = typeof ACCORDION_HEADER_SIZE[number];
export type AccordionChangeEvent = { open: boolean };
export type AccordionWeight = Extract<TextWeight, 'regular' | 'semibold'>;

const slottedStyles: JssStyle = {
  '& a': {
    color: 'inherit !important',
    textDecoration: 'underline !important',
    transition: `color ${P_ANIMATION_HOVER_DURATION} ease !important`,
    outline: 'transparent solid 1px !important',
    outlineOffset: '1px !important',
    '&:hover': {
      color: '#d5001c !important',
    },
    '&:focus': {
      outlineColor: 'currentColor !important',
    },
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent !important',
    },
  },
  '& em, & i': {
    fontStyle: 'normal !important',
  },
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildGlobalStyles({
      [`${getTagName(host)} [slot="heading"]`]: slottedStyles,
    })
  );
};
