import { Component } from '@angular/core';

@Component({
  selector: 'page-button-group',
  template: `
    <div class="playground light" title="should render button-group">
      <p-button-group>
        <p-button [variant]="'primary'">Some label</p-button>
        <p-button [variant]="'secondary'">Some label</p-button>
        <p-button [variant]="'tertiary'">Some label</p-button>
      </p-button-group>
    </div>

    <div class="playground light" title="should render button-group with responsive direction">
      <p-button-group [direction]="{ base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' }">
        <p-button [variant]="'primary'">Some label</p-button>
        <p-button [variant]="'secondary'">Some label</p-button>
        <p-button [variant]="'tertiary'">Some label</p-button>
      </p-button-group>
    </div>
  `,
})
export class ButtonGroupComponent {}
