'use client';

import { DirectionSelect } from '@/components/common/DirectionSelect';
import { Navigation } from '@/components/common/Navigation';
import Tabs from '@/components/common/Tabs';
import { TextZoomSelect } from '@/components/common/TextZoomSelect';
import { ThemeSelect } from '@/components/common/ThemeSelect';
import { useDirection } from '@/hooks/useDirection';
import { useTextZoom } from '@/hooks/useTextZoom';
import { useTheme } from '@/hooks/useTheme';
import type { StorefrontDirection } from '@/models/dir';
import type { StorefrontTextZoom } from '@/models/textZoom';
import type { StorefrontTheme } from '@/models/theme';
import {
  type CanvasSidebarStartUpdateEventDetail,
  PButton,
  PCanvas,
  PHeading,
  PLink,
} from '@porsche-design-system/components-react/ssr';
import { breakpointS } from '@porsche-design-system/components-react/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { type PropsWithChildren, useEffect, useState } from 'react';

export const Canvas = ({ children }: PropsWithChildren) => {
  const { theme, setStorefrontTheme } = useTheme();
  const { direction, setStorefrontDirection } = useDirection();
  const { textZoom, setStorefrontTextZoom } = useTextZoom();
  const pathname = usePathname();
  const [isSidebarStartOpen, setIsSidebarStartOpen] = useState(
    // initially, sidebar should be closed on mobile and opened on desktop
    global?.window && window.matchMedia(`(min-width: ${breakpointS}px)`).matches
  );
  const [isSidebarEndOpen, setIsSidebarEndOpen] = useState(false);

  const onSidebarStartUpdate = (e: CustomEvent<CanvasSidebarStartUpdateEventDetail>) => {
    setIsSidebarStartOpen(e.detail.open);
  };
  const onSidebarEndOpen = () => {
    setIsSidebarEndOpen(true);
  };
  const onSidebarEndDismiss = () => {
    setIsSidebarEndOpen(false);
  };

  useEffect(() => {
    setIsSidebarEndOpen(pathname?.includes('examples') || false);
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

      <PLink
        slot="header-end"
        iconSource="assets/github.svg"
        variant="ghost"
        compact={true}
        hideLabel={true}
        href="https://github.com/porsche-design-system/porsche-design-system"
        target="_blank"
        onClick={onSidebarEndOpen}
      >
        Navigate to GitHub repository of Porsche Design System
      </PLink>
      <PButton
        icon="configurate"
        variant="ghost"
        compact={true}
        hideLabel={true}
        onClick={onSidebarEndOpen}
        slot="header-end"
      >
        Open sidebar
      </PButton>

      <div className="-p-canvas-grid">
        <Tabs />
        {children}
      </div>

      <div slot="sidebar-start">
        <Navigation />
      </div>
      <div slot="sidebar-end">
        <div className="flex flex-col gap-sm mb-lg">
          <PHeading size="small" tag="h3">
            Global settings
          </PHeading>
          <ThemeSelect value={theme} onUpdate={(e): void => setStorefrontTheme(e.detail.value as StorefrontTheme)} />
          <DirectionSelect
            value={direction}
            onUpdate={(e): void => setStorefrontDirection(e.detail.value as StorefrontDirection)}
          />
          <TextZoomSelect
            value={textZoom}
            onUpdate={(e): void => setStorefrontTextZoom(e.detail.value as StorefrontTextZoom)}
          />
        </div>
      </div>
    </PCanvas>
  );
};
