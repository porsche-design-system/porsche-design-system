type Options = {
  theme?: 'light' | 'dark',
  color?: 'default' | 'neutral' | 'success' | 'error' | 'transparent';
  css?: 'outline' | 'boxShadow';
  offset?: string;
  width?: string;
};

export const expectedStyleOnFocus = (opts?: Options): string => {
  const options: Options = {
    theme: 'light',
    color: 'default',
    css: 'outline',
    offset: '1px',
    width: '1px',
    ...opts
  };

  const colors = {
    'light': {
      'default': 'rgb(0, 0, 0)',
      'neutral': 'rgb(98, 102, 105)',
      'success': 'rgb(1, 138, 22)',
      'error': 'rgb(224, 0, 0)',
      'transparent': 'rgba(0, 0, 0, 0)'
    },
    'dark': {
      'default': 'rgb(255, 255, 255)',
      'neutral': 'rgb(176, 177, 178)',
      'success': 'rgb(1, 186, 29)',
      'error': 'rgb(252, 23, 23)',
      'transparent': 'rgba(0, 0, 0, 0)'
    }
  }

  if (options.css === 'boxShadow') {
    return `${colors[options.theme][options.color]} 0px 0px 0px ${options.width}`;
  }
  return `${colors[options.theme][options.color]} solid ${options.width} ${options.offset}`;
}
