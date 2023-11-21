import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-navigation-bug-page-3',
  template: `
    <navigation [activeTabIndex]="2" />
    <p-heading>Bug Page 3</p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarNavigationBugPage3Component {}
