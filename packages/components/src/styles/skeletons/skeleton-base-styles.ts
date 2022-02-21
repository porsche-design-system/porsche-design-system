import { Styles } from 'jss';
import { pxToRemWithUnit } from '../common-styles';

export const SKELETON_COLOR_THEME_PLACEHOLDER = 'PDS_REPLACE_WITH_THEME_COLOR';

// Firefox has the widest input field with 192px
// to prevent layout shift when shadow dom is appended
export const BUTTON_LINK_SKELETON_WIDTH = 192;

export const ELEMENT_SKELETON_HEIGHT = 48;
export const LABEL_HEIGHT = 24;
export const LABEL_HEIGHT_WITH_SPACING = 28;
export const LINE_HEIGHT_SPACING = 6;
export const LINE_HEIGHT_SPACING_SMALL = 4;
export const SMALL_TEXT_HEIGHT = 28;

export const getSkeletonElementHeight = (height: number, withLabel = true): string =>
  withLabel ? pxToRemWithUnit(height + LABEL_HEIGHT_WITH_SPACING) : pxToRemWithUnit(height);

export const getElementBackgroundGradient = (elHeight: number) => {
  const topGradientSpacing = `${elHeight > SMALL_TEXT_HEIGHT ? LINE_HEIGHT_SPACING : LINE_HEIGHT_SPACING_SMALL}px`;
  const bottomGradientSpacing = `${
    elHeight > SMALL_TEXT_HEIGHT ? elHeight - LINE_HEIGHT_SPACING : elHeight - LINE_HEIGHT_SPACING_SMALL
  }px`;
  return `linear-gradient(transparent, transparent ${topGradientSpacing}, ${SKELETON_COLOR_THEME_PLACEHOLDER} ${topGradientSpacing}, ${SKELETON_COLOR_THEME_PLACEHOLDER} ${bottomGradientSpacing}, transparent ${bottomGradientSpacing}, transparent ${elHeight}px)`;
};

export const getPseudoElementStyles = (): Styles => {
  return {
    position: 'absolute',
    left: '0',
    content: '""',
    visibility: 'visible',
    background: `${SKELETON_COLOR_THEME_PLACEHOLDER}`,
    animation: 'opacity 1.5s ease-in-out infinite',
  };
};

export const getBaseSkeletonStyles = (withLabel = true, elementHeight = ELEMENT_SKELETON_HEIGHT): Styles => {
  return {
    position: 'relative',
    color: 'transparent',
    ...(withLabel
      ? {
          display: 'block',
          '&::before': {
            ...getPseudoElementStyles(),
            height: pxToRemWithUnit(LABEL_HEIGHT),
            width: pxToRemWithUnit(128),
            top: '0',
            background: getElementBackgroundGradient(LABEL_HEIGHT),
          },
        }
      : {
          minHeight: pxToRemWithUnit(elementHeight),
        }),
    '&::after': {
      ...(!withLabel && {
        display: 'block',
      }),
      ...getPseudoElementStyles(),
      top: pxToRemWithUnit(withLabel ? LABEL_HEIGHT_WITH_SPACING : 0),
      width: '100%',
      minHeight: withLabel
        ? `calc(100% - ${pxToRemWithUnit(LABEL_HEIGHT_WITH_SPACING)})`
        : pxToRemWithUnit(elementHeight),
    },
  };
};
