/** A further file of a package skill, mounted next to the file `getContent()` of the package skill renders. */
export type PackageSkillReference = {
  /**
   * Kebab-case path below the folder named after the package skill, without extension: `patterns/header/overlay` is
   * mounted as `<skill name>/patterns/header/overlay.md`, next to `<skill name>.md`.
   */
  name: string;
  title: string;
  description: string;
  getContent: () => string;
};

export type PackageSkill = {
  /** Kebab-case identifier used to derive the mounted reference path. */
  name: string;
  title: string;
  /** Guidance describing when this package skill should be used. */
  description: string;
  /** Prose embedded in the package skill's section of the aggregate skill. */
  intro?: string;
  getContent: () => string;
  /**
   * Further files, for content too large for a single one. `getContent()` links them relative to its own file, as
   * `./<skill name>/<reference name>.md`.
   */
  getReferences?: () => PackageSkillReference[];
};
