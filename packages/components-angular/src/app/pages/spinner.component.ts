/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-spinner',
  template: `
    <div class="playground light" title="should show spinner">
      <p-spinner></p-spinner>
    </div>

    <div class="playground light" title="should show spinner in different sizes">
      <p-spinner [size]="'small'"></p-spinner>
      <p-spinner [size]="'medium'"></p-spinner>
      <p-spinner [size]="'large'"></p-spinner>
      <p-spinner [size]="'inherit'" style="width: 24px"></p-spinner>
    </div>

    <div class="playground light" title="should show spinner in different sizes on different viewports">
      <p-spinner [size]="{ base: 'small', m: 'medium', l: 'large' }"></p-spinner>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
