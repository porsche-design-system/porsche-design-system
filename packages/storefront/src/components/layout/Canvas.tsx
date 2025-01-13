'use client';

import {
  type CanvasSidebarStartUpdateEventDetail,
  PButton,
  PCanvas,
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

      <PButton
        slot="header-end"
        icon="configurate"
        variant="ghost"
        compact={true}
        hideLabel={true}
        onClick={onSidebarEndOpen}
      >
        Open sidebar
      </PButton>

      <div className="-p-canvas-grid">
        <div className="col-span-full">{children}</div>
      </div>

      <div slot="sidebar-start">
        <PText>Sidebar Start</PText>
      </div>
      <div slot="sidebar-end">
        <PText>Sidebar End</PText>
      </div>
    </PCanvas>
  );
};
