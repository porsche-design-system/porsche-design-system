import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-navigation-bug-page-1',
  template: `
    <navigation [activeTabIndex]="0" />
    <p-heading>Bug Page 1</p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarNavigationBugPage1Component {}
