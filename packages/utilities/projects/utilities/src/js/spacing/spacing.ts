export const spacing: {
  static: { [key in 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge']: string };
  fluid: { [key in 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge']: string };
} = {
  static: {
    xSmall: '4px',
    small: '8px',
    medium: '16px',
    large: '32px',
    xLarge: '48px',
    xxLarge: '80px',
  },
  fluid: {
    xSmall: 'clamp(.25rem, 0.28vw + 0.19rem, .5rem)',
    small: '.75rem',
    medium: 'clamp(2rem, 0.56vw + 1.89rem, 2.5rem)',
    large: 'clamp(3.5rem, 2.22vw + 3.06rem, 5.5rem)',
    xLarge: 'clamp(4rem, 10vw + 2rem, 13rem)',
  },
};
