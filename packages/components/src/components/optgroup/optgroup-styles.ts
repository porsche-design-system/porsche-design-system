import {
  colorPrimary,
  fontPorscheNext,
  fontWeightSemibold,
  leadingNormal,
  ref,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, getDisabledBaseStyles, hostHiddenStyles } from '../../styles';
import { getCss } from '../../utils';

export const cssVarInternalOptgroupScaling = '--_p-optgroup-a';

const paddingBlock = `calc(11.2px * (${ref(cssVarInternalOptgroupScaling)} - 0.64285714) + 4px)`;
const paddingInline = `calc(16.8px * (${ref(cssVarInternalOptgroupScaling)} - 0.64285714) + 6px)`;
const gap = `calc(11.2px * (${ref(cssVarInternalOptgroupScaling)} - 0.64285714) + 4px)`;
const paddingSlottedInlineStart = `calc(44.8px * (${ref(cssVarInternalOptgroupScaling)} - 0.64285714) + 12px)`;

export const getComponentCss = (isDisabled: boolean): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...hostHiddenStyles,
      }),
      '::slotted(*)': {
        '--_p-select-option-b': paddingSlottedInlineStart,
        '--_p-multi-select-option-b': paddingSlottedInlineStart,
      },
      '[role="group"]': {
        display: 'flex',
        flexDirection: 'column',
        gap,
      },
      '[role="presentation"]': {
        paddingBlock,
        paddingInline,
        font: `${ref(fontWeightSemibold)} ${ref(typescaleXs)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        color: ref(colorPrimary),
        ...(isDisabled && getDisabledBaseStyles()),
      },
    },
  });
};
