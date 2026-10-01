import fs from 'node:fs';
import path from 'node:path';
import { examples, mediaPath } from '@porsche-design-system/examples';
import { describe, expect, it } from 'vitest';
import { withMediaOrigin } from './exampleMediaOrigin';
import { getExample, getExampleMediaPath, getExampleUrl, insertBasePath, rewriteCdnUrlsForDev } from './examples';

describe('insertBasePath()', () => {
  const html = `<img src="${mediaPath}718.webp" /><video poster="${mediaPath}mood.webp"></video>`;

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
    expect(getExampleUrl('patterns/header/overlay', 'v4')).toBe('/v4/examples/patterns/header/overlay/index.html');
  });

  it('addresses an example at the root without a basePath', () => {
    expect(getExampleUrl('patterns/footer', '')).toBe('/examples/patterns/footer/index.html');
  });
});

describe('getExampleMediaPath()', () => {
  it('serves the media below the slug of this deployment', () => {
    expect(getExampleMediaPath('v4')).toBe('/v4/examples/media/');
    expect(getExampleMediaPath('')).toBe(mediaPath);
  });
});

describe('getExample()', () => {
  it('returns the example as the package exports it, its media below the slug', () => {
    const example = getExample('templates/landing-page', 'v4');
    const { files, ...meta } = examples['templates/landing-page'];

    expect(example).toMatchObject(meta);
    expect(Object.keys(example.files)).toEqual(Object.keys(files));
    expect(files['index.html']).toContain(`"${mediaPath}`);
    expect(example.files['index.html']).toContain('"/v4/examples/media/');
    expect(example.files['index.html']).not.toContain(`"${mediaPath}`);
  });

  it('fails for a path that is not an example, as MDX does not type-check it', () => {
    expect(() => getExample('patterns/unknown' as 'patterns/footer', '')).toThrow(
      '"patterns/unknown" is not an example'
    );
  });
});

describe('withMediaOrigin()', () => {
  const project = {
    title: 'Header: Overlay',
    description: 'Description',
    files: {
      'index.html': '<img src="/v4/examples/media/718.webp" /><video poster="/v4/examples/media/mood.webp"></video>',
      'main.js': "import './style.css';\n",
    },
  };

  it('puts the origin in front of every media path, because StackBlitz loads them cross-origin', () => {
    expect(withMediaOrigin(project, 'https://example.com', '/v4/examples/media/').files['index.html']).toBe(
      '<img src="https://example.com/v4/examples/media/718.webp" /><video poster="https://example.com/v4/examples/media/mood.webp"></video>'
    );
  });

  it('leaves every other file and the project itself untouched', () => {
    const result = withMediaOrigin(project, 'https://example.com', '/v4/examples/media/');

    expect(result.files['main.js']).toBe(project.files['main.js']);
    expect(result.title).toBe(project.title);
    expect(project.files['index.html']).toContain('src="/v4/examples/media/718.webp"');
  });
});

describe('client components', () => {
  const srcDir = path.resolve(import.meta.dirname, '..');
  const clientFiles = (fs.readdirSync(srcDir, { recursive: true }) as string[])
    .filter((file) => /\.tsx?$/.test(file) && !file.endsWith('.spec.ts'))
    .map((file) => [file, fs.readFileSync(path.join(srcDir, file), 'utf8')] as const)
    .filter(([, source]) => /^\s*['"]use client['"]/.test(source));

  it('should be found', () => {
    expect(clientFiles.map(([file]) => file)).toContain(path.join('components', 'common', 'WebsiteViewer.tsx'));
  });

  // The package export holds every example – a value import would bundle all of them into the client.
  it('should import no example data', () => {
    const offenders = clientFiles.filter(([, source]) =>
      Array.from(source.matchAll(/^import\s+(?!type\s)[^;]*?from\s+'([^']+)'/gm), ([, from]) => from).some(
        (from) => from === '@porsche-design-system/examples' || from === '@/utils/examples'
      )
    );

    expect(offenders.map(([file]) => file)).toEqual([]);
  });
});
