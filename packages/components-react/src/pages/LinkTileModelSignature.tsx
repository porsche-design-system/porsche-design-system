/* Auto Generated File */
import { PLink, PLinkTileModelSignature } from '@porsche-design-system/components-react';

export const LinkTileModelSignaturePage = (): JSX.Element => {
  const style = `
    .container-large {
      max-width: 800px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light grid" title="should render default on light background">
        <PLinkTileModelSignature heading="Default">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render with description on light background">
        <PLinkTileModelSignature heading="With description" description="Some description">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render different models on light background">
        <PLinkTileModelSignature heading="Model 718" model="718">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model boxster" model="boxster">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model cayenne" model="cayenne">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model cayman" model="cayman">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model macan" model="macan">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model panamera" model="panamera">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model taycan" model="taycan">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model turbo-s" model="turbo-s">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model turbo" model="turbo">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render different weights on light background">
        <PLinkTileModelSignature heading="Weight regular" weight="regular">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Weight responsive"
          weight={{ base: 'regular', xs: 'semi-bold', s: 'regular', m: 'semi-bold', l: 'regular', xl: 'semi-bold' }}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render different aspect ratios on light background">
        <PLinkTileModelSignature heading="Aspect ratio 16:9" aspectRatio="16:9">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature heading="Aspect ratio 1:1" aspectRatio="1:1">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature heading="Aspect ratio 3:4" aspectRatio="3:4">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature heading="Aspect ratio 9:16" aspectRatio="9:16">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Aspect ratio responsive"
          aspectRatio={{ base: '16:9', xs: '1:1', s: '3:4', m: '9:16', l: '4:3', xl: '16:9'}}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render different link directions on light background">
        <PLinkTileModelSignature heading="Link direction column" linkDirection="column">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Link direction responsive"
          linkDirection={{ base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row'}}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render with readable overflowing text on different backgrounds">
        <PLinkTileModelSignature
          heading="Some long text on white background to overflow the box. Some long text on white background to overflow the box. Some long text on white background to overflow the box."
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature heading="Some description">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some super long label which causes line breaks in the link</PLink>
          <PLink slot="secondary" href="#">Some super long label which causes line breaks in the link</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Some heading"
          description="Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box."
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box."
          description="Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box."
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div
        className="playground light grid"
        title="should render with picture tag and multiple sources depending on viewport on light background"
      >
        <PLinkTileModelSignature heading="Some heading" description="Picture tag">
          <picture>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width={50}
              height={50}
              alt="Some alt text"
            />
          </picture>
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light container-large" title="should render with max width description text on light background">
        <PLinkTileModelSignature
          heading="Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles."
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#">Some label</PLink>
          <PLink slot="secondary" href="#">Some label</PLink>
        </PLinkTileModelSignature>
      </div>
    </>
  );
};
