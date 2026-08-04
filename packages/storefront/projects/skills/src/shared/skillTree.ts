import fs from 'node:fs';
import path from 'node:path';
import { getSkillName, SKILL_FRAMEWORKS, type SkillFramework, type SkillId } from '../registry';
import { resolveFrameworkPlaceholder } from './links';

/** The four wrapper frameworks every skill is generated for. */
export const FRAMEWORKS = SKILL_FRAMEWORKS;
export type Framework = SkillFramework;

export const isFramework = (value: string): value is Framework => (FRAMEWORKS as readonly string[]).includes(value);

/** Ignored staging root populated once before the four wrappers are packaged. */
export const SKILL_STAGING_DIR = 'packages/storefront/projects/skills/generated';

/** A skill's staged tree for one framework, relative to the monorepo root. */
export const stagedSkillDir = (skillId: SkillId, framework: Framework): string =>
  `${SKILL_STAGING_DIR}/${framework}/skills/${getSkillName(skillId, framework)}`;

/** Every framework's staged tree of a skill, relative to the monorepo root. */
export const stagedSkillDirs = (skillId: SkillId): Record<Framework, string> =>
  Object.fromEntries(FRAMEWORKS.map((fw) => [fw, stagedSkillDir(skillId, fw)])) as Record<Framework, string>;

/**
 * Each framework's staged knowledge-skill tree, relative to the monorepo root. Kept as a flat map
 * while knowledge is the only distributed skill; use {@link stagedSkillDir} for any other.
 */
export const STAGED_SKILL_DIRS: Record<Framework, string> = stagedSkillDirs('knowledge');

/**
 * Each framework's built dist root (relative to the monorepo root) — the parent the
 * `build:subPackages:skill` copy step writes `skills/` into, sitting beside the also-copied
 * `meta/` and `tokens/`. The raw-link CI gate resolves the trees' `../../meta` / `../../tokens`
 * references against this layout, since those siblings exist only in the built dist, not in
 * staging. Populated in CI by restoring the `build-development` artifact.
 */
export const WRAPPER_DIST_DIRS: Record<Framework, string> = {
  js: 'packages/components-js/dist/components-wrapper',
  angular: 'packages/components-angular/dist/angular-wrapper',
  react: 'packages/components-react/dist/react-wrapper',
  vue: 'packages/components-vue/dist/vue-wrapper',
};

/**
 * Reference sub-directories laid out under the skill root. The harness creates
 * these empty up front so the content generators (TASK-03+) only have to write
 * files into a tree that already has the right shape.
 */
export const SKILL_DIRECTORY_LAYOUT = ['references/components', 'references/styles'] as const;

/**
 * Filesystem writer that owns a single framework's skill tree. It is the stable
 * API the content generators write produced files through, via {@link write} /
 * {@link writeReference}. SKILL.md itself is rendered into topical sections by
 * `buildSkillMd` once every generator has run (the component roster and package-skill rows are threaded in).
 */
export class SkillTree {
  public readonly root: string;
  public readonly framework: Framework;

  /**
   * @param root  the tree's filesystem root.
   * @param framework  the framework this tree ships for; produced content is resolved to its concrete
   *   package name (the `{js|angular|react|vue}` placeholder → `components-<framework>`).
   */
  constructor(root: string, framework: Framework) {
    this.root = root;
    this.framework = framework;
  }

  /** Resolve a tree-relative path to an absolute filesystem path. */
  public resolve(...segments: string[]): string {
    return path.join(this.root, ...segments);
  }

  /** Remove any existing tree and recreate the empty directory layout. */
  public reset(): void {
    fs.rmSync(this.root, { recursive: true, force: true });
    for (const dir of SKILL_DIRECTORY_LAYOUT) {
      fs.mkdirSync(this.resolve(dir), { recursive: true });
    }
  }

  /** Write a produced file at a tree-relative path, creating parent dirs. Returns the path written. */
  public write(relativePath: string, content: string): string {
    const target = this.resolve(relativePath);
    const resolved = resolveFrameworkPlaceholder(content, this.framework);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, resolved.endsWith('\n') ? resolved : `${resolved}\n`, 'utf-8');
    return relativePath;
  }

  /** Write a file under `references/`. Returns the tree-relative path written (POSIX separators). */
  public writeReference(relativePath: string, content: string): string {
    return this.write(path.posix.join('references', relativePath), content);
  }
}
