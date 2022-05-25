import { getCss } from '../utils';
// import { addImportantToEachRule } from '../styles';

export const getComponentCss = (wrap: boolean, maxWidth: number): string => {
  const minWidth = maxWidth > 200 ? 200 : maxWidth;

  return getCss({
    '@global': {
      ':host': {
        display: wrap ? 'grid' : 'inline-grid',
        gridAutoColumns: '1fr',
        gridAutoRows: '1fr',
        gridGap: '4px',
        ...(wrap
          ? {
              gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, min-content))`,
            }
          : {
              gridAutoFlow: 'column',
            }),
      },
    },
  });
};
