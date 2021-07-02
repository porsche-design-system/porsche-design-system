import { addImportantToEachRule, buildGlobalStyles, getCss, getTagName, JssStyle } from '../../../utils';
import { P_ANIMATION_HOVER_DURATION } from '../../../styles';
import { color } from '@porsche-design-system/utilities';

const ACCORDION_SIZE = ['small', 'medium'] as const;
export type AccordionSize = typeof ACCORDION_SIZE[number];
export type AccordionChangeEvent = { open: boolean };

const slottedStyles: JssStyle = addImportantToEachRule({
  '& a': {
    color: 'inherit',
    textDecoration: 'underline',
    transition: `color ${P_ANIMATION_HOVER_DURATION} ease`,
    outline: 'transparent solid 1px',
    outlineOffset: '1px',
    '&:hover': {
      color: `${color.state.hover}`,
    },
    '&:focus': {
      outlineColor: 'currentColor',
    },
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent',
    },
  },

  '& em, & i': {
    fontStyle: 'normal',
  },
});

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildGlobalStyles({
      [`${getTagName(host)} [slot="heading"]`]: slottedStyles,
    })
  );
};
