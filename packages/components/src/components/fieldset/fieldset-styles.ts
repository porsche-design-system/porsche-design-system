import { headingMediumStyle, headingSmallStyle, spacingStaticMedium } from '@porsche-design-system/emotion';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../styles';
import { colorPrimary } from '../../styles/css-variables';
import { getCss, mergeDeep } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { FieldsetLabelSize } from './fieldset-utils';

export const getComponentCss = (state: FormState, labelSize: FieldsetLabelSize, hasLabel: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      fieldset: {
        all: 'unset',
        display: 'block',
      },
      ...(hasLabel && {
        legend: {
          all: 'unset',
          marginBottom: spacingStaticMedium,
          color: colorPrimary,
          ...(labelSize === 'small' ? headingSmallStyle : headingMediumStyle),
        },
      }),
    },
    ...getFunctionalComponentRequiredStyles(),
    ...mergeDeep(getFunctionalComponentStateMessageStyles(state), {
      message: {
        marginTop: spacingStaticMedium,
      },
    }),
  });
};
