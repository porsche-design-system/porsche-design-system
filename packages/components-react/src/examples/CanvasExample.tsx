import { PCanvas, PText } from '@porsche-design-system/components-react';

export const CanvasExamplePage = (): JSX.Element => {
  const style = `
      body {
        overflow-x: hidden;
      }

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
      <PCanvas>
        <a slot="title" href="#">
          App Name
        </a>

        <PText className="-col-span-full-1">Content</PText>

        <div className="tile -col-span-4">Grid span 4x</div>
        <div className="tile -col-span-4">Grid span 4x</div>
        <div className="tile -col-span-4">Grid span 4x</div>

        <div className="tile -col-span-full-1">12 Grid columns</div>
        <div className="tile -col-span-full-2">10 Grid columns</div>
        <div className="tile -col-span-full-3">8 Grid columns</div>

        <PText slot="footer" className="-col-span-full-1">
          Footer
        </PText>
        <div slot="footer" className="tile -col-span-full-1">
          12 Grid columns
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
