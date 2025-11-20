'use client';

import {
  type CanvasSidebarStartUpdateEventDetail,
  componentsReady,
  PButton,
  PCanvas,
  PHeading,
  PLink,
} from '@porsche-design-system/components-react/ssr';
import { breakpointS } from '@porsche-design-system/components-react/styles';
import { breakpointM } from '@porsche-design-system/styles/src/js';
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
import type { StorefrontTextZoom } from '@/models/textZoom';
import type { StorefrontTheme } from '@/models/theme';

declare global {
  interface Window {
    componentsReady: typeof componentsReady;
  }
}

if (global?.window) {
  window.componentsReady = componentsReady; // for testing
}

export const Canvas = ({ children }: PropsWithChildren) => {
  const { storefrontTheme, setStorefrontTheme } = useStorefrontTheme();
  const { storefrontDirection, setStorefrontDirection } = useDirection();
  const { storefrontTextZoom, setStorefrontTextZoom } = useTextZoom();
  const pathname = usePathname();
  const [isSidebarStartOpen, setIsSidebarStartOpen] = useState(false);
  const [isSidebarEndOpen, setIsSidebarEndOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

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
    setIsSidebarStartOpen(window.matchMedia(`(min-width: ${breakpointS}px)`).matches);
  }, []);

  useEffect(() => {
    setIsSidebarEndOpen(
      (window.matchMedia(`(min-width: ${breakpointM}px)`).matches && pathname?.includes('configurator')) ?? false
    );
  }, [pathname]);

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

      <div className="-p-canvas-grid">
        <Search isSearchOpen={isSearchModalOpen} onDismissSearch={onDismissSearch} />
        <Tabs />
        {children}
      </div>

      <div slot="sidebar-start">
        <Navigation />
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
