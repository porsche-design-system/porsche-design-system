import { useEffect, useState } from 'react';
import { LEGACY_PDS_VERSIONS, type PDSVersionGroup, type Semver } from '@/models/pdsVersion';
import { fetchPdsVersions } from '@/utils/fetchPdsVersions';
import { isDevEnvironment } from '@/utils/isDev';
import { localPorscheDesignSystemVersion } from '@/utils/porscheDesignSystemVersion';

export const useStorefrontVersion = () => {
  const [stablePdsReleases, setStablePdsReleases] = useState<string[]>([]);
  const [isOutdatedVersionBannerOpen, setIsIsOutdatedVersionBannerOpen] = useState(false);

  // Load all versions initially
  useEffect(() => {
    async function load() {
      const list = await fetchPdsVersions();
      setStablePdsReleases(list);
    }

    load();
  }, []);

  const latestPdsVersion = stablePdsReleases[0] as Semver;

  useEffect(() => {
    if (!latestPdsVersion) return;
    if (!isDevEnvironment && localPorscheDesignSystemVersion !== latestPdsVersion) {
      setIsIsOutdatedVersionBannerOpen(true);
    }
  }, [latestPdsVersion]);

  const pdsVersion: PDSVersionGroup = {
    all: [...stablePdsReleases, ...LEGACY_PDS_VERSIONS],
    current: localPorscheDesignSystemVersion as Semver,
    latest: latestPdsVersion,
  };

  return { pdsVersion, isOutdatedVersionBannerOpen, setIsIsOutdatedVersionBannerOpen };
};
