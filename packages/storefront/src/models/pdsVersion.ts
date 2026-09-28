export const STARTING_PDS_VERSION = 'v3.29.0';
export const LEGACY_PDS_VERSIONS = ['2', '1'];

export type Semver = `${number}.${number}.${number}`;

export type PDSVersionGroup = {
  all: string[];
  current: Semver;
  /** Unknown while the published versions are being fetched, and when fetching them failed. */
  latest: Semver | undefined;
};
