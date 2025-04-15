import {
  addImportantToEachRule,
  getHighContrastColors,
  getInvertedThemedColors,
  getSchemedHighContrastMediaQuery,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  SCALING_BASE_VALUE,
} from '../../../styles';
import { getOptionJssStyle } from '../../../styles/select';
import type { Theme } from '../../../types';
import { getCss, isHighContrastMode } from '../../../utils';
import { getInlineSVGBackgroundImage } from '../../../utils/svg/getInlineSVGBackgroundImage';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
} from '@porsche-design-system/styles';
import { escapeHashCharacter } from '../../../utils/svg/escapeHashCharacter';

const getCheckedSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(
    `<path fill="${fill}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
  );
};

export const getComponentCss = (theme: Theme, isDisabled: boolean, selected: boolean): string => {
  const { primaryColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastMediumColor: contrastMediumColorDark,
    disabledColor: disabledColorDark,
  } = getThemedColors('dark');

  const background = `transparent 0% 0% / ${fontLineHeight}`;
  const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${fontLineHeight}))`;
  const { canvasTextColor } = getHighContrastColors();

  const uncheckedColor = isDisabled ? disabledColor : contrastMediumColor;
  const uncheckedColorDark = isDisabled ? disabledColorDark : contrastMediumColorDark;
  const checkedColor = isHighContrastMode ? canvasTextColor : isDisabled ? disabledColor : primaryColor;
  const checkedColorDark = isHighContrastMode ? canvasTextColor : isDisabled ? disabledColorDark : primaryColorDark;

  const checkedIconColor = escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
  const checkedIconColorDark = escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);

  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
  const paddingTop = `calc((${dimensionFull} - ${fontLineHeight}) / 2)`; // Vertically centers the checkbox label relative to the checkbox size.

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          scrollMargin: '6px', // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
        }),
      },
      slot: {
        display: 'block',
        paddingTop,
      },
    },
    option: {
      ...getOptionJssStyle('multi-select-option', 1, theme),
      columnGap: '8px',
    },
    checkbox: {
      position: 'relative',
      flexShrink: 0,
      width: dimension,
      height: dimension,
      font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
      display: 'block',
      background,
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
      border: `${borderWidthBase} solid ${uncheckedColor}`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: uncheckedColorDark,
      }),
      gridArea: '1/1',
      borderRadius: borderRadiusSmall,
      ...addImportantToEachRule({
        backgroundSize: 'cover',
      }),
      ...(selected && {
        borderColor: checkedColor,
        backgroundColor: checkedColor,
        backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
          borderColor: checkedColorDark,
          backgroundColor: checkedColorDark,
        }),
        // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
        ...(isHighContrastMode &&
          getSchemedHighContrastMediaQuery(
            {
              backgroundImage: getCheckedSVGBackgroundImage('white'),
            },
            {
              backgroundImage: getCheckedSVGBackgroundImage('black'),
            }
          )),
      }),
    },
  });
};
