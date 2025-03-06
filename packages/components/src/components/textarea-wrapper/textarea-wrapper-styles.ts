import type { BreakpointCustomizable, Theme } from '../../types';
import type { FormState } from '../../utils/form/form-state';

import {
  borderWidthBase,
  spacingStaticLarge,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  formElementPaddingHorizontal,
  getSlottedTextFieldTextareaSelectStyles,
  getUnitCounterJssStyle,
} from '../../styles/form-styles';
import { getCss, mergeDeep } from '../../utils';
import { getFunctionalComponentLegacyLabelStyles } from '../common/legacy-label/legacy-label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';

export const getComponentCss = (
  isDisabled: boolean,
  isReadonly: boolean,
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
      ...preventFoucOfNestedElementsStyles,
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
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal}*2 + ${borderWidthBase}*2)`,
    },
    wrapper: {
      display: 'grid',
    },
    ...(hasCounter && {
      counter: {
        ...getUnitCounterJssStyle(isDisabled, isReadonly, theme),
        gridArea: '1/1',
        placeSelf: 'flex-end',
        padding: `6px calc(${formElementPaddingHorizontal} + ${borderWidthBase})`,
      },
      // TODO: maybe we should extract it as functional component too
      'sr-only': getHiddenTextJssStyle(),
    }),
    // .label / .required
    ...getFunctionalComponentLegacyLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
