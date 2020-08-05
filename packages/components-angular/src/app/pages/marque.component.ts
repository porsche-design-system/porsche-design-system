import { Component } from '@angular/core';

@Component({
  selector: 'page-marque',
  template: `
    <div class="playground" title="should show marque">
      <p-marque></p-marque>
    </div>

    <div class="playground" title="should show marque without trademark sign">
      <p-marque trademark="false"></p-marque>
    </div>
  `,
  styles: []
})
export class MarqueComponent {
}
