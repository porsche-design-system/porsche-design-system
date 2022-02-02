/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-spinner',
  template: `
    <div class="playground light" title="should show spinner on light background">
      <p-spinner></p-spinner>
    </div>

    <div class="playground dark" title="should show spinner on dark background">
      <p-spinner [theme]="'dark'"></p-spinner>
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

    <div class="playground light" title="should show spinner small when size is undefined">
      <p-spinner id="setSizeToUndefined"></p-spinner>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  ngOnInit() {
    (document.querySelector('#setSizeToUndefined') as any).size = undefined;
  }
}
