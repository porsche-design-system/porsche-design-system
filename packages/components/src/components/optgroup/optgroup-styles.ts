import { fontWeightSemiBold, spacingStaticSmall, textXSmallStyle } from '@porsche-design-system/styles';
import { addImportantToEachRule, colorSchemeStyles, colors, hostHiddenStyles } from '../../styles';
import { getCss } from '../../utils';

export const cssVarInternalOptgroupScaling = '--p-internal-optgroup-scaling';

const scalingVar = `var(${cssVarInternalOptgroupScaling}, 1)`;
const padding = `max(2px, ${scalingVar} * ${spacingStaticSmall}) max(4px, ${scalingVar} * 12px)`;
const gap = `max(2px, ${scalingVar} * ${spacingStaticSmall})`;

const { primaryColor, disabledColor } = colors;

export const getComponentCss = (isDisabled: boolean): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
      '::slotted(*)': {
        '--p-internal-select-option-padding-left': '28px',
        '--p-internal-multi-select-option-padding-left': '28px',
      },
      '[role="group"]': {
        display: 'flex',
        flexDirection: 'column',
        gap,
      },
      '[role="presentation"]': {
        padding,
        font: textXSmallStyle.font.replace(' 400 ', ` ${fontWeightSemiBold} `),
        color: isDisabled ? disabledColor : primaryColor,
      },
    },
  });
};
