import { ref } from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  getDisabledBaseStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getButtonImageCssStyle, getOptionCssStyle } from '../../../styles/select';
import { getCss } from '../../../utils';

export const cssVarInternalSelectOptionScaling = '--_p-select-option-a';

export const getComponentCss = (isDisabled: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule({
        ':host': {
          ...(isDisabled && getDisabledBaseStyles()),
          scrollMarginBlockStart: `calc(max(2px, ${ref(cssVarInternalSelectOptionScaling, 1)} * 6px) + 36px)`, // 36px input height + 6px padding
          scrollMarginBlockEnd: `max(2px, ${ref(cssVarInternalSelectOptionScaling, 1)} * 6px)`, // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
        },
        '::slotted(img)': getButtonImageCssStyle,
      }),
      ...preventFoucOfNestedElementsStyles,
    },
    option: getOptionCssStyle('select-option', cssVarInternalSelectOptionScaling),
    icon: {
      marginInlineStart: 'auto',
    },
  });
};
