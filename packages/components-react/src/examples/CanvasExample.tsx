import { useCallback, useState } from 'react';
import { PButtonPure, PCanvas, PTag } from '@porsche-design-system/components-react';

export const CanvasExamplePage = (): JSX.Element => {
  const [isSidebarStartOpen, setIsSidebarStartOpen] = useState<boolean>(false);
  const onToggleSidebarStart = useCallback(() => {
    setIsSidebarStartOpen((isSidebarStartOpen) => !isSidebarStartOpen);
  }, []);
  const onDismissSidebarStart = useCallback(() => {
    setIsSidebarStartOpen(false);
  }, []);

  const [isSidebarEndOpen, setIsSidebarEndOpen] = useState<boolean>(false);
  const onToggleSidebarEnd = useCallback(() => {
    setIsSidebarEndOpen((isSidebarEndOpen) => !isSidebarEndOpen);
  }, []);
  const onDismissSidebarEnd = useCallback(() => {
    setIsSidebarEndOpen(false);
  }, []);

  const style = `
      body {
        overflow-x: hidden;
      }

      p-canvas::part(header) {
        background: #d1fbc6;
      }

      p-canvas::part(main) {
        background: #bed0ff;
      }

      p-canvas::part(footer) {
        background: #f7c6fb;
      }

      p-canvas::part(sidebar-start) {
        background: #ffbebe;
      }

      p-canvas::part(sidebar-end) {
        background: #ffbebe;
      }

      .module {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
      }

      .tile {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: #fff;
      }

      .tile--full {
        grid-column: var(--pds-grid-span-full);
      }

      .tile--one-half {
        grid-column: var(--pds-grid-span-one-half);
      }

      .tile--one-third {
        grid-column: var(--pds-grid-span-one-third);
      }

      .tile--two-thirds {
        grid-column: var(--pds-grid-span-two-thirds);
      }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <PCanvas
        sidebarStartWidth="medium"
        sidebarEndWidth="medium"
        onDismissSidebarStart={onDismissSidebarStart}
        sidebarStartOpen={isSidebarStartOpen}
        onDismissSidebarEnd={onDismissSidebarEnd}
        sidebarEndOpen={isSidebarEndOpen}
      >
        <div slot="header">
          <PTag color="background-base">Header</PTag>
          <PButtonPure icon="menu-lines" onClick={onToggleSidebarStart}>
            Toggle Sidebar Start
          </PButtonPure>
          <PButtonPure icon="menu-lines" onClick={onToggleSidebarEnd}>
            Toggle Sidebar End
          </PButtonPure>
        </div>

        <div className="module">
          <div className="tile tile--full">Full</div>
        </div>
        <div className="module">
          <div className="tile tile--one-half">One Half</div>
          <div className="tile tile--one-half">One Half</div>
        </div>
        <div className="module">
          <div className="tile tile--one-third">One Third</div>
          <div className="tile tile--one-third">One Third</div>
          <div className="tile tile--one-third">One Third</div>
        </div>
        <div className="module">
          <div className="tile tile--one-third">One Third</div>
          <div className="tile tile--two-thirds">Two Thirds</div>
        </div>

        <div slot="footer">
          <PTag color="background-base">Footer</PTag>
        </div>
        <div slot="sidebar-start">
          <PTag color="background-base">Sidebar</PTag>
        </div>
        <div slot="sidebar-end">
          <PTag color="background-base">Sidebar</PTag>
        </div>
      </PCanvas>
    </>
  );
};
