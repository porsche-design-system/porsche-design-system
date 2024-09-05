import { type BreakpointCustomizable, type Theme } from '../../types';
import { type FormState } from '../../utils/form/form-state';
import { getCss, isDisabledOrLoading, isHighContrastMode, supportsChromiumMediaQuery } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getHighContrastColors,
  getInvertedThemedColors,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
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
  const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastMediumColor: contrastMediumColorDark,
    contrastHighColor: contrastHighColorDark,
    disabledColor: disabledColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );
  const { canvasTextColor } = getHighContrastColors();
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  // TODO: needs to be extracted into a color function
  const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedColorDark = disabledOrLoading ? disabledColorDark : formStateColorDark || contrastMediumColorDark;
  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const uncheckedHoverColorDark = formStateHoverColorDark || primaryColorDark;
  const checkedColor = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
      ? disabledColor
      : formStateColor || primaryColor;
  const checkedColorDark = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
      ? disabledColorDark
      : formStateColorDark || primaryColorDark;
  const checkedHoverColor = formStateHoverColor || contrastHighColor;
  const checkedHoverColorDark = formStateHoverColorDark || contrastHighColorDark;

  const { canvasColor } = getHighContrastColors();
  const checkedIconColor = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
  const checkedIconColorDark = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);
  const indeterminateIconColor = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(getThemedColors(theme).primaryColor);
  const indeterminateIconColorDark = isHighContrastMode
    ? canvasColor
    : escapeHashCharacter(getThemedColors('dark').primaryColor);

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
      input: {
        width: fontLineHeight,
        height: fontLineHeight,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        display: 'block',
        margin: 0,
        padding: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        boxSizing: 'content-box',
        background: `transparent 0% 0% / ${fontLineHeight}`,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        border: `${borderWidthBase} solid ${uncheckedColor}`,
        outline: 0, // TODO: only relevant for VRT testing with forced states - prevents :focus style (in case getFocusJssStyle() condition is not matching)
        ...(disabledOrLoading
          ? {
              pointerEvents: 'none', // to prevent form element becomes clickable/toggleable
            }
          : {
              cursor: 'pointer',
            }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: uncheckedColorDark,
        }),
        gridArea: '1/1',
        borderRadius: borderRadiusSmall,
      },
      'input:checked': {
        borderColor: checkedColor,
        backgroundColor: checkedColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: checkedColorDark,
          backgroundColor: checkedColorDark,
        }),
      },
      ...(!isLoading && {
        'input:checked': {
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: checkedColorDark,
            backgroundColor: checkedColorDark,
          }),
          backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
          ...prefersColorSchemeDarkMediaQuery(theme, {
            backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
          }),
        },
        'input:indeterminate': {
          backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColor),
          ...prefersColorSchemeDarkMediaQuery(theme, {
            backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColorDark),
          }),
        },
      }),
      ...(!disabledOrLoading &&
        !isHighContrastMode &&
        hoverMediaQuery({
          'input:hover,label:hover~.wrapper input': {
            borderColor: uncheckedHoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: uncheckedHoverColorDark,
            }),
          },
          'input:checked:hover,label:hover~.wrapper input:checked': {
            borderColor: checkedHoverColor,
            backgroundColor: checkedHoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: checkedHoverColorDark,
              backgroundColor: checkedHoverColorDark,
            }),
          },
          'label:hover~.wrapper input': supportsChromiumMediaQuery({
            transition: 'unset', // Fixes chrome bug where transition properties are stuck on hover
          }),
        })),
      ...(!isDisabled && getFocusJssStyle(theme, { slotted: 'input' })),
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
        cursor: 'not-allowed',
      }),
    },
    ...(isLoading && {
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
