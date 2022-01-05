import { addImportantToRule, getCss, getRequiredStyles, getStateMessageStyles, mergeDeep } from '../../../utils';
import { color, headline, spacing } from '@porsche-design-system/utilities';
import type { FormState } from '../../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';

export const getComponentCss = (
  state: FormState,
  required: boolean,
  labelSize: FieldsetWrapperLabelSize,
  hasLabel: boolean,
  hasMessage: boolean
): string => {
  const { default: baseColor } = color;

  return getCss({
    ':host': {
      display: addImportantToRule('block'),
    },
    '@global': hasLabel && {
      legend: {
        margin: `0 0 ${spacing[16]}`,
        padding: 0,
        color: baseColor,
        ...headline[labelSize === 'small' ? 5 : 4],
      },
    },
    root: {
      margin: 0,
      padding: 0,
      border: 'none',
    },
    ...(required && getRequiredStyles('light')),
    ...(hasMessage && mergeDeep(getStateMessageStyles('light', state), { message: { marginTop: spacing[16] } })),
  });
};
