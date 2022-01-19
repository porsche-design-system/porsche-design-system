import { Component } from '@angular/core';
import type { TabChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-tabs-bar-example',
  template: `
    <p-tabs-bar [activeTabIndex]="tabIndex" (tabChange)="onTabChange($event)">
    <button type="button" id="'tab-item1" aria-controls="tab-panel-1">Tab One</button>
    <button type="button" id="'tab-item2" aria-controls="tab-panel-2">Tab Two</button>
    <button type="button" id="'tab-item3" aria-controls="tab-panel-3">Tab Three</button>
    </p-tabs-bar>

    <div id="'tab-panel1" [hidden]="tabIndex === 0 ? false : true" [tabindex]="tabIndex === 0 ? 0 : -1" role="tabpanel" aria-labelledby="tab-item-1">
      <p-text>Your content of Tab 1</p-text>
    </div>
    <div id="'tab-panel2" [hidden]="tabIndex === 1 ? false : true" [tabindex]="tabIndex === 1 ? 0 : -1" role="tabpanel" aria-labelledby="tab-item-2">
      <p-text>Your content of Tab 2</p-text>
    </div>
    <div id="'tab-panel3" [hidden]="tabIndex === 2 ? false : true" [tabindex]="tabIndex === 2 ? 0 : -1" role="tabpanel" aria-labelledby="tab-item-3">
      <p-text>Your content of Tab 3</p-text>
    </div>
  `,
  styles: [
    'div[role=tabpanel] { outline: 1px solid transparent; outline-offset: 1px; margin-top: 8px;}',
    'div[role=tabpanel]:focus { outline-color: black; }',
    'div[role=tabpanel]:focus:not(:focus-visible) { outline-color: transparent; }'
  ]
})
export class TabsBarExampleComponent {
  tabIndex: number = 0;

  onTabChange(e: CustomEvent<TabChangeEvent>) {
    this.tabIndex = e.detail.activeTabIndex;
  }
}
