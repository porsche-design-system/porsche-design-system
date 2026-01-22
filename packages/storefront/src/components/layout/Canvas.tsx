'use client';

import {
  type CanvasSidebarStartUpdateEventDetail,
  componentsReady,
  PBanner,
  PButton,
  PCanvas,
  PHeading,
  PLink,
} from '@porsche-design-system/components-react/ssr';
import { breakpointMd, breakpointSm } from '@porsche-design-system/tokens';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { DirectionSelect } from '@/components/common/DirectionSelect';
import { Navigation } from '@/components/common/Navigation';
import Tabs from '@/components/common/Tabs';
import { TextZoomSelect } from '@/components/common/TextZoomSelect';
import { ThemeSelect } from '@/components/common/ThemeSelect';
import { Search } from '@/components/search/Search';
import { useDirection } from '@/hooks/useDirection';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { useTextZoom } from '@/hooks/useTextZoom';
import type { StorefrontDirection } from '@/models/dir';
import { LEGACY_PDS_VERSIONS, type PDSVersionGroup, type Semver } from '@/models/pdsVersion';
import type { StorefrontTextZoom } from '@/models/textZoom';
import type { StorefrontTheme } from '@/models/theme';
import { fetchPdsVersions } from '@/utils/fetchPdsVersions';
import { isDevEnvironment } from '@/utils/isDev';
import { localPorscheDesignSystemVersion } from '@/utils/porscheDesignSystemVersion';

declare global {
  interface Window {
    componentsReady: typeof componentsReady;
  }
}

if (global?.window) {
  window.componentsReady = componentsReady; // for testing
}

export const Canvas = ({ children }: PropsWithChildren) => {
  const [stablePdsReleases, setStablePdsReleases] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const list = await fetchPdsVersions();
      setStablePdsReleases(list);
    }

    load();
  }, []);

  const { storefrontTheme, setStorefrontTheme } = useStorefrontTheme();
  const { storefrontDirection, setStorefrontDirection } = useDirection();
  const { storefrontTextZoom, setStorefrontTextZoom } = useTextZoom();
  const pathname = usePathname();
  const [isSidebarStartOpen, setIsSidebarStartOpen] = useState(false);
  const [isSidebarEndOpen, setIsSidebarEndOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const isDesktop = typeof window !== 'undefined' && window.matchMedia(`(min-width: ${breakpointMd}px)`).matches;

  const latestPdsVersion = stablePdsReleases[0] as Semver;

  useEffect(() => {
    if (!latestPdsVersion) return;
    if (!isDevEnvironment && localPorscheDesignSystemVersion !== latestPdsVersion) {
      setIsBannerOpen(true);
    }
  }, [latestPdsVersion]);

  const pdsVersion: PDSVersionGroup = {
    all: [...stablePdsReleases, ...LEGACY_PDS_VERSIONS],
    current: localPorscheDesignSystemVersion as Semver,
    latest: latestPdsVersion,
  };

  const onSidebarStartUpdate = (e: CustomEvent<CanvasSidebarStartUpdateEventDetail>) => {
    setIsSidebarStartOpen(e.detail.open);
  };
  const onSidebarEndOpen = () => {
    setIsSidebarEndOpen(true);
  };
  const onSidebarEndDismiss = () => {
    setIsSidebarEndOpen(false);
  };

  const onOpenSearch = () => {
    setIsSearchModalOpen(true);
    // Small timeout is needed after opening for the input to be focusable
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 10);
  };
  const onDismissSearch = () => {
    setIsSearchModalOpen(false);
  };

  useEffect(() => {
    // initially, sidebar should be closed on mobile and opened on desktop
    setIsSidebarStartOpen(window.matchMedia(`(min-width: ${breakpointSm}px)`).matches);
  }, []);

  useEffect(() => {
    setIsSidebarEndOpen((isDesktop && pathname?.includes('configurator')) ?? false);
  }, [pathname, isDesktop]);

  const onNavigationChange = () => {
    if (!isDesktop && isSidebarStartOpen) {
      setIsSidebarStartOpen(false);
    }
  };

  return (
    <PCanvas
      sidebarStartOpen={isSidebarStartOpen}
      sidebarEndOpen={isSidebarEndOpen}
      onSidebarStartUpdate={onSidebarStartUpdate}
      onSidebarEndDismiss={onSidebarEndDismiss}
    >
      <Link slot="title" href="/">
        Porsche Design System
      </Link>

      <PBanner open={isBannerOpen} onDismiss={() => setIsBannerOpen(false)}>
        <div slot="description" className="flex flex-col gap-fluid-xs">
          You are currently viewing an earlier release of the Porsche Design System.
          <Link href={`https://designsystem.porsche.com/`}>
            Switch to the latest Porsche Design System documentation.
          </Link>
        </div>
      </PBanner>

      <PButton
        slot="header-end"
        icon="search"
        variant="secondary"
        compact={true}
        hideLabel={true}
        onClick={onOpenSearch}
        aria={{ 'aria-label': 'Search' }}
      >
        Search
      </PButton>
      <PLink
        slot="header-end"
        iconSource="assets/github.svg"
        variant="secondary"
        compact={true}
        hideLabel={true}
        href="https://github.com/porsche-design-system/porsche-design-system"
        target="_blank"
      >
        Navigate to GitHub repository of Porsche Design System
      </PLink>
      <PButton
        slot="header-end"
        icon="configurate"
        variant="secondary"
        compact={true}
        hideLabel={true}
        onClick={onSidebarEndOpen}
      >
        Open sidebar
      </PButton>

      <div className="@container grid grid-cols-12 gap-x-fluid-md">
        <Search isSearchOpen={isSearchModalOpen} onDismissSearch={onDismissSearch} />
        <Tabs />
        {children}
      </div>

      <div slot="sidebar-start">
        <Navigation pdsVersion={pdsVersion} onNavigate={onNavigationChange} />
      </div>
      <div slot="sidebar-end">
        <div className="flex flex-col gap-fluid-sm mb-fluid-lg">
          <PHeading size="small" tag="h2">
            Global settings
          </PHeading>
          <ThemeSelect
            value={storefrontTheme}
            onThemeChange={(e): void => setStorefrontTheme(e.detail.value as StorefrontTheme)}
            compact={true}
          />
          <DirectionSelect
            value={storefrontDirection}
            onDirectionChange={(e): void => setStorefrontDirection(e.detail.value as StorefrontDirection)}
          />
          <TextZoomSelect
            value={storefrontTextZoom}
            onTextZoomChange={(e): void => setStorefrontTextZoom(e.detail.value as StorefrontTextZoom)}
          />
        </div>
      </div>
    </PCanvas>
  );
};
