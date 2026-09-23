import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'radio-group-option-timing-bug-navigation',
  template: `
    <nav>
      <a routerLink="/radio-group-option-timing-bug/page-a">Page A (Flyout)</a>
      |
      <a routerLink="/radio-group-option-timing-bug/page-b">Page B</a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RadioGroupOptionTimingBugNavigationComponent {}
