import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-tabs-bar [activeTabIndex]="activeTabIndex" [aria]="{'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist'}" (update)="onUpdate($event)">
        <button type="button">
          Tab One
        </button>
        <button type="button">
          Tab Two
        </button>
        <button type="button">
          Tab Three
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
