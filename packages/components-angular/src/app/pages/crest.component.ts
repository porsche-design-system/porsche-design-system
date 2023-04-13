/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-crest',
  template: `
    <div class="playground" title="should show crest">
      <p-crest></p-crest>
    </div>

    <div class="playground" title="should render with custom click area">
      <p-crest [href]="'#'" style="padding: 1.5rem"></p-crest>
    </div>

    <div class="playground" title="should not exceed parents width">
      <div style="width: 20px; background: lightsalmon">
        <p-crest style="background: lightblue"></p-crest>
      </div>
      <br />
      <div style="width: 20px; background: lightsalmon">
        <p-crest [href]="'#'" style="background: lightblue"></p-crest>
      </div>
    </div>

    <div class="playground" title="should not exceed max-width of crest itself, although parent provides more width">
      <div style="width: 80px; background: lightsalmon">
        <p-crest style="background: lightblue"></p-crest>
      </div>
      <br />
      <div style="width: 80px; background: lightsalmon">
        <p-crest [href]="'#'" style="background: lightblue"></p-crest>
      </div>
    </div>

    <div class="playground" title="should not exceed parents height">
      <div style="height: 20px; background: lightsalmon">
        <p-crest style="background: lightblue"></p-crest>
      </div>
      <br />
      <div style="height: 20px; background: lightsalmon">
        <p-crest [href]="'#'" style="background: lightblue"></p-crest>
      </div>
    </div>

    <div class="playground" title="should not exceed max-height of crest itself, although parent provides more height">
      <div style="height: 80px; background: lightsalmon">
        <p-crest style="background: lightblue"></p-crest>
      </div>
      <br />
      <div style="height: 80px; background: lightsalmon">
        <p-crest [href]="'#'" style="background: lightblue"></p-crest>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrestComponent {}
