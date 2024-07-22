import { borderRadiusSmall, frostedGlassStyle, textXSmallStyle } from '@porsche-design-system/styles';
import { type Theme } from '../../types';
import { getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getInvertedThemedColors,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getThemedBackgroundColor } from './tag-shared-utils';
import { type TagColor, type TagColorDeprecated, getThemedBackgroundHoverColor } from './tag-utils';

export const getColors = (
  tagColor: Exclude<TagColor, TagColorDeprecated>,
  theme: Theme
): {
  textColor: string;
  backgroundColor: string;
  backgroundHoverColor: string;
} => {
  const themedColors = getThemedColors(theme);
  const { primaryColor } = tagColor === 'primary' ? getInvertedThemedColors(theme) : themedColors;

  return {
    textColor: primaryColor,
    backgroundColor: getThemedBackgroundColor(tagColor, themedColors),
    backgroundHoverColor: getThemedBackgroundHoverColor(tagColor, themedColors, theme),
  };
};

export const getComponentCss = (
  tagColor: Exclude<TagColor, TagColorDeprecated>,
  isFocusable: boolean,
  hasIcon: boolean,
  theme: Theme
): string => {
  const { textColor, backgroundColor, backgroundHoverColor } = getColors(tagColor, theme);
  const {
    textColor: textColorDark,
    backgroundColor: backgroundColorDark,
    backgroundHoverColor: backgroundHoverColorDark,
  } = getColors(tagColor, 'dark');
  const isBackgroundFrosted = tagColor === 'background-frosted';

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top', // TODO: should we set this CSS style at all?
        whiteSpace: 'nowrap', // TODO: should either be exposed by a controlled CSS variable or a component prop or whitelist as supported custom styles
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      span: {
        position: 'relative', // necessary as relative anchor to ensure click area of optional slotted focusable element is in sync
        display: 'flex',
        gap: '2px',
        padding: '4px 9px',
        borderRadius: borderRadiusSmall,
        font: textXSmallStyle.font,
        color: textColor,
        background: backgroundColor,
        ...(isBackgroundFrosted && frostedGlassStyle),
        ...(isHighContrastMode && {
          outline: '1px solid transparent',
        }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: textColorDark,
          background: backgroundColorDark,
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
        ...(isFocusable && {
          '&(a),&(button)': {
            all: 'unset', // resets any ua-style + custom style set in light dom
            textDecoration: 'underline',
            cursor: 'pointer',
            font: 'inherit',
            color: 'inherit',
          },
          '&(a)::before,&(button)::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '4px',
          },
          ...getFocusJssStyle(theme, { slotted: 'a', pseudo: true }),
          ...getFocusJssStyle(theme, { slotted: 'button', pseudo: true }),
        }),
        '&(br)': {
          display: 'none',
        },
      }),
    },
    ...(hasIcon && {
      icon: {
        marginInlineStart: '-2px', // compensate white space of svg icon and optimize visual alignment
        filter: !isHighContrastMode && tagColor === 'primary' ? 'invert(1)' : null,
      },
    }),
  });
};
