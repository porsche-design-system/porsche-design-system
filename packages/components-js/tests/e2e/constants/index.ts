type Options = {
  color?: 'default' | 'neutral' | 'success' | 'error' | 'transparent';
  css?: 'outline' | 'boxShadow';
  offset?: string;
  width?: string;
};

export const expectedStyleOnFocus = (opts?: Options): string => {
  const options: Options = {
    color: 'default',
    css: 'outline',
    offset: '1px',
    width: '1px',
    ...opts
  };

  const colors = {
    'default': 'rgb(0, 0, 0)',
    'neutral': 'rgb(98, 102, 105)',
    'success': 'rgb(1, 138, 22)',
    'error': 'rgb(224, 0, 0)',
    'transparent': 'rgba(0, 0, 0, 0)'
  }

  if (options.css === 'boxShadow') {
    return `${colors[options.color]} 0px 0px 0px ${options.width}`;
  }
  return `${colors[options.color]} solid ${options.width} ${options.offset}`;
}
