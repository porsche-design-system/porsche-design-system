/* Auto Generated File */
import { PLinkTile } from '@porsche-design-system/components-react';

export const LinkTilePage = (): JSX.Element => {
  const style = `
    .container {
      max-width: 300px;
      margin-bottom: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      column-gap: 1.33333%;
      row-gap: 10px;
      margin-bottom: 20px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="container">
        <div title="should render default">
          <PLinkTile href="#" label="Some Label" description="Default">
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
      </div>
      <div className="grid" style={{ fontSize: '24px' }}>
        <div title="should render font size inherit">
          <PLinkTile href="#" label="Some label" description="Size inherit" size="inherit">
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
        <div title="should render font size breakpoint customizable">
          <PLinkTile
            href="#"
            label="Some label"
            description="Size breakpoint"
            size={{ base: 'default', xs: 'inherit', s: 'default', m: 'inherit', l: 'default', xl: 'inherit' }}
          >
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
      </div>

      <div className="grid">
        <div title="should render font weight regular">
          <PLinkTile href="#" label="Some label" description="Weight regular" weight="regular">
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
        <div title="should render font weight breakpoint customizable">
          <PLinkTile
            href="#"
            label="Some label"
            description="Weight breakpoint"
            weight={{ base: 'regular', xs: 'semibold', s: 'regular', m: 'semibold', l: 'regular', xl: 'semibold' }}
          >
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
      </div>

      <div className="grid">
        <div title="should render aspect ratio 16:9">
          <PLinkTile href="#" label="Some label" description="Aspect ratio 16:9" aspectRatio="16:9">
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
        <div title="should render aspect ratio 1:1">
          <PLinkTile label="Some label" description="Aspect ratio 1:1" href="#" aspectRatio="1:1">
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
        <div title="should render aspect ratio 3:4">
          <PLinkTile href="#" label="Some label" description="Aspect ratio 3:4" aspectRatio="3:4">
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
        <div title="should render aspect ratio 9:16">
          <PLinkTile href="#" label="Some label" description="Aspect ratio 9:16" aspectRatio="9:16">
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
        <div title="should render aspect ratio breakpoint customizable">
          <PLinkTile
            href="#"
            label="Some label"
            description="Aspect ratio breakpoint"
            aspectRatio={{ base: '16:9', xs: '1:1', s: '3:4', m: '9:16', l: '4:3', xl: '16:9'}}
          >
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
      </div>

      <div className="grid">
        <div title="should render compact">
          <PLinkTile href="#" label="Some label" description="Compact" compact={true}>
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
        <div title="should render compact align top">
          <PLinkTile href="#" label="Some label" description="Compact align top" align="top" compact={true}>
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
      </div>

      <div className="container">
        <div title="should render without gradient">
          <PLinkTile href="#" label="Some label" description="Gradient false" gradient={false}>
            <img src="./assets/porsche_beach.jpg" />
          </PLinkTile>
        </div>
      </div>

      <div className="grid">
        <div title="should render readable overflowing text on white background">
          <PLinkTile
            href="#"
            label="Some label"
            description="Some long text on white background. Some long text on white background. Some long text on white background. Some long text on white background."
          >
            <img />
          </PLinkTile>
        </div>
        <div title="should render compact variant with readable overflowing text on white background">
          <PLinkTile
            href="#"
            label="Some label"
            description="Some long text on white background. Some long text on white background. Some long text on white background. Some long text on white background."
            compact={true}
          >
            <img />
          </PLinkTile>
        </div>
        <div title="should render readable overflowing text on image background">
          <PLinkTile
            href="#"
            label="Some label"
            description="Some long text on office background. Some long text on office background. Some long text on office background. Some long text on office background."
          >
            <img src="./assets/porsche_office.jpg" />
          </PLinkTile>
        </div>
        <div title="should render compact variant with readable overflowing text on image background">
          <PLinkTile
            href="#"
            label="Some label"
            description="Some long text on office background. Some long text on office background. Some long text on office background. Some long text on office background."
            compact={true}
          >
            <img src="./assets/porsche_office.jpg" />
          </PLinkTile>
        </div>
        <div title="should render with picture tag">
          <PLinkTile href="#" label="Some label" description="Picture tag">
            <picture>
              <source media="(min-width: 320px)" srcset="./assets/porsche_beach.jpg" />
              <source media="(min-width: 480px)" srcset="./assets/porsche_office.jpg" />
              <source media="(min-width: 760px)" srcset="./assets/porsche_beach.jpg.jpg" />
              <source media="(min-width: 1000px)" srcset="./assets/porsche_office.jpg" />
              <source media="(min-width: 1300px)" srcset="./assets/porsche_beach.jpg" />
              <source media="(min-width: 1760px)" srcset="./assets/porsche_office.jpg" />
              <img src="./assets/porsche_office.jpg" alt={} />
            </picture>
          </PLinkTile>
        </div>
        <div title="should render with srcset within image tag">
          <PLinkTile href="#" label="Some label" description="Srcset">
            <img
              src="./assets/porsche_factory.jpg"
              srcset="./assets/porsche_office.jpg 1x, ./assets/porsche_beach.jpg 2x"
              alt={}
            />
          </PLinkTile>
        </div>
      </div>
    </>
  );
};
