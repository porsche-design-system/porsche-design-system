import { getFontFaceStyles, getFontLinks, getInitialStyles } from '@porsche-design-system/components-react/partials';
import { getComponentChunkLinks, getIconLinks } from '@porsche-design-system/partials/src';

export const HeaderPartials = (): JSX.Element => {
  return process.env.NODE_ENV === 'production' ? (
    <>
      {getInitialStyles({ format: 'jsx' })}
      {getFontFaceStyles({ format: 'jsx' })}
      {getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold', 'bold'] })}
      {getComponentChunkLinks({ format: 'jsx', components: ['tabs-bar', 'scroller'] })}
      {getIconLinks({ format: 'jsx', icons: ['arrow-head-left', 'arrow-head-right'] })}
    </>
  ) : (
    <>
      {getInitialStyles({ format: 'jsx' })}
      <style
        data-pds-font-face-styles=""
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Only used locally
        dangerouslySetInnerHTML={{
          __html: getFontFaceStyles({ format: 'html' })
            .replace(/<\/?style[^>]*?>/g, '')
            .replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'),
        }}
      />
      {Array.from(getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }).matchAll(/https:\/\/[a-z0-9./-]+/g))
        .map(([url]) => url.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
        .map((url) => (
          <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="" />
        ))}
    </>
  );
};
