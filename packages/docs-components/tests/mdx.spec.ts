import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import { describe, expect, it } from 'vitest';

const packageRoot = path.resolve(import.meta.dirname, '..');

/** Renders a fixture the way the skill and Storefront builds do: in Node, with the hook and the `markdown` condition. */
const renderFixture = async (fixture: string) => {
  const { stdout } = await promisify(execFile)(
    process.execPath,
    [
      '--conditions=markdown',
      '--import',
      'tsx',
      '--import',
      './src/renderer/register.mjs',
      'tests/fixtures/render.ts',
      `tests/fixtures/${fixture}`,
    ],
    { cwd: packageRoot }
  );
  return JSON.parse(stdout);
};

describe('MDX to Markdown', () => {
  it('runs imports, expressions and composed MDX', async () => {
    const { metadata, markdown } = await renderFixture('page.mdx');

    expect(metadata).toEqual({ title: 'Fixture' });
    expect(markdown.kind).toBe('independent');
    expect(markdown.markdown).toMatchSnapshot();
  });

  it('renders one variant per framework when the output depends on it', async () => {
    const { markdown } = await renderFixture('switchable.mdx');

    expect(markdown).toEqual({
      kind: 'switchable',
      variants: {
        'vanilla-js': '# Switchable\n\n`vanilla-js`\n',
        angular: '# Switchable\n\n`angular`\n',
        react: '# Switchable\n\n`react`\n',
        vue: '# Switchable\n\n`vue`\n',
      },
    });
  });

  it('renders only the framework a page declares', async () => {
    const { markdown } = await renderFixture('specific.mdx');

    expect(markdown).toEqual({ kind: 'specific', framework: 'react', markdown: '# Specific\n\n`react`\n' });
  });

  it('fails for a framework that does not exist', async () => {
    await expect(renderFixture('invalid-framework.mdx')).rejects.toThrow(
      '`framework` must be one of vanilla-js, angular, react, vue'
    );
  });

  it('fails the build for a component that is not registered', async () => {
    await expect(renderFixture('unregistered.mdx')).rejects.toThrow(
      /Unregistered component "LiveDemo" in MDX \(.*unregistered\.mdx:5:1\)/
    );
  });
});
