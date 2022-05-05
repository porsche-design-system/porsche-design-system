import type { JssStyle, Styles } from 'jss';

export const getFunctionalComponentPrevNextButtonStyles = (
  gradientColor: string,
  prevNextButtonStyle?: JssStyle
): Styles => {
  const gradientColorTransparent = gradientColor + (gradientColor.length === 4 ? '0' : '00');

  return {
    action: {
      display: 'flex',
      position: 'absolute',
      top: 0,
      height: '100%',
      alignItems: 'center',
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
    button: {
      position: 'absolute',
      top: '50%',
      transform: 'translate3d(0,-50%,0)',
      ...prevNextButtonStyle,
    },
    gradient: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '2em',
      pointerEvents: 'none',
    },
  };
};
