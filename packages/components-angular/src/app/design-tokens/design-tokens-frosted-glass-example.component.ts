import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-frosted-glass-example',
  styleUrls: ['./design-tokens-frosted-glass-example.component.scss'],
  template: `
    <div class="wrapper">
      <h3 class="frosted-glass">Frosted Glass</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensFrostedGlassExampleComponent {}
