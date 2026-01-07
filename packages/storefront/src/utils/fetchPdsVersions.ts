import { STARTING_PDS_VERSION } from '@/models/pdsVersion';
import { isVersionAtLeast } from '@/utils/pdsVersion';

export type FetchPdsVersionsOptions = {
  filterStable?: boolean;
  startingVersion?: string;
};

/**
 * Checks if a version is a v4 alpha release.
 * @param version - Version string to check
 * @returns True if version matches v4 alpha pattern (e.g., "4.0.0-alpha.0")
 */
const isV4Alpha = (version: string): boolean => {
  return /^4\.\d+\.\d+-alpha\.\d+$/.test(version);
};

export const fetchPdsVersions = async ({
  filterStable = true,
  startingVersion = STARTING_PDS_VERSION,
}: FetchPdsVersionsOptions = {}): Promise<string[]> => {
  const response = await fetch('https://registry.npmjs.org/@porsche-design-system/components-js', {
    headers: {
      accept: 'application/vnd.npm.install-v1+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch versions: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  let versions = Object.keys(data.versions);

  if (filterStable) {
    versions = versions.filter((version) => /^\d+\.\d+\.\d+$/.test(version) || isV4Alpha(version));
  }

  if (startingVersion) {
    versions = versions.filter((v: string) => isVersionAtLeast(v, startingVersion));
  }

  return versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
};
