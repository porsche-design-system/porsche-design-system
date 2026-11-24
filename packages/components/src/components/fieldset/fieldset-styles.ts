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

/**
 * @css-variable {"name": "--p-fieldset-label-mb", "description": "Bottom margin of the fieldset label. It is recommended to apply an existing Porsche Design System spacing token, e.g. the CSS declaration `--p-fieldset-label-mb: var(--p-spacing-static-sm)`, the Tailwind CSS arbitrary property `[--p-fieldset-label-mb:var(--spacing-static-sm)]` or the equivalent SCSS/JS token.", "defaultValue": "16px"}
 */
const cssVarLabelMarginBottom = '--p-fieldset-label-mb';

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
          marginBottom: ref(cssVarLabelMarginBottom, ref(spacingStaticMd)),
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
