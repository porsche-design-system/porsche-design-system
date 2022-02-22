import { JssStyle } from 'jss';
import { pxToRemWithUnit } from '../common-styles';
import { getThemedColors } from '../colors';

export const PDS_SKELETON_CLASS_PREFIX = 'PDS-Skeleton--';

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
  return `linear-gradient(transparent, transparent ${topGradientSpacing}, currentColor ${topGradientSpacing}, currentColor ${bottomGradientSpacing}, transparent ${bottomGradientSpacing}, transparent ${elHeight}px)`;
};
// TODO: remove color theme placeholder, use currentColor, adjust color in before/after based on theme property OR skeletonClass
// TODO: check return types (check focus jss styles)

export const getPseudoElementStyles = (): JssStyle => {
  return {
    position: 'absolute',
    left: '0',
    content: '""',
    visibility: 'visible',
    background: 'currentColor',
    animation: 'opacity 1.5s ease-in-out infinite',
  };
};

export const getBaseSkeletonStyles = (withLabel = true, elementHeight = ELEMENT_SKELETON_HEIGHT): JssStyle => {
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

const pseudoElementSelectors = ['&::before', '&::after'];
type PseudoElementSelectors = typeof pseudoElementSelectors;

export const extendPseudoWithTheme = (
  theme: 'light' | 'dark',
  stylesFunction: () => JssStyle = () => ({}),
  pseudosToExtend: PseudoElementSelectors = ['&::before', '&::after']
): JssStyle => {
  return {
    ...stylesFunction(),
    ...pseudosToExtend.reduce((prevValue: JssStyle, pseudo) => {
      return {
        ...prevValue,
        [pseudo]: {
          ...stylesFunction()[pseudo],
          color: getThemedColors(theme).contrastMediumColor,
        },
      };
    }, {} as JssStyle),
  };
};
