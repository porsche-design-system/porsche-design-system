import type { Styles } from 'jss';

export const getFunctionalComponentPrevNextButtonStyles = (gradientColor: string, withBar: boolean): Styles => {
  const gradientColorTransparent = gradientColor + (gradientColor.length === 4 ? '0' : '00');

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
    // TODO: should get his position naturally to get correct position with bar and without
    gradient: {
      position: 'absolute',
      top: withBar ? '-4px' : 0,
      bottom: withBar ? '-.5em' : 0,
      width: '2em',
      pointerEvents: 'none',
    },
  };
};
