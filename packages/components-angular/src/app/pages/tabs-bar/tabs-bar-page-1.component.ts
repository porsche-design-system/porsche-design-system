import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-page-1',
  template: `
    <navigation [activeTabIndex]="0"></navigation>
    <p-heading>Page 1</p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarPage1Component {}
