import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-navigation',
  template: `
    <navigation
      [baseRoute]="'tabs-bar-navigation'"
      [activeTabIndex]="activeTabIndex"
      (update)="activeTabIndex = $event"
    />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarNavigationComponent {
  activeTabIndex = 0;
}
