/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-overview-flaky',
  styles: [
    `
      p-link-tile,
      p-button-tile,
      p-link-tile-model-signature,
      my-prefix-p-link-tile,
      my-prefix-p-button-tile,
      my-prefix-p-link-tile-model-signature {
        max-width: 400px;
      }
    `,
  ],
  template: `
    <div class="root" style="display: flex">
      <div style="flex: 1">
        <div class="playground light" title="should render default stepper-horizontal">
          <p-stepper-horizontal>
            <p-stepper-horizontal-item [state]="'current'">Step 1</p-stepper-horizontal-item>
            <p-stepper-horizontal-item>Step 2</p-stepper-horizontal-item>
            <p-stepper-horizontal-item>Step 3</p-stepper-horizontal-item>
            <p-stepper-horizontal-item>Step 4</p-stepper-horizontal-item>
            <p-stepper-horizontal-item>Step 5</p-stepper-horizontal-item>
            <p-stepper-horizontal-item>Step 6</p-stepper-horizontal-item>
            <p-stepper-horizontal-item>Step 7</p-stepper-horizontal-item>
            <p-stepper-horizontal-item>Step 8</p-stepper-horizontal-item>
            <p-stepper-horizontal-item>Step 9</p-stepper-horizontal-item>
          </p-stepper-horizontal>
        </div>

        <div class="playground light" title="should render default link-tile">
          <p-link-tile [href]="'#'" [label]="'Some Label'" [description]="'Default'">
            <img
              [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
              [width]="50"
              [height]="50"
              [alt]="'Beach'"
            />
          </p-link-tile>
        </div>

        <div class="playground light" title="should render default button-tile">
          <p-button-tile [label]="'Some Label'" [description]="'Default'">
            <img
              [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
              [width]="50"
              [height]="50"
              [alt]="'Beach'"
            />
          </p-button-tile>
        </div>

        <div class="playground light" title="should render default link-tile-model-signature">
          <p-link-tile-model-signature [heading]="'Some Heading'" [description]="'Default'">
            <img
              [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
              [width]="50"
              [height]="50"
              [alt]="'Beach'"
            />
            <p-link slot="primary" [href]="'#primary'">Some label</p-link>
            <p-link slot="secondary" [href]="'#secondary'">Some label</p-link>
          </p-link-tile-model-signature>
        </div>

        <div class="playground light" title="should render default switch">
          <p-switch>Some label</p-switch>
        </div>
      </div>

      <div style="flex: 1">
        <div class="playground light" title="should render default stepper-horizontal with custom prefix">
          <my-prefix-p-stepper-horizontal p-stepper-horizontal>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item [state]="'current'">Step 1</my-prefix-p-stepper-horizontal-item>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item>Step 2</my-prefix-p-stepper-horizontal-item>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item>Step 3</my-prefix-p-stepper-horizontal-item>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item>Step 4</my-prefix-p-stepper-horizontal-item>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item>Step 5</my-prefix-p-stepper-horizontal-item>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item>Step 6</my-prefix-p-stepper-horizontal-item>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item>Step 7</my-prefix-p-stepper-horizontal-item>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item>Step 8</my-prefix-p-stepper-horizontal-item>
            <my-prefix-p-stepper-horizontal-item p-stepper-horizontal-item>Step 9</my-prefix-p-stepper-horizontal-item>
          </my-prefix-p-stepper-horizontal>
        </div>

        <div class="playground light" title="should render default link-tile with custom prefix">
          <my-prefix-p-link-tile p-link-tile [href]="'#'" [label]="'Some Label'" [description]="'Default'">
            <img
              [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
              [width]="50"
              [height]="50"
              [alt]="'Beach'"
            />
          </my-prefix-p-link-tile>
        </div>

        <div class="playground light" title="should render default button-tile with custom prefix">
          <my-prefix-p-button-tile p-button-tile [label]="'Some Label'" [description]="'Default'">
            <img
              [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
              [width]="50"
              [height]="50"
              [alt]="'Beach'"
            />
          </my-prefix-p-button-tile>
        </div>

        <div class="playground light" title="should render default link-tile-model-signature with custom prefix">
          <my-prefix-p-link-tile-model-signature p-link-tile-model-signature [heading]="'Some Heading'" [description]="'Default'">
            <img
              [src]="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='"
              [width]="50"
              [height]="50"
              [alt]="'Beach'"
            />
            <my-prefix-p-link p-link slot="primary" [href]="'#primary'">Some label</my-prefix-p-link>
            <my-prefix-p-link p-link slot="secondary" [href]="'#secondary'">Some label</my-prefix-p-link>
          </my-prefix-p-link-tile-model-signature>
        </div>

        <div class="playground light" title="should render default switch with custom prefix">
          <my-prefix-p-switch p-switch>Some label</my-prefix-p-switch>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewFlakyComponent {}
