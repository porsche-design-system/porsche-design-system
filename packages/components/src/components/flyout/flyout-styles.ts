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
  frostedGlassStyle,
  spacingFluidLarge,
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
  hasSecondaryContent: boolean,
  theme: Theme
): string => {
  const { backgroundColor, contrastHighColor } = getThemedColors(theme);
  const isPositionLeft = position === 'left';
  const translatePosition = isPositionLeft ? '-100%' : '100%';
  const contentPadding = isPositionLeft
    ? `${spacingStaticMedium} ${spacingFluidLarge} ${spacingStaticMedium} ${spacingFluidMedium}`
    : `${spacingStaticMedium} ${spacingFluidMedium} ${spacingStaticMedium} ${spacingFluidLarge}`;

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
    }),
    ...(hasHeader && {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        background: backgroundColor,
        position: 'sticky',
        top: 0,
      },
      'header-content': {
        flex: 'auto',
        padding: isPositionLeft
          ? `${spacingStaticMedium} ${spacingFluidLarge} ${spacingStaticMedium} 0`
          : `${spacingStaticMedium} 0 ${spacingStaticMedium} ${spacingFluidLarge}`,
        ...(isPositionLeft && { order: 1 }),
      },
    }),
    dismiss: {
      ...(!hasHeader
        ? {
            position: 'sticky',
            top: spacingStaticMedium,
            [position]: spacingStaticMedium,
            margin: `${spacingStaticMedium} 0`,
            alignSelf: isPositionLeft ? 'flex-start' : 'flex-end',
          }
        : {
            margin: spacingStaticMedium,
          }),
      height: 'fit-content',
      ...hoverMediaQuery({
        '&:hover': {
          background: contrastHighColor,
          borderColor: contrastHighColor,
        },
      }),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      [position]: 0,
      boxSizing: 'border-box',
      overflowY: 'auto',
      height: '100%',
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
      padding: contentPadding,
    },
    ...(hasFooter && {
      footer: {
        background: backgroundColor,
        padding: contentPadding,
        position: 'sticky',
        bottom: 0,
      },
    }),
    ...(hasSecondaryContent && {
      ['secondary-content']: {
        padding: contentPadding,
      },
    }),
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
