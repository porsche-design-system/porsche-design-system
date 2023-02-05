import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-gradient-example',
  styleUrls: ['./design-tokens-gradient-example.component.scss'],
  template: `
    <div class="wrapper">
      <div class="gradient-to-top tile">Gradient To Top</div>
      <div class="gradient-to-bottom tile">Gradient To Bottom</div>
      <div class="gradient-to-left tile">Gradient To Left</div>
      <div class="gradient-to-right tile">Gradient To Right</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensGradientExampleComponent {}
