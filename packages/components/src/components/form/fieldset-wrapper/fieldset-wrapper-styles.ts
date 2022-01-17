import { addImportantToRule, getCss, mergeDeep, getThemedColors } from '../../../utils';
import { headline4, headline5, spacing } from '@porsche-design-system/utilities';
import type { FormState, Theme } from '../../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

export const getComponentCss = (state: FormState, labelSize: FieldsetWrapperLabelSize, hasLabel: boolean): string => {
  const theme: Theme = 'light';

  return getCss({
    ':host': {
      display: addImportantToRule('block'),
    },
    '@global': {
      fieldset: {
        margin: 0,
        padding: 0,
        border: 'none',
      },
      ...(hasLabel && {
        legend: {
          margin: `0 0 ${spacing[16]}`,
          padding: 0,
          color: getThemedColors(theme).baseColor,
          ...(labelSize === 'small' ? headline5 : headline4),
        },
      }),
    },
    ...getFunctionalComponentRequiredStyles(theme),
    ...mergeDeep(getFunctionalComponentStateMessageStyles(theme, state), {
      message: {
        marginTop: spacing[16],
      },
    }),
  });
};
