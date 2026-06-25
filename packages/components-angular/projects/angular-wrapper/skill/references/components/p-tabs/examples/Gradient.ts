import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-tabs [aria]="{'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist'}">
        <p-tabs-item label="Tab 1">
          <p-text>
            Tab Content 1
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 2">
          <p-text>
            Tab Content 2
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 3">
          <p-text>
            Tab Content 3
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 4">
          <p-text>
            Tab Content 4
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 5">
          <p-text>
            Tab Content 5
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 6">
          <p-text>
            Tab Content 6
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 7">
          <p-text>
            Tab Content 7
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 8">
          <p-text>
            Tab Content 8
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 9">
          <p-text>
            Tab Content 9
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 10">
          <p-text>
            Tab Content 10
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 11">
          <p-text>
            Tab Content 11
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 12">
          <p-text>
            Tab Content 12
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 13">
          <p-text>
            Tab Content 13
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 14">
          <p-text>
            Tab Content 14
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 15">
          <p-text>
            Tab Content 15
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 16">
          <p-text>
            Tab Content 16
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 17">
          <p-text>
            Tab Content 17
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 18">
          <p-text>
            Tab Content 18
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 19">
          <p-text>
            Tab Content 19
          </p-text>
        </p-tabs-item>
        <p-tabs-item label="Tab 20">
          <p-text>
            Tab Content 20
          </p-text>
        </p-tabs-item>
      </p-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
