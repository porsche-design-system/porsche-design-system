import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { evaluate } from '@mdx-js/mdx';
import { type MigrationSource, writeMigrationReferences } from '@/lib/skill/migrationReference';
import { SkillTree } from '@/lib/skill/skillTree';
import type { ComponentType } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

/**
 * Compiles MDX with `remark-gfm`, mirroring the storefront's `next.config.ts` so the
 * migration guides' GFM prose renders identically to the build. `import` lines for
 * embedded doc components are omitted so `evaluate` resolves them through the
 * `components` prop, where the render module stubs them out.
 */
const compileMdx = async (source: string): Promise<ComponentType> => {
  const { default: MdxComponent } = await evaluate(source, {
    ...jsxRuntime,
    baseUrl: import.meta.url,
    remarkPlugins: [remarkGfm],
  });
  return MdxComponent as ComponentType;
};

/**
 * Representative migration prose modelled on the real `news/migration-guide/<slug>/page.mdx`
 * files: a core PDS guide and a style-domain guide, each opening at H1 with a
 * `<TableOfContents>` and section headings, plus one guide that renders to nothing
 * meaningful.
 */
const PORSCHE_DESIGN_SYSTEM = `
# Migration Guide

<TableOfContents headings={['👹 Breaking Changes']} />

## 👹 Breaking Changes

Upgrade the Porsche Design System from **v3** to **v4**.

\`\`\`bash
npm install @porsche-design-system/components-js@4
\`\`\`
`;

const SCSS = `
# Migration Guide

<TableOfContents headings={['⭐ Introducing Color Scheme']} />

## ⭐ Introducing Color Scheme

The new color system leverages the CSS \`light-dark()\` function for native theming.
`;

// Only embedded components, no prose — renders to nothing meaningful.
const DEGRADED = `
<TableOfContents headings={[]} />
`;

describe('migration reference generator', () => {
  let sources: MigrationSource[];
  let root: string;

  beforeAll(async () => {
    const [porscheDesignSystem, scss] = await Promise.all([compileMdx(PORSCHE_DESIGN_SYSTEM), compileMdx(SCSS)]);
    sources = [
      { slug: 'porsche-design-system', page: porscheDesignSystem },
      { slug: 'scss', page: scss },
    ];
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-migration-'));
  });

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('writes one references/migration/<slug>.md per guide and reports the paths written', () => {
    const tree = new SkillTree(root);
    tree.reset();

    const report = writeMigrationReferences(tree, sources);

    expect(report.written).toEqual([
      'references/migration/porsche-design-system.md',
      'references/migration/scss.md',
    ]);
    expect(report.degraded).toEqual([]);
    for (const relativePath of report.written) {
      expect(fs.existsSync(tree.resolve(relativePath)), `${relativePath} should exist`).toBe(true);
    }
  });

  it('renders each guide verbatim, keeping its standalone H1 and dropping embedded components', () => {
    const tree = new SkillTree(root);
    tree.reset();

    writeMigrationReferences(tree, sources);
    const scss = fs.readFileSync(tree.resolve('references/migration/scss.md'), 'utf-8');

    expect(scss).toMatch(/^# Migration Guide\n/);
    expect(scss).toContain('## ⭐ Introducing Color Scheme');
    expect(scss).toContain('`light-dark()`');
    expect(scss).not.toContain('<');
  });

  it('flags degraded prose instead of writing an empty file', async () => {
    const tree = new SkillTree(root);
    tree.reset();

    const report = writeMigrationReferences(tree, [{ slug: 'emotion', page: await compileMdx(DEGRADED) }]);

    expect(report.degraded).toEqual(['emotion']);
    expect(report.written).toEqual([]);
    expect(fs.existsSync(tree.resolve('references/migration/emotion.md'))).toBe(false);
  });

  it('snapshots the rendered migration guides', () => {
    const tree = new SkillTree(root);
    tree.reset();
    writeMigrationReferences(tree, sources);

    for (const { slug } of sources) {
      expect(fs.readFileSync(tree.resolve(`references/migration/${slug}.md`), 'utf-8')).toMatchSnapshot(slug);
    }
  });
});
