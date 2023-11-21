import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-page-2',
  template: `
    <navigation [activeTabIndex]="10"></navigation>
    <p-heading>Page 2</p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarPage2Component {}
