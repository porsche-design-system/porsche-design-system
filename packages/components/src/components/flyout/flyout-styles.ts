import { getCss, Theme } from '../../utils';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors, hostHiddenStyles } from '../../styles';
import { JssStyle } from 'jss';
import { FLYOUT_Z_INDEX } from '../../constants';
import {
  frostedGlassStyle,
  spacingFluidMedium,
  themeDarkBackgroundShading,
} from '../../../../utilities/projects/utilities';
import { FlyoutPosition } from './flyout-utils';

const flyoutTransitionDuration = '0.5s';
const flyoutTransitionTimingFunction = 'cubic-bezier(0.77, 0, 0.175, 1)';

const cssVariableMaxWidth = '--p-flyout-max-width';

const selectorHeader = '::slotted([slot=header])';
const selectorFooter = '::slotted([slot=footer])';

export const getComponentCss = (isOpen: boolean, position: FlyoutPosition, theme: Theme): string => {
  const { backgroundColor } = getThemedColors(theme);
  const boxShadowColor = 'rgba(204, 204, 204, 0.35)';
  const translatePosition = position === 'left' ? '-100%' : '100%';

  return getCss({
    '@global': {
      ':host': {
        [cssVariableMaxWidth]: '1180px',
        ...addImportantToEachRule({
          position: 'fixed',
          zIndex: FLYOUT_Z_INDEX,
          ...getInsetJssStyle(),
          ...getVisibilityJssStyles(isOpen),
          ...getFrostedGlassBackgroundJssStyles(isOpen),
          ...hostHiddenStyles,
        }),
      },
      [selectorHeader]: {
        background: backgroundColor,
        padding: `16px ${spacingFluidMedium}`,
        position: 'sticky',
        top: 0,
        boxShadow: `${boxShadowColor} 0px 5px 10px`,
      },
      [selectorFooter]: {
        background: backgroundColor,
        padding: `16px ${spacingFluidMedium}`,
        position: 'sticky',
        bottom: 0,
        boxShadow: `${boxShadowColor} 0px -5px 10px`,
      },
    },
    dismiss: {
      position: 'absolute',
      top: spacingFluidMedium,
      [position]: spacingFluidMedium,
      zIndex: 1,
      opacity: isOpen ? 1 : 0,
    },
    root: {
      position: 'absolute',
      [position]: 0,
      boxSizing: 'border-box',
      height: '100%',
      overflowY: 'auto',
      minWidth: '320px',
      maxWidth: `var(${cssVariableMaxWidth})`,
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
      transition: `opacity ${duration} ${transitionTimingFunction} ${delay},
        backdrop-filter ${duration} ${transitionTimingFunction} ${delay},
        --webkit-backdrop-filter ${duration} ${transitionTimingFunction} ${delay}`,
    },
  };
};
