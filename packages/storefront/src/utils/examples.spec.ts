import { describe, expect, it } from 'vitest';
import {
  examplesMediaPath,
  getExamplePayloadUrl,
  getExampleUrl,
  insertBasePath,
  rewriteCdnUrlsForDev,
  withMediaOrigin,
} from './examples';

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

describe('getExampleUrl()', () => {
  it('addresses an example below the slug of this deployment', () => {
    expect(getExampleUrl('patterns/header/overlay', 'v4')).toBe('/v4/examples/patterns/header/overlay/');
    expect(getExamplePayloadUrl('templates/landing-page', 'pr-1234')).toBe(
      '/pr-1234/examples/templates/landing-page/stackblitz.json'
    );
  });

  it('addresses an example at the root without a basePath', () => {
    expect(getExampleUrl('patterns/footer', '')).toBe('/examples/patterns/footer/');
  });
});

describe('withMediaOrigin()', () => {
  const payload = {
    title: 'Header 1 | Dummy Patterns',
    description: 'Description',
    files: {
      'index.html': '<img src="/v4/examples/media/718.webp" /><video poster="/v4/examples/media/mood.webp"></video>',
      'main.js': "import './style.css';\n",
    },
  };

  it('puts the origin in front of every media path, because StackBlitz loads them cross-origin', () => {
    expect(withMediaOrigin(payload, 'https://example.com', 'v4').files['index.html']).toBe(
      '<img src="https://example.com/v4/examples/media/718.webp" /><video poster="https://example.com/v4/examples/media/mood.webp"></video>'
    );
  });

  it('leaves every other file and the payload itself untouched', () => {
    const result = withMediaOrigin(payload, 'https://example.com', 'v4');

    expect(result.files['main.js']).toBe(payload.files['main.js']);
    expect(result.title).toBe(payload.title);
    expect(payload.files['index.html']).toContain('src="/v4/examples/media/718.webp"');
  });

  it('works without a basePath', () => {
    const local = { ...payload, files: { 'index.html': `<img src="${examplesMediaPath}718.webp" />` } };

    expect(withMediaOrigin(local, 'http://localhost:3000', '').files['index.html']).toBe(
      '<img src="http://localhost:3000/examples/media/718.webp" />'
    );
  });
});
