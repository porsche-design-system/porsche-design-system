import type { Theme } from '../../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';
import { getCss, mergeDeep } from '../../../utils';
import { addImportantToRule, getThemedColors } from '../../../styles';
import { headingXSmall, headingSmall, spacing } from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import type { FormState } from '../form-state';

const { medium: spacingMedium } = spacing;

export const getComponentCss = (state: FormState, labelSize: FieldsetWrapperLabelSize, hasLabel: boolean): string => {
  const theme: Theme = 'light';

  return getCss({
    '@global': {
      ':host': {
        display: addImportantToRule('block'),
      },
      fieldset: {
        margin: 0,
        padding: 0,
        border: 'none',
      },
      ...(hasLabel && {
        legend: {
          margin: `0 0 ${spacingMedium}`,
          padding: 0,
          color: getThemedColors(theme).baseColor,
          ...(labelSize === 'small' ? headingXSmall : headingSmall),
        },
      }),
    },
    ...getFunctionalComponentRequiredStyles(theme),
    ...mergeDeep(getFunctionalComponentStateMessageStyles(theme, state), {
      message: {
        marginTop: spacingMedium,
      },
    }),
  });
};
