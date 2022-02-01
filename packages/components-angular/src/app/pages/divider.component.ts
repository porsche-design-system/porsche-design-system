/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-divider',
  styles: [
    `
      .divider-vertical-container-example {
        display: flex;
        height: 100px;
      }
    
      @media (min-width: 480px) and (max-width: 759px), (min-width: 1000px) and (max-width: 1299px), (min-width: 1760px) {
        .divider-vertical-responsive-container-example {
          display: flex;
          height: 100px;
        }
      }
    `,
  ],
  template: `
    <div class="playground light" title="should show a divider">
      <p-divider></p-divider>
    </div>

    <div class="playground light" title="should show vertical divider">
      <div class="divider-vertical-container-example">
        <p-divider [orientation]="'vertical'"></p-divider>
      </div>
    </div>

    <div class="playground light" title="should show responsive vertical divider">
      <div class="divider-vertical-responsive-container-example">
        <p-divider
          [orientation]="{ base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' }"
        ></p-divider>
      </div>
    </div>

    <div class="playground light" title="should show different colors of divider with light theme">
      <p-divider></p-divider>
      <br />
      <br />
      <p-divider [color]="'neutral-contrast-medium'"></p-divider>
      <br />
      <br />
      <p-divider [color]="'neutral-contrast-high'"></p-divider>
    </div>

    <div class="playground dark" title="should show different colors of divider with dark theme">
      <p-divider [theme]="'dark'"></p-divider>
      <br />
      <br />
      <p-divider [theme]="'dark'" [color]="'neutral-contrast-medium'"></p-divider>
      <br />
      <br />
      <p-divider [theme]="'dark'" [color]="'neutral-contrast-high'"></p-divider>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
