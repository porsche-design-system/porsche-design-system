import { getFontFaceStyles, getFontLinks, getInitialStyles } from '@porsche-design-system/components-react/partials';

type Props = {
  cdn?: 'local' | 'auto' | 'cn';
};

export const HeaderPartials = ({ cdn = 'local' }: Props): JSX.Element => {
  return cdn !== 'local' ? (
    <>
      {getInitialStyles({ format: 'jsx' })}
      {getFontFaceStyles({ format: 'jsx', cdn })}
      {getFontLinks({ format: 'jsx', cdn, weights: ['regular', 'semi-bold', 'bold'] })}
    </>
  ) : (
    <>
      {getInitialStyles({ format: 'jsx' })}
      <link rel="stylesheet" href="http://localhost:3001/styles/font-face.css" />
      {Array.from(getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }).matchAll(/https:\/\/[a-z0-9./-]+/g))
        .map(([url]) => url.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
        .map((url) => (
          <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="" />
        ))}
    </>
  );
};
