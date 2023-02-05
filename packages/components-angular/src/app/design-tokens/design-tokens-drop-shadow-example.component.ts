import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-drop-shadow-example',
  styleUrls: ['./design-tokens-drop-shadow-example.component.scss'],
  template: `
    <div class="wrapper">
      <h3 class="heading">Drop Shadow</h3>
      <div class="drop-shadow-low tile">Low</div>
      <div class="drop-shadow-medium tile">Medium</div>
      <div class="drop-shadow-high tile">High</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensDropShadowExampleComponent {}
