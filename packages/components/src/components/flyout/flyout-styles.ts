import { getCss, Theme } from '../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { JssStyle } from 'jss';
import { FLYOUT_Z_INDEX } from '../../constants';
import {
  fontLineHeight,
  frostedGlassStyle,
  spacingFluidMedium,
  spacingStaticMedium,
  themeDarkBackgroundShading,
} from '../../../../utilities/projects/utilities';
import { FlyoutPosition } from './flyout-utils';

const flyoutTransitionDuration = '0.5s';
const flyoutTransitionTimingFunction = 'cubic-bezier(0.77, 0, 0.175, 1)';

const cssVariableMaxWidth = '--p-flyout-max-width';
const maxWidthDefault = '1180px';

export const getComponentCss = (
  isOpen: boolean,
  position: FlyoutPosition,
  hasHeader: boolean,
  hasFooter: boolean,
  theme: Theme
): string => {
  const { backgroundColor, contrastHighColor } = getThemedColors(theme);
  const boxShadowColor = 'rgba(204, 204, 204, 0.35)';
  const translatePosition = position === 'left' ? '-100%' : '100%';

  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        position: 'fixed',
        zIndex: FLYOUT_Z_INDEX,
        ...getInsetJssStyle(),
        ...getVisibilityJssStyles(isOpen),
        ...getFrostedGlassBackgroundJssStyles(isOpen),
        ...hostHiddenStyles,
      },
      '::slotted': {
        ...(hasHeader && {
          '&([slot=header])': {
            padding: `${spacingStaticMedium} ${spacingFluidMedium}`,
            [position === 'left' ? 'marginLeft' : 'marginRight']: `calc(${spacingStaticMedium} + ${fontLineHeight})`,
          },
        }),
        ...(hasFooter && {
          '&([slot=footer])': {
            background: backgroundColor,
            padding: `${spacingStaticMedium} ${spacingFluidMedium}`,
            position: 'sticky',
            bottom: 0,
            boxShadow: `${boxShadowColor} 0px -5px 10px`,
          },
        }),
      },
    }),
    dismiss: {
      position: 'absolute',
      top: spacingStaticMedium,
      [position]: spacingStaticMedium,
      zIndex: 1,
      opacity: isOpen ? 1 : 0,
      ...hoverMediaQuery({
        '&:hover': {
          background: contrastHighColor,
          borderColor: contrastHighColor,
        },
      }),
    },
    ...(hasHeader && {
      header: {
        background: backgroundColor,
        position: 'sticky',
        top: 0,
        boxShadow: `${boxShadowColor} 0px 5px 10px`,
      },
    }),
    root: {
      position: 'absolute',
      [position]: 0,
      boxSizing: 'border-box',
      height: '100%',
      overflowY: 'auto',
      minWidth: '320px',
      maxWidth: `var(${cssVariableMaxWidth}, ${maxWidthDefault})`,
      background: backgroundColor,
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translateX(0)' : `translateX(${translatePosition})`,
      transition: `opacity ${flyoutTransitionDuration} ${flyoutTransitionTimingFunction} ${
        isOpen ? '0s' : flyoutTransitionDuration
      }, transform ${flyoutTransitionDuration} ${flyoutTransitionTimingFunction}`,
    },
    content: {
      padding: spacingFluidMedium,
    },
  });
};

const getVisibilityJssStyles = (isOpen: boolean): JssStyle =>
  isOpen
    ? {
        visibility: 'inherit',
      }
    : {
        visibility: 'hidden',
        transition: `visibility 0s linear ${flyoutTransitionDuration}`,
      };

const getFrostedGlassBackgroundJssStyles = (isOpen: boolean): JssStyle => {
  const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';
  const durationFadeOut = '0.25s';
  const duration = isOpen ? flyoutTransitionDuration : durationFadeOut;
  const delay = isOpen ? '0s' : durationFadeOut;
  return {
    '&::before': {
      content: '""',
      position: 'fixed',
      ...getInsetJssStyle(),
      background: themeDarkBackgroundShading,
      pointerEvents: 'none',
      ...(isOpen
        ? {
            opacity: 1,
            ...frostedGlassStyle,
          }
        : {
            opacity: 0,
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
          }),
      transition: `opacity ${duration} ${transitionTimingFunction} ${delay}, backdrop-filter ${duration} ${transitionTimingFunction} ${delay}, --webkit-backdrop-filter ${duration} ${transitionTimingFunction} ${delay}`,
    },
  };
};
