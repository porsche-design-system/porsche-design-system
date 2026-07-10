import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  extractReferences,
  JS_PEER_META_SPECIFIER,
  JS_PEER_SCSS_SPECIFIER,
  listMarkdownFiles,
  resolveJsPeerMeta,
  resolveJsPeerScss,
  resolveProduced,
  resolveRaw,
} from '@/lib/skill/referenceLinks';
import { skillName } from '@/lib/skill/skillMd';
import { FRAMEWORKS, STAGED_SKILL_DIRS, WRAPPER_DIST_DIRS } from '@/lib/skill/skillTree';

/**
 * Producer reference-link gate (two-mode). Every reference path the trees carry must resolve, but
 * the two path classes live in different layouts (design §"Two path classes"):
 *
 * - Produced paths (md, generated examples, generated style assets) live inside the tree → resolved
 *   against STAGING.
 * - Raw links (`component-meta`) point at the built-dist siblings → resolved against the BUILT DIST.
 *   The js skill's `../meta` resolves against the js dist; each framework skill's raw-meta link
 *   resolves against the js peer's `/meta` subpath — its local `../meta` is a re-export shim and is
 *   intentionally NOT the target, so the framework trees carry the js-peer specifier instead.
 *
 * Raw mode needs a real wrapper dist (`build:subPackages:skill`); in CI the `build-development`
 * artifact is restored before storefront unit tests run, so `dist/<fw>-wrapper/skill` is present.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../..');
const JS_DIST_ROOT = path.join(REPO_ROOT, WRAPPER_DIST_DIRS.js);

const danglingProduced = (skillRoot: string): string[] => {
  const dangling: string[] = [];
  for (const file of listMarkdownFiles(skillRoot)) {
    const markdown = fs.readFileSync(path.join(skillRoot, file), 'utf-8');
    for (const ref of extractReferences(markdown)) {
      if (ref.kind === 'produced' && !resolveProduced(skillRoot, file, ref.target)) {
        dangling.push(`${file} -> ${ref.target}`);
      }
    }
  }
  return dangling;
};

const danglingRaw = (distSkillRoot: string): string[] => {
  const dangling: string[] = [];
  for (const file of listMarkdownFiles(distSkillRoot)) {
    const markdown = fs.readFileSync(path.join(distSkillRoot, file), 'utf-8');
    for (const ref of extractReferences(markdown)) {
      if (ref.kind === 'raw' && !resolveRaw(distSkillRoot, JS_DIST_ROOT, ref.target)) {
        dangling.push(`${file} -> ${ref.target}`);
      }
    }
  }
  return dangling;
};

/** Distinct raw-link targets across a packaged tree. */
const rawTargets = (skillRoot: string): Set<string> => {
  const targets = new Set<string>();
  for (const file of listMarkdownFiles(skillRoot)) {
    for (const ref of extractReferences(fs.readFileSync(path.join(skillRoot, file), 'utf-8'))) {
      if (ref.kind === 'raw') {
        targets.add(ref.target);
      }
    }
  }
  return targets;
};

describe('skill reference links — produced paths resolve against staging', () => {
  for (const framework of FRAMEWORKS) {
    it(`${framework} tree has no dangling produced path`, () => {
      const root = path.join(REPO_ROOT, STAGED_SKILL_DIRS[framework]);
      expect(fs.existsSync(root), `${STAGED_SKILL_DIRS[framework]} missing — run \`npm run build:skill\``).toBe(true);
      const dangling = danglingProduced(root);
      expect(dangling, `dangling produced paths:\n${dangling.join('\n')}`).toEqual([]);
    });
  }
});

describe('skill reference links — raw links resolve against the built dist', () => {
  for (const framework of FRAMEWORKS) {
    const distSkillRoot = path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework], 'skill');

    describe(framework, () => {
      it('the built dist skill tree is present (restore the build-development artifact / build the wrapper)', () => {
        expect(fs.existsSync(distSkillRoot), `${WRAPPER_DIST_DIRS[framework]}/skill missing`).toBe(true);
      });

      it('packages SKILL.md with the wrapper-specific frontmatter name', () => {
        const skillMdPath = path.join(distSkillRoot, 'SKILL.md');
        expect(fs.existsSync(skillMdPath), `${WRAPPER_DIST_DIRS[framework]}/skill/SKILL.md missing`).toBe(true);
        expect(fs.readFileSync(skillMdPath, 'utf-8')).toMatch(
          new RegExp(`^---\\nname: ${skillName(framework)}\\n`, 'u')
        );
      });

      it('has no dangling raw link', () => {
        const dangling = danglingRaw(distSkillRoot);
        expect(dangling, `dangling raw links:\n${dangling.join('\n')}`).toEqual([]);
      });
    });
  }

  it('js skill links its own ../meta (real data), not the js-peer specifier', () => {
    const targets = rawTargets(path.join(JS_DIST_ROOT, 'skill'));
    expect(targets).toContain('../meta');
    expect(targets).not.toContain(JS_PEER_META_SPECIFIER);
  });

  for (const framework of ['angular', 'react', 'vue'] as const) {
    it(`${framework} skill links the js-peer /meta subpath, not its local ../meta shim`, () => {
      const targets = rawTargets(path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework], 'skill'));
      expect(targets).toContain(JS_PEER_META_SPECIFIER);
      expect(targets).not.toContain('../meta');

      const resolved = resolveJsPeerMeta(JS_DIST_ROOT);
      expect(resolved, 'js peer /meta did not resolve — build the js wrapper').not.toBeNull();
      // Resolves into the js dist, never the framework wrapper's own (shim) meta.
      expect(resolved?.startsWith(JS_DIST_ROOT + path.sep)).toBe(true);
      expect(resolved?.startsWith(path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework]) + path.sep)).toBe(false);
    });
  }

  it('every skill links the local ../tailwindcss/index.css (real copy in every wrapper)', () => {
    for (const framework of FRAMEWORKS) {
      expect(rawTargets(path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework], 'skill'))).toContain(
        '../tailwindcss/index.css'
      );
    }
  });

  it('js skill links its own ../scss (real partials), not the js-peer scss specifier', () => {
    const targets = rawTargets(path.join(JS_DIST_ROOT, 'skill'));
    expect(targets).toContain('../scss');
    expect(targets).not.toContain(JS_PEER_SCSS_SPECIFIER);
  });

  for (const framework of ['angular', 'react', 'vue'] as const) {
    it(`${framework} skill links the js-peer /scss subpath, not its local ../scss shim`, () => {
      const targets = rawTargets(path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework], 'skill'));
      expect(targets).toContain(JS_PEER_SCSS_SPECIFIER);
      expect(targets).not.toContain('../scss');

      const resolved = resolveJsPeerScss(JS_DIST_ROOT);
      expect(resolved, 'js peer /scss did not resolve — build the js wrapper').not.toBeNull();
      // Resolves into the js dist, never the framework wrapper's own (shim) scss.
      expect(resolved?.startsWith(JS_DIST_ROOT + path.sep)).toBe(true);
      expect(resolved?.startsWith(path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework]) + path.sep)).toBe(false);
    });
  }
});

/**
 * Fixture mode — proves the gate actually catches breakage rather than vacuously passing: a
 * known-good tree resolves clean in both modes, while a tree seeded with a dangling produced path
 * and a broken raw link is flagged by exactly the same resolvers the real-tree checks use.
 */
describe('skill reference links — fixture (known-good and known-broken)', () => {
  let tmp: string;
  const write = (relative: string, content: string): void => {
    const absolute = path.join(tmp, relative);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, content, 'utf-8');
  };

  beforeAll(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-ref-links-'));

    // js-peer dist with exports-mapped ./meta and ./scss targets (scss under the `sass` condition).
    write(
      'js-dist/package.json',
      JSON.stringify({
        exports: { './meta': { default: './meta/index.cjs' }, './scss': { sass: './scss/_index.scss' } },
      })
    );
    write('js-dist/meta/index.cjs', 'module.exports = {};');
    write('js-dist/scss/_index.scss', '');

    // GOOD tree: skill/ beside ../meta, ../tokens, ../tailwindcss and ../scss dist siblings; an in-tree example file.
    write(
      'good/skill/SKILL.md',
      'See `references/overview.md`. Raw data at `../meta` and `../tokens`; styles at `../tailwindcss/index.css`, ' +
        '`../scss`, `@porsche-design-system/components-js/meta` and `@porsche-design-system/components-js/scss`.'
    );
    write('good/skill/references/overview.md', 'Example: [Default](./examples/Default.html)');
    write('good/skill/references/examples/Default.html', '<p-button></p-button>');
    write('good/meta/index.cjs', '');
    write('good/tokens/index.cjs', '');
    write('good/tailwindcss/index.css', '');
    write('good/scss/_index.scss', '');

    // BROKEN tree: a dangling produced path and a dangling raw sibling.
    write(
      'broken/skill/SKILL.md',
      'See `references/missing.md`. Example: [Gone](./examples/Gone.html). Raw data at `../nope`.'
    );
  });

  afterAll(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it('extractReferences classifies produced vs raw and ignores non-references', () => {
    const refs = extractReferences(
      'In-tree [ex](./a.html) and `references/b.md`; raw `../meta`, `../tailwindcss/index.css`, ' +
        '[sibling](../c.md); `@porsche-design-system/components-js/meta` and ' +
        '`@porsche-design-system/components-js/scss`; ' +
        'ignore [route](/components/x/), <https://e.com>, `#anchor`, prose `component-meta` and `aria-label`.'
    );
    const kindOf = (target: string) => refs.find((r) => r.target === target)?.kind;
    expect(kindOf('./a.html')).toBe('produced');
    expect(kindOf('references/b.md')).toBe('produced');
    expect(kindOf('../c.md')).toBe('produced');
    expect(kindOf('../meta')).toBe('raw');
    expect(kindOf('../tailwindcss/index.css')).toBe('raw');
    expect(kindOf(JS_PEER_META_SPECIFIER)).toBe('raw');
    expect(kindOf(JS_PEER_SCSS_SPECIFIER)).toBe('raw');
    expect(refs.map((r) => r.target)).not.toContain('component-meta');
    expect(refs.map((r) => r.target)).not.toContain('/components/x/');
  });

  it('passes both modes on the known-good tree', () => {
    const goodSkill = path.join(tmp, 'good/skill');
    const jsDist = path.join(tmp, 'js-dist');
    expect(danglingProduced(goodSkill)).toEqual([]);

    const rawDangling: string[] = [];
    for (const file of listMarkdownFiles(goodSkill)) {
      for (const ref of extractReferences(fs.readFileSync(path.join(goodSkill, file), 'utf-8'))) {
        if (ref.kind === 'raw' && !resolveRaw(goodSkill, jsDist, ref.target)) {
          rawDangling.push(`${file} -> ${ref.target}`);
        }
      }
    }
    expect(rawDangling).toEqual([]);
  });

  it('fails both modes on the known-broken tree', () => {
    const brokenSkill = path.join(tmp, 'broken/skill');
    expect(danglingProduced(brokenSkill)).toEqual(
      expect.arrayContaining(['SKILL.md -> references/missing.md', 'SKILL.md -> ./examples/Gone.html'])
    );

    expect(resolveRaw(brokenSkill, path.join(tmp, 'js-dist'), '../nope')).toBe(false);
  });

  it('resolveJsPeerMeta follows the dist exports map and rejects a missing peer', () => {
    expect(resolveJsPeerMeta(path.join(tmp, 'js-dist'))).toBe(path.join(tmp, 'js-dist/meta/index.cjs'));
    expect(resolveJsPeerMeta(path.join(tmp, 'no-such-dist'))).toBeNull();
  });

  it('resolveJsPeerScss follows the ./scss `sass` export and rejects a missing peer', () => {
    expect(resolveJsPeerScss(path.join(tmp, 'js-dist'))).toBe(path.join(tmp, 'js-dist/scss/_index.scss'));
    expect(resolveJsPeerScss(path.join(tmp, 'no-such-dist'))).toBeNull();
  });
});
