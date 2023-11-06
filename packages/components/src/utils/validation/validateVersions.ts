import { consoleWarn } from '../log';

// TODO: Reuse everywhere?
export type Version = `${number}.${number}.${number}${`-rc.${number}` | ''}`;

/**
 * Validates the versions of the Porsche Design System and logs a warning if multiple different versions are detected.
 * If multiple versions are found, it recommends upgrading to the latest used version.
 */
export const validateVersions = () => {
  const { cdn, ...versions } = document.porscheDesignSystem;
  if (Object.keys(versions).length > 1) {
    const sortedVersions = Object.entries(versions)
      .map(([version, { prefixes }]) => [version, prefixes])
      .sort((a: [Version, string[]], b: [Version, string[]]) => sortVersions(a[0], b[0]));
    consoleWarn(
      `Multiple different versions are used with following prefixes:\n`,
      Object.fromEntries(sortedVersions),
      `\nPlease upgrade all instances to the latest used version: ${sortedVersions.at(-1)[0]}`
    );
  }
};

/**
 * Compares two version numbers with the pattern x.x.x or x.x.x-rc.x
 *
 * @param {Version} versionA - The first version number to compare.
 * @param {Version} versionB - The second version number to compare.
 * @returns {number} Returns:
 *   - 1 if versionA is greater than versionB.
 *   - -1 if versionA is less than versionB.
 *   - 0 if versionA is equal to versionB.
 */
export const sortVersions = (versionA: Version, versionB: Version): number => {
  const a = versionA.replace('-rc', '').split('.').map(Number);
  const b = versionB.replace('-rc', '').split('.').map(Number);

  for (let i = 0; i < a.length; i++) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
  }

  return 0;
};
