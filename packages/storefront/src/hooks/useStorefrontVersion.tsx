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
      try {
        setStablePdsReleases(await fetchPdsVersions());
      } catch (error) {
        // The latest release stays unknown, so neither the outdated version banner nor the latest release is offered
        console.warn('Failed to fetch the published versions of the Porsche Design System', error);
      }
    }

    load();
  }, []);

  const latestPdsVersion = stablePdsReleases[0] as Semver | undefined;

  useEffect(() => {
    if (!latestPdsVersion) return;
    if (!isDevEnvironment && localPorscheDesignSystemVersion !== latestPdsVersion) {
      setIsIsOutdatedVersionBannerOpen(true);
    }
  }, [latestPdsVersion]);

  const currentPdsVersion = localPorscheDesignSystemVersion as Semver;

  const pdsVersion: PDSVersionGroup = {
    // The running version is offered before the published versions are fetched, or if fetching them fails, so the
    // version select never shows an empty value
    all: [...(stablePdsReleases.length > 0 ? stablePdsReleases : [currentPdsVersion]), ...LEGACY_PDS_VERSIONS],
    current: currentPdsVersion,
    latest: latestPdsVersion,
  };

  return { pdsVersion, isOutdatedVersionBannerOpen, setIsIsOutdatedVersionBannerOpen };
};
