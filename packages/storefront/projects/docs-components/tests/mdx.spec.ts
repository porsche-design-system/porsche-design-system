import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import { describe, expect, it } from 'vitest';

const packageRoot = path.resolve(import.meta.dirname, '..');

/**
 * Renders a fixture the way the skill and Storefront builds do: in Node, with the hook and the `markdown` condition,
 * within a small site of fixture pages (see `fixtures/render.ts`).
 */
const renderFixture = async (fixture: string, destination: 'web' | 'skill' = 'web') => {
  const { stdout } = await promisify(execFile)(
    process.execPath,
    [
      '--conditions=markdown',
      '--import',
      'tsx',
      '--import',
      './src/renderer/register.mjs',
      'tests/fixtures/render.ts',
      fixture,
      destination,
    ],
    { cwd: packageRoot }
  );
  return JSON.parse(stdout);
};

describe('MDX to Markdown', () => {
  it('runs imports, expressions and composed MDX', async () => {
    const { kind, metadata, files } = await renderFixture('page');

    expect(kind).toBe('independent');
    expect(metadata).toEqual({ title: 'Fixture' });
    expect(files['page.md']).toMatchSnapshot();
  });

  it('writes one variant per framework when the output depends on it', async () => {
    const { kind, files } = await renderFixture('switchable');

    expect(kind).toBe('switchable');
    expect(files).toEqual({
      'switchable.vanilla-js.md': '# Switchable\n\n`vanilla-js`\n',
      'switchable.angular.md': '# Switchable\n\n`angular`\n',
      'switchable.react.md': '# Switchable\n\n`react`\n',
      'switchable.vue.md': '# Switchable\n\n`vue`\n',
    });
  });

  it('renders only the framework a page declares', async () => {
    const { kind, frameworks, files } = await renderFixture('specific');

    expect({ kind, frameworks }).toEqual({ kind: 'specific', frameworks: ['react'] });
    expect(files).toEqual({ 'specific.md': '# Specific\n\n`react`\n' });
  });

  it('fails for a framework that does not exist', async () => {
    await expect(renderFixture('invalid-framework')).rejects.toThrow(
      '`framework` must be one of vanilla-js, angular, react, vue'
    );
  });

  it('fails the build for a component that is not registered', async () => {
    await expect(renderFixture('unregistered')).rejects.toThrow(
      /Unregistered component "LiveDemo" in MDX \(.*unregistered\.mdx:5:1\)/
    );
  });
});

describe('links', () => {
  it('point to the Markdown of the same deployment, or to the HTML page without Markdown', async () => {
    const { files } = await renderFixture('links');

    expect(files['links.md']).toBe(
      [
        '# Links',
        '',
        '- [Specific](/v4/specific.md)',
        '- [Switchable](/v4/switchable.react.md#usage)',
        '- [Independent](/v4/page.md)',
        '- [Without Markdown](/v4/partials/introduction/)',
        '- [Dynamic](/v4/components/button/)',
        '- [External](https://react.dev)',
        '- [Anchor](#links)',
        '',
      ].join('\n')
    );
  });

  it('point to skill references, or to the exact-version Storefront outside the skill', async () => {
    const { files } = await renderFixture('links', 'skill');

    expect(files['links.md']).toBe(
      [
        '# Links',
        '',
        '- [Specific](./specific.md)',
        '- [Switchable](./switchable.md#usage)',
        '- [Independent](./page.md)',
        '- [Without Markdown](https://designsystem.porsche.com/v4.8.0/partials/introduction/)',
        '- [Dynamic](https://designsystem.porsche.com/v4.8.0/components/button/)',
        '- [External](https://react.dev)',
        '- [Anchor](#links)',
        '',
      ].join('\n')
    );
  });

  it('fail the build for a route that does not exist', async () => {
    await expect(renderFixture('broken-link')).rejects.toThrow(
      /broken-link\.mdx: links to routes that do not exist: \/does\/not\/exist\//
    );
  });
});
