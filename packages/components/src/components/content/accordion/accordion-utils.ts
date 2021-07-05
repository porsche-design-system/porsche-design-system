import {
  addImportantToEachRule,
  buildGlobalStyles,
  getCss,
  getFocusStyles,
  getHoverStyles,
  getTagName,
  JssStyle,
  pxToRemWithUnit,
} from '../../../utils';

const ACCORDION_SIZE = ['small', 'medium'] as const;
export type AccordionSize = typeof ACCORDION_SIZE[number];
export type AccordionChangeEvent = { open: boolean };

const slottedStyles: JssStyle = addImportantToEachRule({
  '& a': {
    color: 'inherit',
    textDecoration: 'underline',
    ...getFocusStyles({ offset: 1, color: 'currentColor' }),
    ...getHoverStyles(),
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

export const getCollapsibleElementHeight = (isOpen: boolean, contentWrapperHeight: string): string => {
  return isOpen ? contentWrapperHeight : '0';
};

export const getContentWrapperHeight = (
  borderBoxSize: ResizeObserverSize | readonly ResizeObserverSize[],
  contentRect: DOMRectReadOnly
): string => {
  let contentBlockHeight;

  // Safari does not support borderBoxSize
  if (!borderBoxSize) {
    contentBlockHeight = contentRect.height;
  } else {
    // Firefox implements `borderBoxSize` as a single content rect, rather than an array
    const { blockSize } = Array.isArray(borderBoxSize) ? borderBoxSize[0] : borderBoxSize;
    contentBlockHeight = blockSize;
  }
  return pxToRemWithUnit(contentBlockHeight);
};
