import { JssStyle } from 'jss';
import { pxToRemWithUnit } from '../common-styles';
import { getThemedColors } from '../colors';
import { INPUT_HEIGHT } from '../form-styles';
import { getComponentMeta, TagName } from '@porsche-design-system/shared';
import { paramCase } from 'change-case';

export type SkeletonPropertyName = { [property: string]: string };

export const PDS_SKELETON_CLASS_PREFIX = 'PDS-Skeleton--';

// Firefox has the widest input field with 192px
// to prevent layout shift when shadow dom is appended
export const BUTTON_LINK_SKELETON_WIDTH = 192;
export const TEXTAREA_SKELETON_HEIGHT = 192;
export const ELEMENT_SKELETON_DIMENSION = INPUT_HEIGHT;
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

export const getAfterMinHeight = (elementHeight: number): string => `calc(100% - ${pxToRemWithUnit(elementHeight)})`;

export const getElementBackgroundGradient = (
  elementHeight: number, // !== 52 || !== 24 => not a label => no description
  topGradientSpacing = LABEL_HEIGHT_SPACING, // !== 4 => label => no height needed
  hasDescription?: boolean // true => label => no height needed
): string => {
  // calculate the "gap" at the top and bottom of the gradient
  const topGradientSpacingPx = `${topGradientSpacing}px`;
  const descriptionBottomSpacing = 8;
  const bottomGradientSpacingPx = `${(hasDescription ? LABEL_HEIGHT : elementHeight) - topGradientSpacing}px`;
  const topDescriptionGradientSpacingPx = `${LABEL_HEIGHT + LABEL_HEIGHT_SPACING}px`;
  const bottomDescriptionGradientSpacingPx = `${elementHeight - descriptionBottomSpacing - LABEL_HEIGHT_SPACING}px`;

  // by using a gradient we can "simulate" text with a specific line height inside an element
  return `linear-gradient(transparent, transparent ${topGradientSpacingPx}, currentColor ${topGradientSpacingPx}, currentColor ${bottomGradientSpacingPx}, transparent ${bottomGradientSpacingPx},${
    hasDescription
      ? ` transparent ${topDescriptionGradientSpacingPx}, currentColor ${topDescriptionGradientSpacingPx}, currentColor ${bottomDescriptionGradientSpacingPx}, transparent ${bottomDescriptionGradientSpacingPx},`
      : ''
  } transparent ${elementHeight}px)`;
};

export const getPseudoElementStyle = (): JssStyle => {
  return {
    position: 'absolute',
    left: '0',
    content: '""',
    visibility: 'visible',
    background: 'currentColor',
    animation: 'opacity var(--p-override-skeleton-animation-duration, 1.5s) ease-in-out infinite',
  };
};

export const getBaseSkeletonStyle = (hasLabel = true, elementHeight = ELEMENT_SKELETON_DIMENSION): JssStyle => {
  return {
    position: 'relative',
    color: 'transparent',
    ...(hasLabel
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
      ...(!hasLabel && {
        display: 'block',
      }),
      ...getPseudoElementStyle(),
      top: pxToRemWithUnit(hasLabel ? LABEL_HEIGHT_WITH_SPACING : 0),
      width: '100%',
      minHeight: hasLabel ? getAfterMinHeight(LABEL_HEIGHT_WITH_SPACING) : '100%',
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

export const getHiddenLabelStyle = (): JssStyle => ({
  height: getSkeletonElementHeight(ELEMENT_SKELETON_DIMENSION, false),
  '&::before': {
    content: 'none',
  },
  '&::after': {
    top: 0,
    minHeight: '100%',
  },
});

export const getSkeletonPropertyNames = (tagName: TagName) => {
  return getComponentMeta(tagName).skeletonProps.reduce((prev, current) => {
    return { ...prev, [current.propName]: paramCase(current.propName) };
  }, {} as SkeletonPropertyName);
};
