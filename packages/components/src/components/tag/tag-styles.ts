import { getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getInvertedThemedColors,
  getResetInitialStylesForSlottedAnchor,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  type ThemedColors,
} from '../../styles';
import { borderRadiusSmall, textXSmallStyle } from '@porsche-design-system/utilities-v2';
import type { TagColor, TagColorDeprecated } from './tag-utils';
import { getThemedBackgroundHoverColor } from './tag-utils';
import type { Theme } from '../../types';
import { getThemedBackgroundColor } from './tag-shared-utils';

export const getColors = (
  themedColors: ThemedColors,
  tagColor: Exclude<TagColor, TagColorDeprecated>,
  theme: Theme
): {
  primaryColor: string;
  backgroundColor: string;
  backgroundHoverColor: string;
} => {
  const { primaryColor } = tagColor === 'primary' ? getInvertedThemedColors(theme) : themedColors;

  return {
    primaryColor,
    backgroundColor: getThemedBackgroundColor(tagColor, themedColors),
    backgroundHoverColor: getThemedBackgroundHoverColor(tagColor, themedColors, theme),
  };
};

export const getComponentCss = (
  tagColor: Exclude<TagColor, TagColorDeprecated>,
  isFocusable: boolean,
  theme: Theme
): string => {
  const themedColors = getThemedColors(theme);
  const themedColorsDark = getThemedColors('dark');
  const { primaryColor, backgroundColor, backgroundHoverColor } = getColors(themedColors, tagColor, theme);
  const {
    primaryColor: primaryColorDark,
    backgroundColor: backgroundColorDark,
    backgroundHoverColor: backgroundHoverColorDark,
  } = getColors(themedColorsDark, tagColor, 'dark');

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
      span: {
        display: 'flex',
        gap: '2px',
        alignItems: 'center',
        position: 'relative',
        padding: '4px 9px',
        borderRadius: borderRadiusSmall,
        background: backgroundColor,
        color: primaryColor,
        font: textXSmallStyle.font,
        ...(isHighContrastMode && {
          outline: '1px solid transparent',
        }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
          color: primaryColorDark,
        }),
        ...(isFocusable &&
          hoverMediaQuery({
            transition: getTransition('background-color'),
            '&:hover': {
              background: backgroundHoverColor,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                background: backgroundHoverColorDark,
              }),
            },
          })),
      },
      '::slotted': addImportantToEachRule({
        '&(a),&(button)': {
          ...getResetInitialStylesForSlottedAnchor,
          display: 'inline',
          position: 'static',
          textDecoration: 'underline',
          cursor: 'pointer',
          font: 'inherit',
          color: 'inherit',
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          border: 0,
          textAlign: 'start',
        },
        '&(a)::before,&(button)::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '4px',
        },
        ...getFocusJssStyle(theme, { prefix: 'a', slotted: true, pseudo: true }),
        ...getFocusJssStyle(theme, { prefix: 'button', slotted: true, pseudo: true }),
        '&(br)': {
          display: 'none',
        },
      }),
    },
    icon: {
      marginInlineStart: '-2px', // compensate white space of svg icon and optimize visual alignment
      alignSelf: 'flex-start',
      ...(['neutral-contrast-high', 'primary'].includes(tagColor) && {
        ...prefersColorSchemeDarkMediaQuery(theme, {
          filter: 'invert(1)',
        }),
      }),
    },
  });
};
