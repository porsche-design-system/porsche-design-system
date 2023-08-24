/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-wordmark',
  template: `
    <div class="playground light" title="should render default">
      <p-wordmark></p-wordmark>
    </div>

    <div class="playground light" title="should render size inherit">
      <p-wordmark [size]="'inherit'" style="height: 20px"></p-wordmark>
    </div>

    <div class="playground light" title="should render default with custom click area">
      <p-wordmark [href]="'#'" style="padding: 1.5rem"></p-wordmark>
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
