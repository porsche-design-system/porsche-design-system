import { Component } from '@angular/core';

@Component({
  selector: 'page-marque',
  template: `
    <div class="playground" title="should show marque with trademark sign and different sizing">
      <p-marque></p-marque>
      <p-marque [ngClass]="'small'" [size]="'small'"></p-marque>
      <p-marque [ngClass]="'medium'" [size]="'medium'"></p-marque>
    </div>

    <div class="playground" title="should show marque without trademark sign and different sizing">
      <p-marque [trademark]="false"></p-marque>
      <p-marque [ngClass]="'small'" [trademark]="false" [size]="'small'"></p-marque>
      <p-marque [ngClass]="'medium'" [trademark]="false" [size]="'medium'"></p-marque>
    </div>
  `,
})
export class MarqueComponent {}
