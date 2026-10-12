import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import { describe, expect, it } from 'vitest';

const packageRoot = path.resolve(import.meta.dirname, '..');

/** Renders a fixture the way the skill and Storefront builds do: in Node, with the hook and the `markdown` condition. */
const renderFixture = (fixture: string) =>
  promisify(execFile)(
    process.execPath,
    [
      '--conditions=markdown',
      '--import',
      'tsx',
      '--import',
      './src/markdown/register.mjs',
      'tests/fixtures/render.ts',
      `tests/fixtures/${fixture}`,
    ],
    { cwd: packageRoot }
  );

describe('MDX to Markdown', () => {
  it('runs imports, expressions and composed MDX', async () => {
    const { stdout } = await renderFixture('page.mdx');

    expect(stdout).toMatchSnapshot();
  });

  it('fails the build for a component that is not registered', async () => {
    await expect(renderFixture('unregistered.mdx')).rejects.toThrow(
      /Unregistered component "LiveDemo" in MDX \(.*unregistered\.mdx:5:1\)/
    );
  });
});
