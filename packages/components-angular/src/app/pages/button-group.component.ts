/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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

    <div class="playground light" title="should show p-button-group default style when direction is undefined">
      <p-button-group id="setDirectionToUndefined">
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

    <div
      class="playground light"
      title="should render button-group with p-button-pure, long text p-button and p-button with limited max-width and responsive direction"
      style="background: deeppink"
    >
      <p-button-group [direction]="{ base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' }">
        <p-button-pure>Some label</p-button-pure>
        <p-button [hideLabel]="true">Some label</p-button>
        <p-button>Some label</p-button>
        <p-button>Lorem ipsum dolor sit amet, consetetur sadipscing</p-button>
        <p-button>Some label</p-button>
        <p-button-pure>Some label</p-button-pure>
        <p-button>Some label</p-button>
        <p-button>Some label</p-button>
        <p-button style="max-width: 150px">Lorem ipsum dolor sit amet, consetetur sadipscing</p-button>
        <p-button>Some label</p-button>
        <p-button>Some label</p-button>
        <p-button>Some label</p-button>
      </p-button-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent implements OnInit {
  ngOnInit() {
    (document.querySelector('#setDirectionToUndefined') as any).direction = undefined;
  }
}
