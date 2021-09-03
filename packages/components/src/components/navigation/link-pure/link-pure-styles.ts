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
  isDark,
  mergeDeep,
  paramCaseToCamelCase,
  pxToRem,
  pxToRemWithUnit,
  Styles,
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

const getHostStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  position: addImportantToRule('relative'),
  cursor: 'pointer',
  display: addImportantToRule(stretch ? 'block' : 'inline-block'),
  ...(!stretch && { verticalAlign: 'top' }),
});

const getStretchStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  justifyContent: stretch ? 'space-between' : 'flex-start',
});

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
  return {
    order: alignLabel === 'left' ? 1 : 0,
  };
};

const getLabelAlignment2 = (alignLabel: AlignLabel) => {
  return {
    margin: alignLabel === 'left' ? `0 ${pxToRem(4)}rem 0 0` : `0 0 0 ${pxToRem(4)}rem`,
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
  const isDarkTheme = isDark(theme);
  const { baseColor, hoverColor, activeColor } = getColors(isDarkTheme);
  const hasSubline = hasSlottedSubline(host);

  return getCss(
    mergeDeep<Styles>({
      ...buildResponsiveHostStyles(hasSubline ? false : stretch, getHostStyles),
      root: {
        display: 'flex',
        alignItems: 'flexStart',
        flexWrap: 'wrap',
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
        ...getFocusStyles({ offset: 1, pseudo: '::before' }),
        '&::before': {
          outline: 'transparent solid 1px',
          outlineOffset: 1,
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: 'translate(.125rem, 0)' /* TODO: make breakpoint customizable */,
        },
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
        ...buildResponsiveStyles(size, adjustToFontSize),
      },
      ...(hasVisibleIcon(icon) && {
        icon: {
          flexShrink: '0',
          width: '1.5em',
          height: '1.5em',
          ...(!hasSubline && buildResponsiveStyles(alignLabel, getLabelAlignment)),
        },
        label: {
          ...buildResponsiveStyles(hideLabel, getLabelVisibility),
          ...(!hasSubline && buildResponsiveStyles(alignLabel, getLabelAlignment2)),
          ...((alignLabel === 'right' || hasSubline) && {
            marginLeft: addImportantToRule(pxToRemWithUnit(4)),
          }),
        },
      }),
      ...(hasSubline && {
        subline: {
          display: 'flex',
          flexBasis: '100%',
          transition: `color ${transitionDuration} ${transitionTimingFunction}`,
          marginTop: addImportantToRule('4px'),
          color: active ? activeColor : baseColor,
          ...(hasVisibleIcon(icon) && {
            ...buildResponsiveStyles(hideLabel, getLabelVisibility),
            marginLeft: addImportantToRule(pxToRemWithUnit(4)),
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
    })
  );
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
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
  attachCss(host, getComponentCss(host, icon, active, stretch, size, hideLabel, alignLabel, theme));
};
