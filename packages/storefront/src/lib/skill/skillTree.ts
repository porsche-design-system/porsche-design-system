import fs from 'node:fs';
import path from 'node:path';

/** The four wrapper frameworks the skill is generated for. */
export const FRAMEWORKS = ['js', 'angular', 'react', 'vue'] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const isFramework = (value: string): value is Framework => (FRAMEWORKS as readonly string[]).includes(value);

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
 * API the content generators write through: produced files via {@link write} /
 * {@link writeReference}, and their SKILL.md reference-map row via
 * {@link registerReference}. The harness renders SKILL.md from the collected
 * rows once every generator has run.
 */
export class SkillTree {
  public readonly root: string;
  private readonly references: ReferenceMapEntry[] = [];

  constructor(root: string) {
    this.root = root;
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
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.endsWith('\n') ? content : `${content}\n`, 'utf-8');
    return relativePath;
  }

  /** Write a file under `references/`. Returns the tree-relative path written (POSIX separators). */
  public writeReference(relativePath: string, content: string): string {
    return this.write(path.posix.join('references', relativePath), content);
  }

  /** Register a SKILL.md reference-map row. */
  public registerReference(entry: ReferenceMapEntry): void {
    this.references.push(entry);
  }

  /** The registered reference-map rows, in registration order. */
  public get referenceMap(): readonly ReferenceMapEntry[] {
    return this.references;
  }
}
