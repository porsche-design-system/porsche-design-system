import {
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  ref,
  spacingStaticMd,
  typescaleMd,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../styles';
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
          marginBottom: ref(spacingStaticMd),
          color: ref(colorPrimary),
          font: `${labelSize === 'small' ? ref(fontWeightSemibold) : ref(fontWeightNormal)} ${labelSize === 'small' ? ref(typescaleSm) : ref(typescaleMd)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        },
      }),
    },
    ...getFunctionalComponentRequiredStyles(),
    ...mergeDeep(getFunctionalComponentStateMessageStyles(state), {
      message: {
        marginTop: ref(spacingStaticMd),
      },
    }),
  });
};
