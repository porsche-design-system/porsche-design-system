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
  spacingStaticMedium,
  themeDarkBackgroundShading,
} from '../../../../utilities/projects/utilities';
import { FlyoutPosition } from './flyout-utils';

export const flyoutBoxShadowColor = 'rgba(204, 204, 204, 0.35)';
export const flyoutBoxShadowColorDark = 'rgba(0, 0, 0, 0.6)';

const flyoutTransitionDuration = '0.5s';
const flyoutTransitionTimingFunction = 'cubic-bezier(0.77, 0, 0.175, 1)';

const cssVariableMaxWidth = '--p-flyout-max-width';
const maxWidthDefault = '1180px';
const minWidthDefault = '320px';

export const getComponentCss = (
  isOpen: boolean,
  position: FlyoutPosition,
  hasHeader: boolean,
  hasFooter: boolean,
  hasSecondaryContent: boolean,
  theme: Theme
): string => {
  const { primaryColor, backgroundColor, contrastHighColor } = getThemedColors(theme);
  const isPositionLeft = position === 'left';
  const translatePosition = isPositionLeft ? '-100%' : '100%';
  const contentPadding = `${spacingStaticMedium} ${spacingFluidLarge} ${spacingStaticMedium} ${spacingFluidLarge}`;
  const shadowColor = theme === 'dark' ? flyoutBoxShadowColorDark : flyoutBoxShadowColor;

  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        display: 'flex',
        position: 'fixed',
        zIndex: FLYOUT_Z_INDEX,
        ...getInsetJssStyle(),
        ...getVisibilityJssStyles(isOpen),
        ...getFrostedGlassBackgroundJssStyles(isOpen),
        ...hostHiddenStyles,
      },
    }),
    header: {
      display: 'flex',
      justifyContent: 'flex-end',
      background: backgroundColor,
      position: 'sticky',
      top: 0,
    },
    ...(hasHeader && {
      'header-content': {
        flex: 'auto',
        padding: `${spacingStaticMedium} 0 ${spacingStaticMedium} ${spacingFluidLarge}`,
      },
    }),
    dismiss: {
      margin: spacingStaticMedium,
      height: 'fit-content',
      border: `2px solid ${backgroundColor}`, // needed to enlarge button slightly without affecting the hover area (are equal now).
      borderRadius: '4px',
      background: backgroundColor,
      ...hoverMediaQuery({
        '&:hover': {
          background: contrastHighColor,
          borderColor: contrastHighColor,
        },
      }),
    },
    root: {
      color: primaryColor, // enables color inheritance for slotted content
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      [isPositionLeft ? 'marginRight' : 'marginLeft']: 'auto',
      boxSizing: 'border-box',
      ...(hasSecondaryContent && {
        overflowY: 'auto',
      }),
      height: '100%',
      minWidth: minWidthDefault,
      maxWidth: `var(${cssVariableMaxWidth}, ${maxWidthDefault})`,
      background: backgroundColor,
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'initial' : `translate3d(${translatePosition}, 0, 0)`,
      transition: `opacity ${flyoutTransitionDuration} ${flyoutTransitionTimingFunction} ${
        isOpen ? '0s' : flyoutTransitionDuration
      }, transform ${flyoutTransitionDuration} ${flyoutTransitionTimingFunction}`,
      boxShadow: `${isPositionLeft ? '3px' : '-3px'} 0px 10px rgba(0, 0, 0, 0.35)`,
    },
    content: {
      padding: contentPadding,
      // If secondary content is used scroll shadows have to be done via JS
      ...(!hasSecondaryContent && {
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        backgroundImage: `linear-gradient(to top, ${backgroundColor}, ${backgroundColor}), linear-gradient(to top, ${backgroundColor}, ${backgroundColor}), linear-gradient(to top, ${shadowColor}, rgba(255, 255, 255, 0)), linear-gradient(to bottom, ${shadowColor}, rgba(255, 255, 255, 0))`,
        backgroundPosition: 'bottom center, top center, bottom center, top center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 20px, 100% 20px, 100% 10px, 100% 10px',
        backgroundAttachment: 'local, local, scroll, scroll',
      }),
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
      transition: `opacity ${flyoutTransitionDuration} ${transitionTimingFunction}, backdrop-filter ${flyoutTransitionDuration} ${transitionTimingFunction}, --webkit-backdrop-filter ${flyoutTransitionDuration} ${transitionTimingFunction}`,
    },
  };
};
