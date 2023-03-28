/* Auto Generated File */
import Image from 'next/image';
import type { NextPage } from 'next';
import { PLink, PLinkTileModelSignature } from '@porsche-design-system/components-react/ssr';

const LinkTileModelSignaturePage: NextPage = (): JSX.Element => {
  const style = `
    .container-large {
      max-width: 800px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min-content, 400px));
      gap: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light grid" title="should render default on light background">
        <PLinkTileModelSignature heading="Default">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Default">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary">
            <a href="#primary">Slotted anchor</a>
          </PLink>
          <PLink slot="secondary">
            <a href="#secondary">Slotted anchor</a>
          </PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render with description on light background">
        <PLinkTileModelSignature heading="With description" description="Some description">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render different models on light background">
        <PLinkTileModelSignature heading="Model 718" model="718">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model boxster" model="boxster">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model cayenne" model="cayenne">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model cayman" model="cayman">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model macan" model="macan">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model panamera" model="panamera">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model taycan" model="taycan">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model turbo-s" model="turbo-s">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature heading="Model turbo" model="turbo">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render different weights on light background">
        <PLinkTileModelSignature heading="Weight regular" weight="regular">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Weight responsive"
          weight={{ base: 'regular', xs: 'semi-bold', s: 'regular', m: 'semi-bold', l: 'regular', xl: 'semi-bold' }}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render different aspect ratios on light background">
        <PLinkTileModelSignature heading="Aspect ratio 16:9" aspectRatio="16:9">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature heading="Aspect ratio 1:1" aspectRatio="1:1">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature heading="Aspect ratio 4:3" aspectRatio="4:3">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature heading="Aspect ratio 9:16" aspectRatio="9:16">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Aspect ratio responsive"
          aspectRatio={{ base: '16:9', xs: '1:1', s: '3:4', m: '9:16', l: '4:3', xl: '16:9'}}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render different link directions on light background">
        <PLinkTileModelSignature heading="Link direction column" linkDirection="column">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Link direction responsive"
          linkDirection={{ base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row'}}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light grid" title="should render with readable overflowing text on different backgrounds">
        <PLinkTileModelSignature
          heading="Some long text on white background to overflow the box. Some long text on white background to overflow the box. Some long text on white background to overflow the box."
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature heading="Some heading">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some super long label which causes line breaks in the link</PLink>
          <PLink slot="secondary" href="#secondary">Some super long label which causes line breaks in the link</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Some heading"
          description="Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box."
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
        <PLinkTileModelSignature
          heading="Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box."
          description="Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box."
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div
        className="playground light grid"
        title="should render with picture tag and multiple sources depending on viewport on light background"
      >
        <PLinkTileModelSignature heading="Some heading" description="Picture tag">
          <picture>
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width={50}
              height={50}
              alt="Some alt text"
            />
          </picture>
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
      </div>

      <div className="playground light container-large" title="should render with max width description text on light background">
        <PLinkTileModelSignature
          heading="Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles."
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>

        <PLinkTileModelSignature
          heading="Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles."
          description="Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles."
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
          <PLink slot="primary" href="#primary">Some label</PLink>
          <PLink slot="secondary" href="#secondary">Some label</PLink>
        </PLinkTileModelSignature>
      </div>
    </>
  );
};

export default LinkTileModelSignaturePage;
