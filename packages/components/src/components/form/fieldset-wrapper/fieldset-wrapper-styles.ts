import { addImportantToRule, getCss, getRequiredStyles, getStateMessageStyles, getThemedColors } from '../../../utils';
import { headline4, headline5, spacing } from '@porsche-design-system/utilities';
import type { FormState, Theme } from '../../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';

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
    ...getRequiredStyles(theme),
    ...getStateMessageStyles(theme, state, { marginTop: spacing[16] }),
  });
};
