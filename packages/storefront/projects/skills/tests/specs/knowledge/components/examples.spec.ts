import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { writeComponentExamples } from '@skills/knowledge/components/examples';
import { FRAMEWORKS, SkillTree } from '@skills/shared/skillTree';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { componentExamplesMeta as metaMap } from '../../../data/knowledge/componentExamplesFixtures';

describe('component examples generator', () => {
  let root: string;

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

        expect(writeComponentExamples(tree, tag, metaMap[tag])).toMatchSnapshot('table');
      });
    }
  }

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
});
