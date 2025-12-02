import { getFontLinks } from '@porsche-design-system/components-react/partials';
import { getSharedStyles } from '../../nextjs/styles/getSharedStyles';

export const HeadPartials = (): JSX.Element => {
  return (
    <>
      <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.d42ac2876697ec701e95e4a4d608fb0e.png" />

      <link rel="stylesheet" href="http://localhost:3001/styles/font-face.css" />
      {Array.from(getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }).matchAll(/https:\/\/[a-z0-9./-]+/g))
        .map(([url]) => url.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
        .map((url) => (
          <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="" />
        ))}
      {getSharedStyles()}
    </>
  );
};
