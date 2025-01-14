import { getFontFaceStyles, getFontLinks, getInitialStyles } from '@porsche-design-system/components-react/partials';

export const HeaderPartials = (): JSX.Element => {
  return process.env.NODE_ENV === 'production' ? (
    <>
      {getInitialStyles({ format: 'jsx' })}
      {getFontFaceStyles({ format: 'jsx' })}
      {getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold', 'bold'] })}
    </>
  ) : (
    <>
      {getInitialStyles({ format: 'jsx' })}
      <style
        data-pds-font-face-styles=""
        dangerouslySetInnerHTML={{
          __html: getFontFaceStyles({ format: 'html' })
            .replace(/<\/?style[^>]*?>/g, '')
            .replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'),
        }}
      ></style>
      {Array.from(getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }).matchAll(/https:\/\/[a-z0-9./-]+/g))
        .map(([url]) => url.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
        .map((url) => (
          <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="" />
        ))}
    </>
  );
};
