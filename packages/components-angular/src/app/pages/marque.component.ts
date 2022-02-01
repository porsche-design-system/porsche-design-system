/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-marque',
  template: `
    <div class="playground" title="should show marque with trademark sign and different sizing">
      <p-marque></p-marque>
      <p-marque [size]="'small'"></p-marque>
      <p-marque [size]="'medium'"></p-marque>
    </div>

    <div class="playground" title="should show marque without trademark sign and different sizing">
      <p-marque [trademark]="false"></p-marque>
      <p-marque [trademark]="false" [size]="'small'"></p-marque>
      <p-marque [trademark]="false" [size]="'medium'"></p-marque>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueComponent {}
