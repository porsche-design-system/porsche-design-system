import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-spacing-example',
  styleUrls: ['./design-tokens-spacing-example.component.scss'],
  template: `
    <div>
      <div class="wrapper">
        <h3 class="heading">Spacing Fluid (XS - XL)</h3>
        <div class="spacing-fluid-x-small tile"></div>
        <div class="spacing-fluid-small tile"></div>
        <div class="spacing-fluid-medium tile"></div>
        <div class="spacing-fluid-large tile"></div>
        <div class="spacing-fluid-x-large tile"></div>
      </div>
      <div class="wrapper">
        <h3 class="heading">Spacing Static (XS - XXL)</h3>
        <div class="spacing-static-x-small tile"></div>
        <div class="spacing-static-small tile"></div>
        <div class="spacing-static-medium tile"></div>
        <div class="spacing-static-large tile"></div>
        <div class="spacing-static-x-large tile"></div>
        <div class="spacing-static-xx-large tile"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensSpacingExampleComponent {}
