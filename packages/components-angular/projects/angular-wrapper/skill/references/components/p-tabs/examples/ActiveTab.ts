import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-tabs [activeTabIndex]="1" [aria]="{'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist'}">
        <p-tabs-item label="Tab One">
          <p-text>
            Tab Content One
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab Two">
          <p-text>
            Tab Content Two
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab Three">
          <p-text>
            Tab Content Three
          </p-text>
        </p-tabs-item>
      </p-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
