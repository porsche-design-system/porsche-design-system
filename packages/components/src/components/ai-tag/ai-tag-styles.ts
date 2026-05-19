import { addImportantToEachRule, forcedColorsMediaQuery, getTransition, hostHiddenStyles } from '../../styles';
import {
  blurFrosted,
  colorContrastHigh,
  colorFrostedStrong,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  spacingStaticSm,
  spacingStaticXs,
  typescale2Xs,
  typescaleSm,
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
          font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        }),
      },
      abbr: {
        all: 'unset',
      },
      div: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: `0 ${spacingStaticSm} 0 ${spacingStaticXs}`,
        borderRadius: `var(${legacyRadiusSmall}, calc(${spacingStaticXs} + (${leadingNormal} / 2)))`, // ensures pill shape has a maximum border radius to support multiline.
        fontSize: typescale2Xs,
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
