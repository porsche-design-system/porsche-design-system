/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-wordmark',
  styles: [
    `
      @media only screen and (min-width: 760px) {
        #app,
        :host {
          display: grid;
          grid-template-columns: repeat(2, 50%);
        }
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render default on light background">
      <p-wordmark></p-wordmark>
    </div>

    <div class="playground dark" title="should render default on dark background">
      <p-wordmark [theme]="'dark'"></p-wordmark>
    </div>

    <div class="playground light" title="should render size inherit on light background">
      <p-wordmark [size]="'inherit'" style="height: 20px"></p-wordmark>
    </div>

    <div class="playground dark" title="should render size inherit on dark background">
      <p-wordmark [theme]="'dark'" [size]="'inherit'" style="height: 20px"></p-wordmark>
    </div>

    <div class="playground light" title="should render default with custom click area on light background">
      <p-wordmark [href]="'#'" style="padding: 1.5rem"></p-wordmark>
    </div>

    <div class="playground dark" title="should render default with custom clickarea on dark background">
      <p-wordmark [href]="'#'" [theme]="'dark'" style="padding: 1.5rem"></p-wordmark>
    </div>

    <div class="playground light" title="should not exceed parents width">
      <div style="width: 180px; background: lightsalmon">
        <p-wordmark style="background: lightblue"></p-wordmark>
      </div>
      <br />
      <div style="width: 180px; background: lightsalmon">
        <p-wordmark [size]="'inherit'" style="background: lightblue; height: 17px"></p-wordmark>
      </div>
      <br />
      <div style="width: 180px; background: lightsalmon">
        <p-wordmark [href]="'#'" style="background: lightblue"></p-wordmark>
      </div>
    </div>

    <div
      class="playground light"
      title="should not exceed max-width of wordmark itself, although parent provides more width"
    >
      <div style="width: 272px; background: lightsalmon">
        <p-wordmark style="background: lightblue"></p-wordmark>
      </div>
      <br />
      <div style="width: 272px; background: lightsalmon">
        <p-wordmark [size]="'inherit'" style="background: lightblue; height: 17px"></p-wordmark>
      </div>
      <br />
      <div style="width: 272px; background: lightsalmon">
        <p-wordmark [href]="'#'" style="background: lightblue"></p-wordmark>
      </div>
    </div>

    <div class="playground light" title="should not exceed parents height">
      <div style="height: 5px; background: lightsalmon">
        <p-wordmark style="background: lightblue"></p-wordmark>
      </div>
      <br />
      <div style="height: 5px; background: lightsalmon">
        <p-wordmark [size]="'inherit'" style="background: lightblue; height: 17px"></p-wordmark>
      </div>
      <br />
      <div style="height: 5px; background: lightsalmon">
        <p-wordmark [href]="'#'" style="background: lightblue"></p-wordmark>
      </div>
    </div>

    <div
      class="playground light"
      title="should not exceed max-height of wordmark itself, although parent provides more height"
    >
      <div style="height: 80px; background: lightsalmon">
        <p-wordmark style="background: lightblue"></p-wordmark>
      </div>
      <br />
      <div style="height: 80px; background: lightsalmon">
        <p-wordmark [size]="'inherit'" style="background: lightblue; height: 17px"></p-wordmark>
      </div>
      <br />
      <div style="height: 80px; background: lightsalmon">
        <p-wordmark [href]="'#'" style="background: lightblue"></p-wordmark>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordmarkComponent {}
