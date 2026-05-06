import { addImportantToEachRule, forcedColorsMediaQuery, getTransition, hostHiddenStyles } from '../../styles';
import {
  blurFrosted,
  colorContrastHigh,
  colorFrosted,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusSm,
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
        padding: '1px 6px 1px 4px',
        borderRadius: radiusSm,
        font: `${fontWeightNormal} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
        color: colorContrastHigh,
        background: colorFrosted,
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
