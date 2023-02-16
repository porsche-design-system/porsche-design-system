import { getFontLinks, getInitialStyles } from '@porsche-design-system/components-react/partials';
import { getSharedStyles } from '../../nextjs/styles/getSharedStyles';

export const HeadPartials = (): JSX.Element => {
  return (
    <>
      <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.10be24507223bc4ef63effe0eb750e58.png" />

      {getInitialStyles({ format: 'jsx' })}
      <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css" />
      {getFontLinks({ weights: ['regular', 'semi-bold', 'bold'], withoutTags: true })
        .map((x) => x.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
        .map((url) => (
          <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="" />
        ))}
      {getSharedStyles()}
    </>
  );
};
