import type { Styles } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  getThemedColors,
  hostHiddenStyles,
  getHiddenTextJssStyle,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { FormState } from '../../utils/form/form-state';
import { spacingStaticMedium, spacingStaticLarge, textSmallStyle } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasCounter: boolean,
  theme: Theme
): string => {
  const { contrastMediumColor } = getThemedColors(theme);
  const { contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
      ...mergeDeep(
        addImportantToEachRule(
          getBaseChildStyles('textarea', state, theme, {
            font: textSmallStyle.font, // to override line-height
            padding: hasCounter ? `12px ${spacingStaticMedium} ${spacingStaticLarge}` : `12px ${spacingStaticMedium}`,
          })
        ),
        {
          '::slotted(textarea)': {
            height: 'auto', // removes !important from getBaseChildStyles
            minHeight: '200px', // min-height should be overridable
            resize: 'vertical', // overridable, too
          },
        } as Styles
      ),
    },
    ...getLabelStyles(
      'textarea',
      isDisabled,
      hideLabel,
      state,
      theme,
      hasCounter && {
        counter: {
          position: 'absolute',
          bottom: '6px',
          right: '12px',
          zIndex: 1,
          font: textSmallStyle.font,
          color: contrastMediumColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastMediumColorDark,
          }),
        },
      }
    ),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    ...(hasCounter && {
      'sr-only': {
        ...getHiddenTextJssStyle(),
        padding: 0,
      },
    }),
  });
};
