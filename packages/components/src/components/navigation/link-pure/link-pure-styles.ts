import {
  addImportantToRule,
  attachCss,
  buildResponsiveHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  getCss,
  getFocusSlottedPseudoStyles,
  getFocusStyles,
  hasVisibleIcon,
  insertSlottedStyles,
  isDark,
  paramCaseToCamelCase,
  pxToRemWithUnit,
  transitionDuration,
  transitionTimingFunction,
} from '../../../utils';
import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../utils';
import { calculateLineHeight, color, font, generateTypeScale, srOnly } from '@porsche-design-system/utilities';
import { AlignLabel, LinkButtonPureIconName, TextSize, Theme } from '../../../types';
import { isSizeInherit } from '../../basic/typography/text/text-utils';

const getColors = (isDarkTheme: boolean): { baseColor: string; hoverColor: string; activeColor: string } => {
  return {
    baseColor: isDarkTheme ? color.darkTheme.default : color.default,
    hoverColor: isDarkTheme ? color.darkTheme.state.hover : color.state.hover,
    activeColor: isDarkTheme ? color.darkTheme.state.active : color.state.active,
  };
};

const getHostStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  position: addImportantToRule('relative'),
  cursor: 'pointer',
  display: addImportantToRule(stretch ? 'block' : 'inline-block'),
  ...(!stretch && { verticalAlign: 'top' }),
});

const getPseudoAndSublineSize = (textSize: string, fontSize: string, lineHeight: string): JssStyle => {
  const pseudoElement = {
    '&::before': {
      fontSize,
      marginLeft: lineHeight,
    },
  };
  switch (textSize) {
    case 'x-small':
      return {
        ...font.size.xSmall,
        ...pseudoElement,
      };
    case 'small':
      return {
        ...font.size.small,
        ...pseudoElement,
      };
    case 'medium':
      return {
        ...font.size['20'],
        ...pseudoElement,
      };
    case 'large':
      return {
        ...font.size['30'],
        ...pseudoElement,
      };
    case 'x-large':
      return {
        ...font.size.large,
        ...pseudoElement,
      };
  }
};

const getSizeStyles = (textSize: TextSize) => {
  if (isSizeInherit(textSize)) {
    return {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      '& .icon': {
        width: '1.5em',
        height: '1.5em',
      },
    };
  } else {
    const fontSize = `${font.size[paramCaseToCamelCase(textSize)].fontSize}`;
    const lineHeight = `${calculateLineHeight(fontSize)}em`;

    return {
      ...generateTypeScale(fontSize),
      '& .icon': {
        width: lineHeight,
        height: lineHeight,
      },
      '& ~ .subline': {
        ...getPseudoAndSublineSize(textSize, fontSize, lineHeight),
      },
    };
  }
};

const getStretchStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  justifyContent: stretch ? 'space-between' : 'flex-start',
});

const getVisibilityStyles = (hideLabel: boolean): JssStyle => {
  if (hideLabel) {
    return srOnly();
  } else {
    return {
      position: 'static',
      width: 'auto',
      height: 'auto',
      margin: 0,
      whiteSpace: 'inherit',
      overflow: 'visible',
      clip: 'auto',
      clipPath: 'none',
    };
  }
};

const getSlottedAnchorVisibilityStyles = (hideLabel: boolean): JssStyle => {
  if (hideLabel) {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      whiteSpace: 'nowrap',
      textIndent: -999999,
    };
  } else {
    return {
      position: 'static',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      textIndent: 0,
      whiteSpace: 'inherit',
    };
  }
};

const getLabelAlignmentStyles = (alignLabel: AlignLabel): JssStyle => {
  if (alignLabel === 'left') {
    return {
      padding: `0 ${pxToRemWithUnit(4)} 0 0`,
      order: -1,
    };
  }

  return {
    padding: `0 0 0 ${pxToRemWithUnit(4)}`,
    order: 0,
  };
};

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: AlignLabel,
  hasSubline: boolean,
  hasHref: boolean,
  theme: Theme
): string => {
  const isDarkTheme = isDark(theme);
  const { baseColor, hoverColor, activeColor } = getColors(isDarkTheme);
  const hasIcon = hasVisibleIcon(icon);

  return getCss({
    ...buildResponsiveHostStyles(hasSubline ? false : stretch, getHostStyles),
    root: {
      display: 'flex',
      alignItems: 'flexStart',
      width: '100%',
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
      outline: 'transparent none',
      appearance: 'none',
      border: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      background: 'transparent',
      color: active ? activeColor : baseColor,
      transition: `color ${transitionDuration} ${transitionTimingFunction}, font-size 1ms linear`, // used for transitionend event listener
      ...(hasHref && getFocusStyles({ offset: 1, pseudo: '::before' })),
      '&:hover': {
        color: hoverColor,
        '& + .subline': {
          color: hoverColor,
        },
      },
      '&:active': {
        color: activeColor,
        '& + .subline': {
          color: activeColor,
        },
      },
      ...(!hasSubline && buildResponsiveStyles(stretch, getStretchStyles)),
      ...buildResponsiveStyles(size, getSizeStyles),
    },
    ...(hasIcon && {
      icon: {
        flexShrink: '0',
        width: '1.5em',
        height: '1.5em',
      },
      label: {
        ...(hasHref
          ? buildResponsiveStyles(hideLabel, getVisibilityStyles)
          : buildResponsiveStyles(hideLabel, getSlottedAnchorVisibilityStyles)),
        ...(!hasSubline && buildResponsiveStyles(alignLabel, getLabelAlignmentStyles)),
        ...((hasSubline || alignLabel === 'right') && {
          paddingLeft: addImportantToRule(pxToRemWithUnit(4)),
        }),
      },
    }),
    ...(hasSubline && {
      subline: {
        display: 'flex',
        transition: `color ${transitionDuration} ${transitionTimingFunction}`,
        marginTop: addImportantToRule('4px'),
        color: active ? activeColor : baseColor,
        ...(hasIcon && {
          ...buildResponsiveStyles(hideLabel, getVisibilityStyles),
          paddingLeft: addImportantToRule(pxToRemWithUnit(4)),
          '&::before': {
            content: '""',
          },
        }),
      },
    }),
    // TODO: I guess it's defined because of CMS output. But as soon as we can use something like `::slotted(a)::before` it won't work anymore anyway. Maybe we should remove it and the integrating team needs to fix their output?
    '::slotted(p)': {
      margin: 0,
    },
  });
};

export const addComponentCss = (
  host: HTMLElement,
  icon: LinkButtonPureIconName,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: AlignLabel,
  hasSubline: boolean,
  hasHref: boolean,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasHref, theme));
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getFocusSlottedPseudoStyles({ offset: 1 })));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
