import {
  type CanvasSidebarStartUpdateEventDetail,
  PButton,
  PCanvas,
  PHeading,
  PText,
} from '@porsche-design-system/components-react';
import { breakpointS } from '@porsche-design-system/components-react/emotion';
import { useCallback, useState } from 'react';

export const CanvasExamplePage = (): JSX.Element => {
  const [isSidebarStartOpen, setIsSidebarStartOpen] = useState<boolean>(
    // initially, sidebar should be closed on mobile and opened on desktop
    window.matchMedia(`(min-width: ${breakpointS}px)`).matches
  );
  const [isSidebarEndOpen, setIsSidebarEndOpen] = useState<boolean>(false);

  const onSidebarStartUpdate = useCallback((e: CustomEvent<CanvasSidebarStartUpdateEventDetail>) => {
    setIsSidebarStartOpen(e.detail.open);
  }, []);
  const onSidebarEndOpen = useCallback(() => {
    setIsSidebarEndOpen(true);
  }, []);
  const onSidebarEndDismiss = useCallback(() => {
    setIsSidebarEndOpen(false);
  }, []);

  const style = `
      .-col-span-full-1 {
        grid-column: 1 / -1;
      }

      .-col-span-full-2 {
        grid-column: 2 / -2;
      }

      .-col-span-full-3 {
        grid-column: 3 / -3;
      }

      .-col-span-4 {
        grid-column: span 4;
      }

      .tile {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: lightpink;
      }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <PCanvas
        sidebarStartOpen={isSidebarStartOpen}
        sidebarEndOpen={isSidebarEndOpen}
        onSidebarStartUpdate={onSidebarStartUpdate}
        onSidebarEndDismiss={onSidebarEndDismiss}
      >
        <a slot="title" href="#">
          App Name
        </a>

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
          <PText className="-col-span-full-1">Content</PText>

          <div className="tile -col-span-4">Grid span 4x</div>
          <div className="tile -col-span-4">Grid span 4x</div>
          <div className="tile -col-span-4">Grid span 4x</div>

          <div className="tile -col-span-full-1">12 Grid columns</div>
          <div className="tile -col-span-full-2">10 Grid columns</div>
          <div className="tile -col-span-full-3">8 Grid columns</div>
        </div>

        <div slot="footer" className="-p-canvas-grid">
          <PText className="-col-span-full-1">Footer</PText>
          <div className="tile -col-span-full-1">12 Grid columns</div>
        </div>

        <div slot="sidebar-start">
          <PText>Sidebar Start</PText>
        </div>

        <PHeading slot="sidebar-end-header" tag="h2" size="small">
          Sidebar End Header
        </PHeading>

        <div slot="sidebar-end">
          <PText>Sidebar End</PText>
        </div>
      </PCanvas>
    </>
  );
};
