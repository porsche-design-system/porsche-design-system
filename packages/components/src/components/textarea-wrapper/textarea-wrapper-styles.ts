import { type Styles } from 'jss';
import { type BreakpointCustomizable, type Theme } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, getHiddenTextJssStyle, hostHiddenStyles } from '../../styles';
import {
  formElementPaddingHorizontal,
  getSlottedTextFieldTextareaSelectStyles,
  getUnitCounterStyles,
} from '../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { type FormState } from '../../utils/form/form-state';
import {
  borderWidthBase,
  spacingStaticLarge,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasCounter: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      // ::slotted(textarea)
      ...mergeDeep(
        addImportantToEachRule(
          getSlottedTextFieldTextareaSelectStyles('textarea', state, false, theme, {
            gridArea: '1/1',
            // TODO: move into getSlottedTextFieldTextareaSelectStyles()
            font: textSmallStyle.font, // to override line-height
            // TODO: move into getSlottedTextFieldTextareaSelectStyles()
            padding: hasCounter
              ? `12px ${formElementPaddingHorizontal} ${spacingStaticLarge}`
              : `12px ${formElementPaddingHorizontal}`,
          })
        ),
        {
          // TODO: is it possible to move into getSlottedTextFieldTextareaSelectStyles()?
          '::slotted(textarea)': {
            height: 'auto', // removes !important from getBaseChildStyles
            minHeight: '200px', // min-height should be overridable
            resize: 'vertical', // overridable, too
          },
        } as Styles
      ),
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
    },
    ...(hasCounter && {
      counter: {
        ...getUnitCounterStyles(isDisabled, theme),
        gridArea: '1/1',
        placeSelf: 'flex-end',
        padding: `6px calc(${formElementPaddingHorizontal} + ${borderWidthBase})`,
      },
      // TODO: maybe we should extract it as functional component too
      'sr-only': getHiddenTextJssStyle(),
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
