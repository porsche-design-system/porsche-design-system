import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'option-value-timing-bug-navigation',
  template: `
    <nav>
      <a routerLink="/option-value-timing-bug/page-a">Page A (Flyout)</a>
      |
      <a routerLink="/option-value-timing-bug/page-b">Page B</a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OptionValueTimingBugNavigationComponent {}
