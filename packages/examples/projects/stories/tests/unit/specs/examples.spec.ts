import fs from 'node:fs';
import path from 'node:path';
import { FRAMEWORKS, TAG_NAMES } from '@porsche-design-system/shared';
import { resolveExamplePayload } from '@porsche-design-system/story-generator';
import { assertExampleFolders, readDescription, toExampleId } from '../../../../../lib/build';
import { componentOf, getExampleIdError } from '../../../../../lib/ids';
import type { StoryExampleMeta } from '../../../lib/meta';
import { isAccessibilityExample, isDefaultExample, PROJECT, readStoryExports } from '../../../lib/stories';

/** The sources below `src/` as the build reads them, so a broken example fails here without a build. */

const srcDir = path.resolve(__dirname, '../../../src');

const importModule = async (file: string) =>
  (await import(path.join(srcDir, file))) as Record<string, unknown> & { meta?: Partial<StoryExampleMeta> };

const stories = await Promise.all(
  fs
    .globSync('**/story.ts', { cwd: srcDir })
    .sort()
    .map(async (file) => ({ id: toExampleId(file), module: await importModule(file) }))
);

const accessibilityExamples = await Promise.all(
  fs
    .globSync('**/example.ts', { cwd: srcDir })
    .sort()
    .map(async (file) => ({ id: toExampleId(file), module: await importModule(file) }))
);

const storyIds = stories.map(({ id }) => id);
const exampleStoryIds = storyIds.filter((id) => !isDefaultExample(id));

describe('src/', () => {
  it('finds the stories and the accessibility examples', () => {
    expect(stories.length).toBeGreaterThan(0);
    expect(accessibilityExamples.length).toBeGreaterThan(0);
  });

  it('holds one example per folder and nothing else', () => {
    expect(() =>
      assertExampleFolders(
        srcDir,
        Object.fromEntries([
          ...storyIds.map((id) => [id, ['story.ts', 'meta.ts', 'example.mdx']]),
          ...accessibilityExamples.map(({ id }) => [id, ['example.ts']]),
        ]),
        PROJECT
      )
    ).not.toThrow();
  });

  it('names every example by a valid id', () => {
    expect(
      [
        ...storyIds.map((id) => `${id} ${getExampleIdError(id, 'story') ?? ''}`),
        ...accessibilityExamples.map(({ id }) => `${id} ${getExampleIdError(id, 'accessibility') ?? ''}`),
      ].filter((entry) => !entry.endsWith(' '))
    ).toEqual([]);
  });

  it('places every example below the component it shows, components/<component>/', () => {
    const ids = [...storyIds, ...accessibilityExamples.map(({ id }) => id)];
    expect(ids.filter((id) => !(TAG_NAMES as readonly string[]).includes(componentOf(id) ?? ''))).toEqual([]);
  });

  it('gives every component a default story', () => {
    const components = new Set(storyIds.map(componentOf));
    expect(
      [...components].filter((component) => !storyIds.includes(`components/${component?.slice(2)}/default`))
    ).toEqual([]);
  });
});

describe('the stories', () => {
  it.each(stories)('$id exports its stories', ({ id, module }) => {
    expect(() => readStoryExports(id, module)).not.toThrow();
  });

  it.each(exampleStoryIds)('%s has a title in its meta.ts', async (id) => {
    const { meta } = await importModule(path.join(id, 'meta.ts'));
    expect(meta?.title?.trim()).toBeTruthy();
  });

  it('give a default story no meta.ts, as it is titled "Default"', () => {
    expect(storyIds.filter((id) => isDefaultExample(id) && fs.existsSync(path.join(srcDir, id, 'meta.ts')))).toEqual(
      []
    );
  });

  it.each(storyIds)('%s has no empty description', (id) => {
    expect(() => readDescription(srcDir, id, PROJECT)).not.toThrow();
  });
});

describe('the accessibility examples', () => {
  it.each(accessibilityExamples)('$id exports one example', ({ module }) => {
    const values = Object.values(module);
    expect(values).toHaveLength(1);
    expect(isAccessibilityExample(values[0])).toBe(true);
  });

  it.each(accessibilityExamples)('$id resolves both sides for every framework', ({ id, module }) => {
    const [example] = Object.values(module);
    if (!isAccessibilityExample(example)) {
      throw new Error(`"${id}" exports no accessibility example`);
    }
    for (const framework of FRAMEWORKS) {
      for (const side of ['antiPattern', 'recommended'] as const) {
        expect(
          resolveExamplePayload(example[side], framework, { tag: componentOf(id) ?? id, key: id, side, framework })
        ).not.toBe('');
      }
    }
  });
});
