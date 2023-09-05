import type { Theme } from '../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';
import type { FormState } from '../../utils/form/form-state';
import { getCss, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { headingSmallStyle, headingMediumStyle, spacingStaticMedium } from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';

export const getComponentCss = (
  state: FormState,
  labelSize: FieldsetWrapperLabelSize,
  hasLabel: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
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
          ...(labelSize === 'small' ? headingSmallStyle : headingMediumStyle),
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: getThemedColors('dark').primaryColor,
          }),
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
