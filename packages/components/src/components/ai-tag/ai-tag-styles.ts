import { borderRadiusSmall, frostedGlassStyle, textXXSmallStyle } from '@porsche-design-system/styles';
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
import { AI_TAG_ICON_PATH } from './ai-tag-utils';

export const getComponentCss = (theme: Theme): string => {
  const { backgroundFrostedColor, contrastHighColor } = getThemedColors(theme);
  const { backgroundFrostedColor: backgroundFrostedColorDark, contrastHighColor: contrastHighColorDark } =
    getThemedColors('dark');

  const iconMask = `${getInlineSVGBackgroundImage(AI_TAG_ICON_PATH)} center/contain no-repeat`;

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
      abbr: {
        textDecoration: 'none',
      },
    },
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
      padding: '1px 6px 1px 4px',
      borderRadius: borderRadiusSmall,
      font: textXXSmallStyle.font,
      color: contrastHighColor,
      background: backgroundFrostedColor,
      ...frostedGlassStyle,
      ...(isHighContrastMode && {
        outline: '1px solid transparent',
      }),
      transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastHighColorDark,
        background: backgroundFrostedColorDark,
      }),
    },
    icon: {
      display: 'inline-block',
      width: '1rem',
      height: '1rem',
      backgroundColor: contrastHighColor,
      mask: iconMask,
      WebkitMask: iconMask,
      flexShrink: 0,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: contrastHighColorDark,
      }),
    },
  });
};
