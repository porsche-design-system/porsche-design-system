import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSkillName, SKILL_IDS } from '@skills/registry';
import { FRAMEWORKS, stagedSkillDir, WRAPPER_DIST_DIRS } from '@skills/shared/skillTree';
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
} from '../../helpers/referenceLinks';

/**
 * Producer reference-link gate (two-mode). Every reference path the trees carry must resolve, but
 * the two path classes live in different layouts (design §"Two path classes"):
 *
 * - Produced paths (md, generated examples, generated style assets) live inside the tree → resolved
 *   against STAGING.
 * - Raw links (`component-meta`) point at the built-dist siblings → resolved against the BUILT DIST.
 *   The js skill's `../../meta` resolves against the js dist; each framework skill's raw-meta link
 *   resolves against the js peer's `/meta` subpath — its local `../../meta` is a re-export shim and is
 *   intentionally NOT the target, so the framework trees carry the js-peer specifier instead.
 *
 * Raw mode needs a real wrapper dist (`build:subPackages:skill`); in CI the `build-development`
 * artifact is restored before storefront unit tests run, so `dist/<fw>-wrapper/skills/<skill-name>` is present.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../../..');
const JS_DIST_ROOT = path.join(REPO_ROOT, WRAPPER_DIST_DIRS.js);

/**
 * The skill whose *raw* links this gate resolves. The raw-link expectations below (`../../meta`,
 * `../../scss`, the Tailwind copy) are the knowledge tree's references, so the gate names its skill
 * instead of assuming there is only one.
 *
 * Produced-path resolution is content-agnostic, so it runs over **every** registered skill — a skill
 * whose in-tree links were never checked would ship dangling references, which is how a cross-skill
 * link into a sibling tree first slipped through.
 */
const SKILL_ID = 'knowledge';

const treeReferences = (skillRoot: string) =>
  listMarkdownFiles(skillRoot).flatMap((sourceFile) =>
    extractReferences(fs.readFileSync(path.join(skillRoot, sourceFile), 'utf-8'), {
      // The deprecation index names consumer-facing package exports as provenance, not as raw files
      // the agent should inspect through this gate.
      includePackageSpecifiers: sourceFile !== 'references/deprecations.md',
    }).map((reference) => ({
      sourceFile,
      ...reference,
    }))
  );

const danglingProduced = (skillRoot: string): string[] =>
  treeReferences(skillRoot)
    .filter(({ kind, sourceFile, target }) => kind === 'produced' && !resolveProduced(skillRoot, sourceFile, target))
    .map(({ sourceFile, target }) => `${sourceFile} -> ${target}`);

const danglingRaw = (distSkillRoot: string, jsDistRoot = JS_DIST_ROOT): string[] =>
  treeReferences(distSkillRoot)
    .filter(({ kind, target }) => kind === 'raw' && !resolveRaw(distSkillRoot, jsDistRoot, target))
    .map(({ sourceFile, target }) => `${sourceFile} -> ${target}`);

const rawTargets = (skillRoot: string): Set<string> =>
  new Set(
    treeReferences(skillRoot)
      .filter(({ kind }) => kind === 'raw')
      .map(({ target }) => target)
  );

describe('skill reference links — produced paths resolve against staging', () => {
  for (const skillId of SKILL_IDS) {
    for (const framework of FRAMEWORKS) {
      it(`${skillId} ${framework} tree has no dangling produced path`, () => {
        const root = path.join(REPO_ROOT, stagedSkillDir(skillId, framework));
        expect(
          fs.existsSync(root),
          `${stagedSkillDir(skillId, framework)} missing — run \`npm run build:skills\``
        ).toBe(true);
        const dangling = danglingProduced(root);
        expect(dangling, `dangling produced paths:\n${dangling.join('\n')}`).toEqual([]);
      });
    }
  }
});

describe('skill reference links — raw links resolve against the built dist', () => {
  for (const framework of FRAMEWORKS) {
    const distSkillRoot = path.join(
      REPO_ROOT,
      WRAPPER_DIST_DIRS[framework],
      'skills',
      getSkillName(SKILL_ID, framework)
    );

    describe(framework, () => {
      it('the built dist skill tree is present (restore the build-development artifact / build the wrapper)', () => {
        expect(
          fs.existsSync(distSkillRoot),
          `${WRAPPER_DIST_DIRS[framework]}/skills/${getSkillName(SKILL_ID, framework)} missing`
        ).toBe(true);
      });

      it('packages SKILL.md with the wrapper-specific frontmatter name', () => {
        const skillMdPath = path.join(distSkillRoot, 'SKILL.md');
        expect(
          fs.existsSync(skillMdPath),
          `${WRAPPER_DIST_DIRS[framework]}/skills/${getSkillName(SKILL_ID, framework)}/SKILL.md missing`
        ).toBe(true);
        expect(fs.readFileSync(skillMdPath, 'utf-8')).toMatch(
          new RegExp(`^---\\nname: ${getSkillName(SKILL_ID, framework)}\\n`, 'u')
        );
      });

      it('has no dangling raw link', () => {
        const dangling = danglingRaw(distSkillRoot);
        expect(dangling, `dangling raw links:\n${dangling.join('\n')}`).toEqual([]);
      });
    });
  }

  it('js skill links its own ../../meta (real data), not the js-peer specifier', () => {
    const targets = rawTargets(path.join(JS_DIST_ROOT, 'skills', getSkillName(SKILL_ID, 'js')));
    expect(targets).toContain('../../meta');
    expect(targets).not.toContain(JS_PEER_META_SPECIFIER);
  });

  for (const framework of FRAMEWORKS.filter((fw) => fw !== 'js')) {
    it(`${framework} skill links the js-peer /meta subpath, not its local ../../meta shim`, () => {
      const targets = rawTargets(
        path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework], 'skills', getSkillName(SKILL_ID, framework))
      );
      expect(targets).toContain(JS_PEER_META_SPECIFIER);
      expect(targets).not.toContain('../../meta');

      const resolved = resolveJsPeerMeta(JS_DIST_ROOT);
      expect(resolved, 'js peer /meta did not resolve — build the js wrapper').not.toBeNull();
      // Resolves into the js dist, never the framework wrapper's own (shim) meta.
      expect(resolved?.startsWith(JS_DIST_ROOT + path.sep)).toBe(true);
      expect(resolved?.startsWith(path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework]) + path.sep)).toBe(false);
    });
  }

  it('every skill links the local ../../tailwindcss/index.css (real copy in every wrapper)', () => {
    for (const framework of FRAMEWORKS) {
      expect(
        rawTargets(path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework], 'skills', getSkillName(SKILL_ID, framework)))
      ).toContain('../../tailwindcss/index.css');
    }
  });

  it('js skill links its own ../../scss (real partials), not the js-peer scss specifier', () => {
    const targets = rawTargets(path.join(JS_DIST_ROOT, 'skills', getSkillName(SKILL_ID, 'js')));
    expect(targets).toContain('../../scss');
    expect(targets).not.toContain(JS_PEER_SCSS_SPECIFIER);
  });

  for (const framework of FRAMEWORKS.filter((fw) => fw !== 'js')) {
    it(`${framework} skill links the js-peer /scss subpath, not its local ../../scss shim`, () => {
      const targets = rawTargets(
        path.join(REPO_ROOT, WRAPPER_DIST_DIRS[framework], 'skills', getSkillName(SKILL_ID, framework))
      );
      expect(targets).toContain(JS_PEER_SCSS_SPECIFIER);
      expect(targets).not.toContain('../../scss');

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
    expect(
      extractReferences(
        'In-tree [ex](./a.html) and `references/b.md`; raw `../meta`, `../tailwindcss/index.css`, ' +
          '[sibling](../c.md); `@porsche-design-system/components-js/meta` and ' +
          '`@porsche-design-system/components-js/scss`; ' +
          'ignore [route](/components/x/), <https://e.com>, `#anchor`, prose `component-meta` and `aria-label`.'
      )
    ).toEqual([
      { target: './a.html', kind: 'produced' },
      { target: '../c.md', kind: 'produced' },
      { target: 'references/b.md', kind: 'produced' },
      { target: '../meta', kind: 'raw' },
      { target: '../tailwindcss/index.css', kind: 'raw' },
      { target: JS_PEER_META_SPECIFIER, kind: 'raw' },
      { target: JS_PEER_SCSS_SPECIFIER, kind: 'raw' },
    ]);
  });

  it('passes both modes on the known-good tree', () => {
    const goodSkill = path.join(tmp, 'good/skill');
    const jsDist = path.join(tmp, 'js-dist');
    expect(danglingProduced(goodSkill)).toEqual([]);
    expect(danglingRaw(goodSkill, jsDist)).toEqual([]);
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
