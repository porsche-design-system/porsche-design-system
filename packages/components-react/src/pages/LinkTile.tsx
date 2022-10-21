/* Auto Generated File */
import { PLinkTile } from '@porsche-design-system/components-react';

export const LinkTilePage = (): JSX.Element => {
  const style = `
    .container {
      max-width: 300px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      column-gap: 10px;
      row-gap: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light container" title="should render default link-tile on light background">
        <PLinkTile href="#" label="Some Label" description="Default">
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
      </div>

      <div className="playground light grid" style={{ fontSize: '24px' }} title="should render different sizes on light background">
        <PLinkTile href="#" label="Some label" description="Size inherit" size="inherit">
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
        <PLinkTile
          href="#"
          label="Some label"
          description="Size breakpoint"
          size={{ base: 'default', xs: 'inherit', s: 'default', m: 'inherit', l: 'default', xl: 'inherit' }}
        >
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
      </div>

      <div className="playground light grid" title="should render different weights on light background">
        <PLinkTile href="#" label="Some label" description="Weight regular" weight="regular">
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
        <PLinkTile
          href="#"
          label="Some label"
          description="Weight breakpoint"
          weight={{ base: 'regular', xs: 'semibold', s: 'regular', m: 'semibold', l: 'regular', xl: 'semibold' }}
        >
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
      </div>

      <div className="playground light grid" title="should render different aspect ratios on light background">
        <PLinkTile href="#" label="Some label" description="Aspect ratio 16:9" aspectRatio="16:9">
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
        <PLinkTile label="Some label" description="Aspect ratio 1:1" href="#" aspectRatio="1:1">
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
        <PLinkTile href="#" label="Some label" description="Aspect ratio 3:4" aspectRatio="3:4">
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
        <PLinkTile href="#" label="Some label" description="Aspect ratio 9:16" aspectRatio="9:16">
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
        <PLinkTile
          href="#"
          label="Some label"
          description="Aspect ratio breakpoint"
          aspectRatio={{ base: '16:9', xs: '1:1', s: '3:4', m: '9:16', l: '4:3', xl: '16:9'}}
        >
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
      </div>

      <div className="playground light container" title="should render compact on light background">
        <PLinkTile href="#" label="Some label" description="Compact" compact={true}>
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
      </div>

      <div className="playground light container" title="should render align top on light background">
        <PLinkTile href="#" label="Some label" description="Align top" align="top" compact={true}>
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
      </div>

      <div className="playground light container" title="should render without gradient">
        <PLinkTile href="#" label="Some label" description="Gradient false" gradient={false}>
          <img src="./assets/porsche_beach.jpg" alt="Beach" />
        </PLinkTile>
      </div>

      <div className="playground light grid" title="should render with readable overflowing text on different backgrounds">
        <PLinkTile
          href="#"
          label="Some label"
          description="Some long text on white background. Some long text on white background. Some long text on white background. Some long text on white background."
        >
          <img src="./assets/solid_white.png" alt="Solid white" />
        </PLinkTile>
        <PLinkTile
          href="#"
          label="Some label"
          description="Some long text on white background. Some long text on white background. Some long text on white background. Some long text on white background."
          compact={true}
        >
          <img src="./assets/solid_white.png" alt="Solid white" />
        </PLinkTile>
        <PLinkTile
          href="#"
          label="Some label"
          description="Some long text on office background. Some long text on office background. Some long text on office background. Some long text on office background."
        >
          <img src="./assets/porsche_office.jpg" alt="Office" />
        </PLinkTile>
        <PLinkTile
          href="#"
          label="Some label"
          description="Some long text on office background. Some long text on office background. Some long text on office background. Some long text on office background."
          compact={true}
        >
          <img src="./assets/porsche_office.jpg" alt="Office" />
        </PLinkTile>
      </div>

      <div
        className="playground light container"
        title="should render with picture tag and multiple sources depending on viewport on light background"
      >
        <PLinkTile href="#" label="Some label" description="Picture tag">
          <picture>
            <source media="(min-width: 760px)" srcSet={"./assets/porsche_beach.jpg"} />
            <source media="(min-width: 1000px)" srcSet={"./assets/porsche_office.jpg"} />
            <img src="./assets/porsche_office.jpg" alt="Office" />
          </picture>
        </PLinkTile>
      </div>
    </>
  );
};
