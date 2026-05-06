import { addImportantToEachRule, forcedColorsMediaQuery, getTransition, hostHiddenStyles } from '../../styles';
import {
  blurFrosted,
  colorContrastHigh,
  colorFrostedStrong,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  spacingStatic2Xs,
  spacingStaticSm,
  spacingStaticXs,
  typescale2Xs,
} from '../../styles/css-variables';
import { getCss } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { AI_TAG_ICON_PATH } from './ai-tag-utils';

export const getComponentCss = (): string => {
  const iconMask = `${getInlineSVGBackgroundImage(AI_TAG_ICON_PATH)} center/contain no-repeat`;

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        whiteSpace: 'nowrap',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      abbr: {
        all: 'unset',
      },
      div: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: `calc(2*${spacingStatic2Xs}) ${spacingStaticSm} calc(2*${spacingStatic2Xs}) ${spacingStaticXs}`,
        borderRadius: `var(${legacyRadiusSmall}, calc(${spacingStaticXs} + (${leadingNormal} / 2)))`, // ensures pill shape has a maximum border radius to support multiline.
        font: `${fontWeightNormal} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
        color: colorContrastHigh,
        background: colorFrostedStrong,
        WebkitBackdropFilter: blurFrosted,
        backdropFilter: blurFrosted,
        ...forcedColorsMediaQuery({
          outline: '1px solid transparent',
        }),
        transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`,
        '&::before': {
          content: '""',
          width: '1rem',
          height: '1rem',
          background: colorContrastHigh,
          mask: iconMask,
          WebkitMask: iconMask,
          ...forcedColorsMediaQuery({
            background: 'CanvasText',
          }),
        },
      },
    },
  });
};
