import { Component } from '@angular/core';
import type { TabChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-tabs-bar-example',
  styles: [
    `
      div[role='tabpanel'] {
        outline: 1px solid transparent;
        outline-offset: 1px;
        margin-top: 8px;
      }
    `,
    `
      div[role='tabpanel']:focus {
        outline-color: black;
      }
    `,
    `
      div[role='tabpanel']:focus:not(:focus-visible) {
        outline-color: transparent;
      }
    `,
  ],
  template: `
    <p-tabs-bar [activeTabIndex]="tabIndex" (tabChange)="onTabChange($event)">
      <ng-container *ngFor="let tabPanel of ['One', 'Two', 'Three']; let i = index">
        <button type="button" [attr.id]="'tab-item-' + (i + 1)" [attr.aria-controls]="'tab-panel-' + (i + 1)">
          Tab {{ tabPanel }}
        </button>
      </ng-container>
    </p-tabs-bar>

    <ng-container *ngFor="let idx of [0, 1, 2]">
      <div
        [attr.id]="'tab-panel-' + (idx + 1)"
        [hidden]="tabIndex !== idx"
        [tabindex]="tabIndex === idx ? 0 : -1"
        role="tabpanel"
        [attr.aria-labelledby]="'tab-item-' + (idx + 1)"
      >
        <p-text>Your content of Tab {{ idx + 1 }}</p-text>
      </div>
    </ng-container>
  `,
})
export class TabsBarExampleComponent {
  tabIndex: number = 0;

  onTabChange(e: CustomEvent<TabChangeEvent>) {
    this.tabIndex = e.detail.activeTabIndex;
  }
}
