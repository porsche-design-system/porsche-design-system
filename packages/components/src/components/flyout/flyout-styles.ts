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
  const contentPadding = `${spacingStaticMedium} ${spacingFluidLarge} ${spacingStaticMedium} ${spacingFluidLarge}`;

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
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      [position]: 0,
      boxSizing: 'border-box',
      overflowY: 'auto',
      overflowX: 'hidden',
      height: '100%',
      width: '100%',
      minWidth: '320px',
      maxWidth: `var(${cssVariableMaxWidth}, ${maxWidthDefault})`,
      background: backgroundColor,
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translate3d(0)' : `translate3d(${translatePosition}, 0, 0)`,
      transition: `opacity ${flyoutTransitionDuration} ${flyoutTransitionTimingFunction} ${
        isOpen ? '0s' : flyoutTransitionDuration
      }, transform ${flyoutTransitionDuration} ${flyoutTransitionTimingFunction}`,
      boxShadow: `${isPositionLeft ? '3px' : '-3px'} 0px 10px rgba(0, 0, 0, 0.35)`,
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
