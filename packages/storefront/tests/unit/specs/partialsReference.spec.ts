import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { evaluate } from '@mdx-js/mdx';
import {
  type PartialsSource,
  renderPartialsReference,
  writePartialsReference,
} from '@/lib/skill/partialsReference';
import { SkillTree } from '@/lib/skill/skillTree';
import type { ComponentType } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

/**
 * Compiles MDX with `remark-gfm`, mirroring the storefront's `next.config.ts` so the
 * partials' GFM option tables render as real markdown tables (not collapsed prose).
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
 * Representative partials prose modelled on the real `partials/<name>/page.mdx` files: an
 * introduction overview, two partial pages (each opening at H1 with a `format`-option
 * table) and one page that renders to nothing meaningful. `import` lines for embedded
 * doc components are omitted so `evaluate` resolves them through the `components` prop,
 * where the render module stubs them out.
 */
const INTRODUCTION = `
# Introduction

<TableOfContents headings={[]} />

## Partials

Partials are utility functions that return static code or markup. They have to be called during build
time, **not** run time.
`;

const FONT_LINKS = `
# Font Links

<TableOfContents headings={['Supported options']} />

**Function name:** \`getFontLinks()\`

Fonts should be loaded as soon as possible but only those which are needed.

## Supported options

| Option   | Description                          | Type                      | Default   |
| -------- | ------------------------------------ | ------------------------- | --------- |
| \`format\` | Defines the output format.           | \`'html' \\| 'jsx' \\| 'js'\` | \`'html'\` |
`;

const LOADER_SCRIPT = `
# Loader Script

**Function name:** \`getLoaderScript()\`

To achieve earlier bootstrapping we provide a partial which needs to be injected into the body.

## Supported options

| Option   | Type                          | Default   |
| -------- | ----------------------------- | --------- |
| \`format\` | \`'html' \\| 'jsx' \\| 'sha256'\` | \`'html'\` |
`;

// Only embedded components, no prose — renders to nothing meaningful.
const DEGRADED = `
<TableOfContents headings={[]} />
`;

describe('partials reference generator', () => {
  let source: PartialsSource;

  beforeAll(async () => {
    const [introduction, fontLinks, loaderScript] = await Promise.all([
      compileMdx(INTRODUCTION),
      compileMdx(FONT_LINKS),
      compileMdx(LOADER_SCRIPT),
    ]);
    source = {
      introduction,
      partials: [
        { functionName: 'getFontLinks', page: fontLinks },
        { functionName: 'getLoaderScript', page: loaderScript },
      ],
    };
  });

  describe('renderPartialsReference', () => {
    it('emits a single top-level H1 with the overview, the format note and a section per partial', () => {
      const { markdown } = renderPartialsReference(source);

      expect(markdown.match(/^# /gm)).toHaveLength(1);
      expect(markdown).toMatch(/^# Partials\n/);
      expect(markdown).toContain('called during build');
      // Each partial page's H1 is demoted to a nested H2.
      expect(markdown).toContain('## Font Links');
      expect(markdown).toContain('## Loader Script');
      expect(markdown).toContain('### Supported options');
      expect(markdown).not.toContain('<');
    });

    it('documents the format option in place of per-framework rewrites', () => {
      const { markdown } = renderPartialsReference(source);

      expect(markdown).toContain('## Framework usage');
      expect(markdown).toContain("`format: 'html'`");
      expect(markdown).toContain("`format: 'jsx'`");
      expect(markdown).toContain("`format: 'js'`");
      expect(markdown).toContain("`format: 'sha256'`");
    });

    it('flags degraded prose instead of emitting it', async () => {
      const degradedSource: PartialsSource = {
        introduction: await compileMdx(DEGRADED),
        partials: [{ functionName: 'getIconLinks', page: await compileMdx(DEGRADED) }],
      };

      const { markdown, degraded } = renderPartialsReference(degradedSource);

      expect(degraded).toEqual(['introduction', 'getIconLinks']);
      // The framework-usage note still anchors the file even when every source is degraded.
      expect(markdown).toContain('## Framework usage');
      expect(markdown).not.toContain('getIconLinks');
    });

    it('snapshots the full partials reference', () => {
      expect(renderPartialsReference(source).markdown).toMatchSnapshot();
    });
  });

  describe('writePartialsReference', () => {
    let root: string;

    beforeAll(() => {
      root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-partials-'));
    });

    afterAll(() => {
      fs.rmSync(root, { recursive: true, force: true });
    });

    it('writes references/partials.md and reports no degraded prose for valid sources', () => {
      const tree = new SkillTree(root);
      tree.reset();

      const report = writePartialsReference(tree, source);

      expect(report.degraded).toEqual([]);
      expect(fs.existsSync(tree.resolve('references/partials.md'))).toBe(true);
      expect(fs.readFileSync(tree.resolve('references/partials.md'), 'utf-8')).toBe(
        `${renderPartialsReference(source).markdown}\n`
      );
    });
  });
});
