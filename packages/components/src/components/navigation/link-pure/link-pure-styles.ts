import {
  addImportantToEachRule,
  addImportantToRule,
  attachCss,
  buildResponsiveHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  getCss,
  getFocusPseudoStyles,
  getFocusStyles,
  hasSlottedSubline,
  hasVisibleIcon,
  insertSlottedStyles,
  paramCaseToCamelCase,
  pxToRem,
  pxToRemWithUnit,
  transitionDuration,
  transitionTimingFunction,
} from '../../../utils';
import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../utils';
import { calculateLineHeight, color, font, generateTypeScale, srOnly } from '@porsche-design-system/utilities';
import { AlignLabel, LinkButtonPureIconName, TextSize, Theme } from '../../../types';
import { isSizeInherit } from '../../basic/typography/text/text-utils';

const getPseudoAndSublineSize = (size: string) => {
  const sizeWithUnit = `${font.size[size].fontSize}`;

  const pseudoElement = {
    '&::before': {
      fontSize: sizeWithUnit,
      marginLeft: `${calculateLineHeight(sizeWithUnit)}em`,
    },
  };
  switch (size) {
    case 'xSmall':
      return {
        ...generateTypeScale(sizeWithUnit),
        ...pseudoElement,
      };
    case 'small':
      return {
        ...generateTypeScale(sizeWithUnit),
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
    case 'xLarge':
      return {
        ...font.size.large,
        ...pseudoElement,
      };
  }
};

export const adjustToFontSize = (size: TextSize) => {
  if (isSizeInherit(size)) {
    return {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      '& .icon': {
        width: '1.5em',
        height: '1.5em',
      },
    };
  } else {
    const camelCaseSize = paramCaseToCamelCase(size);
    const sizeWithUnit = `${font.size[camelCaseSize].fontSize}`;
    return {
      ...generateTypeScale(sizeWithUnit),
      '& .icon': {
        width: `${calculateLineHeight(sizeWithUnit)}em`,
        height: `${calculateLineHeight(sizeWithUnit)}em`,
      },
      '& ~ .subline': {
        ...getPseudoAndSublineSize(camelCaseSize),
      },
    };
  }
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getFocusPseudoStyles({ offset: 1 })));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};

const getHostStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  verticalAlign: 'top',
  position: addImportantToRule('relative'),
  cursor: 'pointer',
  display: stretch ? 'block' : 'inline-block',
});

const getStretchStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  justifyContent: stretch ? 'space-between' : 'flex-start',
});

const getColor = (theme: Theme) => {
  if (theme === 'dark') {
    return {
      baseColor: color.darkTheme.default,
      activeColor: color.darkTheme.state.active,
      activeColor2: color.darkTheme.state.active,
      hoverColor: color.darkTheme.state.hover,
    };
  }
  return {
    baseColor: color.default,
    activeColor: color.state.active,
    activeColor2: color.brand,
    hoverColor: color.state.hover,
  };
};

const getLabelVisibility = (hideLabel: boolean) => {
  if (hideLabel) {
    return srOnly();
  } else {
    return {
      position: 'static',
      width: 'auto',
      height: 'auto',
      margin: '0',
      whiteSpace: 'normal',
      overflow: 'visible',
      clip: 'auto',
      clipPath: 'none',
    };
  }
};

const getLabelAlignment = (alignLabel: AlignLabel) => {
  if (alignLabel === 'left') {
    return {
      order: 1,
      marginRight: '-0.125em',
    };
  }
  return {
    order: 0,
    marginRight: 0,
  };
};

const getLabelAlignment2 = (alignLabel: AlignLabel) => {
  if (alignLabel === 'left') {
    return {
      paddingRight: 0,
      margin: `0 ${pxToRem(4)}rem 0 0`,
    };
  }
  return {
    paddingRight: '0.125em',
    margin: `0 0 0 ${pxToRem(4)}rem`,
  };
};

export const getComponentCss = (
  host: HTMLElement,
  icon: LinkButtonPureIconName,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: AlignLabel,
  theme: Theme
): string => {
  const hasSubline = hasSlottedSubline(host);
  const { baseColor, activeColor, activeColor2, hoverColor } = getColor(theme);
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
      color: active ? activeColor2 : baseColor,
      transition: `color ${transitionDuration} ${transitionTimingFunction}, font-size 1ms linear`, // used for transitionend event listener
      ...getFocusStyles({ offset: 1, pseudo: '::before' }),
      '&:active': {
        color: activeColor,
        '& + .subline': {
          color: activeColor,
        },
      },
      '&:hover': {
        color: hoverColor,
        '& + .subline': {
          color: hoverColor,
        },
      },
      ...(!hasSubline && buildResponsiveStyles(stretch, getStretchStyles)),
      ...buildResponsiveStyles(size, adjustToFontSize),
    },
    icon: {
      flexShrink: '0',
      width: '1.5em',
      height: '1.5em',
      ...(!hasSubline && buildResponsiveStyles(alignLabel, getLabelAlignment)),
    },
    label: {
      display: 'block',
      boxSizing: 'border-box',
      border: 0,
      ...(hasVisibleIcon(icon) && buildResponsiveStyles(hideLabel, getLabelVisibility)),
      ...(hasVisibleIcon(icon) && !hasSubline && buildResponsiveStyles(alignLabel, getLabelAlignment2)),
      ...(hasVisibleIcon(icon) &&
        (alignLabel === 'right' || hasSubline) && {
          paddingRight: '0.125em',
          marginLeft: addImportantToRule(pxToRemWithUnit(4)),
        }),
    },
    ...(hasSubline && {
      subline: {
        display: 'flex',
        transition: `color ${transitionDuration} ${transitionTimingFunction}`,
        marginTop: addImportantToRule('4px'),
        color: active ? activeColor2 : baseColor,
        ...(hasVisibleIcon(icon) && buildResponsiveStyles(hideLabel, getLabelVisibility)),
        ...(hasVisibleIcon(icon) && {
          marginLeft: addImportantToRule(pxToRemWithUnit(4)),
          paddingRight: '0.125em',
          '&::before': {
            content: '""',
          },
        }),
      },
    }),
    ...addImportantToEachRule({
      '::slotted(a)': {
        display: 'block',
        position: 'static',
        textDecoration: 'none',
        color: 'inherit',
        lineHeight: 'inherit',
        outline: 'transparent none',
      },
    }),
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
  theme: Theme
): void => {
  // Subline does not support stretch, therefore it needs to be called with false if with subline
  attachCss(host, getComponentCss(host, icon, active, stretch, size, hideLabel, alignLabel, theme));
};
