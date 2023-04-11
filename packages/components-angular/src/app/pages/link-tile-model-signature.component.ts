/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-link-tile-model-signature',
  styles: [
    `
      .container-large {
        max-width: 800px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min-content, 400px));
        gap: 10px;
      }
    `,
  ],
  template: `
    <div class="playground light grid" title="should render default on light background">
      <p-link-tile-model-signature [heading]="'Default'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Default'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary">
          <a [href]="'#primary'">Slotted anchor</a>
        </p-link>
        <p-link slot="secondary">
          <a [href]="'#secondary'">Slotted anchor</a>
        </p-link>
      </p-link-tile-model-signature>
    </div>

    <div class="playground light grid" title="should render with description on light background">
      <p-link-tile-model-signature [heading]="'With description'" [description]="'Some description'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
    </div>

    <div class="playground light grid" title="should render different models on light background">
      <p-link-tile-model-signature [heading]="'Model 718'" [model]="'718'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Model boxster'" [model]="'boxster'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Model cayenne'" [model]="'cayenne'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Model cayman'" [model]="'cayman'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Model macan'" [model]="'macan'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Model panamera'" [model]="'panamera'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Model taycan'" [model]="'taycan'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Model turbo-s'" [model]="'turbo-s'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature [heading]="'Model turbo'" [model]="'turbo'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
    </div>

    <div class="playground light grid" title="should render different weights on light background">
      <p-link-tile-model-signature [heading]="'Weight regular'" [weight]="'regular'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature
        [heading]="'Weight responsive'"
        [weight]="{ base: 'regular', xs: 'semi-bold', s: 'regular', m: 'semi-bold', l: 'regular', xl: 'semi-bold' }"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
    </div>

    <div class="playground light grid" title="should render different aspect ratios on light background">
      <p-link-tile-model-signature [heading]="'Aspect ratio 16:9'" aspect-ratio="16:9">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature [heading]="'Aspect ratio 1:1'" aspect-ratio="1:1">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature [heading]="'Aspect ratio 4:3'" aspect-ratio="4:3">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature [heading]="'Aspect ratio 9:16'" aspect-ratio="9:16">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature
        [heading]="'Aspect ratio responsive'"
        [aspectRatio]="{ base: '16:9', xs: '1:1', s: '3:4', m: '9:16', l: '4:3', xl: '16:9'}"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
    </div>

    <div class="playground light grid" title="should render different link directions on light background">
      <p-link-tile-model-signature [heading]="'Link direction column'" [linkDirection]="'column'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature
        [heading]="'Link direction responsive'"
        [linkDirection]="{ base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row'}"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
    </div>

    <div class="playground light grid" title="should render with readable overflowing text on different backgrounds">
      <p-link-tile-model-signature
        [heading]="'Some long text on white background to overflow the box. Some long text on white background to overflow the box. Some long text on white background to overflow the box.'"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature [heading]="'Some heading'">
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some super long label which causes line breaks in the link</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some super long label which causes line breaks in the link</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature
        [heading]="'Some heading'"
        [description]="'Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box.'"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature
        [heading]="'Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box.'"
        [description]="'Some long text on white background to overflow the box. Some long text on white background  to overflow the box. Some long text on white background  to overflow the box.'"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
    </div>

    <div
      class="playground light grid"
      title="should render with picture tag and multiple sources depending on viewport on light background"
    >
      <p-link-tile-model-signature [heading]="'Some heading'" [description]="'Picture tag'">
        <picture>
          <img
            [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
            [width]="50"
            [height]="50"
            [alt]="'Some alt text'"
          />
        </picture>
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
    </div>

    <div class="playground light container-large" title="should render with max width description text on light background">
      <p-link-tile-model-signature
        [heading]="'Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles.'"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>

      <p-link-tile-model-signature
        [heading]="'Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles.'"
        [description]="'Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles. Some long text on white background to show how it renders on wide tiles.'"
      >
        <img
          [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEX///+nxBvIAAAANklEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G4IAAAFjdVCkAAAAAElFTkSuQmCC'"
          [width]="50"
          [height]="50"
          [alt]="'Some alt text'"
        />
        <p-link slot="primary" [href]="'#primary'">Some label</p-link>
        <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
      </p-link-tile-model-signature>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTileModelSignatureComponent {}
