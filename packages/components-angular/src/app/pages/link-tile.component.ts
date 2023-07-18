/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-link-tile',
  styles: [
    `
      .container-large {
        max-width: 800px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;
      }
    `,
  ],
  template: `
    <div class="playground light grid" title="should render default link-tile on light background">
      <p-link-tile [href]="'#'" [label]="'Some Label'" [description]="'Default'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
    </div>

    <div class="playground light grid" style="font-size: 24px" title="should render different sizes on light background">
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Size inherit'" [size]="'inherit'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile
        [href]="'#'"
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
      </p-link-tile>
    </div>

    <div class="playground light grid" title="should render different weights on light background">
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Weight regular'" [weight]="'regular'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile
        [href]="'#'"
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
      </p-link-tile>
    </div>

    <div class="playground light grid" title="should render background='light' on light background">
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Background light'" [background]="'light'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
    </div>

    <div class="playground light grid" title="should render different aspect ratios on light background">
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Aspect ratio 16:9'" aspect-ratio="16:9">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile [label]="'Some label'" [description]="'Aspect ratio 1:1'" [href]="'#'" aspect-ratio="1:1">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Aspect ratio 3:4'" aspect-ratio="3:4">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Aspect ratio 9:16'" aspect-ratio="9:16">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile
        [href]="'#'"
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
      </p-link-tile>
    </div>

    <div class="playground light grid" title="should render compact on light background">
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Compact'" [compact]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile
        [href]="'#'"
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
      </p-link-tile>
    </div>

    <div class="playground light grid" title="should render align top on light background">
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Align top'" [align]="'top'" [compact]="true">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
    </div>

    <div class="playground light grid" title="should render without gradient">
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Gradient false'" [gradient]="false">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD/zP9RsvrtAAAAHElEQVQY02Ng4GBgYGFgoBn9HwwOwPhDlqaTPwBKng+1NhhBkgAAAABJRU5ErkJggg=='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
    </div>

    <div class="playground light grid" title="should render with readable overflowing text on different backgrounds">
      <p-link-tile
        [href]="'#'"
        [label]="'Some label'"
        [description]="'Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box.'"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile
        [href]="'#'"
        [label]="'Some super long label which causes line breaks in the link'"
        [description]="'Some description'"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
      </p-link-tile>
      <p-link-tile
        [href]="'#'"
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
      </p-link-tile>
    </div>

    <div
      class="playground light grid"
      title="should render with picture tag and multiple sources depending on viewport on light background"
    >
      <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Picture tag'">
        <picture>
          <img
            [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
            [width]="50"
            [height]="50"
            [alt]="'Some alt text'"
          />
        </picture>
      </p-link-tile>
    </div>

    <div class="playground light container-large" title="should render with max width description text on light background">
      <p-link-tile
        [href]="'#'"
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
      </p-link-tile>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTileComponent {}
