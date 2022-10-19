/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-link-tile',
  styles: [
    `
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
    `,
  ],
  template: `
    <div class="container">
      <div title="should render default">
        <p-link-tile [href]="'#'" [label]="'Some Label'" [description]="'Default'">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
    </div>
    <div class="grid" style="font-size: 24px">
      <div title="should render font size inherit">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Size inherit'" [size]="'inherit'">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render font size breakpoint customizable">
        <p-link-tile
          [href]="'#'"
          [label]="'Some label'"
          [description]="'Size breakpoint'"
          [size]="{ base: 'default', xs: 'inherit', s: 'default', m: 'inherit', l: 'default', xl: 'inherit' }"
        >
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
    </div>

    <div class="grid">
      <div title="should render font weight regular">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Weight regular'" [weight]="'regular'">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render font weight breakpoint customizable">
        <p-link-tile
          [href]="'#'"
          [label]="'Some label'"
          [description]="'Weight breakpoint'"
          [weight]="{ base: 'regular', xs: 'semibold', s: 'regular', m: 'semibold', l: 'regular', xl: 'semibold' }"
        >
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
    </div>

    <div class="grid">
      <div title="should render aspect ratio 16:9">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Aspect ratio 16:9'" aspect-ratio="16:9">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render aspect ratio 1:1">
        <p-link-tile [label]="'Some label'" [description]="'Aspect ratio 1:1'" [href]="'#'" aspect-ratio="1:1">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render aspect ratio 3:4">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Aspect ratio 3:4'" aspect-ratio="3:4">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render aspect ratio 9:16">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Aspect ratio 9:16'" aspect-ratio="9:16">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render aspect ratio breakpoint customizable">
        <p-link-tile
          [href]="'#'"
          [label]="'Some label'"
          [description]="'Aspect ratio breakpoint'"
          [aspectRatio]="{ base: '16:9', xs: '1:1', s: '3:4', m: '9:16', l: '4:3', xl: '16:9'}"
        >
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
    </div>

    <div class="grid">
      <div title="should render compact">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Compact'" [compact]="true">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render compact align top">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Compact align top'" [align]="'top'" [compact]="true">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
    </div>

    <div class="container">
      <div title="should render without gradient">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Gradient false'" [gradient]="false">
          <img [src]="'./assets/porsche_beach.jpg'" />
        </p-link-tile>
      </div>
    </div>

    <div class="grid">
      <div title="should render readable overflowing text on white background">
        <p-link-tile
          [href]="'#'"
          [label]="'Some label'"
          [description]="'Some long text on white background. Some long text on white background. Some long text on white background. Some long text on white background.'"
        >
          <img />
        </p-link-tile>
      </div>
      <div title="should render compact variant with readable overflowing text on white background">
        <p-link-tile
          [href]="'#'"
          [label]="'Some label'"
          [description]="'Some long text on white background. Some long text on white background. Some long text on white background. Some long text on white background.'"
          [compact]="true"
        >
          <img />
        </p-link-tile>
      </div>
      <div title="should render readable overflowing text on image background">
        <p-link-tile
          [href]="'#'"
          [label]="'Some label'"
          [description]="'Some long text on office background. Some long text on office background. Some long text on office background. Some long text on office background.'"
        >
          <img [src]="'./assets/porsche_office.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render compact variant with readable overflowing text on image background">
        <p-link-tile
          [href]="'#'"
          [label]="'Some label'"
          [description]="'Some long text on office background. Some long text on office background. Some long text on office background. Some long text on office background.'"
          [compact]="true"
        >
          <img [src]="'./assets/porsche_office.jpg'" />
        </p-link-tile>
      </div>
      <div title="should render with picture tag">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Picture tag'">
          <picture>
            <source [media]="'(min-width: 320px)'" [srcset]="'./assets/porsche_beach.jpg'" />
            <source [media]="'(min-width: 480px)'" [srcset]="'./assets/porsche_office.jpg'" />
            <source [media]="'(min-width: 760px)'" [srcset]="'./assets/porsche_beach.jpg.jpg'" />
            <source [media]="'(min-width: 1000px)'" [srcset]="'./assets/porsche_office.jpg'" />
            <source [media]="'(min-width: 1300px)'" [srcset]="'./assets/porsche_beach.jpg'" />
            <source [media]="'(min-width: 1760px)'" [srcset]="'./assets/porsche_office.jpg'" />
            <img [src]="'./assets/porsche_office.jpg'" [alt]="" />
          </picture>
        </p-link-tile>
      </div>
      <div title="should render with srcset within image tag">
        <p-link-tile [href]="'#'" [label]="'Some label'" [description]="'Srcset'">
          <img
            [src]="'./assets/porsche_factory.jpg'"
            [srcset]="'./assets/porsche_office.jpg 1x, ./assets/porsche_beach.jpg 2x'"
            [alt]="'Office'"
          />
        </p-link-tile>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTileComponent {}
