import {
  borderRadiusSmall,
  frostedGlassStyle,
  spacingStaticXSmall,
  textXSmallStyle,
} from '@porsche-design-system/styles';
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
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { Theme } from '../../types';
import { getCss, isHighContrastMode } from '../../utils';
import { getThemedBackgroundColor } from './tag-shared-utils';
import { getThemedBackgroundHoverColor, type TagColor } from './tag-utils';

export const getColors = (
  tagColor: TagColor,
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
  tagColor: TagColor,
  compact: boolean,
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
      ...preventFoucOfNestedElementsStyles,
      span: {
        position: 'relative', // necessary as relative anchor to ensure click area of optional slotted focusable element is in sync
        display: 'flex',
        gap: '2px',
        padding: compact ? '1px 6px' : `${spacingStaticXSmall} 9px`,
        borderRadius: borderRadiusSmall,
        font: textXSmallStyle.font,
        color: textColor,
        background: backgroundColor,
        ...(isBackgroundFrosted && frostedGlassStyle),
        ...(isHighContrastMode && {
          outline: '1px solid transparent',
        }),
        transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`, // transition style should always be applied to have a smooth color change in case color prop gets updated during runtime
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: textColorDark,
          background: backgroundColorDark,
        }),
        ...(isFocusable &&
          hoverMediaQuery({
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
        '&(br)': {
          display: 'none',
        },
      }),
    },
    ...(hasIcon && {
      icon: {
        marginInlineStart: '-2px', // compensate white space of svg icon and optimize visual alignment
        ...(!isHighContrastMode &&
          tagColor === 'primary' && {
            filter: 'invert(1)',
          }),
      },
    }),
  });
};
