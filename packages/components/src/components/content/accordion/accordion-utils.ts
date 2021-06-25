import type { TextWeight } from '../../../types';
import { buildGlobalStyles, getCss, getTagName } from '../../../utils';
import { P_ANIMATION_HOVER_DURATION } from '../../../styles';
import type { JssStyle } from 'jss';
import { color } from '@porsche-design-system/utilities';

const ACCORDION_SIZE = ['small', 'medium'] as const;
export type AccordionSize = typeof ACCORDION_SIZE[number];
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

//ToDo: use resize observer? https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
export const setCollapsibleHeight = (
  collapsibleElement: HTMLElement,
  contentElement: HTMLElement,
  isOpen: boolean
): void => {
  const contentInnerHeight = contentElement.scrollHeight;

  if (isOpen) {
    collapsibleElement.style.height = `${contentInnerHeight}px`;

    collapsibleElement.addEventListener(
      'transitionend',
      () => {
        collapsibleElement.style.height = null;
      },
      { once: true }
    );
  } else {
    const transition = collapsibleElement.style.transition;
    collapsibleElement.style.transition = '';

    requestAnimationFrame(() => {
      collapsibleElement.style.height = `${contentInnerHeight}px`;
      collapsibleElement.style.transition = transition;

      requestAnimationFrame(() => {
        collapsibleElement.style.height = '0px';
      });
    });
  }
};
