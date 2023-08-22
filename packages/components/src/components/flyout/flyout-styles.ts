import { getCss, isThemeDark, scrollShadowColor, scrollShadowColorDark, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  getFrostedGlassBackgroundJssStyles,
  getInsetJssStyle,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { FLYOUT_Z_INDEX } from '../../constants';
import { spacingFluidLarge, spacingStaticMedium } from '@porsche-design-system/utilities-v2';
import type { FlyoutPosition } from './flyout-utils';

export const headerShadowClass = 'header--shadow';
export const footerShadowClass = 'footer--shadow';

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
  hasSubFooter: boolean,
  theme: Theme
): string => {
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { contrastHighColor: darkThemeContrastHighColor } = getThemedColors('dark');
  const isPositionLeft = position === 'left';
  const contentPadding = `${spacingStaticMedium} ${spacingFluidLarge} ${spacingStaticMedium} ${spacingFluidLarge}`;
  const isDark = isThemeDark(theme);
  const shadowColor = isDark ? scrollShadowColorDark : scrollShadowColor;
  const transparentColor = isDark ? 'rgba(14, 14, 18, 0)' : 'rgba(255, 255, 255, 0)';

  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        display: 'flex',
        position: 'fixed',
        zIndex: FLYOUT_Z_INDEX,
        ...(isOpen
          ? {
              visibility: 'inherit',
            }
          : {
              visibility: 'hidden',
              transition: `visibility 0s linear ${flyoutTransitionDuration}`,
            }),
        ...getInsetJssStyle(),
        ...getFrostedGlassBackgroundJssStyles(isOpen, flyoutTransitionDuration),
        ...hostHiddenStyles,
      },
    }),
    header: {
      display: 'flex',
      ...(hasHeader && {
        flexDirection: 'row-reverse',
      }),
      justifyContent: 'flex-end',
      background: backgroundColor,
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    [headerShadowClass]: {
      boxShadow: `${isDark ? scrollShadowColorDark : scrollShadowColor} 0px 5px 10px`,
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
          background: darkThemeContrastHighColor,
          borderColor: darkThemeContrastHighColor,
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
      ...(hasSubFooter && {
        overflowY: 'auto',
        overscrollBehaviorY: 'none',
      }),
      height: '100%',
      minWidth: minWidthDefault,
      maxWidth: `var(${cssVariableMaxWidth}, ${maxWidthDefault})`,
      background: backgroundColor,
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'initial' : `translate3d(${isPositionLeft ? '-100%' : '100%'}, 0, 0)`,
      transition: `opacity ${flyoutTransitionDuration} ${flyoutTransitionTimingFunction} ${
        isOpen ? '0s' : flyoutTransitionDuration
      }, transform ${flyoutTransitionDuration} ${flyoutTransitionTimingFunction}`,
      boxShadow: `${isPositionLeft ? '3px' : '-3px'} 0px 30px rgba(0, 0, 0, 0.25)`,
    },
    content: {
      padding: contentPadding,
      position: 'relative',
      zIndex: 0,
      // If sub-footer is used scroll shadows have to be done via JS
      ...(!hasSubFooter && {
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        backgroundImage: `linear-gradient(to top, ${backgroundColor}, ${backgroundColor}), linear-gradient(to top, ${backgroundColor}, ${backgroundColor}), linear-gradient(to top, ${shadowColor}, ${transparentColor}), linear-gradient(to bottom, ${shadowColor}, ${transparentColor})`,
        backgroundPosition: 'bottom center, top center, bottom center, top center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 20px, 100% 20px, 100% 10px, 100% 10px',
        backgroundAttachment: 'local, local, scroll, scroll',
        overscrollBehaviorY: 'none',
      }),
    },
    ...(hasFooter && {
      footer: {
        background: backgroundColor,
        padding: contentPadding,
        position: 'sticky',
        zIndex: 1,
        bottom: 0,
      },
      [footerShadowClass]: {
        boxShadow: `${isDark ? scrollShadowColorDark : scrollShadowColor} 0px -5px 10px`,
      },
    }),
    ...(hasSubFooter && {
      'sub-footer': {
        padding: contentPadding,
      },
    }),
  });
};
