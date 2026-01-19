import { fontWeightSemiBold, textXSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getDisabledBaseStyles,
  hostHiddenStyles,
} from '../../styles';
import { getCss } from '../../utils';

export const cssVarInternalOptgroupScaling = '--p-internal-optgroup-scaling';

const paddingBlock = `calc(11.2px * (var(${cssVarInternalOptgroupScaling}) - 0.64285714) + 4px)`;
const paddingInline = `calc(16.8px * (var(${cssVarInternalOptgroupScaling}) - 0.64285714) + 6px)`;
const gap = `calc(11.2px * (var(${cssVarInternalOptgroupScaling}) - 0.64285714) + 4px)`;
const paddingSlottedInlineStart = `calc(44.8px * (var(${cssVarInternalOptgroupScaling}) - 0.64285714) + 12px)`;

const { primaryColor } = colors;

export const getComponentCss = (isDisabled: boolean): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...colorSchemeStyles,
        ...hostHiddenStyles,
        ...(isDisabled && getDisabledBaseStyles()),
      }),
      '::slotted(*)': {
        '--p-internal-select-option-padding-left': paddingSlottedInlineStart,
        '--p-internal-multi-select-option-padding-left': paddingSlottedInlineStart,
      },
      '[role="group"]': {
        display: 'flex',
        flexDirection: 'column',
        gap,
      },
      '[role="presentation"]': {
        paddingBlock,
        paddingInline,
        font: textXSmallStyle.font.replace(' 400 ', ` ${fontWeightSemiBold} `),
        color: primaryColor,
      },
    },
  });
};
