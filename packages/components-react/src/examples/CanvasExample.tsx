import { PCanvas, PText } from '@porsche-design-system/components-react';

export const CanvasExamplePage = (): JSX.Element => {
  const style = `
      body {
        overflow-x: hidden;
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
        background: lightpink;
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
      <PCanvas>
        <a slot="title" href="#">
          App Name
        </a>

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
          <PText>Footer</PText>
        </div>
        <div slot="sidebar-start">
          <PText>Sidebar Start</PText>
        </div>
        <div slot="sidebar-end">
          <PText>Sidebar End</PText>
        </div>
      </PCanvas>
    </>
  );
};
