type Options = {
  theme?: 'light' | 'dark',
  color?: 'default' | 'neutral' | 'contrastHigh' | 'success' | 'error' | 'brand' | 'active' | 'transparent';
  css?: 'outline' | 'boxShadow';
  offset?: string;
  width?: string;
};

const colors = {
  'light': {
    'default': 'rgb(0, 0, 0)',
    'neutral': 'rgb(98, 102, 105)',
    'contrastHigh': 'rgb(50, 54, 57)',
    'success': 'rgb(1, 138, 22)',
    'error': 'rgb(224, 0, 0)',
    'brand': 'rgb(213, 0, 28)',
    'active': 'rgb(213, 0, 28)',
    'transparent': 'rgba(0, 0, 0, 0)'
  },
  'dark': {
    'default': 'rgb(255, 255, 255)',
    'neutral': 'rgb(176, 177, 178)',
    'contrastHigh': 'rgb(227, 228, 229)',
    'success': 'rgb(1, 186, 29)',
    'error': 'rgb(252, 23, 23)',
    'brand': 'rgb(213, 0, 28)',
    'active': 'rgb(255, 2, 35)',
    'transparent': 'rgba(0, 0, 0, 0)'
  }
}

export const expectedStyleOnFocus = (opts?: Options): string => {
  const options: Options = {
    theme: 'light',
    color: 'default',
    css: 'outline',
    offset: '1px',
    width: '1px',
    ...opts
  };

  return options.css === 'boxShadow'
    ? `${colors[options.theme][options.color]} 0px 0px 0px ${options.width}`
    : `${colors[options.theme][options.color]} solid ${options.width} ${options.offset}`;
}
