import { JssStyle } from 'jss';
import { pxToRemWithUnit } from '../common-styles';
import { getThemedColors } from '../colors';

export const PDS_SKELETON_CLASS_PREFIX = 'PDS-Skeleton--';

// Firefox has the widest input field with 192px
// to prevent layout shift when shadow dom is appended
export const BUTTON_LINK_SKELETON_WIDTH = 192;
export const TEXTAREA_SKELETON_HEIGHT = 192;
export const ELEMENT_SKELETON_DIMENSION = 48;
export const LABEL_HEIGHT_WITH_DESCRIPTION = 52;
export const LABEL_HEIGHT_SPACING = 4;

export const LABEL_HEIGHT = 24;
const LABEL_HEIGHT_WITH_SPACING = 28;

export const getSkeletonElementHeight = (height: number, withLabel = true, withDescription?: boolean): string => {
  if (withLabel) {
    if (withDescription) {
      return pxToRemWithUnit(height + LABEL_HEIGHT_WITH_DESCRIPTION);
    } else {
      return pxToRemWithUnit(height + LABEL_HEIGHT_WITH_SPACING);
    }
  } else if (withDescription) {
    return pxToRemWithUnit(height + LABEL_HEIGHT);
  } else {
    return pxToRemWithUnit(height);
  }
};

export const getAfterMinHeight = (elHeight: number): string => `calc(100% - ${pxToRemWithUnit(elHeight)})`;

export const getElementBackgroundGradient = (
  elHeight: number,
  topGradientSpacing = LABEL_HEIGHT_SPACING,
  hasDescription?: boolean
) => {
  const topGradientSpacingPx = `${topGradientSpacing}px`;
  const descriptionBottomSpacing = 8;
  const bottomGradientSpacingPx = `${(hasDescription ? LABEL_HEIGHT : elHeight) - topGradientSpacing}px`;
  const topDescriptionGradientSpacingPx = `${LABEL_HEIGHT + LABEL_HEIGHT_SPACING}px`;
  const bottomDescriptionGradientSpacingPx = `${elHeight - descriptionBottomSpacing - LABEL_HEIGHT_SPACING}px`;
  return `linear-gradient(transparent, transparent ${topGradientSpacingPx}, currentColor ${topGradientSpacingPx}, currentColor ${bottomGradientSpacingPx}, transparent ${bottomGradientSpacingPx},${
    hasDescription
      ? `transparent ${topDescriptionGradientSpacingPx}, currentColor ${topDescriptionGradientSpacingPx}, currentColor ${bottomDescriptionGradientSpacingPx}, transparent ${bottomDescriptionGradientSpacingPx},`
      : ''
  } transparent ${elHeight}px)`;
};

// TODO: remove color theme placeholder, use currentColor, adjust color in before/after based on theme property OR skeletonClass
// TODO: check return types (check focus jss styles)

export const getPseudoElementStyle = (): JssStyle => {
  return {
    position: 'absolute',
    left: '0',
    content: '""',
    visibility: 'visible',
    background: 'currentColor',
    animation: 'opacity 1.5s ease-in-out infinite',
  };
};

export const getBaseSkeletonStyle = (withLabel = true, elementHeight = ELEMENT_SKELETON_DIMENSION): JssStyle => {
  return {
    position: 'relative',
    color: 'transparent',
    ...(withLabel
      ? {
          display: 'block',
          '&::before': {
            ...getPseudoElementStyle(),
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
      ...getPseudoElementStyle(),
      top: pxToRemWithUnit(withLabel ? LABEL_HEIGHT_WITH_SPACING : 0),
      width: '100%',
      minHeight: withLabel ? getAfterMinHeight(LABEL_HEIGHT_WITH_SPACING) : '100%',
    },
  };
};

const PSEUDO_ELEMENT_SELECTORS = ['&::before', '&::after'] as const;
type PseudoElementSelectorsType = typeof PSEUDO_ELEMENT_SELECTORS[number];

type ExtendPseudoWithThemeOptions = {
  theme?: 'light' | 'dark';
  styleFunction?: () => JssStyle;
  pseudosToExtend?: PseudoElementSelectorsType[];
};
export const extendPseudoWithTheme = (opts?: ExtendPseudoWithThemeOptions): JssStyle => {
  const { theme = 'light', styleFunction = () => ({}), pseudosToExtend = ['&::after'] } = opts ?? {};

  return {
    ...styleFunction(),
    ...pseudosToExtend.reduce((prevValue: JssStyle, pseudo) => {
      return {
        ...prevValue,
        [pseudo]: {
          ...styleFunction()[pseudo],
          color: getThemedColors(theme).contrastMediumColor,
        },
      };
    }, {} as JssStyle),
  };
};

export const getThemedPseudoStyle = (hasLabel?: boolean): JssStyle => {
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
