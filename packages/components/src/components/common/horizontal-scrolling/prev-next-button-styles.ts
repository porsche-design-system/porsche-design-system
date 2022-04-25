import type { Styles } from 'jss';

export const getFunctionalComponentPrevNextButtonStyles = (
  gradientColor: string,
  gradientColorTransparent: string
): Styles => {
  return {
    action: {
      display: 'flex',
      position: 'absolute',
      top: '4px',
      transform: 'translate3d(0,0,0)',
      '&--prev': {
        left: 0,
        justifyContent: 'flex-start',
        '& $gradient': {
          background: `linear-gradient(90deg, ${gradientColor} 50%, ${gradientColorTransparent} 100%)`,
        },
      },
      '&--next': {
        right: 0,
        justifyContent: 'flex-end',
        '& $gradient': {
          background: `linear-gradient(90deg, ${gradientColorTransparent} 0%, ${gradientColor} 50%)`,
        },
      },
      '&--hidden': {
        visibility: 'hidden', // to make offsetWidth work
      },
    },
    gradient: {
      position: 'absolute',
      top: '-4px',
      bottom: '-.5em',
      width: '2em',
      pointerEvents: 'none',
    },
  };
};
