import {
  blurFrosted,
  colorContrastHigh,
  colorFrostedStrong,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  spacingStaticSm,
  spacingStaticXs,
  typescale2Xs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, forcedColorsMediaQuery, getTransition, hostHiddenStyles } from '../../styles';
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
          font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        }),
      },
      abbr: {
        all: 'unset',
      },
      div: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: `0 ${ref(spacingStaticSm)} 0 ${ref(spacingStaticXs)}`,
        borderRadius: `calc(${ref(spacingStaticXs)} + (${ref(leadingNormal)} / 2))`, // ensures pill shape has a maximum border radius to support multiline.
        fontSize: ref(typescale2Xs),
        color: ref(colorContrastHigh),
        background: ref(colorFrostedStrong),
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
        ...forcedColorsMediaQuery({
          outline: '1px solid transparent',
        }),
        transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`,
        '&::before': {
          content: '""',
          width: '1rem',
          height: '1rem',
          background: ref(colorContrastHigh),
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
