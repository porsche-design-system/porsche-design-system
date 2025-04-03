import { getFontFaceStyles, getFontLinks, getInitialStyles } from '@porsche-design-system/components-react/partials';
import { getComponentChunkLinks, getIconLinks } from '@porsche-design-system/partials/src';
import { prefetchDNS, preload } from 'react-dom';

export const HeaderPartials = (): JSX.Element => {
  const getHref = (href: string) => {
    return process.env.NODE_ENV === 'production'
      ? href
      : href.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001');
  };
  /* preloads Porsche Next font (=> minimize FOUT) */
  // biome-ignore lint/complexity/noForEach: <explanation>
  getFontLinks({ format: 'js', weights: ['regular', 'semi-bold', 'bold'] }).forEach(({ href, options }) =>
    preload(getHref(href), options)
  );
  /* preloads PDS component core chunk from CDN for PDS component hydration (=> improve loading performance) */
  // biome-ignore lint/complexity/noForEach: <explanation>
  getComponentChunkLinks({
    components: ['accordion', 'button', 'canvas', 'tabs-bar', 'scroller', 'icon'],
    format: 'js',
  }).forEach(({ href, options }) => preload(getHref(href), options));
  /* preloads Porsche icons (=> minimize FOUC) */
  // biome-ignore lint/complexity/noForEach: <explanation>
  getIconLinks({ format: 'js', icons: ['search', 'configurate', 'sidebar', 'external'] }).forEach(({ href }) =>
    prefetchDNS(getHref(href))
  );

  return process.env.NODE_ENV === 'production' ? (
    <>
      {getInitialStyles({ format: 'jsx' })}
      {getFontFaceStyles({ format: 'jsx' })}
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
    </>
  );
};
