import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { FRAMEWORKS } from '@porsche-design-system/shared';
import { writeComponentExamples } from '@skills/knowledge/components/examples';
import { SkillTree } from '@skills/shared/skillTree';
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

  it('emits hand-written example code verbatim from the catalogue', () => {
    const tree = new SkillTree(root, 'react');
    tree.reset();
    writeComponentExamples(tree, 'p-button', metaMap['p-button']);

    const file = tree.resolve('references/components/p-button/examples/SubmitForm.tsx');
    expect(fs.readFileSync(file, 'utf-8').trimEnd()).toBe('<PButton type="submit">Submit form</PButton>');
  });

  it('falls back to the example title when a story has no description', () => {
    const tree = new SkillTree(root, 'vue');
    tree.reset();
    const table = writeComponentExamples(tree, 'p-accordion', metaMap['p-accordion']);

    expect(table).toContain('| Multiple open panels | Multiple open panels |');
  });
});
