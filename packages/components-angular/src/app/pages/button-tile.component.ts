/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-button-tile',
  styles: [
    `
      p-button-tile {
        width: 100%;
        max-width: 300px;
      }
    `,
  ],
  template: `
    <div class="playground light auto-layout" title="should render default button-tile">
      <p-button-tile [label]="'Some Label'" [description]="'Default'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" style="font-size: 24px" title="should render different sizes">
      <p-button-tile [label]="'Some label'" [description]="'Size inherit'" [size]="'inherit'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile
        [label]="'Some label'"
        [description]="'Size responsive'"
        [size]="{ base: 'default', xs: 'inherit', s: 'default', m: 'inherit', l: 'default', xl: 'inherit' }"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render different weights">
      <p-button-tile [label]="'Some label'" [description]="'Weight regular'" [weight]="'regular'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile
        [label]="'Some label'"
        [description]="'Weight responsive'"
        [weight]="{ base: 'regular', xs: 'semi-bold', s: 'regular', m: 'semi-bold', l: 'regular', xl: 'semi-bold' }"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render background='light'">
      <p-button-tile [label]="'Some label'" [description]="'Background light'" [background]="'light'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render different aspect ratios">
      <p-button-tile [label]="'Some label'" [description]="'Aspect ratio 16:9'" aspect-ratio="16:9">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile [label]="'Some label'" [description]="'Aspect ratio 1:1'" aspect-ratio="1:1">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile [label]="'Some label'" [description]="'Aspect ratio 3:4'" aspect-ratio="3:4">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile [label]="'Some label'" [description]="'Aspect ratio 9:16'" aspect-ratio="9:16">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile
        [label]="'Some label'"
        [description]="'Aspect ratio responsive'"
        [aspectRatio]="{ base: '16:9', xs: '1:1', s: '3:4', m: '9:16', l: '4:3', xl: '16:9'}"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render compact">
      <p-button-tile [label]="'Some label'" [description]="'Compact'" [compact]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile
        [label]="'Some label'"
        [description]="'Compact responsive'"
        [compact]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render align top">
      <p-button-tile [label]="'Some label'" [description]="'Align top'" [align]="'top'" [compact]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render without gradient">
      <p-button-tile [label]="'Some label'" [description]="'Gradient false'" [gradient]="false">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD/zP9RsvrtAAAAHElEQVQY02Ng4GBgYGFgoBn9HwwOwPhDlqaTPwBKng+1NhhBkgAAAABJRU5ErkJggg=='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render with readable overflowing text on different backgrounds">
      <p-button-tile
        [label]="'Some label'"
        [description]="'Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box.'"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile [label]="'Some super long label which causes line breaks in the button'" [description]="'Some description'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
      <p-button-tile
        [label]="'Some label'"
        [description]="'Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box.'"
        [compact]="true"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div
      class="playground light auto-layout"
      title="should render with picture tag and multiple sources depending on viewport"
    >
      <p-button-tile [label]="'Some label'" [description]="'Picture tag'">
        <picture>
          <img
            [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
            [width]="50"
            [height]="50"
            [alt]="'Some alt text'"
          />
        </picture>
      </p-button-tile>
    </div>

    <div class="playground light" title="should render with max width description text">
      <p-button-tile
        [label]="'Some label'"
        [description]="'Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles.'"
        [compact]="true"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render disabled button-tile">
      <p-button-tile [label]="'Some Label'" [description]="'Disabled'" [disabled]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render compact disabled button-tile">
      <p-button-tile [label]="'Some Label'" [description]="'Disabled'" [disabled]="true" [compact]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render loading button-tile">
      <p-button-tile [label]="'Some Label'" [description]="'Loading'" [loading]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render loading compact button-tile">
      <p-button-tile [label]="'Some Label'" [description]="'Loading'" [loading]="true" [compact]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render button-tile with specific icon">
      <p-button-tile [label]="'Some Label'" [description]="'Icon'" [icon]="'delete'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>

    <div class="playground light auto-layout" title="should render compact button-tile with specific icon">
      <p-button-tile [label]="'Some Label'" [description]="'Icon'" [icon]="'delete'" [compact]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-button-tile>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonTileComponent {}
