'use client';

import { Navigation } from '@/components/common/Navigation';
import Tabs from '@/components/common/Tabs';
import { ThemeCycle } from '@/components/common/ThemeCycle';
import {
  type CanvasSidebarStartUpdateEventDetail,
  PButton,
  PCanvas,
  PLink,
  PText,
} from '@porsche-design-system/components-react/ssr';
import { breakpointS } from '@porsche-design-system/components-react/styles';
import Link from 'next/link';
import { type PropsWithChildren, useState } from 'react';

export const Canvas = ({ children }: PropsWithChildren) => {
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

      <ThemeCycle slot="header-end" />
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
        <div className="col-span-full xs:col-start-2 xs:col-end-12">
          <Tabs />
          {children}
        </div>
      </div>

      <div slot="sidebar-start">
        <Navigation />
      </div>
      <div slot="sidebar-end">
        <PText>Sidebar End</PText>
      </div>
    </PCanvas>
  );
};
