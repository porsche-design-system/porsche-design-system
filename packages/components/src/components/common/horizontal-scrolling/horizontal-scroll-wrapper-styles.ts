import { getFunctionalComponentPrevNextButtonStyles } from './prev-next-button-styles';
import type { Styles } from 'jss';
import type { Properties } from 'csstype';
import type { TextWeight } from '../../../types';

export const getFunctionalComponentHorizontalScrollWrapperStyles = (
  gradientColor: string,
  additionalRootStyles?: Properties,
  barOptions?: { weight: TextWeight; activeColor: string; transitionDuration: string }
): Styles => {
  const { weight, activeColor, transitionDuration } = barOptions || {};
  return {
    root: {
      position: 'relative',
      margin: '0 -4px',
      ...additionalRootStyles,
    },
    'scroll-area': {
      position: 'relative',
      padding: '4px 4px 0',
      overflowY: 'hidden',
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      msOverflowStyle: 'none' /* IE and Edge */,
      scrollbarWidth: 'none' /* Firefox */,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    // Extra wrapper needed to compensate different offset parent calculation depending of browser.
    // Needed for position of status bar.
    'scroll-wrapper': {
      position: 'relative',
      display: 'inline-block',
      padding: barOptions ? '0 0 .5em' : 0,
      minWidth: '100%',
    },
    trigger: {
      display: 'block',
      position: 'absolute',
      top: 0,
      height: '100%',
      width: '1px',
      visibility: 'hidden',
      '&:first-of-type': {
        left: 0,
      },
      '&:last-of-type': {
        right: 0,
      },
    },
    ...(barOptions && {
      bar: {
        display: 'block',
        position: 'absolute',
        width: 0,
        height: weight === 'semibold' ? '.125em' : '.09375em',
        left: 0,
        bottom: 0,
        background: activeColor,
        '&--enable-transition': {
          willChange: 'width',
          transition: `transform ${transitionDuration},width ${transitionDuration}`,
        },
      },
    }),
    ...getFunctionalComponentPrevNextButtonStyles(gradientColor, !!barOptions),
  };
};
