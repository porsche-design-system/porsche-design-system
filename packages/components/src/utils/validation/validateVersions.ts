import { getPorscheDesignSystemPrefixesForVersions } from './partials/helper';
import { consoleWarn } from '../log';

// TODO: Reuse everywhere?
export type Version = `${number}.${number}.${number}`;

/**
 * Validates the versions of the Porsche Design System and logs a warning if multiple different versions are detected.
 * If multiple versions are found, it recommends upgrading to the latest used version.
 */
export const validateVersions = () => {
  const prefixesForVersions = getPorscheDesignSystemPrefixesForVersions();
  if (Object.keys(prefixesForVersions).length > 1) {
    const sortedEntries = Object.entries(prefixesForVersions).sort((a: [Version, string[]], b: [Version, string[]]) =>
      sortVersions(a[0], b[0])
    );
    consoleWarn(
      `Multiple different versions are used with following prefixes:\n`,
      Object.fromEntries(sortedEntries),
      `\nPlease upgrade all instances to the latest used version: ${sortedEntries.at(-1)[0]}`
    );
  }
};

/**
 * Compares two version numbers in the pattern x.x.x.
 *
 * @param {Version} versionA - The first version number to compare.
 * @param {Version} versionB - The second version number to compare.
 * @returns {number} Returns:
 *   - 1 if versionA is greater than versionB.
 *   - -1 if versionA is less than versionB.
 *   - 0 if versionA is equal to versionB.
 */
export const sortVersions = (versionA: Version, versionB: Version): number => {
  const a = versionA.split('.').map(Number);
  const b = versionB.split('.').map(Number);

  for (let i = 0; i < a.length; i++) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
  }

  return 0;
};
