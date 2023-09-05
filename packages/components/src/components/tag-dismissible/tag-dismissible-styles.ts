import {
  addImportantToEachRule,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getCss, isHighContrastMode } from '../../utils';
import type { TagDismissibleColor, TagDismissibleColorDeprecated } from './tag-dismissible-utils';
import { borderRadiusSmall, fontSizeTextXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getTagFocusJssStyle, getThemedBackgroundColor } from '../tag/tag-shared-utils';
import type { Theme } from '../../types';

export const getComponentCss = (
  color: Exclude<TagDismissibleColor, TagDismissibleColorDeprecated>,
  hasLabel: boolean,
  theme: Theme
): string => {
  const themedColors = getThemedColors(theme);
  const themedColorsDark = getThemedColors('dark');
  const { primaryColor, hoverColor, contrastHighColor } = themedColors;
  const {
    primaryColor: primaryColorDark,
    hoverColor: hoverColorDark,
    contrastHighColor: contrastHighColorDark,
  } = themedColorsDark;
  const backgroundColor = getThemedBackgroundColor(color, themedColors);
  const backgroundColorDark = getThemedBackgroundColor(color, themedColorsDark);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'inline-block',
        verticalAlign: 'top',
        outline: 0,
        ...hostHiddenStyles,
      }),
      button: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        gap: '12px',
        minHeight: '54px',
        padding: '4px 0 4px 12px',
        borderRadius: borderRadiusSmall,
        border: 0,
        cursor: 'pointer',
        background: backgroundColor,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
          color: primaryColorDark,
        }),
        textAlign: 'left',
        ...textSmallStyle,
        outline: isHighContrastMode ? '1px solid transparent' : 0,
        ...getTagFocusJssStyle(themedColors),
        ...hoverMediaQuery({
          '&:hover > .icon': {
            backgroundColor: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: hoverColorDark,
            }),
          },
        }),
      },
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: '-4px',
        color: contrastHighColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: contrastHighColorDark,
        }),
        fontSize: fontSizeTextXSmall,
      },
    }),
    icon: {
      padding: '4px',
      marginRight: '10px',
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
