import type { Styles } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import { addImportantToEachRule, getThemedColors, getScreenReaderOnlyJssStyle } from '../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { FormState } from '../../utils/form/form-state';
import { spacingStaticMedium, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasCounter: boolean,
  theme: Theme
): string => {
  const { contrastMediumColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
      ...mergeDeep(
        addImportantToEachRule(
          getBaseChildStyles('textarea', state, theme, {
            // 36 = 2 * 6 + 24 where 6 is the bottom distance and 24 the height of the text
            padding: hasCounter ? `${spacingStaticMedium} ${spacingStaticMedium} 36px` : spacingStaticMedium,
            resize: 'vertical',
          })
        ),
        {
          '::slotted(textarea)': {
            minHeight: '192px', // min-height should be overridable
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
          pointerEvents: 'none',
        },
      }
    ),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    ...(hasCounter && {
      'sr-only': {
        ...getScreenReaderOnlyJssStyle(),
        padding: 0,
      },
    }),
  });
};
