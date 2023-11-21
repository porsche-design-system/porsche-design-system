import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-page-3',
  template: `
    <navigation [activeTabIndex]="10"></navigation>
    <p-heading>Page 3</p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarPage3Component {}
