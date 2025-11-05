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
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getCss, isHighContrastMode } from '../../utils';
import { getThemedBackgroundColor, getThemedBackgroundHoverColor2, getThemedTextColor } from './tag-shared-utils';
import type { TagColor } from './tag-utils';

export const getColors = (
  tagColor: TagColor
): {
  textColor: string;
  backgroundColor: string;
  backgroundHoverColor: string;
} => {
  return {
    textColor: getThemedTextColor(tagColor),
    backgroundColor: getThemedBackgroundColor(tagColor),
    backgroundHoverColor: getThemedBackgroundHoverColor2(tagColor),
  };
};

export const getComponentCss = (
  tagColor: TagColor,
  compact: boolean,
  isFocusable: boolean,
  hasIcon: boolean
): string => {
  const { textColor, backgroundColor, backgroundHoverColor } = getColors(tagColor);

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
        ...frostedGlassStyle,
        color: textColor,
        background: backgroundColor,
        transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`, // transition style should always be applied to have a smooth color change in case color prop gets updated during runtime
        ...(isFocusable &&
          hoverMediaQuery({
            '&:hover': {
              background: backgroundHoverColor,
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
        ...getFocusJssStyle({ slotted: 'a', pseudo: true }),
        ...getFocusJssStyle({ slotted: 'button', pseudo: true }),
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
