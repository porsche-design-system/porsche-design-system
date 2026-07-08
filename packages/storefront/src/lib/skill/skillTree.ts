import fs from 'node:fs';
import path from 'node:path';
import { resolveFrameworkPlaceholder } from './links';

/** The four wrapper frameworks the skill is generated for. */
export const FRAMEWORKS = ['js', 'angular', 'react', 'vue'] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const isFramework = (value: string): value is Framework => (FRAMEWORKS as readonly string[]).includes(value);

/**
 * Each framework's committed `skill/` tree, relative to the monorepo root. Single
 * source of truth shared by the generator (`build:skill`) and the producer CI gates
 * (drift + completeness), so the gates always inspect the same trees the generator writes.
 */
export const WRAPPER_SKILL_DIRS: Record<Framework, string> = {
  js: 'packages/components-js/projects/components-wrapper/skill',
  angular: 'packages/components-angular/projects/angular-wrapper/skill',
  react: 'packages/components-react/projects/react-wrapper/skill',
  vue: 'packages/components-vue/projects/vue-wrapper/skill',
};

/**
 * Each framework's built dist root (relative to the monorepo root) — the parent the
 * `build:subPackages:skill` copy step writes `skill/` into, sitting beside the also-copied
 * `meta/` and `tokens/`. The raw-link CI gate resolves the trees' `../meta` / `../tokens`
 * references against this layout, since those siblings exist only in the built dist, not in
 * the committed source dir. Populated in CI by restoring the `build-development` artifact.
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
export const SKILL_DIRECTORY_LAYOUT = ['references/components', 'references/styles', 'references/migration'] as const;

/** One row of the SKILL.md reference map: a tree-relative path and a one-line "use this when". */
export type ReferenceMapEntry = { path: string; useWhen: string };

/**
 * Filesystem writer that owns a single framework's skill tree. It is the stable
 * API the content generators write produced files through, via {@link write} /
 * {@link writeReference}. SKILL.md itself (including its reference map) is rendered
 * from {@link SKELETON_REFERENCE_MAP} by the harness once every generator has run.
 */
export class SkillTree {
  public readonly root: string;
  private readonly framework?: Framework;

  /**
   * @param root  the tree's filesystem root.
   * @param framework  when set, produced content is resolved to this framework's concrete package
   *   name (the `{js|angular|react|vue}` placeholder → `components-<framework>`). Omitted in unit
   *   tests that assert on raw writer output.
   */
  constructor(root: string, framework?: Framework) {
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
    const resolved = this.framework ? resolveFrameworkPlaceholder(content, this.framework) : content;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, resolved.endsWith('\n') ? resolved : `${resolved}\n`, 'utf-8');
    return relativePath;
  }

  /** Write a file under `references/`. Returns the tree-relative path written (POSIX separators). */
  public writeReference(relativePath: string, content: string): string {
    return this.write(path.posix.join('references', relativePath), content);
  }
}
