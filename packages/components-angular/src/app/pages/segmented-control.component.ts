/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-segmented-control',
  template: `
    <div class="playground light" title="should render default segmented-control">
      <p-segmented-control [value]="'s'">
        <p-segmented-control-item [value]="'s'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light surface" title="should render default segmented-control on surface">
      <p-segmented-control [value]="'s'" [backgroundColor]="'background-surface'">
        <p-segmented-control-item [value]="'s'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground dark" title="should render default segmented-control on dark theme">
      <p-segmented-control [value]="'s'" [theme]="'dark'">
        <p-segmented-control-item [value]="'s'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground dark surface" title="should render default segmented-control on dark theme surface">
      <p-segmented-control [value]="'s'" [theme]="'dark'" [backgroundColor]="'background-surface'">
        <p-segmented-control-item [value]="'s'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with labels">
      <p-segmented-control [value]="'s'">
        <p-segmented-control-item [value]="'s'" [label]="'Size'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'" [label]="'Size'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'" [label]="'Size'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [label]="'Size'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light surface" title="should render segmented-control with labels on surface">
      <p-segmented-control [value]="'s'" [backgroundColor]="'background-surface'">
        <p-segmented-control-item [value]="'s'" [label]="'Size'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'" [label]="'Size'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'" [label]="'Size'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [label]="'Size'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with columns=1">
      <p-segmented-control [columns]="1">
        <p-segmented-control-item [value]="'s'" [label]="'Size'">columns=1</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'" [label]="'Size'">columns=1</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'" [label]="'Size'">columns=1</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [label]="'Size'" [disabled]="true">columns=1</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with columns=2">
      <p-segmented-control [columns]="2">
        <p-segmented-control-item [value]="1">columns=2</p-segmented-control-item>
        <p-segmented-control-item [value]="2">columns=2</p-segmented-control-item>
        <p-segmented-control-item [value]="3">columns=2</p-segmented-control-item>
        <p-segmented-control-item [value]="4" [disabled]="true">columns=2</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with columns=3">
      <p-segmented-control [columns]="3">
        <p-segmented-control-item [value]="1">columns=3</p-segmented-control-item>
        <p-segmented-control-item [value]="2">columns=3</p-segmented-control-item>
        <p-segmented-control-item [value]="3">columns=3</p-segmented-control-item>
        <p-segmented-control-item [value]="4" [disabled]="true">columns=3</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with columns=4">
      <p-segmented-control [columns]="4">
        <p-segmented-control-item [value]="1">columns=4</p-segmented-control-item>
        <p-segmented-control-item [value]="2">columns=4</p-segmented-control-item>
        <p-segmented-control-item [value]="3">columns=4</p-segmented-control-item>
        <p-segmented-control-item [value]="4" [disabled]="true">columns=4</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with columns=5">
      <p-segmented-control [columns]="5">
        <p-segmented-control-item [value]="1">columns=5</p-segmented-control-item>
        <p-segmented-control-item [value]="2">columns=5</p-segmented-control-item>
        <p-segmented-control-item [value]="3">columns=5</p-segmented-control-item>
        <p-segmented-control-item [value]="4">columns=5</p-segmented-control-item>
        <p-segmented-control-item [value]="5" [disabled]="true">columns=5</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with responsive columns">
      <p-segmented-control [columns]="{ base: 'auto', xs: 1, s: 2, m: 3, l: 4, xl: 5 }">
        <p-segmented-control-item [value]="1">columns responsive</p-segmented-control-item>
        <p-segmented-control-item [value]="2">columns responsive</p-segmented-control-item>
        <p-segmented-control-item [value]="3">columns responsive</p-segmented-control-item>
        <p-segmented-control-item [value]="4">columns responsive</p-segmented-control-item>
        <p-segmented-control-item [value]="5" [disabled]="true">columns responsive</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should break word">
      <p-segmented-control>
        <p-segmented-control-item [value]="1">Pneumonoultramicroscopicsilicovolcanoconiosis</p-segmented-control-item>
        <p-segmented-control-item [value]="2">Pneumonoultramicroscopicsilicovolcanoconiosis</p-segmented-control-item>
        <p-segmented-control-item [value]="3">Pneumonoultramicroscopicsilicovolcanoconiosis</p-segmented-control-item>
        <p-segmented-control-item [value]="4">Pneumonoultramicroscopicsilicovolcanoconiosis</p-segmented-control-item>
        <p-segmented-control-item [value]="5" [disabled]="true"
          >Pneumonoultramicroscopicsilicovolcanoconiosis</p-segmented-control-item
        >
      </p-segmented-control>
    </div>

    <div class="playground dark" title="should render segmented-control with labels on dark theme">
      <p-segmented-control [value]="'s'" [theme]="'dark'">
        <p-segmented-control-item [value]="'s'" [label]="'Size'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'" [label]="'Size'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'" [label]="'Size'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [label]="'Size'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground dark surface" title="should render segmented-control with labels on dark theme surface">
      <p-segmented-control [value]="'s'" [theme]="'dark'" [backgroundColor]="'background-surface'">
        <p-segmented-control-item [value]="'s'" [label]="'Size'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'" [label]="'Size'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'" [label]="'Size'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [label]="'Size'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with icons">
      <p-segmented-control [value]="1">
        <p-segmented-control-item [value]="1" [icon]="'increase'">Start</p-segmented-control-item>
        <p-segmented-control-item [value]="2" [icon]="'lock'">Stop</p-segmented-control-item>
        <p-segmented-control-item [value]="3" [icon]="'question'">FAQ</p-segmented-control-item>
        <p-segmented-control-item [value]="4" [icon]="'shopping-cart'">Checkout</p-segmented-control-item>
        
        <p-segmented-control-item [value]="5" [iconSource]="'./assets/icon-custom-kaixin.svg'" [disabled]="true">Confirmation</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light surface" title="should render segmented-control with icons on surface">
      <p-segmented-control [value]="1" [backgroundColor]="'background-surface'">
        <p-segmented-control-item [value]="1" [icon]="'increase'">Start</p-segmented-control-item>
        <p-segmented-control-item [value]="2" [icon]="'lock'">Stop</p-segmented-control-item>
        <p-segmented-control-item [value]="3" [icon]="'question'">FAQ</p-segmented-control-item>
        <p-segmented-control-item [value]="4" [icon]="'shopping-cart'">Checkout</p-segmented-control-item>
        
        <p-segmented-control-item [value]="5" [iconSource]="'./assets/icon-custom-kaixin.svg'" [disabled]="true">Confirmation</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground dark" title="should render segmented-control with icons on dark theme">
      <p-segmented-control [value]="1" [theme]="'dark'">
        <p-segmented-control-item [value]="1" [icon]="'increase'">Start</p-segmented-control-item>
        <p-segmented-control-item [value]="2" [icon]="'lock'">Stop</p-segmented-control-item>
        <p-segmented-control-item [value]="3" [icon]="'question'">FAQ</p-segmented-control-item>
        <p-segmented-control-item [value]="4" [icon]="'shopping-cart'">Checkout</p-segmented-control-item>
        
        <p-segmented-control-item [value]="5" [iconSource]="'./assets/icon-custom-kaixin.svg'" [disabled]="true">Confirmation</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground dark surface" title="should render segmented-control with icons on dark theme surface">
      <p-segmented-control [value]="1" [theme]="'dark'" [backgroundColor]="'background-surface'">
        <p-segmented-control-item [value]="1" [icon]="'increase'">Start</p-segmented-control-item>
        <p-segmented-control-item [value]="2" [icon]="'lock'">Stop</p-segmented-control-item>
        <p-segmented-control-item [value]="3" [icon]="'question'">FAQ</p-segmented-control-item>
        <p-segmented-control-item [value]="4" [icon]="'shopping-cart'">Checkout</p-segmented-control-item>
        
        <p-segmented-control-item [value]="5" [iconSource]="'./assets/icon-custom-kaixin.svg'" [disabled]="true">Confirmation</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with labels and icons">
      <p-segmented-control [value]="1">
        <p-segmented-control-item [value]="1" [label]="'Variant'" [icon]="'wrench'">Default</p-segmented-control-item>
        <p-segmented-control-item [value]="2" [label]="'Variant'" [icon]="'wrenches'">Advanced</p-segmented-control-item>
        <p-segmented-control-item [value]="3" [label]="'Variant'" [icon]="'truck'">Large</p-segmented-control-item>
        
        <p-segmented-control-item [value]="4" [label]="'Variant'" [icon]="'tachometer'" [disabled]="true">Custom</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render default segmented-control with many items">
      <p-segmented-control [value]="'xxs'">
        <p-segmented-control-item [value]="'xxs'">Size XXS</p-segmented-control-item>
        <p-segmented-control-item [value]="'xs'">Size XS</p-segmented-control-item>
        <p-segmented-control-item [value]="'s'">Size S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'">Size M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'">Size L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'">Size XL</p-segmented-control-item>
        <p-segmented-control-item [value]="'xxl'">Size XXL</p-segmented-control-item>
        <p-segmented-control-item [value]="'xxxl'" [disabled]="true">Size XXXL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with value edge case">
      <p-segmented-control [value]="'s'">
        <p-segmented-control-item [value]="'s'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'">M is very long with a line break</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with label edge case">
      <p-segmented-control [value]="'s'">
        <p-segmented-control-item [value]="'s'" [label]="'Size is longer'">S</p-segmented-control-item>
        <p-segmented-control-item [value]="'m'" [label]="'Size'">M</p-segmented-control-item>
        <p-segmented-control-item [value]="'l'" [label]="'Size'">L</p-segmented-control-item>
        <p-segmented-control-item [value]="'xl'" [label]="'Size'" [disabled]="true">XL</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with multiple edge cases">
      <p-segmented-control [value]="1">
        <p-segmented-control-item [value]="1" [label]="'Size is wider than value'">S</p-segmented-control-item>
        
        <p-segmented-control-item [value]="2" [label]="'Size with icon'" [icon]="'truck'" [disabled]="true">M is very wide with icon</p-segmented-control-item>
        <p-segmented-control-item [value]="3" [label]="'Icon only'" [icon]="'user'"></p-segmented-control-item>
        <p-segmented-control-item [value]="4">XL without label</p-segmented-control-item>
        <p-segmented-control-item [value]="5" [label]="'Label only'"></p-segmented-control-item>
        <p-segmented-control-item [value]="6" [icon]="'truck'" [disabled]="true"></p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with icons only">
      <p-segmented-control [value]="1">
        <p-segmented-control-item [value]="1" [icon]="'truck'"></p-segmented-control-item>
        <p-segmented-control-item [value]="2" [icon]="'car'"></p-segmented-control-item>
        <p-segmented-control-item [value]="3" [icon]="'bell'"></p-segmented-control-item>
        <p-segmented-control-item [value]="4" [icon]="'garage'"></p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control without wrapping the content onto a new line">
      <p-segmented-control [value]="2">
        <p-segmented-control-item [value]="1">Option 1</p-segmented-control-item>
        <p-segmented-control-item [value]="2">Option 2</p-segmented-control-item>
        <p-segmented-control-item [value]="3">Option 3</p-segmented-control-item>
        <p-segmented-control-item [value]="4" [disabled]="true">Option 4</p-segmented-control-item>
        <p-segmented-control-item [value]="5">Option 5</p-segmented-control-item>
      </p-segmented-control>
    </div>

    <div class="playground light" title="should render segmented-control with centered content">
      <p-segmented-control [value]="1">
        <p-segmented-control-item [value]="1">12:00</p-segmented-control-item>
        <p-segmented-control-item [value]="2">13:00</p-segmented-control-item>
        <p-segmented-control-item [value]="3">14:00</p-segmented-control-item>
        <p-segmented-control-item [value]="4">15:00</p-segmented-control-item>
      </p-segmented-control>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControlComponent {}
