import { kebabCase } from 'change-case';

/**
 * Extracts and formats a version string from changelog headings for use as URL-friendly anchor IDs.
 *
 * This is necessary to make changelog headings easily linkable using only the version number,
 * without including the date. For example, a heading like "## [3.31.0] - 2025-11-13" will
 * produce "3-31-0", allowing links like `/changelog#3-31-0` instead of requiring the full date.
 *
 * @param text - The changelog heading text (e.g., "[3.31.0] - 2025-11-13" or just "3.31.0")
 * @returns A kebab-cased version string suitable for use as an anchor ID
 */
export const getChangelogAnchorId = (text: string) => {
  // Extract version from changelog format like "## [3.31.0] - 2025-11-13" => "3.31.0"
  const versionMatch = text.match(/^\[([^\]]+)]/);
  return versionMatch ? kebabCase(versionMatch[1]) : kebabCase(text);
};
