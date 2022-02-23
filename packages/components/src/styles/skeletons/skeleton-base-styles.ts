import { JssStyle } from 'jss';
import { pxToRemWithUnit } from '../common-styles';
import { getThemedColors } from '../colors';

export const PDS_SKELETON_CLASS_PREFIX = 'PDS-Skeleton--';

// Firefox has the widest input field with 192px
// to prevent layout shift when shadow dom is appended
export const BUTTON_LINK_SKELETON_WIDTH = 192;

export const ELEMENT_SKELETON_DIMENSION = 48;
const LABEL_HEIGHT = 24;
const LABEL_HEIGHT_WITH_SPACING = 28;
const LABEL_HEIGHT_SPACING = 4;

export const getSkeletonElementHeight = (height: number, withLabel = true): string =>
  withLabel ? pxToRemWithUnit(height + LABEL_HEIGHT_WITH_SPACING) : pxToRemWithUnit(height);

export const getElementBackgroundGradient = (elHeight: number, topGradientSpacing = LABEL_HEIGHT_SPACING) => {
  const topGradientSpacingPx = `${topGradientSpacing}px`;
  const bottomGradientSpacingPx = `${elHeight - topGradientSpacing}px`;
  return `linear-gradient(transparent, transparent ${topGradientSpacingPx}, currentColor ${topGradientSpacingPx}, currentColor ${bottomGradientSpacingPx}, transparent ${bottomGradientSpacingPx}, transparent ${elHeight}px)`;
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

export const getBaseSkeletonStyles = (withLabel = true, elementHeight = ELEMENT_SKELETON_DIMENSION): JssStyle => {
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

const PSEUDO_ELEMENT_SELECTORS = ['&::before', '&::after'] as const;
type PseudoElementSelectorsType = typeof PSEUDO_ELEMENT_SELECTORS[number];

type ExtendPseudoWithThemeOptions = {
  theme?: 'light' | 'dark';
  stylesFunction?: () => JssStyle;
  pseudosToExtend?: PseudoElementSelectorsType[];
};
export const extendPseudoWithTheme = (opts?: ExtendPseudoWithThemeOptions): JssStyle => {
  const { theme = 'light', stylesFunction = () => ({}), pseudosToExtend = ['&::after'] } = opts ?? {};

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

export const getThemedPseudoStyles = (hasLabel?: boolean): JssStyle => {
  let pseudoElements: PseudoElementSelectorsType[];
  if (hasLabel) {
    pseudoElements = ['&::before', '&::after'];
  }
  return {
    [`&[theme=dark], &.${PDS_SKELETON_CLASS_PREFIX}theme-dark`]: {
      ...extendPseudoWithTheme({ theme: 'dark', pseudosToExtend: pseudoElements }),
    },
  };
};
