import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-border-example',
  styleUrls: ['./design-tokens-border-example.component.scss'],
  template: `
    <div>
      <div class="wrapper">
        <h3 class="heading">Border Radius</h3>
        <div class="border-radius-small tile">Small</div>
        <div class="border-radius-medium tile">Medium</div>
        <div class="border-radius-large tile">Large</div>
      </div>
      <div class="wrapper">
        <h3 class="heading">Border Width</h3>
        <div class="border-width-base"></div>
        <div class="border-width-thin"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensBorderExampleComponent {}
