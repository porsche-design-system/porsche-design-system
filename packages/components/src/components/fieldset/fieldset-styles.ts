import { headingMediumStyle, headingSmallStyle, spacingStaticMedium } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { Theme } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { FieldsetLabelSize } from './fieldset-utils';

export const getComponentCss = (
  state: FormState,
  labelSize: FieldsetLabelSize,
  hasLabel: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      fieldset: {
        margin: 0,
        padding: 0,
        border: 'none',
      },
      ...(hasLabel && {
        legend: {
          margin: `0 0 ${spacingStaticMedium}`,
          padding: 0,
          color: getThemedColors(theme).primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: getThemedColors('dark').primaryColor,
          }),
          ...(labelSize === 'small' ? headingSmallStyle : headingMediumStyle),
        },
      }),
    },
    ...getFunctionalComponentRequiredStyles(),
    ...mergeDeep(getFunctionalComponentStateMessageStyles(theme, state), {
      message: {
        marginTop: spacingStaticMedium,
      },
    }),
  });
};
