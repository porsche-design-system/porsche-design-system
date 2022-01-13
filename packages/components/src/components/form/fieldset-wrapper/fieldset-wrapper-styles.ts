import {
  addImportantToRule,
  getCss,
  getFunctionalComponentStateMessageStyles,
  mergeDeep,
  getFunctionalComponentRequiredStyles,
} from '../../../utils';
import { color, headline4, headline5, spacing } from '@porsche-design-system/utilities';
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
          color: baseColor,
          ...(labelSize === 'small' ? headline5 : headline4),
        },
      }),
    },
    ...(required && getFunctionalComponentRequiredStyles('light')),
    ...(hasMessage &&
      mergeDeep(getFunctionalComponentStateMessageStyles('light', state), {
        message: {
          marginTop: spacing[16],
        },
      })),
  });
};
