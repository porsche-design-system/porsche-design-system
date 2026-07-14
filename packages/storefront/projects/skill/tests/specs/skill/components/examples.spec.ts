import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import {
  type ComponentExamplesSource,
  DEFAULT_EXAMPLE_THEME,
  EXAMPLE_EXTENSION,
  writeComponentExamples,
} from '@skill/components/examples';
import { FRAMEWORKS, type Framework, SkillTree } from '@skill/support/skillTree';
import { createFrameworkMarkup } from '@/utils/generator/createFrameworkMarkup';
import { compileComponentExamplesMeta } from '../../../data/skill/componentExamplesFixtures';

/** `FrameworkMarkup` key the skill `Framework` maps onto (js is the vanilla-JS variant). */
const MARKUP_KEY: Record<Framework, 'vanilla-js' | 'angular' | 'react' | 'vue'> = {
  js: 'vanilla-js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

/** Extract every `[path](path)` file link from a generated examples table. */
const tableFilePaths = (table: string): string[] =>
  [...table.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => match[2]);

describe('component examples generator', () => {
  let metaMap: Record<string, ComponentExamplesSource>;
  let root: string;

  beforeAll(async () => {
    metaMap = await compileComponentExamplesMeta();
  });

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-examples-'));
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  for (const framework of FRAMEWORKS) {
    for (const tag of ['p-button', 'p-accordion']) {
      it(`emits files and a reference table for ${tag} (${framework})`, () => {
        const tree = new SkillTree(root, framework);
        tree.reset();

        const table = writeComponentExamples(tree, tag, metaMap[tag]);

        // Snapshot the table and every emitted example file.
        expect(table).toMatchSnapshot('table');
        for (const relativePath of tableFilePaths(table)) {
          const absolute = tree.resolve('references', 'components', tag, relativePath.replace(/^\.\//, ''));
          expect(fs.existsSync(absolute), `${relativePath} should exist`).toBe(true);
          expect(fs.readFileSync(absolute, 'utf-8')).toMatchSnapshot(relativePath);
        }
      });
    }
  }

  it('emits the configurator base story as the default example in the right extension', () => {
    for (const framework of FRAMEWORKS) {
      const tree = new SkillTree(root, framework);
      tree.reset();
      writeComponentExamples(tree, 'p-button', metaMap['p-button']);

      const defaultFile = tree.resolve(
        `references/components/p-button/examples/Default.${EXAMPLE_EXTENSION[framework]}`
      );
      expect(fs.existsSync(defaultFile), `Default.${EXAMPLE_EXTENSION[framework]}`).toBe(true);

      const { story } = metaMap['p-button'].configurator;
      const expected = createFrameworkMarkup(story.generator(story.state), story.state, DEFAULT_EXAMPLE_THEME)[
        MARKUP_KEY[framework]
      ];
      expect(fs.readFileSync(defaultFile, 'utf-8').trimEnd()).toBe(expected?.trimEnd());
    }
  });

  it('writes story example markup that matches createFrameworkMarkup for the framework/theme', () => {
    for (const framework of FRAMEWORKS) {
      const tree = new SkillTree(root, framework);
      tree.reset();
      writeComponentExamples(tree, 'p-button', metaMap['p-button']);

      const example = metaMap['p-button'].examples.loading;
      if (example.kind !== 'story') {
        throw new Error('fixture changed');
      }
      const expected = createFrameworkMarkup(
        example.story.generator(example.story.state),
        example.story.state,
        DEFAULT_EXAMPLE_THEME
      )[MARKUP_KEY[framework]];

      const file = tree.resolve(`references/components/p-button/examples/Loading.${EXAMPLE_EXTENSION[framework]}`);
      expect(fs.readFileSync(file, 'utf-8').trimEnd()).toBe(expected?.trimEnd());
    }
  });

  it('emits hand-authored example markup verbatim from the CodeSample', () => {
    const tree = new SkillTree(root, 'react');
    tree.reset();
    writeComponentExamples(tree, 'p-button', metaMap['p-button']);

    const file = tree.resolve('references/components/p-button/examples/SubmitForm.tsx');
    expect(fs.readFileSync(file, 'utf-8').trimEnd()).toBe('<PButton type="submit">Submit form</PButton>');
  });

  it('references description-only entries as prose without emitting a file', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();
    const table = writeComponentExamples(tree, 'p-button', metaMap['p-button']);

    // The description-only row carries its name but no file link.
    expect(table).toContain('| Form association | Associate the button');
    expect(fs.existsSync(tree.resolve('references/components/p-button/examples/FormGuidance.html'))).toBe(false);
  });

  it('falls back to the example name when a story has no description', () => {
    const tree = new SkillTree(root, 'vue');
    tree.reset();
    const table = writeComponentExamples(tree, 'p-accordion', metaMap['p-accordion']);

    expect(table).toContain('| Multiple open panels | Multiple open panels |');
  });

  it('every table file path resolves to an emitted file (no drift)', () => {
    for (const framework of FRAMEWORKS) {
      const tree = new SkillTree(root, framework);
      tree.reset();
      const table = writeComponentExamples(tree, 'p-button', metaMap['p-button']);

      const paths = tableFilePaths(table);
      expect(paths.length).toBeGreaterThan(0);
      for (const relativePath of paths) {
        const absolute = tree.resolve('references', 'components', 'p-button', relativePath.replace(/^\.\//, ''));
        expect(fs.existsSync(absolute), `${relativePath} (${framework})`).toBe(true);
      }
    }
  });
});
