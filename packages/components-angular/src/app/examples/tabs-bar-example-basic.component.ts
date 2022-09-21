import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { TabChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-tabs-bar-example-basic',
  template: `
    <p-tabs-bar [activeTabIndex]="tabIndex" (tabChange)="onTabChange($event)">
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </p-tabs-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarExampleBasicComponent {
  tabIndex: number;

  onTabChange(e: CustomEvent<TabChangeEvent>) {
    this.tabIndex = e.detail.activeTabIndex;
  }
}
