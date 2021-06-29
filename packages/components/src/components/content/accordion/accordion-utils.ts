import { buildGlobalStyles, getCss, getTagName } from '../../../utils';
import { P_ANIMATION_HOVER_DURATION } from '../../../styles';
import type { JssStyle } from 'jss';
import { color } from '@porsche-design-system/utilities';

const ACCORDION_SIZE = ['small', 'medium'] as const;
export type AccordionSize = typeof ACCORDION_SIZE[number];
export type AccordionChangeEvent = { open: boolean };

const slottedStyles: JssStyle = {
  '& a': {
    color: 'inherit !important',
    textDecoration: 'underline !important',
    transition: `color ${P_ANIMATION_HOVER_DURATION} ease !important`,
    outline: 'transparent solid 1px !important',
    outlineOffset: '1px !important',
    '&:hover': {
      color: `${color.state.hover} !important`,
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
