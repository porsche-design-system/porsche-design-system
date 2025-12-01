import { borderRadiusSmall, fontLineHeight, frostedGlassStyle, textSmallStyle } from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import type { BreakpointCustomizable, LinkButtonIconName, LinkButtonVariant } from '../types';
import { buildResponsiveStyles, hasVisibleIcon } from '../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from './';

type Colors = {
  textColor: string;
  backgroundColor: string;
  backgroundColorHover: string;
};

const { primaryColor, canvasColor, contrastHighColor, frostedColor, frostedSoftColor } = colors;

const getVariantColors = (variant: LinkButtonVariant): Colors => {
  const colors: {
    [v in LinkButtonVariant]: Colors;
  } = {
    primary: {
      textColor: canvasColor,
      backgroundColor: primaryColor,
      backgroundColorHover: contrastHighColor,
    },
    secondary: {
      textColor: primaryColor,
      backgroundColor: frostedColor,
      backgroundColorHover: frostedSoftColor,
    },
  };

  return colors[variant];
};

export const getLinkButtonStyles = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  hasSlottedAnchor: boolean,
  compact: BreakpointCustomizable<boolean>,
  cssVariableInternalScaling: string
): Styles => {
  const { textColor, backgroundColor, backgroundColorHover } = getVariantColors(variant);

  const hasIcon = hasVisibleIcon(icon, iconSource) || hideLabel;
  const isSecondary = variant === 'secondary';

  const scalingVar = `var(${cssVariableInternalScaling}, var(--p-internal-scaling-factor))`;

  const paddingBlock = `calc(${scalingVar} * 0.8125 * ${SCALING_BASE_VALUE})`; // 0.8125 * SCALING_BASE_VALUE corresponds to 13px
  const paddingInline = `max(calc(${scalingVar} * 1.625 * ${SCALING_BASE_VALUE}), ${isSecondary ? '6px' : '4px'})`; // 1.625 * SCALING_BASE_VALUE corresponds to 26px
  const gap = `clamp(2px, calc(${scalingVar} * 0.5 * ${SCALING_BASE_VALUE}), 16px)`; // 0.5 * SCALING_BASE_VALUE corresponds to 8px
  const iconMarginInlineStart = `clamp(-16px, calc(${scalingVar} * -0.5 * ${SCALING_BASE_VALUE}), -2px)`; // -0.5 * SCALING_BASE_VALUE corresponds to -8px

  return {
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          borderRadius: borderRadiusSmall,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    root: {
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      width: '100%', // Allows for setting a width on the host
      minWidth: 'min-content', // Do not shrink beyond icon size + padding + border + label
      boxSizing: 'border-box',
      ...frostedGlassStyle,
      ...textSmallStyle,
      borderRadius: borderRadiusSmall,
      transform: 'translate3d(0,0,0)', // creates new stacking context (for slotted anchor + focus)
      backgroundColor,
      color: textColor,
      cursor: 'pointer',
      ...buildResponsiveStyles(compact, (compactValue: boolean) => ({
        '--p-internal-scaling-factor': compactValue ? 'calc(4 / 13)' : 1, // Compact mode needs to have 4px paddingBlock thus this scaling factor
      })),
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
      ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
        padding: hideLabelValue ? paddingBlock : `${paddingBlock} ${paddingInline}`,
        gap: hideLabelValue ? 0 : gap,
      })),
      ...(!hasSlottedAnchor && {
        '&:focus-visible': getFocusBaseStyles(),
      }),
      ...(!isDisabledOrLoading &&
        hoverMediaQuery({
          '&:hover': {
            backgroundColor: backgroundColorHover,
          },
        })),
    },
    label: buildResponsiveStyles(hideLabel, getHiddenTextJssStyle),
    ...(hasIcon && {
      icon: {
        width: fontLineHeight, // ensure space is already reserved until icon component is loaded (ssr)
        height: fontLineHeight, // ensure space is already reserved until icon component is loaded (ssr)
        ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
          marginInlineStart: hideLabelValue ? 0 : iconMarginInlineStart, // compensate white space of svg icon and optimize visual alignment
        })),
      },
    }),
  };
};
