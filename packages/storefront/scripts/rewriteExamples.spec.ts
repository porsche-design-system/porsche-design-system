import { describe, expect, it } from 'vitest';
import { examplesMediaPath, insertBasePath, rewriteCdnUrlsForDev } from './rewriteExamples';

describe('insertBasePath()', () => {
  const html = `<img src="${examplesMediaPath}718.webp" /><video poster="${examplesMediaPath}mood.webp"></video>`;

  it('puts the slug in front of every media path', () => {
    expect(insertBasePath(html, 'v4')).toBe(
      '<img src="/v4/examples/media/718.webp" /><video poster="/v4/examples/media/mood.webp"></video>'
    );
  });

  it('works for a pinned release and a pull request preview alike', () => {
    expect(insertBasePath(html, 'v4.8.0')).toContain('src="/v4.8.0/examples/media/718.webp"');
    expect(insertBasePath(html, 'pr-1234')).toContain('src="/pr-1234/examples/media/718.webp"');
  });

  it('leaves the path alone without a basePath, where it is already right', () => {
    expect(insertBasePath(html, '')).toBe(html);
  });

  it('rewrites the media paths inside a StackBlitz payload too', () => {
    const payload = JSON.stringify({ files: { 'index.html': html } });

    expect(JSON.parse(insertBasePath(payload, 'nightly')).files['index.html']).toContain(
      'src="/nightly/examples/media/718.webp"'
    );
  });
});

describe('rewriteCdnUrlsForDev()', () => {
  it('points the partials at serve-cdn', () => {
    expect(
      rewriteCdnUrlsForDev('<link rel=preload href=https://cdn.ui.porsche.com/porsche-design-system/components/x.js>')
    ).toBe('<link rel=preload href=http://localhost:3001/components/x.js>');
  });
});
