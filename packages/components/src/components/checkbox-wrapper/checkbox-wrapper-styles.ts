import { type BreakpointCustomizable, type Theme } from '../../types';
import { type FormState } from '../../utils/form/form-state';
import { getSlottedCheckboxRadioButtonStyles } from '../../styles/checkbox-radio-styles';
import { getCss, isDisabledOrLoading, isHighContrastMode, mergeDeep } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHighContrastColors,
  getInvertedThemedColors,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  borderRadiusSmall,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';

const getCheckedSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(
    `<path fill="${fill}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
  );
};

const getIndeterminateSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20,11v2H4v-2h16Z"/>`);
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, /* contrastHighColor , */ disabledColor /* , focusColor */ } =
    getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastMediumColor: contrastMediumColorDark,
    // contrastHighColor: contrastHighColorDark,
    disabledColor: disabledColorDark,
    // focusColor: focusColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );
  const { canvasTextColor } = getHighContrastColors();
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const { canvasColor } = getHighContrastColors();
  const checkedIconColor = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
  const checkedIconColorDark = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);
  const indeterminateIconColor = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(disabledOrLoading ? disabledColorDark : formStateColor || primaryColor);
  const indeterminateIconColorDark = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(formStateColorDark || primaryColorDark);

  const background = `transparent 0% 0% / ${fontLineHeight}`;

  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const uncheckedHoverColorDark = formStateHoverColorDark || primaryColorDark;
  const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedColorDark = disabledOrLoading ? disabledColorDark : formStateColorDark || contrastMediumColorDark;

  const indeterminateIconHoverColor = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(formStateHoverColor || primaryColor);
  const indeterminateIconHoverColorDark = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(formStateHoverColorDark || primaryColorDark);

  const checkedColorDark = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
      ? disabledColorDark
      : formStateColorDark || primaryColorDark;

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
      // ::slotted(input)
      ...addImportantToEachRule(
        mergeDeep(getSlottedCheckboxRadioButtonStyles(state, isDisabled, isLoading, theme), {
          '::slotted': {
            '&(input)': {
              gridArea: '1/1',
              borderRadius: borderRadiusSmall,
            },
            // TODO: is it somehow useful possible to make following styles configurable by parameter?
            ...(!isLoading && {
              '&(input:checked)': {
                backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
                  borderColor: checkedColorDark,
                  backgroundColor: checkedColorDark,
                }),
              },
              '&(input:indeterminate)': {
                background, // fix for indeterminate mode and checked in safari
                borderColor: uncheckedColor, // fix for indeterminate mode and checked in safari
                backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColor),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColorDark),
                  borderColor: uncheckedColorDark, // fix for indeterminate mode and checked in safari
                  backgroundColor: 'transparent',
                  ...(disabledOrLoading && {
                    backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColor),
                  }),
                }),
              },
            }),
            ...(!disabledOrLoading &&
              hoverMediaQuery({
                '&(input:indeterminate:hover),label:hover~.wrapper &(input:indeterminate)': {
                  ...addImportantToEachRule({
                    backgroundColor: 'transparent', // fix for indeterminate mode without formState in safari
                    borderColor: uncheckedHoverColor, // fix for indeterminate mode without formState in safari
                  }),
                  backgroundImage: getIndeterminateSVGBackgroundImage(escapeHashCharacter(indeterminateIconHoverColor)),
                  ...prefersColorSchemeDarkMediaQuery(theme, {
                    backgroundImage: getIndeterminateSVGBackgroundImage(
                      escapeHashCharacter(indeterminateIconHoverColorDark)
                    ),
                    ...addImportantToEachRule({
                      // backgroundColor: 'transparent', // fix for indeterminate mode without formState in safari
                      borderColor: uncheckedHoverColorDark, // fix for indeterminate mode without formState in safari
                    }),
                  }),
                },
              })),
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
      ...(disabledOrLoading && {
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
