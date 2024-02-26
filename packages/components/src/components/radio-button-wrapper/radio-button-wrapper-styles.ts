import { type BreakpointCustomizable, type Theme } from '../../types';
import { type FormState } from '../../utils/form/form-state';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHighContrastColors,
  getInvertedThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getSlottedCheckboxRadioButtonStyles } from '../../styles/checkbox-radio-styles';
import { getCss, isDisabledOrLoading, isHighContrastMode, mergeDeep } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import {
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

const getCheckedSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(`<circle fill="${fill}" cx="12" cy="12" r="6"/>`);
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  theme: Theme
): string => {
  const checkedIconColor = isHighContrastMode
    ? getHighContrastColors().canvasColor
    : escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
  const checkedIconColorDark = isHighContrastMode
    ? getHighContrastColors().canvasColor
    : escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      // ::slotted(input)
      ...addImportantToEachRule(
        mergeDeep(getSlottedCheckboxRadioButtonStyles(state, isDisabled, isLoading, theme), {
          '::slotted': {
            '&(input)': {
              gridArea: '1/1',
              borderRadius: '50%',
            },
            // TODO: is it somehow useful possible to make following styles configurable by paramter?
            ...(!isLoading && {
              '&(input:checked)': {
                backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
                }),
              },
            }),
          },
        })
      ),
    },
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      rowGap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
      gridArea: '1/1',
      alignSelf: 'flex-start', // in case label becomes multiline
      ...(isDisabledOrLoading(isDisabled, isLoading) && {
        // TODO: maybe .wrapper should handle it for all form components while pointer-events: none is set to input
        cursor: 'not-allowed',
      }),
    },
    ...(isLoading && {
      // TODO: extract for checkbox-wrapper and radio-button-wrapper (not gridArea and placeSelf)
      spinner: {
        position: 'relative', // ensure correct stacking, can be removed as soon as focus for input is handled with outline
        gridArea: '1/1',
        placeSelf: 'center',
        width: fontLineHeight,
        height: fontLineHeight,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      isDisabled || isLoading,
      hideLabel,
      theme,
      {
        gridArea: '1/2',
      },
      {
        paddingTop: '2px', // compensate vertical alignment
        paddingInlineStart: spacingStaticSmall, // asymmetric padding used instead of gap to prevent not clickable area between label and input
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state, {
      gridColumn: '1/3',
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
