export type PackageSkill = {
  /** Kebab-case identifier used to derive the mounted reference path. */
  name: string;
  title: string;
  /** Guidance describing when this package skill should be used. */
  description: string;
  /** Prose embedded in the package skill's section of the aggregate skill. */
  intro?: string;
  getContent: () => string;
};
