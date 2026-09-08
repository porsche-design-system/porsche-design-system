/** Represents a parsed semantic version as a tuple */
type VersionTuple = [major: number, minor: number, patch: number];

/** A semantic version string (e.g., "1.2.3" or "v1.2.3") */
type SemanticVersion = string;

/**
 * Parses a semantic version string into a tuple of numeric parts.
 * Strips leading 'v' prefix if present.
 * @param version - Version string (e.g., "v1.2.3" or "1.2.3")
 * @returns Tuple of version numbers [major, minor, patch]
 */
function parseVersionParts(version: SemanticVersion): VersionTuple {
  const parts = version.replace(/^v/, '').split('.').map(Number);
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}

/**
 * Checks if a version is greater than or equal to a minimum version.
 * Uses semantic versioning comparison (major.minor.patch).
 * @param version - The version to check
 * @param minVersion - The minimum version to compare against
 * @returns True if version >= minVersion
 * @example
 * isVersionAtLeast("2.1.0", "2.0.0") // true
 * isVersionAtLeast("1.9.0", "2.0.0") // false
 */
export function isVersionAtLeast(version: SemanticVersion, minVersion: SemanticVersion): boolean {
  const [major1, minor1, patch1] = parseVersionParts(version);
  const [major2, minor2, patch2] = parseVersionParts(minVersion);

  if (major1 !== major2) return major1 > major2;
  if (minor1 !== minor2) return minor1 > minor2;
  return patch1 >= patch2;
}

/**
 * Extracts the major version number from a version string.
 * @param version - Version string (e.g., "v3.2.1" or "3.2.1")
 * @returns The major version number
 * @example
 * getMajorVersion("v3.2.1") // 3
 */
export function getMajorVersion(version: SemanticVersion): number {
  return parseVersionParts(version)[0];
}
