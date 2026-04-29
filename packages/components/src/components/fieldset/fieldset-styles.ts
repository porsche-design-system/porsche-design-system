import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../styles';
import {
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  spacingStaticMd,
  typescaleMd,
  typescaleSm,
} from '../../styles/css-variables';
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
          marginBottom: spacingStaticMd,
          color: colorPrimary,
          font: `${labelSize === 'small' ? fontWeightSemibold : fontWeightNormal} ${labelSize === 'small' ? typescaleSm : typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
        },
      }),
    },
    ...getFunctionalComponentRequiredStyles(),
    ...mergeDeep(getFunctionalComponentStateMessageStyles(state), {
      message: {
        marginTop: spacingStaticMd,
      },
    }),
  });
};
