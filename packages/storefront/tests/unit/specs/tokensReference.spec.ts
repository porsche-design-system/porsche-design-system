import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { SkillTree } from '@/lib/skill/skillTree';
import { getTokensSkill, writeTokensReference } from '@/lib/skill/tokensReference';
import { tokensMeta } from '../../../../tokens/projects/tokens-meta/src/lib/tokensMeta';

describe('writeTokensReference', () => {
  let root: string;
  let tree: SkillTree;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'tokens-ref-'));
    tree = new SkillTree(root);
    tree.reset();
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  const read = (relativePath: string): string => fs.readFileSync(tree.resolve(relativePath), 'utf-8');

  it('writes the design-tokens reference into the tree', () => {
    const written = writeTokensReference(tree);

    expect(written).toBe('references/tokens.md');
    expect(fs.existsSync(tree.resolve('references/tokens.md'))).toBe(true);
    expect(read('references/tokens.md')).toBe(getTokensSkill());
  });

  it('renders a section per tokensMeta category with a name/value/description table', () => {
    const markdown = getTokensSkill();

    for (const category of Object.keys(tokensMeta)) {
      expect(markdown).toContain(`## ${category[0].toUpperCase()}${category.slice(1)}`);
    }
    expect(markdown).toContain('| Token | Value | Description |');
  });

  it('documents the package tokens subpath and CSS custom-property reference', () => {
    expect(getTokensSkill()).toContain(
      "import { spacingStaticMd } from '@porsche-design-system/components-{js|angular|react|vue}/tokens';"
    );
    expect(getTokensSkill()).toContain('see `stylesheets.md` (`variables.css`)');
  });

  it('matches the snapshot', () => {
    expect(getTokensSkill()).toMatchSnapshot();
  });
});
