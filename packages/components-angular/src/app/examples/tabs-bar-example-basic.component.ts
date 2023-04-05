import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { TabsBarChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-tabs-bar-example-basic',
  template: `
    <p-tabs-bar [activeTabIndex]="tabIndex" (update)="onUpdate($event)">
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </p-tabs-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarExampleBasicComponent {
  tabIndex: number;

  onUpdate(e: CustomEvent<TabsBarChangeEvent>) {
    this.tabIndex = e.detail.activeTabIndex;
  }
}
