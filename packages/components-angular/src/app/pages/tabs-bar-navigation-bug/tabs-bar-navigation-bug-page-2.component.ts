import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-navigation-bug-page-2',
  template: `
    <navigation [activeTabIndex]="1" />
    <p-heading>Bug Page 2</p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarNavigationBugPage2Component {}
