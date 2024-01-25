import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
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
import { getThemedBackgroundColor } from '../tag/tag-shared-utils';
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
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          outline: 0,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      button: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        gap: '12px',
        minHeight: '54px',
        padding: '4px 12px',
        margin: 0, // Removes default button margin on safari 15
        borderRadius: borderRadiusSmall,
        border: 0,
        cursor: 'pointer',
        background: backgroundColor,
        color: primaryColor,
        textAlign: 'start',
        ...textSmallStyle,
        outline: isHighContrastMode ? '1px solid transparent' : 0,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
          color: primaryColorDark,
        }),
        ...hoverMediaQuery({
          '&:hover > .icon': {
            backgroundColor: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: hoverColorDark,
            }),
          },
        }),
        ...getFocusJssStyle(theme),
      },
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: '-4px',
        color: contrastHighColor,
        fontSize: fontSizeTextXSmall,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: contrastHighColorDark,
        }),
      },
    }),
    icon: {
      padding: '4px',
      marginInlineEnd: '-2px', // compensate white space of svg icon and optimize visual alignment
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
