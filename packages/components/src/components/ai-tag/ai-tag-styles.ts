import { borderRadiusSmall, frostedGlassStyle, textXSmallStyle } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import type { Theme } from '../../types';
import { getCss, isHighContrastMode } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { AI_TAG_ICON_PATHS, type AiTagIcon } from './ai-tag-utils';

const getIconMask = (icon: AiTagIcon): string => {
  return `${getInlineSVGBackgroundImage(AI_TAG_ICON_PATHS[icon])} center/contain no-repeat`;
};

export const getComponentCss = (icon: AiTagIcon, theme: Theme): string => {
  const { primaryColor, backgroundFrostedColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundFrostedColor: backgroundFrostedColorDark } =
    getThemedColors('dark');

  const iconMask = getIconMask(icon);

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        whiteSpace: 'nowrap',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      'span:not(.icon)': {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '1px 6px',
        borderRadius: borderRadiusSmall,
        font: textXSmallStyle.font,
        color: primaryColor,
        background: backgroundFrostedColor,
        ...frostedGlassStyle,
        ...(isHighContrastMode && {
          outline: '1px solid transparent',
        }),
        transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
          background: backgroundFrostedColorDark,
        }),
      },
    },
    icon: {
      display: 'inline-block',
      width: '1rem',
      height: '1rem',
      backgroundColor: primaryColor,
      mask: iconMask,
      WebkitMask: iconMask,
      flexShrink: 0,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: primaryColorDark,
      }),
    },
  });
};
