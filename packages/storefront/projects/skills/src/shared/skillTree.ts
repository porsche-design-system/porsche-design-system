import fs from 'node:fs';
import path from 'node:path';
import { getSkillName, SKILL_FRAMEWORKS, type SkillFramework, type SkillId } from '../registry';
import { resolveFrameworkPlaceholder } from './links';

export const FRAMEWORKS = SKILL_FRAMEWORKS;
export type Framework = SkillFramework;

export const isFramework = (value: string): value is Framework => (FRAMEWORKS as readonly string[]).includes(value);

export const SKILL_STAGING_DIR = 'packages/storefront/projects/skills/generated';

export const stagedSkillDir = (skillId: SkillId, framework: Framework): string =>
  `${SKILL_STAGING_DIR}/${framework}/skills/${getSkillName(skillId, framework)}`;

export const stagedSkillDirs = (skillId: SkillId): Record<Framework, string> =>
  Object.fromEntries(FRAMEWORKS.map((fw) => [fw, stagedSkillDir(skillId, fw)])) as Record<Framework, string>;

/** Built wrapper roots used to validate references to sibling package artifacts. */
export const WRAPPER_DIST_DIRS: Record<Framework, string> = {
  js: 'packages/components-js/dist/components-wrapper',
  angular: 'packages/components-angular/dist/angular-wrapper',
  react: 'packages/components-react/dist/react-wrapper',
  vue: 'packages/components-vue/dist/vue-wrapper',
};

/** Filesystem writer for one framework's generated skill tree. */
export class SkillTree {
  public readonly root: string;
  public readonly framework: Framework;
  private readonly layout: readonly string[];

  constructor(root: string, framework: Framework, layout: readonly string[] = []) {
    this.root = root;
    this.framework = framework;
    this.layout = layout;
  }

  public resolve(...segments: string[]): string {
    return path.join(this.root, ...segments);
  }

  public reset(): void {
    fs.rmSync(this.root, { recursive: true, force: true });
    fs.mkdirSync(this.root, { recursive: true });
    for (const dir of this.layout) {
      fs.mkdirSync(this.resolve(dir), { recursive: true });
    }
  }

  /** Resolves framework placeholders and returns the tree-relative path written. */
  public write(relativePath: string, content: string): string {
    const target = this.resolve(relativePath);
    const resolved = resolveFrameworkPlaceholder(content, this.framework);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, resolved.endsWith('\n') ? resolved : `${resolved}\n`, 'utf-8');
    return relativePath;
  }

  public writeReference(relativePath: string, content: string): string {
    return this.write(path.posix.join('references', relativePath), content);
  }
}
