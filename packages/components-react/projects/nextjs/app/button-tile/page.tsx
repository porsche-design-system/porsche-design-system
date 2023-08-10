/* Auto Generated File */
import Image from 'next/image';
import type { NextPage } from 'next';
import { PButtonTile } from '@porsche-design-system/components-react/ssr';

const ButtonTilePage: NextPage = (): JSX.Element => {
  const style = `
    .container-large {
      max-width: 800px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light grid" title="should render default button-tile on light background">
        <PButtonTile label="Some Label" description="Default">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" style={{ fontSize: '24px' }} title="should render different sizes on light background">
        <PButtonTile label="Some label" description="Size inherit" size="inherit">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile
          label="Some label"
          description="Size responsive"
          size={{ base: 'default', xs: 'inherit', s: 'default', m: 'inherit', l: 'default', xl: 'inherit' }}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render different weights on light background">
        <PButtonTile label="Some label" description="Weight regular" weight="regular">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile
          label="Some label"
          description="Weight responsive"
          weight={{ base: 'regular', xs: 'semi-bold', s: 'regular', m: 'semi-bold', l: 'regular', xl: 'semi-bold' }}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render background='light' on light background">
        <PButtonTile label="Some label" description="Background light" background="light">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render different aspect ratios on light background">
        <PButtonTile label="Some label" description="Aspect ratio 16:9" aspectRatio="16:9">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile label="Some label" description="Aspect ratio 1:1" aspectRatio="1:1">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile label="Some label" description="Aspect ratio 3:4" aspectRatio="3:4">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile label="Some label" description="Aspect ratio 9:16" aspectRatio="9:16">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile
          label="Some label"
          description="Aspect ratio responsive"
          aspectRatio={{ base: '16:9', xs: '1:1', s: '3:4', m: '9:16', l: '4:3', xl: '16:9'}}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render compact on light background">
        <PButtonTile label="Some label" description="Compact" compact={true}>
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile
          label="Some label"
          description="Compact responsive"
          compact={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render align top on light background">
        <PButtonTile label="Some label" description="Align top" align="top" compact={true}>
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render without gradient">
        <PButtonTile label="Some label" description="Gradient false" gradient={false}>
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD/zP9RsvrtAAAAHElEQVQY02Ng4GBgYGFgoBn9HwwOwPhDlqaTPwBKng+1NhhBkgAAAABJRU5ErkJggg=="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render with readable overflowing text on different backgrounds">
        <PButtonTile
          label="Some label"
          description="Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box."
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile label="Some super long label which causes line breaks in the button" description="Some description">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
        <PButtonTile
          label="Some label"
          description="Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box."
          compact={true}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div
        className="playground light grid"
        title="should render with picture tag and multiple sources depending on viewport on light background"
      >
        <PButtonTile label="Some label" description="Picture tag">
          <picture>
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width={50}
              height={50}
              alt="Some alt text"
            />
          </picture>
        </PButtonTile>
      </div>

      <div className="playground light container-large" title="should render with max width description text on light background">
        <PButtonTile
          label="Some label"
          description="Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles."
          compact={true}
        >
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC"
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render disabled button-tile on light background">
        <PButtonTile label="Some Label" description="Disabled" disabled={true}>
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render compact disabled button-tile on light background">
        <PButtonTile label="Some Label" description="Disabled" disabled={true} compact={true}>
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render loading button-tile on light background">
        <PButtonTile label="Some Label" description="Loading" loading={true}>
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render loading compact button-tile on light background">
        <PButtonTile label="Some Label" description="Loading" loading={true} compact={true}>
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render button-tile with specific icon on light background">
        <PButtonTile label="Some Label" description="Icon" icon="delete">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>

      <div className="playground light grid" title="should render compact button-tile with specific icon on light background">
        <PButtonTile label="Some Label" description="Icon" icon="delete" compact={true}>
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width={50}
            height={50}
            alt="Some alt text"
          />
        </PButtonTile>
      </div>
    </>
  );
};

export default ButtonTilePage;
