import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-tabs-bar [activeTabIndex]="activeTabIndex" [aria]="{'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist'}" (update)="onUpdate($event)">
        <button type="button">
          Tab 0
        </button>
        <button type="button">
          Tab 1
        </button>
        <button type="button">
          Tab 2
        </button>
        <button type="button">
          Tab 3
        </button>
        <button type="button">
          Tab 4
        </button>
        <button type="button">
          Tab 5
        </button>
        <button type="button">
          Tab 6
        </button>
        <button type="button">
          Tab 7
        </button>
        <button type="button">
          Tab 8
        </button>
        <button type="button">
          Tab 9
        </button>
        <button type="button">
          Tab 10
        </button>
        <button type="button">
          Tab 11
        </button>
        <button type="button">
          Tab 12
        </button>
        <button type="button">
          Tab 13
        </button>
        <button type="button">
          Tab 14
        </button>
        <button type="button">
          Tab 15
        </button>
        <button type="button">
          Tab 16
        </button>
        <button type="button">
          Tab 17
        </button>
        <button type="button">
          Tab 18
        </button>
        <button type="button">
          Tab 19
        </button>
      </p-tabs-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {
  activeTabIndex = 0;

  onUpdate(e: CustomEvent<TabsBarUpdateEventDetail>) {
    this.activeTabIndex = e.detail.activeTabIndex;
  }
}
